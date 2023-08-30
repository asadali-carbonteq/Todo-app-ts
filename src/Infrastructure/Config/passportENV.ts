require('dotenv').config();

const passportENV = {
    CLIENT_ID: process.env.CLIENT_ID as string,

    CLIENT_SECRET: process.env.CLIENT_SECRET as string,

    CALLBACK_URL: process.env.CALLBACK_URL as string,
}

export default passportENV;