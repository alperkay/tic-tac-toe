
//returning random color 
export const colors = ["red","blue","green","yellow","magenta"]
export const randomColor = () => {
  let randomNumber = Math.floor(Math.random()*colors.length);
  const randomColor = colors[randomNumber]
  return randomColor
}

//function returning number of changes between boards
export const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length