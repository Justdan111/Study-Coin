import { CreateQuestionDialog } from "./component/createQuestion"
import { QuestionCard } from "./component/questionCard"
import { Leaderboard } from "./component/leadership"
import { LeaderboardUser, Question } from "./types"
import DesktopTitlebar from "../../components/header"

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "1",
    title: "How do you solve quadratic equations using the quadratic formula?",
    subject: "Mathematics",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      role: "student",
      points: 150,
    },
    tags: ["algebra", "equations", "mathematics"],
    stats: {
      views: 1234,
      answers: 5,
      votes: 23,
    },
    createdAt: "2 hours ago",
    solved: true,
  },
  {
    id: "2",
    title: "What's the difference between mitosis and meiosis?",
    subject: "Biology",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg",
      role: "student",
      points: 89,
    },
    tags: ["cell-division", "biology", "genetics"],
    stats: {
      views: 892,
      answers: 3,
      votes: 15,
    },
    createdAt: "5 hours ago",
    solved: false,
  },
]

const SAMPLE_LEADERBOARD: LeaderboardUser[] = [
  {
    id: "1",
    name: "Dr. Emily Parker",
    avatar: "/placeholder.svg",
    role: "teacher",
    points: 1250,
    questionsAnswered: 145,
    helpfulVotes: 892,
    rank: 1,
  },
  {
    id: "2",
    name: "Michael Wong",
    avatar: "/placeholder.svg",
    role: "student",
    points: 980,
    questionsAnswered: 89,
    helpfulVotes: 567,
    rank: 2,
  },
  {
    id: "3",
    name: "Lisa Thompson",
    avatar: "/placeholder.svg",
    role: "student",
    points: 875,
    questionsAnswered: 76,
    helpfulVotes: 445,
    rank: 3,
  },
]

export default function CommunityPage() {
  return (
    <div>
      <DesktopTitlebar pageTitle={"Our Community"} />
      <div className="w-full flex flex-row px-4 py-8 gap-8">
        <div className="w-full">
          <div className="mb-8 flex items-center gap-4">
            <CreateQuestionDialog />
          </div>
          <div className="">
            <div className="space-y-4 w-full">
              {SAMPLE_QUESTIONS.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <Leaderboard initialUsers={SAMPLE_LEADERBOARD} />
        </div>
      </div>
    </div>
  )
}

