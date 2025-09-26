import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Edit, 
  Trophy, 
  Target, 
  Flame, 
  Calendar,
  BookOpen,
  Brain,
  Star,
  Award,
  TrendingUp,
  Clock,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { mockBadges } from "@/lib/mock-data";

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
          <Button asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const userBadges = mockBadges.filter(badge => user.badges.includes(badge.id));
  const unlockedBadges = userBadges.length;
  const totalBadges = mockBadges.length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <Avatar className="h-32 w-32 mx-auto">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-0 right-0 h-10 w-10 rounded-full"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Badge variant="secondary" className="text-sm">
                {user.currentLevel.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Member since {new Date(user.joinedAt).toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{user.xp}</div>
              <div className="text-sm text-muted-foreground">XP Points</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-500 flex items-center justify-center gap-1">
                <Flame className="h-6 w-6" />
                {user.streak}
              </div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-500">{unlockedBadges}</div>
              <div className="text-sm text-muted-foreground">Badges</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-500">15</div>
              <div className="text-sm text-muted-foreground">Lessons</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Current Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Current Progress
              </CardTitle>
              <CardDescription>
                Your learning journey through the JLPT levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">N5 - Beginner</span>
                  <span className="text-sm text-muted-foreground">68%</span>
                </div>
                <Progress value={68} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  15 of 45 lessons completed
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">N4 - Elementary</span>
                  <span className="text-sm text-muted-foreground">0%</span>
                </div>
                <Progress value={0} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  0 of 60 lessons completed
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest learning achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Completed Basic Greetings</div>
                    <div className="text-sm text-muted-foreground">2 hours ago • +50 XP</div>
                  </div>
                  <Badge variant="secondary">95%</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Hiragana Quiz</div>
                    <div className="text-sm text-muted-foreground">1 day ago • +35 XP</div>
                  </div>
                  <Badge variant="secondary">88%</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">N5 Vocabulary Review</div>
                    <div className="text-sm text-muted-foreground">2 days ago • +25 XP</div>
                  </div>
                  <Badge variant="secondary">92%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Learning Statistics
              </CardTitle>
              <CardDescription>
                Your study patterns and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">12h 45m</div>
                  <div className="text-sm text-muted-foreground">Total Study Time</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-500">92%</div>
                  <div className="text-sm text-muted-foreground">Average Accuracy</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">128</div>
                  <div className="text-sm text-muted-foreground">Words Learned</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-500">8</div>
                  <div className="text-sm text-muted-foreground">Lessons This Week</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Badges ({unlockedBadges}/{totalBadges})
              </CardTitle>
              <CardDescription>
                Your earned achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {userBadges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="text-2xl">{badge.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium">{badge.name}</div>
                    <div className="text-sm text-muted-foreground">{badge.description}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {badge.rarity}
                  </Badge>
                </div>
              ))}
              
              {unlockedBadges < totalBadges && (
                <div className="text-center p-4 border-2 border-dashed rounded-lg">
                  <div className="text-sm text-muted-foreground">
                    {totalBadges - unlockedBadges} more badges to unlock
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    View All Badges
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/dashboard">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Continue Learning
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/flashcards">
                  <Brain className="h-4 w-4 mr-2" />
                  Practice Flashcards
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/settings">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
