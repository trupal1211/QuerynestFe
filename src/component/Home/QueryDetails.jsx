import styles from './QueryDetails.module.css'
import home_styles from '../Home/Home.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import { Answer, Query } from '../../component/components';
import Cookies from 'js-cookie';

function QueryDetails() {

    let navigate = useNavigate()
    const { query_id } = useParams();
    const [answer, setAnswer] = useState("")
    const [query, setQuery] = useState({})

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };


    const latestQueryDetails = useRef([]);

    useEffect(() => {
        fetchNewQueryDetails() // Initial fetch
        const interval = setInterval(() => {
            fetchNewQueryDetails(); // Fetch new data every 1 second
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);



    function fetchNewQueryDetails() {

        fetch(`https://querynest-4tdw.onrender.com/api/Question/GetQuestion/${query_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get('authToken')}`
            },
        })
            .then((response) => {
                // console.log("fetchNewQueryDetails response :-")
                // console.log(response)
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                if (JSON.stringify(latestQueryDetails.current) !== JSON.stringify(data.question)) {
                    latestQueryDetails.current = data.question;
                    console.log("Fetched Data:", data); // Log after state update
                    setQuery(data.question)
                    console.log("query (data.question) :- ")
                    console.log(data.question)
                }

            })
            .catch((err) => {
                console.error("Failed to fetch user data:", err);
                console.log(err.message);
            })
    }



    function formatDate(isoString) {
        const date = new Date(isoString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options).replace(',', '');
    }


    function isLikedByCurrentUser(query) {
        return query.likes?.includes(Cookies.get("currentUserId"));
    }

    function isAnswerLikedByCurrentUser(ans) {
        return ans.likes?.includes(Cookies.get("currentUserId"));
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
                setAnswer("")
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
                    <Query query_id={query._id} imgUrl={query.userId?.imageUrl} name={query.userId?.name} query={query.question} time={formatDate(query.createdAt)} username={query.userId?.username} isLiked={isLikedByCurrentUser(query)} xlikes={query?.noOfLikes} />
                </div>

                <div className={styles.line}></div>

                <div className={styles.answerContainer}>
                {
                    query.answerIds?.map((ans) => {
                        return <Answer key={ans._id} answer_id={ans._id} imgUrl={ans.userId.imageUrl} name={ans.userId.name} username={ans.userId.username} answer={ans.answer} time={formatDate(ans.createdAt)} isLiked={isAnswerLikedByCurrentUser(ans)} xlikes={ans.noOfLikes} xrate={ans.rating} />
                    })
                }

                </div>

                


                <form className={styles.answerpost_box} onSubmit={submitHandler}>
                    <div className={styles.form_group} style={{ position: 'relative' }}>
                        <textarea id="ans" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder=" " required />
                        <label className={styles.textarea_label} htmlFor="ans">Answer</label>
                    </div>
                    <button className={styles.post_btn} type='submit'>Post</button>
                </form >
            </div>
        </>
    )
}

export default QueryDetails



