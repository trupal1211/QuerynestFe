import './home.css'
import '@fontsource/kadwa'
import '@fontsource/jua'
import { useState } from 'react'
import { ThumbsUp, Heart, MessageCircle } from "lucide-react";
import { Query } from '../components'

function Home() {

  const [showBox, setShowBox] = useState(false);
  const [tag, setTag] = useState(1);
  return (
    <>
      <div className='main_container'>
        <Query />
        <Query />
        <Query />
        <Query />
        <Query />
        <Query />
        <Query />
        <Query />
        <Query />
        <Query />
        <Query />
      </div>



      {showBox && (
        <div className="overlay active">
          <div className="querypost_box">
            <h2 style={{ textAlign: 'center' }}>Post Your Query</h2>
            <form action="">
              <div className="form-group">
                <textarea type='text' id="quert" placeholder=" " required />
                <label for="query">Query</label>
              </div>

              <p>select one tag that is approperiate to the query</p>

              <div className="tag-container">

                <div onClick={() => setTag(1)}
                  className={tag === 1 && 'selected'}
                ># General Query</div>


                <div onClick={() => setTag(2)}
                  className={tag === 2 && 'selected'}
                ># Technical</div>

                <div onClick={() => setTag(3)}
                  className={tag === 3 && 'selected'}
                ># Placement/Internship</div>

                <div onClick={() => setTag(4)}
                  className={tag === 4 && 'selected'}
                ># Competitive Coding</div>

                <div onClick={() => setTag(5)}
                  className={tag === 5 && 'selected'}
                ># Hostel</div>

                <div onClick={() => setTag(6)}
                  className={tag === 6 && 'selected'}
                ># food</div>

                <div onClick={() => setTag(7)}
                  className={tag === 7 && 'selected'}
                ># further Study</div>

                <div onClick={() => setTag(8)}
                  className={tag === 8 && 'selected'}
                ># Soft skills</div>

                <div onClick={() => setTag(9)}
                  className={tag === 9 && 'selected'}
                ># Sports</div>

                <div onClick={() => setTag(10)}
                  className={tag === 10 && 'selected'}
                ># Curriculam</div>

              </div>

              <div className="flex">
                <div className="btn cancel" onClick={() => setShowBox(false)}>cancel</div>
                <div className="btn post">Post</div>
              </div>

            </form>

          </div>
        </div>
      )}

      <div className="add_btn" onClick={() => setShowBox(true)}>
        <p>+</p>
      </div>

    </>
  )
}


export default Home