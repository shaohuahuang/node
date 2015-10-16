import {DISPLAY_LYRICS, OPEN_LYRICS} from '../actions/list-action-creator';
import {BACK_TO_LYRICS_LIST, SWITCH_LANG} from '../actions/lyrics-action-creator';

const initialState = {
    lyricsListData: [],
    listDisp: 'block',

    lyricsDisp: 'none',
    lyricsData: [],
    currentLanguage: "English"
};
export default function X(state=initialState, action) {
    switch (action.type){
        case DISPLAY_LYRICS:
            state.lyricsListData = action.lyricsListData;
            break;
        case BACK_TO_LYRICS_LIST:
            console.log('action triggered');
            state.lyricsDisp = 'none';
            state.listDisp = 'block';
            break;
        case OPEN_LYRICS:
            state.lyricsDisp = 'block';
            state.listDisp = 'none';
            state.currentLanguage = action.language;
            state.lyricsData = action.lyricsData;
            break;
        case SWITCH_LANG:
            state.currentLanguage = action.language;
            break;
    }
    return state;
}