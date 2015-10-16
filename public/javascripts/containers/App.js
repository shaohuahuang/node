import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import List from '../components/list';
import * as listActions from '../actions/list-action-creator';
import * as lyricsActions from '../actions/lyrics-action-creator';
import assign from 'object-assign';

function mapStateToProps(state) {
    return {
        lyricsListData: state.reducer.lyricsListData,
        listDisp: state.reducer.listDisp,

        lyricsDisp: state.reducer.lyricsDisp,
        lyricsData: state.reducer.lyricsData,
        currentLanguage: state.reducer.currentLanguage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(assign(listActions,lyricsActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);