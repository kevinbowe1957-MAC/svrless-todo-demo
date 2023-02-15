import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    ScanCommand,
    // PutCommand,
    // GetCommand,
    // DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient( {} );
const dynamo = DynamoDBDocumentClient.from (
                client, { marshallOptions: { removeUndefinedValues: true }});
const tableName = "demoTodo";

// export const handler = async (event, context) => {
export const handler = async (event) => {
    let body;
    let responceJSON;
    let statusCode = 200;
    const headers = { "Content-Type": "application/json" };

    //------------------------------------------------
    try {
        //--VALID TEST DATA - Passed with Lambda > Test -- {}
        //--VALID TEST DATA - Passed with PostMan -- < _no-data_ >

        responceJSON = await dynamo.send(new ScanCommand( { TableName: tableName } ) );
        responceJSON = responceJSON.Items;
        
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(responceJSON);    
    }

    return {
        statusCode,
        body,
        headers
    };
};

