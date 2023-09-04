import Observer from "../../../Application/Ports/IObserver";
const nodemailer = require("nodemailer")

//Now we talk about the issues, so... 
//The Subject of mail is hard coded.
//Email of the reciever is hard coded.
//




class Email implements Observer {
    notify(message: string) {
        async function mailer() {
            let hostname = "smtp.gmail.com";
            let username = "asad.ali@carbonteq.com";
            let password = "carbonteq123";


            let transporter = nodemailer.createTransport({
                host: hostname,
                port: 465,
                secure: true,
                auth: {
                    user: username,
                    pass: password
                },
                logger: true
            });


            let info = await transporter.sendMail({
                from: "asad ali <asad.ali@carbonteq.com>",
                to: "imasadali7@gmail.com",
                subject: "Sign In Successful",
                html: `<p>${message}</p>`,
                headers: { 'x-cloudmta-class': 'standard' }
            });
            // console.log("Message sent: %s", info.response);

        }

        mailer();
    }
}

export default Email;