import styles from './Profile.module.css';
import profile_pic from '../../assets/profile_photo.jpeg'
import linkedin_logo from '../../assets/images/linkedin.png'
import github_logo from '../../assets/images/github.png'
import {Archievement} from '../components'

function Profile() {
  return (
    <>
      <div className="main_container bg-white">

        <div className={styles.page_container}>

          <div className={styles.profile_header}>
            <div className={styles.flex}>
              <div className={styles.img_container}>
                <img src={profile_pic} alt="" />
              </div>
              <div>
                <p className={styles.name}>Trupal Godhat</p>
                <p className={styles.username}>@trupal1211</p>
                <p className={styles.tags}>
                  <p className={styles.tag}>IT-2026</p>
                  <p className={styles.tag}># Technical</p>
                  <p className={styles.tag}># Sports</p>
                  <p className={styles.tag}># Hostel</p>
                </p>
              </div>
            </div>
            <div className={styles.follow_btn}>
              follow
            </div>
          </div>

          <div className={styles.bio_container}>
            <div className={styles.bio}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, delectus placeat. Repellat.</div>

            <div className={styles.wraper}>
              <div className={styles.linkedin}>
                <div className={styles.logo_container}>
                  <img src={linkedin_logo} alt="" />
                </div>
                <div>
                  <p className={styles.id_name}>Trupal godhat</p>
                  <p className={styles.small}>509 Connections</p>
                </div>

              </div>
              <div className={styles.github}>
                <div className={styles.logo_container}>
                  <img src={github_logo} alt="" />
                </div>
                <div>
                  <p className={styles.id_name}>Trupal godhat</p>
                  <p className={styles.small}>19 public repositories</p>
                </div>
              </div>


            </div>



          </div>

          <div className={styles.card_container}>
            <div className={styles.subcard_container}>
              <div className={styles.card}>
                <p className={styles.card_header}>Questions</p>
                <p className={styles.card_body}>7</p>
              </div>

              <div className={styles.card}>
                <p className={styles.card_header}>Answers</p>
                <p className={styles.card_body}>21</p>
              </div>
            </div>
            <div className={styles.subcard_container}>
              <div className={styles.card}>
                <p className={styles.card_header}>Avg. Rating</p>
                <p className={styles.card_body}>4.48</p>
              </div>
              <div className={styles.card}>
                <p className={styles.card_header}>Total Points</p>
                <p className={styles.card_body}>158.05</p>
              </div>
            </div>





          </div>

          <div className={styles.card_container}>

            <div className={styles.followerscard_container}>
              <div className={styles.card}>
                <div className={styles.title}>followers</div>
                <div className={styles.number}>34</div>
              </div>
              <div className={styles.card}>
                <div className={styles.title}>following</div>
                <div className={styles.number}>34</div>
              </div>
            </div>
            <div className={styles.archivements_container}>
              <div className={styles.card_header}>Archivments</div>
              <div className={styles.archivements}>
                <Archievement/>
                <Archievement/>
                <Archievement/>
                <Archievement/>
              </div>
            </div>
          </div>

          <div className={styles.btn_container}>
          <div className={styles.logout_btn}>log out</div>         
          </div>

      
        </div>
        
      </div>
    </>
  )
}

export default Profile
