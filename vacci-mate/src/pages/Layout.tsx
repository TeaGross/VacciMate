import './Layout.scss';
import { Outlet } from 'react-router';
import { Header } from '../components/Header/Header';
import { useState } from 'react';
import type { Vaccination } from '../models/Vaccinations';
import { VaccinationContext } from '../context/VaccinationContext';
import { getVaccinations } from '../utils/VaccinationStorage';

export const Layout = () => {
    const [vaccinations, setVaccinations] = useState<Vaccination[]>(() => {
        return getVaccinations(); // Load from localStorage on init
    });

    return (
        <>
        <VaccinationContext.Provider 
        value={{vaccinations, setVaccinations}}>
            <div className='vacci-mate-layout-container'>
                <Header></Header>
                <main>
                    <Outlet></Outlet>
                </main>
                <footer>footer</footer>
            </div>
        </VaccinationContext.Provider>
        </>
    );
};