import {useContext} from "react";
import AuthContext from "../util/auth-context";
import {useHistory} from "react-router-dom";

const Homeowner = () => {

    const authCtx = useContext(AuthContext);
    const history = useHistory();

    if(!authCtx.isLoggedIn) {
        history.replace('/login')
    } else if(!authCtx.isHomeOwner) {
        history.replace('/org')
    }

    return (
        <h1>Welcome homeowner</h1>
    )
};

export default Homeowner;