import './App.css';
import  AuthLayout from "./components/auth/authLayout";
import AuthCard from "./components/auth/AuthCard";  
import LoginForm from './components/auth/LoginForm';
import SingnUpForm from './components/auth/SignupForm';
export default function App() {
  
  return (
    <div className="App">
      <AuthLayout>
        <AuthCard>
          {/* <LoginForm/> */}
          <SingnUpForm/>
        </AuthCard>
      </AuthLayout>
    </div>
  );
}
