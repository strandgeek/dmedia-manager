import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { MediaGallery } from 'react-dmedia-manager'

const Home: NextPage = () => {
  return (
    <div>
      <MediaGallery />
    </div>
  )
}

export default Home
