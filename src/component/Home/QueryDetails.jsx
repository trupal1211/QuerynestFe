import styles from './QueryDetails.module.css'
import home_styles from '../Home/Home.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Answer, Query } from '../../component/components';
import Cookies from 'js-cookie';

function QueryDetails() {

    let navigate = useNavigate()
    const { query_id } = useParams();
    const [comments, setComments] = useState(5);
    const [answer, setAnswer] = useState("")
    const [query, setQuery] = useState({})

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    useEffect(() => {

        fetch(`https://querynest-4tdw.onrender.com/api/Question/GetQuestion/${query_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get('authToken')}`
            },
        })
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched Data:", data); // Log after state update
                setQuery(data.question)
                console.log(data.question)
            })
            .catch((err) => {
                console.error("Failed to fetch user data:", err);
                console.log(err.message);
            })

    }, [])

    function formatDate(isoString) {
        const date = new Date(isoString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options).replace(',', '');
    }


    function isLikedByCurrentUser(query) {
        return query.likes?.includes(Cookies.get("currentUserId"));
    }


    async function submitHandler(e) {

        e.preventDefault();

        const answerSubmitData = {
            questionId: query_id,
            content: answer
        };

        console.log(answerSubmitData)

        const token = Cookies.get("authToken");

        try {
            const response = await fetch("https://querynest-4tdw.onrender.com/api/Answer/Create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                },
                body: JSON.stringify(answerSubmitData),
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                console.log("Answer post succesful.");
            } else {
                console.log(result.error || result.message);
            }
        } catch (error) {
            console.log(error.message || "Something went wrong. Please try again.");
        }
    }


    return (
        <>
            <div className="main_container bg-white p-bottom">
                <div className={styles.page_header}>
                    <p onClick={() => { navigate(-1) }} className={styles.backbtn}> ⇦ back</p>

                    <div className={styles.tagContainer}>
                        <div className={styles.tag}># {query.tag?.tagName}</div>
                    </div>
                </div>

                <div className={home_styles.queryContainer}>

                     <Query query_id={query._id} imgUrl={query.userId?.imageUrl} name={query.userId?.name} query={query.question} time={formatDate(query.createdAt)} username={query.userId?.username} isLiked={isLikedByCurrentUser(query)} xlikes={query.noOfLikes} />
                


                </div>

                <div className={styles.line}></div>





                {/* <Answer></Answer> */}
              

                <form className={styles.answerpost_box} onSubmit={submitHandler}>
                    <div class={styles.form_group} style={{ position: 'relative' }}>
                        <textarea id="ans" onChange={(e)=>setAnswer(e.target.value)} placeholder=" " required />
                        <label className={styles.textarea_label} for="ans">Answer</label>
                    </div>
                    <button className={styles.post_btn} type='submit'>Post</button>
                </form >

            </div>
        </>
    )
}

export default QueryDetails



