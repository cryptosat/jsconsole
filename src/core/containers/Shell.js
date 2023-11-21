import { connect } from 'react-redux';
import Shell from '../components/Shell';
import StoreContext from '../stores/StoreContext';
import { setTheme, setLayout } from '../actions/Settings';

export default connect(
  ({settings}, ownProps) => ({ layout: settings.layout, theme: ownProps.theme !== undefined ? ownProps.theme : settings.theme }),
  { setTheme, setLayout },
  null,
  { context: StoreContext })(Shell);