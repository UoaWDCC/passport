// app.tsx
import GenerateQRCodeButton from './components/dashboardcomponents/create-qr-code-button';
import Header from './components/dashboardcomponents/dashboard-header';

function Dashboard() {
    return (
        <div className='app'>
            <Header />
            <GenerateQRCodeButton />
        </div>
    );
}

export default Dashboard;