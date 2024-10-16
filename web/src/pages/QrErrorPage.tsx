import styles from "../styles/page styles/SignInError.module.css";
import WDCC_Login from '../assets/WDCC_Logo.svg';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import updateStampValues from "@components/GetTotalStamps";

const QRErrorPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [_, setUser] = useState();

  const params = useParams();
  const navigate = useNavigate();
  const eventId = params.eventId;

  const attendEvent = (eventId: string, upi: string) => {
    axios.post(`${import.meta.env.VITE_SERVER_URL}/api/event/attend-event`, {
      // eventId: location.state.event,
      // upi: location.state.upi
      eventId: eventId,
      upi: upi
    }).then((res) => {
      if (res.data.added) {
        setSuccess(true);
      } else {
        setErrorMessage(res.data.message);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    
    if (localStorage.getItem("accessToken") != null) {
      if (eventId) {
        
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/check-user`, {
          accessToken: localStorage.getItem("accessToken")
        })
          .then((response) => {
            if (response.data.success) {
              
              setUser(response.data.user)
              axios.get(`${import.meta.env.VITE_SERVER_URL}/api/event/check-event-status/${eventId}`)
                .then(async (res) => {
                  console.log(res)
                  if (res.status == 401 || res.data.result.status == false) {
                    console.log("here",res)
                    setSuccess(false)
                    setErrorMessage(res.data.error)
                    setIsLoading(false)
                  } else {
                    console.log(response.data.user.upi)
                    await attendEvent(eventId, response.data.user.upi)
                    await updateStampValues(localStorage.getItem("accessToken"));
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
      const eventId = location.pathname.split("/").pop();
      navigate("/sign-in/" + eventId);
    }
  }, [eventId, navigate]);

  if (isLoading) {
    return (
      <div className={styles.container}></div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.topsection}>
        <img src={WDCC_Login} className="h-80" />
      </div>
      {success ? (
        <div className={styles.bottomsection}>
          <p className={styles.successbig}>YAY!</p>
          <p className={styles.successsmall}>Successfully attended event :D</p>
          <button
            className={styles.continue_btn}
            onClick={() => navigate("/passport")}
          >
            Continue to passport
          </button>
        </div>
      ) : (
        <div className={styles.bottomsection}>
          <p className={styles.errorbig}>OOPS!</p>
          <p className={styles.errorsmall}>{errorMessage}</p>
          <button
            className={styles.continue_btn}
            onClick={() => navigate("/passport")}
          >
            Continue to passport
          </button>
        </div>
      )}
    </div>
  );
};

export default QRErrorPage;
