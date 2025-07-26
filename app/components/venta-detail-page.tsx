"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Building, Mail, Phone, Package, CreditCard, Clock, TrendingUp } from "lucide-react"

interface VentaDetailPageProps {
  item: any
  onBack: () => void
}

export default function VentaDetailPage({ item, onBack }: VentaDetailPageProps) {
  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">Detalle de Venta</h2>
      </div>

      <div className="space-y-4">
        {/* Cliente Information */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Información del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Nombre:</span>
                <p className="font-semibold">
                  {item.cliente.nombre} {item.cliente.apellido}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Cargo:</span>
                <p>{item.cliente.cargo}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Building className="h-4 w-4" />
              <span>{item.cliente.empresa}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{item.cliente.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span className="text-sm">{item.cliente.telefono}</span>
            </div>
          </CardContent>
        </Card>

        {/* Producto Information */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-green-600" />
              Producto Vendido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{item.producto.nombre}</h3>
                <p className="text-sm text-gray-600">{item.producto.descripcion}</p>
              </div>
              <Badge variant="outline">{item.producto.categoria}</Badge>
            </div>
            <div className="text-sm text-gray-500">Código: {item.producto.codigo}</div>
          </CardContent>
        </Card>

        {/* Venta Details */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
              Detalles de la Venta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monto:</span>
              <span className="text-2xl font-bold text-green-600">
                ${item.venta.monto} {item.venta.moneda}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Comisión:</span>
              <span className="font-semibold text-blue-600">${item.venta.comision}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Método de pago:</span>
              <span>{item.venta.metodo_pago}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estado:</span>
              <Badge
                variant={item.venta.estado === "Completada" ? "default" : "secondary"}
                className={item.venta.estado === "Completada" ? "bg-green-100 text-green-800" : ""}
              >
                {item.venta.estado}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Fecha y hora:</span>
              <span>
                {item.venta.fecha} • {item.venta.hora}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Call Information */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Información de la Llamada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Duración:</span>
              <span className="font-semibold">{item.llamada.duracion}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Intentos:</span>
              <span>{item.llamada.intentos}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Resultado:</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {item.llamada.resultado}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Métricas de Rendimiento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tasa de conversión:</span>
              <span className="font-semibold text-green-600">{item.llamada.intentos === 1 ? "100%" : "50%"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Valor por minuto:</span>
              <span className="font-semibold">
                ${(item.venta.monto / Number.parseFloat(item.llamada.duracion.replace(":", "."))).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
