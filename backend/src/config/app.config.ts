import * as process from "process";

export const appConfig = ()=>{
  return {
    appSecret: process.env.JWT_SECRET,
    appPort: process.env.PORT,
    appConnectionString: process.env.CONNECTION_STRING,

  }
}