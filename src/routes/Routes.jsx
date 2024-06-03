import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import Apartment from '../pages/Apartment/Apartment'
import DashboardLayout from '../layouts/DashboardLayout'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MakePayment from '../pages/Dashboard/Member/MakePayment/MakePayment'
import PaymentHistory from '../pages/Dashboard/Member/PaymentHistory/PaymentHistory'
import Profile from '../pages/Dashboard/Common/Profile'
import ManageMembers from '../pages/Dashboard/Admin/ManageMembers/ManageMembers'
import AgreementRequests from '../pages/Dashboard/Admin/AgreementRequests/AgreementRequests'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/apartment',
        element: <Apartment />,
      },
    ],
  },

  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <DashboardLayout/>,
    children:[
      {
        index: true,
        element: <Statistics/>
      },
      {
        path: 'make-payment',
        element: <MakePayment/>
      },
      {
        path: 'payment-history',
        element: <PaymentHistory/>
      },
      {
        path: 'profile',
        element: <Profile/>
      },
      {
        path: 'manage-members',
        element: <ManageMembers/>
      },
      {
        path: 'agreement-requests',
        element: <AgreementRequests/>
      }
    ],
  }
])
