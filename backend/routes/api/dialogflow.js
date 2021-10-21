const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const sessionId = uuid.v4();

async function runIntent(projectId, requestText) {

const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "./keyAuth.json"  
});

const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
);
const intentRequest = {
    session: sessionPath,
    queryInput: {
    text: {
        text: requestText,
        languageCode: 'en-US',
    },
    },
};

const responses = await sessionClient.detectIntent(intentRequest);
const result = responses[0].queryResult;

return await {
        "Query": result.queryText,
        "Response": result.fulfillmentText,
        "Intent": result.intent.displayName
    };
}
  
module.exports.runIntent = runIntent;