import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  RotateCcw, 
  Heart,
  Brain,
  Clock,
  CheckCircle,
  X,
  Play
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockFlashcards = [
  {
    id: 1,
    front: "こんにちは",
    back: "Hello / Good afternoon",
    reading: "konnichiwa",
    level: "N5",
    category: "Greetings",
    mastered: false,
    interval: 1,
    nextReview: "2024-01-21"
  },
  {
    id: 2,
    front: "ありがとう",
    back: "Thank you",
    reading: "arigatou",
    level: "N5", 
    category: "Greetings",
    mastered: false,
    interval: 2,
    nextReview: "2024-01-22"
  },
  {
    id: 3,
    front: "学校",
    back: "School",
    reading: "gakkou",
    level: "N5",
    category: "Places",
    mastered: true,
    interval: 7,
    nextReview: "2024-01-28"
  },
  {
    id: 4,
    front: "食べる",
    back: "To eat",
    reading: "taberu",
    level: "N5",
    category: "Verbs",
    mastered: false,
    interval: 1,
    nextReview: "2024-01-21"
  },
  {
    id: 5,
    front: "友達",
    back: "Friend",
    reading: "tomodachi",
    level: "N5",
    category: "People",
    mastered: false,
    interval: 3,
    nextReview: "2024-01-24"
  }
];

const studyStats = {
  todayReviews: 12,
  totalCards: 156,
  masteredCards: 47,
  streakDays: 8,
  accuracy: 87
};

export default function Flashcards() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<'review' | 'learn'>('review');
  const [showResult, setShowResult] = useState(false);

  const currentCard = mockFlashcards[currentCardIndex];
  const dueCards = mockFlashcards.filter(card => !card.mastered);
  const progress = ((currentCardIndex + 1) / mockFlashcards.length) * 100;

  const handleAnswer = (difficulty: 'again' | 'hard' | 'good' | 'easy') => {
    setShowResult(true);
    setTimeout(() => {
      if (currentCardIndex < mockFlashcards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
        setShowResult(false);
      } else {
        // Session complete
        setCurrentCardIndex(0);
        setIsFlipped(false);
        setShowResult(false);
      }
    }, 1000);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentCardIndex < mockFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
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
          <Brain className="h-10 w-10 text-primary" />
          Flashcards
        </h1>
        <p className="text-muted-foreground text-lg">
          Master Japanese vocabulary with spaced repetition
        </p>
      </motion.div>

      {/* Study Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{studyStats.todayReviews}</div>
            <div className="text-sm text-muted-foreground">Today's Reviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{dueCards.length}</div>
            <div className="text-sm text-muted-foreground">Cards Due</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{studyStats.masteredCards}</div>
            <div className="text-sm text-muted-foreground">Mastered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">{studyStats.streakDays}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{studyStats.accuracy}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Main Study Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Study Progress</span>
                <span className="text-sm text-muted-foreground">
                  {currentCardIndex + 1} / {mockFlashcards.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {/* Flashcard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-lg h-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentCardIndex}-${isFlipped}`}
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -180, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Card 
                    className="h-full cursor-pointer hover:shadow-lg transition-shadow border-2"
                    onClick={flipCard}
                  >
                    <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
                      {!isFlipped ? (
                        <>
                          <div className="text-4xl md:text-6xl font-bold mb-4 text-primary">
                            {currentCard.front}
                          </div>
                          <div className="text-lg text-muted-foreground mb-4">
                            {currentCard.reading}
                          </div>
                          <Badge variant="outline" className="mb-4">
                            {currentCard.category} • {currentCard.level}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            Click to reveal answer
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="text-2xl md:text-4xl font-bold mb-4">
                            {currentCard.back}
                          </div>
                          <div className="text-xl text-primary mb-4">
                            {currentCard.front}
                          </div>
                          <div className="text-lg text-muted-foreground mb-4">
                            {currentCard.reading}
                          </div>
                          <Badge 
                            variant={currentCard.mastered ? "default" : "secondary"}
                            className="mb-4"
                          >
                            {currentCard.mastered ? "Mastered" : "Learning"}
                          </Badge>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Answer Buttons */}
          {isFlipped && !showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-2"
            >
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleAnswer('again')}
                className="flex-1 max-w-24"
              >
                <X className="h-4 w-4 mr-1" />
                Again
              </Button>
              <Button
                variant="outline"
                size="sm" 
                onClick={() => handleAnswer('hard')}
                className="flex-1 max-w-24"
              >
                Hard
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAnswer('good')}
                className="flex-1 max-w-24"
              >
                Good
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleAnswer('easy')}
                className="flex-1 max-w-24"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Easy
              </Button>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevCard}
              disabled={currentCardIndex === 0}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={flipCard}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Flip
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextCard}
              disabled={currentCardIndex === mockFlashcards.length - 1}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Study Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Study Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant={studyMode === 'review' ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setStudyMode('review')}
              >
                Review Due Cards ({dueCards.length})
              </Button>
              <Button
                variant={studyMode === 'learn' ? 'default' : 'outline'}
                className="w-full"
                onClick={() => setStudyMode('learn')}
              >
                Learn New Cards
              </Button>
            </CardContent>
          </Card>

          {/* Deck Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Deck Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Total Cards</span>
                <span className="font-medium">{studyStats.totalCards}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Mastered</span>
                <span className="font-medium text-green-500">{studyStats.masteredCards}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Learning</span>
                <span className="font-medium text-yellow-500">
                  {studyStats.totalCards - studyStats.masteredCards}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Due Today</span>
                <span className="font-medium text-red-500">{dueCards.length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Morning Review</div>
                  <div className="text-sm text-muted-foreground">2 hours ago</div>
                </div>
                <Badge variant="outline">92%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">New Vocabulary</div>
                  <div className="text-sm text-muted-foreground">Yesterday</div>
                </div>
                <Badge variant="outline">15 cards</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Grammar Practice</div>
                  <div className="text-sm text-muted-foreground">2 days ago</div>
                </div>
                <Badge variant="outline">87%</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}