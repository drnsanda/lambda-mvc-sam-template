import ErrorResponse from "../../models/ErrorResponse"
import LambdaEvent from "../../models/LambdaEvent"
import LambdaRequest from "../../models/LambdaRequest"
import LambdaResponse from "../../models/LambdaResponse"
import ServiceResponse from "../../models/ServiceResponse"

import controller from "./controller"
import service from "./service"

export const handler = async function (event: LambdaEvent, context: Object): Promise<LambdaResponse> {

    //Default response
    const response: LambdaResponse = {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Server Error - DEF" })
    }

    //Concept: Controller->Service->Response

    await controller(event, context).then(async (meta: LambdaRequest) => {
        const serviceResponse: ServiceResponse = await service(meta);

        response.statusCode = serviceResponse.statusCode;
        
        response.body = JSON.stringify({
            response: {
                event: serviceResponse.response,
                index: "passed",
                controller: "passed",
                service: "passed"
            }
        });

    }).catch((error: ErrorResponse) => {

        response.statusCode = error.statusCode;
        response.body = JSON.stringify(error);

    });

    return response;
}