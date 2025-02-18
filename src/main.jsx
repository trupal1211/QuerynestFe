import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route , RouterProvider } from 'react-router-dom'
import {SignUp,LogIn,Home,Leaderbord,Profile} from './component/components.js'
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  path="/" element={ <App /> }>
      <Route path="home" element={ <Home/> } />
      <Route path="login" element={ <LogIn/>  } />      
      <Route path="signup" element={ <SignUp/> } />  
      <Route path="leaderboard" element={ <Leaderbord/> } /> 
      <Route path="profile" element={ <Profile/> } /> 
      <Route path="*" element={ <h1>page not found</h1>  } />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
