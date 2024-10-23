import { useRouter } from 'next/router';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import SingleLink from './SingleLink';

const Navigation = () => {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className='flex items-center'>
      <button
        type='button'
        onClick={() => setIsNavOpen((prev) => !prev)}
        className='lg:hidden flex items-center p-1 mx-1 rounded-lg text-sm hover:bg-zinc-700 focus:outline-none focus:ring-zinc-600 focus:ring-2'
      >
        <Bars3Icon className='w-7 h-7' />
      </button>

      <div className={(isNavOpen ? 'block' : 'hidden') + ' lg:block'}>
        <ul className='flex flex-col lg:flex-row absolute right-0 lg:static overflow-auto lg:overflow-visible max-h-[80vh] lg:max-h-auto w-60 lg:w-auto mt-8 lg:mt-0 p-4 lg:px-8 lg:space-x-10 bg-zinc-900 lg:bg-transparent rounded-lg border border-green-400'>
          <li
            onClick={() => {
              if (router.pathname === '/') window.scrollTo({ top: 0 });
              setIsNavOpen(false);
            }}
          >
            <SingleLink label='Home' path='/' />
          </li>

          <li onClick={() => setIsNavOpen(false)}>
            <SingleLink label='Mint Pass' url='https://labtoken.bravemint.io/' />
          </li>

          <li onClick={() => setIsNavOpen(false)}>
            <SingleLink label='Staking' url='https://labtoken.staking.zip/' />
          </li>

          <li
            onClick={() => {
              if (router.pathname === '/takeovers') window.scrollTo({ top: 0 });
              setIsNavOpen(false);
            }}
          >
            <SingleLink label='Takeovers' path='/takeovers' />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
