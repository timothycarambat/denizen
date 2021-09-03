const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getWalletBalances } = require("./utils/wallet");
const {
  getWorkspaceDetails,
  validateWorkspaceEntry,
  acutateLock,
} = require("./utils/workspace");

admin.initializeApp();

exports.authWorkspace = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "POST");

  const { workspaceId, walletAddr } =
    typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  const workspaceDetails = await getWorkspaceDetails(workspaceId);
  if (!workspaceDetails) {
    response
      .status(404)
      .send({ accessGranted: false, msg: "No workspace found." });
    return false;
  }

  const { entry_type, entry_min, coin } = workspaceDetails;
  const walletBalances = await getWalletBalances(walletAddr);
  if (!walletBalances) {
    response
      .status(404)
      .send({ accessGranted: false, msg: "Wallet was not valid." });
    return false;
  }

  const accessGranted = validateWorkspaceEntry(walletBalances, {
    entry_type,
    entry_min,
    coin,
  });

  accessGranted && acutateLock(workspaceId, walletAddr);
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "POST");
  response.status(200).send({ accessGranted });
});

exports.checkWorkspace = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET");

    const { workspaceId } = request.query;
    const workspaceDetails = await getWorkspaceDetails(workspaceId);
    if (!workspaceDetails) {
      response
        .status(404)
        .send({ doorStatus: false, msg: "No workspace found." });
      return false;
    }
    response
      .status(200)
      .send({ doorStatus: workspaceDetails.door_status, workspaceId });
  }
);
