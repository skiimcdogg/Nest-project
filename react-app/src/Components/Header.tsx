import { Link } from 'react-router-dom';
import magicLogo from '../assets/images/Magicthegathering-logo.svg.png'

function Header() {
    return (
        <div>
            <h2>Bonjour Header</h2>
            <Link to={'/'}>
                <img
                src={magicLogo}
                alt='Home magic logo'
                />
            </Link>
            <Link to={'/'}>
                <img
                src={magicLogo}
                alt='Home magic logo'
                />
            </Link>
        </div>
    );
}

export default Header;