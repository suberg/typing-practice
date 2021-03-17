import Services from '../services';
import { navigate } from '@reach/router';
import { useContext, useEffect } from 'react';
import { LogedInActionType, LogedInUser } from '../providers/loged-in-user';
import LoginService from '../services/login-service';
import type { User } from '../entities/user';

export type Credentials = {
    email: string;
    password: string;
};

export default function useLogin(credentials: Credentials | null): User | null {
    const { loginService } = useContext(Services);
    const { dispatch, state = { user: null } } = useContext(LogedInUser);

    useEffect(() => {
        if (!credentials || !dispatch) {
            return;
        }

        let validCredentials;

        try {
            validCredentials = LoginService.checkCredentials(credentials);
        } catch (e) {
            alert(e.message);
            return;
        }

        loginService
            .login(validCredentials.email, validCredentials.password)
            .then((user: User) =>
                dispatch!({ type: LogedInActionType.LOG_IN, payload: user })
            )
            .then(() => navigate('/'))
            .catch((e) => alert(e.message));
    }, [credentials, dispatch]);

    return state.user;
}
