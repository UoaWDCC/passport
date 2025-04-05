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
          <a className={styles2.link} href="https://docs.google.com/forms/d/e/1FAIpQLSf9p1n1GpuuFxXbhx_7iWDQkDqRpxVDAjUOeyyzYeavC6d48A/viewform">Register Here</a>
        </div>
      </div>
    );
  };

export default SignInErrorPage;
