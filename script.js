const login = document.getElementById("loginbox")

document.querySelector("#entrar").addEventListener("click", (event) => {
    event.preventDefault();
    login.classList.toggle("descer")
});

document.querySelector("#submeter").addEventListener("submit", (event) => {
    event.preventDefault();

    const login = {
        user: document.querySelector("#mail").value,
        pass: document.querySelector("#pass").value
    }

    JSON.stringify(login);
    JSON.blob(login);
})