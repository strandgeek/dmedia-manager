import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { MediaPicker } from 'react-dmedia-manager'

const Home: NextPage = () => {
  return (
    <div>
      <MediaPicker />
    </div>
  )
}

export default Home
