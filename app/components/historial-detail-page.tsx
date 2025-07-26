"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, Clock, FileText, PlayCircle } from "lucide-react"

interface HistorialDetailPageProps {
  item: any
  onBack: () => void
}

export default function HistorialDetailPage({ item, onBack }: HistorialDetailPageProps) {
  const formatTranscription = (transcription: string) => {
    return transcription
      .split("\n")
      .map((line, index) => {
        if (line.trim() === "") return null

        const isAgent = line.includes("Agente:")
        const isClient = line.includes("Cliente:")

        if (isAgent || isClient) {
          const [timestamp, ...messageParts] = line.split("] ")
          const message = messageParts.join("] ")

          return (
            <div key={index} className={`mb-3 ${isAgent ? "ml-0" : "ml-4"}`}>
              <div
                className={`p-3 rounded-lg ${
                  isAgent ? "bg-blue-50 border-l-4 border-blue-500" : "bg-gray-50 border-l-4 border-gray-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${isAgent ? "text-blue-600" : "text-gray-600"}`}>
                    {isAgent ? "Agente" : "Cliente"}
                  </span>
                  <span className="text-xs text-gray-500">{timestamp?.replace("[", "")}</span>
                </div>
                <p className="text-sm text-gray-800">{message.replace(/^(Agente:|Cliente:)\s*/, "")}</p>
              </div>
            </div>
          )
        }

        return null
      })
      .filter(Boolean)
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">Transcripción de Llamada</h2>
      </div>

      <div className="space-y-4">
        {/* Call Summary */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              Resumen de la Llamada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Cliente:</span>
                <p className="font-semibold">{item.cliente}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Tipo:</span>
                <p>{item.tipo}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{item.fecha}</span>
              </div>
              <div className="text-sm">
                Duración: <span className="font-medium">{item.duracion}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Resultado:</span>
              <Badge
                variant={item.resultado === "Venta exitosa" ? "default" : "secondary"}
                className={item.resultado === "Venta exitosa" ? "bg-green-100 text-green-800" : ""}
              >
                {item.resultado}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Description */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Descripción Rápida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{item.descripcion}</p>
          </CardContent>
        </Card>

        {/* Full Transcription */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-purple-600" />
              Transcripción Completa
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">Conversación completa con marcas de tiempo</p>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg">
              {formatTranscription(item.transcripcion)}
            </div>
          </CardContent>
        </Card>

        {/* Call Analytics */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Análisis de la Llamada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Tiempo de respuesta promedio:</span>
                <p>3.2 segundos</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Interrupciones:</span>
                <p>2</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Palabras clave mencionadas:</span>
                <p>Premium, Soporte, Garantía</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Tono del cliente:</span>
                <p className="text-green-600">Positivo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
