import * as _UTILS from '../../utils/utils';
import ServiceResponse from '../../models/ServiceResponse';
import ErrorResponse from '../../models/ErrorResponse';
import LambdaRequest from '../../models/LambdaRequest';

import * as uuid from 'uuid';
const v4 = uuid.v4;
const AWS = require("aws-sdk");
let s3 = new AWS.S3();


export default function (meta: LambdaRequest): Promise<ServiceResponse> {
    const response: ServiceResponse = new ServiceResponse();
    const error: ErrorResponse = new ErrorResponse();

    return new Promise(async ($resolve, $reject) => {
        try {
            response.response = meta;
            $resolve(response);
        } catch (e) {
            error.code = "operation_failed";
            error.error = e?.message;
            error.message = '<Service> - Failed';
            error.statusCode = 401;
            $reject(error);
        }
        //Replace code with desired approach, $resolve<ServiceResponse> or $reject<ErrorResponse>
    });
}