export const DISPLAY_LYRICS = 'DISPLAY_LYRICS';
export const OPEN_LYRICS = 'OPEN_LYRICS';
import jquery from 'jquery';

export function openLyrics(data, language){
    return {
        type: OPEN_LYRICS,
        language: language,
        lyricsData: data
    }
}

export function getLyricsInAllLanguages(code, language){
    return dispatch => {
        jquery.ajax({
            url: '/open-lyrics?code=' + code,
            dataType: 'json',
            type: 'GET',
            success: function(data){
                console.log(data);
                dispatch(openLyrics(data, language));
            }
        })
    }
}


export function displayLyrics(data){
    return {
        type: DISPLAY_LYRICS,
        lyricsListData: data
    }
}

export function searchLyrics(text){
    return dispatch => {
        jquery.ajax({
            url: '/search?searchText='+text,
            dataType: 'json',
            type: 'GET',
            success: function(data){
                dispatch(displayLyrics(data));
            }
        })
    }
}