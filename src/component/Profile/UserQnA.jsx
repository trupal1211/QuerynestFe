import styles from '../Home/Home.module.css'
import stylex from '../Home/QueryDetails.module.css'
import { useNavigate , useParams } from 'react-router-dom'
import { Query, Answer } from '../../component/components';
import { useEffect } from 'react';

function UserQnA(type) {
    let navigate = useNavigate()

    const {userid} = useParams()

    // useEffect(() => {
    //     fetch("https://querynest-4tdw.onrender.com/api/UserProfile/me", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token}`
    //       },
    //     })
    //       .then((response) => {
    //         if (!response.ok) {
    //           throw new Error(`Error: ${response.status} - ${response.statusText}`);
    //         }
    //         return response.json();
    //       })
    //       .then((data) => {
    //         console.log("Fetched userProfileData:", data); // Log after state update
    //         setUserData(data)
    //         console.log(userData)
    //       })
    //       .catch((err) => {
    //         console.error("Failed to fetch user profile data:", err);
    //         setError(err.message);
    //       })
    //       .finally();
    //   }, [])

    return (
        <>
            <div className="main_container bg-white">
                <div className={stylex.page_header}>
                    <p onClick={() => { navigate(-1) }} className={stylex.backbtn}> ⇦ back</p>
                </div>

                {type == "queries" &&
                    <div className={styles.queryContainer}>
                        <Query></Query>
                        <Query></Query>
                    </div>
                }


                {type == "answers" && 
                <Answer></Answer>
              
                }



                

            </div>
        </>
    )
}

export default UserQnA