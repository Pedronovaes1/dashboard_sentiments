import { useEffect, useState } from "react";
import { normalizeWord, sentimentosMap } from "./useSentimentoFrequente";

export function useSentimentoAll() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sentimento/all`);
                const json = await res.json();

                setDados(json);
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
