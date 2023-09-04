import Observer from "./IObserver";


interface Subject {
    attachObserver(observer: Observer): void;
    detachObserver(observer: Observer): void;
    notifyObserver(message: string): void;
}

export default Subject;