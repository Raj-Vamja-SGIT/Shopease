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
export interface Users {
    [x: string]: any;
    userId?: any;
    userName?: string;
    userEmail?: string;
    password?: string;
    dob?: any;
    role?: any;
    gender?: string;
    avatar?: '';
    avatarFile?: any;
    logOutTime?: any;
    lastMessage?: any;
    lastMessageDate?: any;
}

export interface CountData {
    Customers?: any;
    NewlyRegistered?: any;
    SuperAdminCountOnJan?: any;
    SuperAdminCountOnFeb?: any;
    SuperAdminCountOnMarch?: any;
    SuperAdminCountOnApril?: any;
    SuperAdminCountOnMay?: any;
    SuperAdminCountOnJune?: any;
    SuperAdminCountOnJuly?: any;
    SuperAdminCountOnAug?: any;
    SuperAdminCountOnSep?: any;
    SuperAdminCountOnOct?: any;
    SuperAdminCountOnNov?: any;
    SuperAdminCountOnDec?: any;
    AdminCountOnJan?: any;
    AdminCountOnFeb?: any;
    AdminCountOnMarch?: any;
    AdminCountOnApril?: any;
    AdminCountOnMay?: any;
    AdminCountOnJune?: any;
    AdminCountOnJuly?: any;
    AdminCountOnAug?: any;
    AdminCountOnSep?: any;
    AdminCountOnOct?: any;
    AdminCountOnNov?: any;
    AdminCountOnDec?: any;
    UserCountOnJan?: any;
    UserCountOnFeb?: any;
    UserCountOnMarch?: any;
    UserCountOnApril?: any;
    UserCountOnMay?: any;
    UserCountOnJune?: any;
    UserCountOnJuly?: any;
    UserCountOnAug?: any;
    UserCountOnSep?: any;
    UserCountOnOct?: any;
    UserCountOnNov?: any;
    UserCountOnDec?: any;
}

export interface Product {
    ProductId?: any;
    ProductName?: string;
    ProductDescription?: string;
    Price?: any;
    Discount?: any;
    StockStatus?: any;
    SKU?: any;
    Category?: any;
    Brand?: any;
    Rating?: number;
    ImageUrls?: '';
    ImageFiles?: any;
}

export interface Brands {
    BrandId?: number;
    BrandName?: string;
}

export interface Categories {
    categoryId?: number;
    categoryName?: string;
}

export interface SubCategory {
    categoryId?: number;
    subCategoryId?: number;
    subCategoryName?: string;
    isActive?: boolean;
    isDeleted?: boolean;
}

export interface Message {
    Id?: number;
    FromUserId?: number;
    ToUserId?: number;
    Mesaage?: string;
    created?: any;
    Isactive?: boolean;
    isSent?: boolean;
}

export interface SederDetails {
    senderId?: any;
    receiverId?: any;
    senderName?: any;
    senderImg?: any;
    senderMsg?: any;
}
