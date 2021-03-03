import { isJSON } from "../utils/utils";
import LambdaEvent from "./LambdaEvent";

export default class {
    auth: { [key: string]: any };
    body: { [key: string]: any };
    params: { [key: string]: any };
    query: { [key: string]: any };
    headers: { [key: string]: any };

    constructor(event: LambdaEvent) {

        const name = `${event?.requestContext?.authorizer?.claims?.name}`.split(" ");
        const identities = isJSON(event?.requestContext?.authorizer?.claims?.identities) ? JSON.parse(event?.requestContext?.authorizer?.claims?.identities) : {};
        let uniqueUserId = "";
        if (identities?.dateCreated) {
            uniqueUserId = `${event?.requestContext?.authorizer?.claims?.["cognito:username"]}-${identities?.dateCreated}`;
        } else {
            uniqueUserId = "NOT-FOUND";
        }

        this.auth = {
            authUserId: uniqueUserId,
            userId: uniqueUserId,
            PK: `${event?.requestContext?.authorizer?.claims?.["cognito:username"]}`,
            SK: `${identities?.dateCreated}`,
            orgId: event?.requestContext?.authorizer?.orgId,
            roleId: event?.requestContext?.authorizer?.roleId,
            firstName: name[0],
            lastName: name[1],
        };
        console.log("User requesting lambda ::: ", JSON.stringify(this.auth));

        //Add here custom middleware handling

        this.body = (typeof event?.body === 'object' && event?.body != null) ? event?.body : (isJSON(event?.body) ? JSON.parse(event?.body) : {});

        this.params = (typeof event?.pathParameters === 'object' && event?.pathParameters != null) ? event?.pathParameters : (isJSON(event?.pathParameters) ? JSON.parse(event?.pathParameters) : {});

        this.query = (typeof event?.queryStringParameters === 'object' && event?.queryStringParameters != null) ? event?.queryStringParameters : (isJSON(event?.queryStringParameters) ? JSON.parse(event?.queryStringParameters) : {});

        this.headers = event?.headers;
        console.log("Debugging Information Temp :::  Body ::: ", JSON.stringify(this.body));
        console.log("Debugging Information Temp :::  Params ::: ", JSON.stringify(this.params));
        console.log("Debugging Information Temp :::  Query ::: ", JSON.stringify(this.query));
        console.log("Debugging Information Temp :::  Headers ::: ", JSON.stringify(this.headers));

        //Handle Cases of various keys :::
        //this.headers["orgid"] = event?.headers?.Orgid;
        //@Override <userId>
        //this.auth.userId = "google_109311911956057052098-1612560004097";
        //@Override <teacherId>
        //this.auth.userId = "google_107291513818589485375-1611607325524";

    }
}