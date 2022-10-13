import Link from "next/link";
import { auth } from "../utils/firebase"
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io"

function Nav() {
    const [ user, loading ] = useAuthState(auth);
    const [nav, setNav ] = useState(false)
    return (
        <div>
            <div className=" flex justify-between items-center rounded-lg bg-sky-50 p-3 mb-4">
                <Link href={"/"}>
                    <button className="text-lg font-medium">Home</button>
                </Link>
                <ul className="hidden md:flex items-center gap-10">
                    {!user && (
                        <Link href={"/auth/login"}>
                            <a className="py-2 px-4 text-sm bg-blue-600 text-white rounded-lg font-medium ml-8">Join Now</a>
                        </Link>
                    )}

                    {user && (
                        <div className="flex items-center gap-3">
                            <Link href={"/post"}>
                                <button className="font-light bg-blue-600 hover:bg-blue-500 text-white text-sm md:py-2 md:px-4 rounded-lg">
                                Create Post
                                </button>
                            </Link>
                            <Link href={"/dashboard"}>
                                <button className="font-light bg-blue-600 hover:bg-blue-500 text-white text-sm md:py-2 md:px-4 rounded-lg">
                                    My Posts
                                </button>
                            </Link>
                            <Link href={"/profile"}>
                                <img 
                                    className="w-10 h-10 rounded-full cursor-pointer" 
                                    src={user.photoURL} 
                                    alt={user.displayName} 
                                />
                            </Link>
                        </div>
                    )}
                </ul>
                <ul className="md:hidden">
                    <button onClick={()=> setNav(true)}>
                        <GiHamburgerMenu size={25}/>
                    </button>
                </ul>
            </div>
            {nav &&  <div className="absolute w-full top-0 left-0 h-screen bg-gray-200 z-100 backdrop:blur-2xl">
                <ul className="grid grid-flow-row gap-2">
                    <Link href={'/post'}>
                        <button onClick={()=> setNav(false)} className="bg-blue-600 py-3 w-full text-white hover:bg-blue-700">
                            Create Post
                        </button>
                    </Link>
                    <Link href={'/dashboard'}>
                        <button onClick={()=> setNav(false)} className="bg-blue-600 py-3 w-full text-white hover:bg-blue-700">
                            My Post
                        </button>
                    </Link>
                    <Link href={'/profile'}>
                        <button onClick={()=> setNav(false)} className="bg-blue-600 py-3 w-full text-white hover:bg-blue-700">
                            Profile
                        </button>
                    </Link>
                    <button onClick={()=> setNav(false)} className="bg-red-600 py-3 w-full text-white hover:bg-blue-700">
                        Close
                    </button>
                </ul>
            </div>
            }
            
        </div>
    );
}

export default Nav;