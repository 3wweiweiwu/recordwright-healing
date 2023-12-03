// require('dotenv').config({ path: __dirname + '/../../.env', override: true });
const { ChatOpenAI } = require('langchain/chat_models/openai');
const model = new ChatOpenAI({
    temperature: 0,
    maxTokens: 800,
    topP: 0.95,
    azureOpenAIApiKey: process.env.OPENAI_API_KEY,
    azureOpenAIApiVersion: "2023-07-01-preview",
    azureOpenAIApiInstanceName: process.env.OPENAI_INSTANCE_NAME || "recordwright",
    azureOpenAIApiDeploymentName: process.env.OPENAI_DEPLOYMENT || "heal-basic",
    frequencyPenalty: 0,
    presencePenalty: 0,
    modelName: 'gpt-4'
});

module.exports = model;