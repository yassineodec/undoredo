import { AppComponent } from '../app.component';
import { Command } from '../command.interface';
import { Fila } from '../fila.interface';

export class EliminarCommand implements Command {
  private filaEliminada: Fila | undefined;
  private indice: number | undefined;

  constructor(private appComponent: AppComponent, private fila: Fila) {}

  execute(): void {
    this.indice = this.appComponent.filas.indexOf(this.fila);
    if (this.indice! >= 0) {
      this.filaEliminada = this.appComponent.filas.splice(this.indice, 1)[0];
      this.appComponent.estadosAnteriores.push(this.appComponent.filas.slice());
    }
  }

  undo(): void {
    if (this.filaEliminada !== undefined && this.indice !== undefined) {
      this.appComponent.filas.splice(this.indice, 0, this.filaEliminada);
      this.appComponent.estadosAnteriores.push(this.appComponent.filas.slice());
    }
  }

  redo(): void {
    if (this.filaEliminada !== undefined && this.indice !== undefined) {
      this.appComponent.filas.splice(this.indice, 1);
      this.appComponent.estadosAnteriores.push(this.appComponent.filas.slice());
    }
  }
}
