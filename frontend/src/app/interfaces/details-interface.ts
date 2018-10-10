export interface TechDetail {
  _id: number;
  name: string;
  auther: string;
  description: string;
  established: string;
  latestVersion: string;
  docURL: string;
}

export interface SkillDetails {
  userId: string;
  detail: string;
  skill:{
  id: string;
  name: string;
  }
  }
  
  export interface Educationdtl {
  qualification: {
  id: string,
  name: string
  },
  institute: string,
  startdate: string,
  completedon: string
  }
  
  export interface Languagedtl {
  language:string;
  reading: boolean;
  speaking: boolean;
  writing: boolean;
  }
