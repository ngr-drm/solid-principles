import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

/**
 * Observações sobre os conceitos do SOLID:
 * Notamos que está classe possue apenas uma funcionalidade, o que sugere
 * o princípio da responsabilidade única. Além disso, o atributo
 * userRepository é do tipo IUsersRepository, uma interface que pode
 * possuir métodos em dintintas abstrações, o que converge com o princípio
 * da substitução de Liskov. O princípio da inversão da dependência também pode 
 * ser observado nesta classe, já que as operações do banco de dados são uma 
 * dependência indireta, ou seja, a sua implementação está contida em uma camada específica.
 */

export class CreateUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ){}
  async execute(data: ICreateUserRequestDTO){

    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if(userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const user = new User(data);
    await this.userRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Equipe meu app',
        email: 'meuapp@meuapp.com.br'
      },
      subject: 'Seja bem-vindo',
      body: '<p>Você já pode fazer login...</p>'

    });

  }
}