import { useEffect, useState } from "react";

export function normalizeWord(word: string): string {
    return word
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['"]/g, '');
}

export const sentimentosMap: Record<string, string> = {
    "satisfacao": "Satisfação",
    "raiva": "Raiva",
    "frustracao": "Frustração",
    "confusao": "Confusão",
    "urgencia": "Urgência",
};

const sentimentoPositivo = ["satisfacao"];
const sentimentoNegativo = ["raiva", "frustracao", "confusao", "urgencia"];

export function useSentimentosFrequentes() {
    const [dados, setDados] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sentimento/mais-frequente`);
                const json = await res.json();

                const sentimento_normalizado = normalizeWord(json.sentimento_predominante);

                const classe = sentimentoPositivo.includes(sentimento_normalizado)
                    ? "Positivo"
                    : sentimentoNegativo.includes(sentimento_normalizado)
                        ? "Negativo"
                        : "Neutro";

                        const sentimento_formatado =
                            sentimentosMap[sentimento_normalizado] ??
                            json.sentimento_predominante;

                        setDados({ ...json, sentimento_predominante: sentimento_formatado, classe });
                        setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar sentimentos:', error);
            }
        };

        fetchDados();

        const interval = setInterval(fetchDados, 5000);
        return () => clearInterval(interval);
    }, []);

    return { dados, loading };
}
