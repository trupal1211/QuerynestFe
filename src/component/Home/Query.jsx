// import styles from './Home.module.css'
// import img from '../../assets/Images/profile_photo.jpeg'
// import { MessageCircle } from "lucide-react";
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import like_img from '../../assets/Images/like.png'
// import nonLike_img from '../../assets/Images/nonLike.png'

// function Query({query_id,name,username,query,time,isLiked}) {

//     let navigate = useNavigate()
//     const [liked, setLiked] = useState(false);
//     const [likes, setLikes] = useState(10); // 
//     const [comments, setComments] = useState(5);

//     const handleLike = () => {
//         setLiked(!liked);
//         setLikes(liked ? likes - 1 : likes + 1);
//     };

//     async function likeHandler(e) {
//         e.preventDefault();
    
//         const likeSubmitData = {
//           questionId : query_id,
//           action : isLiked?"like":"unlike"
//         };
    
//         console.log(likeSubmitData)
    
//         const token = Cookies.get("authToken");
    
//         try {
//           const response = await fetch("https://querynest-4tdw.onrender.com/api/Question/ToggleLike", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify(likeSubmitData),
//           });
    
//           const result = await response.json();
//           console.log(result);
    
    
//           if (response.ok) {
//             console.log("Like toggle succesful.");
//           } else {
//             console.log(result.error || result.message || "failed!");
//           }
//         } catch (error) {
//           console.log(error.message || "Something went wrong. Please try again.");
//         }
//       }
    

    

//     return (
//         <>
//             <div className={styles.query}>
//                 <div className={styles.header}>
//                     <div className={styles.profileInformation}>
//                         <div className={styles.imageContainer}>
//                             <img src={img} alt="" />
//                         </div>
//                         <div>
//                             <p className={styles.name}>{name}</p>
//                             <p className={styles.username}>{username}</p>
//                         </div>
//                     </div>
//                     <div className={styles.timestamp}>
//                         <p>{time}</p>
//                     </div>
//                 </div>

//                 <div className={styles.content}>
//                     <p>{query}</p>
//                 </div>

//                 <div className={styles.queryFooter}>
//                     <div className={`${styles.like} ${styles.flex}`}>
//                         <button className={`${styles.likeButton} ${liked ? styles.liked : ""}`} onClick={handleLike}>
//                             <div className={styles.likeImg}>
//                                 {isLiked ? <img src={like_img} />
//                                     : <img src={nonLike_img} />}
//                             </div>
//                             <span>{likes} likes</span>
//                         </button>


//                     </div>
//                     <div className={styles.comment} onClick={() => { navigate('/query/rej') }}>
//                         <button className={styles.commentButton}>
//                             <MessageCircle className={styles.icon} />
//                             <span>{comments} answers</span>
//                         </button>
//                     </div>
//                 </div>

//             </div>

//         </>
//     )
// }

// export default Query


import styles from './Home.module.css';
import img from '../../assets/Images/profile_photo.jpeg';
import { MessageCircle } from "lucide-react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import like_img from '../../assets/Images/like.png';
import nonLike_img from '../../assets/Images/nonLike.png';

function Query({ query_id,imgUrl, name, username, query, time, isLiked, xlikes , xcomments }) {
    let navigate = useNavigate();
    
    // Set initial liked state based on prop
    const [liked, setLiked] = useState(isLiked);
    const [likes, setLikes] = useState(xlikes || 0);
    const [comments, setComments] = useState(5);

    useEffect(() => {
        setLiked(isLiked); // Ensure component updates when `isLiked` changes from parent
    }, [isLiked]);

    const handleLike = async (e) => {
        e.preventDefault();
    
        const likeSubmitData = {
            questionId: query_id,
            action: liked ? "unlike" : "like", // Toggle action
        };
    
        console.log("Sending Like Request:", likeSubmitData);
    
        const token = Cookies.get("authToken");
    
        try {
            const response = await fetch("https://querynest-4tdw.onrender.com/api/Question/ToggleLike", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(likeSubmitData),
            });
    
            const result = await response.json();
            console.log("API Response:", result);
    
            if (response.ok) {
                setLiked(!liked); // Toggle liked state
                setLikes(liked ? likes - 1 : likes + 1); // Adjust like count
            } else {
                console.log(result.error || result.message || "Like action failed!");
            }
        } catch (error) {
            console.log(error.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className={styles.query}>
            <div className={styles.header}>
                <div className={styles.profileInformation}>
                    <div className={styles.imageContainer}>
                        <img src={imgUrl} alt="" />
                    </div>
                    <div>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.username}>{username}</p>
                    </div>
                </div>
                <div className={styles.timestamp}>
                    <p>{time}</p>
                </div>
            </div>

            <div className={styles.content}>
                <p>{query}</p>
            </div>

            <div className={styles.queryFooter}>
                <div className={`${styles.like} ${styles.flex}`}>
                    <button className={`${styles.likeButton} ${liked ? styles.liked : ""}`} onClick={handleLike}>
                        <div className={styles.likeImg}>
                            <img src={liked ? like_img : nonLike_img} alt="like" />
                        </div>
                        <span>{likes} likes</span>
                    </button>
                </div>
                <div className={styles.comment} onClick={() => { navigate(`/query/${query_id}`) }}>
                    <button className={styles.commentButton}>
                        <MessageCircle className={styles.icon} />
                        <span>{xcomments} answers</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Query;
