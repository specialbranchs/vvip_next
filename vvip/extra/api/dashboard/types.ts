export type ReportType={
    id:number;
    event_title:string;
    event_pass:number;
    sb_pass:number;
  }

  export type reportMainType={
    Event:{
      totalEvent:number;
      organization:number,
      common:[{
        print_status:number;
        status:number
      }],
      sb:[{
        print_status:number;
        status:number
      }]
    },
    event_pass:ReportType[]
  }