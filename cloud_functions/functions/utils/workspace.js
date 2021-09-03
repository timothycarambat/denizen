const admin = require("firebase-admin");
const { balanceHasCoin, balanceHasCoinMin } = require("./wallet");
const LOCK_DEBOUNCE_MS = 3500;
const WORKSPACE_ENTRY_TYPES = [
  {
    type: "coin_holder",
    entryValidation: ({ coin, balances }) => balanceHasCoin(coin, balances),
  },
  {
    type: "coin_holder_min",
    entryValidation: ({ coin, amt, balances }) =>
      balanceHasCoinMin(coin, amt, balances),
  },
  {
    type: "pay_per-use",
    entryValidation: ({ coin, amt, balances }) =>
      balanceHasCoinMin(coin, amt, balances),
  },
];

async function getWorkspaceDetails(workspaceId) {
  const workspace = await admin
    .firestore()
    .collection("workspaces")
    .doc(workspaceId)
    .get()
    .then((doc) => {
      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    })
    .catch(() => null);

  return workspace;
}

function validateWorkspaceEntry(balances, props) {
  if (!balances) {
    return false;
  }
  const { entry_type, entry_min, coin } = props;

  return WORKSPACE_ENTRY_TYPES[entry_type].entryValidation({
    coin,
    amt: entry_min,
    balances,
  });
}

async function setLock(workspaceId, door_status = false) {
  const setStatus = await admin
    .firestore()
    .collection("workspaces")
    .doc(workspaceId)
    .update({
      door_status,
    });

  return setStatus;
}

async function saveAccessLog(workspaceId, walletAddr) {
  const setStatus = await admin
    .firestore()
    .collection("workspace_access_logs")
    .add({
      workspaceId,
      walletAddr,
      env:
        process.env.FUNCTIONS_EMULATOR === "true"
          ? "development"
          : "production",
      accessed_at: admin.firestore.Timestamp.now(),
    });

  return setStatus;
}

async function acutateLock(workspaceId, walletAddr) {
  await setLock(workspaceId, true);
  saveAccessLog(workspaceId, walletAddr);
  await new Promise((resolve) => setTimeout(resolve, LOCK_DEBOUNCE_MS));
  await setLock(workspaceId, false);
  return true;
}

module.exports = {
  getWorkspaceDetails,
  validateWorkspaceEntry,
  acutateLock,
};
