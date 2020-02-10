const backMusic = new Audio("../assets/media/videoplayback.weba");
backMusic.play();
backMusic.volume = 0.05;

const soundEl = document.querySelector(".sound input");
soundEl.addEventListener("change", () => {
    if (!soundEl.checked) {
        backMusic.pause();
    } else {
        backMusic.play();
    }
});