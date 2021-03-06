const musicContaier = document.querySelector('.music-container');
const playButton = document.querySelector('#play');
const backButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist')
const cover = document.querySelector('#cover');
const duration = document.querySelector('#duration');

// song Titles

const songs = ['hallelu', 'kolo', 'KPK', 'Titanium'];
const artists = ['Masterkraft x Zlatan x Bella Shmurda ', 'Ice Prince', "Rexxie, MohBad", "Dave"];


// keep track of songs 

let songIndex = 1;
let timeElapsed = 0;

// intially load song into DOM 
loadSong(songs[songIndex]);

// update songs details 

function loadSong(song){
    title.innerText = `${song}`;
    let artistOfSong = songs.indexOf(song);
    artist.innerText = `Artist: ${artists[artistOfSong]}`
    audio.src = `music/${song}.mp3`;
    cover.src = `igm/${song}.jpg`;
    
}

// Pay Song
function playSong(){
    musicContaier.classList.add('play')
    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');
    audio.play()
    
}   

// Previous Song

function backSong(){
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex])
    playSong()
}

// Next Song

function nextSong(){
    songIndex++
    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    
    loadSong(songs[songIndex])
    playSong()
}


// Update Progress Bar

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`
    
}

// Pause Song
function pauseSong(){
    musicContaier.classList.remove('play')
    playButton.querySelector('i.fas').classList.add('fa-play');
    playButton.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

// Set the Progress bar to whatever the current time is
function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration;
    
   
   
}

// EVENT LISTENERS

// Handle the play Button
playButton.addEventListener('click', () => {
    const isPlaying = musicContaier.classList.contains('play');

    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
})

// Changing Songs
backButton.addEventListener('click', backSong)
nextButton.addEventListener('click', nextSong)

// Updating the Progress Bar
audio.addEventListener('timeupdate',updateProgress)
progressContainer.addEventListener('click', setProgress)

// Playing the next song after the current one finsishes playing.
audio.addEventListener('ended' ,nextSong)


audio.addEventListener('timeupdate', (event) => {
    const currentTime = Math.floor(audio.currentTime);
    const duration = Math.floor(audio.duration);
    duration.innerText = `${currentTime}`
}, true);



// update duration 

