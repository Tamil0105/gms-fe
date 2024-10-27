import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from './layout/AuthLayout';
import Contacts from './pages/Contacts';
import Dashboard from './pages/dashbord';
import Testimonials from './pages/testimonials';
import NewsFeedComponent from './pages/newsFeed';
import SettingsPage from './pages/settingPage';
import VerificationPage from './pages/verify-mail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-mail" element={<VerificationPage />} />

          {/* Wrap protected routes inside AuthLayout */}
          <Route
            path="/contacts"
            element={
              <AuthLayout>
                <Contacts />
              </AuthLayout>
            }
          />
            <Route
            path="/setting"
            element={
              <AuthLayout>
                <SettingsPage />
              </AuthLayout>
            }
          />
            <Route
            path="/testimonials"
            element={
              <AuthLayout>
                <Testimonials />
              </AuthLayout>
            }
          />
            <Route
            path="/news-feed"
            element={
              <AuthLayout>
                <NewsFeedComponent />
              </AuthLayout>
            }
          />
          <Route
            path="/"
            element={
              <AuthLayout>
                <Dashboard />
              </AuthLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
