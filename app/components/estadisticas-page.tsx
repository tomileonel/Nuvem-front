import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, CheckCircle, TrendingUp } from "lucide-react"

export default function EstadisticasPage() {
  const stats = [
    {
      title: "Tiempo de llamada promedio",
      value: "4:32 min",
      icon: Phone,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Completación de llamada",
      value: "87.5%",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Ventas",
      value: "142",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Estadísticas</h2>

      <div className="grid gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-0 shadow-md mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Resumen del día</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Llamadas realizadas</span>
              <span className="font-semibold">163</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Llamadas exitosas</span>
              <span className="font-semibold">142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tasa de conversión</span>
              <span className="font-semibold text-green-600">87.1%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
