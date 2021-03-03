
export const MASTER_DEFINITION = {
    TableName: 'local-project-name',
    AttributeDefinitions: [
        {
            AttributeName: 'GSI1PK',
            AttributeType: 'S',
        },
        {
            AttributeName: 'GSI1SK',
            AttributeType: 'S',
        },
        {
            AttributeName: 'GSI2PK',
            AttributeType: 'S',
        },
        {
            AttributeName: 'GSI2SK',
            AttributeType: 'S',
        },
        {
            AttributeName: 'GSI3PK',
            AttributeType: 'S',
        },
        {
            AttributeName: 'GSI3SK',
            AttributeType: 'S',
        },
        {
            AttributeName: 'GSI4PK',
            AttributeType: 'S',
        },
        {
            AttributeName: 'GSI4SK',
            AttributeType: 'S',
        },
        {
            AttributeName: 'GSI5PK',
            AttributeType: 'S',
        },
        {
            AttributeName: 'GSI5SK',
            AttributeType: 'N',
        },
        {
            AttributeName: 'GSI6PK',
            AttributeType: 'S',
        },
        {
            AttributeName: 'GSI6SK',
            AttributeType: 'N',
        },
        {
            AttributeName: 'GSI7PK',
            AttributeType: 'S',
        },
        {
            AttributeName: 'GSI7SK',
            AttributeType: 'N',
        },
        {
            AttributeName: 'PK',
            AttributeType: 'S',
        },
        {
            AttributeName: 'SK',
            AttributeType: 'S',
        },
    ],
    KeySchema: [
        {
            AttributeName: 'PK',
            KeyType: 'HASH',
        },
        {
            AttributeName: 'SK',
            KeyType: 'RANGE',
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: 'GSI1',
            KeySchema: [
                {
                    AttributeName: 'GSI1PK',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'GSI1SK',
                    KeyType: 'RANGE',
                },
            ],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        },
        {
            IndexName: 'GSI2',
            KeySchema: [
                {
                    AttributeName: 'GSI2PK',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'GSI2SK',
                    KeyType: 'RANGE',
                },
            ],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        },
        {
            IndexName: 'GSI3',
            KeySchema: [
                {
                    AttributeName: 'GSI3PK',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'GSI3SK',
                    KeyType: 'RANGE',
                },
            ],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        },
        {
            IndexName: 'GSI4',
            KeySchema: [
                {
                    AttributeName: 'GSI4PK',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'GSI4SK',
                    KeyType: 'RANGE',
                },
            ],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        },
        {
            IndexName: 'GSI5',
            KeySchema: [
                {
                    AttributeName: 'GSI5PK',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'GSI5SK',
                    KeyType: 'RANGE',
                },
            ],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        },
        {
            IndexName: 'GSI6',
            KeySchema: [
                {
                    AttributeName: 'GSI6PK',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'GSI6SK',
                    KeyType: 'RANGE',
                },
            ],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        },
        {
            IndexName: 'GSI7',
            KeySchema: [
                {
                    AttributeName: 'GSI7PK',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'GSI7SK',
                    KeyType: 'RANGE',
                },
            ],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        },  
        {
            IndexName: 'GSI8',
            KeySchema: [
                {
                    AttributeName: 'GSI4PK',
                    KeyType: 'HASH',
                },
            ],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        },
    ],
};