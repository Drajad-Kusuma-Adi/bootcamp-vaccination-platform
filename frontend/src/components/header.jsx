import React, { useState, useEffect } from "react";
import axios from 'axios';

function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  function checkAuth() {
    if (localStorage.getItem('vaccinePlatformToken')) {
      const token = localStorage.getItem('vaccinePlatformToken');
      axios.get('http://127.0.0.1:8000/api/v1/auth/check_token?token=' + token)
        .then(response => {
          const name = response.data.name;
          setName(name);
          setIsAuth(true);
        })
        .catch(error => {
          alert('Something went wrong, please try again');
          console.log(error);
        });
    }
  }

  function handleLogout(event) {
    event.preventDefault();

    if (localStorage.getItem('vaccinePlatformToken')) {
      const token = localStorage.getItem('vaccinePlatformToken');
      axios.get('http://127.0.0.1:8000/api/v1/auth/logout?token=' + token)
      .then(response => {
        localStorage.removeItem('vaccinePlatformToken');
        window.location.reload();
      })
      .catch(error => {
        alert('Something went wrong please try again');
        console.log(error);
      })
    }
  }

  return (
    <div className="container-fluid bg-primary d-flex flex-row justify-content-between align-items-center position-sticky top-0 p-4">
        <div className="justify-content-center">
            <h1 className="text-light fw-semibold">Vaccination Platform</h1>
        </div>
        <div className="justify-content-center">
            {isAuth ? (
            <>
                <p className="text-light">{name}</p>
                <button className="btn btn-info text-light" onClick={handleLogout}>Logout</button>
            </>
            ) : (
            <a href="/" className="btn btn-info text-light">Login</a>
            )}
        </div>
    </div>
  )
}

export default Header;