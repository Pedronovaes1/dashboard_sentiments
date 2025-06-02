"use client"

import { useEffect, useState } from "react"
import {
  ChevronDown,
  Download,
  Filter,
  MessageSquare,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
  TrendingDown,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { SentimentChart } from "@/components/sentiment-chart"
import { SentimentDistribution } from "@/components/sentiment-distribution"
import { RecentComments } from "@/components/recent-comments"
import { TopicAnalysis } from "@/components/topic-analysis"
import { formatWord, useSentimentosFrequentes } from "@/hooks/useSentimentoFrequente"
import { useAtendimento } from "@/hooks/useAtendimento"
import { useMaisNegativo } from "@/hooks/useMaisNegativo"


const treatFrequente = (data) => {
    let id = 0;
    return data.map((entry) => {
        id += 1;
        return {
            ...entry,
            id: id
        };
    });
};

export function DashboardPage() {
  const [ limit, setLimit ] = useState(4)
  const [ frequenteData, setFrequenteData ] = useState([])
  const [ atendimentosData, setAtendimentosData ] = useState([])
  const [ maisNegativoData, setMaisNegativoData ] = useState([])
  const [ filter, setFilter ] = useState("all")

  const { dados: frequente, loading: loadingFrequente } = useSentimentosFrequentes()
  const { dados: atendimentos, loading: loadingAtendimentos } = useAtendimento()
  const { dados: mais_negativo, loading: loadingMaisNegativo } = useMaisNegativo()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }


  useEffect(() => {
      setFrequenteData(treatFrequente([frequente]))
      setAtendimentosData(atendimentos)
      setMaisNegativoData(mais_negativo)
  }, [frequente, atendimentos, mais_negativo, isRefreshing])

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="font-bold text-xl flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            ITP Dashboard
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="sr-only">Atualizar dados</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <span className="hidden md:inline-flex">Minha Conta</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuItem>Ajuda</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex-1 md:grid-cols-[220px_1fr]">
        <div className="flex-1 p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard de Sentimentos</h1>
              <p className="text-muted-foreground">Análise de sentimentos dos clientes e funcinários</p>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filtrar</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Fonte</DropdownMenuItem>
                  <DropdownMenuItem>Departamento</DropdownMenuItem>
                  <DropdownMenuItem>Produto</DropdownMenuItem>
                  <DropdownMenuItem>Região</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Exportar</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
            {frequenteData && frequenteData.map((e: any) => (
              <Card key={e.id} className="lg:col-span-4">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sentimento Predominante</CardTitle>
                  {e.classe != "Negativo" ? (
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ThumbsDown className="h-4 w-4 text-red-500" />
                  )}
                </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{e.sentimento_predominante}</div>
                     <p className="text-xs text-muted-foreground">{e.porcentagem}% das menções</p>
                     <div className="mt-3">
                       <Progress value={e.porcentagem} className="h-2 bg-gray-200" />
                     </div>
                  </CardContent>
              </Card>
            ))}
            <Card className="lg:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sentimentos Negativos</CardTitle>
                <ThumbsDown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
              {maisNegativoData && (
                <>
                  <div className="text-2xl font-bold"> {maisNegativoData.porcentagem} %</div>
                  <div className="text-2xl text-red-600"> {formatWord(maisNegativoData.sentimento)}</div>
                </>
              )}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="analytics">Análise Detalhada</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Tendência de Sentimentos</CardTitle>
                    <CardDescription>Evolução dos sentimentos nos últimos 30 dias</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <SentimentChart />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Distribuição de Sentimentos</CardTitle>
                    <CardDescription>Proporção de sentimentos positivos, neutros e negativos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SentimentDistribution />
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader className="flex flex-row items-center">
                    <div className="flex-1">
                      <CardTitle>Comentários Recentes</CardTitle>
                      <CardDescription>Últimos comentários e suas classificações de sentimento</CardDescription>
                    </div>
                    <Select defaultValue="all" onValueChange={handleFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Filtrar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="satisfacao">Satisfação</SelectItem>
                        <SelectItem value="frustracao">Frustração</SelectItem>
                        <SelectItem value="confusao">Confusão</SelectItem>
                        <SelectItem value="urgencia">Urgência</SelectItem>
                        <SelectItem value="raiva">Raiva</SelectItem>
                        <SelectItem value="neutro">Neutro</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent>
                    <RecentComments
                        limit={limit}
                        filter={filter}
                        data={atendimentosData}
                        />
                  </CardContent>
                  <CardFooter className="flex justify-center border-t px-6 py-4">
                    {limit == null ? (
                        <Button variant="outline" onClick={() => setLimit(4)}>Ver Menos</Button>
                    ) :
                    (
                      <Button variant="outline" onClick={() => setLimit(null)}>Ver Todos</Button>
                    )}
                  </CardFooter>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader className="flex flex-row items-center">
                    <div className="flex-1">
                      <CardTitle>Análise de Tópicos</CardTitle>
                      <CardDescription>Principais tópicos mencionados nos comentários</CardDescription>
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="cliente">Cliente</SelectItem>
                        <SelectItem value="atendente">Atendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent>
                    <TopicAnalysis />
                  </CardContent>
                  <CardFooter className="flex justify-between border-t px-6 py-4">
                    <Button variant="ghost" size="sm">
                      Exportar
                    </Button>
                    <Button variant="ghost" size="sm">
                      Ver Detalhes
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Detalhada</CardTitle>
                  <CardDescription>Análise aprofundada dos sentimentos por diferentes dimensões</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-40 border rounded-md">
                    <p className="text-muted-foreground">Conteúdo de análise detalhada será exibido aqui</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios</CardTitle>
                  <CardDescription>Relatórios personalizados e programados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-40 border rounded-md">
                    <p className="text-muted-foreground">Conteúdo de relatórios será exibido aqui</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
