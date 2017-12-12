import { Keys } from 'react-keys';
import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import { NORTH, EAST, SOUTH, WEST } from '../actions/actions';
import { MAX_X, MAX_Y } from '../actions/actions';


let createHandlers = function(dispatch) {
  let onUp = () => { dispatch(actions.cmdMove()) };
  let onLeft = () => { dispatch(actions.cmdLeft()) };
  let onRight = () => { dispatch(actions.cmdRight()) };
  let onPlace = () => {
    dispatch(actions.cmdPlace(
      Math.floor((Math.random() * (MAX_X+1))),
      Math.floor((Math.random() * (MAX_Y+1))),
      NORTH
    ))
  };
  return { onUp, onLeft, onRight, onPlace };
}


const printDirection = (f) => {
  if (f === NORTH) { return "↑" }
  if (f === EAST) { return "→" }
  if (f === SOUTH) { return "↓" }
  if (f === WEST) { return "←" }
}


const printBus = (i, j, x, y, f) => {
  return ((i === x) && (j === y)) ? printDirection(f) : "·";
}


class CarparkRow extends Component {
  render() {
    return (
      <tr>
        {Array.apply(null, Array(MAX_X+1)).map(
          (cell, index) => {
            return (
              <td>
                { printBus(
                    index,
                    this.props.rowIndex,
                    this.props.busState.p.x,
                    this.props.busState.p.y,
                    this.props.busState.d
                  )
                }
              </td>
            );
          }
        )}
      </tr>
    )
  }
}


class CarparkMap extends Component {
  render() {
    return (
      <table>
        <tbody>
          {Array.apply(null, Array(MAX_Y+1)).map(
            (row, index) => { return <CarparkRow rowIndex={MAX_Y-index} busState={this.props.busState} />; }
          )}
        </tbody>
      </table>
    )
  }
}


class CarparkView extends Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
  }

  render() {
    return (
      <div className="row">

        <h3>Keys to control bus:</h3>
        <pre>
          <ul>
            <li>Place bus in a random location (do this first!):<kbd>↩ [Enter]</kbd></li>
            <li>Move forward:<kbd>↑</kbd></li>
            <li>Change direction -90°:<kbd>←</kbd></li>
            <li>Change direction +90°:<kbd>→</kbd></li>
          </ul>
        </pre>

        <h3>Current bus position:</h3>
        <pre>
          <b>X</b>{ this.props.busState.p.x !== null ? this.props.busState.p.x : '-' }
          <b>Y</b>{ this.props.busState.p.y !== null ? this.props.busState.p.y : '-' }
          <b>F</b>{ this.props.busState.d }
        </pre>

        <pre>
          <CarparkMap busState={this.props.busState} />
        </pre>

        <Keys id="rk"
          onUp={ () => { console.log(this.props); this.handlers.onUp() } }
          onLeft={ this.handlers.onLeft }
          onRight={ this.handlers.onRight }
          onEnter={ this.handlers.onPlace }
        />

      </div>
    )
  }
}


CarparkRow.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  busState: PropTypes.object.isRequired,
};

CarparkMap.propTypes = {
  busState: PropTypes.object.isRequired,
};

CarparkView.propTypes = {
  busState: PropTypes.object.isRequired,
};

export default CarparkView;
