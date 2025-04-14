const jwt = require('jsonwebtoken');
const {existUser} = require('../utils/utilFuns');
const { valuate } = require('../utils/validation');

const generateToken = async (user) => {
    let result = await existUser(user);
    if(!result.error){
        let token = jwt.sign({user}, process.env.SECRETKEY, {expiresIn: '1h'});
        return token;
    }else{
        return valuate(result);
    }
};

module.exports = { generateToken };