import styles from '../../styles/Home.module.css';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from 'next/link';


export default function Posts(){
  // react Hooks to store state variables
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() =>{
    setUser(sessionStorage.getItem('user'));
    AllPosts();
  },[user]);


  async function handleClick(event){
    event.preventDefault();
    
  }
  
   const AllPosts = async () => {
    await fetch("/api/posts/?user=" + user, {
      method: "GET"
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const posts = data.posts;
      setPosts(posts.map(({title,description,likes},idx) =>
        <button onClick={handleClick} className={styles.btn} id={String(idx)}>
            <p className={styles.blog} >Blog {idx+1} : <br/>Title : {title}<br/>Description : {description}<br/>Likes : {likes}</p>
        </button>
        ));
    })
    return;
  }

  return (
    <div className={styles.container}>{posts}</div>
  );
}