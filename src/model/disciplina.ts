export class Disciplina {

    private Matricula: String;
    private CodTurma: String;
    private Nome: String;
    private Disciplina: String;

    constructor() {
  
    }

    get matricula() : String {
      return this.Matricula;
    }    

    set matricula(p:String)
    {
      this.Matricula = p;
    }

    get codTurma() : String {
      return this.CodTurma;
    }    

    set codTurma(p:String)
    {
      this.CodTurma = p;
    }

    get disciplina() : String {
      return this.Disciplina;
    }    

    set disciplina(p:String)
    {
      this.Disciplina = p;
    }

    get nome() : String {
      return this.Nome;
    }    

    set nome(p:String)
    {
      this.Nome = p;
    }
 

  }