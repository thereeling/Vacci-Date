import React from 'react';
import Auth from '../utils/auth';
import { QUERY_ALL_USERS, QUERY_USER } from '../utils/queries';
import { UNLIKE_USER } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';



export default function Matches() {
    const {data: meData, loading: meLoading, error: meError } = useQuery(QUERY_USER, {
      pollInterval: 500,
    });
    const { data: allData, loading: allLoading, error: allError } = useQuery(QUERY_ALL_USERS, {
      pollInterval: 500,
    });
    const [unlikeUser] = useMutation(UNLIKE_USER);

    if (meLoading || allLoading) {
      return <h2>LOADING...</h2>;
    };

    if(meError) {
      return `Error! ${meError.message}`
    };
    if(allError) {
      return `Error! ${allError.message}`
    };

    const handleUnlikeUser = async (Id) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        await unlikeUser({variables: {_id: Id}});
  
      } catch (err) {
        console.error(err);
      }
    };

    return (
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {meData.me.matches.length
            ? `Viewing ${meData.me.matches.length} current ${meData.me.matches.length === 1 ? 'match' : 'matches'}:`
            : 'You have no matches!'}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {allData.all.map((user) => {
                if(user.matches.includes(meData.me._id)){
                //   return <div className="group relative">
                //   <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                //   {user.img ? <img className="w-full h-full object-center object-cover lg:w-full lg:h-full" src={user.img} alt="User Profile picture"/> : <div></div>}   
                //   </div>
                //   <div className="mt-4 flex justify-between">
                //     <div>
                //       <h3 className="text-sm text-gray-700">
               
                //           {user.firstname}
                        
                //       </h3> 
                //     </div>
                //     <p className="text-sm font-medium text-gray-900">{user.age}</p>
                //   </div>
                // </div>
                return <div className="max-w-sm rounded overflow-hidden shadow-lg">
                {user.img ? <img className="w-full h-full object-center object-cover lg:w-full lg:h-full" src={user.img} alt="User Profile picture"/> : <div></div>}    
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-1">{user.firstname}</div>
                    <div className="font-bold text-l mb-2">{user.age}, {user.gender}</div>
                    <p className="text-gray-700 text-base">
                    {user.aboutme}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2 flex justify-between">
                <button onClick={() => handleUnlikeUser(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-1/3 rounded">
                    Unlike
                </button>
                </div>
              </div>
                }
              })}
            </div>
          </div>
        </div>
      )
};