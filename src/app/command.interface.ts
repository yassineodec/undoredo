import { Fila } from './fila.interface';

export interface Command {
  execute(): void;
  undo(): void;
  redo(): void;
}
