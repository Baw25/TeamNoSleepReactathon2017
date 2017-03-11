import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from './components/App/index.js';
import actionCreators from './actions/index';

function mapStateToProps(state) {
  return {
    userLocation: state.userLocation,
    openTableList: state.openTableList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ReduxApp;