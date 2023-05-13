const content = document.querySelector(".content"),
Playimage = content.querySelector(".music-image img"),
musicName = content.querySelector(".music-titles .name"),
musicArtist = content.querySelector(".music-titles .artist"),
Audio = document.querySelector(".main-song"),
playBtn = content.querySelector(".play-pause"),
playBtnIcon = content.querySelector(".play-pause span"),
prevBtn = content.querySelector("#prev"),
nextBtn = content.querySelector("#next"),
progressBar = content.querySelector(".progress-bar"),
progressDetails = content.querySelector(".progress-details"),
repeatBtn = content.querySelector("#repeat"),
Shuffle = content.querySelector("#shuffle");

let index = 1;

window.addEventListener("load", ()=>{
    loadData(index);
    // Audio.play();
});

function loadData(indexValue){
    musicName.innerHTML = songs[indexValue - 1].name;
    musicArtist.innerHTML = songs[indexValue - 1].artist;
    Playimage.src = "images/"+songs[indexValue - 1].img+".jpeg";
    // console.log(Playimage.src);
    Audio.src = "audio/"+songs[indexValue - 1].audio+".mp3";
    // console.log(Audio.src);
}

playBtn.addEventListener("click", ()=>{
    const isMusicPaused = content.classList.contains("paused");
    if(isMusicPaused) {
        pauseSong();
    }
    else {
        playSong();
    }
});

function playSong() {
    content.classList.add("paused");
    playBtnIcon.innerHTML = "pause";
    Audio.play();
}

function pauseSong() {
    content.classList.remove("paused");
    playBtnIcon.innerHTML = "play_arrow";
    Audio.pause();
}

nextBtn.addEventListener("click", ()=>{
    nextSong();
});

prevBtn.addEventListener("click", ()=>{
    prevSong();
});

function nextSong() {
    index++; //increment index by 1
    if(index > songs.length){
        index = 1;
    }
    else {
        index = index;
    }
    loadData(index);
    playSong();
}

function prevSong() {
    index--; //decrement index by 1
    if(index <= 0){
        index = songs.length;
    }
    else {
        index = index;
    }
    loadData(index);
    playSong();
}

Audio.addEventListener("timeupdate", (e)=>{
    // console.log(e);
    const initialTime = e.target.currentTime; //get current music time
    const finalTime = e.target.duration; //get full duration of audio
    let BarWidth = (initialTime / finalTime) * 100;
    progressBar.style.width = BarWidth+"%";

    progressDetails.addEventListener("click", (e)=>{
        let progressValue = progressDetails.clientWidth; //get width of progress bar
        let clickedOffsetX = e.offsetX; //get offset x value
        let MusicDuration = Audio.duration; //get total music duration
        
        Audio.currentTime = (clickedOffsetX / progressValue) * MusicDuration;
    });

    //Timer Logic
    Audio.addEventListener("loadeddata", ()=>{
        let finalTimeData = content.querySelector(".final");

        //update finalDuration
        let AudioDuration = Audio.duration;
        let finalMinutes = Math.floor(AudioDuration / 60);
        let finalSeconds = Math.floor(AudioDuration % 60);
        if(finalSeconds < 10) {
            finalSeconds = "0"+finalSeconds;
        }
        finalTimeData.innerText = finalMinutes+":"+finalSeconds;
    });

    //update current duration
    let currentTimeData = content.querySelector(".current");
    let CurrentTime = Audio.currentTime;
    let currentMinutes = Math.floor(CurrentTime / 60);
    let currentSeconds = Math.floor(CurrentTime % 60);
    if(currentSeconds < 10) {
        currentSeconds = "0"+currentSeconds;
    }
    currentTimeData.innerText = currentMinutes+":"+currentSeconds;

    //repeat button logic
    repeatBtn.addEventListener("click", ()=>{
        Audio.currentTime = 0;
    });

});

//shuffle logic
Shuffle.addEventListener("click", ()=>{
    var randIndex = Math.floor(Math.random() * songs.length) + 1; //select random between 1 & song array length
    loadData(randIndex);
    playSong();
});

// -------------- LOOK AT NOTE BELOW - IMPORTANT!! --------------

//play next song when previous song has ended --- i can't cheeck this functionality b/c not playing whole meditation! was it when i converted over to mp3?? 
Audio.addEventListener("ended", ()=>{
    index++;
    if(index > songs.length){
        index = 1;
    }
    loadData(index);
    playSong();
});