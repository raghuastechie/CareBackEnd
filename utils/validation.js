const valuate = (result) => {
    let validateResp = {msg: '', error: true};
    if(result.error || result.errno){        
        if(result.errno){
            validateResp.msg = result.sqlMessage;
        }else if(result.error.details){
            validateResp.msg = result.error.details[0].message;
        }else{
            validateResp.msg = result.error;
        }
    }else{
        validateResp.msg = result;
        validateResp.error = false;
    }
    return validateResp;
}

module.exports = {valuate}