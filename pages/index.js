import styles from '/styles/Form.module.css';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState, useRef } from "react";

export default function Login(){
  const router = useRouter();
  // react Hooks to store state variables
  const [user, setUser] = useState('');
  const [error, setError] = useState('');

  const refEmail = useRef("");
  const refPassword = useRef("");

  async function handleLogin(event){    // Function to call the api for handling user login
    event.preventDefault();

    const enteredEmail = refEmail.current.value;
    const enteredPassword = refPassword.current.value;

    await fetch("/api/login", {
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
        sessionStorage.setItem('user',enteredEmail);    // Once user logs in set session storage variable to user's email
        router.push('/posts/Home');
      }
    })
  }

  async function handleLogout(event){     // Function to call the api for handling user logout
    event.preventDefault();
    sessionStorage.setItem('user','');    // Once user logs out clear session storage variable for user
  }

  // if user has already logged in then render logout page, else render login page
  return (
    <div className={styles.body}>
      {user.length > 0 ? <div>
      <h1 className = {styles.userName}>Log Out</h1>
      <form onSubmit={handleLogout} method="post">
        <button className={styles.submitBtn} type="submit">Do you wish to log out?</button>
      </form>
    </div>
      :
      <div>
      <h1 className = {styles.userName}>Log In</h1>
      {/* <form action="/api/login" method="post"> */}
      <form onSubmit={handleLogin} method="post">
        <input className={styles.input} type="email" autoComplete="off" name="email" placeholder="Email" required ref={refEmail}/>
        <input className={styles.input} type="password" autoComplete="off" name="password" placeholder="password" required ref={refPassword}/>
        <button className={styles.submitBtn} type="submit">Log In</button>
      </form>
      <Link className={styles.link} href="/components/Signup">Don't have an account? Create Account</Link><br/>
      <h1>{error}</h1>
    </div>
    }
    </div>
  )
}