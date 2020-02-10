//3D OR REGULAR
const box = document.querySelector(".d-depth input");
box.addEventListener("change", () => {
    const area = document.querySelector(".gameArea");
    const areaBtns = area.querySelectorAll(".row button");
    if (!box.checked) {
        area.classList.remove("transform");
        document.querySelector(".player").style.left = "200px";
        document.querySelector(".totalTurn").style.left = "200px";
        area.style.width = "100%";
        areaBtns.forEach(el => {
            el.style.width = "30px";
            el.style.height = "30px";
        });
        document.querySelector(".gameSection").classList.toggle("fadeIn");
    } else {
        area.classList.add("transform");
        document.querySelector(".player").style.left = "300px";
        document.querySelector(".totalTurn").style.left = "300px";
        area.style.width = "94%";
        areaBtns.forEach(el => {
            el.style.width = "40px";
            el.style.height = "40px";
        });
        document.querySelector(".gameSection").classList.toggle("fadeIn");
        document.querySelector(".gameArea").classList.add("fadeIn");
    }
});