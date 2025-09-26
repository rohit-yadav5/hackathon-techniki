
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Star,
  CheckCircle,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";
import { useLevels } from "@/hooks/use-levels";

export default function Levels() {
  const { data: levels, isLoading } = useLevels();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Japanese Levels</h1>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
          Progress through the JLPT levels from N5 (beginner) to N1 (advanced). 
          Each level builds upon the previous one.
        </p>
      </motion.div>

      {/* Levels Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {levels?.map((level, index) => {
          const isUnlocked = level.id === 'n5' || index === 0; // Mock unlock logic
          const progress = level.id === 'n5' ? 68 : 0; // Mock progress
          
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full hover:shadow-lg transition-shadow ${!isUnlocked ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={isUnlocked ? "default" : "secondary"}
                      className="text-xs sm:text-sm lg:text-lg px-2 sm:px-3 py-1"
                    >
                      {level.id.toUpperCase()}
                    </Badge>
                    {isUnlocked ? (
                      progress > 0 ? (
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-500" />
                      ) : (
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-yellow-500" />
                      )
                    ) : (
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-muted-foreground" />
                    )}
                  </div>
                  <CardTitle className="text-base sm:text-lg lg:text-2xl">{level.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm lg:text-base">
                    {level.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                      {level.lessonCount} lessons
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      {level.estimatedHours}h
                    </div>
                  </div>
                  
                  {isUnlocked && progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                  
                  <Button 
                    className="w-full text-xs sm:text-sm lg:text-base h-9 sm:h-10" 
                    disabled={!isUnlocked}
                    asChild={isUnlocked}
                  >
                    {isUnlocked ? (
                      <Link to={progress > 0 ? "/dashboard" : `/levels/${level.id}`}>
                        {progress > 0 ? 'Continue' : 'Start Level'}
                      </Link>
                    ) : (
                      <span>Locked</span>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
