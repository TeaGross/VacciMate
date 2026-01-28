import { useContext } from 'react';
import { PrimaryButton, SecondaryButton } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import './Header.scss';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

export const Header = () => {
    const { logout, activeUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const isAddPage = location.pathname === '/home/add';
    

    const onLogout = () => {
        logout();
        navigate('/');
    };
    
    return (
        <header className='header'>
            <Logo></Logo>

            <nav className='btn-container'>
            {activeUser && !isAddPage && (
                <PrimaryButton as={Link} to='/home/add' aria-label='Lägg till vaccination'><svg xmlns='http://www.w3.org/2000/svg' aria-hidden="true" focusable="false" height='24px' viewBox='0 -960 960 960' width='24px' fill='#FFFFFF'><path d='M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'/></svg><span>Ny vaccination</span></PrimaryButton>
            )}

            {activeUser ? (
                <SecondaryButton onClick={onLogout} aria-label='Logga ut'><svg xmlns='http://www.w3.org/2000/svg' aria-hidden="true" focusable="false" height='24px' viewBox='0 -960 960 960' width='24px' fill='#000000'><path d='M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z'/></svg><span>Logga ut</span></SecondaryButton>
            ) : (
                <SecondaryButton as={Link} to='/login' aria-label='Logga in'><svg xmlns='http://www.w3.org/2000/svg' aria-hidden="true" focusable="false" height='24px' viewBox='0 -960 960 960' width='24px' fill='#000000'><path d='M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z'/></svg>Logga in</SecondaryButton>
            )}
            </nav>
        </header>
    );
};