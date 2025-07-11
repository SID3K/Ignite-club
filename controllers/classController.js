const createClassDTO = require('../dtos/createClassDTO');
const validateClassInput = require('../validators/validateClassInput');
const classService = require('../services/classService');
const logger = require('../utils/logger');
const { logInfo, logError } = require('../utils/logHelper');


const createClass = async (req, res)=>{
    try{
        logInfo(req, 'Create class request received');
        const classDto = new createClassDTO(req.body);
        const validatedDto = validateClassInput(classDto);

        const result = await classService.createClass(validatedDto);
        logInfo(req, `Class "${validatedDto.className}" created successfully`);
        res.status(201).json(result);
    }
    catch(error){
        logError(req, error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Something went wrong' });
    }
}

const getClasses = async(req, res)=>{
    try{
        logInfo(req, 'Fetch all classes request received');
        const result = await classService.getAllClasses();
        logger.info(`Fetched ${result.length} classes`);
        res.status(200).json(result);
    }
    catch(error){
        logError(req, error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Something went wrong' });
    }
}

module.exports = { createClass, getClasses };