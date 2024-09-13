import styles from "../styles/page styles/SignInError.module.css";
import WDCC_Login from '../assets/WDCC_Logo.svg';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const QRErrorPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [_, setUser] = useState();

  const params = useParams();
  const navigate = useNavigate();
  const eventId = params.eventId;

  const attendEvent = (eventId: string, upi: string) => {
    axios.post(`${import.meta.env.VITE_SERVER_URL}/api/attend-event`, {
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
    if (localStorage.getItem("accessToken") !== null && eventId) {
      axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/check-user`, {
        accessToken: localStorage.getItem("accessToken")
      })
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.user);
          axios.get(`${import.meta.env.VITE_SERVER_URL}/api/check-event-status/${eventId}`)
            .then((res) => {
              if (res.status === 401 || !res.data.result.status) {
                setErrorMessage(res.data.error);
              } else {
                attendEvent(eventId, response.data.user.upi);
              }
            })
            .catch((error) => {
              setErrorMessage("Error: ") + error;
            })
            .finally(() => setIsLoading(false));
        } else {
          navigate("/sign-in/" + eventId);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage("User verification failed");
        setIsLoading(false);
      });
    } else {
      navigate("/sign-in");
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
