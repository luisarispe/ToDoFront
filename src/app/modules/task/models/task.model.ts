export enum Status{
    Done='DONE',
    ToDo='TODO',
    Expired='EXPIRED'
}

export class Task{
    constructor(
        public id: string,
        public task: string,
        public status: Status,
        public defeated: Date,
        public createdAt: Date,
    ){}
}