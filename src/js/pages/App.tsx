import * as React from "react";
import { useState, useContext, useEffect, createContext } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import {TeamSummary} from './TeamSummary'
import {HomeDashboard} from './Dashboard'

//import './AppTemplate.css';
//import { ReactElem } from "../ReactCommons";

export interface AppProps {
//    appName?: ReactElem
}


export const App = (props: AppProps) => {
    const [isUserLogged, setUserLogged] = useState<boolean | undefined>(undefined);
    //useEffect(() => { }, [])

    //const homeComp = () => <Home/>

    return (

        <div className="app">
            <Router>
                <Switch>
                    <Route exact path="/teamSummary" component={() => <TeamSummary loadData={true}/>}/>
                    <Route exact path="/home" component={() => <HomeDashboard/>}/>
                    <Route exact path="/" render={() => (
                        isUserLogged ? (
                            <Redirect to="/home"/>
                        ) : (
                            <Redirect to="/home"/> //login
                        )
                    )}/>
                </Switch>
            </Router>
        </div>
    )
}
