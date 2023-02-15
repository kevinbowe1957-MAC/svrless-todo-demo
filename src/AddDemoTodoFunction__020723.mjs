import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    // ScanCommand,
    PutCommand,
    // GetCommand,
    // DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient( {} );
const dynamo = DynamoDBDocumentClient.from (
                client, { marshallOptions: { removeUndefinedValues: true }});
const tableName = "demoTodo";

export const handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = { "Content-Type": "application/json" };
    let requestJSON;
    let sourceDataString;
    let isSourceString;
    //------------------------------------------------
    try {
        //--VALID TEST DATA - Passed with Lambda > Test
        //  { "body": { "id": 999999, "name": "Test-999999" } }
        //--VALID TEST DATA - Passed with PostMan
        //  { "id": 999999, "name": "Test-999999"}
        
        // The incoming event MUST be converted to a JSON object if it is a string.
        if (typeof(event.body) === "string") {
            isSourceString = true;
            sourceDataString = event.body;
            //---
            requestJSON = JSON.parse(event.body);
        } else {
            isSourceString = false;
            sourceDataString = JSON.stringify(event.body);
            //---
            requestJSON = event.body;
        }
        
         await dynamo.send(
             new PutCommand({
                 TableName: tableName,
                 Item: {
                     id: requestJSON.id,
                     name: requestJSON.name,
                 },
             })
         );
        body = `Put item ${requestJSON.id}  --  Event source a String: ${isSourceString}`;
        
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);    
    }

    return {
        statusCode,
        body,
        headers,
        sourceDataString,
        isSourceString
    };
    
}; // END-export