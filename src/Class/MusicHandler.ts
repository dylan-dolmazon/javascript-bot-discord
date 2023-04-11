import { AudioPlayer, AudioPlayerStatus } from "@discordjs/voice";

export class MusicHandler {

    server: any;
    audioPlayer: AudioPlayer;

    constructor(server: any, audioPlayer: any)
    {
        this.server = server;
        this.audioPlayer = audioPlayer;
    }
    
    getServer()
    {
        return this.server;
    }
    setAudioPlayer(audioPlayer: any)
    {
        this.audioPlayer = audioPlayer;
    }
    getAudioPlayer()
    {
        return this.audioPlayer;
    }
    play()
    {
        
    }
    resume()
    {

    }
    stop()
    {

    }
    pause()
    {

    }
}

export let AllMusicHandler : MusicHandler[] = [];