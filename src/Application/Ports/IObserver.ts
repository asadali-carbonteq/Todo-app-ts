import Subject from "./ISubject";


interface Observer {
    notify(message: string): void;
}


export default Observer;