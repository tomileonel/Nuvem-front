"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Globe } from "lucide-react"

export default function PersonalizacionPage() {
  const [texto, setTexto] = useState(
    "Actúa como un agente de ventas profesional y amigable. Mantén un tono cordial pero persuasivo. Escucha activamente las necesidades del cliente y adapta tu discurso en consecuencia. Sé paciente con las objeciones y siempre ofrece soluciones. Tu objetivo es generar confianza y cerrar la venta de manera natural.",
  )
  const [storeUrl, setStoreUrl] = useState("https://mi-tienda.com")
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleConfirm = () => {
    setIsEditing(false)
    setShowConfirmation(true)
    // Save to localStorage so feedback page can access it
    localStorage.setItem("nuvem-script", texto)
    localStorage.setItem("nuvem-store-url", storeUrl)
    setTimeout(() => setShowConfirmation(false), 2000)
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personalización</h2>

      <Card className="border-0 shadow-md mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Comportamiento del Agente</CardTitle>
          <p className="text-sm text-gray-600">Define cómo quieres que actúe tu agente durante las llamadas</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="script">Instrucciones de comportamiento</Label>
            <Textarea
              id="script"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              disabled={!isEditing}
              className="min-h-[120px] resize-none"
              placeholder="Describe cómo quieres que se comporte tu agente..."
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md mb-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Configuración de Tienda
          </CardTitle>
          <p className="text-sm text-gray-600">URL de tu tienda o sitio web</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-url">URL de tu tienda</Label>
            <Input
              id="store-url"
              type="url"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              disabled={!isEditing}
              placeholder="https://mi-tienda.com"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 mb-4">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex-1">
            Editar
          </Button>
        ) : (
          <>
            <Button onClick={handleConfirm} className="flex-1">
              Confirmar
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
              Cancelar
            </Button>
          </>
        )}
      </div>

      {showConfirmation && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg mb-4">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">¡Cambios guardados exitosamente!</span>
        </div>
      )}

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Consejos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Define un tono específico (formal, casual, amigable)</li>
            <li>• Incluye instrucciones sobre manejo de objeciones</li>
            <li>• Especifica el nivel de persistencia deseado</li>
            <li>• Menciona valores clave de tu empresa</li>
            <li>• Asegúrate de que la URL sea accesible</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
