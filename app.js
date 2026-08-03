/* ===========================================================
   PITIKINHOS
   app.js
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarLogin();
    atualizarData();
    gerarNumeroPedido();

    // DATA AUTOMÁTICA DO PEDIDO
    const campoDataPedido = document.getElementById("dataPedido");

    if (campoDataPedido) {

        const hoje = new Date();

        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");

        campoDataPedido.value = `${ano}-${mes}-${dia}`;
    }

    etapaAtual = 1;
    atualizarProgresso();

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
function gerarNumeroPedido() {

    const hoje = new Date();

    const ano = String(hoje.getFullYear()).slice(-2);
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");

    const chave = `pedido_${ano}_${mes}`;

    let sequencia = Number(localStorage.getItem(chave)) || 1;

    const numero = `${ano}.${mes}.${String(sequencia).padStart(3, "0")}`;

    document.getElementById("numeroPedido").textContent = numero;

}
function salvarNumeroPedido() {

    const hoje = new Date();

    const ano = String(hoje.getFullYear()).slice(-2);
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");

    const chave = `pedido_${ano}_${mes}`;

    let sequencia = Number(localStorage.getItem(chave)) || 1;

    localStorage.setItem(chave, sequencia + 1);

}
/* ===========================================================
   AVANÇAR ETAPAS
=========================================================== */

let etapaAtual = 1;

