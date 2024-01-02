import React, { useState, useEffect } from "react";
import axios from 'axios';

function Vaccination() {
    const [vaccinationCount, setVaccinationCount] = useState();
    const [spotsData, setSpotsData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('vaccinePlatformToken');

        axios.get('http://127.0.0.1:8000/api/v1/vaccinations?token=' + token)
        .then(response => {
            if (response.data.dose) {
                setVaccinationCount(response.data.dose);
            } else {
                setVaccinationCount(0);
            }
        })
        .catch(error => {
            alert("Something went wrong");
            console.log(error);
        })

        axios.get('http://127.0.0.1:8000/api/v1/spots?token=' + token)
        .then(response => {
            setSpotsData(response.data);
        })
        .catch(error => {
            alert("Something went wrong");
            console.log(error);
        })

    }, [])

    return (
        <div className="container mt-5">
            <div className="bg-light p-4">
                <h1 className="p-4 m-4 text-center">
                    {
                        vaccinationCount === 0 ? (
                            "First vaccination"
                        ) : (
                            "Second vaccination"
                        )
                    }
                </h1>
                <div className="table-responsive">
                    <table className="table table-hover">
                        {spotsData.map((spot, index) => (
                            <tr key={index}>
                                <td>
                                    <p className="fs-4 text-primary">{spot.name}</p>
                                    <p className="text-dark">{spot.address}</p>
                                </td>
                                <td>
                                    <p className="fs-4 text-dark">Serving</p>
                                    <p className="text-dark">
                                    {spot.serve === 1 && <p>Only first vaccination</p>}
                                    {spot.serve === 2 && <p>Only second vaccination</p>}
                                    {spot.serve !== 1 && spot.serve !== 2 && <p>Both vaccinations</p>}
                                    </p>
                                </td>
                                <td>
                                    {
                                        spot.serve === vaccinationCount || spot.serve === 3 ? (
                                            <a className="btn btn-primary bg-primary" href={"/register_spot?id=" + spot.id}>Choose this spot</a>
                                        ) : (
                                            <a className="btn btn-primary bg-primary disabled" href="#disabled">Choose this spot</a>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Vaccination;