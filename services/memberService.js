const memberRepository = require("../repository/memberRepository");
const AppError = require("../utils/appError");
const handleMongooseError = require("../utils/handleMongooseError");
const logger = require('../utils/logger');

class MemberService{
    async createMember({username, memberName, email}){
        try{
            logger.info(`Creating member with username: ${username}`);
            const memberData = {username, name:memberName, email};
            const member = await memberRepository.findMemberByUserName(username);
            if(member) throw new AppError('username already exist', 400);
            const saved = await memberRepository.saveMember(memberData);
            logger.info(`Member created: ${username}`);
            return saved;
        }
        catch(error){
            logger.error(`createMember error: ${error.message}`);
            if(error instanceof AppError){
                throw error;
            }
            throw handleMongooseError(error);
        }
    }

    async getAllMembers(){
        try {
            logger.info('Fetching all members from DB');
            const members = await memberRepository.getAll();
            logger.info(`Fetched ${members.length} members`);
            return members;
        } 
        catch (error) {
            logger.error(`getAllMembers error: ${error.message}`);
            throw handleMongooseError(error);
        }
    }
}

module.exports = new MemberService();