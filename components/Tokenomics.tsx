import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { Doughnut } from 'react-chartjs-2'
import Glitch from './Glitch'

const TOTAL_SUPPLY = 40000000

const TOKENOMICS = [
  {
    label: 'Staking / Dripping',
    description:
      'This function will be used in our Discord server where we  to drip percentages of $LAB, drip daily to get a higher streak of dripping.',
    amount: 16000000,
    percent: 40,
    color: 'rgb(100,200,100)',
  },
  {
    label: 'Pre-Sale',
    description: 'Total supply of 40.000.000 tokens, 25% of the token supply will be distributed in our pre-sale.',
    amount: 10000000,
    percent: 25,
    color: 'rgb(200,100,100)',
  },
  {
    label: 'DEX LP',
    description: 'DEX initial tokens deposit along with a large portion of the pre-sale proceeds.',
    amount: 8000000,
    percent: 20,
    color: 'rgb(100,100,200)',
  },
  {
    label: 'Development',
    description: 'Partnerships, further development of website, NFT collection (using Anatomy medicines).',
    amount: 4000000,
    percent: 10,
    color: 'rgb(200,100,200)',
  },
  {
    label: 'Community Wallet',
    description: 'To give back to our holders we will use this for giveaways and community engagement.',
    amount: 2000000,
    percent: 5,
    color: 'rgb(200,200,100)',
  },
]

ChartJS.register(ArcElement, Legend, Tooltip, Title)

const Tokenomics = () => {
  const { width: screenWidth } = useWindowSize()
  const [size, setSize] = useState(0)

  useEffect(() => {
    setSize((prev) => (!prev ? Math.min(screenWidth * 0.85, 350) : prev))
  }, [screenWidth])

  return (
    <div id='tokenomics' className='mt-40'>
      <div className='flex items-center justify-center'>
        <Glitch>Tokenomics</Glitch>
      </div>

      {size ? (
        <div className='relative w-fit mx-auto my-6'>
          <Doughnut
            width={size}
            height={size}
            data={{
              labels: TOKENOMICS.map((x) => x.label),
              datasets: [
                {
                  data: TOKENOMICS.map((x) => x.amount),
                  backgroundColor: TOKENOMICS.map((x) => x.color),
                },
              ],
            }}
            options={{
              responsive: true,
              cutout: size / 2 - 50,
              elements: {
                arc: {
                  borderWidth: 0,
                  borderColor: 'transparent',
                },
              },
              plugins: {
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: (item) =>
                      `${item.formattedValue} (${Math.round(
                        (100 / TOTAL_SUPPLY) * Number(item.formattedValue.replaceAll(',', ''))
                      )}%)`,
                  },
                },
                legend: {
                  display: false,
                },
              },
            }}
          />

          <p className='font-bold text-center text-xl text-zinc-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            Total Supply
            <br />
            {TOTAL_SUPPLY.toLocaleString('en-GB')}
          </p>
        </div>
      ) : null}

      <div className='max-w-[1024px] mx-auto flex flex-wrap justify-center'>
        {TOKENOMICS.map((obj, i) => (
          <div
            key={`tokenomics-info-${obj.label}`}
            className='max-w-[42ch] group grow m-2 p-5 rounded-lg border border-green-400 shadow-neon bg-neutral-900/70'
          >
            <h2 className='mb-3 font-semibold text-2xl text-zinc-200'>
              {obj.label}&nbsp;
              <span className='inline-block text-green-400'>{obj.percent}%</span>
            </h2>
            <p className='m-0 text-sm text-zinc-400'>{obj.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tokenomics
