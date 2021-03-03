import * as AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB({
    endpoint: 'http://localhost:8000',
    region: 'local',
});

const params = {
    TableName: 'local-Master',
};

export const deleteTables = async () => {
    try {
        await dynamoDB.deleteTable(params).promise();
        console.log('Table deleted');
        return Promise.resolve();
    } catch (error) {
        console.log('Table deletion failed', error);
        return Promise.reject(error);
    }
};
