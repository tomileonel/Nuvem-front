"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react"

export default function FeedbackPage() {
  const [script, setScript] = useState("")
  const [feedback, setFeedback] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    // Get the script from localStorage (simulating getting it from personalization page)
    const savedScript =
      localStorage.getItem("nuvem-script") ||
      "Hola, mi nombre es [NOMBRE] y estoy llamando de Nuvem. ¿Tiene unos minutos para hablar sobre nuestros servicios?"
    setScript(savedScript)
    generateFeedback(savedScript)
  }, [])

  const generateFeedback = (scriptText: string) => {
    setIsAnalyzing(true)

    // Simulate AI analysis delay
    setTimeout(() => {
      const analysis = analyzeScript(scriptText)
      setFeedback(analysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const analyzeScript = (scriptText: string) => {
    // AI-like analysis of the script
    const wordCount = scriptText.split(" ").length
    const hasPersonalization = scriptText.includes("[NOMBRE]")
    const hasCompanyName = scriptText.toLowerCase().includes("nuvem")
    const hasQuestion = scriptText.includes("?")
    const isPolite = scriptText.toLowerCase().includes("hola") || scriptText.toLowerCase().includes("buenos")

    let score = 0
    const strengths = []
    const improvements = []
    const suggestions = []

    // Analyze personalization
    if (hasPersonalization) {
      score += 20
      strengths.push("Incluye personalización con el nombre del cliente")
    } else {
      improvements.push("Agregar personalización con [NOMBRE] para mayor conexión")
    }

    // Analyze company branding
    if (hasCompanyName) {
      score += 15
      strengths.push("Menciona claramente el nombre de la empresa")
    } else {
      improvements.push("Incluir el nombre de la empresa para mayor credibilidad")
    }

    // Analyze engagement
    if (hasQuestion) {
      score += 20
      strengths.push("Incluye pregunta para generar engagement")
    } else {
      improvements.push("Agregar una pregunta para involucrar al cliente")
    }

    // Analyze politeness
    if (isPolite) {
      score += 15
      strengths.push("Tono cortés y profesional")
    } else {
      improvements.push("Comenzar con un saludo más cordial")
    }

    // Analyze length
    if (wordCount >= 15 && wordCount <= 30) {
      score += 15
      strengths.push("Longitud apropiada para mantener atención")
    } else if (wordCount < 15) {
      improvements.push("El script podría ser más detallado")
    } else {
      improvements.push("Considerar acortar el mensaje para mayor impacto")
    }

    // Generate suggestions based on analysis
    if (score < 50) {
      suggestions.push("Reestructurar el mensaje para mayor claridad")
      suggestions.push("Practicar el tono de voz antes de las llamadas")
    } else if (score < 75) {
      suggestions.push("Agregar un beneficio clave del servicio")
      suggestions.push("Incluir una llamada a la acción más específica")
    } else {
      suggestions.push("Excelente script, considera variaciones para diferentes tipos de cliente")
      suggestions.push("Mantener el tono natural durante la llamada")
    }

    return {
      score,
      strengths,
      improvements,
      suggestions,
      wordCount,
      rating: score >= 80 ? "Excelente" : score >= 60 ? "Bueno" : score >= 40 ? "Regular" : "Necesita mejoras",
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
          <h3 className="text-lg font-semibold mb-2">Analizando tu script...</h3>
          <p className="text-gray-600">La IA está evaluando tu mensaje personalizado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 h-full overflow-y-auto space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Feedback IA</h2>

      {feedback && (
        <>
          {/* Score Overview */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  Análisis de tu Script
                </CardTitle>
                <Badge className={getRatingBadge(feedback.rating)}>{feedback.rating}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className={`text-4xl font-bold ${getScoreColor(feedback.score)}`}>{feedback.score}/100</div>
                <p className="text-sm text-gray-600 mt-1">{feedback.wordCount} palabras • Análisis completado</p>
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          {feedback.strengths.length > 0 && (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  Fortalezas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feedback.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Improvements */}
          {feedback.improvements.length > 0 && (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-orange-700">
                  <AlertTriangle className="h-5 w-5" />
                  Áreas de Mejora
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feedback.improvements.map((improvement: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Suggestions */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
                <Lightbulb className="h-5 w-5" />
                Sugerencias IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feedback.suggestions.map((suggestion: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Current Script */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Tu Script Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 italic">"{script}"</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
