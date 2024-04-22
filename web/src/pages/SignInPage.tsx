import React from "react";
import styles from "../styles/page styles/SignInPage.module.css"; // Import the CSS module
import GoogleSigninBtn from "../components/GoogleSigninBtn";
import WDCC_Logo from '../assets/WDCC_Logo.svg';
import { useEffect, useState } from "react";
import { useSearchParams, useLocation, Await, useNavigate } from "react-router-dom";
import axios from "axios";
import useGoogleSignIn from "./Login";// Import the custom hook


const SignInPage: React.FC = () => {

  //Validating QR code 
  const [validEvent, setValidEvent] = useState(false) 
  // console.log(localStorage.getItem("accessToken"))
   
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    axios.post('http://localhost:3000/api/user/check-user', {
      accessToken: localStorage.getItem("accessToken")
    })
    .then((response) => {
      
      const eventId = location.pathname.split('/')[2];

      
      // Handle the response data here
      // console.log(response.data.success);
      if(response.data.success){

        console.log("Verify QrCode")    
      } else {
        // /signinpage/eventId
        navigate("/sign-in/" + eventId)
      }
    })
    .catch((error) => {
      // Handle errors
      console.error('vjhsjdsbcError:', error);
    });
  }, []); // Empty dependency array means this effect will only run once after the initial render
  

  const handleSignIn = useGoogleSignIn();

  return (
    <div className={styles.container}>
      <div className={styles.topsection}>
        <div>
          <img src={WDCC_Logo} className="h-80" />
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
