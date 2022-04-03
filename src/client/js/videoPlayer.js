const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
}

const handlePause = (event) => {
    playBtn.innerText = "Play"
}

const handlePlay = (event) => {
    playBtn.innerText = "Pause"
}

const handleMute = (event) => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
}

const handleVolumeChange = (event) => {
    const {target: {value}} = event;
    if (video.muted) {
        video.muted = false
        muteBtn.innerText = "Mute"
    }
    volumeValue = value
    video.volume = value;
}

const handleLoadedMetaData = (event) => {
    totalTime.innerText = Math.ceil(video.duration);
}

const handleTimeUpdate = (event) => {
    currentTime.innerText = Math.ceil(video.currentTime);
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);