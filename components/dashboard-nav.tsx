"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Bell, ChevronDown, FileText, Home, MessageSquare, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  isActive?: boolean
  badge?: number
  submenu?: { title: string; href: string }[]
}

export function DashboardNav() {
  const [open, setOpen] = useState(true)

  const navItems: NavItem[] = [
    {
      title: "Visão Geral",
      href: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Análise de Sentimentos",
      href: "/sentiments",
      icon: MessageSquare,
      badge: 5,
      submenu: [
        { title: "Por Produto", href: "/sentiments/product" },
        { title: "Por Canal", href: "/sentiments/channel" },
        { title: "Por Região", href: "/sentiments/region" },
      ],
    },
    {
      title: "Relatórios",
      href: "/reports",
      icon: FileText,
    },
    {
      title: "Clientes",
      href: "/customers",
      icon: Users,
    },
    {
      title: "Estatísticas",
      href: "/statistics",
      icon: BarChart3,
    },
    {
      title: "Notificações",
      href: "/notifications",
      icon: Bell,
      badge: 3,
    },
    {
      title: "Configurações",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="hidden border-r bg-gray-50/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {navItems.map((item, index) =>
              item.submenu ? (
                <Collapsible key={index} className="w-full">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2 text-muted-foreground",
                        item.isActive && "bg-gray-100 text-foreground font-medium",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-9 pt-1">
                    <div className="flex flex-col gap-1">
                      {item.submenu.map((subitem, subindex) => (
                        <Link
                          key={subindex}
                          href={subitem.href}
                          className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-gray-100 hover:text-foreground",
                    item.isActive && "bg-gray-100 text-foreground font-medium",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ),
            )}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="rounded-lg bg-gray-100 p-3">
            <h3 className="text-sm font-medium">Precisa de ajuda?</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Acesse nossa documentação ou entre em contato com o suporte.
            </p>
            <Button size="sm" className="mt-2 w-full text-xs">
              Centro de Ajuda
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
