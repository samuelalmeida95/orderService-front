import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements AfterViewInit {

  tecnicos: Cliente [] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'actions'];
  dataSource = new MatTableDataSource<Cliente>(this.tecnicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : ClienteService,
    private router : Router){}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void {
   const subscription =  this.service.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(this.tecnicos);
      this.dataSource.paginator = this.paginator;
      subscription.unsubscribe();
    })
  }

  navigateToCreate():void {
    this.router.navigate(['tecnicos/create'])
  }
}
