/**@see https://www.codewars.com/kata/52449b062fb80683ec000024/train/javascript */
export function generateHashtag(str: string) {
  let result = "#";
  const words = str.match(/(\w)+/gi);

  if (str.trim() == "") return false;

  for (let word of words) {
    let capitalized = word[0].toUpperCase() + word.slice(1);
    result += capitalized;
  }

  if (result.length > 140) return false;

  return result;
}
