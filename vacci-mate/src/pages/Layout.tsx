import './Layout.scss';
import { Outlet, useLocation } from 'react-router';
import { Header } from '../components/Header/Header';
import { useEffect } from 'react';
import { Footer } from '../components/Footer/Footer';
import { AuthProvider } from '../context/AuthProvider';
import { VaccinationProvider } from '../context/VaccinationProvider';

export const Layout = () => {
    const location = useLocation();
        useEffect(() => {
            window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
        <AuthProvider>
            <VaccinationProvider>
                <div className='vacci-mate-layout-container'>
                    <Header></Header>
                    <main className="main-content">
                        <Outlet></Outlet>
                    </main>
                    <Footer></Footer>
                </div>
            </VaccinationProvider>
        </AuthProvider>
        </>
    );
};