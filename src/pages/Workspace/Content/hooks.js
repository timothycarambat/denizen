import { useEffect, useState } from "react";
import { userStxAddress } from '../../../auth'
import { API_URL } from '../../../utils/wallet'

export function useUserBalances(user = null) {
  const walletAddr = user ? userStxAddress(user) : null
  const [balances, setBalances] = useState(null)

  useEffect(() => {
    const checkBalance = async (walletAddr) => {
      const balances = await fetch(`${API_URL}/extended/v1/address/${walletAddr}/balances`)
        .then((res) => res.json())
        .then((result) => {
          return result
        })
        .catch((e) => {
          console.error(e)
          return null
        })

      setBalances({ ...balances })
    }

    return walletAddr ? checkBalance(walletAddr) : null
  }, [walletAddr])

  return balances
}