import { Remedio } from "../models/remedio";
import { remedioRepository } from "../repositories/remedio-repositories";

export const criarRemedio = async (
    usuarioId: number,
    dados: {
        nome: string;
        horario: string;
        observacoes?: string;
        frequenciaHoras?: number;
    }
) => {
    const remedio = new Remedio();
    remedio.usuarioId = usuarioId;
    remedio.nome = dados.nome;
    remedio.horario = dados.horario;
    if (dados.observacoes) remedio.observacoes = dados.observacoes;
    if (dados.frequenciaHoras) remedio.frequenciaHoras = dados.frequenciaHoras;

    const salvo = await remedioRepository.criar(remedio);
    return formatarRemedio(salvo);
};

export const listarRemedios = async (usuarioId: number) => {
    const remedios = await remedioRepository.buscarTodosPorUsuario(usuarioId);
    return remedios.map(formatarRemedio);
};

export const buscarRemedioPorId = async (id: number, usuarioId: number) => {
    const remedio = await remedioRepository.buscarPorId(id);

    if (!remedio) throw new Error("Remédio não encontrado");
    if (remedio.usuarioId !== usuarioId) throw new Error("Sem permissão");

    return formatarRemedio(remedio);
};

export const atualizarRemedio = async (
    id: number,
    usuarioId: number,
    dados: Partial<{
        nome: string;
        horario: string;
        observacoes: string;
        frequenciaHoras: number;
    }>
) => {
    const remedio = await remedioRepository.buscarPorId(id);

    if (!remedio) throw new Error("Remédio não encontrado");
    if (remedio.usuarioId !== usuarioId) throw new Error("Sem permissão");

    if (dados.nome)       remedio.nome = dados.nome;
    if (dados.horario)    remedio.horario = dados.horario;
    if (dados.observacoes !== undefined) remedio.observacoes = dados.observacoes;
    if (dados.frequenciaHoras !== undefined) remedio.frequenciaHoras = dados.frequenciaHoras;

    const atualizado = await remedioRepository.atualizar(remedio);
    return formatarRemedio(atualizado);
};

export const deletarRemedio = async (id: number, usuarioId: number) => {
    const remedio = await remedioRepository.buscarPorId(id);

    if (!remedio) throw new Error("Remédio não encontrado");
    if (remedio.usuarioId !== usuarioId) throw new Error("Sem permissão");

    await remedioRepository.deletar(id);
    return { message: "Remédio deletado com sucesso" };
};

export const marcarTomado = async (id: number, usuarioId: number) => {
    const remedio = await remedioRepository.buscarPorId(id);

    if (!remedio) throw new Error("Remédio não encontrado");
    if (remedio.usuarioId !== usuarioId) throw new Error("Sem permissão");

    remedio.tomado = !remedio.tomado;
    const atualizado = await remedioRepository.atualizar(remedio);
    return formatarRemedio(atualizado);
};

// helper — formata o retorno padrão
const formatarRemedio = (remedio: Remedio) => ({
    id: remedio.id,
    nome: remedio.nome,
    horario: remedio.horario,
    tomado: remedio.tomado,
    observacoes: remedio.observacoes ?? null,
    frequenciaHoras: remedio.frequenciaHoras ?? null,
    usuarioId: remedio.usuarioId,
    createdAt: remedio.createdAt,
    updatedAt: remedio.updatedAt,
    // campo data no formato YYYY-MM-DD que o frontend usa pra filtrar por dia
    data: remedio.createdAt
        ? remedio.createdAt.toISOString().split('T')[0]
        : '',
});
