// Mock data for the dashboard

export interface Conversation {
  id: string
  customerPhone: string
  lastMessage: string
  time: string
  status: "bot" | "human"
}

export interface FAQ {
  id: string
  question: string
  answer: string
  hits: number
  dateAdded: string
}

export interface Lead {
  id: string
  customerPhone: string
  message: string
  date: string
  time: string
}

export interface DailySummary {
  id: string
  date: string
  messagesReceived: number
  automatedRate: number
  leads: number
  appointments: number
  unansweredMessages: number
}

export interface BusinessSettings {
  businessName: string
  assistantName: string
  ownerPhone: string
  schedule: {
    day: string
    isOpen: boolean
    openTime: string
    closeTime: string
  }[]
}

// Sample conversations
export const mockConversations: Conversation[] = [
  {
    id: "1",
    customerPhone: "+57 300 123 4567",
    lastMessage: "Hola, quisiera saber el precio del servicio",
    time: "Hace 5 min",
    status: "bot",
  },
  {
    id: "2",
    customerPhone: "+57 301 234 5678",
    lastMessage: "Necesito agendar una cita para manana",
    time: "Hace 12 min",
    status: "human",
  },
  {
    id: "3",
    customerPhone: "+57 302 345 6789",
    lastMessage: "Gracias por la informacion!",
    time: "Hace 25 min",
    status: "bot",
  },
  {
    id: "4",
    customerPhone: "+57 303 456 7890",
    lastMessage: "Cual es el horario de atencion?",
    time: "Hace 35 min",
    status: "bot",
  },
  {
    id: "5",
    customerPhone: "+57 304 567 8901",
    lastMessage: "Me pueden enviar la ubicacion?",
    time: "Hace 1 hora",
    status: "bot",
  },
  {
    id: "6",
    customerPhone: "+57 305 678 9012",
    lastMessage: "Tienen disponibilidad para hoy?",
    time: "Hace 1 hora",
    status: "human",
  },
  {
    id: "7",
    customerPhone: "+57 306 789 0123",
    lastMessage: "Perfecto, confirmo la cita",
    time: "Hace 2 horas",
    status: "bot",
  },
  {
    id: "8",
    customerPhone: "+57 307 890 1234",
    lastMessage: "Cuanto cuesta el tratamiento completo?",
    time: "Hace 2 horas",
    status: "bot",
  },
  {
    id: "9",
    customerPhone: "+57 308 901 2345",
    lastMessage: "Aceptan tarjeta de credito?",
    time: "Hace 3 horas",
    status: "bot",
  },
  {
    id: "10",
    customerPhone: "+57 309 012 3456",
    lastMessage: "Necesito reprogramar mi cita",
    time: "Hace 3 horas",
    status: "human",
  },
  {
    id: "11",
    customerPhone: "+57 310 123 4567",
    lastMessage: "Buenas tardes, tienen servicio a domicilio?",
    time: "Hace 4 horas",
    status: "bot",
  },
  {
    id: "12",
    customerPhone: "+57 311 234 5678",
    lastMessage: "Me interesa el paquete premium",
    time: "Hace 5 horas",
    status: "bot",
  },
]

// Sample FAQs
export const mockFAQs: FAQ[] = [
  {
    id: "1",
    question: "Cual es el horario de atencion?",
    answer:
      "Nuestro horario de atencion es de lunes a viernes de 8:00 AM a 6:00 PM, y sabados de 9:00 AM a 2:00 PM.",
    hits: 156,
    dateAdded: "2024-01-15",
  },
  {
    id: "2",
    question: "Cuales son los metodos de pago disponibles?",
    answer:
      "Aceptamos efectivo, tarjetas de credito/debito, Nequi, Daviplata y transferencias bancarias.",
    hits: 142,
    dateAdded: "2024-01-15",
  },
  {
    id: "3",
    question: "Donde estan ubicados?",
    answer:
      "Estamos ubicados en la Calle 85 #15-40, Local 201, Bogota. Cerca de la estacion de Transmilenio Heroes.",
    hits: 128,
    dateAdded: "2024-01-16",
  },
  {
    id: "4",
    question: "Ofrecen servicio a domicilio?",
    answer:
      "Si, ofrecemos servicio a domicilio con un costo adicional dependiendo de la zona. Consulte disponibilidad.",
    hits: 98,
    dateAdded: "2024-01-18",
  },
  {
    id: "5",
    question: "Como puedo agendar una cita?",
    answer:
      "Puede agendar su cita respondiendo a este chat con la fecha y hora de su preferencia, y le confirmaremos la disponibilidad.",
    hits: 187,
    dateAdded: "2024-01-20",
  },
  {
    id: "6",
    question: "Cuanto tiempo dura el servicio?",
    answer:
      "La duracion del servicio varia segun el tipo. Generalmente entre 30 minutos y 2 horas.",
    hits: 76,
    dateAdded: "2024-01-22",
  },
  {
    id: "7",
    question: "Tienen parqueadero?",
    answer:
      "Si, contamos con parqueadero gratuito para nuestros clientes durante su cita.",
    hits: 54,
    dateAdded: "2024-01-25",
  },
  {
    id: "8",
    question: "Puedo cancelar o reprogramar mi cita?",
    answer:
      "Si, puede cancelar o reprogramar su cita con al menos 24 horas de anticipacion sin costo adicional.",
    hits: 89,
    dateAdded: "2024-02-01",
  },
  {
    id: "9",
    question: "Ofrecen descuentos?",
    answer:
      "Tenemos promociones especiales para clientes frecuentes y paquetes con descuento. Pregunte por nuestras ofertas actuales.",
    hits: 112,
    dateAdded: "2024-02-05",
  },
  {
    id: "10",
    question: "Cual es el precio de los servicios?",
    answer:
      "Los precios varian segun el servicio. Puede consultar nuestra lista de precios completa en nuestra pagina web o solicitar informacion especifica.",
    hits: 203,
    dateAdded: "2024-02-10",
  },
  {
    id: "11",
    question: "Atienden sin cita previa?",
    answer:
      "Atendemos principalmente con cita previa para garantizar disponibilidad, pero puede consultar si hay espacio disponible.",
    hits: 67,
    dateAdded: "2024-02-15",
  },
  {
    id: "12",
    question: "Tienen garantia en sus servicios?",
    answer:
      "Si, todos nuestros servicios cuentan con garantia de satisfaccion. Si no queda satisfecho, trabajaremos para solucionarlo.",
    hits: 45,
    dateAdded: "2024-02-20",
  },
]

