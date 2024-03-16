import Swal from "sweetalert2";

export function alertSuccess(titles:string, texts:string){
    Swal.fire({
        title: titles,
        text: texts,
        icon: 'success'
      });
}
export function alertWarning(titles:string, texts:string){
    Swal.fire({
        title: titles,
        text: texts,
        icon: 'warning'
      });
}

export function alertFail(titles:string, texts:string){
    Swal.fire({
        title: titles,
        text: texts,
        icon: 'error'
      });
}

export function aletTimerErro(message:string, timer:number){
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: message,
        showConfirmButton: false,
        timer: timer
      });
}

export function alertTimerSuccess(title:string, timer:number){
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: timer
      });
}
