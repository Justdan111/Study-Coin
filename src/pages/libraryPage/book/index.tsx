import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DesktopTitlebar from "../../../components/header";

export default function BookPage() {
  useParams(); 
  const [book, setBook] = useState<{ title: string; pdfUrl: string } | null>(null);

  useEffect(() => {
    
    
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
    <div>
      <DesktopTitlebar pageTitle="My Library" />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
      <iframe
        src={`${book.pdfUrl}#toolbar=0`}
        className="w-full h-screen"
        title={`PDF viewer for ${book.title}`}
      />
    </div>
    </div>
  );
}