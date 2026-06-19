// Проверяем, на какой странице находится пользователь
const isPhotoChurch = window.location.pathname.includes('phto-chrch.html');

// Если это страница с фото — ставим одну музыку, если нет — основной плейлист
const playlist = isPhotoChurch
    ? ['music/Морем.mp3', 'music/as long as in the heart.mp3', 'music/japan.mp3'] // Название твоего файла для фото-страницы
    : ['music/Fuckman.mp3', 'music/lovely.mp3', 'music/Безумное зло.mp3']; // Твой старый список
let currentTrackIndex = 0;
let isPlaying = false;

const audio = document.getElementById('my-audio');
const playerBtn = document.getElementById('music-player-btn');
const playerIcon = document.getElementById('player-icon');
const trackNameElement = document.getElementById('track-name');
const volumeSlider = document.getElementById('volume-slider');

function updateTrackName() {
    // Берем название из плейлиста
    let name = playlist[currentTrackIndex];

    // 1. Убираем путь "music/" (если он есть)
    name = name.replace(/^music\//i, '');

    // 2. Убираем расширение ".mp3"
    name = name.replace(/\.mp3/i, '');

    // Декодируем символы (чтобы кириллица отображалась корректно)
    try {
        name = decodeURIComponent(name);
    } catch (e) {
        console.error("Ошибка декодирования названия");
    }

    trackNameElement.textContent = name;
}

function loadTrack(index) {
    audio.src = playlist[index];
    audio.load();
    updateTrackName();
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playerIcon.className = 'fas fa-play';
    } else {
        audio.play().catch(e => console.log("Нужен клик"));
        playerIcon.className = 'fas fa-pause';
    }
    isPlaying = !isPlaying;
}

// Громкость
audio.volume = 0.30;
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Кнопки
playerBtn.addEventListener('click', togglePlay);
document.getElementById('next-track-btn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play(); isPlaying = true; playerIcon.className = 'fas fa-pause';
});
document.getElementById('prev-track-btn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play(); isPlaying = true; playerIcon.className = 'fas fa-pause';
});

loadTrack(currentTrackIndex);

