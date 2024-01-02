import React, { useState, useEffect } from "react";
import axios from 'axios';

function Spot() {
    const urlParams = new URLSearchParams(window.location.search);
    const spotId = urlParams.get('id');
    const [spotData, setSpotData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/spotid?id=' + spotId)
        .then(response => {
            setSpotData(response.data);
        })
        .catch(error => {
            alert('Something went wrong');
            console.log(error);
        })
    }, [])

    function getSessionByDate() {
        const date = document.getElementById('date').value;
        axios.get('http://127.0.0.1:8000/api/v1/sessionbydate?date=' + date + '&id=' + spotId)
        .then(response => {
            // let occupiedSpots = response.data.occupied;
            console.log(response);
        })
        .catch(error => {
            alert('Something went wrong');
            console.log(error);
        })
    }

    function handleRegister() {
        axios.post('http://127.0.0.1:8000/api/v1/vaccinations?token=' + localStorage.getItem('vaccinePlatformToken') + '&spot_id=' + spotData.id)
        .then(response => {
            alert(response.data.message);
            window.location.href= '/';
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="container mt-5">
            <div className="bg-light d-flex justify-content-between m-3 p-3">
                <div>
                    <p className="fs-1 fw-bold">{spotData.name}</p>
                    <p className="fs-6">{spotData.address}</p>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={handleRegister}>Register Vaccination</button>
                </div>
            </div>
            <div>
                <div className="text-left m-3">
                    <p>Select vaccination date</p>
                    <input type="date" name="date" id="date" onChange={getSessionByDate} />
                </div>
                <div className="d-flex justify-content-evenly">
                    <div className="d-flex justify-content-between mt-5 border border-2 p-4">
                        <div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="fs-5 fw-bold">Session 1</p>
                                </div>
                                <div>
                                    <p>09:00 - 11:00</p>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap">
                                <div className="p-4 m-2 bg-light border">1</div>
                                <div className="p-4 m-2 bg-light border">2</div>
                                <div className="p-4 m-2 bg-light border">3</div>
                                <div className="p-4 m-2 bg-light border">4</div>
                                <div className="p-4 m-2 bg-primary text-light">5</div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-5 border border-2 p-4">
                        <div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="fs-5 fw-bold">Session 2</p>
                                </div>
                                <div>
                                    <p>13:00 - 15:00</p>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap">
                                <div className="p-4 m-2 bg-light">6</div>
                                <div className="p-4 m-2 bg-light">7</div>
                                <div className="p-4 m-2 bg-light">8</div>
                                <div className="p-4 m-2 bg-light">9</div>
                                <div className="p-4 m-2 bg-light">10</div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-5 border border-2 p-4">
                        <div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="fs-5 fw-bold">Session 3</p>
                                </div>
                                <div>
                                    <p>15:00 - 17:00</p>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap">
                                <div className="p-4 m-2 bg-light">11</div>
                                <div className="p-4 m-2 bg-light">12</div>
                                <div className="p-4 m-2 bg-light">13</div>
                                <div className="p-4 m-2 bg-light">14</div>
                                <div className="p-4 m-2 bg-light">15</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Spot;