import React from 'react'
import { useLocation } from 'react-router-dom'

const WpblogDetails = () => {
  const location = useLocation();
  const blog = location.state.post
  return (
    <div className='text-white' >
      <h1>WpblogDetails {blog.title.rendered}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: blog.content.rendered,
        }}
      />
    </div>
  )
}
export default WpblogDetails