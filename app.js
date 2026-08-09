/* ===========================================================
   PITIKINHOS
   app.js
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarLogin();
    atualizarData();
    gerarNumeroPedido();

    // DATA AUTOMÁTICA DO PEDIDO
    const campoDataPedido =
        document.getElementById("dataPedido");

    if (campoDataPedido) {

        const hoje = new Date();

        const ano =
            hoje.getFullYear();

        const mes =
            String(
                hoje.getMonth() + 1
            ).padStart(2, "0");

        const dia =
            String(
                hoje.getDate()
            ).padStart(2, "0");

        campoDataPedido.value =
            `${ano}-${mes}-${dia}`;

    }

    etapaAtual = 1;

    atualizarProgresso();

});


/* ===========================================================
   LOGIN
=========================================================== */

function iniciarLogin() {

    const formulario =
        document.getElementById("loginForm");

    if (!formulario) return;

    formulario.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const campoEmail =
                document.getElementById("email");

            const campoSenha =
                document.getElementById("senha");


            const email =
                campoEmail
                    ? campoEmail.value.trim()
                    : "";

            const senha =
                campoSenha
                    ? campoSenha.value.trim()
                    : "";


            if (email === "") {

                mostrarMensagem(
                    "Digite seu e-mail.",
                    "erro"
                );

                return;

            }


            if (senha === "") {

                mostrarMensagem(
                    "Digite sua senha.",
                    "erro"
                );

                return;

            }


            localStorage.setItem(
                "usuario",
                email
            );


            mostrarMensagem(
                "Entrando no sistema...",
                "sucesso"
            );


            setTimeout(() => {

                window.location.href =
                    "novopedido.html";

            }, 1000);

        }
    );

}


/* ===========================================================
   DATA ATUAL
=========================================================== */

function atualizarData() {

    const elemento =
        document.getElementById("dataAtual");

    if (!elemento) return;


    const hoje = new Date();


    elemento.innerHTML =
        hoje.toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

}


/* ===========================================================
   NÚMERO DO PEDIDO
=========================================================== */

/*
   A versão original possuía duas funções
   gerarNumeroPedido() diferentes.

   Como salvarNumeroPedido() utiliza a chave
   mensal "pedido_AA_MM", mantemos aqui
   a mesma lógica para evitar conflito.

   Formato:

   26.08.001
   26.08.002
   26.08.003
*/

function gerarNumeroPedido() {

    const hoje =
        new Date();


    const ano =
        String(
            hoje.getFullYear()
        ).slice(-2);


    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(2, "0");


    const chave =
        `pedido_${ano}_${mes}`;


    const sequencia =
        Number(
            localStorage.getItem(chave)
        ) || 1;


    const numero =
        `${ano}.${mes}.${String(
            sequencia
        ).padStart(3, "0")}`;


    const campo =
        document.getElementById(
            "numeroPedido"
        );


    if (!campo) return;


    campo.textContent =
        numero;

}


/* ===========================================================
   SALVAR NÚMERO DO PEDIDO
=========================================================== */

function salvarNumeroPedido() {

    const hoje =
        new Date();


    const ano =
        String(
            hoje.getFullYear()
        ).slice(-2);


    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(2, "0");


    const chave =
        `pedido_${ano}_${mes}`;


    const sequencia =
        Number(
            localStorage.getItem(chave)
        ) || 1;


    localStorage.setItem(
        chave,
        sequencia + 1
    );

}


/* ===========================================================
   FINALIZAR PEDIDO
=========================================================== */

function finalizarPedido() {

    /*
       A versão original utilizava
       "sequenciaPedido", enquanto o restante
       do sistema utilizava a sequência mensal.

       Mantemos uma única sequência.
    */

    salvarNumeroPedido();

}


/* ===========================================================
   MENSAGENS
=========================================================== */

function mostrarMensagem(
    texto,
    tipo
) {

    const antiga =
        document.querySelector(
            ".toast"
        );


    if (antiga) {

        antiga.remove();

    }


    const mensagem =
        document.createElement(
            "div"
        );


    mensagem.className =
        "toast";


    mensagem.innerHTML =
        texto;


    mensagem.style.position =
        "fixed";

    mensagem.style.top =
        "20px";

    mensagem.style.right =
        "20px";

    mensagem.style.padding =
        "15px 22px";

    mensagem.style.borderRadius =
        "12px";

    mensagem.style.fontWeight =
        "700";

    mensagem.style.color =
        "#fff";

    mensagem.style.zIndex =
        "9999";

    mensagem.style.transition =
        ".3s";

    mensagem.style.boxShadow =
        "0 12px 25px rgba(0,0,0,.15)";


    if (
        tipo === "erro"
    ) {

        mensagem.style.background =
            "#d9534f";

    }

    else {

        mensagem.style.background =
            "#28a745";

    }


    document.body.appendChild(
        mensagem
    );


    setTimeout(() => {

        if (mensagem.parentNode) {

            mensagem.remove();

        }

    }, 3000);

}


/* ===========================================================
   VOLTAR
=========================================================== */

function voltar() {

    window.location.href = "index.html";

}


/* ===========================================================
   AVANÇAR ETAPAS
=========================================================== */

let etapaAtual = 1;


/* ===========================================================
   ATUALIZAR PROGRESSO
=========================================================== */

