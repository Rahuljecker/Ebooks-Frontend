import { ColorModeScript, ChakraProvider, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { Provider as Reduxprovider } from 'react-redux';
import store from './components/redux/store';



const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
   <Reduxprovider store={store}>
   <ChakraProvider theme={theme}>
      <App />
      <ColorModeScript />
    </ChakraProvider>
   </Reduxprovider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
