const express = require('express');
const router = express.Router();
const {valuate} = require('../utils/validation');
const {getUserDetails, updateUser} = require('../dbOps/usersOps');
const joi = require('joi');
const emailObj = joi.object({
    EMAIL: joi.string().email().required()
});
const newpw = joi.object({
    EMAIL: joi.string().email().required(),
    PASSWORD: joi.string(),
    NEWPW: joi.string()
});

router.post('/', async(req, res) => {
    // let user = {};
    let user = req.body;
    let resp = emailObj.validate(user);
    if(resp.error){
        res.send(valuate(resp));
    }else{
        let userObj = await getUserDetails(user);
        res.send(`Temp password is '${userObj[0].PASSWORD}'`);
    }
});

router.post('/newpw', async(req, res) => {
    let user = req.body;
    let resp = newpw.validate(user);
    if(resp.error){
        res.send(valuate(resp));
    }else{
        let userObj = await getUserDetails(user);
        let pw = userObj[0].PASSWORD;
        if(pw == user.PASSWORD){
            let npw = Buffer.from(user.NEWPW).toString('base64');
            userObj[0].PASSWORD = npw;
            let status = await updateUser(userObj[0]);
            res.send(valuate(status));
        }else{
            let status = 'Password not Matched !!';
            res.send(valuate(status));
        }

    }
});

module.exports = router;