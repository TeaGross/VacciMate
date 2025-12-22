import { Outlet } from 'react-router';

export const Layout = () => {
    return (
        <>
        <header>Header</header>
        <main>
            <Outlet></Outlet>
        </main>
        <footer>footer</footer>
        </>
    );
};