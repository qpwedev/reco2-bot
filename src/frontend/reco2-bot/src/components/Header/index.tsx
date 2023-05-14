import logo from '../../assets/logo.png';

import './Header.css'

function Header() {
    return (
        <header className='header'>
            <img src={logo} alt='logo'></img>
        </header>
    );
}

export default Header;
