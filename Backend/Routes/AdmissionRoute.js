const express = require('express');
const router = express.Router();
const Admission = require('../Models/Admission'); 

router.post('/post', async (req, res) => {
    const { 
        fullname, 
        email, 
        fathername, 
        cnic, 
        phone, 
        dob, 
        domicile, 
        postalcode, 
        city, 
        guardianname, 
        guardianrelation, 
        postaladdress,
        ssc,  // SSC details
        hssc,  // HSSC details
        choices: [{  // Array of choice objects
            discipline,
            shift
        }]  // Order of Choice details
    } = req.body;

    try {
        // Check if the email or phone already exists in the database
        // 

        // Create a new admission with all the fields, including orderChoices
        const admission = new Admission({
            fullname,
            email,
            fathername,
            cnic,
            phone,
            dob,
            domicile,
            postalcode,
            city,
            guardianname,
            guardianrelation,
            postaladdress,
            ssc,  
            hssc,  
            choices: [{ 
                discipline,
                shift
            }] 
        });

        // Save the admission record to the database
        await admission.save();

        res.status(201).json({ message: 'Admission saved successfully!' });
    } catch (error) {
        console.error('Error in /post route:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
