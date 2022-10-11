import { Injectable } from '@angular/core';
import { AfterContentChecked } from '@angular/core/core';
import * as Highcharts from 'highcharts';

@Injectable()
export class HighchartsService {

    private _objetoSeleccionado: any = sessionStorage.getItem('objetoSeleccionado');
    public dataFinal = JSON.parse(this._objetoSeleccionado);

    constructor() { }

    public data: any = [
        ['cantidad_lamparas', this.dataFinal?.properties?.cantidad_lamparas],
        ['altura', this.dataFinal?.properties?.altura],
        ['numero_registro', this.dataFinal?.properties?.numero_registro],
        ['potencia', this.dataFinal?.properties?.potencia],
    ];

    charts = [];
    defaultOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            renderTo: 'container'
        },
        title: {
            text: 'Datos de la luminaria seleccionada'
        },
        tooltip: {
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme) || 'black'
                    }
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: this.data ? this.data : this.DataGrafica()
        }]
    }

    createChart(container: any, options?: Object) {

        // Volvemos actualizar la grafica con los nuevos datos recibidos
        this.defaultOptions.series[0].data = this.data;

        this.DataGrafica();

        let opts = this.defaultOptions;
        // console.log('defaultOptions', opts);
        let e = document.createElement("div");

        container.appendChild(e);
        Highcharts.chart(container, opts as any);
    }


    public DataGrafica() {
        this._objetoSeleccionado = sessionStorage.getItem('objetoSeleccionado');
        this.dataFinal = JSON.parse(this._objetoSeleccionado);

        this.data = [
            ['cantidad_lamparas', this.dataFinal?.properties?.cantidad_lamparas],
            ['altura', this.dataFinal?.properties?.altura],
            ['numero_registro', this.dataFinal?.properties?.numero_registro],
            ['potencia', this.dataFinal?.properties?.potencia],
        ];
    }

}
