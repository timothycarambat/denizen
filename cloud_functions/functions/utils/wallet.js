const fetch = require("node-fetch");

const UNITARY_BASE = 1_000_000;
const COIN_MAP = {
  stx: {
    development: {
      asset_class: "stx",
    },
    production: {
      asset_class: "stx",
    },
  },
  MIA: {
    development: {
      asset_class: "fungible_tokens",
      contract:
        "SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-token::miamicoin",
    },
    production: {
      asset_class: "fungible_tokens",
      contract:
        "SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-token::miamicoin",
    },
  },
};
const API_URL =
  process.env.FUNCTIONS_EMULATOR === "true"
    ? "https://stacks-node-api.testnet.stacks.co"
    : "https://stacks-node-api.mainnet.stacks.co";

function balanceHasCoin(coin, balances) {
  const env =
    process.env.FUNCTIONS_EMULATOR === "true" ? "development" : "production";
  const { asset_class, contract } = COIN_MAP[coin][env];
  const validContract = contract
    ? balances[asset_class][contract]
    : balances[asset_class];

  if (!validContract) {
    return false;
  }
  return validContract.balance > 0;
}

function balanceHasCoinMin(coin, minAmt, balances) {
  const env =
    process.env.FUNCTIONS_EMULATOR === "true" ? "development" : "production";
  const { asset_class, contract } = COIN_MAP[coin][env];
  const validContract = contract
    ? balances[asset_class][contract]
    : balances[asset_class];
  const coinBalance = validContract.balance || 0;
  const normalizedBalance = coinBalance / UNITARY_BASE;

  return normalizedBalance >= +minAmt;
}

async function getWalletBalances(walletAddr) {
  const balances = await fetch(
    `${API_URL}/extended/v1/address/${walletAddr}/balances`
  )
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw result.error;
      }
      return result.error ? null : result;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });

  return balances;
}

module.exports = {
  getWalletBalances,
  balanceHasCoinMin,
  balanceHasCoin,
};
