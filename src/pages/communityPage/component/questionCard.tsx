
import { CheckCircle2, ArrowBigUp } from "lucide-react";
import { formatNumber } from "../../../utils";
import type { Question } from "../types";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";

interface QuestionCardProps {
  question: Question;
  
}

export function QuestionCard({ question,  }: QuestionCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/questions/${question.id}`); 
  };
  return (
    <div
      className="group rounded-lg border p-4 transition-colors hover:bg-accent cursor-pointer"
      onClick={handleClick} 
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={question.author.avatar} alt={question.author.name} />
            <AvatarFallback>{question.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{question.author.name}</span>
              <Badge variant="outline" className="ml-2">
                {question.author.role}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{question.createdAt}</p>
          </div>
        </div>
        {question.solved && (
          <Badge variant="default" className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Solved
          </Badge>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{question.title}</h3>
      <Badge variant="secondary" className="mt-2">
        {question.subject}
      </Badge>
      <div className="mt-4 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <ArrowBigUp className="h-4 w-4" />
          {formatNumber(question.stats.votes)}
        </span>
        <span>{formatNumber(question.stats.answers)} answers</span>
        <span>{formatNumber(question.stats.views)} views</span>
      </div>
    </div>
  );
}