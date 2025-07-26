"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"

export default function PersonalizacionPage() {
  const [texto, setTexto] = useState(
    "Hola, mi nombre es [NOMBRE] y estoy llamando de Nuvem. ¿Tiene unos minutos para hablar sobre nuestros servicios?",
  )
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleConfirm = () => {
    setIsEditing(false)
    setShowConfirmation(true)
    // Save to localStorage so feedback page can access it
    localStorage.setItem("nuvem-script", texto)
    setTimeout(() => setShowConfirmation(false), 2000)
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personalización</h2>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Script de llamada</CardTitle>
          <p className="text-sm text-gray-600">Personaliza tu mensaje de introducción para las llamadas</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="script">Mensaje personalizado</Label>
            <Textarea
              id="script"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              disabled={!isEditing}
              className="min-h-[120px] resize-none"
              placeholder="Escribe tu mensaje personalizado aquí..."
            />
          </div>

          <div className="flex gap-2">
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
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">¡Cambios guardados exitosamente!</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Consejos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Usa [NOMBRE] para personalizar con el nombre del cliente</li>
            <li>• Mantén un tono amigable y profesional</li>
            <li>• Sé claro y conciso en tu mensaje</li>
            <li>• Practica tu script antes de las llamadas</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
