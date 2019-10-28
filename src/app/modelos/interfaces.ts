
export interface Solicitud { //interfaces utilizadas en todo el codigo
    id?: string;
    ref?: number;
    usuario?: string;
    monto?: number;
    tarifa?: number;
    banco?: string;
    pago?: string;
}

export interface Zelle { 
    id?: string;
    alias?: string;
    correoZelle?: string;
    nombreZelle?: string;
    usuario?: string; 
}

export interface Transfer { 
   
    comprador?: string;
    vendedor?: string;
    refbanco?: number;
    montoDolar?: number;
    idventa?: string;
    pagado?:boolean;
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