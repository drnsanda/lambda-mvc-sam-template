//Holds all the Schemas for the whole project

import { ValidationAuthSchema, ValidationBodySchema, ValidationParamsSchema, ValidationQuerySchema,ValidationHeadersSchema, SchemaProps, Schema } from "./interfaces";

//General Schemas
export class AuthSchema implements ValidationAuthSchema {
    schema: { auth: SchemaProps };
    constructor() {
        this.schema = {
            auth: {
                type: 'object',
                properties: {
                    "roleId": { type: "string" },
                    "principalId": { type: "string" },
                    "integrationLatency": { type: "number" },
                    "userId": { type: "string" },
                    "orgId": { type: "string" },
                    "firstName": { type: "string" },
                    "lastName": { type: "string" }
                },
                required: []
            }
        }
    }
    public getSchema() {
        return this.schema;
    }
    public setSchemaProps(_schema: SchemaProps) {
        this.schema.auth = _schema;
    }


};

export class BodySchema implements ValidationBodySchema {
    schema: { body: SchemaProps };
    constructor() {
        this.schema = {
            body: {
                type: 'object',
                properties: {

                },
                required: []
            }
        }
    }
    public getSchema() {
        return this.schema;
    }
    public setSchemaProps(_schema: SchemaProps) {
        this.schema.body = _schema;
    }

};
export class HeadersSchema implements ValidationHeadersSchema {
    schema: { headers: SchemaProps };
    constructor() {
        this.schema = {
            headers: {
                type: 'object',
                properties: {

                },
                required: []
            }
        }
    }
    public getSchema() {
        return this.schema;
    }
    public setSchemaProps(_schema: SchemaProps) {
        this.schema.headers = _schema;
    }

};

export class ParamsSchema implements ValidationParamsSchema {
    schema: { params: SchemaProps };
    constructor() {
        this.schema = {
            params: {
                type: 'object',
                properties: {

                },
                required: []
            }
        }
    }
    public getSchema() {
        return this.schema;
    }
    public setSchemaProps(_schema: SchemaProps) {
        this.schema.params = _schema;
    }
};

export class QuerySchema implements ValidationQuerySchema {
    schema: { query: SchemaProps };
    constructor() {
        this.schema = {
            query: {
                type: 'object',
                properties: {

                },
                required: []
            }
        }
    }
    public getSchema() {
        return this.schema;
    }
    public setSchemaProps(_schema: SchemaProps) {
        this.schema.query = _schema;
    }

};

//Controllers Schemas

//Add here all schemas of each handler in a organized fashion

//!--Controllers Schemas
