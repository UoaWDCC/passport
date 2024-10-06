import styles from "../styles/page styles/SignInError.module.css"; // Import the CSS module
import styles2 from '../styles/page styles/SignInPage.module.css';
import WDCC_Login from '../assets/WDCC_Logo.svg';

const NotAnAdmin: React.FC = () => {
    return (
      <div className={styles.container}>
        <div className={styles.topsection}>
          <img src={WDCC_Login} className="h-80" />
        </div>
        
        <div className={styles.bottomsection}>
            <p className={styles.errorbig}>OOPS!</p>
            <p className={styles.errorsmall}>Looks like you're not an admin :(</p>
            {/* Add a clickable button */}
            <a href="/Home" className={styles2.button}>
              <button>Go to Home</button>
            </a>
        </div>
      </div>
    );
};

export default NotAnAdmin;
