export interface Question {
  id: string
  title: string
  subject: string
  author: {
    name: string
    avatar: string
    role: "student" | "teacher"
    points: number
  }
  tags: string[]
  stats: {
    views: number
    answers: number
    votes: number
  }
  createdAt: string
  solved?: boolean
}

export interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  role: "student" | "teacher"
  points: number
  questionsAnswered: number
  helpfulVotes: number
  rank: number
}

