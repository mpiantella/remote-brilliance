'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    sslEnabled: true
});

const jobTable = process.env.ACTIVITY_TABLE_NAME || "Remote-Brilliance-Tiffin-Activity-9OG0AAHE5MUG";

exports.handler = async (event) => {
    const input = (event.arguments || {}).input;
    console.log('input', input)
    if (!input) {
        throw new Error("Provide input in the correct format")
    }
    let params = {
        TableName: jobTable,
        Item: {
            id: input.id,
            userId: input.userId,
            name: input.name,
            content: input.content, // 500 characters
            description: input.description,
            status: input.status,
            date: input.date
        }
    };

    if (input.comments) {
        params.Item.comments = input.comments;
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

/*
    HashKey: 'haskey',
    NumAttribute: 1,
    BoolAttribute: true,
    ListAttribute: [1, 'two', false],
    MapAttribute: {
        foo: 'bar'
    },
    NullAttribute: null
s*/