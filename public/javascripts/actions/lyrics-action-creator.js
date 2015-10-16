export const BACK_TO_LYRICS_LIST = 'BACK_TO_LYRICS_LIST';
export const SWITCH_LANG = 'SWITCH_LANG';
import jquery from 'jquery';

export function backToLyricsList(){
    return {
        type: BACK_TO_LYRICS_LIST
    }
}

export function switchLang(language){
    return {
        type: SWITCH_LANG,
        language: language
    }
}