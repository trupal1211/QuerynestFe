import styles from '../Home/Home.module.css'
import stylex from '../Home/QueryDetails.module.css'
import { useNavigate , useParams } from 'react-router-dom'
import { Query, Answer } from '../../component/components';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function UserQnA({type}) {
    let navigate = useNavigate()

    const [userData,setUserData]=useState()
    const {username} = useParams()

    function fetchUserQnAs(){

      fetch(`https://querynest-4tdw.onrender.com/api/Question/userQuestion/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get('authToken')}`
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched:", data); // Log after state update
          setUserData(data)
          console.log(userData)
        })
        .catch((err) => {
          console.error("Failed to fetch user profile data:", err);
          console.log(err.message);
        })

    }

        
          
      

    return (
        <>
            <div className="main_container bg-white">
                <div className={stylex.page_header}>
                    <p onClick={() => { navigate(-1) }} className={stylex.backbtn}> ⇦ back</p>
                </div>

                {type=="queries" }


                {type==="answers" && <h1>answer</h1>
              
                }


                



                

            </div>
        </>
    )
}

export default UserQnA