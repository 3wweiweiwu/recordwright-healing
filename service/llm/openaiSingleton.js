require('dotenv').config();
const { ChatOpenAI } = require('langchain/chat_models/openai');
const model = new ChatOpenAI({
    temperature: 0,
    maxTokens: 800,
    topP: 0.95,
    azureOpenAIApiKey: process.env.OPENAI_API_KEY,
    azureOpenAIApiVersion: "2023-07-01-preview",
    azureOpenAIApiInstanceName: "recordwright",
    azureOpenAIApiDeploymentName: "heal-basic",
});

module.exports = model;