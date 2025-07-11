const createClassDTO = require('../dtos/createClassDTO');
const validateClassInput = require('../validators/validateClassInput');
const classService = require('../services/classService');


const createClass = async (req, res)=>{
    try{
        const classDto = new createClassDTO(req.body);
        const validatedDto = validateClassInput(classDto);

        const result = await classService.createClass(validatedDto);
        res.status(201).json(result);
    }
    catch(error){
        console.log(error.message);
        res.status(error.statusCode || 500).json({ message: error.message || 'Something went wrong' });
    }
}

const getClasses = async(req, res)=>{
    try{
        const result = await classService.getAllClasses();
        res.status(200).json(result);
    }
    catch(error){
        res.status(error.statusCode || 500).json({ message: error.message || 'Something went wrong' });
    }
}

module.exports = { createClass, getClasses };