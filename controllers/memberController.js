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
        res.status(201).json({ success: true, data: result });
    }
    catch(error){
        logError(req, error);
        res.status(error.statusCode || 500).json({
          success: false,
          message: error.message || 'Something went wrong'
        });
    }
}

const getMember = async(req, res)=>{
    try{
        logInfo(req, 'Fetch all members request received');
        const result = await memberService.getAllMembers();
        logInfo(req, `Fetched ${result.length} members`);
        res.status(200).json({ success: true, data: result });
    }
    catch(error){
        logError(req, error);
        res.status(error.statusCode || 500).json({
          success: false,
          message: error.message || 'Something went wrong'
        });
    }
}

module.exports = { createMember, getMember };