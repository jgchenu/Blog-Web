import React from 'react'
import {HashRouter,Route, Switch,Redirect} from 'react-router-dom';
import App from './App.js'
import Home from './pages/home/index'
import NotFound from './pages/notFound/index'
export default class Router extends React.Component{
    render(){
        return (
            <HashRouter>
            <Switch>
                <Route path='/' render={()=>
                <App>
                    <Switch>
                       <Route path='/home'  component={Home}/>
                        <Redirect  to='/home'/>
                       <Route  component={NotFound} />
                    </Switch>
                </App>}>
                </Route>
            </Switch>
        </HashRouter>
        )

    }
}