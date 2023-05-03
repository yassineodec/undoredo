import { AppComponent } from '../app.component';
import { Command } from '../command.interface';

export class GuardarCommand implements Command {
  private idAnterior: number | undefined;
  private nombreAnterior: string | undefined;
  private edadAnterior: number | undefined;

  constructor(
    private appComponent: AppComponent,
    private indiceEditar: number,
    private id: number | undefined,
    private nombre: string | undefined,
    private edad: number | undefined
  ) {}

  execute() {
    // Guardamos los valores anteriores
    const fila = this.appComponent.filas[this.indiceEditar];
    this.idAnterior = fila.id;
    this.nombreAnterior = fila.nombre;
    this.edadAnterior = fila.edad;

    // Actualizamos la fila
    this.appComponent.filas[this.indiceEditar].id = this.id!;
    this.appComponent.filas[this.indiceEditar].nombre = this.nombre!;
    this.appComponent.filas[this.indiceEditar].edad = this.edad!;
    this.appComponent.limpiarFormulario();
    this.appComponent.editando = false;
    this.appComponent.indiceEditar = -1;
  }

  undo() {
    // Deshacemos la última acción
    this.appComponent.filas[this.indiceEditar].id = this.idAnterior!;
    this.appComponent.filas[this.indiceEditar].nombre = this.nombreAnterior!;
    this.appComponent.filas[this.indiceEditar].edad = this.edadAnterior!;
  }

  redo() {
    // Rehacemos la última acción
    this.execute();
  }
}
