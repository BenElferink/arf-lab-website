import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import SingleLink from './SingleLink'
import Script from 'next/script'

const HOST_STAKE_KEY = 'stake1u8fp9efr3u963ezaurly56xg6rvgs38hj2azmg0esc9ppqqkqj0dr'

const Navigation = () => {
  const router = useRouter()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const giveawaysSdkRef = useRef(null)

  return (
    <nav className='flex items-center'>
      <Script
        src='https://labs.badfoxmc.com/sdk.min.js'
        onReady={() => {
          // @ts-ignore
          const sdk = new BadLabsSDK({ product: 'giveaways', creatorStakeKey: HOST_STAKE_KEY })
          giveawaysSdkRef.current = sdk
        }}
      />

      <button
        type='button'
        onClick={() => setIsNavOpen((prev) => !prev)}
        className='sm:hidden flex items-center p-1 mx-1 rounded-lg text-sm hover:bg-zinc-700 focus:outline-none focus:ring-zinc-600 focus:ring-2'
      >
        <Bars3Icon className='w-7 h-7' />
      </button>

      <div className={(isNavOpen ? 'block' : 'hidden') + ' sm:block'}>
        <ul className='flex flex-col sm:flex-row absolute right-0 sm:static overflow-auto sm:overflow-visible max-h-[80vh] sm:max-h-auto w-60 sm:w-auto mt-8 sm:mt-0 p-4 sm:px-8 sm:space-x-10 bg-zinc-900 sm:bg-transparent rounded-lg border-2 border-green-400'>
          <li
            onClick={() => {
              if (router.pathname === '/') window.scrollTo({ top: 0 })
              setIsNavOpen(false)
            }}
          >
            <SingleLink label='Home' path='/' />
          </li>
          <li onClick={() => setIsNavOpen(false)}>
            <SingleLink label='Staking' url='https://labtoken.staking.zip/' />
          </li>

          <li className='relative'>
            <SingleLink
              label='Giveaways'
              onClick={() => {
                // @ts-ignore
                if (giveawaysSdkRef.current) giveawaysSdkRef.current.loadWallets({ injectId: 'inject-wallets' })
              }}
            />

            <div id='inject-wallets' className='sm:absolute sm:-right-1/2 flex flex-col'>
              {/* Wallets will be injected here */}
            </div>
          </li>
        </ul>
      </div>

      {/* <div className='hidden md:block'>
        <Link
          href='/wallet'
          onClick={() => window.scroll({ top: 0, left: 0 })}
          className={
            'mx-2 p-4 rounded-lg text-sm ' +
            (router.pathname === '/wallet' ? 'bg-zinc-700 text-white' : 'bg-zinc-900 hover:bg-zinc-700 hover:text-white')
          }
        >
          Wallet
        </Link>
      </div> */}
    </nav>
  )
}

export default Navigation
