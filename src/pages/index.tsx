import Landing from '@/src/components/Landing';
import About from '@/src/components/About';
import Tokenomics from '@/src/components/Tokenomics';
import Roadmap from '@/src/components/Roadmap';
import Partnerships from '@/src/components/Partnerships';
import Team from '@/src/components/Team';

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
  );
};

export default Page;
