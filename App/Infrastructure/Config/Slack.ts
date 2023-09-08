require('dotenv').config();


const SlackWebHook = {
    MY_SLACK_WEBHOOK_URL: process.env.MY_SLACK_WEBHOOK_URL as string
}

const username = process.env.SLACK_USER_NAME as string;

export { SlackWebHook, username };