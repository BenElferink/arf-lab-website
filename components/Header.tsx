import Image from 'next/image'
import SocialIcon from './SocialIcon'
import Glitch from './Glitch'

const Header = () => {
  return (
    <header className='w-screen py-4 px-2 bg-black bg-opacity-70 flex items-center justify-between sticky top-0 z-40'>
      <div className='flex items-center'>
        <div className='h-16 w-16 relative'>
          <Image
            src='/media/coin-v1.png'
            alt='logo'
            priority
            fill
            sizes='5rem'
            className='object-contain rounded-full'
          />
        </div>
        <div className='hidden sm:inline'>
          <Glitch fontSize='30px'>$LAB Token</Glitch>
        </div>
      </div>

      <div className='flex items-center'>
        <SocialIcon
          network='twitter'
          url='https://twitter.com/labarftoken'
          color=''
          size='w-10 h-10'
          className='p-1 mx-1 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-blue-800 focus:ring-2'
        />
        <SocialIcon
          network='discord'
          url='https://discord.gg/szF6G9gYwy'
          color=''
          size='w-10 h-10'
          className='p-1 mx-1 rounded-lg hover:bg-purple-900 focus:outline-none focus:ring-purple-800 focus:ring-2'
        />
      </div>
    </header>
  )
}

export default Header
