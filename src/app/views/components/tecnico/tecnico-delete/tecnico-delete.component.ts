import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Tecnico } from "src/app/models/tecnico";
import { TecnicoService } from "src/app/services/tecnico.service";

@Component({
  selector: "app-tecnico-delete",
  templateUrl: "./tecnico-delete.component.html",
  styleUrls: ["./tecnico-delete.component.css"],
})
export class TecnicoDeleteComponent implements OnInit {
  id_tecnico = "";

  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  constructor(
    private router: Router,
    private service: TecnicoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_tecnico = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.id_tecnico).subscribe((resposta) => {
      this.tecnico = resposta;
    });
  }

  delete(): void {
    this.service.delete(this.id_tecnico).subscribe(
      (resposta) => {
        this.router.navigate(["tecnicos"]);
        this.service.message("Técnico deletado com sucesso!");
      },
      (err) => {
        if(err.error.error.match('Tecnico não pode ser deletado, possui OS associadas')){
          this.service.message(err.error.error);
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate(["tecnicos"]);
  }
}
