import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { Provider } from 'react-redux';
import { store } from './store';

// Apollo client definition
const client = new ApolloClient({
  // Here we can define many properties
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index', // API url
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Provider store={store}>
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>

  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
