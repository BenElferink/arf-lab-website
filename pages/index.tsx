import Landing from '@/components/Landing'
import About from '@/components/About'
import Tokenomics from '@/components/Tokenomics'
import Team from '@/components/Team'

export default function Home() {
  return (
    <main className='flex flex-col items-center'>
      <Landing />
      <About />
      <Tokenomics />
      <Team />
    </main>
  )
}
