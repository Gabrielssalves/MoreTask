import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Route } from "react-router-dom";

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const Sidebar = () => {
    return (
        <Route render={({ location, history }) => (
            <React.Fragment>
                <SideNav
                    onSelect={(selected) => {
                        const to = '/' + selected;
                        if (location.pathname !== to) {
                            history.push(to);
                        }
                    }}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">

                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Home
                                </NavText>
                        </NavItem>
                        <NavItem eventKey="tasks">
                            <NavIcon>
                                <i className="fa fa-fw fa-tasks" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Tasks
                                </NavText>
                        </NavItem>
                        <NavItem eventKey="workflow">
                            <NavIcon>
                                <i className="fa fa-fw fa-table" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Workflow
                                </NavText>
                        </NavItem>
                        <NavItem eventKey="signout">
                            <NavIcon>
                                <i className="fa fa-fw fa-sign-out" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Sign Out
                                </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <main>
                    <Route path="/" />
                    <Route path="/home" />
                    <Route path="/tasks" />
                </main>
            </React.Fragment>
        )}
        />
    )
}

export default Sidebar