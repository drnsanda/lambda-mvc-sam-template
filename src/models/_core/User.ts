import { getDynamoDBDocumentClient, generateGeneralUpdateExpression, parseSchemaKeys } from '../../utils/utils';
const docClient = getDynamoDBDocumentClient();
import { DBConfig } from '../../utils/database';

export default class {
    private PK: string = "USERS#?#";
    private SK: string;
    private about: string;
    private country: string;
    private coverPicture: string;
    private createdAt: number;
    private displayPicture: string;
    private DOB: string;
    private email: string;
    private GSI8PK: string;
    private GSI3PK: string;
    private GSI3SK: string;
    private language: string;
    private membership: string;
    private name: string;
    private numberOfSubscribers: number;
    private phoneNumber: string;
    private socialMediaLinks: {
        fb: string;
        instagram: string;
        linkedin: string;
        youtube: string;
        [key: string]: string;
    };
    private source: string;
    private status: string;
    private storageSpace: string;
    private stripeId: string;
    private type: string;
    private updatedAt: number;
    private updedAt: number;
    private userId: string;
    private username: string;
    private website: string;



    constructor(_default?: any) {
        this.PK = _default?.PK || 'USERS#?#';
        this.SK = _default?.SK || '';
        this.about = _default?.about || '';
        this.country = _default?.country || '';
        this.coverPicture = _default?.coverPicture || '';
        this.createdAt = _default?.createdAt || '';
        this.displayPicture = _default?.displayPicture || '';
    }

    getKey() {
        return {
            PK: this.PK,
            SK: this.SK
        }
    }

    getId() {
        return this.userId;
    }

    getData() {
        return {
            PK: this.PK,
            SK: this.SK,
            about: this.about,
            country: this.country,
            coverPicture: this.coverPicture,
            createdAt: this.createdAt,
            displayPicture: this.displayPicture,
            DOB: this.DOB,
            email: this.email,
            GSI8PK: this.GSI8PK,
            GSI3PK: this.GSI3PK,
            GSI3SK: this.GSI3SK,
            language: this.language,
            membership: this.membership,
            name: this.name,
            numberOfSubscribers: this.numberOfSubscribers,
            phoneNumber: this.phoneNumber,
            socialMedialLinks: this.socialMediaLinks,
            source: this.source,
            status: this.status,
            storageSpace: this.storageSpace,
            stripeId: this.stripeId,
            type: this.type,
            userId: this.userId,
            updatedAt: this.updatedAt,
            updedAt: this.updedAt,
            username: this.username,
            website: this.website
        }

    }

    getFilteredData() {
        return {
            about: this.about,
            country: this.country,
            coverPicture: this.coverPicture,
            createdAt: this.createdAt,
            displayPicture: this.displayPicture,
            DOB: this.DOB,
            email: this.email,
            language: this.language,
            membership: this.membership,
            name: this.name,
            numberOfSubscribers: this.numberOfSubscribers,
            phoneNumber: this.phoneNumber,
            socialMedialLinks: this.socialMediaLinks,
            source: this.source,
            status: this.status,
            storageSpace: this.storageSpace,
            stripeId: this.stripeId,
            type: this.type,
            updatedAt: this.updatedAt,
            updedAt: this.updedAt,
            username: this.username,
            website: this.website
        }
    }

    static async fetchFromServer(_id: string, _type: string) {
        const key = parseSchemaKeys(_id);
        return (await docClient.get({ Key: { PK: `USERS#${_type.toUpperCase()}#${key.PK}`, SK: `${key.SK}` }, TableName: DBConfig.tableName }).promise())?.Item || {};
    }

    static async fetchAllUsers(_type: string, _lastIndex?: string, _limit?: number) {
        const searchParams = {
            IndexName: "GSI3",
            TableName: DBConfig.tableName,
            KeyConditionExpression: "#GSI3PK=:GSI3PK and #GSI3SK=:GSI3SK",
            ExpressionAttributeNames: { "#GSI3PK": "GSI3PK", "#GSI3SK": "GSI3SK" },
            ExpressionAttributeValues: { ":GSI3PK": "USER", ":GSI3SK": `${_type}` }
        }

        if (_lastIndex) {
            searchParams["ExclusiveStartKey"] = _lastIndex;
        }
        if (_limit) {
            searchParams["Limit"] = _limit;
        }
        const result = await docClient.query(searchParams).promise();
        return {
            Items: result.Items,
            LastEvaluatedKey: result.LastEvaluatedKey
        }

    }

    static async updateInServer(_data: any, _id: string, _type: string) {
        const _item = await this.fetchFromServer(_id, _type);
        const key = parseSchemaKeys(_id);

        if (Object.keys(_item).length <= 0) {
            const _error: any = new Error(`User ${_id} was not found`);
            _error["exception"] = "ResourceNotFoundException";
            throw _error;
        }

        return (await docClient.update({ Key: { PK: `USERS#${_type.toUpperCase()}#${key.PK}`, SK: `${key.SK}` }, TableName: DBConfig.tableName, ...generateGeneralUpdateExpression({ ..._data, updatedAt: Date.now() }) }).promise());
    }

    static async deleteFromServer(_id: string, _type: string) {
        const key = parseSchemaKeys(_id);
        return (await docClient.delete({ Key: { PK: `USERS#${_type.toUpperCase()}#${key.PK}`, SK: `${key.SK}` }, TableName: DBConfig.tableName }).promise());

    }







}