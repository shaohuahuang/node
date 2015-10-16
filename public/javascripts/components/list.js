import React from 'react';
import SearchRow from './search-row';
import LyricsList from './lyrics-list';
import Lyrics from './lyrics';

class List extends React.Component{
    render(){
        const {listDisp, lyricsDisp, lyricsListData, currentLanguage, lyricsData} = this.props;
        const { searchLyrics, backToLyricsList, getLyricsInAllLanguages,switchLang} = this.props;
        console.log(lyricsData);
        return (
            <div>
                <div style={{display: listDisp}}>
                    <SearchRow searchLyrics={searchLyrics} />
                    <LyricsList {...{lyricsListData,getLyricsInAllLanguages}} />
                </div>
                <Lyrics {...{backToLyricsList,lyricsDisp,currentLanguage,lyricsData,switchLang}}/>
            </div>
        );
    }
}
export default List;
