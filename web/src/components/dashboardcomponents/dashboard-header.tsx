import Logo from './wdcc-logo';
import DashboardTitle from './dashboard-title';

function Header() {
    return (
        <div className='dashboard-header'>
            <DashboardTitle />
            <Logo />
        </div>
    );
}

export default Header;