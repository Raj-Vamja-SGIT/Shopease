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
    Avatar?: '';
}
export interface ForgotPasswordRequestModel {
    Email: string;
    ClientURL: string;
}

export interface ChangePasswordRequestModel {
    UserEmail: string;
    Password: string;
    ConfirmPassword: string;
}

export interface ExternalAuth {
    credential: string;
}
