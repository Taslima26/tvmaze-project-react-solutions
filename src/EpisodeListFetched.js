import React, { useState, useEffect } from "react";

import EpisodeListSearchable from './EpisodeListSearchable';


function EpisodeListFetched(props) {
    const showId = props.showId;

    //STATE HOOK: the fetched episodes - initially none
    const [episodes, setEpisodes] = useState([]);

    //STATE HOOK: boolean - is the data loading or not?
    const [loading, setLoading] = useState(false);

    //EFFECT HOOK: Fetch episodes from API on component mount, only.
    useEffect(() => {
        fetchEpisodesForShow(showId)
    }, [showId]); //Note: IMPORTANT don't forget [] as last param so 
    //      that useEffect does not execute on any state change
    //      (INCLUDING the one it instigates)


    async function fetchEpisodesForShow(showId) {
        setLoading(true);
        const result = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
        //Note: we should handle errors here
        const json = await result.json();
        setEpisodes(json);
        setLoading(false);
    };

    return loading ?
        <div className="loading" > Loading episodes...</div>
        : <EpisodeListSearchable episodes={episodes} />;
}


export default EpisodeListFetched;
