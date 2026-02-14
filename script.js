const games = [
    { title: "Elden Ring", platform: "PC", img: "/images/elden-ring.jpg" },
    { title: "God of War", platform: "PS5", img: "/images/god-of-war.jpg" },
    { title: "Zelda: TotK", platform: "Switch", img: "/images/zelda.jpg" },
    { title: "Spider-Man 2", platform: "PS5", img: "/images/spiderman2.jpg" }
];

const gameGrid = document.getElementById('game-grid');
const modal = document.getElementById('game-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

// Función para mostrar juegos
function renderGames(filter = 'all') {
    gameGrid.innerHTML = "";
    const filtered = filter === 'all' ? games : games.filter(g => g.platform === filter);

    filtered.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.img}" class="game-img">
            <div class="game-info">
                <small style="color:var(--accent-blue)">${game.platform}</small>
                <h4>${game.title}</h4>
            </div>
        `;
        
        // Al hacer clic, abrimos el modal
        card.onclick = () => openGame(game.title);
        gameGrid.appendChild(card);
    });
}

// Función para abrir el modal con el "juego"
function openGame(title) {
    modal.style.display = "block";
    let clicks = 0;
    modalBody.innerHTML = `
        <h2>${title} Challenge</h2>
        <p>¡Haz clic en el mando para ganar!</p>
        <div style="font-size: 3rem; margin: 20px;" id="counter">0</div>
        <button id="btn-play" style="font-size: 50px; background:none; border:none; cursor:pointer;">🎮</button>
    `;

    document.getElementById('btn-play').onclick = () => {
        clicks++;
        document.getElementById('counter').innerText = clicks;
    };
}

// Lógica de filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGames(btn.dataset.filter);
    };
});

// Cerrar modal
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// Inicio
renderGames();