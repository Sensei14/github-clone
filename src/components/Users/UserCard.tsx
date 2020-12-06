import React from "react";
import {
    faBuilding,
    faLink,
    faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface UserCardProps {
    login: string | undefined;
    avatar_url: string | undefined;
    bio: string | undefined;
    company: string | undefined;
    blog: string | undefined;
    name: string | undefined;
    location: string | undefined;
}

export const UserCard: React.FC<UserCardProps> = ({
    avatar_url,
    name,
    login,
    bio,
    company,
    location,
    blog,
}) => {
    return (
        <>
            <div className='user__info'>
                <div className='user__info--personal'>
                    <img src={avatar_url} alt='' />
                    <div>
                        <span className='name'>{name}</span>
                        <span className='login'>{login}</span>
                        <p>{bio}</p>
                    </div>
                </div>
                <div className='user__info--nonpersonal'>
                    {company && (
                        <span>
                            <FontAwesomeIcon
                                icon={faBuilding}
                                size='lg'
                                className='icon'
                                color='#05668d'
                            />
                            {company}
                        </span>
                    )}
                    {location && (
                        <span>
                            <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                size='lg'
                                className='icon'
                                color='#05668d'
                            />
                            {location}
                        </span>
                    )}

                    {blog && (
                        <span>
                            <FontAwesomeIcon
                                icon={faLink}
                                size='lg'
                                className='icon'
                                color='#05668d'
                            />
                            <a href={blog}>{blog}</a>
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};
