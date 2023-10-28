import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { MinusCircleIcon } from '@heroicons/react/24/outline'
import useScreenSize from '@/hooks/useScreenSize'
import Glitch from '../Glitch'
import styles from './Roadmap.module.css'

const data = [
  {
    checked: true,
    chapter: 'Q2 2023',
    events: [
      {
        checked: true,
        title: 'Drips of $LAB in server',
      },
      {
        checked: true,
        title: 'New Discord',
      },
      {
        checked: true,
        title: 'New X/Twitter',
      },
      {
        checked: true,
        title: 'Migrate & Merge',
      },
    ],
  },
  {
    checked: true,
    chapter: 'Q3 2023',
    events: [
      {
        checked: true,
        title: 'Website Development',
      },
      {
        checked: true,
        title: 'Staking',
      },
      {
        checked: true,
        title: 'Giveaways',
      },
      {
        checked: true,
        title: 'Governance',
      },
    ],
  },
  {
    checked: true,
    chapter: 'Q4 2023',
    events: [
      {
        checked: true,
        title: 'Lab Pass mint',
      },
      {
        checked: true,
        title: 'Add Lab Pass to staking and drip services',
      },
      {
        checked: true,
        title: 'Poker tournaments for Lab Pass holders',
      },
      {
        checked: true,
        title: 'Website Updates',
      },
      {
        checked: false,
        title: "VIP New Year's Eve Party",
      },
    ],
  },
  {
    checked: false,
    chapter: 'Q1 2024',
    events: [
      {
        checked: false,
        title: 'Design NFT (EXP 2 & EXP 3 & EXP 4 = EXP 5)',
      },
      {
        checked: false,
        title: 'Mint EXP V',
      },
    ],
  },
]

const Roadmap = () => {
  const { isMobile } = useScreenSize()

  return (
    <div id='roadmap' className='w-full mt-40'>
      <div className='mb-4 flex items-center justify-center'>
        <Glitch>Roadmap</Glitch>
      </div>

      {data.map((phase, idx) => {
        const isLeft = idx % 2 !== 0

        return (
          <div
            key={phase.chapter}
            className={`relative ${styles.chapter} ${!isMobile ? (isLeft ? styles.leftChapter : styles.rightChapter) : styles.mobileChapter}`}
          >
            <h2 className='text-xl'>
              {phase.checked ? <CheckCircleIcon className='w-6 h-6' /> : <MinusCircleIcon className='w-6 h-6' />}
              {phase.chapter}
            </h2>

            {phase.events.map((event) => (
              <div
                key={event.title}
                className={`rounded-lg bg-zinc-900/50 backdrop-blur ${styles.event} ${
                  !isMobile ? (isLeft ? styles.leftEvent : styles.rightEvent) : styles.mobileEvent
                }`}
              >
                <h3 className='text-sm text-zinc-300'>
                  {event.checked ? <CheckCircleIcon className='w-6 h-6' /> : <MinusCircleIcon className='w-6 h-6' />}
                  {event.title}
                </h3>
              </div>
            ))}

            {isMobile ? <br /> : null}
          </div>
        )
      })}
    </div>
  )
}

export default Roadmap