function atualizarProgresso() {

    const barra =
        document.querySelector(
            ".progress-fill"
        );


    const etapas =
        document.querySelectorAll(
            ".step"
        );


    /*
       Correção:
       na versão original a função tentava
       acessar barra.style mesmo quando
       a barra não existia.
    */

    if (!barra) {

        return;

    }


    const largura = {

        1: "25%",
        2: "50%",
        3: "75%",
        4: "100%"

    };


    barra.style.width =
        largura[etapaAtual];


    etapas.forEach(
        (
            etapa,
            indice
        ) => {

            if (
                indice ===
                etapaAtual - 1
            ) {

                etapa.classList.add(
                    "active"
                );

            }

            else {

                etapa.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* ===========================================================
   PRÓXIMA ETAPA
=========================================================== */

function proximaEtapa() {

    const atual =
        document.getElementById(
            "etapa" + etapaAtual
        );


    if (atual) {

        atual.style.display =
            "none";

    }


    if (
        etapaAtual < 4
    ) {

        etapaAtual++;

    }


    atualizarProgresso();


    const proxima =
        document.getElementById(
            "etapa" + etapaAtual
        );


    if (proxima) {

        proxima.style.display =
            "block";

    }


    if (
        etapaAtual === 4
    ) {

        atualizarResumo();

    }

}


/* ===========================================================
   PRODUTOS
=========================================================== */

let produtos = [];


const tabelaProdutos = {

    "Roupa Pós Cirúrgica Sem Embalagem": {

        categoria:
            "Roupa Pós Cirúrgica",

        valor:
            0

    },


    "Roupa Pós Cirúrgica Embalagem Simples": {

        categoria:
            "Roupa Pós Cirúrgica",

        valor:
            0

    },


    "Roupa Pós Cirúrgica Embalagem com Botão": {

        categoria:
            "Roupa Pós Cirúrgica",

        valor:
            0

    },


    "Colar elizabetano de feltro para gatos - P": {

        categoria:
            "Brinde",

        valor:
            9.99,

        brinde:
            true

    },


    "Colar elizabetano de feltro para gatos - M": {

        categoria:
            "Brinde",

        valor:
            9.99,

        brinde:
            true

    },


    "Colar elizabetano de feltro para gatos - G": {

        categoria:
            "Brinde",

        valor:
            9.99,

        brinde:
            true

    }

};


/* ===========================================================
   ATUALIZAR PRODUTO
=========================================================== */

function atualizarProduto() {

    // atualização futuramente

}


/* ===========================================================
   ADICIONAR PRODUTO
=========================================================== */

function adicionarProduto() {

    const campoProduto =
        document.getElementById(
            "produto"
        );


    const campoSexo =
        document.getElementById(
            "Sexo"
        );


    const campoTamanho =
        document.getElementById(
            "tamanho"
        );


    const campoQuantidade =
        document.getElementById(
            "quantidade"
        );


    const campoValor =
        document.getElementById(
            "valor"
        );


    const campoBrinde =
        document.getElementById(
            "produtoBrinde"
        );


    /*
       Proteção para evitar erro
       caso algum campo não exista.
    */

    if (
        !campoProduto ||
        !campoSexo ||
        !campoTamanho ||
        !campoQuantidade ||
        !campoValor ||
        !campoBrinde
    ) {

        mostrarMensagem(
            "Não foi possível localizar todos os campos do produto.",
            "erro"
        );

        return;

    }


    const produto =
        campoProduto.value;


    const sexo =
        campoSexo.value;


    const tamanho =
        campoTamanho.value;


    const quantidade =
        Number(
            campoQuantidade.value
        );


    const valor =
        Number(
            String(
                campoValor.value
            ).replace(
                ",",
                "."
            )
        );


    /*
       Verifica se a caixinha
       de brinde foi marcada.
    */

    const brinde =
        campoBrinde.checked;


    /*
       Brinde não entra no cálculo.
    */

    const subtotal =
        brinde
            ? 0
            : quantidade * valor;


    produtos.push({

        produto,

        sexo,

        tamanho,

        quantidade,

        valor,

        subtotal,

        brinde

    });


    atualizarTabela();


    /*
       Limpa a caixinha depois
       de adicionar o produto.
    */

    campoBrinde.checked =
        false;

}


/* ===========================================================
   ATUALIZAR TABELA
=========================================================== */

function atualizarTabela() {

    const tabela =
        document.getElementById(
            "listaProdutos"
        );


    if (!tabela) return;


    tabela.innerHTML =
        "";


    let total =
        0;


    produtos.forEach(
        (
            item,
            indice
        ) => {


            /*
               Produtos normais entram
               no total.

               Brindes não entram.
            */

            if (
                !item.brinde
            ) {

                total +=
                    item.subtotal;

            }


            /*
               Define o que será mostrado
               na coluna Subtotal.
            */

            const subtotalExibicao =
                item.brinde

                    ? "BRINDE"

                    : "R$ " +
                      Number(
                          item.subtotal
                      ).toFixed(2);


            tabela.innerHTML += `

                <tr>

                    <td>

                        ${item.produto}

                        - Tam. ${item.tamanho}

                        - ${item.sexo}

                    </td>


                    <td>

                        ${item.quantidade}

                    </td>


                    <td>

                        R$ ${Number(
                            item.valor
                        ).toFixed(2)}

                    </td>


                    <td>

                        ${subtotalExibicao}

                    </td>


                    <td>

                        <button
                            type="button"
                            onclick="removerProduto(${indice})"
                        >
                            🗑
                        </button>

                    </td>

                </tr>

            `;

        }
    );


    const campoTotal =
        document.getElementById(
            "totalPedido"
        );


    if (campoTotal) {

        campoTotal.innerHTML =
            "R$ " +
            total.toFixed(2);

    }

}


/* ===========================================================
   REMOVER PRODUTO
=========================================================== */

/*
   Esta função era chamada pelo botão
   da tabela, mas não existia no arquivo
   original.

   Ela apenas remove o produto selecionado
   e atualiza a tabela.
*/

function removerProduto(indice) {

    if (
        indice < 0 ||
        indice >= produtos.length
    ) {

        return;

    }


    produtos.splice(
        indice,
        1
    );


    atualizarTabela();


    /*
       Se a função de pagamento estiver
       disponível, atualiza os valores.
    */

    atualizarPagamento();

}
/* ===========================================================
   PAGAMENTO
=========================================================== */

function atualizarPagamento() {

    const campoPagamento =
        document.getElementById(
            "pagamento"
        );

    const campoAcrescimo =
        document.getElementById(
            "acrescimoPagamento"
        );

    const campoTotalGeral =
        document.getElementById(
            "totalGeral"
        );

    const campoNotaFiscal =
        document.getElementById(
            "notaFiscal"
        );


    /*
       Proteção contra campos inexistentes.
    */

    if (
        !campoPagamento ||
        !campoAcrescimo ||
        !campoTotalGeral
    ) {

        return;

    }


    const pagamento =
        campoPagamento.value;


    const notaFiscal =
        campoNotaFiscal
            ? campoNotaFiscal.value
            : "";


    /* =======================================================
       SOMA DOS PRODUTOS
    ======================================================= */

    let totalProdutos = 0;


    produtos.forEach(
        item => {

            /*
               Brindes não entram
               no cálculo.
            */

            if (
                !item.brinde
            ) {

                totalProdutos +=
                    Number(
                        item.subtotal
                    ) || 0;

            }

        }
    );


    /* =======================================================
       FRETE
    ======================================================= */

    const campoFrete =
        document.getElementById(
            "frete"
        );


    const frete =
        campoFrete
            ? Number(
                String(
                    campoFrete.value
                ).replace(
                    ",",
                    "."
                )
              ) || 0
            : 0;


    /* =======================================================
       PRODUTOS + FRETE
    ======================================================= */

    const baseCalculo =
        totalProdutos +
        frete;


    /* =======================================================
       ACRÉSCIMOS
    ======================================================= */

    let acrescimoLink =
        0;


    let acrescimoNF =
        0;


    /*
       Taxa do Link de Pagamento — 6%
    */

    if (
        pagamento === "link"
    ) {

        acrescimoLink =
            baseCalculo * 0.06;

    }


    /*
       Taxa de Nota Fiscal — 4%
    */

    if (
        notaFiscal === "sim"
    ) {

        acrescimoNF =
            baseCalculo * 0.04;

    }


    /*
       Soma das taxas.
    */

    const acrescimo =
        acrescimoLink +
        acrescimoNF;


    /* =======================================================
       TOTAL FINAL
    ======================================================= */

    const totalGeral =
        baseCalculo +
        acrescimo;


    /* =======================================================
       MOSTRA O ACRÉSCIMO
    ======================================================= */

    campoAcrescimo.value =
        acrescimo.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );


    /* =======================================================
       MOSTRA O TOTAL GERAL
    ======================================================= */

    campoTotalGeral.value =
        totalGeral.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

}


/* ===========================================================
   RESUMO
=========================================================== */

function atualizarResumo() {

    const campoCliente =
        document.getElementById(
            "cliente"
        );


    const campoEntrega =
        document.getElementById(
            "tipoFrete"
        );


    const campoPagamento =
        document.getElementById(
            "pagamento"
        );


    const campoNotaFiscal =
        document.getElementById(
            "notaFiscal"
        );


    const campoFrete =
        document.getElementById(
            "frete"
        );


    /*
       Proteção.
    */

    if (
        !campoCliente
    ) {

        return;

    }


    const cliente =
        campoCliente.value;


    const entrega =
        campoEntrega
            ? campoEntrega.value
            : "";


    const pagamento =
        campoPagamento
            ? campoPagamento.value
            : "";


    const notaFiscal =
        campoNotaFiscal
            ? campoNotaFiscal.value
            : "";


    const frete =
        campoFrete
            ? Number(
                String(
                    campoFrete.value
                ).replace(
                    ",",
                    "."
                )
              ) || 0
            : 0;


    /* =======================================================
       SUBTOTAL DOS PRODUTOS
    ======================================================= */

    let subtotal =
        0;


    produtos.forEach(
        item => {

            /*
               Brindes não entram
               no total.
            */

            if (
                !item.brinde
            ) {

                subtotal +=
                    Number(
                        item.subtotal
                    ) || 0;

            }

        }
    );


    /* =======================================================
       BASE DE CÁLCULO
    ======================================================= */

    const baseCalculo =
        subtotal +
        frete;


    /* =======================================================
       TAXA DO LINK — 6%
    ======================================================= */

    let acrescimoLink =
        0;


    if (
        pagamento === "link"
    ) {

        acrescimoLink =
            baseCalculo * 0.06;

    }


    /* =======================================================
       TAXA NF — 4%
    ======================================================= */

    let acrescimoNF =
        0;


    if (
        notaFiscal === "sim"
    ) {

        acrescimoNF =
            baseCalculo * 0.04;

    }


    /* =======================================================
       TOTAL FINAL
    ======================================================= */

    const totalGeral =
        baseCalculo +
        acrescimoLink +
        acrescimoNF;


    /* =======================================================
       RESUMO DO CLIENTE
    ======================================================= */

    const resumoCliente =
        document.getElementById(
            "resumoCliente"
        );


    if (
        resumoCliente
    ) {

        resumoCliente.innerText =
            cliente || "-";

    }


    /* =======================================================
       RESUMO DA ENTREGA
    ======================================================= */

    const resumoEntrega =
        document.getElementById(
            "resumoEntrega"
        );


    if (
        resumoEntrega
    ) {

        resumoEntrega.innerText =
            entrega || "-";

    }


    /* =======================================================
       RESUMO DO PAGAMENTO
    ======================================================= */

    const resumoPagamento =
        document.getElementById(
            "resumoPagamento"
        );


    if (
        resumoPagamento
    ) {

        resumoPagamento.innerText =
            pagamento === "link"
                ? "Link de Pagamento"
                : pagamento === "pix"
                    ? "PIX"
                    : "-";

    }


    /* =======================================================
       SUBTOTAL
    ======================================================= */

    const resumoSubtotal =
        document.getElementById(
            "resumoSubtotal"
        );


    if (
        resumoSubtotal
    ) {

        resumoSubtotal.innerText =
            subtotal.toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            );

    }


    /* =======================================================
       FRETE
    ======================================================= */

    const resumoFrete =
        document.getElementById(
            "resumoFrete"
        );


    if (
        resumoFrete
    ) {

        resumoFrete.innerText =
            frete.toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            );

    }


    /* =======================================================
       TAXA LINK
    ======================================================= */

    const resumoTaxaLink =
        document.getElementById(
            "resumoTaxaLink"
        );


    if (
        resumoTaxaLink
    ) {

        resumoTaxaLink.innerText =
            acrescimoLink.toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            );

    }


    /* =======================================================
       TAXA NF
    ======================================================= */

    const resumoTaxaNF =
        document.getElementById(
            "resumoTaxaNF"
        );


    if (
        resumoTaxaNF
    ) {

        resumoTaxaNF.innerText =
            acrescimoNF.toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            );

    }


    /* =======================================================
       TOTAL
    ======================================================= */

    const resumoTotal =
        document.getElementById(
            "resumoTotal"
        );


    if (
        resumoTotal
    ) {

        resumoTotal.innerText =
            totalGeral.toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            );

    }


    /* =======================================================
       RESUMO DAS PARCELAS
    ======================================================= */

    const resumoParcelas =
        document.getElementById(
            "resumoParcelas"
        );


    const datasParcelas =
        document.querySelectorAll(
            ".dataParcela"
        );


    const valoresParcelas =
        document.querySelectorAll(
            ".valorParcela"
        );


    if (
        resumoParcelas
    ) {

        resumoParcelas.innerHTML =
            "";


        if (
            datasParcelas.length > 0
        ) {

            resumoParcelas.innerHTML =
                "<p><strong>Parcelamento:</strong></p>";


            datasParcelas.forEach(
                (
                    campoData,
                    indice
                ) => {

                    let dataFormatada =
                        "-";


                    if (
                        campoData.value
                    ) {

                        const partes =
                            campoData.value.split(
                                "-"
                            );


                        if (
                            partes.length === 3
                        ) {

                            dataFormatada =
                                partes[2] +
                                "/" +
                                partes[1] +
                                "/" +
                                partes[0];

                        }

                    }


                    const valor =
                        valoresParcelas[
                            indice
                        ]
                            ? valoresParcelas[
                                indice
                            ].value
                            : "";


                    resumoParcelas.innerHTML += `

                        <p>
                            Parcela ${indice + 1}
                            — ${dataFormatada}
                            — ${valor}
                        </p>

                    `;

                }
            );

        }

    }

}


