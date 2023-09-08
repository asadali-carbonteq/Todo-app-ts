import { injectable, inject } from "inversify";
import Email from "../../Infrastructure/Notification/Email/Email";
import Notification from "../../Infrastructure/Notification/Notification";
import Slack from "../../Infrastructure/Notification/Slack/Slack";



@injectable()
export default class NotificationService {
    private notification: Notification;
    private emailNotification: Email;
    private slackNotification: Slack;

    constructor(
        @inject(Notification) notification: Notification,
        @inject(Email) email: Email,
        @inject(Slack) slack: Slack
    ) {
        this.notification = notification;
        this.emailNotification = email;
        this.slackNotification = slack;

        this.notification.attachObserver(this.emailNotification);
        this.notification.attachObserver(this.slackNotification);
    }

    setEmail(email: string) {
        this.emailNotification.setEmail(email);
    }

    notifyObserver(message: string) {
        this.notification.notifyObserver(message);
    }
}