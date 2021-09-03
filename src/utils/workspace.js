import numeral from "numeral"
import {
  BatteryCharging, Box, Coffee,
  Gitlab, GitPullRequest, MessageCircle,
  PhoneCall, Plus, Pocket,
  Printer, Shield, Smile,
  Thermometer, Tool, Truck,
  Users, Wifi, Zap
} from "react-feather"
import { balanceHasCoin, balanceHasCoinMin } from "./wallet"

export const WORKSPACE_ENTRY_TYPES = [
  {
    type: 'coin_holder',
    title: 'Coin Holder',
    message: ({ coin }) => `Open to all $${coin.toUpperCase()} holders`,
    long: ({ coin }) => `You must currently own <b>any</b> amount of $${coin.toUpperCase()} in your Stacks wallet.`,
    entryValidation: ({ coin, balances }) => balanceHasCoin(coin, balances),
  },
  {
    type: 'coin_holder_min',
    title: 'Min. Coin Holder',
    message: ({ coin, amt }) => `Must have at least ${numeral(amt).format('Oa')} $${coin.toUpperCase()}`,
    long: ({ coin, amt }) => `You must currently own <b>at least</b> ${numeral(amt).format('Oa')} $${coin.toUpperCase()} in your Stacks wallet.`,
    entryValidation: ({ coin, amt, balances }) => balanceHasCoinMin(coin, amt, balances),
  },
  {
    type: 'pay_per-use',
    title: 'Pay-Per-Use',
    message: ({ payment_coin, rate }) => `Pay-per-use. ${rate} $${payment_coin.toUpperCase()} for access`,
    long: ({ payment_coin, rate }) => `You must pay a per-use fee of ${rate} $${payment_coin}.`,
    entryValidation: ({ coin, amt, balances }) => balanceHasCoinMin(coin, amt, balances),
  },
]

export const WORKSPACE_AMENITIES = {
  'Enhanced cleaning services': {
    desciption: 'Heightened cleaning measures—with emphasis in high-touch, high-traffic areas.',
    icon: Shield,
  },
  'Touch-free dispensers': {
    desciption: 'Touch-free sanitizers and wipe dispensers available.',
    icon: Shield,
  },
  'Parking': {
    desciption: 'Spaces available nearby the facility to park your vehicle. Price may vary by location',
    icon: Truck,
  },
  'Pet friendly': {
    desciption: 'Pets are allowed in this space!',
    icon: Gitlab,
  },
  'Outdoor space': {
    desciption: 'Access to the great beyond and sunshine on premise.',
    icon: Thermometer,
  },
  'Mother\'s room': {
    desciption: 'A designated, private, lockable, and comfortable space for new mothers.',
    icon: Pocket,
  },
  'Wellness room': {
    desciption: 'A quiet space that is lockable for some time to focus and decompress.',
    icon: BatteryCharging,
  },
  'Event space': {
    desciption: 'Member-sponsored events are permitted where local law allows and in accordance with capacity measures.',
    icon: Smile,
  },
  'Recreational games': {
    desciption: 'Members can access games like chess, pool, checkers, UNO and other games to wind down with other memebers.',
    icon: Box,
  },
  'Electric vehicle charging stations': {
    desciption: 'Doing your part? That\'s great to hear because we offer electric charging stations around the premise to get you back home fully charged.',
    icon: Zap,
  },
  'Tech Services': {
    desciption: 'Wifi down? Computer not working with printer? We have people to help you on premise.',
    icon: Tool,
  },
  'Wifi / Ethernet': {
    desciption: 'Whats a workspace without a connection to the digital realm? We got that.',
    icon: Wifi,
  },
  'Conference rooms': {
    desciption: 'Meet with peace of mind in conference rooms that prioritize personal space through modified capacities and safe to occupy seating.',
    icon: GitPullRequest,
  },
  'Onsite staff': {
    desciption: 'A workplace team is here to provide everything you need to keep your office running smoothly.',
    icon: Users,
  },
  'Common areas': {
    desciption: 'The heart and soul of the workspace, these living-room-style work lounges are designed for collaboration, comfort, and productivity while prioritizing personal space.',
    icon: MessageCircle,
  },
  'Phone booths': {
    desciption: 'A private area to make sensitive calls away from others for courtesy of working members.',
    icon: PhoneCall,
  },
  'Stocked kitchens': {
    desciption: 'Hungry? Thats fine because we have the fuel to keep you going throughout the day.',
    icon: Coffee,
  },
  'Printers': {
    desciption: 'Even in the digital age we still have to print things. Use for any business printing needs.',
    icon: Printer,
  },
  '--placeholder': {
    desciption: null,
    icon: Plus,
  }
}

export function workspaceEntryMessage(entryType, props) {
  return WORKSPACE_ENTRY_TYPES[entryType].message(props)
}

export function workspaceEntryLongMessage(entryType, props) {
  return WORKSPACE_ENTRY_TYPES[entryType].long(props)
}

export function validateWorkspaceEntry(balances, props) {
  if (!balances) { return false }
  const { entry_type, entry_min, coin } = props

  return WORKSPACE_ENTRY_TYPES[entry_type].entryValidation({ coin, amt: entry_min, balances })
}
