

export interface LoginType {
    email: string;
    password: string;
}


export interface SingUpType extends LoginType {
    name: string;
}
