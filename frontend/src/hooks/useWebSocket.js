import { useEffect, useRef, useState } from 'react'

export const useWebSocket = (url) => {
  const ws = useRef(null)
  const [lastMessage, setLastMessage] = useState(null)

  useEffect(() => {
    ws.current = new WebSocket(url)

    ws.current.onopen = () => console.log('WebSocket connected')
    ws.current.onmessage = (event) => {
      const parsed = JSON.parse(event.data)
      setLastMessage(parsed)
    }
    ws.current.onclose = () => console.log('WebSocket disconnected')
    ws.current.onerror = (error) => console.error('WebSocket error:', error)

    return () => ws.current?.close()
  }, [url])

  const sendMessage = (messageBody, userId) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const payload = { type: 'message', data: { userId, messageBody } }
      ws.current.send(JSON.stringify(payload))
    }
  }

  return { lastMessage, sendMessage }
}
