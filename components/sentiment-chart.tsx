"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Dados simulados para o gráfico
const generateData = () => {
  const data = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Gerar valores aleatórios para cada sentimento
    const satisfacao = 25 + Math.random() * 15
    const frustracao = 10 + Math.random() * 8
    const confusao = 5 + Math.random() * 10
    const urgencia = 8 + Math.random() * 7
    const raiva = 5 + Math.random() * 5
    const neutralidade = 10 + Math.random() * 10

    data.push({
      date: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      satisfacao: Math.round(satisfacao),
      frustracao: Math.round(frustracao),
      confusao: Math.round(confusao),
      urgencia: Math.round(urgencia),
      raiva: Math.round(raiva),
      neutro: Math.round(neutralidade),
    })
  }

  return data
}

export function SentimentChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(generateData())
  }, [])

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} stroke="#888888" />
          <YAxis tick={{ fontSize: 12 }} tickMargin={10} stroke="#888888" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          <Line
            type="monotone"
            dataKey="satisfacao"
            name="Satisfação"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="frustracao"
            name="Frustração"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="confusao"
            name="Confusão"
            stroke="#eab308"
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="urgencia"
            name="Urgência"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="raiva"
            name="Raiva"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="neutro"
            name="Neutro"
            stroke="#6b7280"
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
