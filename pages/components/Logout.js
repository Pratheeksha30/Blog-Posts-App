import styles from '/styles/Form.module.css';
import Link from 'next/link';
import { useState, useRef } from "react";
import { useRouter } from 'next/router';

export default function Login(){
  const router = useRouter();
  async function handleLogout(event){
    event.preventDefault();
    sessionStorage.setItem('user','');    // Once user logs out clear session storage variable for user
    router.push('/');
  }

  return (
    <div className={styles.body}>
      <h1 className = {styles.userName}>Log Out</h1>
      <form onSubmit={handleLogout} method="post">
        <button className={styles.submitBtn} type="submit">Do you wish to log out?</button>
      </form>
    </div>
  )
}