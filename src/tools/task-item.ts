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
    
    static Clone(task:Task):Task{
        return new Task(task.title,task.date,task.category,task.priority,task.status,task.description);
    }

}

export class Cluster extends Task{
    subTasks:Task[] = [];
    constructor(title:string,date:string,category:string,priority:string,status:string,description:string){
        super(title,date,category,priority,status,description);

        this.subTasks.push(new Task("sub task1","10/01/2027","work","medium","in-progress","this is just a place holder for actual task decription"))
    }

    static override Clone(task:Cluster|Task):Cluster|Task{ // will return a Task clone if the input is a Task
        if(task instanceof Cluster){
            return new Cluster(task.title,task.date,task.category,task.priority,task.status,task.description);
        }else{
            return Task.Clone(task);
        }
    }
}  