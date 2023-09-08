import { injectable } from "inversify";
import Observer from "../../Application/Interface/IObserver";
import Subject from "../../Application/Interface/ISubject";

@injectable()
class Notification implements Subject {
    private observers: Observer[] = [];

    attachObserver(observer: Observer): void {
        const observerExists = this.observers.includes(observer);

        if (observerExists) {
            throw new Error("Observer has already been subscribed");
        }

        this.observers.push(observer);
    }

    detachObserver(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);

        if (observerIndex == -1) {
            throw new Error('Observer does not exist');
        }

        this.observers.splice(observerIndex, 1);
    }

    notifyObserver(message: string): void {
        for (const observer of this.observers) {
            observer.notify(message);
        }
    }

}

export default Notification;