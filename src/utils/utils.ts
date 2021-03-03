import { DynamoDB } from "aws-sdk";
import { Lambda } from 'aws-sdk';
import LambdaEvent from "../models/LambdaEvent";
const lambda = new Lambda();
/**
 * @param {Object} values array of all the values that needs to be converted into lowercase
 * @param {String} key the key you want to return from the object passed
 * @description Local lambda use Flask that is changing the headers to camel-case See https://github.com/aws/aws-sam-cli/issues/1860
 */
export const getParameter = (values: Object, key: string) => {
    if (!values || !key) return null;
    let result: string = values[key];
    if (!result) result = values[key.charAt(0).toUpperCase() + key.slice(1)];
    if (!result) result = values[key.toLowerCase()];
    return result;
};

/**
 *
 * @param {Object} obj check of the data passed is an object
 * @description Useful to check if an Object is empty
 * @return {Boolean} Return a boolean to check is the object is empty or not
 */
export const isEmptyObject = (obj: Object): Boolean => {
    if (!obj) return null;
    return Object.keys(obj).length === 0;
};

/**
 * @description Return a random color from the secondary color of the design
 */
export const getRandomColor = (): String => {
    const accentColors: Array<String> = [
        // Array of all the secondary colors for the FE
        "#867AD3",
        "#DB6EA2",
        "#86B0C1",
        "#E97272",
        "#79BB87",
        "#C4C66D",
        "#A873C1",
        "#FBA85C",
    ];
    // create a random number based on the number of index in the accentColors array
    const randomNumber: number = Math.floor(Math.random() * accentColors.length);
    return accentColors[randomNumber];
};

/**
 * @description If the environment is "local", then the code will use the local DB
 * @return Return a new DynamoDB DocumentClient with the URL depending upon the current environment
 */
export const getDynamoDBDocumentClient = () => {
    if (isLocalEnvironment()) {
        const dbURL = process.env.DYNAMO_DB_ENDPOINT || "http://localhost:8000";
        console.info("NOTE: Using local dynamoDB !!!", dbURL);
        return new DynamoDB.DocumentClient({ endpoint: dbURL});
    }
    return new DynamoDB.DocumentClient();
};

/**   
 * @description Return a bool to check if the current env is local or not
 * @return {Boolean} Return a boolean to check rather or not the current env is "local"
 */
export const isLocalEnvironment = (): Boolean => {
    return getEnvironment() === "local";
};

/**
 * @description Useful to get the environment of where the code is running
 * @return {String} Return the environment set in the env file or "local"
 */
export const getEnvironment = (): String => {
    return process.env.ENVIRONMENT || "local";
};

/**
 * @description Useful to get the folder name where media live on s3
 * @return {String} Return the folder name on s3
 */
export const getS3Key = (req): String => {
    let fName = Date.now() + '-' + req.fileName;
    return req.folder + "/" + req.userId + "/" + req.subFolder + "/" + fName;
};

/**
 * @description Verifies if input is a JSON (String) in order to be parsed with no errors
 * @return {Boolean} Returns verfiication state <TRUE | FALSE>
 */
export const isJSON = (str) => {
    if (typeof str !== 'string') {
        return false;
    }
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * @description Removes any Database Schemas or Indexes or any other sensitive data from the user
 * @return {Item} Returns new item without the sensible data
 */
export const updateUserKeys = function ($item) {
    try {
        let item = Object.assign({}, $item);
        delete item["SK"];
        delete item["PK"];
        delete item["GSI1PK"];
        delete item["GSI1SK"];
        delete item["GSI2PK"];
        delete item["GSI2SK"];
        delete item["GSI3PK"];
        delete item["GSI3SK"];
        delete item["GSI4PK"];
        delete item["GSI4SK"];
        delete item["GSI5PK"];
        delete item["GSI5SK"];
        //delete item["createdAt"];
        delete item["updatedAt"];
        return item;
    } catch (e) {
        throw e;
    }

}

/**
 * @description Removes any Database Schemas or Indexes or any other sensitive data in a list from the user
 * @return {Item} Returns new list without the sensible data
 */
export const mapUpdateUserKeys = function (items) {
    try {
        return items.map((item, index) => {
            delete item["SK"];
            delete item["PK"];
            delete item["GSI1PK"];
            delete item["GSI1SK"];
            delete item["GSI2SK"];
            delete item["GSI2PK"];
            delete item["GSI3SK"];
            delete item["GSI3PK"];
            delete item["GSI4SK"];
            delete item["GSI4PK"];
            delete item["GSI5SK"];
            delete item["GSI5PK"];
            //delete item["createdAt"];
            delete item["updatedAt"];
            return item;
        });
    } catch (e) {
        throw e;
    }

}
/**
 * @description Execute a Lambda Function based on the region of the aws-sdk configuration
 * @return {LambdaResponse} Returns a Lambda`s Response
 */
export const executeLambda = async (name: string, event: LambdaEvent) => {
    const response: any = (await lambda.invoke({ FunctionName: name, InvocationType: 'Event', Payload: JSON.stringify(event) }).promise()).Payload;
    return JSON.parse(response);

}
/**
 * @description Generates a non-deep update expression object for faster development
 * @return {Object} Returns a Promise
 */
export const generateGeneralUpdateExpression = (_data: { [key: string]: any }) => {
    const expression = {
        UpdateExpression: "SET ",
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {}
    }
    const keys = Object.keys(_data);
    let _KEY = null;
    let _VALUE = null;
    let _KEY_VALUE = null;

    keys.forEach((key, index) => {
        _KEY = `#${key}`.toUpperCase();
        _KEY_VALUE = `:${key}`.toUpperCase();
        _VALUE = _data[key];
        expression.ExpressionAttributeNames[_KEY] = key;
        expression.ExpressionAttributeValues[_KEY_VALUE] = _VALUE;
        if ((keys.length - 1) != index) {
            expression.UpdateExpression += `${_KEY}=${_KEY_VALUE}, `;
        } else {
            expression.UpdateExpression += `${_KEY}=${_KEY_VALUE} `;
        }

    });

    return expression;


}
/**
 * @description Parse Keys by ID and Timestamp
 * @return {Object} Returns a Lambda`s Response
 */
export function parseSchemaKeys(_id: string, _splitter: string = "-"): { PK: string; SK: string } {
    const key = _id.split(_splitter);
    let _SK = "";
    if (key.length <= 1) {
        return { PK: "NOT", SK: "FOUND" };
    }
    else {
        for (let index = 1; index < key.length; index++) {

            if (index == (key.length - 1)) {
                _SK += key[index];
            } else {
                _SK += `${key[index]}-`;
            }
        }
    }
    return {
        PK: key[0],
        SK: _SK
    }
}

