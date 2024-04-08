import styles from "./SignInError.module.css"; 
import WDCC_Logo from "../../assets/WDCC_Logo.svg"

const SignInErrorPage: React.FC = () => {
    return (
      <div className={styles.container}>
        <div className={styles.topsection}>
          <img src={WDCC_Logo} alt="WDCC Logo" className={styles.logo} />
        </div>
        
        <div className={styles.bottomsection}>
            <p className={styles.errorbig}>OOPS!</p>
            <p className={styles.errorsmall}>Looks like you're not registered with WDCC :(</p>
          <a className={styles.link} href="https://forms.gle/YX8RAdXGF4rTN3e27">Register Here</a>
        </div>
      </div>
    );
  };

export default SignInErrorPage;