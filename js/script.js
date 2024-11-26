const ctx = pintura.getContext('2d');
let objetos = [
    {nombre: 'Piedra1', x: 50, y: 0, width: 10, color: '#aa9900', velocidad: 0.7},
    {nombre: 'Piedra2', x: 80, y: 0, width: 10, color: '#BB1100', velocidad: 1},
    {nombre: 'Piedra3', x: 20, y: 60, width: 10, color: '#aa99CC', velocidad: 1.5},
    {nombre: 'Piedra4', x: 350, y: 0, width: 10, color: '#025', velocidad: 1.9},
    {nombre: 'Piedra5', x: 350, y: 0, width: 10, color: '#48dc19 ', velocidad: 2.1},
    {nombre: 'Piedra6', x: 350, y: 0, width: 10, color: '#19d9dc ', velocidad: 2.5},
];
let puntaje = 0;
let nivel = 1;

const auto = {
    x: 400,
    y: 350,
    width: 50,
    height: 50,
    velocidad: 10,
    img: new Image()
};

//imagen del autito
auto.img.src = 'img/car2.png'; 
let finJuego = false;

colision = (objeto1, objeto2) => {
    return (
        objeto1.x < objeto2.x + objeto2.width &&
        objeto1.x + objeto1.width > objeto2.x &&
        objeto1.y < objeto2.y + objeto2.width &&
        objeto1.y + objeto1.height > objeto2.y
    );
};

function actualizarPuntaje() {
    const puntajeDiv = document.getElementById('puntaje');
    puntajeDiv.textContent = `Puntaje: ${puntaje}`;
}

function actualizarNivel() {
    const nivelDiv = document.getElementById('nivel');
    nivelDiv.textContent = `Nivel: ${nivel}`;
}

function aumentarDificultad() {
    nivel++;
    objetos.forEach(objeto => {
        objeto.velocidad *= 1.5; // Incrementa la velocidad de los enemigos
    });
    actualizarNivel();
}

function animate() {
    ctx.clearRect(0, 0, pintura.width, pintura.height);

    objetos.forEach(objeto => {
        ctx.beginPath();
        ctx.arc(objeto.x, objeto.y, objeto.width, 0, Math.PI * 2);
        ctx.fillStyle = objeto.color;
        ctx.fill();
        ctx.stroke();

        ctx.font = "10px Arial";
        const texto = ctx.measureText(objeto.nombre);
        ctx.fillText(objeto.nombre, objeto.x - texto.width / 2, objeto.y + 20);

        if (colision(auto, {x: objeto.x, y: objeto.y, width: objeto.width, height: objeto.width})) {
            alert(`¡NOO..! GAME OVER\nPuntaje final: ${puntaje}\nNivel alcanzado: ${nivel}`);
            finJuego = true;
        }

        objeto.y += objeto.velocidad;
        if (objeto.y > pintura.height) {
            objeto.y = 0;
            objeto.velocidad *= 1.05; // Incremento adicional
            objeto.x = Math.random() * (pintura.width - objeto.width);
            puntaje++;
            actualizarPuntaje();

            // Subir puntos
            if (puntaje % 100 === 0) {
                aumentarDificultad();
            }
        }
    });

    //Dibujar el autito
    ctx.drawImage(auto.img, auto.x, auto.y, auto.width, auto.height);
    ctx.beginPath();
    ctx.rect(1, 1, pintura.width - 1, pintura.height - 1);
    ctx.stroke();

    if (!finJuego) requestAnimationFrame(animate);
}

// Mover el autito con las teclas <-  ->
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && auto.x > 0) {
        auto.x -= auto.velocidad;
    } else if (e.key === 'ArrowRight' && auto.x + auto.width < pintura.width) {
        auto.x += auto.velocidad;
    } else if (e.key === 'ArrowUp' && auto.y > 0) {
        auto.y -= auto.velocidad;
    } else if (e.key === 'ArrowDown' && auto.y + auto.height < pintura.height) {
        auto.y += auto.velocidad;
    }
});

auto.img.onload = () => {
    actualizarPuntaje();
    actualizarNivel();
    animate();
};
