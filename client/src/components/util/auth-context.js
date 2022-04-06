import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});


export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('userToken'));
    const [userType, setUserType] = useState(localStorage.getItem('userType'));

    const userIsLoggedIn = !!token;
    const userIsHomeOwner = userType === 'homeOwner';
    const userIsOrg = userType === 'organization';

    const loginHandler = (token, userType) => {
        setToken(token);
        setUserType(userType);
        localStorage.setItem('userType', userType);
        localStorage.setItem('userToken', token);
    }

    const logoutHandler = () => {
        setToken(null);
        setUserType(null);
        localStorage.removeItem('userType');
        localStorage.removeItem('userToken');
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        isHomeOwner: userIsHomeOwner,
        isOrg: userIsOrg,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <>
            <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
        </>
    )
};


export default AuthContext;
