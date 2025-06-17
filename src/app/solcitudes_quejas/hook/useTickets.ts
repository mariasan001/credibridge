import { useEffect, useState } from "react"
import { Ticket } from "../model/ticket.model"
import { fetchTicketsByStatus1 } from "../services/ticket.service"

export function useTickets(
  statusIds: number[] = [1, 2, 3],
  page: number = 0,
  size: number = 6
) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fetchTicketsByStatus1(statusIds, { page, size })
        if (isMounted) {
          setTickets(data.content)
        }
      } catch (error) {
        console.error("Error al obtener tickets:", error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [JSON.stringify(statusIds), page, size]) 

  return { tickets, loading }
}
