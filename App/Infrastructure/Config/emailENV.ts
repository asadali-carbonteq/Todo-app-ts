require('dotenv').config();

const EmailEnv = {
    EMAIL_HOSTNAME: process.env.EMAIL_HOSTNAME as string,

    EMAIL_USERNAME: process.env.EMAIL_USERNAME as string,

    EMAIL_USERADDRESS: process.env.EMAIL_USERADDRESS as string,

    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD as string,
}

export default EmailEnv;