import { TuringMachine } from './machine';
import { State } from './state';

let states = configureStates(6);
configureTransitionsForStates(states);

let machine = new TuringMachine(states);
machine.runMachine('bbbab');

function configureStates(count: number): State[] {
  let states: State[] = [];
  for(let i = 0; i < count; i++) {
    states.push(new State('q' + i))
  }
  states[0].isStartState = true;
  states[1].isEndState = true;
  states[5].isEndState = true;
  return states;
}

function configureTransitionsForStates(states: State[]) {
  states[0].transitions = [{ read: 'a', write: 'a', goRoL: 'L', nextState: states[1] }, { read: 'b', write: '#', goRoL: 'R', nextState: states[2] }];
  states[1].transitions = [{ read: undefined, write: 'a', goRoL: 'L', nextState: states[1] }];
  states[2].transitions = [{ read: 'b', write: 'b', goRoL: 'R', nextState: states[3] }];
  states[3].transitions = [{ read: 'b', write: 'b', goRoL: 'R', nextState: states[3] }, { read: 'a', write: 'b', goRoL: 'L', nextState: states[4] }];
  states[4].transitions = [{ read: 'b', write: 'a', goRoL: 'L', nextState: states[5] }];
  states[5].transitions = [{ read: '#', write: 'a', goRoL: 'R', nextState: states[2] }];
}