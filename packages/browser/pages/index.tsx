import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Navbar from '@/components/Navbar';
import HeadLayout from '@/components/HeadLayout';
import Hero from '@/components/Hero';

const Home: NextPage = () => {
  return (
    <>
      <HeadLayout
        title="Home"
        description="PodCaster is a simple podcast hosting application"
        keywords="PodCaster, podcasts,  podcasting"
      />
      <Hero />
    </>
  );
};

export default Home;
