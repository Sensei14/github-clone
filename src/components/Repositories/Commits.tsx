import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http-hook";

interface CommitsProps {
    commits_url: string | undefined;
}

export const Commits: React.FC<CommitsProps> = ({ commits_url }) => {
    const [commits, setCommits] = useState<any[]>([]);

    const { sendRequest } = useHttp();

    useEffect(() => {
        const fetchCommits = async () => {
            try {
                const url = commits_url?.substring(0, commits_url.length - 6);
                const responseData = await sendRequest(url + "?per_page=10");
                setCommits(responseData);
            } catch (error) {}
        };

        fetchCommits();
    }, [sendRequest, commits_url]);

    const commitsList = commits.map((commit) => (
        <li key={commit.url} className='commit'>
            <div>
                <span>Author: {commit.commit.author.name}</span>

                <p>
                    <label>Commit message: </label>

                    {commit.commit.message}
                </p>
            </div>
        </li>
    ));

    return (
        <div className='repo__commits'>
            <h2>Commits: </h2>
            <ul className='commits-list'>{commitsList}</ul>
        </div>
    );
};
