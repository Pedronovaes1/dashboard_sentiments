"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TopicData {
  name: string
  count: number
  sentiment: string
  sentimentPercent: number
}

export function TopicAnalysis() {
  const [data, setData] = useState<TopicData[]>([])

  useEffect(() => {
    // Dados simulados para a análise de tópicos com sentimento predominante
    setData([
      { name: "Atendimento", count: 245, sentiment: "satisfacao", sentimentPercent: 68 },
      { name: "Produto", count: 187, sentiment: "satisfacao", sentimentPercent: 72 },
      { name: "Preço", count: 156, sentiment: "frustracao", sentimentPercent: 45 },
      { name: "Entrega", count: 132, sentiment: "urgencia", sentimentPercent: 53 },
      { name: "Qualidade", count: 98, sentiment: "satisfacao", sentimentPercent: 65 },
      { name: "App", count: 76, sentiment: "confusao", sentimentPercent: 38 },
    ])
  }, [])

  const getBarColor = (sentiment: string) => {
    switch (sentiment) {
      case "satisfacao":
        return "#10b981" // verde
      case "frustracao":
        return "#f97316" // laranja
      case "confusao":
        return "#eab308" // amarelo
      case "urgencia":
        return "#3b82f6" // azul
      case "raiva":
        return "#ef4444" // vermelho
      default:
        return "#6b7280" // cinza para neutro
    }
  }

  return (
    <div className="space-y-4">
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 80,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, "dataMax + 20"]} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
            <Tooltip
              formatter={(value, name) => [value, name === "count" ? "Menções" : "Sentimento"]}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {data.map((topic) => (
          <div key={topic.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getBarColor(topic.sentiment) }} />
              <span className="text-sm font-medium">{topic.name}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium" style={{ color: getBarColor(topic.sentiment) }}>
                {topic.sentiment.charAt(0).toUpperCase() + topic.sentiment.slice(1)}
              </span>
              <span className="text-muted-foreground"> ({topic.sentimentPercent}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
