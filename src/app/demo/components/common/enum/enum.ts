export enum Roles {
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    User = 'User',
}

export const RoleEnumMapping: Record<Roles, string> = {
    [Roles.SuperAdmin]: 'SuperAdmin',
    [Roles.Admin]: 'Admin',
    [Roles.User]: 'User',
};
