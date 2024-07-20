import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Style/signin.css';
import axios from 'axios';

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null); // Reset error state
        try {
            const res = await axios.post('http://localhost:3000/login', { email, password });
            console.log(res);
        if (res.data && res.data.user && res.data.user.email) {
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate('/');
            } else {
                setError('Invalid login attempt');
            }
        } catch (error) {
            console.error("Login failed:", error);
            if (error.response && error.response.status === 400) {
                setError('Invalid credentials');
            } else if (error.response && error.response.status === 404) {
                setError('User not found');
            } else {
                setError('Login failed, please try again.');
            }
        }
    };

    return (
        <div className="signin-wrapper">
            <div className="signin-form">
                <div className="sign-in-heading">
                    <h2>Login</h2> <br />
                    <p>Enter your email below to Sign-in to your account</p> <br />
                </div>
                <form onSubmit={handleLogin}>
                    <label>
                        Email:
                        <input
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            placeholder="Enter your password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">Login</button> <br />
                    <p>Don't have an account? <span onClick={() => navigate('/signup')}>Register</span></p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
