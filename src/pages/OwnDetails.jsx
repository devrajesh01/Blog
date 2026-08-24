import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const OwnDetails = () => {
    const location = useLocation();
    const data = location?.state.userData;  
    if(!data) return    
  return (
    <div className='text-white'>
        <h2>{data.title}</h2>
        <p>{data.body}</p>
        <Link to={"/players"} >=Go Back</Link>
    </div>
  )
}
export default OwnDetails