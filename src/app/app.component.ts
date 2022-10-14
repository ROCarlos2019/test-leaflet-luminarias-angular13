import { Component, Renderer2 } from '@angular/core';
import * as L from 'leaflet';
import { circleMarker, geoJSON, GeoJSONOptions, LatLng, LatLngBounds, Map, MapOptions, tileLayer, TileLayer } from 'leaflet';
import { CompartidoService } from './service/compartido.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public luminarias: any;

  public objSeleccionado: any;

  public map: Map;

  public mapOptions: MapOptions = {
    zoom: 12,
    zoomControl: false,
    center: [37.590227, -4.082193],
    preferCanvas: false
  };

  public baseLayer: TileLayer;

  public mapFitBounds: LatLngBounds = new LatLngBounds([
    [37.50547228, -4.22810257],
    [37.70590845000001, -3.98959274]
  ]);

  /**
   * Creates an instance of AppComponent.
   * @param {CompartidoService} servicioCompartido
   * @param {Renderer2} renderer
   * @memberof AppComponent
   */
  public constructor(private servicioCompartido: CompartidoService, private renderer: Renderer2) {


    this.baseLayer = tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      crossOrigin: 'anonymous',
      className: 'OSM',
      maxNativeZoom: 19,
      maxZoom: 22,
      minZoom: 1
    });

  }

  /**
   * Metodo disparado desde el Mapa leaflet.
   *
   * @param {Map} map
   * @memberof AppComponent
   */
  public onMapReady(map: Map): void {
    this.map = map;
    this.addLuminairesLayer();
  }

  /**
   * Metodo asincrono donde se realiza la construcción de los puntos del geojson para las luminarias.
   *
   * @private
   * @return {*}  {Promise<void>}
   * @memberof AppComponent
   */
  private async addLuminairesLayer(): Promise<void> {
    this.luminarias = await (await fetch('assets/data/luminarias.geojson')).json();

    const options: GeoJSONOptions = {
      pointToLayer: (feature: GeoJSON.Feature, latLng: LatLng) => circleMarker(latLng),
      style: feature => ({
        radius: 8,
        color: "#333",
        // color del punto (Luminaria)
        fillColor: "#FFFA4D",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
      })
    };
    geoJSON(this.luminarias, options).addTo(this.map);
    // Agregamos el control del zoom
    this.map.zoomIn(3);
    L.control.zoom({
      zoomInTitle: 'Acercar',
      zoomOutTitle: 'Alejar'
    }).addTo(this.map);


    // Agregar el icono de Ubicacion en el mapa
    const icon = L.icon({
      iconUrl: 'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-icon.png',
      shadowUrl: 'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-shadow.png',
      popupAnchor: [1, 0],
    });


    //Eventos del Mapa click 
    this.map.on('click', (e: {
      latlng: LatLng
    }) => {

      // Aumenta el zoom del mapa en delta( zoomDeltapor defecto).
      this.map.zoomIn(2);

      let coordenadasSeleccionada = e.latlng;
      console.log('Info del click detallado obteniendo unicamente coordenadas: ', coordenadasSeleccionada);

      const marker = L.marker([e.latlng.lat, e.latlng.lng], { icon }).bindPopup('<p>Latitud:' + e.latlng.lat + '</p><p>Longitud:' + e.latlng.lng + '</p>');
      marker.addTo(this.map);

      //this.map.flyTo(coordenadas, 13);

      var obtenerLatLng = [marker.getLatLng()];
      var markerBounds = L.latLngBounds(obtenerLatLng);
      // Establece una vista de mapa que contiene los límites geográficos dados con el máximo nivel de zoom posible.
      this.map.fitBounds(markerBounds);


      // INTENTANDO CAMBIAR EL COLOR DE LA LAMPARA SELECCIONADA
      var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#FF6100",
        color: "#FFC100", // Borde
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };

      let arrayCoordenadas: any[] = [];
      let contador = 0;
      L.geoJSON(this.luminarias, {
        pointToLayer: function (feature, latlng) {
          arrayCoordenadas.push({ id: contador, cordenadas: latlng });
          contador++;
          // mandamos el punto seleccionado para cambiar sus propiedades (radius, color, fillColor, etc.)
          return L.circleMarker(coordenadasSeleccionada, geojsonMarkerOptions);
        },
      })//.addTo(this.map);

      // Logica para Seleccionar el Objeto del punto seleccionado dentro del mapa.
      var BreakException = {};
      var lat = '';
      var lng = '';
      var cordenadaExistente: any;
      var prenderLuminaria: boolean = false;

      try {
        /** Se recorre el array de todas las coordenadas para realizar la igualacion de las coordenada seleccionada con la del array
         * Para poder obtener su indice y posteriormente todo el objeto de la Luminaria seleccionada.
         */
        arrayCoordenadas.forEach(function (el, index) {
          lat = el.cordenadas.lat.toString().substr(0, 7);
          lng = el.cordenadas.lng.toString().substr(0, 7);

          const latSelected = coordenadasSeleccionada.lat.toString().substring(0, 7);
          const lngSelected = coordenadasSeleccionada.lng.toString().substring(0, 7);

          if (lat == latSelected && lng == lngSelected) {
            prenderLuminaria = true;
            cordenadaExistente = {
              "index": index,
              "cordenadas": coordenadasSeleccionada
            };
            throw BreakException;
          }
        });
      } catch (e) {
        // Una vez que sabemos cual es el indice del objeto seleccionado 'click' -> solo obtenemos el objeto del array original.
        const index = cordenadaExistente.index;
        this.objSeleccionado = this.luminarias.features[index];
        sessionStorage.setItem("objetoSeleccionado", JSON.stringify(this.luminarias.features[index]));
        sessionStorage.setItem("arrayObjetosGEOJSON", JSON.stringify(this.luminarias.features.length));
        this.servicioCompartido.setDatosObjetoLuminaria(this.objSeleccionado);
        this.map.zoomIn(1);

      }


      if(prenderLuminaria) {
        L.geoJSON(this.luminarias, {
          pointToLayer: function (feature, latlng) {
            arrayCoordenadas.push({ id: contador, cordenadas: latlng });
            contador++;
            // mandamos el punto seleccionado para cambiar sus propiedades (radius, color, fillColor, etc.)
            return L.circleMarker(coordenadasSeleccionada, geojsonMarkerOptions);
          },
        }).addTo(this.map);
      }


    });

  }




}

