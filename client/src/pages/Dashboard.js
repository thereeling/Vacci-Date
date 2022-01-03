import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useUserContext } from '../utils/GlobalState';
import { QUERY_ALL_USERS, QUERY_USER } from '../utils/queries'
import { FILTERED_USERS } from '../utils/actions';

const Dashboard = () => {
    const [state, dispatch] = useUserContext();

    const { data: allData, error: allError, loading: allLoading } = useQuery(QUERY_ALL_USERS, {
        pollInterval: 500,
    });
    const { data: meData, error: meError, loading: meLoading } = useQuery(QUERY_USER, {
        pollInterval: 500,
    });
    useEffect(() => {
        if(allData && meData){
            const filteredUsers = allData.all.filter((user) => {
                return meData.me.preference === user.gender && user.preference === meData.me.gender && meData.me.age >= user.agerangemin && meData.me.age <= user.agerangemax && user.age >= meData.me.agerangemin && user.age <= meData.me.agerangemax
            });
            dispatch({
                type: FILTERED_USERS,
                users: filteredUsers
            });
            
        }  
}, [meLoading, allLoading, dispatch])
console.log(state.users)
    // if (allLoading || meLoading) {
    //     return <h2>LOADING...</h2>;
    // };
    // let all;
    // let me;
    // if(allData) {
    //     all = allData.all;
    // }
    // if(meData) {
    //     me = meData.me
    // }



/*
We have to filter ALL users based on the logged in users preference.  In our case, 'preference' will just be gender, agerangemin, and agerangemax (maybe hobbies). We can then use this filtered array for the users experience.
*/
    return (
        <div className="container">
        </div>
    );
};

export default Dashboard;