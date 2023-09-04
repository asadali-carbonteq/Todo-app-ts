require('dotenv').config();

const googleSecret = {
    GOOGLE_SECRET: process.env.SECRET_KEY as string
}

export default googleSecret;