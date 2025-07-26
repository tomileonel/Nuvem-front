"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Phone, MessageCircle } from "lucide-react"

interface HistorialPageProps {
  onSelectItem: (item: any) => void
}

export default function HistorialPage({ onSelectItem }: HistorialPageProps) {
  // Remove the selectedItem state and Dialog imports
  // Update the historial data to include more detailed transcription info

  const historial = [
    {
      id: 1,
      tipo: "Llamada",
      cliente: "María González",
      fecha: "2024-01-26 14:30",
      duracion: "4:32",
      resultado: "Venta exitosa",
      descripcion:
        "Cliente interesado en el plan premium. Se realizó la venta después de explicar los beneficios del servicio.",
      icon: Phone,
      transcripcion: `[14:30:15] Agente: Hola, buenos días. Mi nombre es Juan y estoy llamando de Nuvem. ¿Hablo con María González?

[14:30:22] Cliente: Sí, soy yo. ¿De qué se trata?

[14:30:25] Agente: Perfecto María. Le llamo porque hemos identificado que su empresa podría beneficiarse mucho de nuestros servicios de gestión en la nube. ¿Tiene unos minutos para que le explique?

[14:30:35] Cliente: Bueno, sí, pero que sea rápido porque estoy en una reunión en 10 minutos.

[14:30:40] Agente: Por supuesto, seré muy conciso. Nuvem ofrece soluciones de almacenamiento y gestión en la nube que pueden reducir sus costos de IT hasta en un 40%. ¿Actualmente qué sistema utilizan para el almacenamiento de datos?

[14:31:00] Cliente: Tenemos servidores propios, pero la verdad es que nos están dando muchos problemas últimamente.

[14:31:08] Agente: Entiendo perfectamente. Esos problemas son muy comunes con infraestructura propia. Con nuestro Plan Premium, tendría acceso 24/7, backup automático, y soporte técnico especializado. Además, no tendría que preocuparse más por mantenimiento de hardware.

[14:31:30] Cliente: Suena interesante. ¿Cuál sería el costo?

[14:31:35] Agente: El Plan Premium tiene un costo de $299.99 mensuales, pero considerando que eliminaría los costos de mantenimiento y el tiempo perdido por fallas, la inversión se recupera rápidamente.

[14:32:00] Cliente: Hmm, necesito pensarlo...

[14:32:05] Agente: María, entiendo su preocupación. Déjeme ofrecerle algo: si decide proceder hoy, puedo incluir 3 meses de soporte premium sin costo adicional. Esto le daría tiempo para ver los beneficios sin riesgo.

[14:32:25] Cliente: ¿Y si no funciona para nosotros?

[14:32:28] Agente: Tenemos una garantía de satisfacción de 30 días. Si no está completamente satisfecha, cancelamos sin penalización.

[14:32:40] Cliente: Está bien, me convenciste. ¿Cómo procedemos?

[14:32:45] Agente: Excelente decisión María. Voy a enviarle el contrato por email ahora mismo...

[14:34:47] Agente: Perfecto, todo está listo. Recibirá las credenciales de acceso en las próximas 24 horas. ¿Alguna pregunta más?

[14:34:55] Cliente: No, todo claro. Gracias.

[14:34:58] Agente: Gracias a usted María. Que tenga un excelente día.`,
    },
    {
      id: 2,
      tipo: "Seguimiento",
      cliente: "Carlos Rodríguez",
      fecha: "2024-01-26 13:15",
      duracion: "2:45",
      resultado: "Reagendar",
      descripcion:
        "Cliente necesita más tiempo para decidir. Se acordó llamar nuevamente la próxima semana. Mostró interés en el plan básico.",
      icon: MessageCircle,
      transcripcion: `[13:15:00] Agente: Buenas tardes, Carlos. Soy Laura de Nuvem, llamando para hacer seguimiento a nuestra conversación anterior sobre soluciones en la nube. ¿Cómo estás hoy?

[13:15:08] Cliente: Hola Laura, bien, gracias. He estado bastante ocupado, pero sí recuerdo nuestra charla.

[13:15:12] Agente: Entiendo. ¿Has tenido la oportunidad de considerar nuestras propuestas de planes?

[13:15:18] Cliente: Sí, las revisé, pero aún tengo algunas dudas sobre la implementación y los costos a largo plazo.

[13:15:25] Agente: Comprendo. ¿Qué inquietudes específicas tienes en mente?

[13:15:30] Cliente: Principalmente, me preocupa la migración de nuestros datos actuales a la nube y cómo afectará la operatividad diaria de la empresa.

[13:15:40] Agente: Es una excelente pregunta. Contamos con un equipo especializado en migración que se encargará de transferir tus datos de forma segura y eficiente, minimizando cualquier interrupción. Además, ofrecemos capacitación para tu personal para asegurar una transición sin problemas.

[13:15:55] Cliente: Suena bien, pero ¿cuál sería el costo total de la migración y la capacitación?

[13:16:02] Agente: Para darte una cifra exacta, necesitaría evaluar el volumen de datos y la complejidad de tu infraestructura actual. ¿Podríamos programar una breve llamada para discutir los detalles y ofrecerte un presupuesto personalizado?

[13:16:15] Cliente: Prefiero tener una idea aproximada antes de comprometerme con otra llamada.

[13:16:20] Agente: Entiendo. En general, la migración y la capacitación suelen representar entre el 10% y el 15% del costo anual del plan que elijas. Sin embargo, esto puede variar.

[13:16:35] Cliente: Hmm, es algo que debo considerar. ¿Podrías enviarme un resumen detallado de los planes y los servicios de migración por correo electrónico?

[13:16:45] Agente: Por supuesto, Carlos. Te enviaré toda la información hoy mismo. ¿Hay alguna otra pregunta que pueda responder ahora?

[13:16:55] Cliente: No, creo que eso es todo por ahora. Gracias por tu tiempo, Laura.

[13:17:00] Agente: A ti, Carlos. Espero que la información te sea útil. Estaré atenta a tu respuesta. ¡Que tengas un buen día!

[13:17:05] Cliente: Igualmente. Adiós.
`,
    },
    {
      id: 3,
      tipo: "Llamada",
      cliente: "Ana Martínez",
      fecha: "2024-01-26 11:20",
      duracion: "6:15",
      resultado: "Venta exitosa",
      descripcion:
        "Empresa interesada en el plan empresarial. Se discutieron las características específicas para su negocio. Venta confirmada.",
      icon: Phone,
      transcripcion: `[11:20:05] Agente: Buenos días, hablo con Ana Martínez? Mi nombre es Roberto de Nuvem.

[11:20:10] Cliente: Sí, buenos días Roberto. ¿En qué puedo ayudarle?

[11:20:15] Agente: Le llamo porque en Nuvem tenemos soluciones de gestión en la nube diseñadas especialmente para empresas como la suya. Entendemos que la eficiencia y la seguridad son cruciales.

[11:20:25] Cliente: Nos interesa mucho mejorar nuestra eficiencia, sobre todo en el manejo de datos.

[11:20:30] Agente: Exacto. Nuestro Plan Empresarial ofrece almacenamiento ilimitado, copias de seguridad automáticas y acceso prioritario a soporte técnico. Además, integramos herramientas de análisis de datos para optimizar sus procesos.

[11:20:45] Cliente: Suena muy completo. ¿Cómo se compara con otras opciones en el mercado?

[11:20:50] Agente: A diferencia de otras soluciones, Nuvem se adapta completamente a las necesidades de su empresa. Ofrecemos personalización total y un equipo de expertos dedicados a su cuenta.

[11:21:00] Cliente: ¿Y en cuanto a la seguridad? Es una de nuestras mayores preocupaciones.

[11:21:05] Agente: La seguridad es nuestra prioridad. Contamos con encriptación de última generación y protocolos de seguridad que cumplen con los estándares más exigentes. Sus datos estarán protegidos en todo momento.

[11:21:20] Cliente: Me gusta lo que oigo. ¿Podría enviarme una propuesta detallada con los costos y las características del Plan Empresarial?

[11:21:30] Agente: Por supuesto, Ana. Le enviaré la propuesta hoy mismo. Además, me gustaría invitarla a una demostración personalizada para que vea cómo Nuvem puede transformar su empresa.

[11:21:45] Cliente: Me parece excelente. ¿Cuándo podría ser la demostración?

[11:21:50] Agente: ¿Qué le parece el próximo martes a las 10 de la mañana?

[11:21:55] Cliente: Perfecto, agendado.

[11:22:00] Agente: Maravilloso. Le confirmo la cita por correo electrónico. Gracias por su tiempo, Ana.

[11:22:05] Cliente: Gracias a usted, Roberto. Estaré esperando su correo.

[11:22:10] Agente: Que tenga un excelente día.
`,
    },
    {
      id: 4,
      tipo: "Llamada",
      cliente: "Luis Fernández",
      fecha: "2024-01-25 16:45",
      duracion: "3:20",
      resultado: "No interesado",
      descripcion: "Cliente no está interesado en el momento. Se mantendrá en la base de datos para futuras campañas.",
      icon: Phone,
      transcripcion: `[16:45:10] Agente: Buenas tardes, ¿hablo con Luis Fernández? Mi nombre es Carolina de Nuvem.

[16:45:15] Cliente: Sí, con él habla. ¿Qué necesita?

[16:45:20] Agente: Le llamo para presentarle nuestras soluciones de gestión en la nube. En Nuvem, ofrecemos planes que se adaptan a las necesidades de cada cliente, optimizando sus recursos y mejorando la eficiencia.

[16:45:35] Cliente: La verdad es que no estoy interesado. Ya tenemos un sistema que funciona bien para nosotros.

[16:45:40] Agente: Entiendo. ¿Podría saber qué sistema utilizan actualmente?

[16:45:45] Cliente: Tenemos servidores propios y un software que desarrollamos internamente.

[16:45:50] Agente: Comprendo. Sin embargo, me gustaría comentarle que Nuvem ofrece ventajas adicionales, como copias de seguridad automáticas, seguridad de última generación y soporte técnico 24/7.

[16:46:05] Cliente: Agradezco la información, pero estamos contentos con lo que tenemos. No estamos buscando cambiar nada en este momento.

[16:46:15] Agente: Entiendo perfectamente. ¿Podría permitirme enviarle información sobre nuestros servicios por correo electrónico para que la tenga a mano en caso de que cambie de opinión en el futuro?

[16:46:25] Cliente: No es necesario, gracias.

[16:46:30] Agente: De acuerdo. Respeto su decisión. Si en algún momento necesita una solución en la nube, no dude en contactarnos.

[16:46:40] Cliente: Está bien, gracias.

[16:46:45] Agente: Que tenga una buena tarde, Luis.

[16:46:50] Cliente: Igualmente. Adiós.
`,
    },
    {
      id: 5,
      tipo: "Seguimiento",
      cliente: "Sofia López",
      fecha: "2024-01-25 15:30",
      duracion: "1:50",
      resultado: "Venta exitosa",
      descripcion:
        "Seguimiento exitoso de llamada anterior. Cliente decidió proceder con el plan básico. Proceso de venta completado.",
      icon: MessageCircle,
      transcripcion: `[15:30:05] Agente: Buenas tardes, Sofía. Soy Javier de Nuvem, llamando para dar seguimiento a nuestra conversación de la semana pasada sobre nuestros planes de gestión en la nube.

[15:30:15] Cliente: Ah, hola Javier. Sí, recuerdo. Estuve revisando la información que me enviaste.

[15:30:20] Agente: Excelente. ¿Tuviste alguna duda o pregunta adicional?

[15:30:25] Cliente: En realidad, sí. Estaba pensando en comenzar con el Plan Básico para probar el servicio.

[15:30:30] Agente: ¡Perfecto! El Plan Básico es una excelente opción para empezar. Incluye almacenamiento seguro, copias de seguridad automáticas y soporte técnico.

[15:30:40] Cliente: Me preocupa un poco la migración de mis datos actuales. ¿Cómo funciona eso?

[15:30:45] Agente: No te preocupes, nosotros nos encargamos de todo. Nuestro equipo técnico te guiará paso a paso y se asegurará de que todos tus datos se transfieran de forma segura y sin problemas.

[15:30:55] Cliente: Eso me tranquiliza. Entonces, ¿cómo procedemos?

[15:31:00] Agente: Para empezar, necesito algunos datos de tu empresa y los detalles de tu tarjeta de crédito para el pago. ¿Te parece bien si lo hacemos ahora?

[15:31:10] Cliente: Sí, está bien.

[15:31:15] Agente: Perfecto. Primero, necesito el nombre completo de tu empresa...

[15:32:50] Agente: Listo, Sofía. Ya tienes acceso a tu cuenta de Nuvem. Te enviaré un correo electrónico con las instrucciones para empezar a usar el servicio.

[15:32:55] Cliente: Genial, muchas gracias Javier.

[15:33:00] Agente: A ti, Sofía. Si tienes alguna pregunta, no dudes en contactarnos. ¡Que tengas un excelente día!

[15:33:05] Cliente: Igualmente. Adiós.
`,
    },
  ]

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Historial</h2>

      <div className="space-y-4">
        {historial.map((item) => {
          const IconComponent = item.icon
          return (
            <Card
              key={item.id}
              className="border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onSelectItem(item)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-blue-600" />
                    {item.cliente}
                  </CardTitle>
                  <span className="text-sm text-gray-500">{item.tipo}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{item.fecha}</span>
                    <span className="text-sm">• {item.duracion}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-800">{item.resultado}</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
