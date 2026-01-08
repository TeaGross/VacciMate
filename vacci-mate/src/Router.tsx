import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/Home/Home';
import { ErrorPage } from './pages/Error';
import { StartPage } from './pages/Start/Start';
import { VaccinationPage } from './pages/Vaccination/Vaccination';
import { LoginPage } from './pages/Login/Login';
import { AddVaccinationPage } from './pages/AddVaccination/AddVaccination';
import { EditVaccinationPage } from './pages/EditVaccination/EditVaccination';
import { Layout } from './pages/Layout';
import { RegisterPage } from './pages/Register/Register';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { GuestOnlyRoute } from './components/GuestOnlyRoute/GuestOnlyRoute';

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
                element: (
                    <GuestOnlyRoute>
                        <LoginPage/>
                    </GuestOnlyRoute>
                ),
            },
            {
                path: '/register',
                element: (
                    <GuestOnlyRoute>
                        <RegisterPage/>,
                    </GuestOnlyRoute>
                ),
            },
            {
                path: '/home',
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/home/add',
                element: (
                    <ProtectedRoute>
                        <AddVaccinationPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/home/:id',
                element: (
                    <ProtectedRoute>
                        <VaccinationPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/home/edit/:id',
                element: (
                    <ProtectedRoute>
                        <EditVaccinationPage />
                    </ProtectedRoute>
                ),
            }
        ]
    }
], {
});
