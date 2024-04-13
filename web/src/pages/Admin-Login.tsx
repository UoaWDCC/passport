import GoogleSigninBtn from "@components/GoogleSigninBtn";
import PassportMain from "@components/PassportMain";
import "../styles/Admin-Login.css";


function AdminLogin() {
    return (
        <div className="admin-login-outer background-admin-login">
            <div className="admin-login-left-items">
                <h2 className="login-welcome-title">Welcome to the</h2>
                <h1 className="login-passport-title">WDCC Passport</h1>
                <h2 className="login-dashboard-title">Admin Dashboard</h2>
                <GoogleSigninBtn onClick={() => {}} adminLogin={true} />
            </div>
            <div className="admin-login-right-items">
                <PassportMain />
            </div>
        </div>
    );
}

export default AdminLogin;