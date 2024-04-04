import GoogleIcon from "../assets/GoogleIcon.svg"
import styles from "./GoogleSigninBtn.module.css"

interface GoogleSignin {
  onClick: () => void;
}

const GoogleSigninBtn = ({ onClick }: GoogleSignin) => {
  return(
  <button className= {styles.button} onClick={onClick}>
    <img src={GoogleIcon} alt="Google Icon" className={styles.icon} />
    sign in
  </button>
  );
};

export default GoogleSigninBtn;