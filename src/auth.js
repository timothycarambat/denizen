import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import User from './models/user'

const appConfig = new AppConfig(['publish_data']);
export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    appDetails: {
      name: process.env.REACT_APP_APP_NAME,
      icon: window.location.origin + '/logo.svg',
    },
    redirectTo: '/',
    onFinish: async (session) => {
      const { profile: { stxAddress: { testnet, mainnet } } } = session.authResponsePayload
      const addr = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? testnet : mainnet

      await User.create(addr)
      window.location.reload();
    },
    userSession: userSession,
  });
}

export function getUserData() {
  return userSession.loadUserData();
}

export function getPerson() {
  return getUserData()
}

export function stxAddress() {
  const { profile: { stxAddress: { testnet, mainnet } } } = getPerson()
  const addr = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? testnet : mainnet

  return `${addr.substr(0, 4)}...${addr.substr(addr.length - 3, addr.length)}`
}

export function userStxAddress(user) {
  const { profile: { stxAddress: { testnet, mainnet } } } = user
  const addr = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? testnet : mainnet

  return addr
}
