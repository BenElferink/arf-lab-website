import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import Glitch from './Glitch'

const IMAGES = [
  '/media/anatomy/daddy.png',
  '/media/anatomy/king.png',
  '/media/anatomy/lizard.png',
  '/media/anatomy/pirate.png',
  '/media/anatomy/punk.png',
]

const Landing = () => {
  const { height: windowHeight, width: windowWidth } = useWindowSize()

  const [showIndex, setShowIndex] = useState(0)

  useEffect(() => {
    setShowIndex(Math.floor(Math.random() * IMAGES.length))
  }, [])

  const [imageSize, setImageSize] = useState(1)

  useEffect(() => {
    setImageSize(windowHeight / (windowWidth < 1280 ? 1.7 : 1.5))
  }, [windowHeight, windowWidth])

  return (
    <div id='home' className='relative w-screen h-[92vh]'>
      <div className='mt-20 mx-4 flex justify-center text-center'>
        <Glitch fontSize={windowWidth < 640 ? '42px' : '69px'}>Welcome to The A.R.F Lab!</Glitch>
      </div>

      <div className='absolute bottom-0 left-0 xl:left-1/4 xl:-translate-x-1/3 transition-all duration-500'>
        <Image src={IMAGES[showIndex]} alt='anatomy' priority width={imageSize} height={imageSize} />
      </div>
    </div>
  )
}

export default Landing
