import styles from "../styles/page styles/SignInError.module.css";
import WDCC_Login from '../assets/WDCC_Logo.svg';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
// import { useSearchParams } from "react-router-dom";
// import { set } from "zod";

const QRErrorPage: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [_, setUser] = useState()

  // const location = useLocation()
  const params = useParams()

  const navigate = useNavigate();
  const eventId = params.eventId
  console.log(eventId)

  const attendEvent = (eventId: string, upi: string) => {
    axios.post(`${import.meta.env.VITE_SERVER_URL}/api/attend-event`, {
      // eventId: location.state.event,
      // upi: location.state.upi
      eventId: eventId,
      upi: upi
    }).then((res) => {
      if (res.data.added == true) {
        console.log(res)
        setSuccess(true)
        setIsLoading(false)
      } else {
        setErrorMessage(res.data.message)
        setIsLoading(false)
      }
    })
  }

  // useEffect(()=>{

  // })

  useEffect(() => {
    
    if (localStorage.getItem("accessToken") != null) {
      if (eventId) {
        
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/check-user`, {
          accessToken: localStorage.getItem("accessToken")
        })
          .then((response) => {
            if (response.data.success) {
              
              setUser(response.data.user)
              axios.get(`${import.meta.env.VITE_SERVER_URL}/api/check-event-status/${eventId}`)
                .then((res) => {
                  console.log(res)
                  if (res.status == 401 || res.data.result.status == false) {
                    console.log("here",res)
                    setSuccess(false)
                    setErrorMessage(res.data.error)
                    setIsLoading(false)
                  } else {
                    console.log(response.data.user.upi)
                    attendEvent(eventId, response.data.user.upi)
                  }
                })
              console.log("Verify QrCode")
            } else {
              navigate("/sign-in/" + eventId)
            }
          })
          .catch((error) => {
            console.error('error:', error);
          });
      } else {
        setErrorMessage("QR is not valid")
        setIsLoading(false)
      }
    } else {
      navigate("/sign-in")
    }
  }, []);

  return (
    <>

      <div className={styles.container}>
        <div className={styles.topsection}>
          <img src={WDCC_Login} className="h-80" />
        </div>

        {isLoading
          ? 
          <div
          >
            <img
              src="https://i.stack.imgur.com/NKEOW.jpg"
              style={{ height: "50px", width: "50px"}}></img>
          </div>
          : (success
            ? <div className={styles.bottomsection}>
              <p className={styles.errorbig}>YAY!</p>
              <p className={styles.errorsmall}>successfully attended event :D </p>
              <button
                style={{ backgroundColor: "white" }}
                onClick={() => {
                  navigate("/passport")
                }}
              >continue to passport</button>
            </div>
            : <div className={styles.bottomsection}>
              <p className={styles.errorbig}>OOPS!</p>
              <p className={styles.errorsmall}>{errorMessage} </p>
              <button
                style={{ backgroundColor: "white" }}
                onClick={() => {
                  navigate("/passport")
                }}
              >continue to passport</button>
            </div>)}
      </div>
    </>
  );
};

export default QRErrorPage;