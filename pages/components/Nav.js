import Link from 'next/link';
import styles from '/styles/Home.module.css';

export default function Nav() {
  return (
    <div className={styles.nav}>
        <h1 className={styles.websiteName}>Blog Posts</h1>
        <div className={styles.navItems}>   
            <Link href="/components/newBlog" className={styles.wlink}>Post New Blog</Link>   
            <Link href="/components/EditBlog" className={styles.wlink}>Edit Blog</Link>          
            <Link href="/components/Logout" className={styles.wlink}>Log Out</Link>
        </div>
    </div>
  )
}
