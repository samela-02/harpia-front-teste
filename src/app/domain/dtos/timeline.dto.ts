import { Icon } from "../static-instances/icon.static-instances";

export class TimelineDto {
    title: string;
    date: Date;
    content: string;
    user: string;
    eventIcon: Icon;

    constructor(title: string, date: Date, content: string, user: string, eventIcon: Icon) {
        this.title = title;
        this.date = date;
        this.content = content;
        this.user = user;
        this.eventIcon = eventIcon;
    }
}