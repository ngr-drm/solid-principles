import { uuid } from 'uuidv4';

export class User {

  public readonly id!: string; // O recurso de asserção de atribuição foi requerido.
  
  public name!: string;
  public email!: string;
  public password!: string;

  constructor(props: Omit<User, 'id'>, id?: string){

     Object.assign(this, props); //Uma forma simplificada de declarar os atributos da classe.
    // this.name = props.name;
    // this.email = props.email;
    // this.password = props.password;
    
    if(!id){
      // Este procedimento retira do banco de dados a responsabilidade de criar o identificador;
      this.id = uuid(); 
    }

  }

}