const knex = require('../configs/knexConfig');
const {tables} = require('../configs/tablesList');

const getResults = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            let result;
            !id ?
            result = await knex(tables.users).select() :
            result = await knex(tables.users).select().where('ID', id);            
            resolve(result);
        }catch (e){
            reject(e);
        }
    })
};

const createUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try{
            let result = await knex(tables.users).insert(user);
            if(result[0] > 0){                
                let resp = `Mail sent for Activation !! \n use this link for Activation:- http://localhost:3000/signup/search?user=${Buffer.from(user.EMAIL).toString('base64')}`;                
                resolve(resp);
            }else{
                resolve(result);
            }            
        }catch (e){
            reject(e);
        }
    })
};

const updateUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try{
            let result = await knex(tables.users).where('ID', user.ID).update(user);
            result == 1 ? resolve('`Password Has Been Changed !!`') : reject(result);
        }catch (e){
            reject(e);
        }
    })
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            let result = await knex(tables.users).where('ID', id).update({'USERSTATUS': 'DEACTIVATED'});          
            resolve(result);
        }catch (e){
            reject(e);
        }
    })
};

const getUserDetails = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        try{
            let result = {};
            if(userInfo.EMAIL == undefined){
                if(userInfo.USERNAME.indexOf('@') > -1){
                    result = result = await knex(tables.users)
                    .select('EMAIL', 'USERNAME', 'PASSWORD', 'USERSTATUS', 'ID')
                    .where({EMAIL: userInfo.USERNAME}); 
                }else{
                    result = result = await knex(tables.users)
                    .select('EMAIL', 'USERNAME', 'PASSWORD', 'USERSTATUS', 'ID')
                    .where({USERNAME: userInfo.USERNAME}); 
                }
            }else{
                result = result = await knex(tables.users)
                .select('EMAIL', 'USERNAME', 'PASSWORD', 'USERSTATUS', 'ID')
                .where({EMAIL: userInfo.EMAIL});
            }
            resolve(result);
        }catch (e){
            reject(e);
        }
    })
};

const changeUserStatus = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try{
            let result = await knex(tables.users).where({EMAIL: userEmail}).update({USERSTATUS: 'Active'});          
            resolve((result));
        }catch (e){
            reject(e);
        }
    })
};


module.exports = {getResults, createUser, updateUser, deleteUser, getUserDetails, changeUserStatus};