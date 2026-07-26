/* ===========================================================
   PITIKINHOS
   app.js
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarLogin();

    atualizarData();

    gerarNumeroPedido();

});

/* ===========================================================
   LOGIN
=========================================================== */

function iniciarLogin() {

    const formulario = document.getElementById("loginForm");

    if (!formulario) return;

    formulario.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();

        const senha = document.getElementById("senha").value.trim();

        if (email === "") {

            mostrarMensagem("Digite seu e-mail.", "erro");

            return;

        }

        if (senha === "") {

            mostrarMensagem("Digite sua senha.", "erro");

            return;

        }

        localStorage.setItem("usuario", email);

        mostrarMensagem("Entrando no sistema...", "sucesso");

        setTimeout(() => {

            window.location.href = "novopedido.html";

        }, 1000);

    });

}

/* ===========================================================
   DATA ATUAL
=========================================================== */

function atualizarData() {

    const elemento = document.getElementById("dataAtual");

    if (!elemento) return;

    const hoje = new Date();

    elemento.innerHTML = hoje.toLocaleDateString("pt-BR", {

        weekday: "long",

        day: "2-digit",

        month: "long",

        year: "numeric"

    });

}

/* ===========================================================
   NÚMERO DO PEDIDO
=========================================================== */

function gerarNumeroPedido() {

    const campo = document.getElementById("numeroPedido");

    if (!campo) return;

    const hoje = new Date();

    const ano = String(hoje.getFullYear()).slice(-2);

    const mes = String(hoje.getMonth() + 1).padStart(2, "0");

    let sequencia = Number(localStorage.getItem("sequenciaPedido")) || 1;

    campo.innerHTML = `${ano}.${mes}.${String(sequencia).padStart(3, "0")}`;

}

/* ===========================================================
   FINALIZAR PEDIDO
=========================================================== */

function finalizarPedido() {

    let sequencia = Number(localStorage.getItem("sequenciaPedido")) || 1;

    sequencia++;

    localStorage.setItem("sequenciaPedido", sequencia);

}

/* ===========================================================
   MENSAGENS
=========================================================== */

function mostrarMensagem(texto, tipo) {

    const antiga = document.querySelector(".toast");

    if (antiga) {

        antiga.remove();

    }

    const mensagem = document.createElement("div");

    mensagem.className = "toast";

    mensagem.innerHTML = texto;

    mensagem.style.position = "fixed";
    mensagem.style.top = "20px";
    mensagem.style.right = "20px";
    mensagem.style.padding = "15px 22px";
    mensagem.style.borderRadius = "12px";
    mensagem.style.fontWeight = "700";
    mensagem.style.color = "#fff";
    mensagem.style.zIndex = "9999";
    mensagem.style.transition = ".3s";
    mensagem.style.boxShadow = "0 12px 25px rgba(0,0,0,.15)";

    if (tipo === "erro") {

        mensagem.style.background = "#d9534f";

    } else {

        mensagem.style.background = "#28a745";

    }

    document.body.appendChild(mensagem);

    setTimeout(() => {

        mensagem.remove();

    }, 3000);

}

/* ===========================================================
   VOLTAR
=========================================================== */

function voltar() {

    history.back();

}

/* ===========================================================
   AVANÇAR ETAPAS
=========================================================== */

let etapaAtual = 1;

function proximaEtapa() {

    const atual = document.getElementById("etapa" + etapaAtual);

    if (atual) {

        atual.style.display = "none";

    }

    etapaAtual++;

    const proxima = document.getElementById("etapa" + etapaAtual);

    if (proxima) {

        proxima.style.display = "block";

    }

}

function etapaAnterior() {

    const atual = document.getElementById("etapa" + etapaAtual);

    if (atual) {

        atual.style.display = "none";

    }

    etapaAtual--;

    const anterior = document.getElementById("etapa" + etapaAtual);

    if (anterior) {

        anterior.style.display = "block";

    }

}

/* ===========================================================
   PRODUTOS
=========================================================== */

let produtos = [];

const tabelaProdutos = {

    "Roupa Pós Cirúrgica Sem Embalagem": {
        categoria: "Roupa Pós Cirúrgica",
        valor: 0
    },

    "Roupa Pós Cirúrgica Embalagem Simples": {
        categoria: "Roupa Pós Cirúrgica",
        valor: 0
    },

    "Roupa Pós Cirúrgica Embalagem com Botão": {
        categoria: "Roupa Pós Cirúrgica",
        valor: 0
    }

};
function atualizarProduto() {
//atualização futuramente
}

