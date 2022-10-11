import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatosLuminaria } from '../model/luminarias.model';

/**
 * Servicio para compartir datos através de los componentes Padre-Hijo por medio de un Observable.
 * y estar a la escucha de cualquier cambio.
 *
 * @export
 * @class CompartidoService
 */
@Injectable({
    providedIn: 'root'
})

export class CompartidoService {
 
    /* Luminarias */
    public datosObjetoLuminaria: DatosLuminaria = new DatosLuminaria;
    private luminarias = new BehaviorSubject<DatosLuminaria>(this.datosObjetoLuminaria);
    public obtenerLuminaria = this.luminarias.asObservable();

    constructor() { }
    
    /**
     * Metodo publico para setear los datos a compartir.
     *
     * @param {DatosLuminaria} datosObjetoLuminaria
     * @memberof CompartidoService
     */
    public setDatosObjetoLuminaria(datosObjetoLuminaria: DatosLuminaria) {
        this.luminarias.next(datosObjetoLuminaria);
    }

}
