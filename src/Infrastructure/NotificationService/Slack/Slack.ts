import Observer from "../../../Application/Ports/IObserver";
import SlackNotify from 'slack-notify';
import { SlackWebHook, username } from "../../Config/Slack";



const slack = SlackNotify(SlackWebHook.MY_SLACK_WEBHOOK_URL);

class Slack implements Observer {
    notify(message: string): void {
        slack.send({
            icon_emoji: ':)',
            text: message,
            username: username
        }).then(() => {
            console.log("done!")
        }).catch((err) => {
            console.log(err);
        });
    }
}

export default Slack






