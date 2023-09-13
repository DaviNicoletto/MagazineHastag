import { catalogo } from "./utilidades";
import { setLocalStorage } from "./utilidades";
import { getLocalStorage } from "./utilidades";

// Lista dos itens no carrinho:
const idsProdutoCarrinhoComQuantidade = getLocalStorage("carrinho") ?? {};

//Exibir/Ocultar aba do carrinho:
function exibirCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[-360px]");
  document.getElementById("carrinho").classList.add("right-[0px]");
}

function ocultarCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

//Inicializando os botões do carrinho:
export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
  const botaoCheckout = document.getElementById("finalizar-compra");

  botaoCheckout.addEventListener("click", irParaCheckout);
  botaoFecharCarrinho.addEventListener("click", ocultarCarrinho);
  botaoAbrirCarrinho.addEventListener("click", exibirCarrinho);
}

//Direcionando para a página de checkout:
function irParaCheckout() {
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    window.alert(
      "Por favor, selecione um produto para prosseguir com a compra."
    );
  } else {
    window.location.href = window.location.origin + "/checkout.html";
  }
}

//Adicionar produto ao carrinho utilizando o botão no CATÁLOGO:
export function addAoCarrinho(idProduto) {
  if (idProduto in idsProdutoCarrinhoComQuantidade) {
    incrementarQuantProduto(idProduto);
    return;
  }

  idsProdutoCarrinhoComQuantidade[idProduto] = 1;
  setLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  desenharProdutoNoCarrinho(idProduto);
  attPrecoCarrinho();
}

//Botões de + e - nos cards de produto dentro do carrinho:

function incrementarQuantProduto(idProduto) {
  idsProdutoCarrinhoComQuantidade[idProduto]++;
  setLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  attQuantidade(idProduto);
  attPrecoCarrinho();
}

function decrementarQuantProduto(idProduto) {
  if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
    removerDoCarrinho(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto]--;
  setLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  attQuantidade(idProduto);
  attPrecoCarrinho();
}

function attQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText =
    idsProdutoCarrinhoComQuantidade[idProduto];
}

function removerDoCarrinho(idProduto) {
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  setLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  renderizarProdutosCarrinho();
  attPrecoCarrinho();
}

//Mostrar os cards dinamicamente dentro do carrinho:

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto);

  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");

  const elementoArticle = document.createElement("article");
  const articleClasses = [
    "flex",
    "relative",
    "bg-slate-100",
    "rounded-lg",
    "overflow-hidden",
    "my-2",
    "p-2",
  ];

  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cardProdutoCarrinho = `        
  
      <button
        id="remover-item-${produto.id}"
        class="text-red-500 hover:text-red-700 absolute top-10 right-2 material-symbols-outlined"
      >
        delete 
      </button>
      <img
        src="./assets/img/${produto.imagem}"
        alt="Carrinho: ${produto.nome}"
        class="h-24"
      />
      <div class="ml-3 py-1 flex flex-col justify-between">
        <p class="text-slate-900 text-sm">${produto.nome}</p>
        <p class="text-slate-800 text-xs">Tamanho: M</p>
        <p class="text-emerald-900 text-lg">$${produto.preco}</p>
      </div>
      <div class="flex text-lg absolute bottom-3 right-20 text-slate-950 items-end">
          <button class="text-orange-700 rounded-[50px] material-symbols-outlined" id="botao-decrementar-${
            produto.id
          }">do_not_disturb_on</button>
          <p id="quantidade-${produto.id}" class="mx-3">${
    idsProdutoCarrinhoComQuantidade[produto.id]
  }</p>
          <button class="text-emerald-700 material-symbols-outlined" id="botao-incrementar-${
            produto.id
          }">add_circle</button>
      </div>`;

  elementoArticle.innerHTML = cardProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  //Chamando a função de alterar a quantidade ou remover do carrinho (botões):
  const botaoAumentarQuantidade = document.getElementById(
    `botao-incrementar-${produto.id}`
  );
  const botaoDiminuirQuantidade = document.getElementById(
    `botao-decrementar-${produto.id}`
  );
  const removerItem = document.getElementById(`remover-item-${produto.id}`);

  botaoAumentarQuantidade.addEventListener("click", () =>
    incrementarQuantProduto(produto.id)
  );
  botaoDiminuirQuantidade.addEventListener("click", () =>
    decrementarQuantProduto(produto.id)
  );
  removerItem.addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() {
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML = "";

  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
}

// Alterando o preço total da compra no carrinho:

export function attPrecoCarrinho() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotal = 0;

  for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
    precoTotal +=
      catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
      idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `Total: $${precoTotal}`;
}
