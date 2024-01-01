import React from "react";
import axios from 'axios';

function LoginPage() {

    function handleLogin(event) {
        event.preventDefault();
        const idCardNumber = event.target.id_card_number.value;
        const password = event.target.password.value;
        axios.post('http://127.0.0.1:8000/api/v1/auth/login', { id_card_number: idCardNumber, password: password })
        .then(response => {
            const token = response.data.token;
            localStorage.setItem('vaccinePlatformToken', token);
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container mx-5 border border-2 p-4" id="loginContainer">
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group my-4">
                    <label htmlFor="id_card_number">ID Card Number</label>
                    <input type="id_card_number" className="form-control" id="id_card_number" placeholder="ID Card Number" />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <div className="my-4">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;