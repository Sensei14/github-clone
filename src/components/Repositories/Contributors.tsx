import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http-hook";

interface ContributorsProps {
    contributors_url: string | undefined;
}

export const Contributors: React.FC<ContributorsProps> = ({
    contributors_url,
}) => {
    const [contributors, setContributors] = useState<any[]>([]);
    const { sendRequest } = useHttp();

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const responseData = await sendRequest(
                    contributors_url + "?per_page=12"
                );

                setContributors(responseData);
            } catch (error) {}
        };
        fetchContributors();
    }, [sendRequest, contributors_url]);

    const contributorsList = contributors.map((item) => (
        <li key={item.id} className='contributors__list-item'>
            <img src={item.avatar_url} alt='' />
            <span>{item.login}</span>
        </li>
    ));

    return (
        <div className='contributors'>
            <h2> Contributors:</h2>
            <ul className='contributors__list'>{contributorsList}</ul>
        </div>
    );
};
