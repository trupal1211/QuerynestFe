import styles from  './QueryDetails.module.css'
import { useNavigate } from 'react-router-dom'
import star from '../../assets/Images/star.png'
import like_img from '../../assets/Images/like.png'
import nonLike_img from '../../assets/Images/nonLike.png'
import { useState } from 'react'

function Answer({answer_id,imgUrl,name,username,answer,time,isLiked,xlikes,xrate}) {

    let navigate = useNavigate()
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(10); // 
    const [comments, setComments] = useState(5);

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };


    return (
        <>
        <div className={styles.answerWraper}>
        <div className={styles.answer}>
                <div className={styles.header}>
                    <div className={styles.profile_information}>
                        <div className={styles.image_container}>
                            <img src={imgUrl} alt="" />
                        </div>
                        <div>
                            <p className={styles.name}>{name}</p>
                            <p className={styles.username}>@{username}</p>
                        </div>
                    </div>
                    <div className={styles.timestamp}>
                        <p>{time}</p>
                    </div>
                </div>

                <div className={styles.content}>
                    <p>{answer}</p>
                </div>

                <div className={styles.footer}>
                    <div className={styles.like}>
                        <button className={`${styles.like_button} ${liked ? styles.liked : ""}`} onClick={handleLike}>
                            <div className={styles.like_img}>
                                {isLiked ? <img src={like_img} />
                                    : <img src={nonLike_img} />}
                            </div>
                            <span>{xlikes} likes</span>
                        </button>
                    </div>
                    <div className={styles.starContainer}>
                    <div className={styles.star}>
                       <p style={{marginTop:'1px'}}>{xrate}</p> <img src={star} />
                    </div>
                    </div>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default Answer