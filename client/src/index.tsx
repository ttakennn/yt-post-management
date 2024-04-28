import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { ConfirmProvider } from 'material-ui-confirm';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Home from './components/Home/home';
import AuthLayout from './components/Auth/AuthLayout';
import Auth from './components/Auth/Auth';
import NotFoundPage from './components/NotFound/not-found';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastProvider } from './components/Toast/toast-provider';
import PostDetails from './features/Posts/PostDetails';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/posts/*" element={<Home />}></Route>
        <Route path="/post/:id" element={<PostDetails />}></Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/auth" element={<Auth />}></Route>
      </Route>

      <Route path="*" element={<NotFoundPage />}></Route>
    </>,
  ),
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <ConfirmProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="88551598840-50tb5cd5d6u73ejrrn67cme7cdg6pbmk.apps.googleusercontent.com">
          {/* <React.StrictMode> */}
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
          {/* </React.StrictMode> */}
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </ConfirmProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
