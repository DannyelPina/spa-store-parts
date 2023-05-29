
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const API_KEY = process.env.REACT_APP_API_KEY;
export const ENDPOINT = {
    TEAM_STATS: "api/TeamStatsFunction",
    PLAYER_STATS: "api/PlayerStatsFunction",
    TEAMS: "api/GetTeamsFunction",
    PLAYERS: "api/GetPlayersFunction",
    INDICATORS: "api/GetIndicatorsFunction",
    EDITIONS: "api/GetEditionsFunction",
    COMPETITIONS: "api/GetCompetitionsFunction",
    GET_PLAYERS: "api/GetPlayersFunction",
    GET_TEAMS: "api/GetTeamsFunction",
    PLAYER_HEAD_TO_HEAD: "api/PlayerHeadToHeadFunction",
    TEAM_HEAD_TO_HEAD: "api/TeamHeadToHeadFunction",
}
export const PAGINATION = {
    RECORD_PER_PAGE: 20,
}

export const SWRThirdParams = {
    revalidateOnFocus: false,    
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
}

export const fetcher = async (url: string | undefined, key: string | undefined) => {
    const options: any = {
        method: "GET",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "x-functions-key": key
        },
    };

    const res = await fetch(`${BASE_URL}/${url}`, options);
    return await res.json();
};