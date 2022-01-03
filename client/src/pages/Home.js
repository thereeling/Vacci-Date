import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_USERS, QUERY_USER } from '../utils/queries'

const Home = () => {
        // const { data: allData, error: allError, loading: allLoading } = useQuery(QUERY_ALL_USERS, {
        //     pollInterval: 500,
        // });
        // const { data: meData, error: meError, loading: meLoading } = useQuery(QUERY_USER, {
        //     pollInterval: 500,
        // });
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
        // console.log(all)
        // console.log(me)

        // const filteredUsers = all.filter((user) => {
        //     return me.preference === user.gender && user.preference === me.gender
        // });
        // console.log(filteredUsers);
    
    


    /*
    We have to filter ALL users based on the logged in users preference.  In our case, 'preference' will just be gender, agerangemin, and agerangemax (maybe hobbies). We can then use this filtered array for the users experience.
    */

    return (
        <div className="container">

        </div>
    );
};

export default Home;