const login = document.getElementById("loginbox")
const register = document.getElementById("register")
var tela = true

document.querySelector("#entrar").addEventListener("click", (event) => {
    event.preventDefault();
    console.log(tela);
    if (tela === true) {
        login.classList.toggle("descer");
    }
    else if (tela === false) {
        register.classList.toggle("descer");
        tela = true;
    }
});

document.querySelector("#reg").addEventListener("click", (event) => {
    event.preventDefault();
    login.classList.toggle("descer")
    register.classList.toggle("descer")
    tela = false;
});

document.querySelector("#login").addEventListener("click", (event) => {
    event.preventDefault();
    login.classList.toggle("descer")
    register.classList.toggle("descer")
    tela = true;
});

function maskCpf() {
    var cpf = document.getElementById("cpf").value;
    cpf = cpf.slice(0, 14);
    document.getElementById("cpf").value = cpf;

    if (cpf[3] != ".") {
        if (cpf[3] != undefined) {
            cpf = cpf.slice(0, 3) + "." + cpf.slice(3);
            document.getElementById("cpf").value = cpf;
        }
    }
    if (cpf[7] != ".") {
        if (cpf[7] != undefined) {
            cpf = cpf.slice(0, 7) + "." + cpf.slice(7);
            document.getElementById("cpf").value = cpf;
        }
    }
    if (cpf[11] != "-") {
        if (cpf[11] != undefined) {
            cpf = cpf.slice(0, 11) + "-" + cpf.slice(11);
            document.getElementById("cpf").value = cpf;
        }
    }
}

function maskTel() {
    var tel = document.getElementById("tel").value;
    tel = tel.slice(0, 20);
    document.getElementById("tel").value = tel;

    if (tel[0] != "+") {
        if (tel[0] != undefined) {
            tel = "+" + tel;
            document.getElementById("tel").value = tel;
        }
    }
    if (tel[3] != " ") {
        if (tel[3] != undefined) {
            tel = tel.slice(0, 3) + " " + tel.slice(3);
            document.getElementById("tel").value = tel;
        }
    }
    if (tel[4] != "(") {
        if (tel[4] != undefined) {
            tel = tel.slice(0, 4) + "(" + tel.slice(4);
            document.getElementById("tel").value = tel;
        }
    }
    if (tel[7] != ")") {
        if (tel[7] != undefined) {
            tel = tel.slice(0, 7) + ")" + tel.slice(7);
            document.getElementById("tel").value = tel;
        }
    }
    if (tel[8] != " ") {
        if (tel[8] != undefined) {
            tel = tel.slice(0, 8) + " " + tel.slice(8);
            document.getElementById("tel").value = tel;
        }
    }
    if (tel[10] != " ") {
        if (tel[10] != undefined) {
            tel = tel.slice(0, 10) + " " + tel.slice(10);
            document.getElementById("tel").value = tel;
        }
    }
    if (tel[15] != "-") {
        if (tel[15] != undefined) {
            tel = tel.slice(0, 15) + "-" + tel.slice(15);
            document.getElementById("tel").value = tel;
        }
    }
}

