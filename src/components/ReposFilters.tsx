import React from "react";

interface ReposFiltersProps {
    handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ReposFilters: React.FC<ReposFiltersProps> = ({
    handleSortChange,
    handleOrderChange,
}) => {
    return (
        <div className='search__filters--repos'>
            <div>
                <label>Sort:</label>
                <select onChange={handleSortChange}>
                    <option value=''>Best match</option>
                    <option value='stars'>Stars</option>
                    <option value='forks'>Forks</option>
                </select>
            </div>
            <div>
                <label>Order:</label>
                <select onChange={handleOrderChange}>
                    <option value='desc'>DESC</option>
                    <option value='asc'>ASC</option>
                </select>
            </div>
        </div>
    );
};
