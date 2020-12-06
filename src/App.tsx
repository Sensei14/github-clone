import React from "react";
import { SearchContext } from "./context/search-context";
import { useSearch } from "./hooks/search-hook";
import { BrowserRouter as Router } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
    const {
        type,
        changeType,
        data,
        changeData,
        resultCount,
        page,
        perPage,
        changePage,
        changePerPage,
    } = useSearch();

    return (
        <div className='App'>
            <SearchContext.Provider
                value={{
                    type,
                    changeType,
                    data,
                    changeData,
                    resultCount,
                    page,
                    perPage,
                    changePage,
                    changePerPage,
                }}
            >
                <Router>{routes}</Router>
            </SearchContext.Provider>
        </div>
    );
}

export default App;
