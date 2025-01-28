import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { MinusCircleIcon } from '@heroicons/react/24/outline'
import useScreenSize from '@/hooks/useScreenSize'
// import Glitch from '../Glitch'
import styles from './Roadmap.module.css'

const data = [
  {
    checked: true,
    chapter: 'Airdrop Rewards',
    events: [
      {
        checked: true,
        title: '200 $ADA',
      },
      {
        checked: true,
        title: '15,500,000 $BANK',
      },
      {
        checked: true,
        title: '3,400 $OMNI',
      },
    ],
  },
  {
    checked: true,
    chapter: 'Staking Rewards',
    events: [
      {
        checked: true,
        title: '59,000,000 $BANK',
      },
      {
        checked: true,
        title: '129,000 $OMNI',
      },
    ],
  },
]

const Roadmap = () => {
  const { isMobile } = useScreenSize()

  return (
    <div id='roadmap' className='w-full mt-40'>
      {/* <div className='mb-4 flex items-center justify-center'>
        <Glitch>The Lab always cooks...</Glitch>
      </div> */}

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
