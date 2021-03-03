/**
* Already setup to prevent CORS issue with your lambda code.
*/
export const headers = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': 'https://your-project-domain.com',
    //'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
};
