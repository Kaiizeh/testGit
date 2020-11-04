import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApService {
  private urlDomaine : string = "http://www.francisdemars.fr/restVM";

  constructor(private http: HttpClient) { }

  connexion(loginIn : string, mdpIn : string ) : Observable<string[]>{
    let url :string = this.urlDomaine + "/connexion?login=" + loginIn + "&mdp=" + mdpIn;
    return this.http.get<string[]>(url).pipe(retry(1),catchError(this.handleError));

    }
    handleError(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Erreur: ${error.error.message}`;
      } else {
        // server-side error
        errorMessage = `Erreur Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }

    public chargerMedecins(nomMedecin : string) : Observable<string[]>{
      let url : string = this.urlDomaine + "/medecins?nom=" + nomMedecin;
      let req = this.http.get<string[]>(url)
      .pipe(
      retry(1),
      catchError(this.handleError)
      );
      return req;
    }

    public chargerRapports(idMedecin : Number ): Observable<string[]>{
      let url : string = this.urlDomaine + "/rapports/" + idMedecin;
      let req = this.http.get<string[]>(url)
      .pipe(
      retry(1),
      catchError(this.handleError)
      );
      return req;
    }
     
}
