import Image from 'next/image'
import Glitch from './Glitch'
import SocialIcon from './SocialIcon'
import Navigation from './Navigation'

const Header = () => {
  return (
    <header className='w-screen py-4 px-2 bg-black/70 flex items-center justify-between sticky top-0 z-40'>
      <div className='flex items-center'>
        <div className='h-16 w-16 relative'>
          <Image src='/media/coin-v1.png' alt='logo' priority fill sizes='5rem' className='object-contain rounded-full' />
        </div>
        <div className='hidden sm:inline'>
          <Glitch fontSize='30px'>$LAB Token</Glitch>
        </div>
      </div>

      <div className='flex items-center'>
        <Navigation />

        <div className='mx-4 flex items-center'>
          <SocialIcon
            network='x'
            url='https://x.com/labarftoken'
            color='#fff'
            className='p-1 mx-1 rounded-lg hover:bg-zinc-600 focus:outline-none focus:ring-zinc-500 focus:ring-2'
          />
          <SocialIcon
            network='discord'
            url='https://discord.gg/szF6G9gYwy'
            color='#fff'
            className='p-1 mx-1 rounded-lg hover:bg-zinc-600 focus:outline-none focus:ring-zinc-500 focus:ring-2'
          />
        </div>
      </div>
    </header>
  )
}

export default Header
