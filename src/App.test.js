import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './auth';

// App uses router hooks (useLocation/useNavigate) and useAuth, so it must be
// rendered inside BrowserRouter + AuthProvider — the same providers index.js wires up.
test('renders the rental hero heading', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
  const headings = screen.getAllByText(/premium car/i);
  expect(headings.length).toBeGreaterThan(0);
});
