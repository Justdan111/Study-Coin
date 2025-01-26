
import { Link } from "react-router-dom";
import {Book } from "../index"

interface BookItemProps {
  book: Book;
}

export default function BookItem({ book }: BookItemProps) {
  return (
    <Link to={`/dashboard/book/${book.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img
          src={book.coverImage || "/placeholder.svg"}
          alt={`Cover of ${book.title}`}
          width={150}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-1 truncate">{book.title}</h2>
          <p className="text-sm text-blue-500">{book.author}</p>
        </div>
      </div>
    </Link>
  );
}