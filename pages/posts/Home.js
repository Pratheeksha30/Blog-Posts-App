import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Nav from '../components/Nav.js';
import Posts from '../components/Posts.js';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState, useRef } from "react";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav/>
        <Posts/>
        {/* <Link></Link> */}
      </main>
    </div>
  )
}
