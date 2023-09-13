import { getLocalStorage, desenharProdutoSimples } from "./utilidades";


function criarPedidoHistorico(pedidoComData){
    const elementoPedido = `<p class="text-xl text-bold my-3">${new Date(pedidoComData.dataPedido).toLocaleDateString('pt-BR',{
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
    <section class="bg-slate-100 rounded-md" id="container-pedidos-${pedidoComData.dataPedido}">
    
    </section>
    `
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML += elementoPedido;
    
    for(const idProduto in pedidoComData.pedido){
        desenharProdutoSimples(idProduto, `container-pedidos-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto]);
    };
    
};

function renderizarHistoricoPedidos(){
    const historico = getLocalStorage('historico');
    for(const pedidoComData of historico){
        criarPedidoHistorico(pedidoComData);
    };
};

renderizarHistoricoPedidos();