import { Component, OnInit } from '@angular/core';
import { ApService } from '../service/ap.service';

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.css']
})
export class MedecinsComponent implements OnInit {
  nomMedecin : string;
  lesMedecins : Array<any>;
  medecin : any;
  lesRapports : Array<any>;
  legende : string;
  rapportHidden : boolean = false;
  constructor(private apiService: ApService) { }

  ngOnInit() {
    this.legende = "Rechercher le medecin";
  }

  charger () : void{
    this.apiService.chargerMedecins(this.nomMedecin)
    .subscribe(
    (data)=>{this.lesMedecins = data;}
    ,(error)=>{}
    );
  }

  selectionner (medecinSelect) : void{
    this.medecin = medecinSelect;
    this.nomMedecin = this.medecin["nom"] + " " + this.medecin["prenom"] + " : dep " + this.medecin["departement"];
    //On charge les rapports du medecin concerné
    this.apiService.chargerRapports(this.medecin[0]).subscribe((data)=>{this.lesRapports = data;}, (error)=>{});
    this.lesMedecins = null;
    this.legende = "Medecin : " + this.medecin["nom"] + " " + this.medecin["prenom"];  
  }


  derniersRapports () : void{
    this.rapportHidden = !this.rapportHidden;
  }
  
}

