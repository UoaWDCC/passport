import React from "react";
import styles from "../styles/page styles/SignInPage.module.css"; // Import the CSS module
import GoogleSigninBtn from "../components/GoogleSigninBtn";
import WDCC_Logo from '../assets/WDCC_Logo.svg';
import { useEffect, useState } from "react";
import { useSearchParams, useLocation, Await } from "react-router-dom";
import axios from "axios";
import useGoogleSignIn from "./Login";// Import the custom hook


const SignInPage: React.FC = () => {



  //Validating QR code 
  const [validEvent, setValidEvent] = useState(false) 
  console.log(localStorage.getItem("accessToken"))
   

  useEffect(()=>{

    console.log("asdfiusghfukayewgfiaewgfaewgfaewufyfuekyg  ")
    const response = axios.post('http://localhost:3000/api/user/check-user', {
      accessToken: localStorage.getItem("accessToken")
    })
    .then((res)=>{
      console.log("skeeeeeeeeeeet")
      console.log(res)
    })
    .catch(function (error) {

      console.log(error);
    });
  },[] )

  // const [searchParams, setSearchParams] = useSearchParams()
  // const eventId = searchParams.get("data")

  // useEffect(() => {
  //   if (eventId != undefined) {
  //     console.log("skeet")
  //     axios.get(`https://localhost:3000/api/check-event-status/${eventId}`)
  //       .then(res => {
  //         if (res.data == "yes") {
  //           setValidEvent(true)
  //         }
  //       })
  //   }
  // }, [])

  const location = useLocation();
  const eventId = location.pathname.split('/').pop().split('&')[0];



  //the if statement checks if user scanned qr code or not,
  //if they didnt scan qr code then there wont be an eventID, otherwise there will be.
  // if (eventId !== ""){
    
  // axios.get(`http://localhost:3000/api/check-event-status/` + eventId)
  // .then(res => console.log(res))
  //   .catch(e => console.log(e))

  // } 






  const handleSignIn = useGoogleSignIn();

  return (
    <div className={styles.container}>
      <div className={styles.topsection}>
        <div>
          <img src={WDCC_Logo} className="h-80" alt="WDCC Logo" />
        </div>
      </div>

      <div className={styles.bottomsection}>
        <p className={styles.text}>Welcome to WDCC Passport!</p>
        <p className={styles.text}>Please sign in with your Google account to proceed.</p>
        <GoogleSigninBtn onClick={handleSignIn} /> {/* Use the custom Google sign-in button */}
        <p className={styles.text}>Or</p>
        <a className={styles.link} href="https://forms.gle/YX8RAdXGF4rTN3e27">Register Here</a>
      </div>
      <div className={styles.footer}>
        <a className={styles.privacyPolicy} href="/privacy-policy">View our Privacy Policy here</a>
      </div>
    </div>
  );
};

export default SignInPage;
