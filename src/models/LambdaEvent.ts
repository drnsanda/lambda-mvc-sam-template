

interface GeneralObject {
    [key: string]: string;
}
class LambdaEvent {
    resource: string;
    path: string;
    httpMethod: string;
    headers: {
        "Accept": string;
        "Accept-Encoding": string;
        "Authorization": string;
        "Cache-Control": string;
        "Host": string;
        "orgid": string;
        "Orgid": string;
        "Postman-Token": string;
        "User-Agent": string;
        "X-Amzn-Trace-Id": string;
        "X-Forwarded-For": string;
        "X-Forwarded-Port": number;
        "X-Forwarded-Proto": string;
        [key: string]: any;

    };
    "multiValueHeaders": {
        "Accept": Array<string>,
        "Accept-Encoding": Array<string>,
        "Authorization": Array<string>,
        "Cache-Control": Array<string>,
        "Host": Array<string>,
        "orgid": Array<string>,
        "Postman-Token": Array<string>,
        "User-Agent": Array<string>,
        "X-Amzn-Trace-Id": Array<string>,
        "X-Forwarded-For": Array<string>,
        "X-Forwarded-Port": Array<string>,
        "X-Forwarded-Proto": Array<string>,
        [key: string]: any
    };
    "queryStringParameters": any;
    "multiValueQueryStringParameters": Array<string>;
    "pathParameters": any;
    "stageVariables": Array<string>;
    "requestContext": {
        "resourceId": string,
        "authorizer": {
            "roleId": string,
            "principalId": string,
            "integrationLatency": number,
            "userId": string,
            "orgId": string,
            "firstName": string,
            "lastName": string,
            "claims" ?: {
                "at_hash": string,
                "sub": string,
                "cognito:groups": string,
                "email_verified": string | boolean,
                "iss": string,
                "cognito:username": string,
                "nonce": string,
                "picture": string,
                "aud": string,
                "identities": any,
                "token_use": string,
                "auth_time": string | number,
                "name": string,
                "exp": string,
                "iat": string,
                "email": string
            },
            [key: string]: any,

        },
        "resourcePath": string,
        "httpMethod": string,
        "extendedRequestId": string,
        "requestTime": string,
        "path": string,
        "accountId": string,
        "protocol": string,
        "stage": string,
        "domainPrefix": string,
        "requestTimeEpoch": number,
        "requestId": string,
        "identity": {
            "cognitoIdentityPoolId": string,
            "accountId": string,
            "cognitoIdentityId": string,
            "caller": string,
            "sourceIp": string,
            "principalOrgId": string,
            "accessKey": string,
            "cognitoAuthenticationType": string,
            "cognitoAuthenticationProvider": string,
            "userArn": string,
            "userAgent": string,
            "user": string,
            "sub"?: string,
            [key: string]: any
        },
        "domainName": string,
        "apiId": string
    };
    "body": any;
    "isBase64Encoded": false;
};

//E.g of usage
export default LambdaEvent;