
const passwordValidator = function (password) {
    var reg = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/);
    if (password.match(reg)) {
        return true;
    } else {
        return false;
    }
};

module.exports = {
    passwordValidator
};