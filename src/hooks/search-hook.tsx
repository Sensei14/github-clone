import { useState } from "react";

export const useSearch = () => {
    const [type, setType] = useState("");
    const [data, setData] = useState<any[] | null>([]);
    const [resultCount, setResultCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(12);

    const changeType = (t: string) => {
        setType(t);
    };

    const changeData = (data: any) => {
        setData(data.items);
        setResultCount(data.total_count);
    };

    const changePage = (n: number) => {
        if (page + n <= 1) {
            return;
        }

        if ((page + n) * perPage > resultCount) {
            return;
        }

        setPage(page + n);
    };

    const changePerPage = (n: number) => {
        setPerPage(n);
    };

    return {
        type,
        changeType,
        data,
        changeData,
        resultCount,
        page,
        perPage,
        changePage,
        changePerPage,
    };
};
