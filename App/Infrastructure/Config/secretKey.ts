require('dotenv').config();

const secret = {
    SECRET_KEY: process.env.SECRET_KEY as string
}

export default secret;