import styles from './EditProfile.module.css'

function EditProfile(){
    return(
        <>
        <div className="main_container bg-white">

            <h2 style={{margin:'0'}}>Edit Profile</h2>

            <div className={styles.form}>
            <div class="form-   group">
              <input type="email" id="email" placeholder=" " required />
              <label for="email">Email</label>             
            </div>
            </div>

            
        </div>
        </>
    )
}

export default EditProfile
