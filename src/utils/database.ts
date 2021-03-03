export const DBConfig = {
    tableName: process.env.TABLE_NAME,
    s3BucketName: "-",
    formEmailId: "-",
    cloudFront: {
        PRIVATE_KEY_PATH: "-",
        KEY_PAIR_ID: "-",
        DISTRIBUTION_URL: "-"
    },
    GSI: {
        index1: "GSI1",
        index2: "GSI2",
        index3: "GSI3",
        index4: "GSI4",
        index5: "GSI5",
        index6: "GSI6",
        index7: "GSI7",
        index8: "GSI8",
    },
    PREFIXES: {
        USER: 'USERS#USER#',
        TEACHER: "USERS#TEACHER#",
        LIBRARY: "LIBRARY#",
        PROGRAM: "PROGRAM#"
    },
    maxAllowedFileSize: 2147483648, // 2GB
    limit: 15
};
export const INDEXES = {
    GSI1: {
        'name': 'GSI1',
        'PK': 'GSI1PK',
        'SK': 'GSI1SK'
    },
    GSI2: {
        'name': 'GSI2',
        'PK': 'GSI2PK',
        'SK': 'GSI2SK'
    },
    GSI3: {
        'name': 'GSI3',
        'PK': 'GSI3PK',
        'SK': 'GSI3SK'
    },
    GSI4: {
        'name': 'GSI4',
        'PK': 'GSI4PK',
        'SK': 'GSI4SK'
    },
    GSI5: {
        'name': 'GSI5',
        'PK': 'GSI5PK',
        'SK': 'GSI5SK'
    },
    GSI6: {
        'name': 'GSI6',
        'PK': 'GSI6PK',
        'SK': 'GSI6SK'
    },

}