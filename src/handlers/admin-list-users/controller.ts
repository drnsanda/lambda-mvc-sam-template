import ErrorResponse from '../../models/ErrorResponse';
import LambdaEvent from '../../models/LambdaEvent';
import LambdaRequest from '../../models/LambdaRequest';
import { AuthSchema, BodySchema, HeadersSchema, ParamsSchema, QuerySchema } from '../../schemas';
import * as _UTILS from '../../utils/utils';
import { validateLambdaRequest } from '../../utils/validation';
import * as MockEvent from './event.json';

export default function (event: LambdaEvent, context: Object) {
    const error: ErrorResponse = new ErrorResponse();
    return new Promise(async ($resolve, $reject) => {
        const meta = {};
        let _event: LambdaEvent;
        _event = { ...event };

        //Can remove the condition below if you don't want to make manual local test
        if (process.env.ENVIRONMENT === 'local') {
            _event["requestContext"] = { ...event.requestContext, ...MockEvent.requestContext };
        }

        try {
            //Setup data
            const request: LambdaRequest = new LambdaRequest(_event);
            const _AuthSchema = new AuthSchema();
            const _BodySchema = new BodySchema();
            const _ParamsSchema = new ParamsSchema();
            const _QuerySchema = new QuerySchema();
            const _HeadersSchema = new HeadersSchema();

            _QuerySchema.schema.query.properties["type"] = { type: "string", enum: ["user", "teacher"] };
            _QuerySchema.schema.query.required.push("type");


            await validateLambdaRequest(request, ["query"], [_AuthSchema.getSchema(), _BodySchema.getSchema(), _HeadersSchema.getSchema(), _ParamsSchema.getSchema(), _QuerySchema.getSchema()]).catch((e: ErrorResponse) => $reject(e));

            $resolve(request);

        } catch (e) {
            error.code = "operation_failed";
            error.exception = "FailedOperationException";
            error.error = e?.message;
            error.message = '<Controller> Failed to execute. Check error to verify reason, or access CloudWatch for more information, if not clear or because of empty data.';
            error.statusCode = 401;

            $reject(error);

        }

    });
}