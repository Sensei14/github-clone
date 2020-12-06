import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http-hook";

interface UserFollowersProps {
    followers_url: string | undefined;
}

export const UserFollowers: React.FC<UserFollowersProps> = ({
    followers_url,
}) => {
    const [users, setUsers] = useState<any[] | null>([]);

    const { sendRequest } = useHttp();

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const responseData = await sendRequest(
                    `${followers_url}?per_page=5`
                );

                setUsers(responseData);
            } catch (error) {}
        };
        fetchFollowers();
    }, [followers_url, sendRequest]);

    const usersList = users?.map((user) => (
        <li className='users-list__user' key={user.id}>
            <img src={user.avatar_url} alt='' />
            <span>{user.login}</span>
        </li>
    ));

    return (
        <div className='user__followers'>
            <h2>Followers: </h2>
            {usersList?.length === 0 && <p>Nobody is following this user.</p>}
            {usersList}
        </div>
    );
};
