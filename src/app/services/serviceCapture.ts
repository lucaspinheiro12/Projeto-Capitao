import { Injectable,ViewContainerRef, ApplicationRef, Injector, ComponentRef  } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ServiceCapture {
   
    private produtosSelecionadosSubject = new BehaviorSubject<any[]>([]);
    produtosSelecionados$ = this.produtosSelecionadosSubject.asObservable();
    
    //remove o produco caso o input seja <= 0
    atualizarProdutos(produtos: any[]) {
      this.produtosSelecionadosSubject.next(produtos);
    }

  //adiciona produtos no carrinho
  adicionarProduto(produto: any) {
    const produtosSelecionados = this.produtosSelecionadosSubject.value;
    produtosSelecionados.push(produto);
    this.produtosSelecionadosSubject.next(produtosSelecionados);
    console.log(produtosSelecionados)
  }



}