const CreateMemberDTO = require("../dtos/createMemberDTO");
const memberService = require("../services/memberService");
const { logError, logInfo } = require("../utils/logHelper");
const validateMemberInput = require("../validators/validateMemberInput");

const createMember = async (req, res)=>{
    try{
        logInfo(req, 'Create member request received');
        const memberDto = new CreateMemberDTO(req.body);
        const validatedDto = validateMemberInput(memberDto);

        const result = await memberService.createMember(validatedDto);
        logInfo(req, `Member "${validatedDto.memberName}" created successfully`);
        res.status(201).json(result);
    }
    catch(error){
        logError(req, error);
         res.status(error.statusCode || 500).json({ message: error.message || 'Something went wrong' });
    }
}

module.exports = { createMember };