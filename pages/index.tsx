import { useUser } from '@auth0/nextjs-auth0/client';
import dynamic from 'next/dynamic'
import Link from 'next/link';
import { events } from '@/data/events';

export default function Home() {
  const { user, error, isLoading } = useUser();
  const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });

  return (
    <>
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
       
        {user &&
        <div className='h-12 bg-white px-6 flex items-center'>
          <input placeholder='Search' className='rounded-full py-1 px-6 mr-2 border border-gray-400 w-[800px]' />
          <button className="rounded-full py-1 px-4 text-center bg-slate-300 mr-2">Filter</button>
          <Link href="/form" className="rounded-full py-1 px-4 text-center bg-slate-300">Submit Event</Link>
        </div>
        }
        
        {user ?
        <div className='flex'>
          <MapWithNoSSR />
          <div>
            <p className='px-5 font-semibold mt-[4px]'>Events near you</p>
            <div className='h-[calc(100vh-128px-20px-32px)] overflow-y-scroll ml-4 pr-4 my-[10px] mt-[14px]'>
              {events.map(event => (
                <div className="block bg-white w-[280px] mb-4 py-3 pb-6 px-4 border rounded-md">
                  <p className='font-semibold text-lg'>{event.name}</p>
                  <div className='flex text-xs text-slate-700'>
                    <p className='w-[200px]'>{event.date} @ {event.time}</p>
                    {/* <p>{event.time}</p> */}
                  </div>
                  <div className='flex text-xs text-slate-700'>
                    <p className='w-[50px]'>{event.distance}km</p>
                    <p>{event.location}</p>
                  </div>
                  <p className='mt-2 text-sm'>{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        :
          <div className="h-[calc(100vh-128px-20px-20px)] text-xl flex justify-center items-center">
            <p>Please log in first to view nearby events.</p>
          </div>
        }
      </main>
    </>
  )
}
