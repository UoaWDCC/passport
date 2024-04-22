import GoogleSigninBtn from "@components/GoogleSigninBtn";
import PassportMain from "@components/PassportMain";
import "../styles/page styles/admin-login.css";


function AdminLogin() {
    return (
        <div className="admin-login-outer background-admin-login">
            <div className="admin-login-left-items">
                <h2 className="welcome-title-admin-login">Welcome to the</h2>
                <h1 className="passport-title-admin-login">WDCC Passport</h1>
                <h2 className="dashboard-title-admin-login">Admin Dashboard</h2>
                <GoogleSigninBtn onClick={() => {}} adminLogin={true} />
            </div>
            <div className="admin-login-right-items">
                <PassportMain />
            </div>
        </div>
    );
}

export default AdminLogin;