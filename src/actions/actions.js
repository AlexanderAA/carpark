/* Implements bus driving logic and corresponding actions */


// Requirement: 5x5 carpark.
// Counting from 0
export const MAX_X = 4;
export const MAX_Y = 4;

export const NORTH = 'NORTH';
export const EAST = 'EAST';
export const SOUTH = 'SOUTH';
export const WEST = 'WEST';


// This is our local state, only for bus position/direction tracking,
// and it would be much better (in terms of potential
// functionality of the app at least) to implement it properly with
// react dispatch/getState rather than like this.

// Requirement: Initial bus position unknown/undefined
let stPosition = {x: null, y: null};
let stDirection = NORTH;


var guard = function (position) {
  if (position.x === null) { return {x: null, y:null} }
  if (position.y === null) { return {x: null, y:null} }
  if (position.x < 0) { return {x: 0, y: position.y} }
  if (position.y < 0) { return {x: position.x, y: 0} }
  if (position.x > MAX_X) { return {x: MAX_X, y: position.y} }
  if (position.y > MAX_Y) { return {x: position.x, y: MAX_Y} }
  return position
}


export const report = () => {
  return { p: stPosition, d: stDirection }
}


export const place = (x, y, f) => {
  stPosition = {x:x, y:y};
  stDirection = f;
  return report()
}


export const move = () => {
  switch (stDirection) {
    case NORTH:
      stPosition = guard({x: stPosition.x, y: stPosition.y+1});
      break;
    case SOUTH:
      stPosition = guard({x: stPosition.x, y: stPosition.y-1});
      break;
    case EAST:
      stPosition = guard({x: stPosition.x+1, y: stPosition.y});
      break;
    case WEST:
      stPosition = guard({x: stPosition.x-1, y: stPosition.y});
      break;
  };
  return report()
}


export const right = () => {
  switch (stDirection) {
    case NORTH:
      stDirection = EAST;
      break;
    case EAST:
      stDirection = SOUTH;
      break;
    case SOUTH:
      stDirection = WEST;
      break;
    case WEST:
      stDirection = NORTH;
      break;
  };
  return report()
}


export const left = () => {
  switch (stDirection) {
    case NORTH:
      stDirection = WEST;
      break;
    case WEST:
      stDirection = SOUTH;
      break;
    case SOUTH:
      stDirection = EAST;
      break;
    case EAST:
      stDirection = NORTH;
      break;
  };
  return report()
}


export const CMD_PLACE = 'CMD_PLACE';
export function cmdPlace(x, y, f) {
  console.log(CMD_PLACE, x, y, f);
  return {
    type: CMD_PLACE,
    busState: place(x, y, f)
  };
};


export const CMD_LEFT = 'CMD_LEFT';
export function cmdLeft(position) {
  console.log(CMD_LEFT);
  return {
    type: CMD_LEFT,
    busState: left()
  };
};


export const CMD_RIGHT = 'CMD_RIGHT';
export function cmdRight(position) {
  console.log(CMD_RIGHT);
  return {
    type: CMD_RIGHT,
    busState: right()
  };
};


export const CMD_MOVE = 'CMD_MOVE';
export function cmdMove(position) {
  console.log(CMD_MOVE);
  return {
    type: CMD_MOVE,
    busState: move()
  };
};


export const CMD_REPORT = 'CMD_REPORT';
export function cmdReport(position) {
  return {
    type: CMD_REPORT,
    busState: report()
  };
};
