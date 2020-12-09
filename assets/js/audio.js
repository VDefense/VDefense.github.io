"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const playlist = ['assets/audio/backgroundMusic/Main_Title.ogg', 'assets/audio/backgroundMusic/Mulligan.ogg', 'assets/audio/backgroundMusic/Bad Reputation.ogg', 'assets/audio/backgroundMusic/Better Hand.ogg', 'assets/audio/backgroundMusic/Duel.ogg', 'assets/audio/backgroundMusic/DontGuard.ogg', 'assets/audio/backgroundMusic/Collection Manager.ogg','assets/audio/backgroundMusic/On a Roll.ogg','assets/audio/backgroundMusic/The_Forge.ogg'];


    let isPlaying = true;
    let isMuted =true;
    let count =0;
    const audio = new Audio();
    let i = 0;
    audio.addEventListener('ended', function () {
        i = ++i < playlist.length ? i : 0;
        audio.src = playlist[i];
        audio.play();
    }, true);

    document.getElementById("volUp").addEventListener("click",function () {
        if (count<1){
            let voice= new Audio('assets/audio/innkeeper/VO_INNKEEPER_WELCOME3_18.ogg');
            voice.volume = 0.5;
            voice.play();
            return count++;
        }

        audio.volume = 0.3;
        audio.muted = true;
        audio.loop = false;
        audio.src = playlist[0];
        audio.play();
    });
    document.getElementById("volUp").addEventListener("click",function () {
        if(isMuted){
            audio.muted =false;
        }
        if(isPlaying ===true){
            audio.pause();
            isPlaying = false;
        }else{
            isPlaying =true;
        }
    });
});