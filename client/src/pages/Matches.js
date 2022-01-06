import React from 'react';
import Auth from '../utils/auth';
import { QUERY_ALL_USERS, QUERY_USER } from '../utils/queries';
import { UNLIKE_USER } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';



export default function Matches() {
    const {loading: meLoading, error: meError, data: meData} = useQuery(QUERY_USER, {
      pollInterval: 500,
    });
    const {loading: allLoading, error: allError, data: allData} = useQuery(QUERY_ALL_USER, {
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
              {allData.all.map((match) => (
                <div key={match.id} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={match.imageSrc}
                      alt={match.imageAlt}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={match.href}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {match.name}
                        </a>
                      </h3> 
                    </div>
                    <p className="text-sm font-medium text-gray-900">{match.age}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
}