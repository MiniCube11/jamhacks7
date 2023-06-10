import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Account() {
    const { user, error, isLoading } = useUser();
    
    return (
        <>
            {isLoading &&
                <div>Loading...</div>
            }
            {user && (
                <div>
                    <p>{user.sub}</p>
                    <h2>{user.name}</h2>
                    {user.email}
                </div>    
            )}
        </>
    )
}