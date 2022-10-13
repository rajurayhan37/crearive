import Head from 'next/head'
import Message from '../components/message'
import { useEffect, useState } from 'react'
import { db } from "../utils/firebase"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


export default function Home() {
  //Create a state with all the posts
  const [ allPosts, setAllPosts ] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection( db, "posts");
    const q = query( collectionRef, orderBy("timestamp", "desc"));
    const snap = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc)=>({ ...doc.data(), id:doc.id })));
    })

    return snap;
  }


  useEffect(() => {
    getPosts();
  }, []);


  return (
    <div>
      <Head>
        <title>Creative minds | Home</title>
        <meta name="description" content="creative mind application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='my-8 text-lg font-medium'>
        <h2 className='text-xl'>See what others pepole are saying</h2>
        {allPosts.map((post) => (
          <Message {...post} key={post.id} > 
            <Link href={{pathname: `/${post.id}`, query: {...post}}}>
              <button className='text-blue-600'>
                {post.comments?.length > 0 ? post.comments?.length : 0} comments
              </button>
            </Link>
          </Message>
        ))}
      </main>
    </div>
  )
}
