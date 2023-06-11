import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function Success() {
    const { user, error, isLoading } = useUser();
    
    return (
        <main>
            <div className="bg-slate-950 text-yellow-500 h-20 flex justify-between items-center px-7">
            <p className='font-bold text-xl'>CampusFest</p>
            {user ?
            <div className='flex'>
                <p className='mr-4'>{user.name}</p>
                <p><a className="block" href="/api/auth/logout">Logout</a></p>
            </div>
            :
            <a href="/api/auth/login">Login</a>
            }
            </div>
            <div className="h-[calc(100vh-128px-20px-20px)] text-xl flex flex-col justify-center items-center">
                <p>Your event has been successfully posted.</p>
                <Link href="/" className='underline text-blue-800 mt-4'>Back to events →</Link>
            </div>
        </main>
    )
}