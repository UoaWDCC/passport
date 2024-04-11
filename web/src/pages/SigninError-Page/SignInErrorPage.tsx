import styles from "./SignInError.module.css"; // Import the CSS module

const SignInErrorPage: React.FC = () => {
    return (
      <div className={styles.container}>
        <div className={styles.topsection}>
        <h1 className={styles.h1}>WDCC</h1>
          <p className={styles.subtitle}>Web Dev & Consulting Club</p>
        </div>
        
        <div className={styles.bottomsection}>
            <p className={styles.errorbig}>OOPS!</p>
            <p className={styles.errorsmall}>Looks like you're not registered with WDCC :(</p>
          <a className={styles.text} href="https://forms.gle/YX8RAdXGF4rTN3e27">Register Here</a>
        </div>
      </div>
    );
  };

export default SignInErrorPage;