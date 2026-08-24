import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUsers } from '../api/githubUsers'
export  const GithubUsers = () => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers, 
    })
    if (isError) return <h2>Error:{error.message}</h2>
    if (isPending) return <h3>Loading...</h3>
    return (
        <>
            <ul className=' flex flex-wrap gap-4'>
                {
                    data &&
                    data.map((user) => (
                        <li className='bg-gray-400 p-3 rounded ' >
                            <h3>{user.login}</h3>
                            <img className='w-[150px] h-auto' src={user.avatar_url} alt={user.login} />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

