document.addEventListener('DOMContentLoaded', () => {
    const interactiveHeart = document.getElementById('interactiveHeart');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const messageDisplay = document.getElementById('messageDisplay');
    const instructionText = document.getElementById('instructionText'); // Usamos el ID ahora
    const backgroundElements = document.querySelector('.background-elements');

    let clickCount = 0;
    let musicPlayed = false;

    const messages = [
        "¡Eres la más guapa del mundo! ❤️",
        "Mi psicóloga favorita, gracias por todo. 😊",
        "Tu sonrisa ilumina mi vida. ✨",
        "Contigo cada día es una aventura. 🚀",
        "Mi amor, eres mi persona favorita. 🥰",
        "Gracias por ser tú, Deysi. 🌷",
        "Cada momento a tu lado es un tesoro. 💎",
        "Eres mi inspiración. 💖",
        "Mi reina, te adoro. 👑",
        "Simplemente... te amo.😘",
        "Mi Deysi hermosa. 😍",
        "Siempre te pienso.💭",
        "Eres mi hogar. 🏠",
        "Mi dulce compañía. 🍭",
        "Mi cielo estrellado. 🌌",
        "Mi razón de ser. 🌟",
        "Mi único deseo eres tú. 🌠",
        "Contigo, todo es mejor. 🌈",
        "Mi pedacito de cielo. 😇"
    
    ];

    // --- Colores de tulipanes y sus brillos ---
    const tulipColors = [
        { main: '%23ff69b4', stem: '%239acd32', glow: '#ff69b4' }, // Rosa caliente
        { main: '%23e0b0ff', stem: '%239acd32', glow: '#e0b0ff' }, // Morado claro
        { main: '%23da70d6', stem: '%239acd32', glow: '#da70d6' }, // Orquídea
        { main: '%23ffa07a', stem: '%239acd32', glow: '#ffa07a' }  // Salmón claro
    ];

    // --- Lluvia de nombres y tulipanes ---
    function createFallingName() {
        const nameSpan = document.createElement('span');
        nameSpan.textContent = "DEYSI";
        nameSpan.classList.add('falling-name');

        const startX = Math.random() * window.innerWidth;
        const startY = -20 - (Math.random() * 50);

        nameSpan.style.left = `${startX}px`;
        nameSpan.style.top = `${startY}px`;

        const duration = 5 + Math.random() * 3;
        nameSpan.style.animationDuration = `${duration}s`;
        nameSpan.style.animationDelay = `${Math.random() * 2}s`;

        backgroundElements.appendChild(nameSpan);

        nameSpan.addEventListener('animationend', () => {
            nameSpan.remove();
            createBloomingTulip(startX); // El tulipán aparece donde el nombre terminó de caer
        });
    }

    function createBloomingTulip(xPos) {
        const tulipDiv = document.createElement('div');
        tulipDiv.classList.add('tulip-bloom');

        const randomColor = tulipColors[Math.floor(Math.random() * tulipColors.length)];
        const svgTulip = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><path fill="${randomColor.main}" d="M50 0 C70 0 80 20 80 40 C80 60 70 80 50 100 C30 80 20 60 20 40 C20 20 30 0 50 0 Z M50 50 C55 55 60 60 60 70 C60 80 50 90 40 70 C40 60 45 55 50 50 Z" /><path fill="${randomColor.stem}" d="M48 100 L52 100 L50 120 Z" /></svg>`;
        
        tulipDiv.style.backgroundImage = `url('${svgTulip}')`;
        tulipDiv.style.setProperty('--tulip-glow-color', randomColor.glow); // Pasa el color para el brillo CSS

        // La posición vertical será justo en la parte inferior de la ventana, ajustado para que suba bien
        tulipDiv.style.left = `${xPos}px`;
        tulipDiv.style.bottom = `-10px`; // Empieza un poco más abajo del borde visible

        backgroundElements.appendChild(tulipDiv);

        tulipDiv.addEventListener('animationend', () => {
            tulipDiv.remove();
        });
    }

    // Generar nombres que caen continuamente
    setInterval(createFallingName, 700); // Un nombre nuevo cada 0.7 segundos

    // --- Estrellas flotantes ---
    function createFloatingStar() {
        const starSpan = document.createElement('span');
        starSpan.textContent = "⭐"; // Carácter de estrella unicode
        starSpan.classList.add('star');

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        starSpan.style.left = `${startX}px`;
        starSpan.style.top = `${startY}px`;

        // Generar un desplazamiento aleatorio para la animación
        const randX = (Math.random() - 0.5) * 200; // entre -100 y 100
        const randY = (Math.random() - 0.5) * 200; // entre -100 y 100
        starSpan.style.setProperty('--randX', randX);
        starSpan.style.setProperty('--randY', randY);

        starSpan.style.animationDelay = `${Math.random() * 10}s`; // Retraso aleatorio
        starSpan.style.animationDuration = `${10 + Math.random() * 10}s`; // Duración aleatoria

        backgroundElements.appendChild(starSpan);

        starSpan.addEventListener('animationend', () => {
            starSpan.remove();
        });
    }

    // Generar estrellas flotantes continuamente
    setInterval(createFloatingStar, 1000); // Una estrella nueva cada segundo


    // --- Lógica del corazón interactivo ---
    interactiveHeart.addEventListener('click', () => {
        interactiveHeart.querySelector('.heart').classList.add('clicked');
        
        if (!musicPlayed) {
            backgroundMusic.play().then(() => {
                musicPlayed = true;
                console.log("Música 'I Wanna Be Yours' reproduciéndose.");
                instructionText.textContent = "¡Sigue haciendo clic para más sorpresas!";
                instructionText.style.animation = 'none';
                instructionText.style.opacity = '1';
                instructionText.style.fontSize = 'clamp(0.8em, 2vw, 1.1em)'; // Asegurar el tamaño pequeño
            }).catch(error => {
                console.error("Error al intentar reproducir la música:", error);
                instructionText.textContent = "Error al reproducir la música. Asegúrate de que 'iwannabeyours.mp3' esté en la carpeta.";
                instructionText.style.color = 'red';
            });
        }

        const randomIndex = Math.floor(Math.random() * messages.length);
        messageDisplay.textContent = messages[randomIndex];
        
        messageDisplay.classList.remove('show');
        void messageDisplay.offsetWidth;
        messageDisplay.classList.add('show'); 
        

        clickCount++;
        console.log(`Clics: ${clickCount}`);
    });
});