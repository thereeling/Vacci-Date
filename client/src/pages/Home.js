import React from 'react';



const Home = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 md: grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="col-span-2">
                <img className="block h-auto w-full" src="./images/disco-love.png" alt="couple bike ride"></img>
            </div>
            <div className="">
                <img className="block h-auto w-full" src="./images/women-kiss.png" alt="couple bike ride"></img>
            </div>
            <div className="">
                <img className="block h-auto w-full" src="./images/coffee-hearts.png" alt="couple bike ride"></img>
            </div>
            <div className="col-span-2">
                <img className="block h-auto w-full" src="./images/masks.png" alt="couple bike ride"></img>
            </div>
            <div className="col-span-2">
                <img className="block h-auto w-full" src="./images/same-sex.png" alt="couple bike ride"></img>
            </div>
            </div>

        </div>
    );
};

export default Home;
    