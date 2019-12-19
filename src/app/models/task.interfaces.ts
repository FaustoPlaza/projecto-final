import { AstMemoryEfficientTransformer } from '@angular/compiler';

export interface taskI{
    id_usuario: any;
    lista_id:any;
    tags: any;
    id?: string;
    sub_task: string;
    task: string;
    prioridad: number;
    banner_seleccionado:string;
    portada:string;
    bloque_id: string;
    bloque_html:string;
    info_user_uid:string;
    prioridad_selec: Array<[]>;
    user_info: string,
    user_info_email: string,
    user_info_photo:string,

} 