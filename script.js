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

let currentPlayer = 'cross';            // initialer Spieler: 'cross' oder 'circle'

function init() {
    render();
}

function render() {
    let content = document.getElementById('content');
    let table = document.createElement('table');
  
    for (let i = 0; i < 3; i++) {
      let row = document.createElement('tr');
  
      for (let j = 0; j < 3; j++) {
        let cell = document.createElement('td');
        let index = i * 3 + j;
  
        cell.addEventListener('click', () => {      // arrow function: auf das DOM cell wird ein eventlistener hinzugefügt, der reagiert bei onclick
          if (!fields[index]) {                      // logischer negationsoperator: kehrt den logischen wert einer aussage um. überprüft ob das feld leer ist. 
            if (currentPlayer === 'circle') {
              fields[index] = 'circle';
            } else if (currentPlayer === 'cross') {
              fields[index] = 'cross';
            }
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';        // ternärer operator
            render();
          }
        });
  
        let fieldValue = fields[index];
        let symbol = fieldValue === 'circle' ? generateCircleSVG() : (fieldValue === 'cross' ? generateCrossSVG() : '');  // bedingter Operator
        cell.innerHTML = symbol;
  
        row.appendChild(cell);
      }
  
      table.appendChild(row);
    }
  
    content.innerHTML = '';
    content.appendChild(table);
  }

  function generateCircleSVG() {
    const color = '#00B0EF';
    const size = 70;
    const animationDuration = 125; // Animation in Millisekunden
  
    const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="0" fill="${color}" transform-origin="center" style="transform-box: fill-box; animation: fillAnimation ${animationDuration}ms ease-in-out forwards">
        <animate attributeName="r" from="0" to="${size / 2}" dur="${animationDuration}ms" fill="freeze" />
      </circle>
      <style>
        @keyframes fillAnimation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      </style>
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
  

  
  
  
  
  // Initialer Aufruf der Funktion
  render();