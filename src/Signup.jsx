import { useState } from "react"
import Navbar from "./Navbar"
import { useForm } from "react-hook-form";


function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [validationMessge, setValidationMessage] = useState('')

    function handleSubmit() {
        event.preventDefault()
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, username, password, confirmPassword }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('POST user signup Success:', data);
            })
            .catch((error) => {
                console.error('POST user signup Error:', error);
            });

        setValidationMessage('Success!')
    }


    return (
        <>
            <Navbar />
            <h1>Sign up</h1>

            <div onSubmit={handleSubmit} className="flex" id="signup-container">
                <form>
                    <div className="form-flex-row">
                        <label htmlFor="first-name"></label>
                        <input type="name" name="first-name" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                        <label htmlFor="last-name"></label>
                        <input type="name" name="last-name" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    <div className="form-flex-col">
                        <label htmlFor="username"></label>
                        <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />

                        <label htmlFor="password"></label>
                        <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <label htmlFor="confirm-password"></label>
                        <input type="password" name="confirm-password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <button type="submit"> Submit </button>
                </form>
            </div>
            <div>
            <p id="validation-message">{validationMessge}</p>
            </div>
        </>
    )
}


export default Signup