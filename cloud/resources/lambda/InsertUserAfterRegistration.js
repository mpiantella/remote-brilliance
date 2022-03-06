'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    sslEnabled: true
});

const userTable = process.env.USER_TABLE_NAME || "Remote-Brilliance-Tiffin-User-9OG0AAHE5MUG";

exports.handler = async (event) => {
    const input = event;
    console.log('input', input)
    if (!input) {
        throw new Error("Provide input in the correct format")
    }
    let params = {
        TableName: userTable,
        Item: {
            id: `${new Date().valueOf()}-${new Date().valueOf()}-${new Date().valueOf()}`,
            username: input.userName,
            cognitoid: input.request.userAttributes.sub,
            phone: input.request.userAttributes.phone_number,
            email: input.request.userAttributes.email,
            firstName: input.request.userAttributes.name,
            lastName: input.request.userAttributes.family_name,
            address: {},
            activities: [],
            applications: [],
            subscription: {}
        }
    };

    let data = await documentClient.put(params).promise()
        .catch((err) => {
            throw err;
        });

    return event
};