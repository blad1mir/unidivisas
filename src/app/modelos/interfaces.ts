
export interface Solicitud { //interfaces utilizadas en todo el codigo
    id?: string;
    ref?: number;
    usuario?: string;
    monto?: number;
    tarifa?: number;
    banco?: string;
    pago?: string;
}

export interface Banco { 
    Banco?: number;
    Cedula?: number;
    CorreoZelle?: string;
    NombreZelle?: string;
    NumeroCuenta?: number;
    nombreUsuario?: string;
    
}