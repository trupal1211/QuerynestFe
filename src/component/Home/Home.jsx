import styles from './Home.module.css'
import '@fontsource/kadwa'
import '@fontsource/jua'
import { useState, useEffect } from 'react'
import { Query } from '../components'
import Cookies from 'js-cookie'

function Home() {

  const [showBox, setShowBox] = useState(false);
  const [tag, setTag] = useState(1);
  const [query, setQuery] = useState("")
  const [alltags, setAllTags] = useState("")
  const [queryFeed, setQueryFeed] = useState([])

  // to get all tag list
  useEffect(() => {
    fetch("https://querynest-4tdw.onrender.com/api/TagDetails/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data); // Log after state update
        setAllTags(data)
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        console.log(err.message);
      })

  }, [])


  // for get queryfeed
  useEffect(() => {

    fetch("https://querynest-4tdw.onrender.com/api/Question/TagmatchQuestion", {
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
        console.log("Fetched Data:", data); // Log after state update
        setQueryFeed(data.questions)
        console.log(data)
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        console.log(err.message);
      })


  }, [])


  async function submitHandler(e) {
    e.preventDefault();

    const querySubmitData = {
      question: query,
      tagName: tag
    };

    console.log(querySubmitData)

    const token = Cookies.get("authToken");

    try {
      const response = await fetch("https://querynest-4tdw.onrender.com/api/Question/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify(querySubmitData),
      });

      const result = await response.json();
      console.log(result);


      if (response.ok) {
        console.log("Query post succesful.");
        setShowBox(false)
      } else {
        console.log(result.error || result.message || "Signup failed!");
      }
    } catch (error) {
      console.log(error.message || "Something went wrong. Please try again.");
    }
  }


  function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(',', '');
  }

  function isLikedByCurrentUser(query){
    return query.likes.includes(Cookies.get("currentUserId"));
  }


  return (
    <>
      <div className='main_container'>

        {queryFeed?.map((query) => {
          return <Query key={query._id} imgUrl={query.userId.imageUrl} query_id={query._id} name={query.userId.name} query={query.question} time={formatDate(query.createdAt)} username={query.userId.username} isLiked={isLikedByCurrentUser(query)} xlikes={query.noOfLikes} xcomments={query.answerIds?.length} />
        })}

      </div>

      {showBox && (
        <div className={`${styles.overlay} ${styles.active}`}>
          <div className={styles.querypostBox}>
            <h2 style={{ textAlign: 'center' }}>Post Your Query</h2>
            <form action="" onSubmit={submitHandler}>
              <div className={styles.formGroup}>
                <textarea type='text' onChange={(e) => { setQuery(e.target.value) }} placeholder=" " required />
                <label>Query</label>
              </div>

              <p>select one tag that is approperiate to the query</p>

              <div className={styles.tagContainer}>

                {alltags.map((option) => (
                  <div
                    key={option}
                    className={tag == option && styles.selected}
                    onClick={() => { setTag(option) }}>
                    # {option}
                  </div>
                ))}

              </div>

              <div className={styles.flex}>
                <div className={`${styles.btn} ${styles.cancel}`} onClick={() => setShowBox(false)}>cancel</div>
                <div className={`${styles.btn} ${styles.post}`} onClick={submitHandler}>Post</div>
              </div>

            </form>

          </div>
        </div>
      )}

      <div className={showBox == false ? styles.addBtn : styles.dNone} onClick={() => setShowBox(true)}>
        <p>+</p>
      </div>

    </>
  )
}


export default Home