import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/loginPage';
import OnboardingPage from '../pages/onboardingPage';
import Dashboard from '../pages/dashboardpage/sidebar/sidebar';
import HomePage from '../pages/dashboardpage/homepage';
import BookPage from '../pages/libraryPage/book';
import Library from '../pages/libraryPage';
import SignupPage from '../pages/signupPage';
import OtpPage from '../pages/otpPage';


interface RouteConfig {
  path: string;
  element: React.ReactNode;
  errorElement?: React.ReactNode;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <OnboardingPage />,
    errorElement: <>Not Found</>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/otp',
    element: <OtpPage />
  },

  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'library',
        element: <Library />
      },
      {
        path: `book/:id`,
        element: <BookPage />
      },
      {
        path: 'community',
        element: <></>
      },
      {
        path: 'store',
        element: <></>
      },
      {
        path: 'settings',
        element: <></>
      },
    ]
  },

];

const router = createBrowserRouter(routes);

export default router;