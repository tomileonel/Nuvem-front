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
        nombre: "Camiseta Premium Algodón",
        codigo: "CAM-PREM-001",
        categoria: "Ropa",
        descripcion: "Camiseta de algodón 100% orgánico con diseño exclusivo",
      },
      venta: {
        monto: 45.99,
        moneda: "USD",
        fecha: "2024-01-26",
        hora: "14:30",
        metodo_pago: "Tarjeta de crédito",
        estado: "Completada",
        comision: 4.6,
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
        nombre: "Jeans Clásicos Denim",
        codigo: "JEAN-CLA-001",
        categoria: "Ropa",
        descripcion: "Jeans de corte clásico en denim de alta calidad",
      },
      venta: {
        monto: 89.99,
        moneda: "USD",
        fecha: "2024-01-26",
        hora: "13:15",
        metodo_pago: "Transferencia bancaria",
        estado: "Completada",
        comision: 9.0,
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
        nombre: "Chaqueta Ejecutiva Lana",
        codigo: "CHAQ-EJEC-001",
        categoria: "Ropa Formal",
        descripcion: "Chaqueta ejecutiva en lana merino con forro de seda",
      },
      venta: {
        monto: 299.99,
        moneda: "USD",
        fecha: "2024-01-25",
        hora: "16:20",
        metodo_pago: "Facturación empresarial",
        estado: "Pendiente",
        comision: 30.0,
      },
      llamada: {
        duracion: "6:15",
        intentos: 1,
        resultado: "Venta pendiente",
      },
    },
    {
      id: 4,
      cliente: {
        nombre: "Luis",
        apellido: "Fernández",
        email: "luis.fernandez@startup.com",
        telefono: "+1 (555) 456-7890",
        empresa: "StartUp Innovadora",
        cargo: "CTO",
      },
      producto: {
        nombre: "Sudadera Casual Algodón",
        codigo: "SUD-CAS-001",
        categoria: "Ropa Casual",
        descripcion: "Sudadera con capucha en algodón suave y cómodo",
      },
      venta: {
        monto: 65.99,
        moneda: "USD",
        fecha: "2024-01-25",
        hora: "11:45",
        metodo_pago: "PayPal",
        estado: "Completada",
        comision: 6.6,
      },
      llamada: {
        duracion: "2:30",
        intentos: 1,
        resultado: "Venta exitosa",
      },
    },
    {
      id: 5,
      cliente: {
        nombre: "Sofia",
        apellido: "López",
        email: "sofia.lopez@boutique.com",
        telefono: "+1 (555) 567-8901",
        empresa: "Boutique Elegante",
        cargo: "Propietaria",
      },
      producto: {
        nombre: "Vestido Elegante Seda",
        codigo: "VEST-ELE-001",
        categoria: "Ropa Formal",
        descripcion: "Vestido de noche en seda natural con bordados artesanales",
      },
      venta: {
        monto: 189.99,
        moneda: "USD",
        fecha: "2024-01-24",
        hora: "15:30",
        metodo_pago: "Tarjeta de crédito",
        estado: "Completada",
        comision: 19.0,
      },
      llamada: {
        duracion: "1:50",
        intentos: 1,
        resultado: "Venta exitosa",
      },
    },
    {
      id: 6,
      cliente: {
        nombre: "Diego",
        apellido: "Morales",
        email: "diego.morales@fashion.com",
        telefono: "+1 (555) 678-9012",
        empresa: "Fashion Forward",
        cargo: "Buyer",
      },
      producto: {
        nombre: "Zapatos Deportivos Premium",
        codigo: "ZAP-DEP-001",
        categoria: "Calzado",
        descripción: "Zapatillas deportivas con tecnología de amortiguación avanzada",
      },
      venta: {
        monto: 129.99,
        moneda: "USD",
        fecha: "2024-01-24",
        hora: "09:20",
        metodo_pago: "Tarjeta de débito",
        estado: "Completada",
        comision: 13.0,
      },
      llamada: {
        duracion: "3:15",
        intentos: 1,
        resultado: "Venta exitosa",
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
