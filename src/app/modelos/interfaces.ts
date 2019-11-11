
export interface Solicitud { //interfaces utilizadas en todo el codigo
    id?: string;
    ref?: number;
    usuario?: string;
    monto?: number;
    tarifa?: number;
    banco?: string;
    pago?: string;
    aceptada?: boolean;
}

export interface Zelle { 
    id?: string;
    alias?: string;
    correoZelle?: string;
    nombreZelle?: string;
    usuario?: string; 
    principal?: boolean;
}
export interface Filtro1 {
    filtro1?: boolean;
  }
  export interface Filtro2 {
    filtro2?: boolean;
  }
export interface Transfer { 
    comprador?: string;
    vendedor?: string;
    refbanco?: number;
    montoDolar?: number;
    idventa?: string;
    pagadoVendedor?:boolean;
    pagadoComprador?:boolean;
    tasa?: number;
    montoBolivar?: number;
    idSolicitud?: string;
    fecha?: string;
    hora?: string;
    historial?: boolean;
    canUsuariosConfirmaron?: number;
}

export interface Banco { 
    id?: string;
    cedula?: string;
    nombreBanco?: string;
    nombreCliente?: string;
    numerocuenta?: number;
    aliasBanco?: string;
    usuario?: string; 
}