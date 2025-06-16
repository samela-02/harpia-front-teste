export class TimelineDto {
    title: string;
    date: Date;
    content: string;
    user: string;

    constructor(title: string, date: Date, content: string, user: string) {
        this.title = title;
        this.date = date;
        this.content = content;
        this.user = user;
    }
}