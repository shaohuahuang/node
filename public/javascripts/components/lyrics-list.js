import React from 'react';
class LyricsList extends React.Component{
    render() {
        var self = this;
        var rows=[];
        this.props.lyricsListData.forEach(function(e){
            rows.push(<LyricEntry data={e} getLyricsInAllLanguages={self.props.getLyricsInAllLanguages}/>);
        });

        return (
            <div id="LyricsList" style={{position:'relative',top:'-40px'}}>
                {rows}
            </div>
        );
    }
};

class LyricEntry extends React.Component{
    constructor(){
        super();
        this.openLyrics = this.openLyrics.bind(this);
    }

    openLyrics(){
        this.props.getLyricsInAllLanguages(this.props.data.code, this.props.data.language);
    }

    render() {
        const entryStyle = {padding:'20px 15px', cursor: 'pointer'};
        return (
            <div className="panel panel-info" style={{marginBottom:'0px'}}>
                <div className="panel-heading" style={entryStyle} onClick={this.openLyrics}>
                    <span className="group">
                        <b>{this.props.data.title}</b>
                    </span>
                </div>
            </div>
        );
    }
};

export default LyricsList;