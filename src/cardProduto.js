import { addAoCarrinho } from "./menuCarrinho";
import { catalogo } from "./utilidades";

//Exibindo os produtos cadastrados no "banco de dados":
export function renderizarCatalogo() {
  for (const produtoCatalogo of catalogo) {
    const cardProduto = `<div class="bg-stone-100 w-48 m-3   shadow-xl shadow-zinc-400 rounded-xl overflow-hidden flex flex-col text-center justify-between group ${produtoCatalogo.feminino ? 'feminino' : 'masculino'}"  id="card-produto.${produtoCatalogo.id}">
      <img class="group-hover:scale-110 duration-300 mb-3"
        src="assets/img/${produtoCatalogo.imagem}"
        alt="Produto 1 da Magazine Hashtag: ${produtoCatalogo.nome}"
    
      />
      <div class="flex flex-col">
      <p class="text-[20px]">${produtoCatalogo.marca}</p>
  
      <p class="text-[14px]">${produtoCatalogo.nome}</p>
      <p class="text-[21px]">$${produtoCatalogo.preco}</p>
      <button id="add-${produtoCatalogo.id}" class="material-symbols-outlined m-2 p-2 text-slate-100 bg-zinc-800 hover:bg-emerald-800">add_shopping_cart</button>
      </div>
    </div> `;

    document.getElementById("container-produto").innerHTML += cardProduto;
  }
  for(const produtoCatalogo of catalogo){
    document.getElementById(`add-${produtoCatalogo.id}`).addEventListener('click', () => addAoCarrinho (produtoCatalogo.id));
  }
}
