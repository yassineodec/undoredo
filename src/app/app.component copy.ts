import { Component } from '@angular/core';

interface Fila {
  id: number;
  nombre: string;
  edad: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  filas: Fila[] = [];
  estadosAnteriores: Fila[][] = [];
  estadosPosteriores: Fila[][] = [];
  id: number | undefined;
  nombre: string | undefined;
  edad: number | undefined;
  editando: boolean = false;
  indiceEditar: number = -1;

  editar(fila: any) {
    this.editando = true;
    this.indiceEditar = this.filas.indexOf(fila);
    this.estadosAnteriores.push(JSON.parse(JSON.stringify(this.filas))); // Hacer una copia profunda de las filas
    this.id = fila.id;
    this.nombre = fila.nombre;
    this.edad = fila.edad;
  }

  guardar() {
    this.filas[this.indiceEditar].id = this.id!;
    this.filas[this.indiceEditar].nombre = this.nombre!;
    this.filas[this.indiceEditar].edad = this.edad!;
    this.limpiarFormulario();
    this.editando = false;
    this.indiceEditar = -1;
  }

  limpiarFormulario() {
    this.id = Math.floor(Math.random() * 1000);
    this.nombre = '';
    this.edad = undefined;
  }

  agregar(): void {
    if (this.nombre && this.edad) {
      const nuevaFila: Fila = {
        id:
          this.filas.length > 0 ? this.filas[this.filas.length - 1].id + 1 : 1,
        nombre: this.nombre,
        edad: this.edad,
      };
      this.estadosAnteriores.push(this.filas.slice());
      this.filas.push(nuevaFila);
      this.nombre = undefined;
      this.edad = undefined;
    }
  }

  eliminar(fila: Fila): void {
    const indice = this.filas.indexOf(fila);
    if (indice >= 0) {
      this.estadosAnteriores.push(this.filas.slice());
      this.filas.splice(indice, 1);
    }
  }
  undo() {
    if (this.estadosAnteriores.length > 0) {
      const ultimoEstado = this.estadosAnteriores.pop();
      if (ultimoEstado) {
        this.estadosPosteriores.push([...this.filas]);
        this.filas = ultimoEstado;
        this.editando = false;
        this.indiceEditar = -1;
      }
    }
  }

  redo() {
    if (this.estadosPosteriores.length > 0) {
      this.estadosAnteriores.push(this.filas.slice());
      this.filas = this.estadosPosteriores.pop()!;
    }
  }
}
