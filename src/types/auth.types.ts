export const UserRoles = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export interface IUserLoginDto{
    email: string;
    password: string;
}

export interface IUserSignupDto{
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    password: string;
}