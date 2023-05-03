import { AppComponent } from '../app.component';
import { Command } from '../command.interface';
import { Fila } from '../fila.interface';

export class AgregarCommand implements Command {
  private filaAgregada: Fila | undefined;

  constructor(
    private appComponent: AppComponent,
    private nombre: string,
    private edad: number
  ) {}

  undo(): void {
    const indice = this.appComponent.filas.indexOf(this.filaAgregada!);
    this.appComponent.filas.splice(indice, 1);
  }

  redo(): void {
    if (this.filaAgregada) {
      this.appComponent.filas.push(this.filaAgregada);
    }
  }

  execute() {
    if (this.nombre && this.edad) {
      const nuevaFila: Fila = {
        id:
          this.appComponent.filas.length > 0
            ? this.appComponent.filas[this.appComponent.filas.length - 1].id + 1
            : 1,
        nombre: this.nombre,
        edad: this.edad,
      };
      this.filaAgregada = nuevaFila;
      this.appComponent.estadosAnteriores.push(this.appComponent.filas.slice());
      this.appComponent.filas.push(nuevaFila);
      this.appComponent.nombre = undefined;
      this.appComponent.edad = undefined;
      this.appComponent.estadosPosteriores = []; // limpiar estados posteriores
    }
  }
}
