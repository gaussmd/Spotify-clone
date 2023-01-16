console.log("wellCome to spotify")
//initialize the variables
let songIndex = 0;
let audioElement = new Audio('music.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Sad theme piano", filePath: "songs/1.mp3" , coverPath:"covers/1.jpeg"},
    { songName: "Copyright free relaxation music", filePath: "songs/2.mp3" , coverPath:"covers/2.jpeg"},
    { songName: "Cool mind BGM", filePath: "songs/3.mp3" , coverPath:"covers/3.jpeg"},
    { songName: "Background music for presentation", filePath: "songs/4.mp3" , coverPath:"covers/4.jpeg"},
    { songName: "Best youtube background music", filePath: "songs/5.mp3" , coverPath:"covers/5.jpeg"},
    { songName: "DAVA music", filePath: "songs/6.mp3" , coverPath:"covers/6.jpeg"},
    { songName: "Just chill feel free", filePath: "songs/7.mp3" , coverPath:"covers/7.jpeg"},
    { songName: "Ghar aaya mera pardesi instrumental", filePath: "songs/8.mp3" , coverPath:"covers/8.jpeg"},
    { songName: "Music from youtube library", filePath: "songs/9.mp3" , coverPath:"covers/9.jpeg"},
    { songName: "Coc pot free background music", filePath: "songs/10.mp3" , coverPath:"covers/10.jpeg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//audioElement.play()

// handle Play/pause click
masterPlay.addEventListener('click', ()=>{
    if( audioElement.paused || audioElement.currentTime<0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//Listen to Event
audioElement.addEventListener('timeupdate' , ()=>{
     //update seekbar
     progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
     myProgressBar.value = progress;
})
myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays  = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
        })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
   makeAllPlays();
   songIndex = parseInt (e.target.id);
   e.target.classList.remove('fa-circle-play');
   e.target.classList.add('fa-circle-pause');
   audioElement.src = `songs/${songIndex+1}.mp3`;
   masterSongName.innerText = songs[songIndex].songName;
   audioElement.currentTime = 0;
   audioElement.play();
   gif.style.opacity = 1;
   masterPlay.classList.remove('fa-circle-play');
   masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
  else{
    songIndex += 1
  }
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
  else{
    songIndex -= 1
  }
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-circle-pause');
  masterPlay.classList.add('fa-circle-play');
})