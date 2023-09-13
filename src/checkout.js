import { desenharProdutoSimples, getLocalStorage,deleteFromLocalStorage, setLocalStorage } from "./utilidades";

//exibindo os produtos selecionados no checkout
function desenharProdutosCheckout() {
  const idsProdutoCarrinhoComQuantidade = getLocalStorage("carrinho") ?? {};
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoSimples(
      idProduto,
      "container-produtos-checkout",
      idsProdutoCarrinhoComQuantidade[idProduto]
    );
  }
}

//botão de finalizar compra:
function finalizarCompra(evento) {
  evento.preventDefault();
  const idsProdutoCarrinhoComQuantidade = getLocalStorage("carrinho") ?? {};

  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  }

  //salvando o historico
  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsProdutoCarrinhoComQuantidade,
  };
  const historicoDePedidos = getLocalStorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

  setLocalStorage('historico', historicoDePedidosAtualizado)
  //limpando o carrinho
  deleteFromLocalStorage('carrinho');

  //mudando a página
  window.location.href = window.location.origin + "/pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
