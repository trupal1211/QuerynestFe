import './home.css'
import img from '../../assets/profile_photo.jpeg'
import {ThumbsUp, Heart, MessageCircle } from "lucide-react";
import { useState } from 'react';

function Query(){

    const [liked, setLiked] = useState(false);
      const [likes, setLikes] = useState(10); // 
      const [comments, setComments] = useState(5); 
    
      const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
      };
    
    return(
        <>
        <div className="query">
          <div className="header">
            <div className='profile_information'>
              <div className='image_container'>
                <img src={img} alt="" />
              </div>
              <div>
                <p className='name'>trupal godhat</p>
                <p className='username'>@trupal1211</p>
              </div>
            </div>
            <div className='timestamp'>
              <p>7 jun 25</p>
            </div>
          </div>

          <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laudantium ratione qui impedit neque optio voluptates architecto accusantium assumenda.</p>
          </div>

          <div className="query_footer">
            <div className='like flex'>
            <button className={`like-button ${liked ? "liked" : ""}`} onClick={handleLike}>
        <ThumbsUp fill={liked ? "blue" : "none"} className="icon" />
        <span>{likes} likes</span>
      </button>

            </div>
              <div className='comment'>
            <button className="comment-button">
        <MessageCircle className="icon" />
        <span>{comments} answers</span>
      </button>
            </div>


          </div>

        </div>

        </>
    )
}

export default Query