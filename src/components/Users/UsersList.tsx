import React from "react";
import { UsersListItem } from "./UsersListItem";

interface UsersListProps {
    users: any[] | null;
}

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
    const usersList = users?.map((user) => (
        <UsersListItem
            key={user.id}
            avatar_url={user.avatar_url}
            followers_url={user.followers_url}
            following_url={user.following_url}
            html_url={user.html_url}
            id={user.id}
            login={user.login}
            repos_url={user.repos_url}
            site_admin={user.site_admin}
            type={user.type}
            url={user.url}
        />
    ));

    return <ul className='users-list'>{usersList}</ul>;
};
