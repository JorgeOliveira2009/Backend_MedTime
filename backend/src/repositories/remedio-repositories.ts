import { AppDataSource } from "../config/database";
import { Remedio } from "../models/remedio";

export class RemedioRepository {
    private repository = AppDataSource.getRepository(Remedio);

    async criar(remedio: Remedio): Promise<Remedio> {
        return await this.repository.save(remedio);
    }

    async buscarTodosPorUsuario(usuarioId: number): Promise<Remedio[]> {
        return await this.repository.findBy({ usuarioId });
    }

    async buscarPorId(id: number): Promise<Remedio | null> {
        return await this.repository.findOneBy({ id });
    }

    async atualizar(remedio: Remedio): Promise<Remedio> {
        return await this.repository.save(remedio);
    }

    async deletar(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export const remedioRepository = new RemedioRepository();