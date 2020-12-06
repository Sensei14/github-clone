import React from "react";
import { Link } from "react-router-dom";

interface UsersListItemProps {
    avatar_url: string;
    followers_url: string;
    following_url: string;
    html_url: string;
    id: number;
    login: string;
    repos_url: string;
    site_admin: false;
    type: string;
    url: string;
}

export const UsersListItem: React.FC<UsersListItemProps> = ({
    login,
    avatar_url,
}) => {
    return (
        <Link to={`/user/${login}`}>
            <li className='users-list__user'>
                <img src={avatar_url} alt='' />
                <span>{login}</span>
            </li>
        </Link>
    );
};
