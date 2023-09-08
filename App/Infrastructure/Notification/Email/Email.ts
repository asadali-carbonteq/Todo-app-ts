import Observer from "../../../Application/Interface/IObserver";
const nodemailer = require("nodemailer")
import { injectable } from "inversify";
import EmailEnv from "../../Config/emailENV";



@injectable()
class Email implements Observer {
    private email: string;

    constructor() {
        this.email = "";
    }

    setEmail(email: string) {
        this.email = email;
    }

    notify(message: string) {
        const mailer = async () => {
            let username = EmailEnv.EMAIL_USERNAME
            let hostname = EmailEnv.EMAIL_HOSTNAME;
            let userAddress = EmailEnv.EMAIL_USERADDRESS;
            let password = EmailEnv.EMAIL_PASSWORD;


            let transporter = nodemailer.createTransport({
                host: hostname,
                port: 465,
                secure: true,
                auth: {
                    user: userAddress,
                    pass: password
                },
                logger: true
            });

            let info = await transporter.sendMail({
                from: `${username} <${userAddress}>`,
                to: this.email,
                subject: "Sign In Successful",
                html: `<p>${message}</p>`,
                headers: { 'x-cloudmta-class': 'standard' }
            });
        }
        mailer();
    }
}

export default Email;