// Sample Leads
export const mockLeads: Lead[] = [
  {
    id: "1",
    customerPhone: "+57 300 111 2222",
    message: "Me interesa cotizar el servicio completo para mi empresa",
    date: "2024-03-15",
    time: "09:30",
  },
  {
    id: "2",
    customerPhone: "+57 301 222 3333",
    message: "Quisiera informacion sobre planes corporativos",
    date: "2024-03-15",
    time: "10:45",
  },
  {
    id: "3",
    customerPhone: "+57 302 333 4444",
    message: "Necesito agendar una reunion para discutir un proyecto grande",
    date: "2024-03-15",
    time: "14:20",
  },
  {
    id: "4",
    customerPhone: "+57 303 444 5555",
    message: "Estoy buscando un proveedor para servicios mensuales",
    date: "2024-03-14",
    time: "11:00",
  },
  {
    id: "5",
    customerPhone: "+57 304 555 6666",
    message: "Me recomendaron su servicio, como puedo empezar?",
    date: "2024-03-14",
    time: "16:30",
  },
  {
    id: "6",
    customerPhone: "+57 305 666 7777",
    message: "Tengo una empresa y necesito automatizar mis respuestas",
    date: "2024-03-13",
    time: "08:15",
  },
  {
    id: "7",
    customerPhone: "+57 306 777 8888",
    message: "Cual es el costo mensual del servicio premium?",
    date: "2024-03-13",
    time: "13:45",
  },
  {
    id: "8",
    customerPhone: "+57 307 888 9999",
    message: "Me gustaria una demostracion del producto",
    date: "2024-03-12",
    time: "10:00",
  },
  {
    id: "9",
    customerPhone: "+57 308 999 0000",
    message: "Tienen planes para startups?",
    date: "2024-03-12",
    time: "15:20",
  },
  {
    id: "10",
    customerPhone: "+57 309 000 1111",
    message: "Necesito integracion con mi sistema actual",
    date: "2024-03-11",
    time: "09:00",
  },
  {
    id: "11",
    customerPhone: "+57 310 111 2222",
    message: "Cuanto tiempo toma la implementacion?",
    date: "2024-03-11",
    time: "14:30",
  },
  {
    id: "12",
    customerPhone: "+57 311 222 3333",
    message: "Me interesa el plan empresarial",
    date: "2024-03-10",
    time: "11:45",
  },
]

// Sample Daily Summaries
export const mockDailySummaries: DailySummary[] = [
  {
    id: "1",
    date: "2024-03-15",
    messagesReceived: 127,
    automatedRate: 94,
    leads: 8,
    appointments: 12,
    unansweredMessages: 3,
  },
  {
    id: "2",
    date: "2024-03-14",
    messagesReceived: 98,
    automatedRate: 91,
    leads: 5,
    appointments: 9,
    unansweredMessages: 5,
  },
  {
    id: "3",
    date: "2024-03-13",
    messagesReceived: 145,
    automatedRate: 96,
    leads: 11,
    appointments: 15,
    unansweredMessages: 2,
  },
  {
    id: "4",
    date: "2024-03-12",
    messagesReceived: 112,
    automatedRate: 89,
    leads: 7,
    appointments: 10,
    unansweredMessages: 8,
  },
  {
    id: "5",
    date: "2024-03-11",
    messagesReceived: 89,
    automatedRate: 93,
    leads: 4,
    appointments: 7,
    unansweredMessages: 4,
  },
  {
    id: "6",
    date: "2024-03-10",
    messagesReceived: 76,
    automatedRate: 97,
    leads: 3,
    appointments: 5,
    unansweredMessages: 1,
  },
  {
    id: "7",
    date: "2024-03-09",
    messagesReceived: 134,
    automatedRate: 92,
    leads: 9,
    appointments: 14,
    unansweredMessages: 6,
  },
]

// Default Business Settings
export const defaultBusinessSettings: BusinessSettings = {
  businessName: "Mi Negocio",
  assistantName: "Asistente Virtual",
  ownerPhone: "+57 300 000 0000",
  schedule: [
    { day: "Lunes", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { day: "Martes", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { day: "Miercoles", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { day: "Jueves", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { day: "Viernes", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { day: "Sabado", isOpen: true, openTime: "09:00", closeTime: "14:00" },
    { day: "Domingo", isOpen: false, openTime: "09:00", closeTime: "14:00" },
  ],
}

// Stats for Overview
export const mockStats = {
  totalMessagesToday: 127,
  totalMessagesWeek: 687,
  totalMessagesMonth: 2845,
  automatedResponseRate: 94,
  newLeadsToday: 8,
  appointmentRequestsToday: 12,
}
