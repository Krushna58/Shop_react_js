import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import OrderContext from './Component/OrderContext';
import OrderContextProvider from './Component/OrderContext';
import UserContextProvider from './Component/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <UserContextProvider>
        <OrderContextProvider>
        <App />
    </OrderContextProvider>
    </UserContextProvider>

);


reportWebVitals();
