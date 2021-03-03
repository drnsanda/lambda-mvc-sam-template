import * as _UTILS from '../../utils/utils';
import ServiceResponse from '../../models/ServiceResponse';
import ErrorResponse from '../../models/ErrorResponse';
import LambdaRequest from '../../models/LambdaRequest';
import User from '../../models/_core/User';



export default function (meta: LambdaRequest): Promise<ServiceResponse> {
    const response: ServiceResponse = new ServiceResponse();
    const error: ErrorResponse = new ErrorResponse();

    return new Promise(async ($resolve, $reject) => {
        try {
            const _Result = await User.fetchAllUsers(meta?.query?.type == 'user' ? "user" : "teacher");

            response.message = `Fetched all users of type -${meta?.query?.type}-`;
            response.response = _Result;
            response.statusCode = 200;

            $resolve(response);
        } catch (e) {
            error.code = "operation_failed";
            error.error = e?.message;
            error.message = '<Service> - Failed';
            error.statusCode = 401;
            $reject(error);
        }
    });
}