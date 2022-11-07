const paintContainer =  document.getElementById('container');
const colorChanger = document.getElementById('color-changer');
let selectedPaintElement = null;

const ws = new WebSocket('ws://localhost:6500/colorChange');
ws.onopen = (event) => {
    ws.send('Connected!');
}


function createPaintElement(index){
    const colorElement = document.createElement('div');
    colorElement.style.backgroundColor = '#222';
    colorElement.style.width = '20px';
    colorElement.style.height = '20px';
    colorElement.id = `color-element-${index}`;

    colorElement.addEventListener('click', (event) => {
        selectedPaintElement =  event.target;
        colorChanger.hidden = false;
        console.log(event);
    }); 

    return colorElement;
}

const handleColorChange = (event) => {
    if (selectedPaintElement) {
        const newColor = event.target.value;
        selectedPaintElement.style.backgroundColor = newColor;

        if (ws.OPEN) {
            ws.send(JSON.stringify({
                colorElementId: selectedPaintElement.id,
                color: newColor
            }));
        }
    }
    colorChanger.hidden = true;
}

for (let index = 0; index < 3000; index++) {
    paintContainer.appendChild(createPaintElement(index));
} 

colorChanger.hidden = true;
colorChanger.addEventListener('change', handleColorChange);
