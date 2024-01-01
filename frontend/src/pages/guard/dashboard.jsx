import React, { useState, useEffect } from "react";
import axios from 'axios';

function Dashboard() {
    const [consultationData, setConsultationData] = useState();
    const [vaccinationData, setVaccinationData] = useState();

    useEffect(() => {
        const token = localStorage.getItem('vaccinePlatformToken');

        axios.get('http://127.0.0.1:8000/api/v1/consultations?token=' + token)
            .then(response => {
                if (response.data.message !== "You haven't consulted yet") {
                    setConsultationData({
                        status: response.data.consultation_status,
                        current_symptoms: response.data.current_symptoms,
                        disease_history: response.data.disease_history,
                        doctor_name: response.data.doctor_name,
                        doctor_notes: response.data.doctor_notes
                    });
                } else {
                    setConsultationData(null);
                }
            })
            .catch(error => {
                alert("Something went wrong");
                console.log(error);
            });

        axios.get('http://127.0.0.1:8000/api/v1/vaccinations?token=' + token)
            .then(response => {
                if (response.data.message !== "You haven't vaccinate yet") {
                    setVaccinationData(response.data);
                    console.log(response.data);
                } else {
                    setVaccinationData(null);
                }
            })
            .catch(error => {
                alert("Something went wrong");
                console.log(error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center">My Consultation</h1>
            <div className="p-4 border my-4">
                {
                    consultationData ? (
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><h1>Consultation</h1></td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td>:</td>
                                        <td>{consultationData.status}</td>
                                    </tr>
                                    <tr>
                                        <td>Current Symptoms</td>
                                        <td>:</td>
                                        <td>{
                                                consultationData.current_symptoms === null ? (
                                                    "No symptoms"
                                                ) : (
                                                    consultationData.current_symptoms
                                                )
                                            }</td>
                                    </tr>
                                    <tr>
                                        <td>Disease History</td>
                                        <td>:</td>
                                        <td>{
                                                consultationData.disease_history === null ? (
                                                    "No disease history"
                                                ) : (
                                                    consultationData.disease_history
                                                )
                                            }</td>
                                    </tr>
                                    <tr>
                                        <td>Doctor Name</td>
                                        <td>:</td>
                                        <td>{
                                            consultationData.doctor_name === null ? (
                                                "Consultation not approved yet"
                                            ) : (
                                                consultationData.doctor_name
                                            )
                                        }</td>
                                    </tr>
                                    <tr>
                                        <td>Doctor Notes</td>
                                        <td>:</td>
                                        <td>{
                                                consultationData.doctor_notes === null ? (
                                                    "Nothing"
                                                ) : (
                                                    consultationData.doctor_notes
                                                )
                                            }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <a href="/register_consultation" className="btn btn-primary">+ Register Consultation</a>
                    )
                }
            </div>
            <h1 className="text-center">My Vaccinations</h1>
            <div className="p-4 border my-4">
                {
                    consultationData && consultationData.status === 'accepted' ? (
                        vaccinationData ? (
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Status</td>
                                            <td>:</td>
                                            <td>{new Date(vaccinationData.date) < new Date() ? 'Pending' : 'Vaccinated'}</td>
                                        </tr>
                                        <tr>
                                            <td>Vaccine</td>
                                            <td>:</td>
                                            <td>{vaccinationData.vaccine}</td>
                                        </tr>
                                        <tr>
                                            <td>Dose</td>
                                            <td>:</td>
                                            <td>{vaccinationData.dose}</td>
                                        </tr>
                                        <tr>
                                            <td>Date</td>
                                            <td>:</td>
                                            <td>{vaccinationData.date}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <>
                                <a href="/register_vaccination" className="btn btn-primary">+ Register Vaccination</a>
                            </>
                        )
                    ) : (
                        <>
                            <p>You need to consult and get accepted before registering vaccination</p>
                            <a href="/register_vaccination" className="btn btn-primary disabled">+ Register Vaccination</a>
                        </>
                    )
                }
            </div>
            {
                vaccinationData && vaccinationData.dose < 2 ? (
                    <a href="/register_vaccination" className="btn btn-primary">+ Register Second Vaccination</a>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default Dashboard;