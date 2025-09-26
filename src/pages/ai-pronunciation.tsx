import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mic, 
  Brain, 
  Target, 
  Trophy, 
  ArrowLeft,
  Play,
  Volume2,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import { AIPronunciation } from "@/components/ai-pronunciation";

// Mock pronunciation words for different levels
const pronunciationWords = {
  n5: [
    {
      word: "こんにちは",
      reading: "konnichiwa",
      meaning: "Hello / Good afternoon",
      audioUrl: "/audio/konnichiwa.mp3",
      difficulty: "easy" as const
    },
    {
      word: "ありがとう",
      reading: "arigatou",
      meaning: "Thank you",
      audioUrl: "/audio/arigatou.mp3",
      difficulty: "easy" as const
    },
    {
      word: "おはよう",
      reading: "ohayou",
      meaning: "Good morning",
      audioUrl: "/audio/ohayou.mp3",
      difficulty: "medium" as const
    },
    {
      word: "さようなら",
      reading: "sayounara",
      meaning: "Goodbye",
      audioUrl: "/audio/sayounara.mp3",
      difficulty: "medium" as const
    },
    {
      word: "お疲れ様",
      reading: "otsukaresama",
      meaning: "Good work / Thank you for your effort",
      audioUrl: "/audio/otsukaresama.mp3",
      difficulty: "hard" as const
    }
  ],
  n4: [
    {
      word: "頑張って",
      reading: "ganbatte",
      meaning: "Do your best / Good luck",
      audioUrl: "/audio/ganbatte.mp3",
      difficulty: "medium" as const
    },
    {
      word: "お疲れ様でした",
      reading: "otsukaresama deshita",
      meaning: "Thank you for your work (formal)",
      audioUrl: "/audio/otsukaresama-deshita.mp3",
      difficulty: "hard" as const
    },
    {
      word: "失礼します",
      reading: "shitsurei shimasu",
      meaning: "Excuse me / I'm sorry",
      audioUrl: "/audio/shitsurei-shimasu.mp3",
      difficulty: "hard" as const
    }
  ],
  n3: [
    {
      word: "お世話になっております",
      reading: "osewa ni natte orimasu",
      meaning: "Thank you for your continued support",
      audioUrl: "/audio/osewa-ni-natte-orimasu.mp3",
      difficulty: "hard" as const
    },
    {
      word: "よろしくお願いします",
      reading: "yoroshiku onegaishimasu",
      meaning: "Please treat me kindly / Nice to meet you",
      audioUrl: "/audio/yoroshiku-onegaishimasu.mp3",
      difficulty: "hard" as const
    }
  ]
};

export default function AIPronunciationPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("n5");
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceResults, setPracticeResults] = useState<any[]>([]);

  const handlePracticeComplete = (results: any[]) => {
    setPracticeResults(results);
    setIsPracticing(false);
  };

  const startPractice = () => {
    setIsPracticing(true);
    setPracticeResults([]);
  };

  const getLevelDescription = (level: string) => {
    switch (level) {
      case "n5": return "Basic greetings and common phrases";
      case "n4": return "Everyday expressions and polite language";
      case "n3": return "Business Japanese and formal expressions";
      default: return "";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "n5": return "bg-green-100 text-green-800";
      case "n4": return "bg-blue-100 text-blue-800";
      case "n3": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isPracticing) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setIsPracticing(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Practice Selection
          </Button>
          <div>
            <h1 className="text-3xl font-bold">AI Pronunciation Practice</h1>
            <p className="text-muted-foreground">
              {selectedLevel.toUpperCase()} Level • {pronunciationWords[selectedLevel as keyof typeof pronunciationWords].length} words
            </p>
          </div>
        </div>

        {/* AI Pronunciation Component */}
        <AIPronunciation
          words={pronunciationWords[selectedLevel as keyof typeof pronunciationWords]}
          onComplete={handlePracticeComplete}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold">AI Pronunciation Practice</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Perfect your Japanese pronunciation with AI-powered feedback. Practice speaking, 
          get instant analysis, and improve your accent with personalized suggestions.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-6 md:grid-cols-3"
      >
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Mic className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Voice Recording</h3>
            <p className="text-sm text-muted-foreground">
              Record your pronunciation and get instant AI analysis
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Brain className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">AI Feedback</h3>
            <p className="text-sm text-muted-foreground">
              Receive detailed feedback on accuracy and improvement tips
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Progress Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Monitor your improvement across different difficulty levels
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Practice Levels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Choose Your Practice Level</h2>
            <p className="text-muted-foreground">
              Start with N5 basics and work your way up to advanced expressions
            </p>
          </div>

          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="n5">N5 Basic</TabsTrigger>
            <TabsTrigger value="n4">N4 Intermediate</TabsTrigger>
            <TabsTrigger value="n3">N3 Advanced</TabsTrigger>
          </TabsList>

          {Object.entries(pronunciationWords).map(([level, words]) => (
            <TabsContent key={level} value={level} className="space-y-6">
              <div className="text-center space-y-4">
                <Badge className={`text-lg px-4 py-2 ${getLevelColor(level)}`}>
                  {level.toUpperCase()} Level
                </Badge>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {getLevelDescription(level)}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {words.map((word, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{index + 1}</Badge>
                        <Badge 
                          variant={word.difficulty === 'easy' ? 'default' : 
                                  word.difficulty === 'medium' ? 'secondary' : 'destructive'}
                        >
                          {word.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{word.word}</CardTitle>
                      <CardDescription className="text-sm">
                        {word.reading} • {word.meaning}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Volume2 className="h-4 w-4" />
                        Audio available
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  onClick={startPractice}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Mic className="h-5 w-5 mr-2" />
                  Start {level.toUpperCase()} Practice
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-8"
      >
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold">How AI Pronunciation Practice Works</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold">Choose Words</h3>
              <p className="text-sm text-muted-foreground">Select from N5, N4, or N3 level vocabulary</p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold">Listen & Record</h3>
              <p className="text-sm text-muted-foreground">Hear native pronunciation and record your voice</p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">Get instant feedback on accuracy and pronunciation</p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold">Improve</h3>
              <p className="text-sm text-muted-foreground">Practice with personalized suggestions and track progress</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center space-y-4"
      >
        <h2 className="text-2xl font-bold">Ready to improve your pronunciation?</h2>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link to="/flashcards">
              <Star className="h-4 w-4 mr-2" />
              Practice Flashcards
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
