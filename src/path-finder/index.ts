/**
 * @see https://www.codewars.com/kata/path-finder-number-1-can-you-reach-the-exit/train/javascript
 * You are at position [0, 0] in maze NxN and you can only move in one of the four cardinal directions 
 * (i.e. North, East, South, West). Return true if you can reach position [N-1, N-1] or false otherwise.
 * Empty positions are marked .. Walls are marked W. Start and exit positions are empty in all test cases.
 * 
 * Example: 
 * `.W.
    .W.
    ...`
    */

export const pathFinder = (mazeInput: string) => {
  const maze = new Maze(mazeInput);

  const checked: Array<Position> = [];
  const toCheck: Array<Position> = [maze.ENTRANCE];

  while (toCheck.length > 0) {
    const currentPosition = toCheck.pop();

    const notBlocked = maze
      .neighbours(currentPosition)
      .filter((position) => maze.in(position) === ".");

    if (notBlocked.find((position) => isEqualPositions(position, maze.EXIT)))
      return true;

    checked.push(currentPosition);
    toCheck.push(
      ...notBlocked.filter((it) =>
        checked.every((position) => !isEqualPositions(it, position)),
      ),
    );
  }
  return false;
};

class Maze {
  maze: Array<Array<string>>;
  ENTRANCE: Position = [0, 0];

  constructor(mazeInput: string) {
    const rows = mazeInput.split("\n");
    this.maze = rows.map((row) => {
      const cleanRow = row.replace(/\s/g, "");
      return cleanRow.split("");
    });
  }

  in([x, y]: Position) {
    return this.maze[x][y];
  }

  get EXIT(): Position {
    return [this.maze.length - 1, this.maze.length - 1];
  }

  neighbours([x, y]: Position) {
    const neighbourPositions: Position[] = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    return neighbourPositions.filter(
      ([x, y]) =>
        x >= 0 && x < this.maze.length && y >= 0 && y < this.maze.length,
    );
  }
}

const isEqualPositions = (pos1: Position, pos2: Position) =>
  pos1[0] === pos2[0] && pos1[1] === pos2[1];

type Position = [number, number];
