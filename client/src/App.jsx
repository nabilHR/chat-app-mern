import './App.css';
import  AuthLayout from "./components/auth/authLayout";
import AuthCard from "./components/auth/AuthCard";  
import LoginForm from './components/auth/LoginForm';
import SingnUpForm from './components/auth/SignupForm';
import Home from './pages/auth/home';
export default function App() {
  
  return (
    <div className="App">
      <AuthLayout>
        <AuthCard>
             <Home/>
        </AuthCard>
      </AuthLayout>
    </div>
  );
}
