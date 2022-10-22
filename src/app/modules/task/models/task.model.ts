export enum Status{
    Done='DONE',
    ToDo='TODO',
    Expired='EXPIRED'
}

export enum OrderBy{
    DATE_ASC='DATE_ASC',
    DATE_DESC='DATE_DESC',
    TASK_ASC='TASK_ASC',
    TASK_DESC='TASK_DESC'
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