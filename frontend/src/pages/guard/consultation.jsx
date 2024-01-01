import React from "react";
import axios from 'axios';

function Consultation() {
    function postConsultation(event) {
        event.preventDefault();

        axios.post('http://127.0.0.1:8000/api/v1/consultations', {
            token: localStorage.getItem('vaccinePlatformToken'),
            disease_history: event.target.disease_history.value,
            current_symptoms: event.target.current_symptoms.value,
        })
        .then(response => {
            alert("Consultation submitted successfully");
            window.location.href = '/dashboard';
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="container">
            <form onSubmit={postConsultation}>
                <div className="mb-3">
                    <label htmlFor="disease_history_exist" className="form-label">Do you have disease history?</label>
                    <select className="form-select" name="disease_history_exist" id="disease_history_exist">
                    <option value="0">No, I haven't</option>
                    <option value="1">Yes, I have</option>
                    </select>
                </div>
                <div className="mb-3">
                    <textarea className="form-control" name="disease_history" cols="30" rows="10" placeholder="Explain your disease history"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="current_symptoms_exist" className="form-label">Do you experience any symptoms?</label>
                    <select className="form-select" name="current_symptoms_exist" id="current_symptoms_exist">
                    <option value="0">No, I haven't</option>
                    <option value="1">Yes, I have</option>
                    </select>
                </div>
                <div className="mb-3">
                    <textarea className="form-control" name="current_symptoms" cols="30" rows="10" placeholder="Explain your symptoms"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
      </div>
    )
}

export default Consultation;