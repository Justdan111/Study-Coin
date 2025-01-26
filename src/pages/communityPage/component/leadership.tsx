import { useEffect, useState } from "react";
import { Trophy, Medal } from "lucide-react";
import { LeaderboardUser } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";

interface LeaderboardProps {
  initialUsers: LeaderboardUser[];
}

export function Leaderboard({ initialUsers }: LeaderboardProps) {
  const [users, setUsers] = useState<LeaderboardUser[]>(initialUsers);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate data change by shuffling the users array
      const shuffledUsers = [...users].sort(() => Math.random() - 0.5);
      setUsers(shuffledUsers);
    }, 3000);

    return () => clearInterval(interval); 
  }, [users]);

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-500" />
        <h2 className="text-lg font-semibold">Leaderboard</h2>
      </div>
      <div className="mt-4 space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center">
              {user.rank === 1 ? (
                <Medal className="h-6 w-6 text-yellow-500" />
              ) : user.rank === 2 ? (
                <Medal className="h-6 w-6 text-gray-400" />
              ) : user.rank === 3 ? (
                <Medal className="h-6 w-6 text-amber-700" />
              ) : (
                <span className="text-sm font-medium text-muted-foreground">{user.rank}</span>
              )}
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{user.name}</span>
                <Badge variant="outline" className="text-xs">
                  {user.role}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{user.points} points</span>
                <span>•</span>
                <span>{user.questionsAnswered} answers</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-blue-600">+{user.helpfulVotes}</span>
              <p className="text-xs text-muted-foreground">helpful votes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}