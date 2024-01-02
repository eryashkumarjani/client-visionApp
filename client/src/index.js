import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { FirebaseProvider } from './context/Firebase';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import ForgetPassword from './pages/ForgotPassword/ForgotPassword';
import CreatePosts from './pages/CreatePosts/CreatePosts';
import Approvals from './pages/AcceptApprovals/AcceptApprovals';
import ReviewTicket from './pages/ReviewTicket/ReviewTicket';
import FundMonitor from './pages/FundMonitor/FundMonitor';
import AddProducts from './pages/AddProducts/AddProducts';
import AddServiceProviders from './pages/AddServiceProviders/AddServiceProviders';

import store from "./store/store";
import { Provider } from "react-redux";
import PageNotFound from './pages/PageNotFound/PageNotFound';
import AddFunds from './pages/AddFunds/AddFunds';
import RaiseTicket from './pages/RaiseTicket/RaiseTicket';
import HomemadeProducts from './pages/HomemadeProducts/HomemadeProducts';
import ServiceProviders from './pages/ServiceProviders/ServiceProviders';
import DashboardUser from './pages/DashboardUser/DashboardUser';
import ViewPosts from './pages/ViewPosts/ViewPosts';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboardUser",
    element: <DashboardUser />,
  },
  {
    path: "/forgotPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/createPosts",
    element: <CreatePosts />,
  },
  {
    path: "/acceptApprovals",
    element: <Approvals />,
  },
  {
    path: "/reviewTicket",
    element: <ReviewTicket />,
  },
  {
    path: "/fundMonitor",
    element: <FundMonitor />,
  },
  {
    path: "/addProducts",
    element: <AddProducts />,
  },
  {
    path: "/addServiceProviders",
    element: <AddServiceProviders />,
  },
  {
    path: "/addFunds",
    element: <AddFunds />,
  },
  {
    path: "/raiseTicket",
    element: <RaiseTicket />,
  },
  {
    path: "/homemadeProducts",
    element: <HomemadeProducts />,
  },
  {
    path: "/serviceProviders",
    element: <ServiceProviders />,
  },
  {
    path: "/viewPosts",
    element: <ViewPosts />,
  },
  {
    path: "/paymentSuccess",
    element: <PaymentSuccess />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
    </FirebaseProvider>
  </React.StrictMode>
);
