import { useEffect, useState } from "react";
import { formatWord, normalizeWord } from "./useSentimentoFrequente";

const sentimentoPositivo = ["satisfacao"];
const sentimentoNegativo = ["raiva", "frustracao", "confusao", "urgencia"];

export function useSentimentosRecorrentes() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sentimento/recorrente`);
                const json = await res.json();

                const tratados = json.map((item) => {
                    const sentimento_normalizado = normalizeWord(item.sentimento);

                    const sentimento_formatado = formatWord(sentimento_normalizado) ?? capitalize(item.sentimento);

                    const classe = sentimentoPositivo.includes(sentimento_normalizado)
                        ? "Positivo"
                        : sentimentoNegativo.includes(sentimento_normalizado)
                        ? "Negativo"
                        : "Neutro";

                    return {
                        sentimento: sentimento_formatado,
                        count: item.count,
                        classe,
                    };
                });

                setDados(tratados);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar sentimentos:", error);
            }
        };

        fetchDados();

        const interval = setInterval(fetchDados, 5000);
        return () => clearInterval(interval);
    }, []);

    return { dados, loading };
}

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
