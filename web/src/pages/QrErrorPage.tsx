import styles from "../styles/page styles/SignInError.module.css";
import WDCC_Login from '../assets/WDCC_Logo.svg';

const QRErrorPage: React.FC = () => {
    return (
      <div className={styles.container}>
        <div className={styles.topsection}>
          <img  src={WDCC_Login} className="h-80"/>
        </div>
        
        <div className={styles.bottomsection}>
            <p className={styles.errorbig}>OOPS!</p>
            <p className={styles.errorsmall}>Looks like this qr code is invalid :(</p>
        </div>
      </div>
    );
  };

export default QRErrorPage;