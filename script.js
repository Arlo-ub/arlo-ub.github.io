const button = document.getElementById('colorButton');
const gameButton = document.getElementById('gameButton');

button.addEventListener('click', () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector('.content').style.backgroundColor = randomColor;
});

gameButton.addEventListener('click', () => {
    const popup = window.open("", "ShootingGamePopup", "width=600,height=400");
    popup.document.write(`
        <html>
            <head>
                <title>Shooting Game</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 0; }
                    #gameCanvas { background-color: #e0e0e0; position: relative; width: 100%; height: 100%; }
                    .target { position: absolute; width: 30px; height: 30px; background-color: red; border-radius: 50%; }
                </style>
            </head>
            <body>
                <h1>Shooting Game</h1>
                <p>Click on the moving targets to shoot them!</p>
                <div id="gameCanvas"></div>
                <p id="score">Score: 0</p>
                <button onclick="window.close()">Close</button>
                <script>
                    let score = 0;
                    const gameCanvas = document.getElementById('gameCanvas');

                    function createTarget() {
                        const target = document.createElement('div');
                        target.className = 'target';
                        target.style.left = Math.random() * (gameCanvas.clientWidth - 30) + 'px';
                        target.style.top = Math.random() * (gameCanvas.clientHeight - 30) + 'px';

                        target.addEventListener('click', () => {
                            score++;
                            document.getElementById('score').textContent = 'Score: ' + score;
                            gameCanvas.removeChild(target);
                            createTarget();
                        });

                        gameCanvas.appendChild(target);

                        // Move the target every second
                        setTimeout(() => {
                            if (gameCanvas.contains(target)) {
                                gameCanvas.removeChild(target);
                                createTarget();
                            }
                        }, 1000);
                    }

                    createTarget(); // Start the game by creating the first target
                </script>
            </body>
        </html>
    `);
});
