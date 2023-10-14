import Glitch from './Glitch'

const About = () => {
  return (
    <div id='about' className='mt-40'>
      <div className='flex items-center justify-center'>
        <Glitch>Our Story</Glitch>
      </div>

      <div className='max-w-xl m-2 p-5 bg-neutral-900/70 rounded-xl border border-green-400 shadow-neon'>
        <p className='my-4 text-zinc-400'>
          Anatomy NFT was created by NFT enthusiasts, and the art created is top notch. Unfortunately due to some
          complications within the Lab some experiments failed and barely made it.
        </p>

        <p className='my-4 text-zinc-400'>
          <strong className='text-zinc-200'>Experiment I</strong> was the release of Anatomies on the Cardano
          Blockchain, this was a success.
        </p>

        <p className='my-4 text-zinc-400'>
          <strong className='text-zinc-200'>Experiment II</strong> was evolving these Anatomies into Bionic
          Anatomies, this is where some problems started to occur! The evolution of the Bionics was the only one
          that made it!
        </p>

        <p className='my-4 text-zinc-400'>
          <strong className='text-zinc-200'>Experiment III</strong> &amp;{' '}
          <strong className='text-zinc-200'>Experiment IIII</strong> were the Animal and Human evolutions, which
          never saw the light of day! These experiments where scrapped for the time-being, but we haven&apos;t
          given up just yet, and created Experiment 0.
        </p>

        <p className='my-4 text-zinc-400'>
          <strong className='text-zinc-200'>Experiment 0</strong> is created in the form of a token called $LAB,
          with this we&apos;ll build our foundation, and one day we&apos;ll see if we could revive the unfulfilled
          experiments.
        </p>

        <p className='my-4 font-bold text-green-400'>To be continued...</p>
      </div>
    </div>
  )
}

export default About
