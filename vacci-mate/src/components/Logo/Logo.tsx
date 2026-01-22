import { Link } from 'react-router';
import './Logo.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Logo = () => {
    const { activeUser } = useContext(AuthContext);
    return (
        <>
            <div className="logo-container">
                {activeUser ? (
                    <Link to="/home" className='link'>
                        <h1 className="header-title">VacciMate</h1>
                    </Link>
                    ) : (
                    <Link to="/" className='link'>
                        <h1 className="header-title">VacciMate</h1>
                    </Link>
                )}
            </div>
        </>
    );
};