import {useContext} from "react";
import AuthContext from "../util/auth-context";
import {useHistory} from "react-router-dom";


const Organization = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    if(!authCtx.isLoggedIn) {
        history.replace('/login')
    } else if(authCtx.isHomeOwner) {
        history.replace('/home')
    }

    return (
        <>
            <h1>Welcome Organization</h1>
        </>
    )
};

export default Organization;