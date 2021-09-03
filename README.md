# Denizen - A Stacks Blockchain Proof of Hold Access System
[Denizen Web App](https://denizen-3e818.web.app/)

### Summary:
Denizen is a Web3 application that is a co-working directory that shows locations that are accessed via an automated door lock, but the twist is that these locks are unlocked by holding specific tokens, or specific amounts of tokens in a Stacks wallet!

Currently, these spaces are using simulated information from Firebase. There is a functioning automated doorlock that works with this system via Raspberry Pi 4. You can see the whole system in action on [Youtube](https://www.youtube.com/watch?v=hOgdOl7kV2Q).

### Why?
A new concept launched on the Stacks blockchain called [CityCoins]() enabled cities to benefit from the trading activity of Stacks tokens and mining. There was a Hackathon between Aug 16 - Sept 26 that called on any makers to build utilities around CityCoin and Stacks.

I settled with a co-working access system and directory because I like tinkering with IoT devices and wanted to dip my toes in Web3 technology! I am happy with the result. All-in-all this took about 2 weeks to build!

### How to get started
```
git clone <repo url>
cd <repo url>
yarn install
yarn start
```

This project works with firebase. You can see all the required `collections` in firestore by the corresponding `model` in `/models`. This project does utilize Firebase Cloud Functions to open the lock. All cloud functions are found in `cloud_functions` and can be started locally with `firebase emulators start`.

All firebase credentials can be placed in .env in the root directory if you decide to recreate this project. If you have any questions you can [@ me or DM me on Twitter](https://twitter.com/tcarambat)