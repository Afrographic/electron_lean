window.addEventListener('DOMContentLoaded', () => {
    const newWindowBtn = document.getElementById("newWindowButton");
    newWindowBtn.addEventListener("click", function (e) {
        console.log("C'est grave");
        window.electronAPI.setTitle("Big ass is good")
    });
})

