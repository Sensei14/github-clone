import React from "react";

interface UserFiltersProps {
    handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
    handleSortChange,
    handleOrderChange,
}) => {
    return (
        <div className='search__filters--user'>
            <div>
                <label>Sort:</label>
                <select onChange={handleSortChange}>
                    <option value=''>Best match</option>
                    <option value='followers'>Followers</option>
                    <option value='joined'>Joined</option>
                    <option value='repositories'>Repositories</option>
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
