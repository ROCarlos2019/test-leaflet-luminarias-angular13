

export class DatosLuminaria {
    constructor() { }
    public 'type': string | undefined;
    public 'properties': ObjetoProperties;
    public 'geometry': ObjetoGeometry;
    public 'id': number | undefined;

}

export class ObjetoProperties {
    constructor() { }
    public 'observaciones': string;
    public 'id_luminaria': string;
    public 'punto_luz': string;
    public 'vial': string;
    public 'numero': string;
    public 'lado_via': string;
    public 'distancia_eje': string;
    public 's1': string;
    public 's2': string;
    public 'centro_mando': string;
    public 'circuito': string;
    public 'operativa': string;
    public 'altura': number;
    public 'tipo_soporte': string;
    public 'marca_soporte': string;
    public 'modelo_soporte': string;
    public 'estado_soporte': string;
    public 'situacion_soporte': string;
    public 'tamano_brazo': string;
    public 'longitud_brazo': string;
    public 'orientacion_brazo': string;
    public 'tipo_luminaria': string;
    public 'marca_luminaria': string;
    public 'modelo_luminaria': string;
    public 'estado_luminaria': string;
    public 'tipo_lampara': string;
    public 'marca_lampara': string;
    public 'modelo_lampara': string;
    public 'estado_lampara': string;
    public 'cantidad_lamparas': number;
    public 'potencia': number;
    public 'equipo_auxiliar': string;
    public 'situacion_equipo_auxiliar': string;
    public 'orientacion': string;
    public 'alta': boolean;
    public 'usuario_alta': string;
    public 'fecha_alta': string;
    public 'modificado': boolean;
    public 'usuario_modificado': string;
    public 'fecha_modificado': string;
    public 'herramienta': string;
    public 'numero_registro': number;
    public 'envio': string;
    public 'fecha_envio': string;
    public 'id_centro_mando': string;
    public 'id_circuito': string;

}

export class ObjetoGeometry {
    constructor() { }
    public 'type': string;
    public 'coordinates': Array<any>;

}