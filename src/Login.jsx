import { useState} from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        console.log(`Handlesubmit`);
        
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(`Success: ${data}`);
            })
            .catch((error) => {
                console.error(`Error: ${error}`)
            })
    }

    return (
        <>
            <Navbar />
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username"></label>
                <input id="username" name="username" type="text" placeholder="username" value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password"></label>
                <input name="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>

            <p>No account yet? Sign up <Link to="/signup">here</Link></p>
        </>
    )
}

export default Login;