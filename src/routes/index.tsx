import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';


interface RouteConfig {
  path: string;
  element: React.ReactNode;
  errorElement?: React.ReactNode;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <>Not Found</>
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
 
];

const router = createBrowserRouter(routes);

export default router;