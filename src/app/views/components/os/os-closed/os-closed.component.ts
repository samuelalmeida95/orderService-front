import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-closed',
  templateUrl: './os-closed.component.html',
  styleUrls: ['./os-closed.component.css']
})
export class OsClosedComponent implements AfterViewInit {

  lista: OS[] = [];

  displayedColumns: string[] = [
    "tecnico",
    "cliente",
    "abertura",
    "fechamento",
    "prioridade",
    "status",
    "actions",
  ];

  dataSource = new MatTableDataSource<OS>(this.lista);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
  ) {}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    const subscription = this.service.findAll().subscribe((resposta) => {
      resposta.forEach((ordemServico) => {
        if (ordemServico.status === "ENCERRADO") {
          this.lista.push(ordemServico);
        }
      });
      
      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OS>(this.lista);
      this.dataSource.paginator = this.paginator;
      subscription.unsubscribe();
    });
  }

  listarTecnico(): void {
    this.lista.forEach((ordemServico) => {
      this.tecnicoService
        .findById(ordemServico.tecnico)
        .subscribe((resposta) => {
          ordemServico.tecnico = resposta.nome;
        });
    });
  }

  listarCliente(): void {
    this.lista.forEach((ordemServico) => {
      this.clienteService
        .findById(ordemServico.cliente)
        .subscribe((resposta) => {
          ordemServico.cliente = resposta.nome;
        });
    });
  }

  prioridade(tipoPrioridade: any) {
    if (tipoPrioridade == "BAIXA") {
      return "baixa";
    } else if (tipoPrioridade == "MEDIA") {
      return "media";
    } else {
      return "alta";
    }
  }
}
