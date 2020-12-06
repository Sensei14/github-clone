import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useHttp } from "../../hooks/http-hook";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUsers, faBook } from "@fortawesome/free-solid-svg-icons";
import { UserFollowers } from "./UserFollowers";
import { UserCard } from "./UserCard";
import { UserRepos } from "./UserRepos";
import { Link } from "react-router-dom";

type UserDetailsParams = {
    login: string;
};

type UserDetailsProps = RouteComponentProps<UserDetailsParams>;

interface User {
    login: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
    twitter_username: string;
    bio: string;
    company: string;
    blog: string;
    name: string;
    location: string;
    followers_url: string;
    following_url: string;
    repos_url: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ match }) => {
    const [user, setUser] = useState<User | null>(null);

    const { sendRequest, isLoading } = useHttp();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responsData = await sendRequest(
                    `https://api.github.com/users/${match.params.login}`
                );
                setUser(responsData);
            } catch (error) {}
        };

        fetchUser();
    }, [match.params.login, sendRequest]);

    if (!isLoading && !user) {
        return <div className='user'>User doesn't exist.</div>;
    }

    return (
        <div className='user'>
            <Link to='/ ' className='return-btn'>
                Return
            </Link>
            <div className='user__numbers'>
                <div className='user__numbers--card'>
                    <FontAwesomeIcon icon={faBook} size='3x' color='#05668d' />
                    <div>
                        <span>{user?.public_repos}</span>
                        <span>Repos </span>
                    </div>
                </div>
                <div className='user__numbers--card'>
                    <FontAwesomeIcon icon={faUsers} size='3x' color='#05668d' />
                    <div>
                        <span>{user?.followers}</span>
                        <span>Followers</span>
                    </div>
                </div>
                <div className='user__numbers--card'>
                    <FontAwesomeIcon
                        icon={faUserPlus}
                        size='3x'
                        color='#05668d'
                    />
                    <div>
                        <span>{user?.following}</span>
                        <span>Following</span>
                    </div>
                </div>
            </div>
            <div className='user__row'>
                <UserCard
                    avatar_url={user?.avatar_url}
                    name={user?.name}
                    login={user?.login}
                    bio={user?.bio}
                    company={user?.company}
                    location={user?.location}
                    blog={user?.blog}
                />
                <UserFollowers followers_url={user?.followers_url} />
            </div>

            <UserRepos repos_url={user?.repos_url} />
        </div>
    );
};

export default withRouter(UserDetails);
