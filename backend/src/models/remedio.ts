// src/models/remedio.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import "reflect-metadata";
import { Usuario } from "./user";

@Entity("remedios")
export class Remedio {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    nome: string;

    // horário que deve tomar — ex: "08:00"
    @Column({ length: 5, nullable: false })
    horario: string;

    // false = ainda não tomou hoje, true = já tomou
    @Column({ default: false })
    tomado: boolean;

    @Column({ type: "text", nullable: true })
    observacoes: string;

    @ManyToOne(() => Usuario, { onDelete: "CASCADE" })
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario;

    @Column({ name: "usuario_id" })
    usuarioId: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}