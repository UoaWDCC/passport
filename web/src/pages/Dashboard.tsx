import GenerateQRCodeButton from '../components/dashboardcomponents/create-qr-code-button';
import Header from '../components/dashboardcomponents/dashboard-header';
import '../styles/page styles/dashboard.css';

function Dashboard() {
    return (
            <div className='dashboard-container background-dashboard'>
                <Header />
                <GenerateQRCodeButton />
            </div>
    );
}

export default Dashboard;