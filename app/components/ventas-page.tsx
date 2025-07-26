"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Calendar, User } from "lucide-react"

interface VentasPageProps {
  onSelectVenta: (venta: any) => void
}

export default function VentasPage({ onSelectVenta }: VentasPageProps) {
  const ventas = [
    {
      id: 1,
      cliente: {
        nombre: "María",
        apellido: "González",
        email: "maria.gonzalez@email.com",
        telefono: "+1 (555) 123-4567",
        empresa: "Tech Solutions SA",
        cargo: "Gerente de IT",
      },
      producto: {
        nombre: "Plan Premium",
        codigo: "PREM-001",
        categoria: "Software",
        descripcion: "Plan completo con todas las funcionalidades",
      },
      venta: {
        monto: 299.99,
        moneda: "USD",
        fecha: "2024-01-26",
        hora: "14:30",
        metodo_pago: "Tarjeta de crédito",
        estado: "Completada",
        comision: 29.99,
      },
      llamada: {
        duracion: "4:32",
        intentos: 1,
        resultado: "Venta exitosa",
      },
    },
    {
      id: 2,
      cliente: {
        nombre: "Carlos",
        apellido: "Rodríguez",
        email: "carlos.rodriguez@empresa.com",
        telefono: "+1 (555) 234-5678",
        empresa: "Marketing Pro",
        cargo: "Director Comercial",
      },
      producto: {
        nombre: "Plan Básico",
        codigo: "BAS-001",
        categoria: "Software",
        descripcion: "Plan inicial con funcionalidades esenciales",
      },
      venta: {
        monto: 99.99,
        moneda: "USD",
        fecha: "2024-01-26",
        hora: "13:15",
        metodo_pago: "Transferencia bancaria",
        estado: "Completada",
        comision: 9.99,
      },
      llamada: {
        duracion: "3:45",
        intentos: 2,
        resultado: "Venta exitosa",
      },
    },
    {
      id: 3,
      cliente: {
        nombre: "Ana",
        apellido: "Martínez",
        email: "ana.martinez@corporativo.com",
        telefono: "+1 (555) 345-6789",
        empresa: "Corporativo Internacional",
        cargo: "CEO",
      },
      producto: {
        nombre: "Plan Empresarial",
        codigo: "EMP-001",
        categoria: "Software",
        descripcion: "Plan corporativo con funcionalidades avanzadas",
      },
      venta: {
        monto: 599.99,
        moneda: "USD",
        fecha: "2024-01-25",
        hora: "16:20",
        metodo_pago: "Facturación empresarial",
        estado: "Pendiente",
        comision: 59.99,
      },
      llamada: {
        duracion: "6:15",
        intentos: 1,
        resultado: "Venta pendiente",
      },
    },
  ]

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ventas</h2>

      <div className="space-y-4">
        {ventas.map((venta) => (
          <Card
            key={venta.id}
            className="border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectVenta(venta)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  {venta.cliente.nombre} {venta.cliente.apellido}
                </CardTitle>
                <Badge
                  variant={venta.venta.estado === "Completada" ? "default" : "secondary"}
                  className={venta.venta.estado === "Completada" ? "bg-green-100 text-green-800" : ""}
                >
                  {venta.venta.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-medium">{venta.producto.nombre}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{venta.venta.fecha}</span>
                  </div>
                  <div className="text-xl font-bold text-green-600">${venta.venta.monto}</div>
                </div>
                <div className="text-sm text-gray-500">
                  {venta.cliente.empresa} • {venta.llamada.duracion}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
