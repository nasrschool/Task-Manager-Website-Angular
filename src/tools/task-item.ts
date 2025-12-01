export class Task{
    title:string;
    date:string;
    category:string;
    priority:string;
    status:string;
    description:string;
    constructor(title:string,date:string,category:string,priority:string,status:string,description:string){
        this.title = title;
        this.date = date; 
        this.category = category;
        this.priority = priority;
        this.status = status;
        this.description = description;
    }
    
}