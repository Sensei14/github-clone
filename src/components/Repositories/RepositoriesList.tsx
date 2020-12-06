import React from "react";
import { RepositoriesListItem } from "./RepositoriesListItem";

interface RepositoriesListProps {
    repos: any[] | null;
}

export const RepositoriesList: React.FC<RepositoriesListProps> = ({
    repos,
}) => {
    const reposList = repos?.map((repo) => (
        <RepositoriesListItem
            key={repo.id}
            id={repo.id}
            description={repo.description}
            commits_url={repo.commits_url}
            created_at={repo.created_at}
            updated_at={repo.updated_at}
            full_name={repo.full_name}
            language={repo.language}
            contributors_url={repo.contributors_url}
            owner_avatar={repo.owner?.avatar_url}
            owner={repo.owner?.login}
            name={repo.name}
        />
    ));

    return <ul className='repos-list'>{reposList}</ul>;
};
