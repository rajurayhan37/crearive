import Link from "next/link";
import { auth } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

function Nav() {
    const [ user, loading ] = useAuthState(auth);

    return (
        <div className="flex justify-between items-center py-5">
            <Link href={"/"}>
                <button className="text-lg font-medium">Home</button>
            </Link>
            <ul className="flex items-center gap-10">
                {!user && (
                    <Link href={"/auth/login"}>
                        <a className="py-2 px-4 text-sm bg-blue-600 text-white rounded-lg font-medium ml-8">Join Now</a>
                    </Link>
                )}

                {user && (
                    <div className="flex items-center gap-3">
                        <Link href={"/post"}>
                            <button className="font-medium bg-blue-600 hover:bg-blue-500 text-white text-sm py-2 px-4 rounded-lg">
                               Create Post
                            </button>
                        </Link>
                        <Link href={"/dashboard"}>
                            <button className="font-medium bg-blue-600 hover:bg-blue-500 text-white text-sm py-2 px-4 rounded-lg">
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
        </div>
    );
}

export default Nav;