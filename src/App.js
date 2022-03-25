import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import './App.css';
import {Route, Redirect} from 'react-router-dom';


function App() {
    return (
        <>
            <Route path="/" exact>
                <Redirect to='/login'/>
            </Route>
            <Route path='/login'>
                <Login/>
            </Route>
            <Route path='/registration'>
                <Registration />
            </Route>
        </>
    );
}

export default App;
