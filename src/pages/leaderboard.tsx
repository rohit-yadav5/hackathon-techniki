
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Crown,
  Medal,
  TrendingUp,
  Calendar,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

const mockLeaderboard = [
  {
    id: '1',
    name: 'Yuki Tanaka',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    xp: 15420,
    level: 'N3',
    streak: 45,
    rank: 1
  },
  {
    id: '2',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    xp: 14890,
    level: 'N3',
    streak: 32,
    rank: 2
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    xp: 13750,
    level: 'N4',
    streak: 28,
    rank: 3
  },
  {
    id: '4',
    name: 'David Park',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    xp: 12980,
    level: 'N4',
    streak: 22,
    rank: 4
  },
  {
    id: '5',
    name: 'Lisa Chen',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    xp: 12340,
    level: 'N4',
    streak: 18,
    rank: 5
  },
  {
    id: '6',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    xp: 11850,
    level: 'N5',
    streak: 15,
    rank: 6
  },
  {
    id: '7',
    name: 'Sarah Kim',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
    xp: 11420,
    level: 'N5',
    streak: 12,
    rank: 7
  },
  {
    id: '8',
    name: 'Tom Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    xp: 10980,
    level: 'N5',
    streak: 8,
    rank: 8
  }
];

const timeFilters = [
  { label: 'All Time', value: 'all' },
  { label: 'This Month', value: 'month' },
  { label: 'This Week', value: 'week' }
];

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState('all');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
          <Trophy className="h-10 w-10 text-yellow-500" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground text-lg">
          See how you rank among fellow Japanese learners
        </p>
      </motion.div>

      {/* Time Filters */}
      <div className="flex justify-center">
        <div className="flex bg-muted rounded-lg p-1">
          {timeFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={timeFilter === filter.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeFilter(filter.value)}
              className="rounded-md"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Main Leaderboard */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Top Learners
              </CardTitle>
              <CardDescription>
                Rankings based on XP points earned
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {mockLeaderboard.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 flex justify-center">
                      {getRankIcon(user.rank)}
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.level} • {user.streak} day streak
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {user.xp.toLocaleString()} XP
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Level {user.level}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Ranking
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-primary">#18</div>
              <div className="text-muted-foreground">Out of 3,247 learners</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Your XP</span>
                  <span className="font-medium">1,250</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Next Rank</span>
                  <span className="font-medium">+130 XP</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Leaders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLeaderboard.slice(0, 3).map((user, index) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div className="w-6 text-center">
                    {getRankIcon(index + 1)}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{user.name}</div>
                    <div className="text-xs text-muted-foreground">+{Math.floor(user.xp * 0.1)} XP</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
