import { Command } from './command.interface';

export class CommandManager {
  private commands: Command[] = [];
  private current: number = -1;

  execute(command: Command): void {
    command.execute();
    this.commands.splice(this.current + 1);
    this.commands.push(command);
    this.current++;
  }

  undo(): void {
    if (this.current >= 0) {
      const command = this.commands[this.current];
      command.undo();
      this.current--;
    }
  }

  redo(): void {
    if (this.current < this.commands.length - 1) {
      this.current++;
      const command = this.commands[this.current];
      command.redo();
    }
  }
}
