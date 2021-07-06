export function undoRedo(target: Record<string | number, any>) {
  const history = createHistory<Action>();

  const set = (key: string | number, value: any) => {
    const action = {key, value, prevValue: target[key]} as Action;
    action.type = target.hasOwnProperty(key) ? "modify" : "create";
    history.push(action);

    target[key] = value;
  };

  const del = (key: string | number) => {
    const action: Action = {type: "delete", key, prevValue: target[key]};
    history.push(action);

    delete target[key];
  };

  const undo = () => {
    const {type, key, prevValue} = history.back();

    switch (type) {
      case "create":
        delete target[key];
        break;
      case "modify":
        target[key] = prevValue;
        break;
      case "delete":
        target[key] = prevValue;
        break;
      default:
        throw new Error(`unknown action type: ${type}`);
    }
  };

  const redo = () => {
    const {key, value, type} = history.next();

    switch (type) {
      case "create":
        target[key] = value;
        break;
      case "modify":
        target[key] = value;
        break;
      case "delete":
        delete target[key];
        break;
      default:
        throw new Error(`unknown action type: ${type}`);
    }
  };

  return {
    get: (key: string | number) => target[key],
    set,
    del,
    undo,
    redo,
  };
}

function createHistory<T = unknown>() {
  const history: T[] = [];
  let position = -1;

  const canNext = () => position <= history.length - 2;
  const canBack = () => position >= 0;

  const next = () => {
    if (!canNext) throw new RangeError();

    position = position + 1;
    const action = history[position];
    return action;
  };

  const back = () => {
    if (!canBack()) throw new RangeError();

    const action = history[position];
    position = position - 1;
    return action;
  };

  return {
    push: (action: T) => {
      history.splice(position + 1);
      history.push(action);
      position = history.length - 1;
    },
    canNext,
    next,
    back,
  };
}

type Action = {
  type: ActionType;
  key: string | number;
  prevValue: any;
  value?: any;
};

type ActionType = "create" | "modify" | "delete";
