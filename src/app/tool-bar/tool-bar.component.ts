import { AfterContentChecked, AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DatosLuminaria } from '../model/luminarias.model';
import { CompartidoService } from '../service/compartido.service';
import * as Highcharts from 'highcharts';
import { HighchartsService } from '../service/highcharts.service';
@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  private _totalLuminarias: any = 1;

  @ViewChild('CantidadLuminarias') CantidadLuminarias!: ElementRef;

  @ViewChild('charts') public chartEl: ElementRef;

  constructor(private renderer: Renderer2,
    private servicioCompartido: CompartidoService,
    private ngZone: NgZone, private hcs: HighchartsService) {

  }

  public datosRecibidos: DatosLuminaria = new DatosLuminaria;

  //get access to #sessionDuration element
  @ViewChild('sessionDuration') sessionDuration!: ElementRef;
  @ViewChild('sessionIDLuminaria') sessionIDLuminaria!: ElementRef;
  @ViewChild('Latitud') Latitud!: ElementRef;
  @ViewChild('Longitud') Longitud!: ElementRef;
  @ViewChild('Observaciones') Observaciones!: ElementRef;
  @ViewChild('Altura') Altura!: ElementRef;
  @ViewChild('CantidadLampara') CantidadLampara!: ElementRef;
  @ViewChild('DistanciaEje') DistanciaEje!: ElementRef;
  @ViewChild('EquipoAuxiliar') EquipoAuxiliar!: ElementRef;
  @ViewChild('EstadoLampara') EstadoLampara!: ElementRef;
  @ViewChild('EstadoLuminaria') EstadoLuminaria!: ElementRef;
  @ViewChild('EstadoSoporte') EstadoSoporte!: ElementRef;
  @ViewChild('LadoVia') LadoVia!: ElementRef;
  @ViewChild('TipoSoporte') TipoSoporte!: ElementRef;
  @ViewChild('TipoLuminaria') TipoLuminaria!: ElementRef;
  @ViewChild('TipoLampara') TipoLampara!: ElementRef;


  @ViewChild("myButton")
  myButton!: ElementRef;

  @Input('valueDataMapa') valueDataMapa: any;

  ngOnInit(): void {



    this.ngZone.runOutsideAngular(() => {
      this._totalLuminarias = sessionStorage.getItem('arrayObjetosGEOJSON');
      console.log('_totalLuminarias ----> :)', this._totalLuminarias);

      this.servicioCompartido.obtenerLuminaria.subscribe((data: DatosLuminaria) => {
        if (data) {
          this.datosRecibidos = data;
          this.renderer.setProperty(this.sessionDuration.nativeElement, 'innerHTML', data.id);
          // this.renderer.setProperty(this.Latitud.nativeElement, 'innerHTML', data.geometry.coordinates[0]);
          // this.renderer.setProperty(this.Longitud.nativeElement, 'innerHTML', data.geometry.coordinates[1]);
          this.renderer.setProperty(this.sessionIDLuminaria.nativeElement, 'innerHTML', data.properties.id_luminaria);
          this.renderer.setProperty(this.Observaciones.nativeElement, 'innerHTML', this.datosRecibidos.properties.observaciones);
          this.renderer.setProperty(this.Altura.nativeElement, 'innerHTML', this.datosRecibidos.properties.altura);
          this.renderer.setProperty(this.CantidadLampara.nativeElement, 'innerHTML', this.datosRecibidos.properties.cantidad_lamparas);
          this.renderer.setProperty(this.DistanciaEje.nativeElement, 'innerHTML', this.datosRecibidos.properties.distancia_eje);
          this.renderer.setProperty(this.EquipoAuxiliar.nativeElement, 'innerHTML', this.datosRecibidos.properties.equipo_auxiliar);
          this.renderer.setProperty(this.EstadoLampara.nativeElement, 'innerHTML', this.datosRecibidos.properties.estado_lampara);
          this.renderer.setProperty(this.EstadoLuminaria.nativeElement, 'innerHTML', this.datosRecibidos.properties.estado_luminaria);
          this.renderer.setProperty(this.EstadoSoporte.nativeElement, 'innerHTML', this.datosRecibidos.properties.estado_soporte);
          this.renderer.setProperty(this.LadoVia.nativeElement, 'innerHTML', this.datosRecibidos.properties.lado_via);
          this.renderer.setProperty(this.TipoSoporte.nativeElement, 'innerHTML', this.datosRecibidos.properties.tipo_soporte);
          this.renderer.setProperty(this.TipoLuminaria.nativeElement, 'innerHTML', this.datosRecibidos.properties.tipo_luminaria);
          this.renderer.setProperty(this.TipoLampara.nativeElement, 'innerHTML', this.datosRecibidos.properties.tipo_lampara);

          this.renderer.setProperty(this.CantidadLuminarias.nativeElement, 'innerHTML', this._totalLuminarias);

          this.myButton.nativeElement.click();
          this.renderer.selectRootElement(this.myButton.nativeElement).click();

          this.createChart();
        }

      });
    });
  }

  createChart() {
    this.hcs.createChart(this.chartEl.nativeElement);
  }


}
