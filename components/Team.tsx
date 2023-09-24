import Image from 'next/image'
import Glitch from './Glitch'
import SocialIcon from './SocialIcon'

interface TeamMember {
  profilePicture: string
  name: string
  titles: string[]
  description: string
  socials: string[]
}

const TeamCard = (props: TeamMember) => {
  const { profilePicture, name, titles, description, socials } = props

  return (
    <article className='flex flex-col items-center justify-center w-72 m-2 p-5 bg-neutral-900/70 rounded-xl border border-green-400 shadow-[0_0_5px_0_#4ade80]'>
      <div className='h-40 w-40 mt-2 mb-5 relative'>
        <Image src={profilePicture} alt={name} fill sizes='10rem' className='object-cover rounded-full' />
      </div>

      <div className='m-3 text-center'>
        <h3 className='text-lg font-md'>{name}</h3>
        {titles.map((str) => (
          <h4 key={`${name}:${str}`} className='text-sm text-green-400 font-normal'>
            {str}
          </h4>
        ))}
        <p className='mt-3 text-xs text-zinc-400 font-light'>{description}</p>
      </div>

      <div className='flex mt-auto'>
        {socials.map((url) => (
          <SocialIcon key={`social-${url}`} url={url} color='#fff' size='w-6 h-6' className='p-1 rounded-lg hover:bg-zinc-500' />
        ))}
      </div>
    </article>
  )
}

const Team = () => {
  return (
    <div id='team' className='mt-40 mb-40'>
      <div className='flex items-center justify-center'>
        <Glitch>Team</Glitch>
      </div>

      <div className='flex flex-wrap justify-center max-w-7xl'>
        {(
          [
            {
              name: 'Riicoo90 (Ricardo Kind)',
              titles: ['Founder'],
              description: 'NFT enthusiast, crypto investor, and has a lot of love for the Anatomy community',
              profilePicture: '/media/team/riicoo90.jpg',
              socials: ['https://x.com/riicoo90', , 'https://discord.com/users/698650605677314108', 'https://www.youtube.com/@Riicoo90'],
            },
            {
              name: 'Psaeychi',
              titles: ['Community Manager', 'Graphic Designer'],
              description: 'CNFT Enthusiast, father of 3 children',
              profilePicture: '/media/team/psaeychi.png',
              socials: ['https://x.com/psaeychicnft', 'https://discord.com/users/881884080445222933'],
            },
            {
              name: 'Ben',
              titles: ['Fullstack Developer'],
              description: 'I started my career as Fullstack Developer in 2020 & have been involved in the crypto & NFT space since 2021.',
              profilePicture: '/media/team/ben.png',
              socials: ['https://x.com/BenElferink', 'https://discord.com/users/791763515554922507', 'https://github.com/BenElferink'],
            },
          ] as TeamMember[]
        ).map(({ profilePicture, name, titles, description, socials }) => (
          <TeamCard key={`team-${name}`} profilePicture={profilePicture} name={name} titles={titles} description={description} socials={socials} />
        ))}
      </div>
    </div>
  )
}

export default Team
