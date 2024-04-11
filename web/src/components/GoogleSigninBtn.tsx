import GoogleIcon from "../assets/GoogleIcon.svg"
import styles from "./GoogleSigninBtn.module.css"

interface GoogleSignin {
  onClick: () => void;
  adminLogin?: boolean;
}

const GoogleSigninBtn = ({ onClick, adminLogin }: GoogleSignin) => {
  return(
  <button className={styles.button} id={adminLogin ? styles.adminbutton: ""} onClick={onClick}>
    <img src={GoogleIcon} alt="Google Icon" className={styles.icon} id={adminLogin ? styles.adminicon: ""}  />
    sign in
  </button>
  );
};

export default GoogleSigninBtn;