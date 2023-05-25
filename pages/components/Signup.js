import styles from '/styles/Form.module.css';
import Link from 'next/link';
import { useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Signup(){

  const router = useRouter();

  // react Hooks to store state variables
  const [error, setError] = useState('');
  const [user, setUser] = useState('');

  const refEmail = useRef("");
  const refPassword = useRef("");

  async function handleSignup(event){     // Function to call the api for handling user registration
    event.preventDefault();

    const enteredEmail = refEmail.current.value;
    const enteredPassword = refPassword.current.value;

    await fetch("/api/signup", {    // fetch API call
      method: "POST",
      body : JSON.stringify({
        email : enteredEmail,
        password : enteredPassword
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      setError(data.message);
      if(data.message == "Successful"){
        sessionStorage.setItem('user',enteredEmail);    // Once user signs up, they are logged in automatically
        router.push('/posts/Home');
      }
    })
  }
  return (
    <div className={styles.body}>
        <h1 className = {styles.userName}>Sign Up</h1>
        <form onSubmit={handleSignup} method="post">
            <input className={styles.input} type="email" autoComplete="off" name="email" placeholder="Email" required ref={refEmail}/>
            <input className={styles.input} type="password" autoComplete="off" name="password" placeholder="password" minLength={6} required ref={refPassword}/>
            <button className={styles.submitBtn} type="submit">Create Account</button>
        </form>
        <Link className={styles.link} href="/">Already have an account? Log in here</Link><br/>
        <h1>{error}</h1>
    </div>
  )
}