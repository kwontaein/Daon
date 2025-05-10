export type RequestSchedule={
    calendarId?:string;
    date:Date;
    memo:string;
    userId:string;
    month?:number; 
    year?:number; 
}

export type ResponseSchedule={
    calendarId?:string;
    date:Date;
    memo:string;
    userId:string;
    userName:string; 
}

export type ScheduleDateOfKey ={
    [date:string]:{
        memo:string,
        userId:string,
    }
}