const API_BASE = 'http://localhost:8000'

export const getMessages = async () => {
  const response = await fetch(`${API_BASE}/messages`)
  if (!response.ok) throw new Error('Failed to fetch messages')
  return response.json()
}

export const getMessage = async (id) => {
  const response = await fetch(`${API_BASE}/messages/${id}`)
  if (!response.ok) throw new Error('Failed to fetch message')
  return response.json()
}

export const sendReply = async (messageId, replyText) => {
  const response = await fetch(`${API_BASE}/messages/${messageId}/reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ replyText }),
  })
  if (!response.ok) throw new Error('Failed to send reply')
  return response.json()
}

export const sendNewMessage = async (userId, messageBody) => {
  const response = await fetch(`${API_BASE}/messages/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, messageBody }),
  })
  if (!response.ok) throw new Error('Failed to send message')
  return response.json()
}