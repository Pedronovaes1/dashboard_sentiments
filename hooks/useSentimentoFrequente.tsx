import { useEffect, useState } from "react";

const sentimentoPositivo = ["satisfação"];
const sentimentoNegativo = ["raiva", "frustração", "confusão", "urgencia"];

export function useSentimentosFrequentes() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/sentimento/mais-frequente');
                const json = await res.json();

                const sentimento = json.sentimento_predominante.toLowerCase();

                const classificacao = sentimentoPositivo.includes(sentimento)
                    ? "Positivo"
                    : sentimentoNegativo.includes(sentimento)
                    ? "Negativo"
                    : "Neutro";

                setDados({ ...json, classificacao });
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
