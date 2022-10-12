import { auth, db } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import Message from "../components/message"
import {BsTrash2Fill} from "react-icons/bs"
import {AiFillEdit} from "react-icons/ai"
import Link from "next/link";
import Head from "next/head";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"



export default function Dashboard() {
    const route = useRouter();
    const  [ user, loading ] = useAuthState(auth);
    const [posts, setPosts] = useState([])

    const getData = async () => {
        if(loading) return;
        if(!user) return route.push('/auth/login');
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, where('user', '==', user.uid));
        const snap = onSnapshot(q, (snapshot => {
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }));

        return snap;
    }

    //Delete posts
    const deletePost = async (id) => {
        const docRef = doc(db, "posts", id);
        await deleteDoc(docRef);
        toast.error("Successfully post deleted!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        });
    }

    //Logout
    const logout = () => {
        auth.signOut();
        toast.success("Successfully logged out!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        });
    }

    useEffect(() => {
        getData();
    }, [user, loading]);

    return (
        <div>
            <Head>
                <title>Dashboard | Creative Minds</title>
            </Head>
            <h1>Your posts</h1>
            <div>
                {posts.map((post) => (
                    <Message {...post} key={post.id} >
                        <div className="mt-2 flex gap-2">
                            <Link href={{ pathname: "/post", query: post }}>
                                <button onClick={()=> editPost()} className="flex gap-2 items-center justify-center py-2 bg-blue-500 hover:bg-blue-600 px-4 rounded-lg text-white " >
                                    <AiFillEdit/>
                                    Edit
                                </button>
                            </Link>
                            <button onClick={()=> deletePost(post.id)} className="flex gap-2 items-center justify-center py-2 bg-rose-500 hover:bg-rose-600 px-4 rounded-lg text-white">
                                <BsTrash2Fill/>
                                Delete
                            </button>
                        </div>
                    </Message>
                ))}
            </div>
        </div>
    )
}