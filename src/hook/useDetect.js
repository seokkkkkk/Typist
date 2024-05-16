import { useEffect, useRef } from "react";
import SoundPlayer from "../utils/SoundPlayer";
import defaultSound from "../assets/sounds/default1.mp3";

export function useDetect() {
    const hasRunOnce = useRef(false);
    const soundPlayer = new SoundPlayer([defaultSound], 0);

    useEffect(() => {
        const handleClick = () => {
            if (!hasRunOnce.current) {
                hasRunOnce.current = true;
                soundPlayer.play();
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);
}
