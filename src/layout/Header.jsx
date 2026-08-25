import React from 'react'
import { NavLink , Link } from 'react-router-dom'
const Header = () => {
  return (
   <header className='w-full px-6 py-4 bg-gray-600 text-white flex justify-between items-center' >
    <Link to={"/"} >BrandName</Link>
    <nav>
      <ul className='flex justify-end items-center gap-4' >
        <li><NavLink to={"/"} > Home</NavLink></li>
        <li><NavLink to={"/blog"} > Blogs</NavLink></li>
        <li><NavLink to={"/users"} > Users</NavLink></li>
        <li><NavLink to={"/data"} > Data</NavLink></li>
        <li><NavLink to={"/players"} > Players</NavLink></li>
        <li><NavLink to={"/wp-blogs"} > WpBlogs</NavLink></li>
      </ul>
    </nav>
   </header>
  )
}
export default Header