function atualizarProgresso() {

    const barra = document.querySelector(".progress-fill");
    const etapas = document.querySelectorAll(".step");

    const largura = {
    1: "25%",
    2: "50%",
    3: "75%",
    4: "100%"
};

    barra.style.width = largura[etapaAtual];

    etapas.forEach((etapa, indice) => {

        if (indice === etapaAtual - 1) {
            etapa.classList.add("active");
        } else {
            etapa.classList.remove("active");
        }

    });

}
function proximaEtapa() {

    const atual = document.getElementById("etapa" + etapaAtual);

    if (atual) {
        atual.style.display = "none";
    }

    if (etapaAtual < 4) {
        etapaAtual++;
    }

    atualizarProgresso();

    const proxima = document.getElementById("etapa" + etapaAtual);

if (proxima) {
    proxima.style.display = "block";

}
if (etapaAtual === 4) {
    atualizarResumo();
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

const sexo = document.getElementById("Sexo").value;

const tamanho = document.getElementById("tamanho").value;

const quantidade = Number(document.getElementById("quantidade").value);

const valor = Number(document.getElementById("valor").value);

const subtotal = quantidade * valor;

    produtos.push({

        produto,
    
        sexo,

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

   <td>${item.produto} - Tam. ${item.tamanho} - ${item.sexo}</td>

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

}
function atualizarPagamento() {

    const pagamento = document.getElementById("pagamento").value;
    const campoAcrescimo = document.getElementById("acrescimoPagamento");
    const campoTotalGeral = document.getElementById("totalGeral");

    // Soma dos produtos
    let totalProdutos = 0;

    produtos.forEach(item => {
        totalProdutos += item.subtotal;
    });

    // Valor do frete
    const frete = Number(document.getElementById("frete").value) || 0;

    // Produtos + frete
    const baseCalculo = totalProdutos + frete;

    // Acréscimo
    let acrescimo = 0;

    if (pagamento === "link") {
        acrescimo = baseCalculo * 0.06;
    }

    // Total final
    const totalGeral = baseCalculo + acrescimo;

    // Mostra o acréscimo
    campoAcrescimo.value = acrescimo.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    // Mostra o total geral
    campoTotalGeral.value = totalGeral.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}
function atualizarResumo() {

    const cliente = document.getElementById("cliente").value;
    const entrega = document.getElementById("tipoFrete").value;
    const pagamento = document.getElementById("pagamento").value;
    const frete = Number(document.getElementById("frete").value) || 0;

    // Soma os produtos
    let subtotal = 0;

    produtos.forEach(item => {
        subtotal += item.subtotal;
    });

    // Calcula o acréscimo
    const baseCalculo = subtotal + frete;

    let acrescimo = 0;

    if (pagamento === "link") {
        acrescimo = baseCalculo * 0.06;
    }

    const totalGeral = baseCalculo + acrescimo;

    // Preenche o resumo
    document.getElementById("resumoCliente").innerText =
        cliente || "-";

    document.getElementById("resumoEntrega").innerText =
        entrega || "-";

    document.getElementById("resumoPagamento").innerText =
        pagamento === "link"
            ? "Link de Pagamento"
            : pagamento === "pix"
            ? "PIX"
            : "-";

    document.getElementById("resumoSubtotal").innerText =
        subtotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("resumoFrete").innerText =
        frete.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("resumoAcrescimo").innerText =
        acrescimo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("resumoTotal").innerText =
        totalGeral.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    // ==========================
// RESUMO DAS PARCELAS
// ==========================

const resumoParcelas =
    document.getElementById("resumoParcelas");

const datasParcelas =
    document.querySelectorAll(".dataParcela");

const valoresParcelas =
    document.querySelectorAll(".valorParcela");

resumoParcelas.innerHTML = "";

if (datasParcelas.length > 0) {

    resumoParcelas.innerHTML =
        "<p><strong>Parcelamento:</strong></p>";

    datasParcelas.forEach((campoData, indice) => {

        let dataFormatada = "-";

        if (campoData.value) {

            const partes =
                campoData.value.split("-");

            dataFormatada =
                partes[2] + "/" +
                partes[1] + "/" +
                partes[0];
        }

        const valor =
            valoresParcelas[indice].value;

        resumoParcelas.innerHTML += `
            <p>
                Parcela ${indice + 1}
                — ${dataFormatada}
                — ${valor}
            </p>
        `;
    });
}
}
function atualizarParcelamento() {

    const quantidadeParcelas =
        Number(document.getElementById("parcelas").value);

    const listaParcelas =
        document.getElementById("listaParcelas");

    // Limpa a lista anterior
    listaParcelas.innerHTML = "";

    // Sem parcelamento
    if (quantidadeParcelas === 0) {
        return;
    }

    // ==========================
    // CALCULA O TOTAL
    // ==========================

    let totalProdutos = 0;

    produtos.forEach(item => {
        totalProdutos += item.subtotal;
    });

    const frete =
        Number(document.getElementById("frete").value) || 0;

    const pagamento =
        document.getElementById("pagamento").value;

    const baseCalculo =
        totalProdutos + frete;

    let acrescimo = 0;

    if (pagamento === "link") {
        acrescimo = baseCalculo * 0.06;
    }

    const totalGeral =
        baseCalculo + acrescimo;

    const valorParcela =
        totalGeral / quantidadeParcelas;


    // ==========================
    // CRIA AS PARCELAS NA TELA
    // ==========================

    for (let i = 1; i <= quantidadeParcelas; i++) {

        const valorFormatado =
            valorParcela.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        listaParcelas.innerHTML += `

            <div class="input-group parcela-item">

                <label>
                    Parcela ${i}
                </label>

                <div class="parcela-campos">

                    <div>
                        <label>Data do pagamento</label>

                        <input
                            type="date"
                            class="dataParcela"
                            data-parcela="${i}"
                        >
                    </div>

                    <div>
                        <label>Valor</label>

                        <input
                            type="text"
                            class="valorParcela"
                            data-parcela="${i}"
                            value="${valorFormatado}"
                            readonly
                        >
                    </div>

                </div>

            </div>

        `;

    }

}

function gerarPDF() {
 
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
 
    // ==========================
    // CORES
    // ==========================
 
    const MARROM = [139, 100, 83];
    const BEGE = [239, 194, 170];
    const CINZA = [235, 235, 235];
    const PRETO = [35, 35, 35];
    const BRANCO = [255, 255, 255];
 
    doc.setTextColor(...MARROM);
    doc.setFillColor(...BEGE);
    doc.setDrawColor(...MARROM);
 
    doc.setFont("helvetica", "normal");
 
 
    // ==========================
    // DADOS DO CLIENTE
    // ==========================
 
    const cliente = document.getElementById("cliente").value;
    const cnpj = document.getElementById("cnpj").value;
    const telefone = document.getElementById("telefone").value;
    const instagram = document.getElementById("instagram").value;
 
    const cep = document.getElementById("cep")
        ? document.getElementById("cep").value
        : "";
 
    const endereco = document.getElementById("endereco").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const observacao = document.getElementById("observacao").value;
 
 
    // ==========================
    // ENTREGA E PAGAMENTO
    // ==========================
    
    const tipoFrete = document.getElementById("tipoFrete").value;
 
    const frete =
        Number(document.getElementById("frete").value) || 0;
 
    const pagamento =
        document.getElementById("pagamento").value;
 
    const dataPedido =
    document.getElementById("dataPedido").value;
    
    const dataPostagem =
        document.getElementById("dataPostagem").value;
 
 
    // ==========================
    // CÁLCULOS
    // ==========================
 
    let subtotalProdutos = 0;
 
    produtos.forEach(item => {
 
        subtotalProdutos += item.subtotal;
 
    });
 
    const baseCalculo = subtotalProdutos + frete;
 
    let acrescimo = 0;
 
    if (pagamento === "link") {
 
        acrescimo = baseCalculo * 0.06;
 
    }
 
    const totalGeral =
        baseCalculo + acrescimo;
 
 
    // Formatação de moeda
 
    const moeda = valor => {
 
        return valor.toLocaleString("pt-BR", {
 
            style: "currency",
            currency: "BRL"
 
        });
 
    };
 
    let dataPedidoFormatada = "-";
 
    if (dataPedido) {
 
    const partesPedido = dataPedido.split("-");
 
    dataPedidoFormatada =
        partesPedido[2] + "/" +
        partesPedido[1] + "/" +
        partesPedido[0];
 
}
    // Formatação da data
 
    let dataPostagemFormatada = "-";
 
    if (dataPostagem) {
 
        const partes = dataPostagem.split("-");
 
        dataPostagemFormatada =
            partes[2] + "/" +
            partes[1] + "/" +
            partes[0];
 
    }
 
 
    // Nome do pagamento
 
    let pagamentoFormatado = "-";
 
    if (pagamento === "pix") {
 
        pagamentoFormatado = "PIX";
 
    }
 
    if (pagamento === "link") {
 
        pagamentoFormatado =
            "Link de Pagamento";
 
    }
 
 
    // ==========================
    // CABEÇALHO
    // ==========================
 
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
 
    doc.text(
        "PITIKINHOS",
        14,
        20
    );
 
 
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
 
    doc.text(
        "Pedido Nº " +
        document.getElementById("numeroPedido").innerText,
        130,
        20
    );
 
 
    doc.line(
        14,
        28,
        196,
        28
    );
 
 
    // ==========================
    // CLIENTE
    // ==========================
 
    let y = 42;
 
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
 
    doc.text(
        "DADOS DO CLIENTE",
        14,
        y
    );
 
    y += 8;
 
 
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
 
 
    doc.text(
        "Nome: " + cliente,
        14,
        y
    );
 
    y += 7;
 
 
    doc.text(
        "CNPJ: " + cnpj,
        14,
        y
    );
 
    y += 7;
 
 
    doc.text(
        "Telefone: " + telefone,
        14,
        y
    );
 
    y += 7;
 
 
    doc.text(
        "Instagram: " + instagram,
        14,
        y
    );
 
    y += 7;
 
 
    doc.text(
        "CEP: " + cep,
        14,
        y
    );
 
    y += 7;
 
 
    doc.text(
        "Endereço: " + endereco,
        14,
        y
    );
 
    y += 7;
 
 
    doc.text(
        "Cidade: " +
        cidade +
        " - " +
        estado,
        14,
        y
    );
 
 
    y += 12;
 
 
    // ==========================
    // PRODUTOS
    // ==========================
 
    const linhas = [];
 
    produtos.forEach(item => {
 
        linhas.push([
 
            item.produto +
            " - Tam. " +
            item.tamanho +
            " - " +
            item.sexo,
 
            item.quantidade,
 
            moeda(item.valor),
 
            moeda(item.subtotal)
 
        ]);
 
    });
 
 
    doc.autoTable({
 
        startY: y,
 
        head: [[
            "Produto",
            "Qtd.",
            "Valor",
            "Subtotal"
        ]],
 
        body: linhas,
 
        theme: "grid",
 
        headStyles: {
 
            fillColor: MARROM,
            textColor: BRANCO,
 
            font: "helvetica",
            fontStyle: "bold",
            fontSize: 10,
 
            halign: "center"
 
        },
 
        bodyStyles: {
 
            font: "helvetica",
            fontStyle: "normal",
            fontSize: 9,
 
            textColor: PRETO
 
        },
 
        alternateRowStyles: {
 
            fillColor: CINZA
 
        },
 
        columnStyles: {
 
            0: {
                cellWidth: 90
            },
 
            1: {
                halign: "center"
            },
 
            2: {
                halign: "right"
            },
 
            3: {
                halign: "right"
            }
 
        }
 
    });
 
 
    let finalY =
        doc.lastAutoTable.finalY + 10;
 
 
    // ==========================
    // ENTREGA
    // ==========================
 
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
 
    doc.text(
        "ENTREGA E PAGAMENTO",
        14,
        finalY
    );
 
    finalY += 8;
 
 
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
 
 
    doc.text(
        "Entrega: " +
        (tipoFrete || "-"),
        14,
        finalY
    );
 
    finalY += 6;
 
 
    doc.text(
        "Pagamento: " +
        pagamentoFormatado,
        14,
        finalY
    );
 
    finalY += 6;
 
 
    // DATA DO PEDIDO E POSTAGEM
    doc.setFont("helvetica", "bold");
 
    doc.text(
        "PEDIDO " +
        dataPedidoFormatada +
        " - POSTAGEM " +
        dataPostagemFormatada,
        14,
        finalY
    );
 
    doc.setFont("helvetica", "normal");
 
 
    finalY += 12;
 
 
    // ==========================
    // VALORES
    // ==========================
 
    doc.autoTable({
 
        startY: finalY,
 
        theme: "grid",
 
        body: [
 
            [
                "TOTAL:",
                moeda(subtotalProdutos)
            ],
 
            [
                "FRETE:",
                moeda(frete)
            ],
 
            [
                "ACRÉSCIMO:",
                moeda(acrescimo)
            ],
 
            [
                "TOTAL:",
                moeda(totalGeral)
            ]
 
        ],
 
        styles: {
 
            font: "helvetica",
            fontSize: 11
 
        },
 
        columnStyles: {
 
            0: {
 
                fontStyle: "bold",
                halign: "center"
 
            },
 
            1: {
 
                halign: "right"
 
            }
 
        },
 
        didParseCell: function(data) {
 
            // Primeira e última linha
            if (
                data.row.index === 0 ||
                data.row.index === 3
            ) {
 
                data.cell.styles.fillColor =
                    BEGE;
 
                data.cell.styles.textColor =
                    MARROM;
 
                data.cell.styles.fontStyle =
                    "bold";
 
            }
 
        }
 
    });
 
 
    finalY =
        doc.lastAutoTable.finalY + 12;
    // ==========================
// PARCELAMENTO
// ==========================

const datasParcelas =
    document.querySelectorAll(".dataParcela");

const valoresParcelas =
    document.querySelectorAll(".valorParcela");

if (datasParcelas.length > 0) {

    const linhasParcelas = [];

    datasParcelas.forEach((campoData, indice) => {

        let dataFormatada = "-";

        if (campoData.value) {

            const partes =
                campoData.value.split("-");

            dataFormatada =
                partes[2] + "/" +
                partes[1] + "/" +
                partes[0];
        }

        linhasParcelas.push([
            indice + 1,
            dataFormatada,
            valoresParcelas[indice].value
        ]);

    });


    doc.autoTable({

        startY: finalY,

        head: [[
            "PARCELA",
            "DATA PGTO.",
            "VALOR"
        ]],

        body: linhasParcelas,

        theme: "grid",

        headStyles: {
            fillColor: MARROM,
            textColor: BRANCO,
            font: "helvetica",
            fontStyle: "bold",
            fontSize: 10,
            halign: "center"
        },

        bodyStyles: {
            font: "helvetica",
            fontSize: 10,
            textColor: PRETO,
            halign: "center"
        },

        alternateRowStyles: {
            fillColor: CINZA
        }

    });

    // Atualiza a posição para as observações
    finalY =
        doc.lastAutoTable.finalY + 12;

}
 
    // ==========================
    // OBSERVAÇÕES
    // ==========================
 
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
 
    doc.text(
        "OBSERVAÇÕES",
        14,
        finalY
    );
 
    finalY += 8;
 
 
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
 
 
    const texto =
        doc.splitTextToSize(
            observacao || "-",
            180
        );
 
 
    doc.text(
        texto,
        14,
        finalY
    );
 
 
    // ==========================
    // SALVAR
    // ==========================
 
    doc.save(
        "Orcamento_Pitikinhos.pdf"
    );
 
 
    // ==========================
    // NOVO PEDIDO
    // ==========================
 
    salvarNumeroPedido();
 
    gerarNumeroPedido();
 
 
    // Reinicia as etapas
 
    etapaAtual = 1;
 
    atualizarProgresso();
 
 
    document.getElementById("etapa1")
        .style.display = "block";
 
    document.getElementById("etapa2")
        .style.display = "none";
 
    document.getElementById("etapa3")
        .style.display = "none";
 
    document.getElementById("etapa4")
        .style.display = "none";
 
}
 
function mascaraCNPJ(campo) {
 
    campo.value = campo.value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
 
}
function mascaraCEP(campo) {
 
    campo.value = campo.value
        .replace(/\D/g, "")
        .replace(/^(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1");
 
}
async function buscarCEP() {
 
    const cep = document.getElementById("cep").value.replace(/\D/g, "");
 
    if (cep.length !== 8) return;
 
    try {
 
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
 
        const dados = await resposta.json();
 
        if (dados.erro) return;
 
        document.getElementById("endereco").value = dados.logradouro;
        document.getElementById("cidade").value = dados.localidade;
        document.getElementById("estado").value = dados.uf;
 
    } catch (erro) {
 
        console.log("Erro ao buscar CEP.");
 
    }
 
}
