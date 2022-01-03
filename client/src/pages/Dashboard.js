import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useUserContext } from '../utils/GlobalState';
import { QUERY_ALL_USERS, QUERY_USER } from '../utils/queries';
import { LIKE_USER } from '../utils/mutations'
import { FILTERED_USERS } from '../utils/actions';

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState(0);
    const [state, dispatch] = useUserContext();


    const { data: allData, error: allError, loading: allLoading } = useQuery(QUERY_ALL_USERS,{
        pollInterval: 500,
    });
    const { data: meData, error: meError, loading: meLoading } = useQuery(QUERY_USER,{
        pollInterval: 500,
    });
    const [onLikeHandler, {data, loading, error}] = useMutation(LIKE_USER);
    useEffect(() => {

        if(allData && meData){
            const filteredUsers = allData.all.filter((user) => {
                return meData.me.preference === user.gender && user.preference === meData.me.gender 
                // && meData.me.age >= user.agerangemin && meData.me.age <= user.agerangemax && user.age >= meData.me.agerangemin && user.age <= meData.me.agerangemax
            });
            dispatch({
                type: FILTERED_USERS,
                users: filteredUsers
            });
            
        }  
    }, [meLoading, allLoading, dispatch])

    if (allLoading || meLoading) {
        return <h2>LOADING...</h2>;
    };
    
    const renderUser = () => {
        if(state.users.length === 0 || !state.users){

            return <h1>LOADING...</h1>
        }
        else{
            console.log(state.users)
            return <div>
                     <h1>{state.users[currentUser].firstname}</h1>
                     <h2>{state.users[currentUser].age}</h2>
                     <h3>{state.users[currentUser].gender}</h3>
                   </div>
        }
    };

    const renderUserVar = renderUser();

    const handleUserOnYesClick = () => {
        onLikeHandler({variables: {_id: state.users[currentUser]._id}});
        setCurrentUser(prev => {
            if(prev === state.users.length - 1) {
                return 0
            }
            else {
                return prev + 1;
            }
        });
    };

    const handleUserOnNoClick = () => {
        setCurrentUser(prev => {
            if(prev === state.users.length - 1) {
                return 0
            }
            else {
                return prev + 1;
            }
        });
    };

    return (
        
        <div className="container">
            {renderUserVar}
            <button onClick={handleUserOnYesClick}>YES</button>
            <br/>
            <button onClick={handleUserOnNoClick}>NOOOOOOO</button>
        </div>
    );
};

export default Dashboard;