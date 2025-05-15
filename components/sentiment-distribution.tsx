"use client"

import { useSentimentosRecorrentes } from "@/hooks/useSentimentosRecorrentes"
import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export function SentimentDistribution() {
  const [data, setData] = useState([])
  const { dados, loading } = useSentimentosRecorrentes()

  const processData = (apiResponse) => {
      const colorMap = {
          Satisfação: "#10b981",
          Frustração: "#f97316",
          Confusão: "#eab308",
          Urgência: "#3b82f6",
          Raiva: "#ef4444",
          Neutro: "#6b7280"
      }

      if (!apiResponse || !Array.isArray(apiResponse.sentimento)) return []

          return apiResponse.sentimento.map((item) => {
              const name = item.sentimento
              const value = item.count
              const color = colorMap[name] || "#cccccc"

              return { name, value, color }
          })
  }

  useEffect(() => {
      setData(processData(dados))
  }, [dados])

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, "Percentual"]}
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
