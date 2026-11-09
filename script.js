const login = document.getElementById("loginbox")
const register = document.getElementById("register")

document.querySelector("#entrar").addEventListener("click", (event) => {
    event.preventDefault();
    login.classList.toggle("descer")
});

document.querySelector("#reg").addEventListener("click", (event) => {
    event.preventDefault();
    login.classList.toggle("descer")
    register.classList.toggle("descer")
});

document.querySelector("#login").addEventListener("click", (event) => {
    event.preventDefault();
    login.classList.toggle("descer")
    register.classList.toggle("descer")
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

function maskCpf(){
    var cpf = document.getElementById("cpf").value
    cpf = cpf.slice(0,14)
    document.getElementById("cpf").value = cpf

    if(cpf[3] != "."){
        if(cpf[3] != undefined){
            cpf = cpf.slice(0,3) + "." + cpf[3]
            document.getElementById("cpf").value = cpf
        }
    }
    if(cpf[7] != "."){
        if(cpf[7] != undefined){
            cpf = cpf.slice(0,7) + "." + cpf[7]
            document.getElementById("cpf").value = cpf
        }
    }
    if(cpf[11] != "-"){
        if(cpf[11] != undefined){
            cpf = cpf.slice(0,11) + "-" + cpf[11]
            document.getElementById("cpf").value = cpf
        }
    }
}

function maskTel(){
    var tel = document.getElementById("tel").value
    tel = tel.slice(0,20)
    document.getElementById("tel").value = tel

    if(tel[0] != "+"){
        if(tel[0] != undefined){
            tel = "+" + tel[0]
            document.getElementById("tel").value = tel
        }
    }
    if(tel[3] != " "){
        if(tel[3] != undefined){
            tel = tel.slice(0,3) + " " + tel[3]
            document.getElementById("tel").value = tel
        }
    }
    if(tel[4] != "("){
        if(tel[4] != undefined){
            tel = tel.slice(0,4) + "(" + tel[4]
            document.getElementById("tel").value = tel
        }
    }
    if(tel[7] != ")"){
        if(tel[7] != undefined){
            tel = tel.slice(0,7) + ")" + tel[7]
            document.getElementById("tel").value = tel
        }
    }
    if(tel[8] != " "){
        if(tel[8] != undefined){
            tel = tel.slice(0,8) + " " + tel[8]
            document.getElementById("tel").value = tel
        }
    }
    if(tel[10] != " "){
        if(tel[10] != undefined){
            tel = tel.slice(0,10)+ " " + tel[10]
            document.getElementById("tel").value = tel
        }
    }
    if(tel[15] != "-"){
        if(tel[15] != undefined){
            tel = tel.slice(0,15)+ "-" + tel[15]
            document.getElementById("tel").value = tel
        }
    }
}

function maskCep() {
    var cep = document.getElementById("cep").value
    cep = cep.slice(0,11)
    document.getElementById("cep").value = cep

    if(cep[2] != "."){
        if(cep[2] != undefined){
            cep = cep.slice(0,2) + "." + cep[2]
            document.getElementById("cep").value = cep
        }
    }
    if(cep[6] != "-"){
        if(cep[6] != undefined){
            cep = cep.slice(0,6) + "-" + cep[5]
            document.getElementById("cep").value = cep
        }
    }
}


var carrinho = [];

function adicionarProduto(nome, preco, imagem){
    console.log("oi")
    event.preventDefault();
    var produtoExistente =
        carrinho.find(item => item.nome === nome);

    if(produtoExistente){
        produtoExistente.quantidade++;
    }
    else{
        carrinho.push({
            nome,
            preco,
            imagem,
            quantidade:1
        });
    }

    atualizarCarrinho();
}

function atualizarCarrinho(){

    var areaCarrinho = document.getElementById("carCom");

    areaCarrinho.innerHTML = "";

    var total = 0;

    carrinho.forEach((item, indice) => {

    total += item.preco * item.quantidade;

    areaCarrinho.innerHTML += `
        <div class="card-carrinho">

            <img src="${item.imagem}">

            <div class="info">
                <h4>${item.nome}</h4>
                <p>R$ ${item.preco}0</p>
            </div>

            <div class="quantidade">
                <button onclick="aumentar(${indice})">▲</button>

                <span>${item.quantidade}</span>

                <button onclick="diminuir(${indice})">▼</button>
            </div>

            <button
                class="btn-remover"
                onclick="removerProduto(${indice})">
                🗑️
            </button>

        </div>
    `;
});

    document.getElementById("total").textContent = total.toFixed(2);
}

function aumentar(indice){
    carrinho[indice].quantidade++;
    atualizarCarrinho();
}


function diminuir(indice){

    carrinho[indice].quantidade--;

    if(carrinho[indice].quantidade <= 0){
        carrinho.splice(indice, 1);
    }

    atualizarCarrinho();
}

function removerProduto(indice){
    carrinho.splice(indice, 1);
    atualizarCarrinho();
}
