import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import DashboardContent from './components/templates/adminTemplates/dashboard/DashboardContent'
import CategoryContent from './components/templates/adminTemplates/category/CategoryContent'
import UserContent from './components/templates/adminTemplates/user/UserContent'
import HomePage from './pages/HomePage'
import OrchidDetailPage from './pages/OrchidDetailPage'
import ProtectedRoute from './ProtectedRoute'
import PaymentPage from './pages/PaymentPage'
import CartPage from './pages/CartPage'
import OrderPage from './pages/OrderPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute adminOnly={false} />}>
          <Route path='/' element={<HomePage />} />
          <Route path="/orchid/:orchidID" element={<OrchidDetailPage />} />
          <Route index path="/login" element={<LoginPage />} />
          <Route index path="/register" element={<RegisterPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Route>
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<DashboardContent />} />
            <Route path="category" element={<CategoryContent />} />
            <Route path="user" element={<UserContent />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
