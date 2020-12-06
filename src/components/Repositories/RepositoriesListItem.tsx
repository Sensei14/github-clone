import React from "react";
import { Link } from "react-router-dom";

interface RepositoriesListItemProps {
    id: number;
    description: string;
    commits_url: string;
    created_at: string;
    updated_at: string;
    full_name: string;
    language: string;
    contributors_url: string;
    owner_avatar: string;
    owner: string;
    name: string;
}

export const RepositoriesListItem: React.FC<RepositoriesListItemProps> = ({
    id,
    description,
    full_name,
    language,
    owner_avatar,
    owner,
    name,
}) => {
    return (
        <Link to={`/repos/${owner}/${name}`}>
            <li className='repos-list__item'>
                <div className='repo-info'>
                    <div>
                        <img src={owner_avatar} alt='' />
                        <span>{full_name}</span>
                    </div>
                    <p className='repo-desc'>{description}</p>

                    <span>Language: {language}</span>
                </div>
            </li>
        </Link>
    );
};
