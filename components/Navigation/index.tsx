import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Bars3Icon } from '@heroicons/react/24/solid'
import SingleLink from './SingleLink'
import type { PolicyId, StakeKey } from '@/@types'
import type { PolicyHoldersResponse } from '@/pages/api/policy/[policy_id]/holders'
import { POLICY_IDS, RIICOO_STAKE_KEY } from '@/constants'

const Navigation = () => {
  const giveawaysSdkRef = useRef(null)
  const pollsSdkRef = useRef(null)

  const router = useRouter()
  const [isNavOpen, setIsNavOpen] = useState(false)

  const [labPassHolderStakeKeys, setLabPassHolderStakeKeys] = useState<StakeKey[]>([])

  const fetchStakeKeys = async (policyId: PolicyId): Promise<StakeKey[]> => {
    try {
      const res = await axios.get<PolicyHoldersResponse>(`/api/policy/${policyId}/holders`)

      return res.data.stakeKeys
    } catch (error: any) {
      console.error(error.message)
      return []
    }
  }

  useEffect(() => {
    fetchStakeKeys(POLICY_IDS['LAB_PASS']).then((sKeys) => setLabPassHolderStakeKeys(sKeys))
  }, [])

  return (
    <nav className='flex items-center'>
      {labPassHolderStakeKeys.length ? (
        <Script
          src='https://labs.badfoxmc.com/sdk.min.js'
          onReady={() => {
            // @ts-ignore
            const giveawaysSdk = new BadLabsSDK({ product: 'giveaways', creatorStakeKey: RIICOO_STAKE_KEY, otherStakeKeys: labPassHolderStakeKeys })
            giveawaysSdkRef.current = giveawaysSdk

            // @ts-ignore
            const pollsSdk = new BadLabsSDK({ product: 'polls', creatorStakeKey: RIICOO_STAKE_KEY, otherStakeKeys: labPassHolderStakeKeys })
            pollsSdkRef.current = pollsSdk
          }}
        />
      ) : null}

      <button
        type='button'
        onClick={() => setIsNavOpen((prev) => !prev)}
        className='lg:hidden flex items-center p-1 mx-1 rounded-lg text-sm hover:bg-zinc-700 focus:outline-none focus:ring-zinc-600 focus:ring-2'
      >
        <Bars3Icon className='w-7 h-7' />
      </button>

      <div className={(isNavOpen ? 'block' : 'hidden') + ' lg:block'}>
        <ul className='flex flex-col lg:flex-row absolute right-0 lg:static overflow-auto lg:overflow-visible max-h-[80vh] lg:max-h-auto w-60 lg:w-auto mt-8 lg:mt-0 p-4 lg:px-8 lg:space-x-10 bg-zinc-900 lg:bg-transparent rounded-lg border border-green-400'>
          <li
            onClick={() => {
              if (router.pathname === '/') window.scrollTo({ top: 0 })
              setIsNavOpen(false)
            }}
          >
            <SingleLink label='Home' path='/' />
          </li>

          <li className='relative'>
            <SingleLink
              label='Governance'
              onClick={() => {
                if (pollsSdkRef.current) {
                  // @ts-ignore
                  pollsSdkRef.current?.loadWallets({ injectId: 'inject-wallets-polls' })
                }
              }}
            />

            <div id='inject-wallets-polls' className='lg:absolute lg:-right-1/2 flex flex-col'>
              {/* Wallets will be injected here */}
            </div>
          </li>

          <li className='relative'>
            <SingleLink
              label='Giveaways'
              onClick={() => {
                if (giveawaysSdkRef.current) {
                  // @ts-ignore
                  giveawaysSdkRef.current?.loadWallets({ injectId: 'inject-wallets-giveaways' })
                }
              }}
            />

            <div id='inject-wallets-giveaways' className='lg:absolute lg:-right-1/2 flex flex-col'>
              {/* Wallets will be injected here */}
            </div>
          </li>

          <li onClick={() => setIsNavOpen(false)}>
            <SingleLink label='Staking' url='https://labtoken.staking.zip/' />
          </li>

          <li
            onClick={() => {
              if (router.pathname === '/takeovers') window.scrollTo({ top: 0 })
              setIsNavOpen(false)
            }}
          >
            <SingleLink label='Takeovers' path='/takeovers' />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
