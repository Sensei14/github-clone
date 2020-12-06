import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/http-hook";

interface UserReposProps {
    repos_url: string | undefined;
}

export const UserRepos: React.FC<UserReposProps> = ({ repos_url }) => {
    const [repos, setRepos] = useState<any[]>([]);

    const { sendRequest } = useHttp();

    useEffect(() => {
        const fetchRepos = async () => {
            const responseData = await sendRequest(repos_url + "?per_page=6");

            setRepos(responseData);
        };

        fetchRepos();
    }, [repos_url, sendRequest]);

    const reposList = repos?.map((repo) => (
        <Link to={`/repos/${repo.owner.login}/${repo.name}`} key={repo.id}>
            <li className='repos-list__item'>
                <div className='repo-info'>
                    <div>
                        <img src={repo.owner.avatar_url} alt='' />
                        <span>{repo.full_name}</span>
                    </div>
                    <p className='repo-desc'>{repo.description}</p>

                    <span>Language: {repo.language}</span>
                </div>
            </li>
        </Link>
    ));

    return (
        <div className='user__repos'>
            <h2>Repositories:</h2>

            {reposList.length === 0 && (
                <p>Not found any repositories for this user.</p>
            )}

            <ul className='repos-list'>{reposList}</ul>
        </div>
    );
};
