export interface Schema {
    [key: string]: {
        type: string;
        properties: {
            [key: string]: any
        };
        required?: Array<string>;
        [key: string]: any;
    };
};

export interface SchemaProps {
    type: string;
    properties: {
        [key: string]: any
    };
    required?: Array<string>;
    [key: string]: any;
};

export interface ValidationAuthSchema {
    schema: {
        auth: SchemaProps
    }

}
export interface ValidationBodySchema {
    schema: {
        body: SchemaProps
    };

}
export interface ValidationHeadersSchema {
    schema: {
        headers: SchemaProps
    };

}
export interface ValidationParamsSchema {
    schema: {
        params: SchemaProps;
    }


}
export interface ValidationQuerySchema {
    schema: {
        query: SchemaProps
    };

}