import Landing from '@/srccomponents/Landing';
import About from '@/srccomponents/About';
import Tokenomics from '@/srccomponents/Tokenomics';
import Roadmap from '@/srccomponents/Roadmap';
import Partnerships from '@/srccomponents/Partnerships';
import Team from '@/srccomponents/Team';

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
