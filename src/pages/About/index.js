import React from 'react'
import MainLayout from '../../Layouts/Main'
import { isMobile } from 'react-device-detect';

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto md:px-6 relative md:pt-8 md:pb-8">
        <div class="max-w-screen-xl mx-auto p-8">
          <div className='flex-col border-b-2 border-gray-100 py-4 mb-12'>
            <h2 class="text-3xl font-semibold text-gray-900 mb-1">
              What the hell is <b className='text-blue-500 underline'>Denizen</b>?
            </h2>
            <div className='flex-col space-y-4'>
              <p className='text-gray-500'>
                Denizen is a crypto + Web3 project built for the <a className='text-blue-500 underline' href='https://www.citycoins.co/' rel='noreferrer'>@CityCoins</a> <a className='underline text-blue-500' href='https://miamimakers.co' rel='noreferrer'>MiamiCoin Hackathon!</a>.
                It was built by <a className='underline text-blue-500' href='https://twitter.com/tcarambat' rel='noreferrer'>Timothy Carambat</a> and is intended for use with the <a className='text-blue-500 underline ' href='https://twitter.com/Stacks' rel='noreferrer'>@Stacks</a> token & blockchain!
              </p>
              <p className='text-gray-500'>
                Denizen is a Web3 enabled co-working space directory + physical door lock. You can find a participating workspace on the site and unlock it with your in-browser Stacks wallet!
                That is right, now your crypto is getting you access to physical spaces!
              </p>
              <p className='text-gray-500'>
                Keep in mind, this a demo and proof-of-concept. So while you may be unlocking a real door lock, it is not yet tied to a real space.<br /> That is the next step 😊.
              </p>
              <div className='bg-gray-200 w-full flex justify-center items-center'>
                <iframe className='w-full rounded-xl' style={{ height: 500 }} src="https://www.youtube.com/embed/hOgdOl7kV2Q?controls=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
              </div>
            </div>
          </div>

          <ul class={`flex${isMobile ? '-col' : ''} items-start justify-between gap-8 space-y-8 md:space-y-0 flex-wrap`}>
            <li class="w-full md:w-2/5">
              <p class="text-lg font-medium leading-6 text-gray-900">
                What are these co-working spaces?
              </p>
              <p class="mt-2">
                <p class="text-base leading-6 text-gray-500">
                  Ideally, the co-working spaces on Denizen are participating locations that you, as a Miamicoin or Stacks holder, can access just by showing proof you own the token! The co-workings spaces
                  operate on 3 seperate models in which they allow access. <b>Coin Holder</b>, <b>Minimum Coin Balance</b>, and the traditional <b>Pay-per-use</b> model but using crypto.
                </p>
              </p>
            </li>
            <li class="w-full md:w-2/5">
              <p class="text-lg font-medium leading-6 text-gray-900">
                How does my wallet open the space?
              </p>
              <p class="mt-2">
                <p class="text-base leading-6 text-gray-500">
                  Each workspace on Denize has an automated physical door lock on-premise, that is operated by use of this site from a browser. You would visit a location physically and open the door
                  via your browser. Using Web3 tech we can connect to your wallet and approve your use of the space depending on the workspaces entry requirement.
                  <br /><br />
                  This system works in tandem with the other means to access the space.
                </p>
              </p>
            </li>
            <li class="w-full md:w-2/5">
              <p class="text-lg font-medium leading-6 text-gray-900">
                Can I open a door from my mobile phone?
              </p>
              <p class="mt-2">
                <p class="text-base leading-6 text-gray-500">
                  Short answer - not <b>yet</b>. The technology in crypto is advancing quickly and very soon you should be able to connect your stacks wallet
                  to your mobile phone browser. For now, this all works via desktop/laptop browser. As soon as the funtionality exists, we will support it.
                </p>
              </p>
            </li>
            <li class="w-full md:w-2/5">
              <p class="text-lg font-medium leading-6 text-gray-900">
                Am I opening an actaul door?
              </p>
              <p class="mt-2">
                <p class="text-base leading-6 text-gray-500">
                  Right now, <b>no</b>. Denizen is a project built for the Stacks + MiamiCoin hackathon. Ideally, this project becomes real and
                  you would be able unlock a real space! Right now access a space successfully only opens a prototype lock that sits on my desk 👍.
                </p>
              </p>
            </li>
            <li class="w-full md:w-2/5">
              <p class="text-lg font-medium leading-6 text-gray-900">
                Who determines how a space is accessed?
              </p>
              <p class="mt-2">
                <p class="text-base leading-6 text-gray-500">
                  The workspace owner or operator sets the parameters for how a space is accessed. There are 3 principal methods - 2 of which are available now.
                  <br /><br />
                  <b>Coin Holder:</b> Currently own any non-zero balance of the specified coin (like MiamiCoin) and the space will unlock.
                  <br /><br />
                  <b>Minimum Coin Balance:</b> Currently own <i>at least</i> the specified amount of the specified coin to access the space.
                  <br /><br />
                  <b>Pay-per-use (not available):</b> At the time of access, complete a transfer of the specified coin and rate to access the space. The space only will open once the transaction is confirmed.
                </p>
              </p>
            </li>
            <li class="w-full md:w-2/5">
              <p class="text-lg font-medium leading-6 text-gray-900">
                Should Timothy Carambat win the Hackathon for building a fully functional site and process?
              </p>
              <p class="mt-2">
                <p class="text-base leading-6 text-gray-500">
                  <b>I think so, don't you?</b> There is no voting system or anything so I guess you can just cheer for me on Twitter at the end of the hackathon (Sept 26th, 2021).
                  <br /><br />
                  There are lots of other cool projects going on for this hackathon so be sure to support them too!
                  <br /><br />
                  Regardless, thanks for checking out my project - you can <a className='underline text-blue-500' href='https://twitter.com/tcarambat' rel='noreferrer'>follow me on Twitter</a>
                  to follow me on my Web3 journey!
                </p>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </MainLayout>
  )

}

export default About