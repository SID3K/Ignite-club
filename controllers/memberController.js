const CreateMemberDTO = require("../dtos/createMemberDTO");
const memberService = require("../services/memberService");
const validateMemberInput = require("../validators/validateMemberInput");

const createMember = async (req, res)=>{
    try{
        const memberDto = new CreateMemberDTO(req.body);
        const validatedDto = validateMemberInput(memberDto);

        const result = await memberService.createMember(validatedDto);
        res.status(201).json(result);
    }
    catch(error){
         res.status(error.statusCode || 500).json({ message: error.message || 'Something went wrong' });
    }
}

module.exports = { createMember };