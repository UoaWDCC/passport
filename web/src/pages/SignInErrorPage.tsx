import styles from "../styles/page styles/SignInError.module.css"; // Import the CSS module
import styles2 from '../styles/page styles/SignInPage.module.css';
import WDCC_Login from '../assets/WDCC_Logo.svg';

const SignInErrorPage: React.FC = () => {
    return (
      <div className={styles.container}>
        <div className={styles.topsection}>
          <img  src={WDCC_Login} className="h-80"/>
        </div>
        
        <div className={styles.bottomsection}>
            <p className={styles.errorbig}>OOPS!</p>
            <p className={styles.errorsmall}>Looks like you're not registered with WDCC :(</p>
          <a className={styles2.link} href="https://forms.gle/YX8RAdXGF4rTN3e27">Register Here</a>
        </div>
      </div>
    );
  };

export default SignInErrorPage;