import Link from 'next/link'
import Image from 'next/image'
import Glitch from './Glitch'

const data = [
  {
    name: 'Bad Fox MC',
    url: 'https://badfoxmc.com',
    logoUrl: '/media/logo/badfoxmc.png',
  },
  {
    name: 'Space Troopers',
    url: 'https://spacetroopers.org',
    logoUrl: '/media/logo/spacetroopers.png',
  },
  {
    name: 'Cardano Lands',
    url: 'https://cardanolands.com',
    logoUrl: '/media/logo/cardanolands.png',
  },
]

const Partnerships = () => {
  return (
    <div id='partnerships' className='mt-40'>
      <div className='flex items-center justify-center'>
        <Glitch>Partnerships</Glitch>
      </div>

      <div className='flex flex-wrap items-center justify-center'>
        {data.map(({ name, url, logoUrl }) => (
          <Link
            key={`partner-${name}`}
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='w-20 h-20 m-4 flex flex-col items-center justify-center relative'
          >
            <Image src={logoUrl} alt='logo' fill sizes='5rem' className='object-contain drop-shadow-footeritem' />
            <h6 className='absolute -bottom-7 text-xs whitespace-nowrap'>{name}</h6>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Partnerships
