import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Play,
  CheckCircle,
  ChevronLeft,
  Target,
  Brain,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import { useLevel } from "@/hooks/use-levels";
import { mockLessons } from "@/lib/mock-data";

export default function LevelDetail() {
  const { levelId } = useParams();
  const { data: level, isLoading } = useLevel(levelId || '');
  
  // Filter lessons for this level
  const levelLessons = mockLessons.filter(lesson => lesson.levelId === levelId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="h-8 bg-muted animate-pulse rounded-lg w-1/3" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!level) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Level not found</h1>
          <Button asChild>
            <Link to="/levels">Back to Levels</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <Link 
          to="/levels" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Levels
        </Link>
        
        <div className="text-center space-y-4">
          <Badge 
            variant="default"
            className="text-lg px-4 py-2"
            style={{ backgroundColor: level.color }}
          >
            {level.id.toUpperCase()}
          </Badge>
          <h1 className="text-4xl font-bold">{level.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {level.description}
          </p>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {level.lessonCount} lessons
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {level.estimatedHours}h estimated
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lessons Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {levelLessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Lesson {index + 1}</Badge>
                  <div className="h-6 w-6 rounded-full border-2" />
                </div>
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <CardDescription className="text-sm">
                  {lesson.content.split('\n')[0].replace('# ', '')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {lesson.estimatedMinutes} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {lesson.difficulty}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Vocabulary:</span> {lesson.vocabulary.length} words
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {lesson.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full" asChild>
                  <Link to={`/lesson/${lesson.id}`}>
                    <Play className="h-4 w-4 mr-2" />
                    Start Lesson
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <Card className="bg-gradient-subtle border-0">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Ready to start learning?</h2>
            <p className="text-muted-foreground mb-6">
              Begin with the first lesson and work your way through the {level.id.toUpperCase()} level.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link to={`/lesson/${levelLessons[0]?.id || 'lesson-1'}`}>
                  <Play className="h-4 w-4 mr-2" />
                  Start First Lesson
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/flashcards">
                  <Brain className="h-4 w-4 mr-2" />
                  Practice Flashcards
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
