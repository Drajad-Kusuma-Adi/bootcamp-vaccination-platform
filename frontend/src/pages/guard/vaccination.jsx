// import React, { useState, useEffect } from "react";
// import axios from 'axios';

// function Vaccination() {
//     const [vaccinationCount, setVaccinationCount] = useState();
//     const [spotsData, setSpotsData] = useState();

//     useEffect(() => {
//         const token = localStorage.getItem('vaccinePlatformToken');

//         axios.get('http://127.0.0.1:8000/api/v1/vaccinations?token=' + token)
//         .then(response => {
//             setVaccinationCount({
                
//             });
//         })
//         .catch(error => {

//         })

//     }, [])

//     return (
//         <div className="container mt-5">
//             <div className="bg-light p-5">
//             </div>
//         </div>
//     )
// }