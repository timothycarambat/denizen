const UNITARY_BASE = 1_000_000
const COIN_MAP = {
  'stx': {
    development: {
      asset_class: 'stx',
    },
    production: {
      asset_class: 'stx',
    },
  },
  'MIA': {
    development: {
      asset_class: 'fungible_tokens',
      contract: 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-token::miamicoin',
    },
    production: {
      asset_class: 'fungible_tokens',
      contract: 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-token::miamicoin',
    }
  }
}
export const API_URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ?
  'https://stacks-node-api.testnet.stacks.co' :
  'https://stacks-node-api.mainnet.stacks.co'

export function balanceHasCoin(coin, balances) {
  const env = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'development' : 'production'
  const { asset_class, contract } = COIN_MAP[coin][env]

  return contract ? +balances[asset_class][contract]?.balance > 0 : +balances[asset_class]?.balance > 0
}

export function balanceHasCoinMin(coin, minAmt, balances) {
  const env = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'development' : 'production'
  const { asset_class, contract } = COIN_MAP[coin][env]
  const coinBalance = contract ? +balances[asset_class][contract]?.balance || 0 : +balances[asset_class]?.balance || 0
  const normalizedBalance = coinBalance / UNITARY_BASE

  return normalizedBalance >= +minAmt
}
