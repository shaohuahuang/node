import React from 'react';

class SearchRow extends React.Component{
    constructor(){
        super();
        this.search = this.search.bind(this);
    }

    search(){
        var text = React.findDOMNode(this.refs.search).value;
        this.props.searchLyrics(text);
    }

    render() {
        return (
            <div className = "row">
                <div className="col-lg-11">
                    <div className="input-group">
                        <input id="searchText" ref="search" type="text" className="form-control" placeholder="Search for..." onKeyDown={this.returnToSearch}/>
                        <span className="input-group-btn">
                            <button id="search" className="btn btn-default" type="button" onClick={this.search}>Go!</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchRow;