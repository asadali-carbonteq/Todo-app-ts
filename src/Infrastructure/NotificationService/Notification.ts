import Observer from "../../Application/Ports/IObserver";
import Subject from "../../Application/Ports/ISubject";


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