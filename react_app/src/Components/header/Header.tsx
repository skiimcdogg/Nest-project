import { Link } from 'react-router-dom';
import magicLogo from '../../assets/images/Magicthegathering-logo.svg.png';
import favoriteLogo from '../../assets/images/favorite-logo.svg';
import homeLogo from '../../assets/images/home-logo.svg';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <div>
                <Link to={"/"}>
                    <img
                    src={homeLogo}
                    alt="Home logo"
                    />
                </Link>
            </div>
            <img
            src={magicLogo}
            className="header__magic-image"
            alt="Magic logo"
            />
            <div>
                <Link to={"/favorites"}>
                    <img
                    src={favoriteLogo}
                    alt="favorite logo"
                    />
                </Link>
            </div>
        </div>
    );
}

export default Header;