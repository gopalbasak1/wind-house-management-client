import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import Apartment from '../pages/Apartment/Apartment'
import DashboardLayout from '../layouts/DashboardLayout'
import MakePayment from '../pages/Dashboard/Member/MakePayment/MakePayment'
import PaymentHistory from '../pages/Dashboard/Member/PaymentHistory/PaymentHistory'
import Profile from '../pages/Dashboard/Common/Profile'
import ManageMembers from '../pages/Dashboard/Admin/ManageMembers/ManageMembers'
import AgreementRequests from '../pages/Dashboard/Admin/AgreementRequests/AgreementRequests'
import MyProfile from '../pages/Dashboard/Member/MyProfile/MyProfile'
import Payment from '../components/Dashboard/Payment/Payment'
import PrivateRoute from './PrivateRoute'
import MemberRoute from './MemberRoute'
import AdminRoute from './AdminRoute'
import MakeAnnouncement from '../pages/Dashboard/Admin/MakeAnnouncement/MakeAnnouncement'
import Announcement from '../pages/Dashboard/Member/Announcements/Announcements'
import ManageCoupons from '../pages/Dashboard/Admin/ManageCoupons'
import AdminProfile from '../pages/Dashboard/Admin/AdminProfile/AdminProfile'

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
        path: 'admin-profile',
        element: <PrivateRoute>
          <AdminRoute>
            <AdminProfile/>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'make-payment',
        element: <PrivateRoute>
          <MemberRoute>
          <MakePayment/>
          </MemberRoute>
        </PrivateRoute>
      },
      {
        path: 'payment-history',
        element: <PrivateRoute>
          <MemberRoute>
          <PaymentHistory/>
          </MemberRoute>
        </PrivateRoute>
      },
      {
        path: 'profile',
        element: <Profile/>
      },
      {
        path: 'manage-members',
        element: <PrivateRoute>
          <AdminRoute>
          <ManageMembers/>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'agreement-requests',
        element: <PrivateRoute>
          <AdminRoute>
          <AgreementRequests/>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'make-announcement',
        element: <PrivateRoute>
          <AdminRoute>
          <MakeAnnouncement/>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'manage-coupons',
        element: <PrivateRoute>
          <AdminRoute>
          <ManageCoupons/>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'announcement',
        element: <PrivateRoute>
          <Announcement></Announcement>
        </PrivateRoute>
      },
      {
        path: 'payment',
        element: <PrivateRoute>
          <MemberRoute>
          <Payment/>
          </MemberRoute>
        </PrivateRoute>
      }
      
    ],
  }
])
