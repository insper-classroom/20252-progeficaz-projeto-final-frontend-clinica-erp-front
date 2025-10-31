import React from 'react';
import axios from '../../api/axiosInstance';
import PatientForm from './PatientForm';
import "./index.css"

export default function Patients() {
  return (
    <div>
      <h1>Patients</h1>
      <PatientForm />
    </div>
  );
}
