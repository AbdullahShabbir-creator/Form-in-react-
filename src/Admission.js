import React, { useState, useRef } from 'react';
import './Admission.css';

function Admission() {
  const [submittedData, setSubmittedData] = useState(null);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    fathername: '',
    cnic: '',
    phone: '',
    dob: '',
    domicile: '',
    postalcode: '',
    city: '',
    guardianname: '',
    guardianrelation: '',
    postaladdress: '',
    ssc: {
      group: '',
      rollNo: '',
      board: '',
      totalMarks: '',
      obtainedMarks: '',
    },
    hssc: {
      group: '',
      rollNo: '',
      board: '',
      totalMarks: '',
      obtainedMarks: '',
    },
    choices: [
      { order: 1, discipline: '', shift: '' },
      { order: 2, discipline: '', shift: '' },
      { order: 3, discipline: '', shift: '' },
    ],
  });
  const formRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      alert(result.message);

      setSubmittedData(formData);
      setFormData({
        fullname: '',
        email: '',
        fathername: '',
        cnic: '',
        phone: '',
        dob: '',
        domicile: '',
        postalcode: '',
        city: '',
        guardianname: '',
        guardianrelation: '',
        postaladdress: '',
        ssc: {
          group: '',
          rollNo: '',
          board: '',
          totalMarks: '',
          obtainedMarks: '',
        },
        hssc: {
          group: '',
          rollNo: '',
          board: '',
          totalMarks: '',
          obtainedMarks: '',
        },
        choices: [
          { order: 1, discipline: '', shift: '' },
          { order: 2, discipline: '', shift: '' },
          { order: 3, discipline: '', shift: '' },
        ],
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');
 
    if (nameParts.length === 1) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (nameParts.length === 2) {
      const category = nameParts[0];
      const field = nameParts[1];
      setFormData({
        ...formData,
        [category]: {
          ...formData[category],
          [field]: value,
          
        },
      });
    } else if (nameParts.length === 3) {
      const index = parseInt(nameParts[1], 10);
      const field = nameParts[2];
      const updatedChoices = [...formData.choices];
      updatedChoices[index] = {
        ...updatedChoices[index],
        [field]: value,
      };

      setFormData({
        ...formData,
        choices: updatedChoices,
      });
    }
  };

  const handlePrint = () => {
    const printContent = formRef.current; // Access the form using ref
    if (printContent) {
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow.document.write('<html><head><title>Submitted Data</title>');
      
      // Add minimal styling to remove any styling, like background, margins, and borders
      printWindow.document.write(`
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          input, label { border: none; background: none; font-size: 14px; }
          .form-row { margin-bottom: 10px; }
        </style>
      `);
      
      printWindow.document.write('</head><body>');
      printWindow.document.write(printContent.innerHTML); // Write the form content to the print window
      printWindow.document.write('</body></html>');
      
      printWindow.document.close();
      printWindow.print(); // Trigger print
    } else {
      console.error("Form not found!");
    }
  };
  
  return (
    <div className="form-container">
      <h1 className="tiltle">Admission Form</h1>
      <form onSubmit={handleSubmit} className="admission-form">
        <div className="form-row">
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter Full Name"
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
        </div>

        <div className="form-row">
          <label htmlFor="fathername">Father's Name:</label>
          <input
            type="text"
            name="fathername"
            value={formData.fathername}
            onChange={handleChange}
            placeholder="Enter Father's Name"
          />
        </div>

        <div className="form-row">
          <label htmlFor="cnic">CNIC:</label>
          <input
            type="text"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            placeholder="Enter CNIC"
          />
        </div>

        <div className="form-row">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
          />
        </div>

        <div className="form-row">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="domicile">Domicile:</label>
          <input
            list="domicileOptions"
            name="domicile"
            value={formData.domicile}
            onChange={handleChange}
            placeholder="Select or Type Domicile"
          />
          <datalist id="domicileOptions">
            <option value="Punjab" />
            <option value="Sindh" />
            <option value="Balochistan" />
            <option value="Islamabad" />
          </datalist>
        </div>



        <div className="form-row">
          <label htmlFor="postalcode">Postal Code:</label>
          <input
            type="text"
            name="postalcode"
            value={formData.postalcode}
            onChange={handleChange}
            placeholder="Enter Postal Code"
          />
        </div>

        <div className="form-row">
          <label htmlFor="city">City:</label>
          <input
            list="cityOptions"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Select or Type City"
          />
          <datalist id="cityOptions">
            <option value="Rawalpindi" />
            <option value="Islamabad" />
            <option value="Kahuta" />
            <option value="Faisalabad" />
            <option value="Lahore" />
            <option value="Karachi" />
          </datalist>
        </div>
        <div className="form-row">
          <label htmlFor="guardianname">Guardian's Name:</label>
          <input
            type="text"
            name="guardianname"
            value={formData.guardianname}
            onChange={handleChange}
            placeholder="Enter Guardian's Name"
          />
        </div>
        <div className="form-row">
          <label htmlFor="guardianrelation">Guardian's Relation:</label>
          <input
            type="text"
            name="guardianrelation"
            value={formData.guardianrelation}
            onChange={handleChange}
            placeholder="Enter Guardian's Relation"
          />
        </div>
        <div className="form-row">
          <label htmlFor="postaladdress">Postal Address:</label>
          <textarea
            name="postaladdress"
            value={formData.postaladdress}
            onChange={handleChange}
            placeholder="Enter Postal Address"
          />
        </div>
        <h2>Educational Details</h2>
        <table className="qualification-table">
          <thead>
            <tr>
              <th>Exam Passed</th>
              <th>Qualification</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SSC</td>
              <td>
                <input
                  list="groupOptions"
                  name="ssc.group"
                  value={formData.ssc.group}
                  onChange={handleChange}
                  placeholder="Group (e.g., Science, Arts)"
                />
                <datalist id="groupOptions">
                  <option value="Science" />
                  <option value="Arts" />
                  <option value="Commerce" />
                  <option value="General Studies" />
                  <option value="Technical" />
                </datalist>
                <input
                  type="text"
                  name="ssc.rollNo"
                  value={formData.ssc.rollNo}
                  onChange={handleChange}
                  placeholder="Roll No."
                />
                <input
                  list="boardOptions"
                  name="ssc.board"
                  value={formData.ssc.board}
                  onChange={handleChange}
                  placeholder="Board (e.g., Rawalpindi, Faisalabad)"
                />
                <datalist id="boardOptions">
                  <option value="Rawalpindi Board" />
                  <option value="Faisalabad Board" />
                  <option value="Federal Board" />
                  <option value="Lahore Board" />
                  <option value="Karachi Board" />
                  <option value="Multan Board" />
                </datalist>
              </td>

              <td>
                <input
                  type="number"
                  name="ssc.totalMarks"
                  value={formData.ssc.totalMarks}
                  onChange={handleChange}
                  placeholder="Total Marks"
                />
                <input
                  type="number"
                  name="ssc.obtainedMarks"
                  value={formData.ssc.obtainedMarks}
                  onChange={handleChange}
                  placeholder="Obtained Marks"
                />
              </td>
            </tr>
            <tr>
              <td>HSSC</td>
              <td>
                <input
                  list="hsscGroupOptions"
                  name="hssc.group"
                  value={formData.hssc.group}
                  onChange={handleChange}
                  placeholder="Group (e.g., FSC, ICS, ARTS, COMMERCE)"
                />
                <datalist id="hsscGroupOptions">
                  <option value="FSC" />
                  <option value="ICS" />
                  <option value="ARTS" />
                  <option value="COMMERCE" />
                  <option value="Pre-Medical" />
                  <option value="Pre-Engineering" />
                </datalist>

                {/* Roll Number Input */}
                <input
                  type="text"
                  name="hssc.rollNo"
                  value={formData.hssc.rollNo}
                  onChange={handleChange}
                  placeholder="Roll No."
                />

                {/* Board Input */}
                <input
                  list="hsscBoardOptions"
                  name="hssc.board"
                  value={formData.hssc.board}
                  onChange={handleChange}
                  placeholder="Board (e.g., Rawalpindi, Faisalabad)"
                />
                <datalist id="hsscBoardOptions">
                  <option value="Rawalpindi Board" />
                  <option value="Faisalabad Board" />
                  <option value="Federal Board" />
                  <option value="Lahore Board" />
                  <option value="Karachi Board" />
                  <option value="Multan Board" />
                </datalist>
              </td>
              <td>
                <input
                  type="number"
                  name="hssc.totalMarks"
                  value={formData.hssc.totalMarks}
                  onChange={handleChange}
                  placeholder="Total Marks"
                />
                <input
                  type="number"
                  name="hssc.obtainedMarks"
                  value={formData.hssc.obtainedMarks}
                  onChange={handleChange}
                  placeholder="Obtained Marks"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <h2>Order of Choice</h2>
        <p>Write discipline name and other related information in order of your choice.</p>
        <p style={{ color: 'red' }}>
          Order of discipline once selected should not change.
        </p>

        <table>
          <thead>
            <tr>
              <th>Order of Choice</th>
              <th>Discipline</th>
              <th>Shift (Morning/Evening)</th>
            </tr>
          </thead>
          <tbody>
            {formData.choices.map((choice, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <select
                    className="choic"
                    name={`choices.${index}.discipline`} 
                    value={choice.discipline || ''}      
                    onChange={handleChange}
                  >
                    <option value="">Select Discipline</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Commerce">Commerce</option>
                    <option value="BBA">BBA</option>
                    <option value="English">English</option>
                    <option value="Math">Math</option>
                    <option value="Physics">Physics</option>
                    <option value="Economics">Economics</option>
                    <option value="AI">AI</option>
                  </select>
                </td>
                <td>
                  <select
                    className="choic"
                    name={`choices.${index}.shift`}      
                    value={choice.shift || ''}           
                    onChange={handleChange}
                  >
                    <option value="">Select Shift</option>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                  </select>
                </td>
              </tr>


            ))}
          </tbody>
        </table>
        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
      {submittedData && (
        <>
        {/* <div className="submitted-data">
          <h2>Submitted Data</h2>
          <form ref={formRef} className="admission-form read-only-form">
            <div className="form-row">
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                name="fullname"
                value={submittedData.fullname}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={submittedData.email}
                readOnly
              /> */}
            </div>
            <div className="form-row">
              <label htmlFor="fathername">Father's Name:</label>
              <input
                type="text"
                name="fathername"
                value={submittedData.fathername}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="cnic">CNIC:</label>
              <input
                type="text"
                name="cnic"
                value={submittedData.cnic}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                name="phone"
                value={submittedData.phone}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="text"
                name="dob"
                value={submittedData.dob}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="domicile">Domicile:</label>
              <input
                type="text"
                name="domicile"
                value={submittedData.domicile}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="postalcode">Postal Code:</label>
              <input
                type="text"
                name="postalcode"
                value={submittedData.postalcode}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                name="city"
                value={submittedData.city}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="guardianname">Guardian Name:</label>
              <input
                type="text"
                name="guardianname"
                value={submittedData.guardianname}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="guardianrelation">Guardian Relation:</label>
              <input
                type="text"
                name="guardianrelation"
                value={submittedData.guardianrelation}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="postaladdress">Postal Address:</label>
              <input
                type="text"
                name="postaladdress"
                value={submittedData.postaladdress}
                readOnly
              />
            </div>
            <h3>SSC Details</h3>
            <div className="form-row">
              <label htmlFor="ssc.group">Group:</label>
              <input
                type="text"
                name="ssc.group"
                value={submittedData.ssc.group}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="ssc.rollNo">Roll No:</label>
              <input
                type="text"
                name="ssc.rollNo"
                value={submittedData.ssc.rollNo}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="ssc.board">Board:</label>
              <input
                type="text"
                name="ssc.board"
                value={submittedData.ssc.board}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="ssc.totalMarks">Total Marks:</label>
              <input
                type="text"
                name="ssc.totalMarks"
                value={submittedData.ssc.totalMarks}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="ssc.obtainedMarks">Obtained Marks:</label>
              <input
                type="text"
                name="ssc.obtainedMarks"
                value={submittedData.ssc.obtainedMarks}
                readOnly
              />
            </div>
            <h3>HSSC Details</h3>
            <div className="form-row">
              <label htmlFor="hssc.group">Group:</label>
              <input
                type="text"
                name="hssc.group"
                value={submittedData.hssc.group}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="hssc.rollNo">Roll No:</label>
              <input
                type="text"
                name="hssc.rollNo"
                value={submittedData.hssc.rollNo}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="hssc.board">Board:</label>
              <input
                type="text"
                name="hssc.board"
                value={submittedData.hssc.board}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="hssc.totalMarks">Total Marks:</label>
              <input
                type="text"
                name="hssc.totalMarks"
                value={submittedData.hssc.totalMarks}
                readOnly
              />
            </div>
            <div className="form-row">
              <label htmlFor="hssc.obtainedMarks">Obtained Marks:</label>
              <input
                type="text"
                name="hssc.obtainedMarks"
                value={submittedData.hssc.obtainedMarks}
                readOnly
              />
            </div>
            <h3>Program Choices</h3>
            {submittedData.choices.map((choice, index) => (
              <div key={index} className="form-row">
                <label>{`Choice ${choice.order}:`}</label>
                <input
                  type="text"
                  name={`choices.${index}.discipline`}
                  value={choice.discipline}
                  readOnly
                />
                <label>Shift:</label>
                <input
                  type="text"
                  name={`choices.${index}.shift`}
                  value={choice.shift}
                  readOnly
                />
              
              </div>
            ))}
          </form>
        </div>
     
         <button type="button" onClick={handlePrint} className="print-btn">
         Print
       </button>
       </>
      )}
     
    </div>
  );
}

export default Admission;
