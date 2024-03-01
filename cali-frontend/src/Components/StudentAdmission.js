import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const StudentAdmission = () => {
  const [formData, setFormData] = useState({
    surname: "",
    otherName: "",
    dateOfBirth: "",
    gender: "", // Include gender field
    age: null,
    mothersName: "",
    mothersTell: "",
    fathersName: "",
    fathersTell: "",
    guardianName: "",
    guardianTell: "",
    relationshipToChild: "",
    residentialAddress: "",
    previous_school_attended: "",
    classLevel: "",
    paymentMade: null,
    balance: null,
  });

  const [classLevels, setClassLevels] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const formContainerStyle = {
    background: "#2C97EB",
    color: "white",
    padding: "20px",
  };

  const formGroupStyle = {
    display: "flex",
    alignItems: "left",
    marginBottom: "10px",
  };

  const labelStyle = {
    width: "150px",
    textAlign: "left",
    marginRight: "10px",
  };

  const labelStyle2 = {
    width: "150px",
    textAlign: "right",
    marginRight: "10px",
  };

  const inputStyle = {
    flex: "1",
    padding: "5px",
    backgroundColor: "white",
    color: "black",
    border: "none",
    borderBottom: "1px solid white",
  };

  const radioStyle = {
    marginRight: "10px",
  };

  const cedisSymbolStyle = {
    fontSize: "1.2rem",
    color: "black",
    marginRight: "5px",
    textAlign: "right",
  };

  const classStyle = {
    display: "flex",
    background: "transparent",
    color: "white",
    padding: "20px",
    border: "1px solid white",
    alignItems: "center",
  };

  const classStyleBox = {
    marginRight: "10px",
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePreviousSchoolChange = (index, value) => {
    const updatedPreviousSchools = [...formData.previousSchools];
    updatedPreviousSchools[index] = value;
    setFormData({ ...formData, previousSchools: updatedPreviousSchools });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the form data to JSON format
    const jsonData = JSON.stringify({
    ...formData,
    classLevel: parseInt(formData.classLevel), // Convert classLevel to integer
  });

    // Send the data to the backend using the POST method
    fetch("http://127.0.0.1:8000/api/student/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data if needed
        console.log("Response from the backend:", data);

        // Clear the form after successful submission
        setFormData({
          surname: "",
          otherName: "",
          dateOfBirth: "",
          gender: "", // Include gender field
          age: null,
          mothersName: "",
          mothersTell: "",
          fathersName: "",
          fathersTell: "",
          guardianName: "",
          guardianTell: "",
          relationshipToChild: "",
          residentialAddress: "",
          previousSchoolAttended: "",
          classLevel: "",
          paymentMade: null,
          balance: null,
        });

        setSuccessMessage("Student added successfully!");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        // Handle errors if needed
        console.error("Error submitting form:", error);

      })
      .catch((error) => {
        // Handle errors if needed
        console.error("Error submitting form:", error);
      });
  };

  useEffect(() => {
    // Fetch class levels or grades using the GET method
    fetch("http://127.0.0.1:8000/api/class-level/")
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data if needed
        setClassLevels(data); // Set the class levels received from the backend
      })
      .catch((error) => {
        // Handle errors if needed
        console.error("Error fetching class levels:", error);
      });
  }, []);

  return (
    <body style={{ margin: 0, padding: 0, backgroundColor: "#2C97EB" }}>
      <div style={{ ...formContainerStyle, backgroundColor: "#2C97EB" }}>
        <h1 style={{ alignItems: "center", color: "white", backgroundColor: "#2C97EB" }}>
          Add Student
        </h1>
      </div>
      <form
        style={{
          ...formContainerStyle,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        onSubmit={handleSubmit}
      >
         {successMessage && (
          <div style={{ color: "green", marginBottom: "10px" }}>{successMessage}</div>
        )}

        <div style={formGroupStyle}>
          <label style={labelStyle}>Surname</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.surname}
            onChange={(e) => handleInputChange("surname", e.target.value)}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Other Name(s)</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.otherName}
            onChange={(e) => handleInputChange("otherName", e.target.value)}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Date Of Birth</label>
          <input
            type="date"
            style={inputStyle}
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Gender</label>
          <input
            type="radio"
            name="gender"
            style={radioStyle}
            value="Male"
            checked={formData.gender === "Male"}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          />
          <label htmlFor="gender">Male</label>
          <input
            type="radio"
            name="gender"
            style={radioStyle}
            value="Female"
            checked={formData.gender === "Female"}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          />
          <label htmlFor="gender">Female</label>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Age</label>
          <input
            type="number"
            style={inputStyle}
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Mother's Name</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.mothersName}
            onChange={(e) => handleInputChange("mothersName", e.target.value)}
          />
          <label style={labelStyle2}>Tel</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.mothersTell}
            onChange={(e) => handleInputChange("mothersTell", e.target.value)}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Father's Name</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.fathersName}
            onChange={(e) => handleInputChange("fathersName", e.target.value)}
          />
          <label style={labelStyle2}>Tel</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.fathersTell}
            onChange={(e) => handleInputChange("fathersTell", e.target.value)}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Guardian Name</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.guardianName}
            onChange={(e) => handleInputChange("guardianName", e.target.value)}
          />
          <label style={labelStyle2}>Tel</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.guardianTell}
            onChange={(e) => handleInputChange("guardianTell", e.target.value)}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Relation To Child</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.relationshipToChild}
            onChange={(e) => handleInputChange("relationshipToChild", e.target.value)}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Residential Address</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.residentialAddress}
            onChange={(e) => handleInputChange("residentialAddress", e.target.value)}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Admission Fee</label>
          <div style={{ position: "relative" }}>
            <span style={cedisSymbolStyle}>&cent;</span>
            <input
              type="text"
              placeholder="0.00"
              style={inputStyle}
              value={formData.admissionFee}
              onChange={(e) => handleInputChange("admissionFee", e.target.value)}
            />
          </div>
        </div>
        <div style={formGroupStyle}>
          <label>Class Level to Admit Student Into</label>
          <select
            value={formData.classLevel}
            onChange={(e) => handleInputChange("classLevel", e.target.value)}
          >
            <option value="">Select Class Level</option>
            {classLevels.map((level) => (
              <option key={level.id} value={level.name}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
        <div style={formGroupStyle}>
          <label>Previous School Attended</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.previousSchoolAttended}
            onChange={(e) => handleInputChange("previousSchoolAttended", e.target.value)}
          />
        </div>
        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </body>
  );
};

export default StudentAdmission;
