import styles from '/styles/Form.module.css';
import Link from 'next/link';
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

export default function Signup(){

  const router = useRouter();

  // react Hooks to store state variables
  const [error, setError] = useState('');
  const [user, setUser] = useState('');

  useEffect(()=> {
    setUser(sessionStorage.getItem('user'));
  },[])

  const refTitle = useRef("");
  const refDesc = useRef("");

  async function handlePost(event){     // Function to call the api for handling user registration
    event.preventDefault();

    const enteredTitle = refTitle.current.value;
    const enteredDesc = refDesc.current.value;
    let d = new Date();
    var date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();

    await fetch("/api/posts", {    // fetch API call to POST the new blog details to Backend
      method: "POST",
      body : JSON.stringify({
        author : user,
        title : enteredTitle,
        description : enteredDesc,
        likes : 0,
        createdOn : date,
        lastUpdatedOn : date 
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
        router.push('/posts/Home');
      }
    })
  }
  return (
    <div className={styles.body}>
        <Link className={styles.link} href="/posts/Home">Back to Home</Link><br/>
        <h1 className = {styles.userName}>Write a New Blog</h1>
        <form onSubmit={handlePost} method="post">
            <input className={styles.input} type="text" autoComplete="off" placeholder="Title" required ref={refTitle}/>
            <input className={styles.input} type="text" autoComplete="off" placeholder="Description" required ref={refDesc}/>
            <button className={styles.submitBtn} type="submit">Create Blog</button>
        </form>
        <h1>{error}</h1>
    </div>
  )
}
