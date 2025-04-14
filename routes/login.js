const express = require('express');
const router = express.Router();
const userOps = require('../dbOps/usersOps');
const {valuate} = require('../utils/validation');
const { generateToken } = require('../jwt/jwtSecurity')
const joi = require('joi');
const userObj = joi.object({
    USERNAME: joi.string().required(),
    PASSWORD: joi.string().required()
});

router.post('/', async (req, res) => {
    let validationValue = userObj.validate(req.body);
    if(validationValue.error){
        let resp = valuate(validationValue);
        res.send(resp);
    }else{
        try {
            let result = await generateToken(req.body);
            res.send(result);
        } catch (error) {
            res.send(error);
        }
    }
});

module.exports = router;