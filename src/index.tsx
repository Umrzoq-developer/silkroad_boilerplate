// import "core-js/features/array/flat-map";
// import "core-js/features/map";
// import "core-js/features/promise";
// import "core-js/features/set";
// import "raf/polyfill";
//polyfill
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/ApolloConfig';

ReactDOM.render(
  <CookiesProvider>
    <RecoilRoot>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </RecoilRoot>
  </CookiesProvider>,
  document.getElementById('root'),
);
