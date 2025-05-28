"use client"

import { ThumbsDown, ThumbsUp, Minus, HelpCircle, Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { DateTime } from "luxon";
import { useAtendimento } from "@/hooks/useAtendimento"
import { useEffect, useState } from "react"
import { formatWord, normalizeWord } from "@/hooks/useSentimentoFrequente"

interface Comment {
  id: number
  user: {
    name: string
    avatar?: string
    initials: string
  }
  source: string
  comment: string
  sentiment: "satisfacao" | "frustracao" | "confusao" | "urgencia" | "raiva" | "neutro"
  date: string
}



const treatData = (comments, limit = null, filter = null) => {
    let idCounter = 1;

    const sorted = [...comments].sort((a, b) =>
        DateTime.fromISO(b.data_acao).toMillis() - DateTime.fromISO(a.data_acao).toMillis()
    );

    const filtered = (filter && normalizeWord(filter) !== "all")
        ? sorted.filter(comment => normalizeWord(comment.sentimento) === normalizeWord(filter))
        : sorted;

    const limited = limit ? filtered.slice(0, limit) : filtered;

    return limited.map((input) => {
        const { user, conversa, sentimento, data_acao } = input;

        const name = user || "Usuário Anônimo";
        const initials = name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

        const dateTime = DateTime.fromISO(data_acao, { zone: "utc" }).setZone();
        const now = DateTime.local();

        let dateLabel = dateTime.toFormat("dd/MM/yyyy, HH:mm");
        if (dateTime.hasSame(now, "day")) {
            dateLabel = `Hoje, ${dateTime.toFormat("HH:mm")}`;
        } else if (dateTime.hasSame(now.minus({ days: 1 }), "day")) {
            dateLabel = `Ontem, ${dateTime.toFormat("HH:mm")}`;
        }

        return {
            id: idCounter++,
            user: {
                name,
                initials,
            },
            source: "Chat Interno",
            comment: conversa,
            sentiment: sentimento,
            date: dateLabel,
        };
    });
};

type RecentCommentsProps = {
  limit?: number;
  filter?: string;
};

export function RecentComments({ limit, filter }: RecentCommentsProps) {
    const [ data, setData ] = useState([])
    const { dados, loading } = useAtendimento()

    useEffect(() => {
        if(dados) {
            setData(treatData(dados, limit, formatWord(filter)))
        }
    }, [dados, filter])

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "satisfacao":
        return <ThumbsUp className="h-4 w-4 text-green-500" />
      case "frustracao":
        return <ThumbsDown className="h-4 w-4 text-orange-500" />
      case "confusao":
        return <HelpCircle className="h-4 w-4 text-yellow-500" />
      case "urgencia":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "raiva":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "satisfacao":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Satisfação</Badge>
      case "frustracao":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Frustração</Badge>
      case "confusao":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Confusão</Badge>
      case "urgencia":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Urgência</Badge>
      case "raiva":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Raiva</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Neutro</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {data && data.map((comment: Comment, index) => (
        <div key={comment.id}>
          <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border">
              {comment.user.avatar ? (
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
              ) : null}
                  <AvatarFallback>{comment.user.initials}</AvatarFallback>
              </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="font-medium">{comment.user.name}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                  {getSentimentIcon(comment.sentiment)}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Via {comment.source}</div>
              <p className="text-sm">{comment.comment}</p>
              <div className="pt-1">{getSentimentBadge(comment.sentiment)}</div>
            </div>
          </div>
          {index < data.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  )
}
