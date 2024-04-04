import { Component, Input } from '@angular/core';
import { alertFail, alertSuccess, alertWarning } from 'src/app/models/alerts';
import { Sale } from 'src/app/models/modelos';
import { ApiInsertDeleteService } from 'src/app/services/api.insert-delete.service';
import { ApiService } from 'src/app/services/api.serviceComands';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})
export class DetailedComponent {

  @Input () resultDetalhado: Sale[] = []
  constructor(private serviceInsertDelete:ApiInsertDeleteService, private apiService:ApiService){}
  
  handleItemClick(result:Sale, orderId:number) {
 
    if(this.apiService.getLoggedInEmployee().id === result.vendor.id){
      if (result.order.length > 1) {
        // Executa o endpoint para remover o pedido da venda
        this.serviceInsertDelete.deleteOrderFromSale(result.id, orderId).subscribe(
          
          response => {
            result.order.forEach(order => {
              if(order.id === orderId){
                alertSuccess('venda ' +order.product.name ,' excluido com socesso!')
              }
            })
              },
              error => {
                alertFail('Erro ao buscar a venda atualizada:', error)
              }
            );
      } else {
        // Executa o endpoint para excluir a venda
        this.serviceInsertDelete.deletSale(result.id).subscribe(
          response => {
            alertSuccess('venda excluido com socesso!',' ')
            // Aqui você pode lidar com o redirecionamento ou qualquer outra lógica necessária após excluir a venda
          },
          error => {
            alertFail('Erro ao buscar a venda atualizada:', error)
          }
        );
      }
    }else{
      alertWarning('Você nao tem permição para excuir essa venda', 'Chame o vendedor que fez a venda ou o gerente')
    }

  }
}
