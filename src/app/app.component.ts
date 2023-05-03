import { Component } from '@angular/core';
import { CommandManager } from './CommandManager';
import { AgregarCommand } from './Comandos/AgregarFilaCommand';
import { EliminarCommand } from './Comandos/EliminarCommand';
import { EditarCommand } from './Comandos/EditarCommand';
import { GuardarCommand } from './Comandos/GuardarCommand';
import { Fila } from './fila.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  [x: string]: any;
  filas: Fila[] = [];
  estadosAnteriores: Fila[][] = [];
  estadosPosteriores: Fila[][] = [];

  //Variables
  id: number | undefined;
  nombre: string | undefined;
  edad: number | undefined;
  editando: boolean = false;
  indiceEditar: number = -1;

  // Inicializando command manager
  commandManager: CommandManager = new CommandManager();

  editar(fila: any) {
    this.editando = true;
    this.indiceEditar = this.filas.indexOf(fila);
    const command = new EditarCommand(
      this,
      fila,
      this.id!,
      this.nombre!,
      this.edad!
    );
    this.commandManager.execute(command);
  }

  guardar() {
    const command = new GuardarCommand(
      this,
      this.indiceEditar,
      this.id,
      this.nombre,
      this.edad
    );
    this.commandManager.execute(command);
  }

  limpiarFormulario() {
    this, (this.id = Math.floor(Math.random() * 1000));
    this.nombre = '';
    this.edad = undefined;
  }

  agregar(): void {
    const command = new AgregarCommand(this, this.nombre!, this.edad!);
    this.commandManager.execute(command);
  }

  eliminar(fila: Fila): void {
    const command = new EliminarCommand(this, fila);
    this.commandManager.execute(command);
  }

  undo() {
    this.commandManager.undo();
  }

  redo() {
    this.commandManager.redo();
  }
}
