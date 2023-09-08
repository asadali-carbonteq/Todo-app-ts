import Observer from "../../../Application/Interface/IObserver";
import SlackNotify from 'slack-notify';
import { SlackWebHook, username } from "../../Config/Slack";
import { injectable } from "inversify";
const logger = require('pino')()



const slack = SlackNotify(SlackWebHook.MY_SLACK_WEBHOOK_URL);

@injectable()
class Slack implements Observer {
    notify(message: string): void {
        slack.send({
            icon_emoji: ':)',
            text: message,
            username: username
        }).then(() => {
            logger.info("Slack Notification Done!")
        }).catch((err) => {
            logger.info(err);
        });
    }
}

export default Slack






