window.addEventListener('DOMContentLoaded', () => {
    const newWindowBtn = document.getElementById("newWindowButton");
    newWindowBtn.addEventListener("click", function (e) {

        let result = window.electronAPI.createFile({ title: "server.txt", content: "I love her a lot" })
        console.log('Electron replied ' + result);
    });
})

