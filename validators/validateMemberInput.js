const AppError = require('../utils/appError');

const validateMemberInput = ({username, memberName, email})=>{
    if(!username || !memberName) throw new AppError('username and memberName are required', 400);
    return {username, memberName, email};
}

module.exports = validateMemberInput;