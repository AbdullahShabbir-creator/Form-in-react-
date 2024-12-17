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
        ssc,  
        hssc,  
        choices: [{  
            discipline,
            shift
        }]  
    } = req.body;

    try {
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
        await admission.save();

        res.status(201).json({ message: 'Admission saved successfully!' });
    } catch (error) {
        console.error('Error in /post route:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
