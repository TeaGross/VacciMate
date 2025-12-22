import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/Home/Home';
import { ErrorPage } from './pages/Error';
import { StartPage } from './pages/Start/Start';
import { VaccinationPage } from './pages/Vaccination/Vaccination';
import { LoginPage } from './pages/Login/Login';
import { AddVaccinationPage } from './pages/AddVaccination/AddVaccination';
import { EditVaccinationPage } from './pages/EditVaccination/EditVaccination';
import { Layout } from './pages/Layout';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <StartPage/>,
            },
            {
                path: '/login',
                element: <LoginPage/>,
            },
            {
                path: '/home',
                element: <HomePage/>,
            },
            {
                path: '/home/add',
                element: <AddVaccinationPage />
            },
            {
                path: '/home/:id',
                element: <VaccinationPage />
            },
            {
                path: '/home/:id/edit',
                element: <EditVaccinationPage />
            }
        ]
    }
], {
});
