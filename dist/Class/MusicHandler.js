"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllMusicHandler = exports.MusicHandler = void 0;
class MusicHandler {
    server;
    audioPlayer;
    constructor(server, audioPlayer) {
        this.server = server;
        this.audioPlayer = audioPlayer;
    }
    getServer() {
        return this.server;
    }
    setAudioPlayer(audioPlayer) {
        this.audioPlayer = audioPlayer;
    }
    getAudioPlayer() {
        return this.audioPlayer;
    }
    play() {
    }
    resume() {
    }
    stop() {
    }
    pause() {
    }
}
exports.MusicHandler = MusicHandler;
exports.AllMusicHandler = [];
