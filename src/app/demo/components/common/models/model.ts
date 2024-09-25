export interface User {
    UserName: string;
    UserEmail: string;
    Password: string;
}

export interface UserProfile {
    UserId: any;
    UserName: string;
    UserEmail: string;
    Password: string;
    DOB: any;
    Gender: string;
    AvatarFile?: any;
    Avatar?:''
}
