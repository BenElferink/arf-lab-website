import Link from 'next/link';
import { Fragment, useState } from 'react';
import { firestore } from '@/utils/firebase';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Glitch from '@/components/Glitch';
import Modal from '@/components/Modal';
import MediaViewer from '@/components/MediaViewer';
import SocialIcon from '@/components/SocialIcon';
import AddTakeover from '@/components/AddTakeover';
import type { TakeoverProject } from '@/@types';
import { GetServerSideProps } from 'next';

type Props = {
  projects: (TakeoverProject & { id: string })[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const collection = firestore.collection('projects');
  const { docs } = await collection.get();

  const payload = docs.map((doc) => ({ ...(doc.data() as TakeoverProject), id: doc.id })).sort((a, b) => a.name.localeCompare(b.name));

  return { props: { projects: payload } };
};

const Page = ({ projects: projectsFromServer }: Props) => {
  const [projects, setProjects] = useState<(TakeoverProject & { id: string })[]>(projectsFromServer);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [openModalNew, setOpenModalNew] = useState(false);

  return (
    <main className='flex flex-col items-center'>
      <div className='mt-20 mx-4 flex justify-center text-center'>
        <Glitch>Community Takeover Hub</Glitch>
      </div>

      {projects.length ? (
        <div className='mt-20 mx-12 flex flex-wrap items-center justify-center'>
          {projects.map((proj) => (
            <div
              key={proj.id}
              className='m-2 rounded-full cursor-pointer hover:scale-110 transition-all'
              onClick={() => setSelectedProjectId(proj.id)}
            >
              <MediaViewer
                mediaType='IMAGE'
                src={proj.logo}
                objectFit='cover'
                withBorder
                size='w-[75vw] h-[75vw] sm:w-[300px] sm:h-[300px] rounded-full'
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className='max-w-xl m-2 mt-20 p-5 flex flex-col items-center bg-neutral-900/50 rounded-xl border border-green-400 shadow-neon backdrop-blur'>
        <h6 className='text-center text-xl font-medium text-zinc-300'>Welcome to the community takeover hub!</h6>

        <p className='m-4 text-sm text-zinc-400'>
          Sign up for any takeover project and enjoy a 50% discount on creating your staking platform with{' '}
          <Link href='https://discord.gg/W9CQXVNEe5' target='_blank' rel='noopener noreferrer' className='text-blue-400 underline'>
            Space Troopers
          </Link>
          . Our partners are committed to supporting projects like yours—take advantage of this exclusive offer!
        </p>

        <h6 className='text-center text-xl font-medium text-zinc-300'>What is the community takeover hub?</h6>

        <p className='m-4 text-sm text-zinc-400'>
          Lab Token&apos;s Community Takeover Hub is a dedicated space for Rugged/Dead/Ghosted Projects. We support projects abandoned by original
          founders, offering a platform for easy connection and collaboration. Lab Token&apos;s involvement stems from its own experience, rebranding
          from Anatomy NFT. The hub&apos;s purpose is to unite struggling projects, fostering collaboration through initiatives like poker
          tournaments, NFT swaps, and more.
        </p>

        <button
          type='button'
          onClick={() => setOpenModalNew((prev) => !prev)}
          className='w-[220px] m-1 p-3 flex items-center justify-center rounded-lg border border-transparent hover:border-neutral-50 focus:border-neutral-50 bg-gradient-to-b from-green-600 via-green-800 to-green-600 disabled:border-transparent disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <PlusCircleIcon className='w-8 h-8 mr-2' />
          Add a Project
        </button>

        <p className='m-4 text-sm text-red-400'>
          This is only for takeover projects. If you are not a takeover project, your project will be deleted.
        </p>
      </div>

      <Modal open={!!selectedProjectId} onClose={() => setSelectedProjectId('')}>
        {(() => {
          const proj = projects.find((proj) => proj.id === selectedProjectId);
          if (!proj) return null;

          return (
            <div className='flex flex-col items-center text-center'>
              <h5 className='mb-4 text-lg text-zinc-300'>{proj.name}</h5>

              <MediaViewer mediaType='IMAGE' src={proj.logo} objectFit='cover' withBorder size='rounded-xl' />

              <div className='my-2 flex'>
                {proj.links.map((url) => (
                  <SocialIcon key={`link-${url}`} url={url} color='#d4d4d8' size='w-6 h-6' className='p-1 rounded-lg hover:bg-zinc-400/40' />
                ))}
              </div>

              {proj.description || true ? (
                <p className='max-w-[420px] mt-4 text-sm text-zinc-400'>
                  {proj.description.split('\n').map((str, idx) => (
                    <Fragment key={`str-${idx}-${str}`}>
                      {str}
                      <br />
                    </Fragment>
                  ))}
                </p>
              ) : null}
            </div>
          );
        })()}
      </Modal>

      <Modal open={openModalNew} onClose={() => setOpenModalNew((prev) => !prev)}>
        <AddTakeover
          onSubmitted={(newProj) => {
            setOpenModalNew(false);
            setProjects((prev) => [...prev, newProj]);
          }}
        />
      </Modal>
    </main>
  );
};

export default Page;
