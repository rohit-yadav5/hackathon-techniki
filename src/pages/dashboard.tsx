import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Clock, 
  Flame,
  Play,
  ChevronRight,
  TrendingUp,
  Mic,
  Target
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";

const quickActions = [
  {
    title: "Continue Learning",
    description: "Pick up where you left off",
    icon: Play,
    href: "/lesson/lesson-1",
    variant: "default" as const
  },
  {
    title: "AI Pronunciation",
    description: "Practice with AI feedback",
    icon: Mic,
    href: "/ai-pronunciation",
    variant: "default" as const
  },
  {
    title: "Practice Flashcards",
    description: "Review today's vocabulary",
    icon: Brain,
    href: "/flashcards",
    variant: "outline" as const
  }
];

const recentActivity = [
  {
    type: "lesson",
    title: "Basic Greetings",
    time: "2 hours ago",
    score: 95,
    xp: 50
  },
  {
    type: "quiz",
    title: "Hiragana Quiz",
    time: "1 day ago",
    score: 88,
    xp: 35
  },
  {
    type: "flashcard",
    title: "N5 Vocabulary",
    time: "2 days ago",
    score: 92,
    xp: 25
  },
  {
    type: "lesson",
    title: "Introduction to Hiragana",
    time: "3 days ago",
    score: 89,
    xp: 45
  },
  {
    type: "quiz",
    title: "Katakana Practice",
    time: "4 days ago",
    score: 91,
    xp: 40
  },
  {
    type: "flashcard",
    title: "Numbers 1-20",
    time: "5 days ago",
    score: 96,
    xp: 30
  }
];

const achievements = [
  {
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "🎌",
    earned: true
  },
  {
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    earned: true
  },
  {
    title: "Quick Learner",
    description: "Score 90% or higher on 5 quizzes",
    icon: "⚡",
    earned: false,
    progress: 3
  }
];

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your dashboard</h1>
          <Button asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                Ready to continue your Japanese learning journey?
              </p>
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">{user.xp}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">XP Points</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-orange-500 flex items-center gap-1">
                  <Flame className="h-5 w-5 sm:h-6 sm:w-6" />
                  {user.streak}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Current Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-subtle border-0">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg sm:text-xl text-foreground">Current Level: N5 Beginner</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    You're making great progress! Keep it up.
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-base sm:text-lg px-3 sm:px-4 py-1 sm:py-2 self-start sm:self-auto">
                  N5
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-foreground">
                  <span>Progress to N4</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-3" />
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-primary">15</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Lessons Completed</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-secondary">128</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Words Learned</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-accent">12h</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Time Studied</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">Quick Actions</h2>
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <action.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-sm sm:text-base text-foreground">{action.title}</CardTitle>
                            <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                              {action.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button 
                          variant={action.variant} 
                          size="sm" 
                          className="w-full text-xs sm:text-sm" 
                          asChild
                        >
                          <Link to={action.href}>
                            Start
                            <ChevronRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">Recent Activity</h2>
              <Card>
                <CardContent className="p-0">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b last:border-b-0 gap-2 sm:gap-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-muted flex items-center justify-center">
                          {activity.type === 'lesson' && <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />}
                          {activity.type === 'quiz' && <Target className="h-4 w-4 sm:h-5 sm:w-5" />}
                          {activity.type === 'flashcard' && <Brain className="h-4 w-4 sm:h-5 sm:w-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm sm:text-base truncate">{activity.title}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">{activity.time}</div>
                        </div>
                      </div>
                      <div className="text-right sm:text-left">
                        <div className="font-medium text-primary text-sm sm:text-base">+{activity.xp} XP</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{activity.score}%</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Today's Goals */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                  Today's Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-foreground">
                    <span>Study for 30 minutes</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-foreground">
                    <span>Complete 1 lesson</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-foreground">
                    <span>Review 20 flashcards</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
                  <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`text-xl sm:text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium text-sm sm:text-base ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {achievement.title}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {achievement.description}
                      </div>
                      {!achievement.earned && achievement.progress && (
                        <div className="mt-1">
                          <Progress value={(achievement.progress / 5) * 100} className="h-1" />
                          <div className="text-xs text-muted-foreground mt-1">
                            {achievement.progress}/5
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-foreground">Lessons completed</span>
                  <span className="font-medium text-foreground">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-foreground">XP earned</span>
                  <span className="font-medium text-foreground">420</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-foreground">Study time</span>
                  <span className="font-medium text-foreground">4h 32m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-foreground">Accuracy</span>
                  <span className="font-medium text-foreground">92%</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}