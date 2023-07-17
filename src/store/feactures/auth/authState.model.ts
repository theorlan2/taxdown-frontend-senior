import { GenericFeature } from "@/models/shared";


export interface UserAuthData {
    id: number;
    name: string;
    email: string;
}
export interface Auth {
    accessToken: string;
    expiredDate: string;
    user?: UserAuthData;
}

export interface AuthState extends GenericFeature {
    isLogged: boolean;
    dataAuth: Auth;
}
