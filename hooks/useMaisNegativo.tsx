import { useEffect, useState } from "react";

export function useMaisNegativo() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sentimento/mais-negativo`);
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
