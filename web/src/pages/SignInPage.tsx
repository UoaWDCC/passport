import { useEffect, useState } from "react";
import styles from "../styles/page styles/SignInPage.module.css"; // Import the CSS module
import GoogleSigninBtn from "../components/GoogleSigninBtn";
import useGoogleSignIn from "./Login";
import WDCC_Logo from "../assets/WDCC_Logo.svg";
import { ring, bouncy } from "ldrs";
import ErrorPage from "@pages/DesktopErrorPage.tsx";


const SignInPage: React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(true);

    // chceck if user on mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust the width threshold as needed
        };

        handleResize(); // Set initial value
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const url = window.location.pathname;

    const handleSignIn = useGoogleSignIn(url, setLoading);

    ring.register();
    bouncy.register();

    
    if(!isMobile) {
        return <ErrorPage />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.topsection}>
                <div>
                    <img src={WDCC_Logo} className="h-80" />
                </div>
            </div>

            <div className={styles.bottomsection}>
                <p className={styles.text}>Welcome to WDCC Passport!</p>
                <p className={styles.text}>
                    Please sign in with your Google account to proceed.
                </p>
                {isLoading ? (
                    <l-bouncy size="60" speed="1.75" color="#03045e"></l-bouncy>
                ) : (
                    <GoogleSigninBtn onClick={handleSignIn} />
                )}
                {/* Use the custom Google sign-in button */}
                <p className={styles.text}>Or</p>
                <a
                    className={styles.link}
                    href="https://docs.google.com/forms/d/e/1FAIpQLSf9p1n1GpuuFxXbhx_7iWDQkDqRpxVDAjUOeyyzYeavC6d48A/viewform"
                >
                    Register Here
                </a>
            </div>
        </div>
    );
};

export default SignInPage;
