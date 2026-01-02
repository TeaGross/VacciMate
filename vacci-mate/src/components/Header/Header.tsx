import { LinkButton } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import './Header.scss';
import { Link } from 'react-router';

export const Header = () => {
    return (
        <>
        <header className="header">
            <Logo></Logo>

            

            <Link to="/login">
                <LinkButton>Logga in</LinkButton>
            </Link>
                
            </header>
        </>
    );
};