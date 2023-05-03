import { AppComponent } from '../app.component';
import { Command } from '../command.interface';
import { Fila } from '../fila.interface';

export class EditarCommand implements Command {
  private filaAnterior: Fila | undefined;

  constructor(
    private appComponent: AppComponent,
    private fila: Fila,
    private id: number,
    private nombre: string,
    private edad: number
  ) {
    this.filaAnterior = JSON.parse(JSON.stringify(fila));
  }

  execute(): void {
    this.appComponent.id = this.fila.id;
    this.appComponent.nombre = this.fila.nombre;
    this.appComponent.edad = this.fila.edad;
  }

  undo(): void {
    this.appComponent.id = undefined;
    this.appComponent.nombre = undefined;
    this.appComponent.edad = undefined;
  }

  redo(): void {
    this.execute();
  }
}
