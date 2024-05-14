import React from "react";
import styles from "../styles/page styles/SignInPage.module.css"; // Import the CSS module
import GoogleSigninBtn from "../components/GoogleSigninBtn";
import useGoogleSignIn from "./Login";
import WDCC_Logo from '../assets/WDCC_Logo.svg';

const SignInPage: React.FC = () => {
  
  const url = window.location.pathname;

  const handleSignIn = useGoogleSignIn(url);

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
    </div>
  );
};

export default SignInPage;
