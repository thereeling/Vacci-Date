import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useUserContext } from '../utils/GlobalState';
import { QUERY_ALL_USERS, QUERY_USER } from '../utils/queries';
import { LIKE_USER } from '../utils/mutations'
import { FILTERED_USERS } from '../utils/actions';

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState(0);
    const [likedUsers, setLikedUser] = useState([]);
    const [initialUsers, setInitialUsers] = useState([]);
    const [state, dispatch] = useUserContext();

    const { data: allData, error: allError, loading: allLoading } = useQuery(QUERY_ALL_USERS,{
        pollInterval: 500,
    });
    const { data: meData, error: meError, loading: meLoading } = useQuery(QUERY_USER,{
        pollInterval: 500,
    });
    const [onLikeHandler] = useMutation(LIKE_USER);
    

    useEffect(() => {
        if(allData && meData){
            const filteredUsers = allData.all.filter((user) => {
                if(!user.likedby.includes(meData.me._id) && user._id !== meData.me._id){
                return meData.me.preference.includes(user.gender) 
                && user.preference.includes(meData.me.gender)
                && meData.me.age >= user.agerangemin
                && meData.me.age <= user.agerangemax 
                && user.age >= meData.me.agerangemin 
                && user.age <= meData.me.agerangemax
            }});
            dispatch({
                type: FILTERED_USERS,
                users: filteredUsers
            });
            setInitialUsers(...initialUsers, filteredUsers)
        }  
    }, [meLoading, allLoading, dispatch])


    if (allLoading || meLoading) {
        return <h2>LOADING...</h2>;
    };
    if(allError){
        return `Error: ${allError.message}`
    };
    if(meError){
        return `Error: ${meError.message}`
    };



    const handleUserOnYesClick = () => {
        onLikeHandler({variables: {_id: initialUsers[currentUser]._id}});
        const newCurrentUser = currentUser   
        setLikedUser([...likedUsers, newCurrentUser])
        console.log(initialUsers.length)
        if(initialUsers.length === 1){
            setInitialUsers([]);
            return
        }           
        setCurrentUser(prev => {
            if(prev === initialUsers.length - 1) {
                setLikedUser([]);
                setInitialUsers(initialUsers.filter((user, index) => !likedUsers.includes(index))); 
                return 0
            }
            else {
                return prev + 1;
            }
        });
    };

    const handleUserOnNoClick = () => {
        setCurrentUser(prev => {
            if(prev === initialUsers.length - 1) {
                setLikedUser([]) 
                setInitialUsers(initialUsers.filter((user, index) => !likedUsers.includes(index)))
                return 0
            }
            else {
                return prev + 1;
            }
        });        
    };
  
    const renderUser = () => {
          
        if(!state.users){
            return <h1>LOADING...</h1>
        }
        if(state.users.length === 0 || initialUsers.length === 0){
            return <h1>Sorry! There are no compatible singles for you right now, or you already liked them all!  Please check again later!</h1>
        }
        else{
            return <div className="max-w-sm rounded overflow-hidden shadow-lg">
            {initialUsers[currentUser].img ? <img className="w-full" src={initialUsers[currentUser].img} alt="User Profile picture"/> : <div></div>}
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-1">{initialUsers[currentUser].firstname}</div>
              <div className="font-bold text-l mb-2">{initialUsers[currentUser].age}, {initialUsers[currentUser].gender}</div>
              <p className="text-gray-700 text-base">
              {initialUsers[currentUser].aboutme}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between">
            <button onClick={handleUserOnNoClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-1/3 rounded">
                No Thanks!
            </button>
            
            <button onClick={handleUserOnYesClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-1/3 rounded">
                Yes!
            </button>
            </div>
          </div>
        }
    };
    const renderUserVar = renderUser();

    return (
        <div className="flex items-center justify-around">
            {renderUserVar}
            
        </div>
    );
};

export default Dashboard;