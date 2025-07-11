const memberRepository = require("../repository/memberRepository");
const AppError = require("../utils/appError");
const handleMongooseError = require("../utils/handleMongooseError");

class MemberService{
    async createMember({username, memberName, email}){
        try{
            const memberData = {username, name:memberName, email};
            const member = await memberRepository.findMemberByUserName(username);
            if(member) throw new AppError('username already exist', 400);
            return await memberRepository.saveMember(memberData);
        }
        catch(error){
            if(error instanceof AppError){
                throw error;
            }
            throw handleMongooseError(error);
        }
    }

    async getAllMembers(){
        try{
            return await memberRepository.getAll();
        }
        catch(error){
            throw handleMongooseError(error);
        }
    }
}

module.exports = new MemberService();