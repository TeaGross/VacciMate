import { RouterProvider } from 'react-router';
import './App.scss';
import { Router } from './Router';

function App() {
  return (
    <>
      <RouterProvider router= {Router}>
      </RouterProvider>
    </>
  );
}

export default App;