/* ===========================================================
   PARCELAMENTO
=========================================================== */

function atualizarParcelamento() {

    const campoParcelas =
        document.getElementById(
            "parcelas"
        );


    const listaParcelas =
        document.getElementById(
            "listaParcelas"
        );


    /*
       Proteção contra elementos
       inexistentes.
    */

    if (
        !campoParcelas ||
        !listaParcelas
    ) {

        return;

    }


    const quantidadeParcelas =
        Number(
            campoParcelas.value
        ) || 0;


    /* =======================================================
       LIMPA A LISTA ANTERIOR
    ======================================================= */

    listaParcelas.innerHTML =
        "";


    /* =======================================================
       SEM PARCELAMENTO
    ======================================================= */

    if (
        quantidadeParcelas === 0
    ) {

        return;

    }


    /* =======================================================
       CALCULA TOTAL DOS PRODUTOS
    ======================================================= */

    let totalProdutos =
        0;


    produtos.forEach(
        item => {

            /*
               Brindes não entram.
            */

            if (
                !item.brinde
            ) {

                totalProdutos +=
                    Number(
                        item.subtotal
                    ) || 0;

            }

        }
    );


    /* =======================================================
       FRETE
    ======================================================= */

    const campoFrete =
        document.getElementById(
            "frete"
        );


    const frete =
        campoFrete
            ? Number(
                String(
                    campoFrete.value
                ).replace(
                    ",",
                    "."
                )
              ) || 0
            : 0;


    /* =======================================================
       PAGAMENTO
    ======================================================= */

    const campoPagamento =
        document.getElementById(
            "pagamento"
        );


    const pagamento =
        campoPagamento
            ? campoPagamento.value
            : "";


    /* =======================================================
       NOTA FISCAL
    ======================================================= */

    const campoNotaFiscal =
        document.getElementById(
            "notaFiscal"
        );


    const notaFiscal =
        campoNotaFiscal
            ? campoNotaFiscal.value
            : "";


    /* =======================================================
       BASE DE CÁLCULO
    ======================================================= */

    const baseCalculo =
        totalProdutos +
        frete;


    /* =======================================================
       TAXAS
    ======================================================= */

    let acrescimoLink =
        0;


    let acrescimoNF =
        0;


    if (
        pagamento === "link"
    ) {

        acrescimoLink =
            baseCalculo * 0.06;

    }


    if (
        notaFiscal === "sim"
    ) {

        acrescimoNF =
            baseCalculo * 0.04;

    }


    /* =======================================================
       TOTAL GERAL
    ======================================================= */

    const totalGeral =
        baseCalculo +
        acrescimoLink +
        acrescimoNF;


    /* =======================================================
       VALOR DE CADA PARCELA
    ======================================================= */

    const valorParcela =
        totalGeral /
        quantidadeParcelas;


    /* =======================================================
       CRIA AS PARCELAS
    ======================================================= */

    for (
        let i = 1;
        i <= quantidadeParcelas;
        i++
    ) {

        const valorFormatado =
            valorParcela.toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            );


        listaParcelas.innerHTML += `

            <div
                class="input-group parcela-item"
            >

                <label>
                    Parcela ${i}
                </label>


                <div
                    class="parcela-campos"
                >

                    <div>

                        <label>
                            Data do pagamento
                        </label>

                        <input
                            type="date"
                            class="dataParcela"
                            data-parcela="${i}"
                        >

                    </div>


                    <div>

                        <label>
                            Valor
                        </label>

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
/* ===========================================================
   GERAR PDF
=========================================================== */

function gerarPDF() {

    /*
       Verifica se o jsPDF foi carregado.
    */

    if (
        !window.jspdf ||
        !window.jspdf.jsPDF
    ) {

        mostrarMensagem(
            "A biblioteca jsPDF não foi carregada.",
            "erro"
        );

        return;

    }


    const {
        jsPDF
    } = window.jspdf;


    /*
       Cria o documento.
    */

    const doc =
        new jsPDF();



    /* =======================================================
       CORES
    ======================================================= */

    const MARROM =
        [139, 100, 83];


    const BEGE =
        [239, 194, 170];


    const CINZA =
        [235, 235, 235];


    const PRETO =
        [35, 35, 35];


    const BRANCO =
        [255, 255, 255];


    doc.setTextColor(
        ...MARROM
    );


    doc.setFillColor(
        ...BEGE
    );


    doc.setDrawColor(
        ...MARROM
    );


    doc.setFont(
        "helvetica",
        "normal"
    );


    /* =======================================================
       FUNÇÃO AUXILIAR — VALOR DO CAMPO
    ======================================================= */

    function obterValorCampo(id) {

        const campo =
            document.getElementById(id);


        if (!campo) {

            return "";

        }


        return (
            campo.value ??
            campo.innerText ??
            ""
        );

    }


    /* =======================================================
       FUNÇÃO AUXILIAR — MOEDA
    ======================================================= */

    function formatarMoedaPDF(valor) {

        return Number(
            valor || 0
        ).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

    }


    /* =======================================================
       FUNÇÃO AUXILIAR — DATA
    ======================================================= */

    function formatarDataPDF(data) {

        if (!data) {

            return "-";

        }


        const partes =
            data.split("-");


        if (
            partes.length !== 3
        ) {

            return data;

        }


        return (
            partes[2] +
            "/" +
            partes[1] +
            "/" +
            partes[0]
        );

    }


    /* =======================================================
       DADOS DO CLIENTE
    ======================================================= */

    const cliente =
        obterValorCampo(
            "cliente"
        );


    const cnpj =
        obterValorCampo(
            "cnpj"
        );


    const telefone =
        obterValorCampo(
            "telefone"
        );


    const instagram =
        obterValorCampo(
            "instagram"
        );


    const cep =
        obterValorCampo(
            "cep"
        );


    const endereco =
        obterValorCampo(
            "endereco"
        );


    const cidade =
        obterValorCampo(
            "cidade"
        );


    const estado =
        obterValorCampo(
            "estado"
        );


    const observacao =
        obterValorCampo(
            "observacao"
        );


    /* =======================================================
       ENTREGA
    ======================================================= */

    const tipoFrete =
        obterValorCampo(
            "tipoFrete"
        );


    const campoFrete =
        document.getElementById(
            "frete"
        );


    const frete =
        campoFrete
            ? Number(
                String(
                    campoFrete.value
                ).replace(
                    ",",
                    "."
                )
              ) || 0
            : 0;


    /* =======================================================
       PAGAMENTO
    ======================================================= */

    const pagamento =
        obterValorCampo(
            "pagamento"
        );


    const notaFiscal =
        obterValorCampo(
            "notaFiscal"
        );


    const dataPedido =
        obterValorCampo(
            "dataPedido"
        );


    const dataPostagem =
        obterValorCampo(
            "dataPostagem"
        );


    /* =======================================================
       CÁLCULO DOS PRODUTOS
    ======================================================= */

    let subtotalProdutos =
        0;


    produtos.forEach(
        item => {

            /*
               Brindes não entram
               no valor total.
            */

            if (
                !item.brinde
            ) {

                subtotalProdutos +=
                    Number(
                        item.subtotal
                    ) || 0;

            }

        }
    );


    /* =======================================================
       BASE DE CÁLCULO
    ======================================================= */

    const baseCalculo =
        subtotalProdutos +
        frete;


    /* =======================================================
       TAXA LINK — 6%
    ======================================================= */

    let acrescimoLink =
        0;


    if (
        pagamento === "link"
    ) {

        acrescimoLink =
            baseCalculo * 0.06;

    }


    /* =======================================================
       TAXA NF — 4%
    ======================================================= */

    let acrescimoNF =
        0;


    if (
        notaFiscal === "sim"
    ) {

        acrescimoNF =
            baseCalculo * 0.04;

    }


    /* =======================================================
       TOTAL DAS TAXAS
    ======================================================= */

    const acrescimo =
        acrescimoLink +
        acrescimoNF;


    /* =======================================================
       TOTAL FINAL
    ======================================================= */

    const totalGeral =
        baseCalculo +
        acrescimo;


    /* =======================================================
       DATAS FORMATADAS
    ======================================================= */

    const dataPedidoFormatada =
        formatarDataPDF(
            dataPedido
        );


    const dataPostagemFormatada =
        formatarDataPDF(
            dataPostagem
        );


    /* =======================================================
       PAGAMENTO FORMATADO
    ======================================================= */

    let pagamentoFormatado =
        "-";


    if (
        pagamento === "pix"
    ) {

        pagamentoFormatado =
            "PIX";

    }


    else if (
        pagamento === "link"
    ) {

        pagamentoFormatado =
            "Link de Pagamento";

    }


    else if (
        pagamento
    ) {

        pagamentoFormatado =
            pagamento;

    }


 // ==========================
// CABEÇALHO DO PEDIDO
// ==========================

const numeroPedido =
    obterValorCampo(
        "numeroPedido"
    );


// Posição e tamanho do cabeçalho
const topoX = 14;

const topoY = 30;
const topoLargura = 182;
const topoAltura = 78;

const divisaoX = 105;


// ==========================
// FUNDO DA COLUNA DO CLIENTE
// ==========================

doc.setFillColor(...BEGE);


doc.rect(
    topoX,
    topoY,
    divisaoX - topoX,
    topoAltura,
    "F"
);


// ==========================
// BORDA EXTERNA
// ==========================

doc.setDrawColor(...MARROM);

doc.rect(
    topoX,
    topoY,
    topoLargura,
    topoAltura
);


// ==========================
// DIVISÃO DAS COLUNAS
// ==========================

doc.line(
    divisaoX,
    topoY,
    divisaoX,
    topoY + topoAltura
);


// ==========================
// COLUNA ESQUERDA
// DADOS DO CLIENTE
// ==========================

doc.setTextColor(...MARROM);

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(13);

doc.text(
    "DADOS DO CLIENTE",
    19,
    42
);


doc.setFont(
    "helvetica",
    "normal"
);

doc.setFontSize(10.5);


let clienteY = 51;


doc.text(
    "Nome: " +
    (cliente || "-"),
    19,
    clienteY
);

clienteY += 7;


doc.text(
    document.getElementById(
        "labelDocumento"
    ).innerText +
    ": " +
    (cnpj || "-"),
    19,
    clienteY
);

clienteY += 7;


doc.text(
    "Telefone: " +
    (telefone || "-"),
    19,
    clienteY
);

clienteY += 7;


doc.text(
    "Instagram: " +
    (instagram || "-"),
    19,
    clienteY
);

clienteY += 7;


doc.text(
    "CEP: " +
    (cep || "-"),
    19,
    clienteY
);

clienteY += 7;


const enderecoPDF =
    doc.splitTextToSize(
        "Endereço: " +
        (endereco || "-"),
        80
    );

doc.text(
    enderecoPDF,
    19,
    clienteY
);

clienteY +=
    enderecoPDF.length * 5;


doc.text(
    "Cidade: " +
    (cidade || "-") +
    " - " +
    (estado || "-"),
    19,
    clienteY
);


// ==========================
// COLUNA DIREITA
// PITIKINHOS
// ==========================

const centroDireita = 150;


doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(18);

doc.text(
    "PITIKINHOS",
    centroDireita,
    44,
    {
        align: "center"
    }
);


doc.setFontSize(12);

doc.text(
    "PET",
    centroDireita,
    51,
    {
        align: "center"
    }
);


// Instagram

doc.setFont(
    "helvetica",
    "normal"
);

doc.setFontSize(11);

doc.text(
    "@PITIKINHOS_PET",
    centroDireita,
    62,
    {
        align: "center"
    }
);


// Linha separadora

doc.line(
    120,
    68,
    190,
    68
);


// Endereço da Pitikinhos

doc.setFontSize(10);

doc.text(
    "Rua Santo Antero, 258",
    centroDireita,
    77,
    {
        align: "center"
    }
);

doc.text(
    "Penha de França",
    centroDireita,
    84,
    {
        align: "center"
    }
);


// Número do pedido

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(8.5);

doc.text(
    "PEDIDO Nº " +
    (numeroPedido || "-"),
    centroDireita,
    91,
    {
        align: "center"
    }
);


// ==========================
// INÍCIO DOS PRODUTOS
// ==========================

y = 124;


    /* =======================================================
       PRODUTOS
    ======================================================= */

    const linhasProdutos =
        [];


    produtos.forEach(
        item => {

            let nomeProduto =
                item.produto || "-";


            if (
                item.tamanho
            ) {

                nomeProduto +=
                    " - Tam. " +
                    item.tamanho;

            }


            if (
                item.sexo
            ) {

                nomeProduto +=
                    " - " +
                    item.sexo;

            }


            linhasProdutos.push([

                nomeProduto,

                item.quantidade,

                formatarMoedaPDF(
                    item.valor
                ),

                item.brinde
                    ? "BRINDE"
                    : formatarMoedaPDF(
                        item.subtotal
                    )

            ]);

        }
    );


    /*
       IMPORTANTE:

       A tabela de produtos precisa ser
       criada ANTES de utilizar
       doc.lastAutoTable.finalY.
    */

    doc.autoTable({

        startY: y,

        theme:
            "grid",


        head: [[

            "PRODUTO",

            "QTD.",

            "VALOR",

            "SUBTOTAL"

        ]],


        body:
            linhasProdutos,


        headStyles: {

            fillColor:
                MARROM,

            textColor:
                BRANCO,

            font:
                "helvetica",

            fontStyle:
                "bold",

            fontSize:
                9,

            halign:
                "center"

        },


        bodyStyles: {

            font:
                "helvetica",

            fontSize:
                9,

            textColor:
                PRETO

        },


        alternateRowStyles: {

            fillColor:
                CINZA

        },


 columnStyles: {

    0: {
        cellWidth: 90
    },

    1: {
        cellWidth: 18,
        halign: "center"
    },

    2: {
        cellWidth: 35,
        halign: "right"
    },

    3: {
        cellWidth: 39,
        halign: "right"
       }
},

        didParseCell:
            function(data) {

                /*
                   Destaca brindes.
                */

                if (
                    data.section ===
                    "body" &&
                    data.column.index ===
                    3 &&
                    data.cell.raw ===
                    "BRINDE"
                ) {

                    data.cell.styles.textColor =
                        MARROM;

                    data.cell.styles.fontStyle =
                        "bold";

                }

            }

    });


    /*
       Agora sim podemos utilizar
       lastAutoTable.
    */

    let finalY =
        doc.lastAutoTable.finalY +
        10;


    /* =======================================================
       VALORES
    ======================================================= */

    doc.autoTable({

        startY:
            finalY,


        theme:
            "grid",


        body: [

            [

                "TOTAL:",

                formatarMoedaPDF(
                    subtotalProdutos
                )

            ],


            [

                "FRETE:",

                formatarMoedaPDF(
                    frete
                )

            ],


            [

                "TAXA LINK (6%):",

                formatarMoedaPDF(
                    acrescimoLink
                )

            ],


            [

                "TAXA NF (4%):",

                formatarMoedaPDF(
                    acrescimoNF
                )

            ],


            [

                "TOTAL:",

                formatarMoedaPDF(
                    totalGeral
                )

            ]

        ],


        styles: {

            font:
                "helvetica",

            fontSize:
                11

        },


        columnStyles: {

            0: {

                fontStyle:
                    "bold",

                halign:
                    "center"

            },


            1: {

                halign:
                    "right"

            }

        },


        didParseCell:
            function(data) {

                /*
                   Primeira e última linha
                   recebem destaque.
                */

                if (
                    data.row.index === 0 ||
                    data.row.index === 4
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
        doc.lastAutoTable.finalY +
        10;


    /* =======================================================
       ENTREGA E PAGAMENTO
    ======================================================= */

    doc.setFont(
        "helvetica",
        "bold"
    );


    doc.setFontSize(
        12
    );


    doc.text(
        "ENTREGA E PAGAMENTO",
        14,
        finalY
    );


    finalY += 8;


    doc.setFont(
        "helvetica",
        "normal"
    );


    doc.setFontSize(
        10
    );


    doc.text(
        "Entrega: " +
        (
            tipoFrete ||
            "-"
        ),
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


    doc.setFont(
        "helvetica",
        "bold"
    );


    doc.text(
        "PEDIDO " +
        dataPedidoFormatada +
        " - POSTAGEM " +
        dataPostagemFormatada,
        14,
        finalY
    );


    doc.setFont(
        "helvetica",
        "normal"
    );


    finalY += 12;


    /* =======================================================
       PARCELAMENTO
    ======================================================= */

    const datasParcelas =
        document.querySelectorAll(
            ".dataParcela"
        );


    const valoresParcelas =
        document.querySelectorAll(
            ".valorParcela"
        );


    if (
        datasParcelas.length > 0
    ) {

        const linhasParcelas =
            [];


        datasParcelas.forEach(
            (
                campoData,
                indice
            ) => {

                let dataFormatada =
                    "-";


                if (
                    campoData.value
                ) {

                    dataFormatada =
                        formatarDataPDF(
                            campoData.value
                        );

                }


                const valor =
                    valoresParcelas[
                        indice
                    ]
                        ? valoresParcelas[
                            indice
                        ].value
                        : "-";


                linhasParcelas.push([

                    indice + 1,

                    dataFormatada,

                    valor

                ]);

            }
        );


        doc.autoTable({

            startY:
                finalY,


            head: [[

                "PARCELA",

                "DATA PGTO.",

                "VALOR"

            ]],


            body:
                linhasParcelas,


            theme:
                "grid",


            headStyles: {

                fillColor:
                    MARROM,

                textColor:
                    BRANCO,

                font:
                    "helvetica",

                fontStyle:
                    "bold",

                fontSize:
                    10,

                halign:
                    "center"

            },


            bodyStyles: {

                font:
                    "helvetica",

                fontSize:
                    10,

                textColor:
                    PRETO,

                halign:
                    "center"

            },


            alternateRowStyles: {

                fillColor:
                    CINZA

            }

        });


        finalY =
            doc.lastAutoTable.finalY +
            12;

    }


    /* =======================================================
       OBSERVAÇÕES
    ======================================================= */

    /*
       Caso o conteúdo esteja muito baixo
       na página, cria uma nova página.
    */

    if (
        finalY > 255
    ) {

        doc.addPage();

        finalY =
            20;

    }


    doc.setFont(
        "helvetica",
        "bold"
    );


    doc.setFontSize(
        12
    );


    doc.text(
        "OBSERVAÇÕES",
        14,
        finalY
    );


    finalY += 8;


    doc.setFont(
        "helvetica",
        "normal"
    );


    doc.setFontSize(
        10
    );


    const texto =
        doc.splitTextToSize(
            observacao ||
            "-",
            180
        );


    doc.text(
        texto,
        14,
        finalY
    );


    /* =======================================================
       SALVAR PDF
    ======================================================= */

    const nomeArquivo =
    (cliente || "Cliente")
        .trim()
        .replace(/[\\/:*?"<>|]/g, "");

doc.save(
    "Orcamento_" +
    nomeArquivo +
    ".pdf"
);


    /* =======================================================
       NOVO PEDIDO
    ======================================================= */

    salvarNumeroPedido();


    gerarNumeroPedido();


    /* =======================================================
       REINICIA AS ETAPAS
    ======================================================= */

    etapaAtual =
        1;


    atualizarProgresso();


    const etapa1 =
        document.getElementById(
            "etapa1"
        );


    const etapa2 =
        document.getElementById(
            "etapa2"
        );


    const etapa3 =
        document.getElementById(
            "etapa3"
        );


    const etapa4 =
        document.getElementById(
            "etapa4"
        );


    if (etapa1) {

        etapa1.style.display =
            "block";

    }


    if (etapa2) {

        etapa2.style.display =
            "none";

    }


    if (etapa3) {

        etapa3.style.display =
            "none";

    }


    if (etapa4) {

        etapa4.style.display =
            "none";

    }

}
/* ===========================================================
   MÁSCARA CPF / CNPJ
=========================================================== */

function mascaraDocumento(campo) {

    if (!campo) {
        return;
    }


    const tipoDocumento =
        document.getElementById(
            "tipoDocumento"
        );


    const tipo =
        tipoDocumento
            ? tipoDocumento.value
            : "cnpj";


    let valor =
        campo.value.replace(
            /\D/g,
            ""
        );


    /* =======================================================
       CPF
    ======================================================= */

    if (
        tipo === "cpf"
    ) {

        valor =
            valor.substring(
                0,
                11
            );


        valor =
            valor.replace(
                /^(\d{3})(\d)/,
                "$1.$2"
            );


        valor =
            valor.replace(
                /^(\d{3})\.(\d{3})(\d)/,
                "$1.$2.$3"
            );


        valor =
            valor.replace(
                /^(\d{3})\.(\d{3})\.(\d{3})(\d)/,
                "$1.$2.$3-$4"
            );


        campo.value =
            valor;


        return;

    }


    /* =======================================================
       CNPJ
    ======================================================= */

    valor =
        valor.substring(
            0,
            14
        );


    valor =
        valor.replace(
            /^(\d{2})(\d)/,
            "$1.$2"
        );


    valor =
        valor.replace(
            /^(\d{2})\.(\d{3})(\d)/,
            "$1.$2.$3"
        );


    valor =
        valor.replace(
            /^(\d{2})\.(\d{3})\.(\d{3})(\d)/,
            "$1.$2.$3/$4"
        );


    valor =
        valor.replace(
            /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/,
            "$1.$2.$3/$4-$5"
        );


    campo.value =
        valor;

}


/* ===========================================================
   ALTERAR TIPO DE DOCUMENTO
=========================================================== */

function alterarTipoDocumento() {

    const tipoDocumento =
        document.getElementById(
            "tipoDocumento"
        );


    const campoDocumento =
        document.getElementById(
            "cnpj"
        );


    const labelDocumento =
        document.getElementById(
            "labelDocumento"
        );


    if (
        !tipoDocumento ||
        !campoDocumento
    ) {

        return;

    }


    const tipo =
        tipoDocumento.value;


    if (
        labelDocumento
    ) {

        labelDocumento.innerText =
            tipo === "cpf"
                ? "CPF"
                : "CNPJ";

    }


    if (
        tipo === "cpf"
    ) {

        campoDocumento.placeholder =
            "000.000.000-00";


        campoDocumento.maxLength =
            14;

    }

    else {

        campoDocumento.placeholder =
            "00.000.000/0000-00";


        campoDocumento.maxLength =
            18;

    }


    /*
       Limpa o documento ao
       trocar o tipo.
    */

    campoDocumento.value =
        "";

}


/* ===========================================================
   MÁSCARA CEP
=========================================================== */

function mascaraCEP(campo) {

    if (!campo) {
        return;
    }


    let valor =
        campo.value.replace(
            /\D/g,
            ""
        );


    valor =
        valor.substring(
            0,
            8
        );


    valor =
        valor.replace(
            /^(\d{5})(\d)/,
            "$1-$2"
        );


    campo.value =
        valor;

}


/* ===========================================================
   MÁSCARA TELEFONE
=========================================================== */

function mascaraTelefone(campo) {

    if (!campo) {
        return;
    }


    let valor =
        campo.value.replace(
            /\D/g,
            ""
        );


    valor =
        valor.substring(
            0,
            11
        );


    /*
       Celular
       (11) 99999-9999
    */

    if (
        valor.length > 10
    ) {

        valor =
            valor.replace(
                /^(\d{2})(\d)/,
                "($1) $2"
            );


        valor =
            valor.replace(
                /(\d{5})(\d)/,
                "$1-$2"
            );

    }


    /*
       Telefone fixo
       (11) 9999-9999
    */

    else {

        valor =
            valor.replace(
                /^(\d{2})(\d)/,
                "($1) $2"
            );


        valor =
            valor.replace(
                /(\d{4})(\d)/,
                "$1-$2"
            );

    }


    campo.value =
        valor;

}


/* ===========================================================
   MÁSCARA DE MOEDA
=========================================================== */

function mascaraMoeda(campo) {

    if (!campo) {
        return;
    }


    let valor =
        campo.value.replace(
            /\D/g,
            ""
        );


    if (
        valor === ""
    ) {

        campo.value =
            "";

        return;

    }


    const numero =
        Number(valor) /
        100;


    campo.value =
        numero.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


/* ===========================================================
   BUSCAR CEP
=========================================================== */

async function buscarCEP() {

    const campoCEP =
        document.getElementById(
            "cep"
        );


    if (!campoCEP) {
        return;
    }


    const cep =
        campoCEP.value.replace(
            /\D/g,
            ""
        );


    /*
       Só consulta quando houver
       exatamente 8 números.
    */

    if (
        cep.length !== 8
    ) {

        return;

    }


    const campoEndereco =
        document.getElementById(
            "endereco"
        );


    const campoCidade =
        document.getElementById(
            "cidade"
        );


    const campoEstado =
        document.getElementById(
            "estado"
        );


    try {

        /*
           Mostra que a consulta
           está acontecendo.
        */

        if (
            campoEndereco
        ) {

            campoEndereco.value =
                "Consultando CEP...";

        }


        const resposta =
            await fetch(
                `https://viacep.com.br/ws/${cep}/json/`
            );


        if (
            !resposta.ok
        ) {

            throw new Error(
                "Erro na consulta do CEP."
            );

        }


        const dados =
            await resposta.json();


        /*
           CEP não encontrado.
        */

        if (
            dados.erro
        ) {

            if (
                campoEndereco
            ) {

                campoEndereco.value =
                    "";

            }


            mostrarMensagem(
                "CEP não encontrado.",
                "erro"
            );


            return;

        }


        /*
           Preenche o endereço.
        */

        if (
            campoEndereco
        ) {

            campoEndereco.value =
                dados.logradouro || "";

        }


        /*
           Preenche a cidade.
        */

        if (
            campoCidade
        ) {

            campoCidade.value =
                dados.localidade || "";

        }


        /*
           Preenche o estado.
        */

        if (
            campoEstado
        ) {

            campoEstado.value =
                dados.uf || "";

        }


        mostrarMensagem(
            "Endereço encontrado!",
            "sucesso"
        );

    }


    catch (erro) {

        console.error(
            "Erro ao consultar CEP:",
            erro
        );


        if (
            campoEndereco
        ) {

            campoEndereco.value =
                "";

        }


        mostrarMensagem(
            "Não foi possível consultar o CEP.",
            "erro"
        );

    }

}


