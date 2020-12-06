import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { SearchContext } from "../context/search-context";
import { SearchType } from "../globals/globals";
import { useHttp } from "../hooks/http-hook";
import { LoadingSpinner } from "./LoadingSpinner";
import { ReposFilters } from "./ReposFilters";
import { UserFilters } from "./UserFilters";

export const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchType, setSearchType] = useState<SearchType>(SearchType.USERS);
    const [firstSearch, setFirstSearch] = useState<boolean>(true);
    const [sort, setSort] = useState("");
    const [order, setOrder] = useState("");

    const { isLoading, sendRequest } = useHttp();
    const history = useHistory();

    const search = useContext(SearchContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = "https://api.github.com/search/";
        let query = "";

        if (searchType === SearchType.USERS) {
            query = `?q=${searchTerm}+in:login`;
        }

        if (searchType === SearchType.REPOSITORIES) {
            query = `?q=${searchTerm}+in:name`;
        }

        const per_page = `&per_page=${search.perPage}`;

        const filters = `&sort=${sort}&order=${order}`;

        const finalUrl =
            url + searchType + query + per_page + `&page=1` + filters;

        setFirstSearch(false);
        fetchData(finalUrl);
    };

    const fetchData = async (url: string) => {
        try {
            const responseData = await sendRequest(url);
            search.changeData(responseData);
            search.changeType(searchType);
            search.changePage(-search.page + 1);
            history.push("/");
        } catch (error) {}
    };

    const changeSearchType = (type: SearchType) => {
        setSearchType(type);
    };

    const changePage = (n: number) => {
        search.changePage(n);

        const url = "https://api.github.com/search/";
        let query = "";

        if (searchType === SearchType.USERS) {
            query = `?q=${searchTerm}+in:login`;
        }

        if (searchType === SearchType.REPOSITORIES) {
            query = `?q=${searchTerm}+in:name`;
        }

        const per_page = `&per_page=${search.perPage}`;
        const filters = `&sort=${sort}&order=${order}`;

        const finalUrl =
            url +
            searchType +
            query +
            per_page +
            `&page=${search.page + n}` +
            filters;

        fetchData(finalUrl);
    };

    const changePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const n = +e.target.value;
        search.changePerPage(n);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
    };

    const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrder(e.target.value);
    };

    return (
        <div className='search'>
            <div className='search__type'>
                <span> Search for:</span>
                <div className='search__types'>
                    <span
                        className={`type ${
                            searchType === SearchType.USERS ? "active" : ""
                        }`}
                        onClick={() => changeSearchType(SearchType.USERS)}
                    >
                        Users
                    </span>
                    <span
                        className={`type ${
                            searchType === SearchType.REPOSITORIES
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            changeSearchType(SearchType.REPOSITORIES)
                        }
                    >
                        Repositories
                    </span>
                </div>
            </div>
            <div className='search__search-container'>
                <form onSubmit={handleSubmit}>
                    <div className='search__search-bar'>
                        <input
                            type='text'
                            value={searchTerm}
                            onChange={handleChange}
                            placeholder='search...'
                        />
                        <button className='search__btn'>Search</button>
                    </div>
                </form>
            </div>

            {isLoading && <LoadingSpinner />}

            <div className='search__filters'>
                {searchType === SearchType.USERS && (
                    <UserFilters
                        handleOrderChange={handleOrderChange}
                        handleSortChange={handleSortChange}
                    />
                )}

                {searchType === SearchType.REPOSITORIES && (
                    <ReposFilters
                        handleOrderChange={handleOrderChange}
                        handleSortChange={handleSortChange}
                    />
                )}
                <div>
                    <label>Results per page:</label>
                    <select onChange={changePerPage}>
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                    </select>
                </div>
            </div>

            <div className='pagination'>
                <button
                    className='pagination__btn prev-btn'
                    onClick={() => changePage(-1)}
                    disabled={search.page - 1 <= 1}
                >
                    Prev
                </button>
                <button
                    className='pagination__btn next-btn'
                    onClick={() => changePage(1)}
                    disabled={
                        (search.page + 1) * search.perPage > search.resultCount
                    }
                >
                    Next
                </button>
            </div>
            {!firstSearch && (
                <p>
                    Found {search.resultCount} {search.type}
                </p>
            )}
        </div>
    );
};
