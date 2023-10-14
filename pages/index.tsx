import Landing from '@/components/Landing'
import About from '@/components/About'
import Tokenomics from '@/components/Tokenomics'
import Roadmap from '@/components/Roadmap'
import Partnerships from '@/components/Partnerships'
import Team from '@/components/Team'

const Page = () => {
  return (
    <main className='flex flex-col items-center'>
      <Landing />
      <About />
      <Tokenomics />
      <Roadmap />
      <Partnerships />
      <Team />
    </main>
  )
}

export default Page
