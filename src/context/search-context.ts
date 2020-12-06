import * as React from "react";

interface SearchContextInterface {
    type: string;
    changeType: (t: string) => void;
    data: any[] | null;
    changeData: (data: any) => void;
    resultCount: number;
    page: number;
    perPage: number;
    changePage: (n: number) => void;
    changePerPage: (n: number) => void;
}

export const SearchContext = React.createContext<SearchContextInterface>({
    type: "",
    changeType: () => {},
    data: [],
    changeData: () => {},
    resultCount: 0,
    page: 1,
    perPage: 15,
    changePage: () => {},
    changePerPage: () => {},
});
