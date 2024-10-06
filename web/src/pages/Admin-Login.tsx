import { useState, useEffect } from "react";
import GoogleSigninBtn from "@components/GoogleSigninBtn";
import PassportMain from "@components/PassportMain";
import "../styles/page styles/Admin-Login.css";
import useGoogleSignIn from "./Login"; // Import the custom hook
import { bouncy } from "ldrs";
import ErrorPage from "@pages/MobileErrorPage";


function AdminLogin() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const url = window.location.pathname;
    const handleSignIn = useGoogleSignIn(url, setLoading);
    const [isMobile, setIsMobile] = useState(false);

    bouncy.register();

    // Check if mobile 
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

    if (isMobile) {
        return <ErrorPage />;
    }

    return (
        <div className="admin-login-outer background-admin-login">
            <div className="admin-login-left-items">
                <h2 className="welcome-title-admin-login">Welcome to the</h2>
                <h1 className="passport-title-admin-login">WDCC Passport</h1>
                <h2 className="dashboard-title-admin-login">Admin Dashboard</h2>
                {isLoading ? (
                    <div className="py-2">
                        <l-bouncy
                            size="60"
                            speed="1.75"
                            color="#03045e"
                        ></l-bouncy>
                    </div>
                ) : (
                    <GoogleSigninBtn onClick={handleSignIn} adminLogin={true} />
                )}
            </div>
            <div className="admin-login-right-items">
                <PassportMain />
            </div>
        </div>
    );
}

export default AdminLogin;
