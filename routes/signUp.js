const express = require('express');
const router = express.Router();
const userOps = require('../dbOps/usersOps');
const {enCrypt} = require('../utils/base64');
const joi = require('joi');
const {valuate} = require('../utils/validation');
const userObj = joi.object({
    USERNAME: joi.string().min(6),
    PASSWORD: joi.string().min(6),
    EMAIL: joi.string().email().min(15)
})

router.post('/', async (req, res) => {    
    let validationValue = userObj.validate(req.body);
    if(validationValue.error){
        let resp = valuate(validationValue);
        res.status(200).send(resp);
    }else{
        try {
            req.body.PASSWORD = enCrypt(req.body.PASSWORD);    
            let result = await userOps.createUser(req.body);
            res.status(200).send(valuate(result));
        } catch (error) {
            let resp = valuate(error); 
            res.send(resp);
        }
    }
});

//http://localhost:3000/signup/search?user=userAA@gmail.com
router.put('/search', async(req, res) => {
    let userEmail = req.query.user;
    let er = {};
    if(userEmail){
        userEmail = Buffer.from(userEmail, 'base64').toString('ascii');
        try {
            let result = await userOps.changeUserStatus(userEmail);
            result == 1 ? result = 'Activation Success !!' : result = 'Activation Failed !!';
            res.send(valuate(result));
        } catch (err) {
            er.error = err;
            res.send(valuate(er));
        }
    }else{
        er.error = 'User Not Found !!';
        res.send(valuate(er));
    }
})
module.exports = router;