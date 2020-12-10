import * as React from "react";
import { useState, useContext, useEffect, createContext } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import {HomeDashboard} from './Dashboard'
import {TeamSummary} from './TeamSummary'
import {PlayerSummary} from './PlayerSummary'

import './App.css';
import './Dashboard.css'

export interface AppProps {
//    appName?: ReactElem
}


export const App = (props: AppProps) => {
    const [isUserLogged, setUserLogged] = useState<boolean | undefined>(undefined);
    //useEffect(() => { }, [])

    const loadSwitchRouter = () => {
        let routerBuffer = []
        let defaultPageSpecified = false

        routerBuffer.push(            
            //<Route path="/teamSummary" component={<TeamSummary loadData={true}/>}/>,
            <Route exact path="/teamSummary"><TeamSummary loadData={true}/></Route>,
            <Route exact path="/playerSummary"><PlayerSummary loadData={true}/></Route>,
            <Route exact path="/" render={() => (
                isUserLogged ? (
                    <Redirect to="/home"/>
                ) : (
                    <Redirect to="/"/> //login
                )
            )}/>            
        )       
        return (       
            <Switch>
                {routerBuffer}
            </Switch>
        )
    }
    
    return (
        <div className="app">
             <Router>               
                <div>
                    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">FPL Portal</a>
                        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <input 
                            className="form-control form-control-dark w-100" 
                            type="text" 
                            placeholder="Search" 
                            aria-label="Search"> 
                        </input>
                        <ul className="navbar-nav px-3">
                            <li className="nav-item text-nowrap">
                            <a className="nav-link" href="#">Sign out</a>
                            </li>                    
                        </ul>
                    </nav>
                    <div id="appBody">
                        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                            <div className="sidebar-sticky pt-3">
                                <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">
                                    <span data-feather="home"></span>
                                    Dashboard <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">                            
                                    <a className="nav-link" href="#">
                                        <Link to="/teamSummary">Team Summary</Link>
                                    </a>
                                </li>    
                                <li className="nav-item">                            
                                    <a className="nav-link" href="#">
                                        <Link to="/playerSummary">Player Summary</Link>
                                    </a>
                                </li>                  
                                </ul>

                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                    <span>Saved reports</span>
                                    <a className="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                                        <span data-feather="plus-circle"></span>
                                    </a>
                                </h6>
                                <ul className="nav flex-column mb-2">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                    <span data-feather="file-text"></span>
                                    Current month
                                    </a>
                                </li>          
                                </ul>
                            </div>
                        </nav>
                        <div className="container-fluid">
                            <div className="row">                    

                                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                        <h1 className="h2">Dashboard</h1>
                                        <div className="btn-toolbar mb-2 mb-md-0">
                                        <div className="btn-group mr-2">
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                                        </div>
                                        <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                            <span data-feather="calendar"></span>
                                            This week
                                        </button>
                                        </div>
                                    </div>                                    
                                    {loadSwitchRouter()}
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>  
        </div>
    )
}