function adicionarProduto() {

const produto = document.getElementById("produto").value;

const tamanho = document.getElementById("tamanho").value;

const quantidade = Number(document.getElementById("quantidade").value);

const valor = Number(document.getElementById("valor").value);

const subtotal = quantidade * valor;

    produtos.push({

        produto,

        tamanho,

        quantidade,

        valor,

        subtotal

    });

    atualizarTabela();

}

function atualizarTabela() {

    const tabela = document.getElementById("listaProdutos");

    if (!tabela) return;

    tabela.innerHTML = "";

    let total = 0;

    produtos.forEach((item, indice) => {

        total += item.subtotal;

        tabela.innerHTML += `

        <tr>

    <td>${item.produto} - Tam. ${item.tamanho}</td>

    <td>${item.quantidade}</td>

    <td>R$ ${item.valor.toFixed(2)}</td>

    <td>R$ ${item.subtotal.toFixed(2)}</td>

    <td>
        <button onclick="removerProduto(${indice})">
            🗑
        </button>
    </td>

</tr>

        `;

    });

    const campoTotal = document.getElementById("totalPedido");

    if (campoTotal) {

        campoTotal.innerHTML = "R$ " + total.toFixed(2);

    }

}

function removerProduto(indice) {

    produtos.splice(indice, 1);

    atualizarTabela();

}function gerarPDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    //cores pdf
    const MARROM = [139, 100, 83];
    const BEGE = [239, 194, 170];
    const CINZA = [235, 235, 235];
    const PRETO = [35, 35, 35];
    const BRANCO = [255, 255, 255];

    doc.setTextColor(...MARROM);
    doc.setFillColor(...BEGE);
    doc.setDrawColor(...MARROM);
    // Dados do cliente
    const cliente = document.getElementById("cliente").value;
    const cnpj = document.getElementById("cnpj").value;
    const telefone = document.getElementById("telefone").value;
    const instagram = document.getElementById("instagram").value;
    const endereco = document.getElementById("endereco").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const observacao = document.getElementById("observacao").value;

    // Cabeçalho
    doc.setFontSize(18);
    doc.text("PITIKINHOS", 14, 20);

    doc.setFontSize(11);
    doc.text("Orçamento", 14, 28);

    doc.text("Pedido Nº: " + document.getElementById("numeroPedido").innerText, 140, 20);

    doc.line(14, 32, 196, 32);

    // Cliente
    let y = 42;

    doc.setFontSize(13);
    doc.text("Dados do Cliente", 14, y);

    y += 8;

    doc.setFontSize(11);

    doc.text("Nome: " + cliente, 14, y);
    y += 7;

    doc.text("CNPJ: " + cnpj, 14, y);
    y += 7;

    doc.text("Telefone: " + telefone, 14, y);
    y += 7;

    doc.text("Instagram: " + instagram, 14, y);
    y += 7;

    doc.text("Endereço: " + endereco, 14, y);
    y += 7;

    doc.text("Cidade: " + cidade + " - " + estado, 14, y);

    y += 12;

    // Produtos
    const linhas = [];

    document.querySelectorAll("#listaProdutos tr").forEach(tr => {

        const colunas = tr.querySelectorAll("td");

        if(colunas.length >= 4){

            linhas.push([
                colunas[0].innerText,
                colunas[1].innerText,
                colunas[2].innerText,
                colunas[3].innerText
            ]);

        }

    });

    doc.autoTable({
    startY: y,

    head: [["Produto","Qtd.","Valor","Subtotal"]],

    body: linhas,

    theme: "grid",

    headStyles: {
        fillColor: MARROM,
        textColor: BRANCO,
        fontStyle: "bold",
        halign: "center"
    },

    bodyStyles: {
        textColor: PRETO
    },

    alternateRowStyles: {
        fillColor: CINZA
    }
});

    // Total
    let finalY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(13);

    doc.text(
        "Total Geral: " + document.getElementById("totalPedido").innerText,
        14,
        finalY
    );

    finalY += 12;

    // Observações
    doc.setFontSize(12);
    doc.text("Observações:", 14, finalY);

    finalY += 8;

    doc.setFontSize(10);

    const texto = doc.splitTextToSize(observacao || "-", 180);

    doc.text(texto, 14, finalY);

    // Salvar
    doc.save("Orcamento_Pitikinhos.pdf");
}