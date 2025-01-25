import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/loginPage';
import OnboardingPage from '../pages/onboardingPage';


interface RouteConfig {
  path: string;
  element: React.ReactNode;
  errorElement?: React.ReactNode;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <OnboardingPage />,
    errorElement: <>Not Found</>
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
 
];

const router = createBrowserRouter(routes);

export default router;