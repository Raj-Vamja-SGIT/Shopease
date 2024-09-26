export interface User {
    UserName: string;
    UserEmail: string;
    Password: string;
  }



  export interface ForgotPasswordRequestModel {
    Email: string;
    ClientURL: string;
  }