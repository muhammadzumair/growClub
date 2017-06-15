import 'scss/main.scss';
import 'assets/images/favicon.ico';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Router, applyRouterMiddleware, useRouterHistory } from 'react-router';
import useRelay from 'react-router-relay';
import {
  RelayNetworkLayer,
  urlMiddleware,
  authMiddleware,
} from 'react-relay-network-layer';

import createHashHistory from 'history/lib/createHashHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment';
import routes from './routes';

injectTapEventPlugin();
moment.locale('sk');

Relay.injectNetworkLayer(new RelayNetworkLayer([
  urlMiddleware({
    url: () => process.env.GRAPHQL_SERVER,
  }),
  authMiddleware({
    token: () => localStorage.getItem('bearer_token')
  }),
  next => (req) => {
    req.credentials = 'same-origin'; // eslint-disable-line
    return next(req);
  }
]));

const history = useRouterHistory(createHashHistory)();

ReactDOM.render(
  <Router
    routes={routes}
    history={history}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  />,
  document.getElementById('app')
);
