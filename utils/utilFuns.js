const dbOps = require("../dbOps/usersOps");
const base64 = require("../utils/base64");

const existUser = (user) => {
  return new Promise(async (resolve, reject) => {
    // let userObj = userList.find((a) => a.EMAIL == user || a.USERNAME == user);
    try {
      let er = {};
      let userObj = await dbOps.getUserDetails(user);
      if (userObj.length > 0) {
        let userObjPw = base64.deCrypt(userObj[0].PASSWORD);
        if(user.PASSWORD == userObjPw){
          if(userObj[0].USERSTATUS == 'Active'){
            resolve(true);
          }else{
            er.error = 'Activation Pending !!';
            reject(er);
          }
        }else{
          er.error = 'Password Not Matched !!';
          reject(er);
        } 
      } else {
        er.error = 'User Not Found !!';
        resolve(er);
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { existUser };

// const existUser = (user) => {
//     return new Promise(async(resolve, reject) => {
//         try{

//         }catch (err){

//         }
//     })
// }
