import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const API_URL = 'https://backend-or-main-production-a372.up.railway.app';

/* ─── Tipos ─── */
export interface Remedio {
  id: number;
  nome: string;
  horario: string;
  tomado: boolean;
  observacoes?: string | null;
}

interface RemediosContextType {
  remedios: Remedio[];
  carregado: boolean;
  adicionarRemedio: (r: Omit<Remedio, 'id' | 'tomado'>) => Promise<void>;
  toggleRemedio: (id: number) => Promise<void>;
  removerRemedio: (id: number) => Promise<void>;
}

const RemediosContext = createContext<RemediosContextType | undefined>(undefined);

/* ─── Provider ─── */
export function RemediosProvider({ children }: { children: React.ReactNode }) {
  const { token, carregado: authCarregado } = useAuth(); // ← usa token e carregado
  const [remedios, setRemedios] = useState<Remedio[]>([]);
  const [carregado, setCarregado] = useState(false);

  // headers padrão com o token
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  // busca os remédios do banco quando o usuário logar
  useEffect(() => {
    if (!authCarregado) return;

    if (!token) {
      setRemedios([]);
      setCarregado(true);
      return;
    }

    setCarregado(false);
    fetch(`${API_URL}/remedio`, { headers })
      .then(res => res.json())
      .then(data => {
        if (data.sucesso) setRemedios(data.data);
      })
      .catch(err => console.error('Erro ao carregar remédios:', err))
      .finally(() => setCarregado(true));
  }, [token, authCarregado]);

  async function adicionarRemedio(dados: Omit<Remedio, 'id' | 'tomado'>) {
    const res = await fetch(`${API_URL}/remedio`, {
      method: 'POST',
      headers,
      body: JSON.stringify(dados),
    });
    const data = await res.json();
    if (data.sucesso) {
      setRemedios(prev => [...prev, data.data]);
    } else {
      throw new Error(data.message || 'Erro ao adicionar remédio');
    }
  }

  async function toggleRemedio(id: number) {
    const res = await fetch(`${API_URL}/remedio/${id}/tomado`, {
      method: 'PATCH',
      headers,
    });
    const data = await res.json();
    if (data.sucesso) {
      setRemedios(prev =>
        prev.map(r => (r.id === id ? data.data : r))
      );
    } else {
      throw new Error(data.message || 'Erro ao atualizar remédio');
    }
  }

  async function removerRemedio(id: number) {
    const res = await fetch(`${API_URL}/remedio/${id}`, {
      method: 'DELETE',
      headers,
    });
    const data = await res.json();
    if (data.sucesso) {
      setRemedios(prev => prev.filter(r => r.id !== id));
    } else {
      throw new Error(data.message || 'Erro ao remover remédio');
    }
  }

  return (
    <RemediosContext.Provider
      value={{ remedios, carregado, adicionarRemedio, toggleRemedio, removerRemedio }}
    >
      {children}
    </RemediosContext.Provider>
  );
}

/* ─── Hook de acesso ─── */
export function useRemedios() {
  const ctx = useContext(RemediosContext);
  if (!ctx) {
    throw new Error('useRemedios deve ser usado dentro de um <RemediosProvider>');
  }
  return ctx;
}