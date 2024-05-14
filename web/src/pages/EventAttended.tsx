import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const EventAttended = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [resMessage, setResMessage] = useState("")

  //const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // if(location.state.event && location.state.upi){
    axios.post(`${import.meta.env.VITE_SERVER_URL}/api/attend-event`, {
      // eventId: location.state.event,
      // upi: location.state.upi
      eventId: "663c59fe7493ceabaae7b781",
      upi: "amai111"
    }).then((res) => {
      if (res.data.added == true) {
        console.log(res)
        setSuccess(true)
        setIsLoading(false)
      } else {
        setResMessage(res.data.message)
        setIsLoading(false)
      }
    })
    // }
  }, [])

  return (
    <div>
      {isLoading
        ? <img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3D%2522loading%2Bicon%2522&psig=AOvVaw3tB19jjzGFwRsCygw5RGSo&ust=1715640904239000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIiit8eaiYYDFQAAAAAdAAAAABAE'></img>
        :
        (success
          ? <div>
            <h1>Event successfully attended </h1>
            <button
              style={{ backgroundColor: "white" }}
              onClick={() => {
                navigate("/passport")
              }}
            >continue to passport</button>
          </div>
          : <div>
            <h1> {resMessage}</h1>
            <button
              style={{ backgroundColor: "white" }}
              onClick={() => {
                navigate("/sign-in")
              }}
            >continue to passport</button>
          </div>)
      }
    </div>
  )
}

export default EventAttended
