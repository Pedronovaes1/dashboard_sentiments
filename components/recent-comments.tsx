"use client"

import { ThumbsDown, ThumbsUp, Minus, HelpCircle, Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

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

const comments: Comment[] = [
  {
    id: 1,
    user: {
      name: "Carolina Silva",
      initials: "CS",
    },
    source: "Twitter",
    comment: "Adorei o novo aplicativo! A interface está muito mais intuitiva e rápida. Parabéns pelo trabalho!",
    sentiment: "satisfacao",
    date: "Hoje, 14:32",
  },
  {
    id: 2,
    user: {
      name: "Rafael Mendes",
      initials: "RM",
    },
    source: "Facebook",
    comment:
      "O atendimento ao cliente melhorou bastante nos últimos meses. Consegui resolver meu problema rapidamente.",
    sentiment: "satisfacao",
    date: "Hoje, 11:15",
  },
  {
    id: 3,
    user: {
      name: "Mariana Costa",
      initials: "MC",
    },
    source: "E-mail",
    comment: "Estou aguardando resposta sobre meu pedido há 3 dias. Preciso de uma solução urgente.",
    sentiment: "urgencia",
    date: "Ontem, 16:45",
  },
  {
    id: 4,
    user: {
      name: "Pedro Alves",
      initials: "PA",
    },
    source: "Site",
    comment: "O produto chegou no prazo previsto. Ainda não testei todas as funcionalidades.",
    sentiment: "neutro",
    date: "Ontem, 09:20",
  },
  {
    id: 5,
    user: {
      name: "Juliana Ferreira",
      initials: "JF",
    },
    source: "Instagram",
    comment: "Comprei o produto há uma semana e já apresentou defeito. Muito decepcionada com a qualidade.",
    sentiment: "raiva",
    date: "22/05/2023",
  },
]

export function RecentComments() {
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
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
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
          {index < comments.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  )
}
