export const uncollapse = (digits) => {
    const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const regex = new RegExp(words.join('|'), 'gi');
    return digits.match(regex).join(' ');
  };