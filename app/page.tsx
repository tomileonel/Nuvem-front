"use client"

import { useState, useEffect } from "react"
import { BarChart3, ShoppingBag, History, Settings, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoadingAnimation from "./components/loading-animation"
import EstadisticasPage from "./components/estadisticas-page"
import VentasPage from "./components/ventas-page"
import HistorialPage from "./components/historial-page"
import PersonalizacionPage from "./components/personalizacion-page"
import FeedbackPage from "./components/feedback-page"
import HistorialDetailPage from "./components/historial-detail-page"
import VentaDetailPage from "./components/venta-detail-page"

export default function NuvemApp() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("estadisticas")
  const [currentPage, setCurrentPage] = useState("main") // Add this line
  const [selectedHistorialItem, setSelectedHistorialItem] = useState<any>(null) // Add this line
  const [selectedVentaItem, setSelectedVentaItem] = useState<any>(null) // Add this line

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingAnimation />
  }

  // Update the renderPage function to handle sub-pages
  const renderPage = () => {
    if (currentPage === "historial-detail" && selectedHistorialItem) {
      return <HistorialDetailPage item={selectedHistorialItem} onBack={() => setCurrentPage("main")} />
    }

    if (currentPage === "venta-detail" && selectedVentaItem) {
      return <VentaDetailPage item={selectedVentaItem} onBack={() => setCurrentPage("main")} />
    }

    switch (activeTab) {
      case "estadisticas":
        return <EstadisticasPage />
      case "ventas":
        return (
          <VentasPage
            onSelectVenta={(venta) => {
              setSelectedVentaItem(venta)
              setCurrentPage("venta-detail")
            }}
          />
        )
      case "historial":
        return (
          <HistorialPage
            onSelectItem={(item) => {
              setSelectedHistorialItem(item)
              setCurrentPage("historial-detail")
            }}
          />
        )
      case "personalizacion":
        return <PersonalizacionPage />
      case "feedback":
        return <FeedbackPage />
      default:
        return <EstadisticasPage />
    }
  }

  // Update the navigation button handlers to reset currentPage
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentPage("main")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col max-w-sm mx-auto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3">
        <h1 className="text-xl font-bold text-gray-800 text-center">Nuvem</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden pb-20">{renderPage()}</main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-2 py-2 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
        <div className="flex justify-around">
          <Button
            variant={activeTab === "estadisticas" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleTabChange("estadisticas")}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button
            variant={activeTab === "ventas" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleTabChange("ventas")}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
          <Button
            variant={activeTab === "historial" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleTabChange("historial")}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
          >
            <History className="h-4 w-4" />
          </Button>
          <Button
            variant={activeTab === "personalizacion" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleTabChange("personalizacion")}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant={activeTab === "feedback" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleTabChange("feedback")}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </nav>
    </div>
  )
}
