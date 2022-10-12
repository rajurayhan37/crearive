import { useRouter } from "next/router";
import {auth} from "../utils/firebase";


export default function Profile() {
    const route = useRouter();

    const userLogout = () => {
        auth.signOut();
        route.push('/auth/login');
    }
    return (
        <div className="mt-16 flex justify-center">
            <div className="rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 bg-blue-500">
                <img src="https://i.imgur.com/dYcYQ7E.png" className="w-full" />
                <div className="flex justify-center -mt-8">
                    <img src={auth.currentUser?.photoURL} className="rounded-full border-solid border-white border-2 -mt-3"/>		
                </div>
                <div className="text-center px-3 pb-6 pt-2">
                    <h3 className="text-white text-lg bold">{auth.currentUser?.displayName}</h3>
                    <p className="mt-2 font-light text-sm text-white">Here is your posts statics!</p>
                </div>
                <div className="flex justify-center pb-3 text-white">
                    <div className="text-center mr-3 border-r pr-3">
                        <h2>34</h2>
                        <span>Posts</span>
                    </div>
                    <div className="text-center">
                        <h2>42</h2>
                        <span>Comments</span>
                    </div>
                </div>

                <button 
                    onClick={() => userLogout()}
                    className="bg-red-600 py-4 hover:bg-red-500 w-full text-white"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}