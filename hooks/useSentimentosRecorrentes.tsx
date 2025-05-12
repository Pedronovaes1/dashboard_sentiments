import { error } from "console";
import { setDate } from "date-fns";
import { useEffect, useState } from "react";

export function useSentimentosRecorrentes() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchDados = async () => {
        try {
          const res = await fetch('http://localhost:8000/sentimento/recorrente');
          const json = await res.json();
          setDados(json);
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