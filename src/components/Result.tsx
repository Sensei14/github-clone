import React, { useContext } from "react";
import { SearchContext } from "../context/search-context";
import { SearchType } from "../globals/globals";
import { RepositoriesList } from "./Repositories/RepositoriesList";

import { UsersList } from "./Users/UsersList";

export const Result: React.FC = () => {
    const search = useContext(SearchContext);

    return (
        <div className='search__results'>
            {search.type === SearchType.USERS && (
                <UsersList users={search.data} />
            )}
            {search.type === SearchType.REPOSITORIES && (
                <RepositoriesList repos={search.data} />
            )}
        </div>
    );
};
