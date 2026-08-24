import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './layout/MainLayout'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import {BlogDetails, Home, ReactQuery , GithubUsers, Blog} from "./pages"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy } from 'react'
import Loading from './components/Loading'
import Players from './pages/Players'
import OwnDetails from './pages/OwnDetails'
import Form from './pages/Form'
// import WpblogDetails from './pages/WpblogDetails'
const Data = lazy(()=>import("./pages/Data"))
const WpblogDetails = lazy(()=> import("./pages/WpblogDetails"))



const router = createBrowserRouter(
  createRoutesFromElements(   
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<Home/>} />
      <Route path='/blog' element={<ReactQuery/>} />
      <Route path='/blog/my-awesome-blog' element={<BlogDetails/>} />
      <Route path='/users' element={<GithubUsers/>} />
      <Route path='/data' element={<Data/>} />
      <Route path='/players' element={<Players/>} />
      <Route path='/playes/our-own-posts' element={<OwnDetails/>} />
      <Route path='/update' element={<Form/>} />
      <Route path='/wp-blogs' element={<Blog/>} />
      <Route path={`/wp-posts/:slug`} element={<WpblogDetails/>} />
    </Route>   
  )
)
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <Suspense fallback={<Loading/>} >
        <RouterProvider router={router} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>        
  </StrictMode>,
)
