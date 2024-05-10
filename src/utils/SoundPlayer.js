import { Howl } from "howler";

class SoundPlayer {
    constructor(sources, volumeLevel = 0.5) {
        this.sources = sources;
        this.volumeLevel = volumeLevel;
        this.currentSound = null;
    }

    play() {
        // 랜덤으로 소스 선택
        const randomIndex = Math.floor(Math.random() * this.sources.length);
        const selectedSource = this.sources[randomIndex];

        // 새로운 Howl 인스턴스 생성
        this.currentSound = new Howl({
            src: [selectedSource],
            volume: this.volumeLevel,
        });

        // 사운드 재생
        this.currentSound.play();
    }

    pause() {
        if (this.currentSound) {
            this.currentSound.pause();
        }
    }

    stop() {
        if (this.currentSound) {
            this.currentSound.stop();
        }
    }

    setVolume(volumeLevel) {
        if (volumeLevel >= 0 && volumeLevel <= 1) {
            this.volumeLevel = volumeLevel;
            if (this.currentSound) {
                this.currentSound.volume(volumeLevel);
            }
        }
    }

    seek(timeInSeconds) {
        if (this.currentSound && timeInSeconds >= 0) {
            this.currentSound.seek(timeInSeconds);
        }
    }
}

export default SoundPlayer;
