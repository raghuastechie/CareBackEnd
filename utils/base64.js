const enCrypt = (pw) => {
    return Buffer.from(pw).toString('base64');
}

const deCrypt = (pw) => {
    return Buffer.from(pw, 'base64').toString('ascii');
}

module.exports = {enCrypt, deCrypt};