function maskCep() {
    var cep = document.getElementById("cep").value;
    cep = cep.slice(0, 10);
    document.getElementById("cep").value = cep;

    if (cep[2] != ".") {
        if (cep[2] != undefined) {
            cep = cep.slice(0, 2) + "." + cep.slice(2);
            document.getElementById("cep").value = cep;
        }
    }
    if (cep[6] != "-") {
        if (cep[6] != undefined) {
            cep = cep.slice(0, 6) + "-" + cep.slice(6);
            document.getElementById("cep").value = cep;
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
    dialogo.addEventListener("click", evento => {
        if (evento.target === dialogo) dialogo.close();
    });

    const form = dialogo.querySelector("form");
    if (!form) return;

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
        ?.addEventListener("click", () => dialogo.close());
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
    if(localStorage.getItem("logado") === "true"){
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
            id_cliente: localStorage.getItem("id_cliente"),
            data: new Date().toISOString(),
            itens: itens,
            total: arredondar(itens.reduce((soma, item) => soma + item.subtotal, 0))
        };
    
        baixarJSON(pedido, `${idPedido}.json`);
    
        limparCarrinho();
        location.hash = "#nowhere";
        alert("Compra confirmada! O arquivo do pedido foi baixado.");
    }
    else {
        alert("Faça Login ou crie um conta para comprar.");
    }
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

// Sistema de Registro

function baixarJSON(dados, nomeArquivo = 'usuario.json') {
    const json = JSON.stringify(dados, null, 4);

    const blob = new Blob([json], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
}

document.querySelector("#registerSubmit").addEventListener("click", (event) => {
    event.preventDefault();

    const user = {
        email: document.querySelector("#registerMail").value,
        pass: document.querySelector("#registerPass").value,
        cpf: document.querySelector("#cpf").value,
        tel: document.querySelector("#tel").value,
        end: document.querySelector("#end").value,
        cep: document.querySelector("#cep").value,
        id_cliente: Date.now() + Math.floor(Math.random() * 1000)
    }

    localStorage.setItem("logado", "true");
    localStorage.setItem("email", user.email);
    localStorage.setItem("telefone", user.tel);
    localStorage.setItem("senha", user.pass);
    localStorage.setItem("id_cliente", user.id_cliente)

    perfil();
    register.classList.toggle("descer");

    baixarJSON(user);

    console.log(user)
});

document.querySelector("#loginSubmit").addEventListener("click", (event) => {
    event.preventDefault();

    const emailDigitado = document.querySelector("#loginMail").value.trim();
    const senhaDigitada = document.querySelector("#loginPass").value;

    const emailSalvo = localStorage.getItem("email");
    const senhaSalva = localStorage.getItem("senha");

    if (!emailSalvo) {
        alert("Nenhuma conta encontrada. Crie uma conta primeiro!");
        return;
    }

    if (emailDigitado === emailSalvo && senhaDigitada === senhaSalva) {
        localStorage.setItem("logado", "true");
        perfil();
        login.classList.remove("descer");
    } else {
        alert("Email ou senha incorretos.");
    }
});

function perfil() {
    const enter = document.getElementById("enter");
    if (enter && localStorage.getItem("logado") === "true") {
        enter.innerHTML = `
            <img src="imgs/profile.png" alt="Perfil" id="perfil" style="cursor: pointer;">
        `;
        document.getElementById("perfil").addEventListener("click", abrirHistoricoPedidos);
    }
}

window.onload = function () {
    perfil();
};

function abrirHistoricoPedidos() {
    const modal = document.getElementById("modalPedidos");
    const lista = document.getElementById("listaPedidos");
    const infoUsuario = document.getElementById("usuarioLogadoInfo");

    if (!modal || !lista) return;

    const emailUsuario = localStorage.getItem("email") || "Cliente";
    const idCliente = localStorage.getItem("id_cliente");
    if (infoUsuario) infoUsuario.textContent = `Conta: ${emailUsuario}`;

    const todosPedidos = JSON.parse(localStorage.getItem("historico_pedidos") || "[]");
    const meusPedidos = todosPedidos.filter(p => String(p.id_cliente) === String(idCliente));

    if (meusPedidos.length === 0) {
        lista.innerHTML = `<p class="sem-pedidos">Você ainda não realizou nenhum pedido.</p>`;
    } else {
        lista.innerHTML = meusPedidos.map(pedido => {
            const dataFormatada = new Date(pedido.data).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short"
            });

            const itensHtml = pedido.itens.map(item => `
                <li>
                    <span>${item.quantidade}x ${item.nome}${item.tamanho ? ` (${item.tamanho})` : ""}</span>
                    <span>${formatar(item.subtotal)}</span>
                </li>
            `).join("");

            return `
                <div class="card-pedido-historico">
                    <div class="pedido-topo">
                        <strong>#${pedido.idPedido}</strong>
                        <span>${dataFormatada}</span>
                    </div>
                    <ul class="pedido-itens">
                        ${itensHtml}
                    </ul>
                    <div class="pedido-rodape">
                        <span>Total pago:</span>
                        <strong>${formatar(pedido.total)}</strong>
                    </div>
                </div>
            `;
        }).join("");
    }

    if (!modal.open) {
        modal.showModal();
    }
}

// Fecha o modal de pedidos ou faz logout
document.addEventListener("click", (e) => {
    const modalPedidos = document.getElementById("modalPedidos");
    if (!modalPedidos || !modalPedidos.open) return;

    if (e.target.closest("#fecharPedidos") || e.target.closest("#btnFecharPedidos") || e.target === modalPedidos) {
        e.preventDefault();
        e.stopPropagation();
        modalPedidos.close();
    }

    if (e.target.closest("#btnSairConta")) {
        e.preventDefault();
        e.stopPropagation();
        localStorage.setItem("logado", "false");
        modalPedidos.close();
        location.reload();
    }
});


document.addEventListener("DOMContentLoaded", () => {
    perfil();

    const modalPedidos = document.getElementById("modalPedidos");
    if (!modalPedidos) return;

    document.getElementById("fecharPedidos")?.addEventListener("click", () => modalPedidos.close());
    document.getElementById("btnFecharPedidos")?.addEventListener("click", () => modalPedidos.close());

    modalPedidos.addEventListener("click", (e) => {
        if (e.target === modalPedidos) modalPedidos.close();
    });

    document.getElementById("btnSairConta")?.addEventListener("click", () => {
        localStorage.setItem("logado", "false");
        modalPedidos.close();
        location.reload();
    });
});

window.addEventListener("load", () => {
    perfil();

    const modalPedidos = document.getElementById("modalPedidos");
    if (modalPedidos) {
        document.getElementById("fecharPedidos")?.addEventListener("click", () => modalPedidos.close());
        document.getElementById("btnFecharPedidos")?.addEventListener("click", () => modalPedidos.close());

        modalPedidos.addEventListener("click", (e) => {
            if (e.target === modalPedidos) modalPedidos.close();
        });

        document.getElementById("btnSairConta")?.addEventListener("click", () => {
            localStorage.setItem("logado", "false");
            modalPedidos.close();
            location.reload();
        });
    }
});

// Eventos dos botões dentro do modal de pedidos
document.addEventListener("DOMContentLoaded", () => {
    const modalPedidos = document.getElementById("modalPedidos");
    if (!modalPedidos) return;

    document.getElementById("fecharPedidos")?.addEventListener("click", () => modalPedidos.close());
    document.getElementById("btnFecharPedidos")?.addEventListener("click", () => modalPedidos.close());

    // Fecha ao clicar fora do modal
    modalPedidos.addEventListener("click", (e) => {
        if (e.target === modalPedidos) modalPedidos.close();
    });

    // Botão opcional para deslogar
    document.getElementById("btnSairConta")?.addEventListener("click", () => {
        localStorage.setItem("logado", "false");
        modalPedidos.close();
        location.reload();
    });
});


window.onload = function () {
    perfil();
};


document.addEventListener("DOMContentLoaded", () => {
    const searchContainer = document.getElementById("SearchBar");
    const inputPesquisa = document.getElementById("BarraDePesquisa");
    const boxResultados = document.getElementById("resultadosPesquisa");
    const btnBuscar = document.getElementById("btnBuscar");

    if (!inputPesquisa || !boxResultados) {
        console.warn("Aviso: 'BarraDePesquisa' ou 'resultadosPesquisa' não encontrados neste HTML.");
        return;
    }

    const catalogoPizzas = [
        { id: 1, nome: "Mussarela", preco: 64.90, imagem: "imgs/LogoPizzaCalda.png" },
        { id: 2, nome: "Marguerita", preco: 86.90, imagem: "imgs/LogoPizzaCalda.png" },
        { id: 3, nome: "Portuguesa", preco: 68.90, imagem: "imgs/LogoPizzaCalda.png" },
        { id: 4, nome: "Presunto", preco: 66.90, imagem: "imgs/LogoPizzaCalda.png" },
        { id: 5, nome: "Frango", preco: 45.90, imagem: "imgs/LogoPizzaCalda.png" },
        { id: 6, nome: "Pepperoni", preco: 64.90, imagem: "imgs/LogoPizzaCalda.png" },
        { id: 7, nome: "Carne", preco: 69.90, imagem: "imgs/LogoPizzaCalda.png" }
    ];

    function executarPesquisa() {
        const termo = inputPesquisa.value.toLowerCase().trim();

        if (termo === "") {
            boxResultados.classList.remove("ativo");
            boxResultados.innerHTML = "";
            return;
        }

        const filtradas = catalogoPizzas.filter(pizza =>
            pizza.nome.toLowerCase().includes(termo)
        );

        boxResultados.innerHTML = "";
        boxResultados.classList.add("ativo");

        if (filtradas.length === 0) {
            boxResultados.innerHTML = `<div class="sem-resultado">Nenhuma pizza encontrada.</div>`;
            return;
        }

        filtradas.forEach(pizza => {
            const card = document.createElement("div");
            card.className = "card-pesquisa";

            const precoFormatado = typeof formatar === "function" 
                ? formatar(pizza.preco) 
                : `R$ ${pizza.preco.toFixed(2).replace(".", ",")}`;

            // Botão com a imagem sacola.png
            card.innerHTML = `
                <img src="${pizza.imagem}" alt="Pizza de ${pizza.nome}">
                <div class="info-pesquisa">
                    <strong>${pizza.nome}</strong>
                    <span>${precoFormatado}</span>
                </div>
                <button type="button" class="btn-add-pesquisa" aria-label="Adicionar ${pizza.nome} ao carrinho">
                    <img src="imgs/sacola.png" alt="Adicionar à sacola">
                </button>
            `;

            const btnAdd = card.querySelector(".btn-add-pesquisa");
            btnAdd.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (typeof adicionarProduto === "function") {
                    adicionarProduto(pizza.nome, pizza.preco, pizza.imagem, pizza.id, null);
                } else {
                    alert(`${pizza.nome} adicionada!`);
                }

                boxResultados.classList.remove("ativo");
                inputPesquisa.value = "";
            });

            boxResultados.appendChild(card);
        });
    }

    inputPesquisa.addEventListener("input", executarPesquisa);
    inputPesquisa.addEventListener("focus", executarPesquisa);

    if (btnBuscar) {
        btnBuscar.addEventListener("click", (e) => {
            e.preventDefault();
            executarPesquisa();
        });
    }

    document.addEventListener("click", (event) => {
        if (searchContainer && !searchContainer.contains(event.target)) {
            boxResultados.classList.remove("ativo");
        }
    });
});

document.getElementById("enbutton").addEventListener("click", (event) => {
    event.preventDefault();

    if (localStorage.getItem("logado") !== "true") {
        alert("Faça login ou crie uma conta para se tornar entregador.");
        return;
    }

    const dadosEntregador = {
        id_cliente: localStorage.getItem("id_cliente"),
        email: localStorage.getItem("email"),
        telefone: localStorage.getItem("telefone")
    };

    baixarJSON(dadosEntregador, `entregador-${dadosEntregador.id_cliente}.json`);
    mostrarAviso("Solicitação de entregador enviada!");
});