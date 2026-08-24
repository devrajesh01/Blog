import React, { useEffect, useState } from 'react'
import { deletePost, getPosts, updatePost } from '../api/content';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export const ReactQuery = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const queryClient = useQueryClient()
  const { data, isLoading, isPending, error, isError } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => getPosts(pageNumber),
    placeholderData: keepPreviousData,
    staleTime: 20000
    // gcTime:3000
    // refetchInterval:1000,
    // refetchIntervalInBackground:true   

  })
  //! use mutaions delete the posts
  const deleteMutaions = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(['posts', pageNumber], (curEelemt) => {
        return curEelemt?.filter((post) => post.id !== id)
      })
    }
  })
  // update posts
  const updateMutation = useMutation({
    mutationKey: ["posts", pageNumber],
    mutationFn: (id) => updatePost(id),
    onSuccess: ((apiData, apiId) => {
      console.log(apiData, apiId)
      queryClient.setQueryData(
       ["posts", pageNumber],
       (currectData)=>{
        return currectData.map((user)=> user.id === apiId? {...user,title: apiData.data.title} : user)
       }
      )
    })
  })
  if (isPending) return <h2>loadding....</h2>
  if (isError) return <h2>Error: {error.message || "Something went wrong"}</h2>
  return (
    <>
      <div className="containe w-[80%] mx-auto">
        {
          data &&
          data.map((post) => (
            <div className="card bg-blue-950 mt-4 border-l text-white p-3" key={post.id} >
              <h2>{post.title} Id: {post.id}</h2>
              <p>{post.body}</p>

              <div className="flex gap-2">
                <button className='cursor-pointer bg-amber-500 rounded px-4 py-2' onClick={() => deleteMutaions.mutate(post.id)} >Delete</button>
                <Link
                  to="/blog/my-awesome-blog"
                  state={{ post: post }}
                  className='cursor-pointer bg-white text-black rounded px-4 py-2' >View</Link>
                <button className='cursor-pointer bg-green-500 rounded px-4 py-2' onClick={() => updateMutation.mutate(post.id)} > {updateMutation.isPending && updateMutation.variables === post.id
                  ? "Updating..."
                  : "Update"}</button>
              </div>
            </div>
          ))
        }
        <div className="pagination">
          <button className='bg-blue-500 text-white  rounded cursor-pointer py-2 px-4' disabled={pageNumber === 0} onClick={() => setPageNumber(prev => prev - 3)} >Prev</button>
          <span className='text-white text-2xl px-4' >{(pageNumber / 3) + 1}</span>
          <button className='bg-blue-500 text-white rounded cursor-pointer py-2 px-4' disabled={isPending} onClick={() => setPageNumber(prev => prev + 3)} >Next</button>
        </div>
      </div>
    </>
  )
}

