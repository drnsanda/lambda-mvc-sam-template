import * as AWS from 'aws-sdk';
import { getDynamoDBDocumentClient } from '../../utils/utils';

AWS.config.update({
    region: 'local',
});

const documentClient = getDynamoDBDocumentClient();

export const headers = {
    orgid: '123',
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const insertEvent = async () => {
    const params = {
        TableName: 'TABLE_NAME',
        Item: {

        },
    };
    return documentClient.put(params).promise();
};
