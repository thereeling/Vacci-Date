import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_USERS, QUERY_USER } from '../utils/queries'

const Home = () => {
    const useQueryAllUsers = () => {
        const { data } = useQuery(QUERY_ALL_USERS);
        let all
        if(data){
            all = data.all
        }
        return all;
    };
    const useQueryMe = () => {
        const { data } = useQuery(QUERY_USER);
        let me
        if(data){
            me = data.me
        }
        return me;
    };
    const all = useQueryAllUsers();
    const me = useQueryMe();
    console.log(all);
    console.log(me.preference);
    
    // const filteredUsers = all.filter(user => me.preference);
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