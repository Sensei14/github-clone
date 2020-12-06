import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import RepositoryDetails from "../components/Repositories/RepositoryDetails";
import { Result } from "../components/Result";
import { Search } from "../components/Search";
import UserDetails from "../components/Users/UserDetails";

export const routes = (
    <Switch>
        <Route path='/' exact>
            <Search />
            <Result />
        </Route>

        <Route path='/user/:login'>
            <UserDetails />
        </Route>

        <Route path='/repos/:owner/:name'>
            <RepositoryDetails />
        </Route>

        <Redirect to='/' />
    </Switch>
);
