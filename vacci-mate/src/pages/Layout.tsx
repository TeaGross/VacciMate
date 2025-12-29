import './Layout.scss';
import { Outlet } from 'react-router';
import { Header } from '../components/Header/Header';

export const Layout = () => {
    return (
        <>
        <div className='vacci-mate-layout-container'>
            <Header></Header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>footer</footer>
        </div>
        </>
    );
};