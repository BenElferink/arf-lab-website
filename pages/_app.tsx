import { Fragment } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '@/components/Header'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <meta name='description' content='The official $LAB Token website.' />

        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='author' content='Ben Elferink' />
        {/* <meta name='description' content='' /> */}
        {/* <meta name='keywords' content='' /> */}

        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />

        <title>$LAB Token</title>
      </Head>

      <Header />
      <main className='w-screen min-h-screen bg-black bg-opacity-70'>
        <Component {...pageProps} />
      </main>
    </Fragment>
  )
}
