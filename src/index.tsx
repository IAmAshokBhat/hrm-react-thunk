import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import { Attendance } from './components/Attendance';
import { Auth } from './components/core/Auth';
import { Dashboard } from './components/Dashboard';
import { Leaves } from './components/Leaves';
import { LoginPage } from './components/Login';
import { RegistrationPage } from './components/RegistrationPage';
import './index.css';
import { reducers } from './redux/reducers';
import reportWebVitals from './reportWebVitals';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <SnackbarProvider
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegistrationPage />} />
            <Route
              path="attendance"
              element={
                <Auth>
                  <Attendance />
                </Auth>
              }
            />
            <Route
              path="leaves"
              element={
                <Auth>
                  <Leaves />
                </Auth>
              }
            />
            <Route
              path="dashboard"
              element={
                <Auth>
                  <Dashboard />
                </Auth>
              }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </SnackbarProvider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
