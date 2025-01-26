import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import type { LeaderboardUser } from "../types";

interface UserCardProps {
  user: LeaderboardUser;
  onClick?: () => void; 
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <Card
      className="transition-shadow hover:shadow-md cursor-pointer"
      onClick={onClick} 
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <Badge variant={user.role === "teacher" ? "default" : "secondary"}>
            {user.role}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Rank</p>
            <p className="font-medium">{user.rank}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Points</p>
            <p className="font-medium">{user.points}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Questions Answered</p>
            <p className="font-medium">{user.questionsAnswered}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Helpful Votes</p>
            <p className="font-medium">{user.helpfulVotes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}