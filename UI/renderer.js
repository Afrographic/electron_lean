window.addEventListener('DOMContentLoaded', () => {
    const newWindowBtn = document.getElementById("newWindowButton");
    newWindowBtn.addEventListener("click", function (e) {
        console.log("C'est grave");
        let result = window.electronAPI.setTitle({ title: "Big ass is good" })
        console.log('Electron replied ' + result);
    });
})

