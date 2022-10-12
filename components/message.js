

export default function Message({children, avatar, username, description}) {
    return (
        <div className="mt-3 p-8 shadow-md hover:bg-sky-50 rounded-lg">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full"/>
                <h2 >{username}</h2>
            </div>
            <div className="py-4 ">
                <p className="text-sm font-normal">{description}</p>
            </div>
            {children}
        </div>
    )
}