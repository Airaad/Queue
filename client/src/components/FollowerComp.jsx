import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function FollowerComp(props) {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch("/api/user/profile/" + props.follower);
				const data = await res.json();
				if (data.error) {
					setErrorMessage(data.message);
					return;
				}
				setUser(data);
			} catch (error) {
				setErrorMessage(error);
				setUser(null);
			}
		};

		getUser();
	}, [props.follower]);

    if(!user){
        return null;
    }
  return (
    <div>
    <div className='text-3xl my-6'>
        <Link to={`/${user.username}`}>
    <div className='flex items-center justify-center gap-5'>
        <div className='w-10 h-10 self-center'>
                <img src={user.profilePicture} alt='user' className="rounded-full w-full h-full object-cover border-2 border-[teal]"/>
        </div>

        <div>
        <span>{user.username}</span>
        </div>

    </div>
        </Link>
    </div>
    </div>
  )
}
