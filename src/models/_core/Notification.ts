import * as uuid from 'uuid';
const v4 = uuid.v4;
import { getDynamoDBDocumentClient, generateGeneralUpdateExpression } from '../../utils/utils';
const docClient = getDynamoDBDocumentClient();
import { DBConfig } from '../../utils/database';

export default class {
    private id: string;
    private actionData: any;
    private createdAt: number;
    private updatedAt: number;
    private destinationId: string;
    private destinationType: string;
    private enableSound: boolean;
    private expiryDate: number;
    private hasBeenSeen: boolean;
    private icon: string;
    private message: string;
    private originId: string;
    private originType: string;
    private priority: number;
    private PK: string;
    private seenAt: number;
    private SK: string = "NOTIFICATION#";
    private status: string;
    private title: string;
    private type: string;

    constructor(_default?: any, _expirationTime: number = (5 * 60 * 1000), _userId?: string) {
        const _id = v4();
        const _currentTime = Date.now();
        const _expiryDate = Number(_currentTime) + Number(_expirationTime);
        this.actionData = _default?.actionData || {};
        this.createdAt = _default?.createdAt || _currentTime;
        this.updatedAt = _default?.updatedAt || '';
        this.destinationId = _default?.destinationId || '';
        this.destinationType = _default?.destinationType || 'DIRECT';//['DIRECT','GROUP']
        this.enableSound = _default?.enableSound || true;
        this.expiryDate = _default?.expiryDate || _expiryDate;
        this.hasBeenSeen = _default?.hasBeenSeen || false;
        this.icon = _default?.icon || '';
        this.message = _default?.message || '';
        this.originId = _default?.originId || _userId || '';
        this.originType = _default?.originType || '';
        this.priority = _default?.priority || 1;
        this.PK = _default?.PK || `USER#${_default?.destinationId}`;
        this.SK = _default?.SK || `NOTIFICATION#${_id}`;
        this.id = _default?.id || _id;
        this.title = _default?.title || '';
        this.type = _default?.type || 'ALERT';
    }

    getKey() {
        return {
            PK: this.PK,
            SK: this.SK
        }
    }

    getId() {
        return this.id;
    }

    getNotificationData() {
        return {
            id: this.id,
            actionData: this.actionData,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            destinationId: this.destinationId,
            destinationType: this.destinationType,
            enableSound: this.enableSound,
            expiryDate: this.expiryDate,
            hasBeenSeen: this.hasBeenSeen,
            icon: this.icon,
            message: this.message,
            originId: this.originId,
            originType: this.originType,
            priority: this.priority,
            PK: this.PK,
            seenAt: this.seenAt,
            SK: this.SK,
            status: this.status,
            title: this.title,
            type: this.type
        }

    }

    getFilteredNotificationData() {
        return {
            id: this.id,
            actionData: this.actionData,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            destinationId: this.destinationId,
            destinationType: this.destinationType,
            enableSound: this.enableSound,
            expiryDate: this.expiryDate,
            hasBeenSeen: this.hasBeenSeen,
            icon: this.icon,
            message: this.message,
            originId: this.originId,
            originType: this.originType,
            priority: this.priority,
            seenAt: this.seenAt,
            status: this.status,
            title: this.title,
            type: this.type
        }
    }

    static async fetchFromServer(_notificationId: string, _userId: string) {
        return (await docClient.get({ Key: { PK: `USER#${_userId}`, SK: `NOTIFICATION#${_notificationId}` }, TableName: DBConfig.tableName }).promise()).Item || {};
    }

    static async updateInServer(_data: any, _notificationId: string, _userId: string,) {
        const _item = await this.fetchFromServer(_notificationId, _userId);

        if (Object.keys(_item).length <= 0) {
            const _error: any = new Error(`Notification ${_notificationId} was not found for user ${_userId}`);
            _error["exception"] = "ResourceNotFoundException";
            throw _error;
        }

        return (await docClient.update({ Key: { PK: `USER#${_userId}`, SK: `NOTIFICATION#${_notificationId}` }, TableName: DBConfig.tableName, ...generateGeneralUpdateExpression({ ..._data, updatedAt: Date.now() }) }).promise());
    }

    static async markAsSeen(_notificationId: string, _userId: string) {
        const currentTime = Date.now();
        return (await docClient.update({ Key: { PK: `USER#${_userId}`, SK: `NOTIFICATION#${_notificationId}` }, TableName: DBConfig.tableName, ...generateGeneralUpdateExpression({ "hasBeenSeen": true, seenAt: currentTime, updatedAt: currentTime }) }).promise());
    }

    static async deleteFromServer(_notificationId: string, _userId: string) {

        return (await docClient.delete({ Key: { PK: `USER#${_userId}`, SK: `NOTIFICATION#${_notificationId}` }, TableName: DBConfig.tableName }).promise());
    }

    static async fetchAllFromServer(_userId) {
        return (await docClient.query({
            TableName: DBConfig.tableName,
            KeyConditionExpression: `#PK=:USERID and begins_with(#SK,:PREFIX)`,
            ExpressionAttributeNames: { "#PK": "PK", "#SK": "SK" },
            ExpressionAttributeValues: { ":USERID": `USER#${_userId}`, ":PREFIX": "NOTIFICATION#" }
        }).promise()).Items || [];
    }

    static async deleteAllFromServer(_userId) {
        const notifications = (await docClient.query({
            TableName: DBConfig.tableName,
            KeyConditionExpression: `#PK=:USERID and begins_with(#SK,:PREFIX)`,
            ExpressionAttributeNames: { "#PK": "PK", "#SK": "SK" },
            ExpressionAttributeValues: { ":USERID": `USER#${_userId}`, ":PREFIX": "NOTIFICATION#" }
        }).promise()).Items || [];

        let _notification = null;
        const _errors = [];

        for (let index = 0; index < notifications.length; index++) {
            _notification = notifications[index];
            await docClient.delete({ TableName: DBConfig.tableName, Key: { PK: _notification?.PK, SK: _notification?.SK } }).promise().catch((e) => {
                _errors.push({ code: e?.code, message: e?.message });
            });

        }

        if (_errors.length > 0) {
            throw _errors;
        } else {
            return {};
        }
    }

    async sendNotification() {

        switch (this.type) {
            case 'FRIEND_REQUEST': {
                this.title = `New Request`;
                this.message = `${this.actionData?.requester_name} wants to be your friend.`;
            }
                break;
            case 'FRIEND_REQUEST_ACCEPTED': {
                this.title = `New Friend!`;
                this.message = `${this.actionData?.accepter_name}, has accepted your friend request.`;
            }
            break;
            case 'NEW_FOLLOWER': {
                this.title = `New Friend!`;
                this.message = `${this.actionData?.follower_name}, has started following you.`;
            }
                break;
            case 'PROGRAM_INVITE': {
                this.title = `New Program Invitation`;
                this.message = `${this.actionData?.requester_name} wants you to join program '${this.actionData?.program_title}'. You can view the program or subscribe below.`;
            }
                break;
            case 'PROGRAM_INVITE_ACCEPTED': {
                this.title = `Congrats, invitation accepted!`;
                this.message = `${this.actionData?.accepter_name}, has accepted your invitation for program '${this.actionData?.program_title}'.`;
            };
                break;
            case 'RECOMMENDATION': {
                this.title = `For You!`;
                this.message = `We recommend you this program, '${this.actionData?.program_title}'. You can view or subscribe to it below.`;
            }
                break;
        }
        return docClient.put({ TableName: DBConfig.tableName, Item: this.getNotificationData() }).promise();
    }


}