/* ===========================================================
   DEFINIR DATA MÍNIMA DAS PARCELAS
=========================================================== */

function definirDataMinimaParcelas() {

    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dia =
        String(
            hoje.getDate()
        ).padStart(
            2,
            "0"
        );


    const dataMinima =
        `${ano}-${mes}-${dia}`;


    const campos =
        document.querySelectorAll(
            ".dataParcela"
        );


    campos.forEach(
        campo => {

            campo.min =
                dataMinima;

        }
    );

}


/* ===========================================================
   NOVO PEDIDO
=========================================================== */

function novoPedido() {

    /*
       Limpa a lista de produtos.
    */

    produtos = [];


    atualizarTabela();


    /*
       Limpa os campos do formulário.
    */

    const formulario =
        document.querySelector(
            "form"
        );


    if (
        formulario
    ) {

        formulario.reset();

    }


    /*
       Campos que podem estar
       fora do formulário.
    */

    const idsParaLimpar = [

        "cliente",

        "cnpj",

        "telefone",

        "instagram",

        "cep",

        "endereco",

        "cidade",

        "estado",

        "tipoFrete",

        "frete",

        "pagamento",

        "notaFiscal",

        "observacao",

        "acrescimoPagamento",

        "totalGeral"

    ];


    idsParaLimpar.forEach(
        id => {

            const campo =
                document.getElementById(
                    id
                );


            if (
                !campo
            ) {

                return;

            }


            if (
                campo.type ===
                "checkbox"
            ) {

                campo.checked =
                    false;

            }

            else {

                campo.value =
                    "";

            }

        }
    );


    /* =======================================================
       PARCELAMENTO
    ======================================================= */

    const campoParcelas =
        document.getElementById(
            "parcelas"
        );


    if (
        campoParcelas
    ) {

        campoParcelas.value =
            "0";

    }


    const listaParcelas =
        document.getElementById(
            "listaParcelas"
        );


    if (
        listaParcelas
    ) {

        listaParcelas.innerHTML =
            "";

    }


    const resumoParcelas =
        document.getElementById(
            "resumoParcelas"
        );


    if (
        resumoParcelas
    ) {

        resumoParcelas.innerHTML =
            "";

    }


    /* =======================================================
       NÚMERO DO NOVO PEDIDO
    ======================================================= */

    gerarNumeroPedido();


    /* =======================================================
       DATA DO NOVO PEDIDO
    ======================================================= */

    const campoDataPedido =
        document.getElementById(
            "dataPedido"
        );


    if (
        campoDataPedido
    ) {

        const hoje =
            new Date();


        const ano =
            hoje.getFullYear();


        const mes =
            String(
                hoje.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const dia =
            String(
                hoje.getDate()
            ).padStart(
                2,
                "0"
            );


        campoDataPedido.value =
            `${ano}-${mes}-${dia}`;

    }


    /* =======================================================
       VOLTA PARA A PRIMEIRA ETAPA
    ======================================================= */

    etapaAtual =
        1;


    const etapas =
        document.querySelectorAll(
            '[id^="etapa"]'
        );


    etapas.forEach(
        etapa => {

            etapa.style.display =
                "none";

        }
    );


    const primeiraEtapa =
        document.getElementById(
            "etapa1"
        );


    if (
        primeiraEtapa
    ) {

        primeiraEtapa.style.display =
            "block";

    }


    atualizarProgresso();


    atualizarResumo();


    mostrarMensagem(
        "Novo pedido iniciado.",
        "sucesso"
    );

}


/* ===========================================================
   INICIALIZAÇÃO DAS MÁSCARAS E EVENTOS
=========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
           Tipo de documento.
        */

        alterarTipoDocumento();


        /*
           CEP.
        */

        const campoCEP =
            document.getElementById(
                "cep"
            );


        if (
            campoCEP
        ) {

            campoCEP.addEventListener(
                "blur",
                buscarCEP
            );

        }


        /*
           Parcelamento.
        */

        const campoParcelas =
            document.getElementById(
                "parcelas"
            );


        if (
            campoParcelas
        ) {

            campoParcelas.addEventListener(
                "change",
                atualizarParcelamento
            );

        }


        /*
           Define datas mínimas
           para parcelas existentes.
        */

        definirDataMinimaParcelas();

    }
);
window.etapaAnterior = function () {

    const atual =
        document.getElementById(
            "etapa" + etapaAtual
        );

    if (atual) {
        atual.style.display = "none";
    }


    if (etapaAtual > 1) {
        etapaAtual--;
    }


    atualizarProgresso();


    const anterior =
        document.getElementById(
            "etapa" + etapaAtual
        );

    if (anterior) {
        anterior.style.display = "block";
    }

};
document.addEventListener("DOMContentLoaded", function () {

    const tipoDocumento =
        document.getElementById("tipoDocumento");

    if (tipoDocumento) {

        tipoDocumento.addEventListener(
            "change",
            alterarTipoDocumento
        );

        alterarTipoDocumento();
    }

});