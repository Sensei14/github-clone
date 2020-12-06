import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { useHttp } from "../../hooks/http-hook";
import { Commits } from "./Commits";
import { Contributors } from "./Contributors";

type RepositoryDetailsParams = {
    owner: string;
    name: string;
};

type RepositoryDetailsProps = RouteComponentProps<RepositoryDetailsParams>;

interface Repo {
    owner: any;
    full_name: string;
    description: string;
    language: string;
    contributors_url: string;
    commits_url: string;
}

const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({ match }) => {
    const owner = match.params.owner;
    const name = match.params.name;

    const [repo, setRepo] = useState<Repo | null>(null);

    const { sendRequest } = useHttp();

    useEffect(() => {
        const fetchRepo = async () => {
            try {
                const responseData = await sendRequest(
                    `https://api.github.com/repos/${owner}/${name}`
                );

                setRepo(responseData);
            } catch (error) {}
        };

        fetchRepo();
    }, [owner, name, sendRequest]);

    return (
        <div className='repo'>
            <Link to='/ ' className='return-btn'>
                Return
            </Link>
            <div className='repo__row'>
                <div className='repo__info'>
                    <div>
                        <img src={repo?.owner.avatar_url} alt='' />
                        <span>{repo?.full_name}</span>
                    </div>
                    <p className='repo-desc'>{repo?.description}</p>

                    <span>Language: {repo?.language}</span>
                </div>

                <Contributors contributors_url={repo?.contributors_url} />
            </div>

            <div className='repo__row'>
                <Commits commits_url={repo?.commits_url} />
            </div>
        </div>
    );
};

export default withRouter(RepositoryDetails);
