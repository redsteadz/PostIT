// This is a mock authentication service that would be replaced with a real auth provider

interface User {
  id: string
  name: string
  email: string
}

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
  },
]

// Mock login function
export async function login(email: string, password: string): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    throw new Error("Invalid credentials")
  }

  // In a real app, this would set a session or token
  // For now, we'll just store in localStorage for demo purposes
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
    )
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}

// Mock logout function
export async function logout(): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would clear a session or token
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
}

// Get current user
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") {
    return null
  }

  const userJson = localStorage.getItem("user")
  if (!userJson) {
    return null
  }

  try {
    return JSON.parse(userJson) as User
  } catch {
    return null
  }
}
