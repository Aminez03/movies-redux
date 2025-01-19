import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signin } from "../../Services/authservice";
import "./AuthForm.css";
const AuthForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CC_Token, setCC_Token] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const objetuser = {
      email: email,
      password: password,
    };
    signin(objetuser)
      .then((result) => {
        if (result.data.success) {
         
          if (result.data.user.isActive) {
            setCC_Token(result.data.token)
            localStorage.setItem("CC_Token", result.data.token);
            localStorage.setItem("user", result.data.user);
            localStorage.setItem("role",  result.data.user.role);
            localStorage.setItem("name",  result.data.user.name);
            localStorage.setItem("email",  result.data.user.email);
            localStorage.setItem("avatar",  result.data.user.avatar);
            if (result.data.user.role === "admin") navigate("/dashboard");
            else navigate("/");
          } else alert("Compte n'est pas encore activé");
        } else alert("Error");
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  };

  useEffect(() => {
  }, [CC_Token]);

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>
          <div className="input-group">
            <div className="input-label">Email</div>
            <div className="input-wrapper">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-label">Password</div>
            <div className="input-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="button" type="submit">
            Log In
          </button>
        </form>
        <Link href="#" to="/register">
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
    </div>
  );
};
export default AuthForm;
