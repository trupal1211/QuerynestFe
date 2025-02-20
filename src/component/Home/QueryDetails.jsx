import './queryDetails.css'
import { useNavigate } from 'react-router-dom'

function QueryDetails(){

    const navigate = useNavigate()

    return(
        <>
        <div className="main_container bg-white">
            <p onClick={()=>{navigate('/home')}}> ⇦ back</p> 
        </div>
        </>
    )
}

export default QueryDetails



