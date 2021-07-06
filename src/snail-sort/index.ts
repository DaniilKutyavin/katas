/**
 * @description Given an N x N array, return the array elements arranged
 * from outermost elements to the middle element, traveling clockwise.
 * @see https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/train/javascript
 */
export const snailSort = (matrix: Matrix): Array<number> => {
  if (matrix.length === 0) return [];
  return [...borderClockwise(matrix), ...snailSort(removeBorder(matrix))];
};

const borderClockwise = (matrix: Matrix): Array<number> => {
  const {firstRow, lastColumn, lastRow, firstColumn} = borders(matrix);

  return firstRow.concat(
    lastColumn.slice(1),
    lastRow.reverse().slice(1),
    firstColumn.reverse().slice(1, -1),
  );
};

const borders = (matrix: Matrix) => ({
  firstRow: matrix[0],
  lastRow: matrix[matrix.length - 1],
  firstColumn: matrix.map((row) => row[0]),
  lastColumn: matrix.map((row) => row[row.length - 1]),
});

const removeBorder = (matrix: Matrix): Matrix =>
  removeEdges(matrix).map((row) => removeEdges(row));

const removeEdges = (array: Array<any>) => array.slice(1, -1);

type Matrix = Array<Array<number>>;
