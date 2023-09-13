import { renderizarCatalogo } from "./src/cardProduto";
import { inicializarFiltros } from "./src/filtrosCatalogo";
import { inicializarCarrinho, attPrecoCarrinho, renderizarProdutosCarrinho } from "./src/menuCarrinho";

renderizarCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho();
attPrecoCarrinho();
inicializarFiltros();