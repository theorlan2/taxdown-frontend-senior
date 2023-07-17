import { createContext, FunctionComponent, ReactElement, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
//
import { RootState } from "@/store";
import { Auth } from "@/store/feactures/auth/authState.model";
import { clearAuth, saveAuth } from "../store/feactures/auth/auth.slice";

type AuthContextsType = {
    isLogged: boolean,
    userData: Auth,
    setUserData: (value: Auth) => void,
    logout: () => void,
}

export const AuthContext = createContext({} as AuthContextsType);

type Props = {
    children: ReactElement
}

export const AuthProvider: FunctionComponent<Props> = (props) => {

    const userData = useSelector((state: RootState) => state.auth.dataAuth)
    const isLogged = useSelector((state: RootState) => state.auth.isLogged)
    const dispatch = useDispatch();

    function setUserData(data: Auth) {
        dispatch(saveAuth(data));
    }
    
    function logout() {
        dispatch(clearAuth());

    }

    const defaultAuthData = {
        isLogged,
        userData,
        logout,
        setUserData: (data: Auth) => setUserData(data),
    }

    return (
        <AuthContext.Provider value={defaultAuthData} >
            {props.children}
        </AuthContext.Provider>
    );


}

export const useAuth = () => useContext(AuthContext);