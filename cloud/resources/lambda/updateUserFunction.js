'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    sslEnabled: true
});

const userTable = process.env.USER_TABLE_NAME || "Remote-Brilliance-Tiffin-User-9OG0AAHE5MUG";

exports.handler = async (event) => {
    const input = (event.arguments || {}).input;
    console.log('input', input)
    if (!input) {
        throw new Error("Provide input in the correct format")
    }
    let params = {
        TableName: userTable,
        Item: {
            id: input.id,
            cognitoid: input.cognitoid,
            email: input.email,
            username: input.username,
            firstName: input.firstName,
            lastName: input.lastName,
            phone: input.phone,
            registered: input.registered,
            subcribed: input.subcribed,
        }
    };

    if (input.applications) {
        params.Item.applications = input.applications;
    }

    if (input.address) {
        params.Item.address = input.address;
    }

    if (input.activities) {
        params.Item.activities = input.activities;
    }

    if (input.profile) {
        params.Item.profile = input.profile;
    }

    if (input.subscription) {
        params.Item.subscription = input.subscription;
    }

    let data = await documentClient.update(params).promise()
        .catch((err) => {
            throw err;
        });

    return {
        context: {
            result: data
        }
    }
};