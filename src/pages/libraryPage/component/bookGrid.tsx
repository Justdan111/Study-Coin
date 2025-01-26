import BookItem from "./bookItem"
import {Book } from "../index"

interface BookGridProps {
  books: Book[]
}

export default function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3  gap-6">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  )
}

