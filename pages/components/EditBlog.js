import styles from '/styles/Form.module.css';
import Link from 'next/link';
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

export default function Signup(){

  const router = useRouter();

  // react Hooks to store state variables
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  var old = ""

  useEffect(()=> {
    setUser(sessionStorage.getItem('user'));
  },[])

  const refOldTitle = useRef("");
  const refTitle = useRef("");
  const refDesc = useRef("");

  async function handleEdit(event){     // Function to call the api for handling user registration
    event.preventDefault();

    const enteredOldTitle = refOldTitle.current.value;
    const enteredTitle = refTitle.current.value;
    const enteredDesc = refDesc.current.value;
    let d = new Date();
    var date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();

    await fetch("/api/posts", {    // fetch API call
      method: "PUT",
      body : JSON.stringify({
        author : user,
        oldTitle : enteredOldTitle,
        title : enteredTitle,
        description : enteredDesc,
        lastUpdatedOn : date 
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      setError(data.message);
      if(data.message == "Successful"){
        router.push('/posts/Home');
      }
    })
  }

  async function handleDelete(event){     // Function to call the api for handling user registration
    event.preventDefault();

    const enteredOldTitle = refOldTitle.current.value;

    await fetch("/api/posts", {    // fetch API call
      method: "DELETE",
      body : JSON.stringify({
        author : user,
        oldTitle : enteredOldTitle
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => {
      return response.text();
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
        <h1 className = {styles.userName}>Edit Blog</h1>
        <form onSubmit={handleEdit} method="post">
        <input className={styles.input} type="text" autoComplete="off" placeholder='Old Title' required ref={refOldTitle}/>
            <input className={styles.input} type="text" autoComplete="off" placeholder='New Title' required ref={refTitle}/>
            <input className={styles.input} type="text" autoComplete="off" placeholder='New description' required ref={refDesc}/>
            <button className={styles.submitBtn} type="submit">Update Blog</button>
        </form>
        <form onSubmit={handleDelete} method="post">
            <input className={styles.input} type="text" placeholder="Enter title to delete" ref={refOldTitle}/>
            <button className={styles.submitBtn} type="submit">Delete Blog</button>
        </form>
        <h1>{error}</h1>
    </div>
  )
}