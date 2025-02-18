import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './auth.css'
import '@fontsource/kadwa'
import '@fontsource/jua'

function LogIn(){

  let [name,setName] = useState("")
  let [showPassword,setShowPassword] = useState()
  let navigate = useNavigate()

  function submitHandler(){
    console.log(name)
    navigate('/home')
  }
 
  return(
    <>
       <div className="signup_page">
        <div className="left_container">
          <div className="welcome_content">
            <p className='welcome'>Welcome to</p>
            <p className='querynest'>QueryNest</p>
            <p className='slogan'>- Ask,Answer,Grow</p>
          </div>
        </div>
        <div className="right_container">
          <form className="signup_form">
            <h2>Log In to Your Account</h2>
            <div class="form-group">
              <input type="email" id="email" onChange={(e)=>{setName(e.target.value)}} placeholder=" " required />
              <label for="email">Email</label>             
            </div>
            <div class="form-group">
              <input  type={showPassword ? "text" : "password"} id="password" placeholder=" " required />
              <label for="password">Password</label>
            </div>
           
            <button className='signup_btn' onClick={submitHandler}>Log In</button>

            <p>Don't have an account ? <b onClick={()=>{navigate('/signup')}}  style={{cursor:'pointer',color:'#DEC498'}}>Sign Up</b> here</p>

          </form>
        </div>
      </div> 
    </>
  )
}

export default LogIn