(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();const s=[{id:"1",marca:"Zara",nome:"Camisa Larga com Bolsos",preco:70,imagem:"product-1.jpg",feminino:!1},{id:"2",marca:"Zara",nome:"Casaco Reto com Lã",preco:85,imagem:"product-2.jpg",feminino:!0},{id:"3",marca:"Zara",nome:"Jaqueta com Efeito Camurça",preco:60,imagem:"product-3.jpg",feminino:!1},{id:"4",marca:"Zara",nome:"Sobretudo em Mescla de Lã",preco:160,imagem:"product-4.jpg",feminino:!1},{id:"5",marca:"Zara",nome:"Camisa Larga Acolchoada de Veludo Cotelê",preco:110,imagem:"product-5.jpg",feminino:!1},{id:"6",marca:"Zara",nome:"Casaco de Lã com Botões",preco:170,imagem:"product-6.jpg",feminino:!0},{id:"7",marca:"Zara",nome:"Casaco com Botões",preco:75,imagem:"product-7.jpg",feminino:!0},{id:"8",marca:"Zara",nome:"Colete Comprido com Cinto",preco:88,imagem:"product-8.jpg",feminino:!0}];function l(e,t){localStorage.setItem(e,JSON.stringify(t))}function E(e){return JSON.parse(localStorage.getItem(e))}const n=E("carrinho")??{};function v(){document.getElementById("carrinho").classList.remove("right-[-360px]"),document.getElementById("carrinho").classList.add("right-[0px]")}function L(){document.getElementById("carrinho").classList.remove("right-[0px]"),document.getElementById("carrinho").classList.add("right-[-360px]")}function B(){const e=document.getElementById("fechar-carrinho"),t=document.getElementById("abrir-carrinho");document.getElementById("finalizar-compra").addEventListener("click",$),e.addEventListener("click",L),t.addEventListener("click",v)}function $(){Object.keys(n).length===0?window.alert("Por favor, selecione um produto para prosseguir com a compra."):window.location.href=window.location.origin+"/checkout.html"}function I(e){if(e in n){p(e);return}n[e]=1,l("carrinho",n),y(e),d()}function p(e){n[e]++,l("carrinho",n),g(e),d()}function w(e){if(n[e]===1){h(e);return}n[e]--,l("carrinho",n),g(e),d()}function g(e){document.getElementById(`quantidade-${e}`).innerText=n[e]}function h(e){delete n[e],l("carrinho",n),b(),d()}function y(e){const t=s.find(m=>m.id===e),a=document.getElementById("produtos-carrinho"),i=document.createElement("article"),o=["flex","relative","bg-slate-100","rounded-lg","overflow-hidden","my-2","p-2"];for(const m of o)i.classList.add(m);const r=`        
  
      <button
        id="remover-item-${t.id}"
        class="text-red-500 hover:text-red-700 absolute top-10 right-2 material-symbols-outlined"
      >
        delete 
      </button>
      <img
        src="./assets/img/${t.imagem}"
        alt="Carrinho: ${t.nome}"
        class="h-24"
      />
      <div class="ml-3 py-1 flex flex-col justify-between">
        <p class="text-slate-900 text-sm">${t.nome}</p>
        <p class="text-slate-800 text-xs">Tamanho: M</p>
        <p class="text-emerald-900 text-lg">$${t.preco}</p>
      </div>
      <div class="flex text-lg absolute bottom-3 right-20 text-slate-950 items-end">
          <button class="text-orange-700 rounded-[50px] material-symbols-outlined" id="botao-decrementar-${t.id}">do_not_disturb_on</button>
          <p id="quantidade-${t.id}" class="mx-3">${n[t.id]}</p>
          <button class="text-emerald-700 material-symbols-outlined" id="botao-incrementar-${t.id}">add_circle</button>
      </div>`;i.innerHTML=r,a.appendChild(i);const c=document.getElementById(`botao-incrementar-${t.id}`),x=document.getElementById(`botao-decrementar-${t.id}`),C=document.getElementById(`remover-item-${t.id}`);c.addEventListener("click",()=>p(t.id)),x.addEventListener("click",()=>w(t.id)),C.addEventListener("click",()=>h(t.id))}function b(){const e=document.getElementById("produtos-carrinho");e.innerHTML="";for(const t in n)y(t)}function d(){const e=document.getElementById("preco-total");let t=0;for(const a in n)t+=s.find(i=>i.id===a).preco*n[a];e.innerText=`Total: $${t}`}function P(){for(const e of s){const t=`<div class="bg-stone-100 w-48 m-3   shadow-xl shadow-zinc-400 rounded-xl overflow-hidden flex flex-col text-center justify-between group ${e.feminino?"feminino":"masculino"}"  id="card-produto.${e.id}">
      <img class="group-hover:scale-110 duration-300 mb-3"
        src="assets/img/${e.imagem}"
        alt="Produto 1 da Magazine Hashtag: ${e.nome}"
    
      />
      <div class="flex flex-col">
      <p class="text-[20px]">${e.marca}</p>
  
      <p class="text-[14px]">${e.nome}</p>
      <p class="text-[21px]">$${e.preco}</p>
      <button id="add-${e.id}" class="material-symbols-outlined m-2 p-2 text-slate-100 bg-zinc-800 hover:bg-emerald-800">add_shopping_cart</button>
      </div>
    </div> `;document.getElementById("container-produto").innerHTML+=t}for(const e of s)document.getElementById(`add-${e.id}`).addEventListener("click",()=>I(e.id))}const u=document.getElementById("container-produto");function j(){f();const e=Array.from(u.getElementsByClassName("masculino"));for(const t of e)t.classList.add("hidden")}function k(){f();const e=Array.from(u.getElementsByClassName("feminino"));for(const t of e)t.classList.add("hidden")}function f(){const e=Array.from(u.getElementsByClassName("hidden"));for(const t of e)t.classList.remove("hidden")}function N(){document.getElementById("exibir-feminino").addEventListener("click",j),document.getElementById("exibir-masculino").addEventListener("click",k),document.getElementById("exibir-todos").addEventListener("click",f)}P();B();b();d();N();
