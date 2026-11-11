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

function formatar(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}


function nomeCompleto(item) {
    return item.tamanho ? `${item.nome} (${item.tamanho})` : item.nome;
}

function adicionarProduto(nome, preco, imagem, id, tamanho) {

    if (window.event) window.event.preventDefault();

    tamanho = tamanho || null;


    var produtoExistente = carrinho.find(item => item.id === id && item.tamanho === tamanho);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            id,
            nome,
            tamanho,
            preco,
            imagem,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    mostrarAviso(`${nomeCompleto({ nome, tamanho })} adicionado ao carrinho`);
}

function atualizarCarrinho() {
    var areaCarrinho = document.getElementById("carCom");
    var total = 0;
    var html = "";

    carrinho.forEach((item, indice) => {
        var subtotalItem = item.preco * item.quantidade;
        total += subtotalItem;

        html += `
            <div class="card-carrinho">
                <img src="${item.imagem}" alt="${nomeCompleto(item)}">

                <div class="info">
                    <p class="nome-item">${nomeCompleto(item)}</p>

                    <div class="quantidade">
                        <button onclick="diminuir(${indice})">−</button>
                        <span>${item.quantidade}</span>
                        <button onclick="aumentar(${indice})">+</button>
                    </div>
                </div>

                <div class="lado-direito">
                    <button class="remover" aria-label="Remover ${nomeCompleto(item)}"
                            onclick="removerProduto(${indice})">🗑️</button>
                    <span class="preco">${formatar(subtotalItem)}</span>
                </div>
            </div>
        `;
    });

    areaCarrinho.innerHTML = html;
    document.getElementById("total").textContent = formatar(total);
}

function aumentar(indice) {
    carrinho[indice].quantidade++;
    atualizarCarrinho();
}

function diminuir(indice) {
    carrinho[indice].quantidade--;

    if (carrinho[indice].quantidade <= 0) {
        carrinho.splice(indice, 1);
    }

    atualizarCarrinho();
}

function removerProduto(indice) {
    carrinho.splice(indice, 1);
    atualizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

document.getElementById("limpar").addEventListener("click", limparCarrinho);

atualizarCarrinho();



function abrirTamanho(event, idDialog) {
    event.preventDefault();
    document.getElementById(idDialog).showModal();
}


document.querySelectorAll("dialog.tamanho-dialog").forEach(dialogo => {
    const form = dialogo.querySelector("form");


    form.addEventListener("submit", evento => {
        evento.preventDefault();

        const escolhido = form.querySelector("input[name='tamanho']:checked");
        if (!escolhido) return;

        adicionarProduto(
            dialogo.dataset.nome,
            parseFloat(escolhido.dataset.preco),
            dialogo.dataset.imagem,
            Number(dialogo.dataset.id),   
            escolhido.value               
        );

        form.reset();
        dialogo.close();
    });


    dialogo.querySelector(".tamanho-cancelar")
        .addEventListener("click", () => dialogo.close());


    dialogo.addEventListener("click", evento => {
        if (evento.target === dialogo) dialogo.close();
    });
});


function arredondar(valor) {
    return Math.round(valor * 100) / 100;
}


function baixarJSON(dados, nomeArquivo) {
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}


function comprar() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    const itens = carrinho.map(item => ({
        idProduto: item.id,
        nome: item.nome,
        tamanho: item.tamanho,
        precoUnitario: item.preco,
        quantidade: item.quantidade,
        subtotal: arredondar(item.preco * item.quantidade)
    }));

    const idPedido = `PED-${Date.now()}`;

    const pedido = {
        idPedido: idPedido,
        data: new Date().toISOString(),
        itens: itens,
        total: arredondar(itens.reduce((soma, item) => soma + item.subtotal, 0))
    };

    baixarJSON(pedido, `${idPedido}.json`);

    limparCarrinho();
    location.hash = "#nowhere";  
    alert("Compra confirmada! O arquivo do pedido foi baixado.");
}

document.getElementById("comprar").addEventListener("click", comprar);

function mostrarAviso(texto) {
    let area = document.getElementById("avisos");
 
    if (!area) {
        area = document.createElement("div");
        area.id = "avisos";
        area.setAttribute("role", "status");
        area.setAttribute("aria-live", "polite");
        document.body.appendChild(area);
    }
 
    const aviso = document.createElement("div");
    aviso.className = "aviso";
    aviso.textContent = texto;  
    area.appendChild(aviso);
 
    setTimeout(() => {
        aviso.classList.add("saindo");
        aviso.addEventListener("animationend", () => aviso.remove());
    }, 2500);
}


const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = {
        email: document.getElementById("registerMail").value,
        senha: document.getElementById("registerPass").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("tel").value,
        endereco: document.getElementById("end").value,
        cep: document.getElementById("cep").value
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    register.classList.toggle("descer");
    localStorage.setItem("logado", "true");

    baixarJson();

    alert("Cadastro realizado!");
});


loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginMail").value;
    const senha = document.getElementById("loginPass").value;

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (
        usuario &&
        usuario.email === email &&
        usuario.senha === senha
    ) {

        localStorage.setItem("logado", "true");

        login.classList.toggle("descer");

        mostrarPerfil();

        alert("Login realizado!");

    } else {

        alert("Email ou senha incorretos!");

    }
});

function mostrarPerfil() {

    const enter = document.getElementById("enter");

    enter.innerHTML = `
        <img
            src="img/profile.png"
            alt="Perfil"
            id="profile"
            style="width:45px;height:45px;border-radius:50%;cursor:pointer;"
        >
    `;

    document
        .getElementById("profile")
        .addEventListener("click", logout);
}

window.addEventListener("load", () => {

    if(localStorage.getItem("logado") === "true"){
        mostrarPerfil();
    }

});

function logout(){

    localStorage.removeItem("logado");

    document.getElementById("enter").innerHTML = `
        <a href="" class="font-inter" id="entrar">Entrar</a>
    `;
}

function baixarJson() {

    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        alert("Nenhum usuário cadastrado.");
        return;
    }

    const blob = new Blob([usuario], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "usuario.json";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}