import DesktopTitlebar from "../../components/header"
import BookGrid from "./component/bookGrid"

export interface Book {
  id: string
  title: string
  author: string
  coverImage: string
  pdfUrl: string
}

const books: Book[] = [
  {
    id: "1",
    title: "Python",
    author: "Scott ",
    coverImage: "/images/python.webp?height=200&width=150",
    pdfUrl: "/books/great-gatsby.pdf",
  },
  {
    id: "2",
    title: "Quantum Physics",
    author: "Peter",
    coverImage: "/images/physics.png?height=200&width=150",
    pdfUrl: "/books/to-kill-a-mockingbird.pdf",
  },
  {
    id: "3",
    title: "Calculus",
    author: "George ",
    coverImage: "/images/calculus.jpg?height=200&width=150",
    pdfUrl: "/books/1984.pdf",
  },
  // Add more books as needed
]

export default function Library() {
  return (
    <div>
        <DesktopTitlebar pageTitle="My Library" />
    <div className="container mx-auto px-4 py-8">
      
      <BookGrid books={books} />
    </div>
    </div>
  )
}

