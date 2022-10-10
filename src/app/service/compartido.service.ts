import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatosLuminaria } from '../model/luminarias.model';



@Injectable({
    providedIn: 'root'
})
export class CompartidoService {
 

    /* Luminarias */
    public datosObjetoLuminaria: DatosLuminaria = new DatosLuminaria;
    private luminarias = new BehaviorSubject<DatosLuminaria>(this.datosObjetoLuminaria);
    obtenerLuminaria = this.luminarias.asObservable();

    constructor() { }

    setDatosObjetoLuminaria(datosObjetoLuminaria: DatosLuminaria) {
        this.luminarias.next(datosObjetoLuminaria);
    }

}
