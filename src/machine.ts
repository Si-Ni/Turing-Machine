import { State } from './state';

class TuringMachine {
  private currentState: State;
  private startState: State;
  private stepCounter: number;
  private posHead: number;
  private states: State[];
  private tape: string[];

  constructor(states: State[]) {
    this.states = states;
    let result = this.getStartState();
    if (result) {
      this.startState = result;
    } else {
      throw new Error('Ungültige Anzahl von Startzuständen. Die Maschine ist nicht bereit zur Anwendung');
    }
  }

  public runMachine(word: string) {
    this.configureTape(word);
    if (this.startState) {
      this.currentState = this.startState;
    } else {
      throw new Error('Es konnte kein Startzustand gefunden werden.');
    }
    this.stepCounter = 0;
    this.checkNextTransition();
  }

  private configureTape(word: string) {
    this.posHead = 0;
    this.tape = [];
    for(let i = 0; i < word.length; i++) {
      this.posHead = i;
      this.tape[this.posHead] = word[i];
    }
    console.log(this.tape);
    this.posHead = 0;
  }

  private getStartState() {
    let counter = 0;
    let resultState;
    this.states.forEach((state: State) => {
      if (state.isStartState) {
        resultState = state;
        counter++;
      }
    });
    if (counter > 1 || counter == 0) return false;
    return resultState;
  }

  private checkNextTransition() {
    const possibleTransitions = this.currentState.transitions;
    const readValue = this.tape[this.posHead];
    let stateChanged = false;
    possibleTransitions.forEach((transition) => {
      if (transition.read == readValue) {
        this.tape[this.posHead] = transition.write;
        transition.goRoL === 'R' ? this.posHead++ : this.posHead--;
        this.currentState = transition.nextState;
        stateChanged = true;
      }
    });
    if (!stateChanged) {
      this.machineStopped();
    } else {
      this.stepCounter++;
      //TODO: ermitteln wann sich der Automat in einer Endlosschleife befindet
      if (this.stepCounter > 10000) {
        console.log('Das eingegebene Wort ist nicht in der Sprache');
        return;
      }
      this.checkNextTransition();
    }
  }

  private machineStopped() {
    this.currentState.isEndState ? console.log('Das eingegebene Wort ist in der Sprache') : console.log('Das eingegebene Wort ist nicht in der Sprache');
  }
}

export { TuringMachine };