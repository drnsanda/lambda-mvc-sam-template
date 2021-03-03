import { Validator } from 'jsonschema';
import ErrorResponse from '../models/ErrorResponse';
import LambdaRequest from '../models/LambdaRequest';
const _validate = require('jsonschema').validate;
const validator = new Validator();

/**
 * @description Validate that the body correspond to the event object description
 * @param {String} bodyData the raw body receive from the request. So a string normally
 */
export const customValidation = (bodyData: string, schema: Object) => {
    const parsedBody = JSON.parse(bodyData);
    return validator.validate(parsedBody, schema);
};


/**
 * @description Validate if the orgid is present in the header of the request
 * @param {Object} headerData Pass the full header and the function will do the rest
 */
export const headerValidation = (headerData: Object) => {

    /** Header Keys are all Cap so to have a better validation, we convert all keys to small cap */
    let newkey: string,
        capkeys = Object.keys(headerData);
    let n = capkeys.length;
    let newHeader = {};
    while (n--) {
        newkey = capkeys[n];
        newHeader[newkey.toLowerCase()] = headerData[newkey];
    }

    const schema = {
        id: '/Header',
        type: 'object',
        properties: {
            // orgid: { type: 'string' }, //The orgid is a UUIDV4 so a string
        },
        required: [],
        // You need to let that to true because the header have more info then the orgid
        additionalProperties: true,
    };
    return validator.validate(newHeader, schema);
};

/**
 * @description Validate the instance by schema and return an error to be catched and terminate the execution of the script returning directly a ValidationException as a Response
 * @param {Object} instance Pass the full header and the function will do the rest
 * @param {Array} schemas Pass the full header and the function will do the rest
 */
export const validate = (instance, schema) => {
    return _validate(instance, {
        $id: '/global-schema-id',
        $schema: '/global-schema',
        title: 'Global Validator',
        description: 'Global validator for incoming pair of instance and schema',
        type: 'object',
        ...schema,
    })
}

/**
 * @description Validate the instance by schema and return an error to be catched and terminate the execution of the script returning directly a ValidationException as a Response
 * @param {Object} request Pass the full header and the function will do the rest
 * @param {Array} schemas Pass the full header and the function will do the rest
 */

export const validateLambdaRequest = (request: LambdaRequest, required: Array<string>, schemas: Array<Object>): Promise<Boolean> => {
    return new Promise(($resolve, $reject) => {
        const error: ErrorResponse = new ErrorResponse();
        try {
            let properties = {};
            schemas.forEach((schema: any) => {
                properties = { ...properties, ...schema };
            });

            let validationErrors: Array<any>;
            validationErrors = validate(request, {
                type: 'object',
                properties,
                required: [...required]
            }).errors;

            if (validationErrors.length > 0) {
                throw new Error(validationErrors.toString());
            }
            $resolve(true);
        } catch (e) {
            error.code = "operation_failed";
            error.exception = "ValidationException";
            error.error = e.message;
            error.message = 'Please verify the documentation to provide the correct data for this endpoint.';
            error.statusCode = 405;

            $reject(error);
        }
    });

}