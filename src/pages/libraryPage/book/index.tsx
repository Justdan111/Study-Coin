import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BookPage() {
  const { id } = useParams(); 
  const [book, setBook] = useState<{ title: string; pdfUrl: string } | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the book data from an API
    // For this example, we'll use mock data
    const mockBook = {
      title: "Sample Book",
      pdfUrl: "/sample-book.pdf",
    };
    setBook(mockBook);
  }, []);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
      <iframe
        src={`${book.pdfUrl}#toolbar=0`}
        className="w-full h-screen"
        title={`PDF viewer for ${book.title}`}
      />
    </div>
  );
}