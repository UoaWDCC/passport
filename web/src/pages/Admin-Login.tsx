import GoogleSigninBtn from "@components/GoogleSigninBtn";
import PassportMain from "@components/PassportMain";
import "../styles/Admin-Login.css";


function AdminLogin() {
    return (
        <div className="admin-login-outer">
            <div className="admin-login-left-items">
                <h2 className="welcome-title">Welcome to the</h2>
                <h1 className="passport-title">WDCC Passport</h1>
                <h2 className="dashboard-title">Admin Dashboard</h2>
                <GoogleSigninBtn onClick={() => {}} adminLogin={true} />
            </div>
            <div className="admin-login-right-items">
                <PassportMain />
            </div>
        </div>
    );
}

export default AdminLogin;