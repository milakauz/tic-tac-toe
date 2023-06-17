let fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

let currentPlayer = 'cross'; // initialer Spieler: 'cross' oder 'circle'

const winningCombinations = [
  [0, 1, 2], // Zeile 1
  [3, 4, 5], // Zeile 2
  [6, 7, 8], // Zeile 3
  [0, 3, 6], // Spalte 1
  [1, 4, 7], // Spalte 2
  [2, 5, 8], // Spalte 3
  [0, 4, 8], // Diagonale 1
  [2, 4, 6], // Diagonale 2
];

function init() {
  render();
}

function render() {
  let content = document.getElementById('content');
  let table = document.createElement('table');

  for (let i = 0; i < 3; i++) {
    let row = document.createElement('tr');

    for (let j = 0; j < 3; j++) {
      let cell = createCell(i, j);
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  content.innerHTML = '';
  content.appendChild(table);
  checkGameOver(); // Überprüfe, ob das Spiel vorbei ist
}

function createCell(i, j) {
  let cell = document.createElement('td');
  let index = i * 3 + j;

  cell.onclick = function () {
    handleCellClick(cell, index);
  };

  let fieldValue = fields[index];
  let symbol = fieldValue === 'circle' ? generateCircleSVG() : (fieldValue === 'cross' ? generateCrossSVG() : '');
  cell.innerHTML = symbol;

  return cell;
}

function handleCellClick(cell, index) {
  if (!fields[index]) {
    if (currentPlayer === 'circle') {
      fields[index] = 'circle';
    } else if (currentPlayer === 'cross') {
      fields[index] = 'cross';
    }
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    showCurrentPlayer();
    cell.innerHTML = fields[index] === 'circle' ? generateCircleSVG() : generateCrossSVG();
    cell.onclick = null;                                                       //entferne den onclick-Handler nach dem Klick

    checkGameOver();                                                           //überprüfe, ob das Spiel vorbei ist
  }
}

function checkGameOver() {
  for (const combination of winningCombinations) {                            //durchluft jede mögliche gewinnkombination
    const [a, b, c] = combination;                                            //combination erhlt einen Wert bei der Iteration aus jeder Sequenz (es gibt 3 Werte) also a,b,c
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {    //es wird geprüft ob fields[a] einen Wert hat und ob dieser Wert mit fields[b] und [c] übereinstimmen
      drawWinningLine(a, b, c);                                               //hier werden die gewinnenden werte aus der Iteration übergeben
      break;                                                                  //die schleife wird abgebrochen, sobald eine gewinnende kombination gefunden wurde 
    }
  }
}

function drawWinningLine(a, b, c) {
  let cells = document.getElementsByTagName('td');                            //ruft alle td - elemente ab und speichert sie in der variablen
  cells[a].style.backgroundColor = 'rgba(255, 255, 255, 0.3)';                //die zelle mit dem index a
  cells[b].style.backgroundColor = 'rgba(255, 255, 255, 0.3)';                //die zelle mit dem index b
  cells[c].style.backgroundColor = 'rgba(255, 255, 255, 0.3)';                //die zelle mit dem index c
}

function generateCircleSVG() {
  const color = '#00B0EF';
  const size = 70;
  const borderWidth = 5;
  const animationDuration = 125; // Animation in Millisekunden
  const animationRepeatCount = 'indefinite'; // Wiederholung der Animation

  const innerSize = size - 2 * borderWidth; // Größe des inneren Kreises

  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${innerSize / 2}" fill="none" stroke="${color}" stroke-width="${borderWidth}">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 ${size / 2} ${size / 2}" to="360 ${size / 2} ${size / 2}" dur="${animationDuration}ms" repeatCount="${animationRepeatCount}" />
      </circle>
    </svg>`;

  return svgCode;
}



function generateCrossSVG() {
  const color = '#FFC000';
  const size = 70;
  const animationDuration = 125; // Animation in Millisekunden

  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
      <line x1="${size / 4}" y1="${size / 4}" x2="${size / 4 * 3}" y2="${size / 4 * 3}" stroke="${color}" stroke-width="5">
        <animate attributeName="x2" from="${size / 4}" to="${size / 4 * 3}" dur="${animationDuration}ms" fill="freeze" />
        <animate attributeName="y2" from="${size / 4}" to="${size / 4 * 3}" dur="${animationDuration}ms" fill="freeze" />
      </line>
      <line x1="${size / 4 * 3}" y1="${size / 4}" x2="${size / 4}" y2="${size / 4 * 3}" stroke="${color}" stroke-width="5">
        <animate attributeName="x2" from="${size / 4 * 3}" to="${size / 4}" dur="${animationDuration}ms" fill="freeze" />
        <animate attributeName="y2" from="${size / 4}" to="${size / 4 * 3}" dur="${animationDuration}ms" fill="freeze" />
      </line>
    </svg>`;

  return svgCode;
}

function restartGame() {
  fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  render();
}

function showCurrentPlayer() {
  let player = currentPlayer;
  const currentPlayerText = document.getElementById('current-player');
  currentPlayerText.innerHTML = `${player === 'circle' ? generateCircleSVG() : generateCrossSVG()}`;
}

render();