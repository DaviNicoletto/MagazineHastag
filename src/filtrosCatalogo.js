const catalogoProduto = document.getElementById('container-produto');


// Filtrando apenas produtos FEMININOS / esconder masculinos:
function esconderMasculino(){

    exibirTodos();

    const produtosMasculinos = Array.from(catalogoProduto.getElementsByClassName('masculino'));

    for(const produto of produtosMasculinos){
        produto.classList.add('hidden');
    }

};


// Filtrando apenas produtos MASCULINOS / esconder femininos:
function esconderFeminino(){

    exibirTodos();

    const produtosFemininos = Array.from(catalogoProduto.getElementsByClassName('feminino'));

    for(const produto of produtosFemininos){
        produto.classList.add('hidden');
    }

};

//Exibir TODOS os produtos:
function exibirTodos(){

    const produtosOcultos = Array.from(catalogoProduto.getElementsByClassName('hidden'));

    for (const produto of produtosOcultos){
        produto.classList.remove('hidden');
    };
}

//Inicializando as funções nos botões (import no main.js):
export function inicializarFiltros(){

    document.getElementById('exibir-feminino').addEventListener('click', esconderMasculino);

    document.getElementById('exibir-masculino').addEventListener('click', esconderFeminino);

    document.getElementById('exibir-todos').addEventListener('click', exibirTodos);
};