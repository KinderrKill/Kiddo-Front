import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import { apollo } from './graphql/apollo';

import UserLayout from './pages/layout/UserLayout';
import AdminLayout from './pages/layout/AdminLayout';

import AuthContext from './context/AuthContext';
import SearchContext from './context/SearchContext';

//App layout components

import HomePage from './pages/app/HomePage';
import Kiddo from './pages/app/Kiddo';
import Contact from './pages/app/Contact.jsx';
import NotFound from './pages/app/NotFound.jsx';

import CreateEvents from './pages/app/CreateEvents';
import CategoryPage from './pages/app/CategoryPage';
import EventPage from './pages/app/EventPage';
import SearchPage from './pages/app/SearchPage';

//Admin layout components

import UserDashboard from './pages/app/userDashboard/UserDashboard';
import UserDashboardActivity from './pages/app/userDashboard/UserDashboardActivity';
import UserDashboardFav from './pages/app/userDashboard/UserDashboardFav';
import UserDashboardNotification from './pages/app/userDashboard/UserDashboardNotification';

import AdminDashboard from './pages/administration/Dashboard';
import AdminUser from './pages/administration/sections/user/User';
import AdminUserProfil from './pages/administration/sections/user/UserProfil';
import AdminUserTestMutation from './pages/administration/sections/user/UserTestMutation';
import UserInfo from './pages/app/userDashboard/UserInfo';
import Signalement from './pages/administration/sections/Report';

// Import CSS
import './style.css';
import UserInfoV2 from './pages/app/userDashboard/UserInfoV2';
import SignalmentPage from './pages/administration/sections/user/SignalmentPage';
import UserProfilDemo from './pages/administration/sections/user/UserProfilDemo';

let isAdmin = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('Launch REACT Project with NODE_ENV :', process.env.NODE_ENV);
console.log(
  'Front URL is : ',
  process.env.REACT_APP_ENV === 'DEV'
    ? process.env.REACT_APP_DEV_GRAPHQL_ENDPOINT
    : process.env.REACT_APP_PROD_GRAPHQL_ENDPOINT
);

root.render(
  // <React.StrictMode>
  <ApolloProvider client={apollo}>
    <AuthContext>
      <Router>
        <SearchContext>
          <Routes>
            <Route path='*' element={<UserLayout components={<NotFound />} />} />
            <Route path='/' element={<UserLayout components={<HomePage />} />} />
            <Route path='/kiddo' element={<UserLayout components={<Kiddo />} />} />
            <Route path='/contact' element={<UserLayout components={<Contact />} />} />
            <Route path='/event/:eventId' element={<UserLayout components={<EventPage />} />} />
            <Route path='/category/:category' element={<UserLayout components={<CategoryPage />} />} />
            <Route path='/create-event' element={<UserLayout components={<CreateEvents />} />} />
            <Route path='/dashboard' element={<UserLayout components={<UserDashboard />} />} />
            <Route path='/dashboard/activity' element={<UserLayout components={<UserDashboardActivity />} />} />
            <Route path='/dashboard/fav' element={<UserLayout components={<UserDashboardFav />} />} />
            <Route path='/dashboard/notification' element={<UserLayout components={<UserDashboardNotification />} />} />
            <Route path='/dashboard/user' element={<UserLayout components={<UserInfo />} />} />
            <Route path='/dashboard/userV2' element={<UserLayout components={<UserInfoV2 />} />} />

            <Route path='/search' element={<UserLayout components={<SearchPage />} />} />
            {isAdmin && (
              <Fragment>
                <Route path='/administration' element={<AdminLayout components={<AdminDashboard />} />} />
                <Route path='/administration/users' element={<AdminLayout components={<AdminUser />} />} />
                <Route path='/administration/users/:id' element={<AdminLayout components={<AdminUserProfil />} />} />
                <Route path='/administration/reports' element={<AdminLayout components={<Signalement />} />} />
                <Route path='/administration/reports/:id' element={<AdminLayout components={<SignalmentPage />} />} />
                <Route
                  path='/administration/userTest'
                  element={<AdminLayout components={<AdminUserTestMutation />} />}
                />
                <Route path='/administration/userDemo' element={<AdminLayout components={<UserProfilDemo />} />} />
              </Fragment>
            )}
          </Routes>
        </SearchContext>
      </Router>
    </AuthContext>
  </ApolloProvider>
  // </React.StrictMode>
);

reportWebVitals();
