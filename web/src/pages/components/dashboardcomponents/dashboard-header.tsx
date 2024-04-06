import Logo from './wdcc-logo';
import DashboardTitle from './dashboard-title';

function Header() {
    return (
        <div className='header'>
            <DashboardTitle />
            <Logo />
        </div>
    );
}

export default Header;