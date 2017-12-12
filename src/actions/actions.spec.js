import * as actions from './actions';
import {
  CMD_REPORT,
  CMD_PLACE,
  CMD_MOVE,
  CMD_LEFT,
  CMD_RIGHT
} from './actions';
import { NORTH, EAST, SOUTH, WEST } from './actions';


describe('Before cmdPlace is executed', () => {

  it('cmdMove does not change state', () => {
    ((st) => { expect(actions.cmdMove()['busState']).toEqual(st['busState']) })(actions.cmdReport())
  })

});


describe('App actions', () => {

  it('cmdReport should create CMD_REPORT action', () => {
    expect(actions.cmdReport()['type']).toEqual(CMD_REPORT)
  })

  it('cmdPlace should create CMD_PLACE action', () => {
    expect(actions.cmdPlace(1, 2, NORTH)['type']).toEqual(CMD_PLACE)
  })

  it('cmdMove should create CMD_MOVE action', () => {
    expect(actions.cmdMove()['type']).toEqual(CMD_MOVE)
  })

  it('cmdLeft should create CMD_LEFT action', () => {
    expect(actions.cmdLeft()['type']).toEqual(CMD_LEFT)
  })

  it('cmdRight should create CMD_RIGHT action', () => {
    expect(actions.cmdRight()['type']).toEqual(CMD_RIGHT)
  })

});


describe('After cmdPlace is executed', () => {

  it('cmdPlace should return bus state correctly', () => {
    expect(actions.cmdPlace(1, 2, NORTH)['busState']).toEqual({p: {x: 1, y: 2}, d: NORTH})
  })

  it('cmdLeft should return bus state correctly', () => {
    (() =>
      { expect(actions.cmdLeft()['busState']).toEqual({p: {x: 1, y: 2}, d: WEST}) })
      (actions.cmdPlace(1, 2, NORTH))
  })

  it('cmdRight should return bus state correctly', () => {
    (() =>
      { expect(actions.cmdRight()['busState']).toEqual({p: {x: 1, y: 2}, d: EAST}) })
      (actions.cmdPlace(1, 2, NORTH))
  })

  it('cmdMove should return bus state correctly', () => {
    (() =>
      { expect(actions.cmdMove()['busState']).toEqual({p: {x: 1, y: 3}, d: NORTH}) })
      (actions.cmdPlace(1, 2, NORTH))
  })

});


describe('After bus has reached carpark boundary', () => {

  it('cmdMove should return bus state correctly', () => {
    ((st) =>
      { expect(actions.cmdMove()['busState']).toEqual({p: {x: 4, y: 2}, d: EAST}) })
      (actions.cmdPlace(4, 2, EAST)['busState'])
  })

})
