import { keysSelector } from 'react-keys';
import { connect } from 'react-redux';
import CarparkView from '../components/carpark';

const mapStateToProps = (state) => ({
  busState: state.carpark.carpark.busState
});

const Carpark = connect(() => keysSelector('OneBinderId'))(connect(mapStateToProps)(CarparkView));

export default Carpark;
