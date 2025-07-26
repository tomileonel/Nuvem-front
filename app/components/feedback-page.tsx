"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Target, Lightbulb, ShoppingBag, MessageSquare, BarChart3 } from "lucide-react"

export default function FeedbackPage() {
  const [script, setScript] = useState("")
  const [feedback, setFeedback] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const scriptStrengths: string[] = []
  const scriptImprovements: string[] = []

  useEffect(() => {
    // Get the script from localStorage
    const savedScript =
      localStorage.getItem("nuvem-script") ||
      "Actúa como un agente de ventas profesional y amigable. Mantén un tono cordial pero persuasivo. Escucha activamente las necesidades del cliente y adapta tu discurso en consecuencia. Sé paciente con las objeciones y siempre ofrece soluciones. Tu objetivo es generar confianza y cerrar la venta de manera natural."
    setScript(savedScript)
    generateFeedback(savedScript)
  }, [])

  const generateFeedback = (scriptText: string) => {
    setIsAnalyzing(true)

    // Simulate AI analysis delay
    setTimeout(() => {
      const analysis = analyzeHistorialAndScript(scriptText)
      setFeedback(analysis)
      setIsAnalyzing(false)
    }, 2500)
  }

  const analyzeHistorialAndScript = (scriptText: string) => {
    // Simulated historical data analysis
    const historialStats = {
      totalCalls: 6,
      ganadas: 3,
      calificadas: 2,
      perdidas: 1,
      conversionRate: 50, // (ganadas / total) * 100
      avgCallDuration: "3:45",
      topProducts: ["Camiseta Premium", "Jeans Clásicos", "Chaqueta Ejecutiva"],
      customerSegments: {
        empresarial: 4,
        individual: 2,
      },
    }

    // Analyze script
    const isPersonable = scriptText.toLowerCase().includes("amigable") || scriptText.toLowerCase().includes("cordial")
    const isPersistent =
      scriptText.toLowerCase().includes("persistente") || scriptText.toLowerCase().includes("insistir")
    const isEmpathetic =
      scriptText.toLowerCase().includes("escucha") || scriptText.toLowerCase().includes("necesidades")
    const isSolutionFocused =
      scriptText.toLowerCase().includes("soluciones") || scriptText.toLowerCase().includes("beneficios")

    // Script scoring: Each criterion is worth 23 points (92% total when all criteria are met)
    // This reflects the quality of the default behavioral script
    let scriptScore = 0

    if (isPersonable) {
      scriptScore += 23
      scriptStrengths.push("Enfoque amigable y cordial definido")
    } else {
      scriptImprovements.push("Agregar instrucciones sobre tono amigable")
    }

    if (isEmpathetic) {
      scriptScore += 23
      scriptStrengths.push("Incluye escucha activa y comprensión del cliente")
    } else {
      scriptImprovements.push("Enfatizar la importancia de escuchar al cliente")
    }

    if (isSolutionFocused) {
      scriptScore += 23
      scriptStrengths.push("Orientado a ofrecer soluciones")
    } else {
      scriptImprovements.push("Incluir enfoque en beneficios y soluciones")
    }

    if (scriptText.length > 100) {
      scriptScore += 23
      scriptStrengths.push("Script detallado con instrucciones claras")
    } else {
      scriptImprovements.push("Expandir las instrucciones para mayor claridad")
    }

    // Generate recommendations based on historical performance
    const recommendations = []
    const productRecommendations = []

    // Performance-based recommendations
    if (historialStats.conversionRate < 60) {
      recommendations.push(
        "Tu tasa de conversión es del 50%. Considera ser más específico sobre los beneficios únicos de cada producto.",
      )
      recommendations.push(
        "Las llamadas 'Calificadas' muestran interés. Implementa un sistema de seguimiento más agresivo.",
      )
    } else {
      recommendations.push("Excelente tasa de conversión. Mantén tu enfoque actual.")
    }

    // Product-based recommendations
    if (historialStats.topProducts.includes("Camiseta Premium")) {
      productRecommendations.push(
        "Las camisetas premium tienen buena aceptación. Considera ofrecer paquetes con múltiples piezas.",
      )
    }

    if (historialStats.topProducts.includes("Jeans Clásicos")) {
      productRecommendations.push(
        "Los jeans clásicos son populares. Sugiere combinarlos con camisetas para aumentar el ticket promedio.",
      )
    }

    if (historialStats.topProducts.includes("Chaqueta Ejecutiva")) {
      productRecommendations.push(
        "Las chaquetas ejecutivas atraen al segmento empresarial. Enfócate en profesionales y empresarios.",
      )
    }

    // Customer segment recommendations
    if (historialStats.customerSegments.empresarial > historialStats.customerSegments.individual) {
      recommendations.push(
        "El 67% de tus ventas son B2B. Adapta tu script para enfatizar beneficios corporativos y descuentos por volumen.",
      )
    }

    // Call duration analysis
    recommendations.push(
      "Tu duración promedio de llamada es de 3:45 min. Las llamadas exitosas tienden a ser más largas - no tengas prisa por cerrar.",
    )

    return {
      scriptScore,
      scriptStrengths,
      scriptImprovements,
      recommendations,
      productRecommendations,
      historialStats,
      overallRating:
        scriptScore >= 80
          ? "Excelente"
          : scriptScore >= 60
            ? "Bueno"
            : scriptScore >= 40
              ? "Regular"
              : "Necesita mejoras",
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-blue-600"
    if (score >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  const getRatingBadge = (rating: string) => {
    const colors = {
      Excelente: "bg-green-100 text-green-800",
      Bueno: "bg-blue-100 text-blue-800",
      Regular: "bg-yellow-100 text-yellow-800",
      "Necesita mejoras": "bg-red-100 text-red-800",
    }
    return colors[rating as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  if (isAnalyzing) {
    return (
      <div className="p-4 h-full flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-semibold mb-2">Analizando tu rendimiento...</h3>
          <p className="text-gray-600">La IA está evaluando tu historial y script personalizado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 h-full overflow-y-auto space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Feedback IA</h2>

      {feedback && (
        <>
          {/* Performance Overview */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Resumen de Rendimiento
                </CardTitle>
                <Badge className={getRatingBadge(feedback.overallRating)}>{feedback.overallRating}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{feedback.historialStats.conversionRate}%</div>
                  <p className="text-sm text-gray-600">Tasa de Conversión</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{feedback.historialStats.totalCalls}</div>
                  <p className="text-sm text-gray-600">Total Llamadas</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="font-bold text-green-700">{feedback.historialStats.ganadas}</div>
                  <div className="text-green-600">Ganadas</div>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded">
                  <div className="font-bold text-yellow-700">{feedback.historialStats.calificadas}</div>
                  <div className="text-yellow-600">Calificadas</div>
                </div>
                <div className="text-center p-2 bg-red-50 rounded">
                  <div className="font-bold text-red-700">{feedback.historialStats.perdidas}</div>
                  <div className="text-red-600">Perdidas</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Script Analysis */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                Análisis del Script
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className={`text-3xl font-bold ${getScoreColor(feedback.scriptScore)}`}>
                  {feedback.scriptScore}/100
                </div>
                <p className="text-sm text-gray-600 mt-1">Puntuación del Script</p>
              </div>

              {feedback.scriptStrengths.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-green-700 mb-2">Fortalezas del Script:</h4>
                  <ul className="space-y-1">
                    {feedback.scriptStrengths.map((strength: string, index: number) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {feedback.scriptImprovements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">Mejoras Sugeridas:</h4>
                  <ul className="space-y-1">
                    {feedback.scriptImprovements.map((improvement: string, index: number) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-orange-600">•</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Recommendations */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
                <TrendingUp className="h-5 w-5" />
                Recomendaciones de Rendimiento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {feedback.recommendations.map((recommendation: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Product Recommendations */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                <ShoppingBag className="h-5 w-5" />
                Recomendaciones de Productos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Productos con Mejor Rendimiento:</h4>
                <div className="flex flex-wrap gap-2">
                  {feedback.historialStats.topProducts.map((product: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              <ul className="space-y-3">
                {feedback.productRecommendations.map((recommendation: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Customer Insights */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Insights de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">
                    {feedback.historialStats.customerSegments.empresarial}
                  </div>
                  <p className="text-sm text-blue-700">Clientes B2B</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">
                    {feedback.historialStats.customerSegments.individual}
                  </div>
                  <p className="text-sm text-purple-700">Clientes B2C</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Duración promedio de llamada:{" "}
                <span className="font-semibold">{feedback.historialStats.avgCallDuration}</span>
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
