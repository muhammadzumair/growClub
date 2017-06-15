import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'js/pages/App';
import Dashboard from 'js/pages/Dashboard';
import Profile from 'js/pages/Profile';
import Calendar from 'js/pages/Calendar';
import Orders from 'js/pages/Orders';
import Settings from 'js/pages/Settings';
import LoginPage from 'js/pages/Login';
import NotFoundPage from 'js/pages/NotFoundPage';

// queries
import {
  ViewerQuery
} from './queries';


function requireAuth(nextState, replace) {
  if (!localStorage.getItem('bearer_token')) {
    replace({
      pathname: '/sign-in',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
export default (
  <Route>
    <Route path="/sign-in" component={LoginPage} queries={ViewerQuery}/>
    <Route path="/" component={App} queries={ViewerQuery} onEnter={requireAuth}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="profile" component={Profile} queries={ViewerQuery} />
      <Route path="calendar" component={Calendar}/>
      <Route path="orders" component={Orders} queries={ViewerQuery} />
      <Route path="settings" component={Settings} queries={ViewerQuery} />
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
