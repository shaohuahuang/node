import React from 'react';
import _ from 'underscore';
import jquery from 'jquery';

class Lyric extends React.Component{
    constructor(){
        super();
        this.getCurrentItem = this.getCurrentItem.bind(this);
    }

    getCurrentItem(){
        return _.find(this.props.lyricsData, function (item) {
            return item.language == this.props.currentLanguage;
        }.bind(this));
    }

    render() {
        const {switchLang} = this.props;
        return (
            <div style={{position: 'relative',top: '-40px', display: this.props.lyricsDisp}}>
                <ul className="nav nav-pills" style={{margin: 'auto'}}>
                    <li role="presentation" className="inactive" style={{cursor: 'pointer'}}>
                        <a onClick={switchLang.bind(null,"English")}>English</a>
                    </li>
                    <li role="presentation" className="inactive" style={{cursor: 'pointer'}}>
                        <a onClick={switchLang.bind(null,"Chinese")}>Chinese</a>
                    </li>
                    <li role="presentation" className="inactive" style={{cursor: 'pointer'}}>
                        <a onClick={switchLang.bind(null,"Korean")}>Korean</a>
                    </li>
                    <li role="presentation" className="inactive" style={{cursor: 'pointer'}}>
                        <a onClick={this.props.backToLyricsList}>Home</a>
                    </li>
                </ul>
                <LyricContent item={this.getCurrentItem()}/>
            </div>
        );
    }
};

class LyricContent extends React.Component{
    /*getHtml: function(arr) {
        var rows = [];
        arr.forEach(function(e){
            rows.push(e);
            rows.push(<br />);
        });
        return rows;
    },*/
    constructor(){
        super();
        this.getContent = this.getContent.bind(this);
    }

    getContent(){
        if(this.props.item){
            return this.props.item.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
        return "";
    }

    render(){
        var self = this;
        return(
            <div id="lyric" style={{textAlign:"center"}} dangerouslySetInnerHTML={{__html: self.getContent()}}>
            </div>
        );
    }
};


module.exports = Lyric;