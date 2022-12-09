interface Transition {
  read: string | undefined;
  write: string;
  goRoL: "R" | "L";
  nextState: State;
}

class State {
  private _isEndState: boolean;
  private _isStartState: boolean;
  private _name: string;
  private _transitions: Transition[];

  constructor(name:string, startState:boolean = false, endState:boolean = false) {
    this._name = name;
    this._isStartState = startState;
    this._isEndState = endState;
  }

  public set isEndState(bool: boolean) {
    this._isEndState = bool;
  }

  public get isEndState() {
    return this._isEndState;
  }

  public set isStartState(bool: boolean) {
    this._isStartState = bool;
  }

  public get isStartState() {
    return this._isStartState;
  }

  public set transitions(transitions: Transition[]) {
    this._transitions = transitions;
  }

  public get transitions(): Transition[] {
    return this._transitions;
  }
}

export { State, Transition }