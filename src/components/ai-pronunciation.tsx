import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Play,
  Pause,
  Volume2,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Star,
  Brain
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PronunciationWord {
  word: string;
  reading: string;
  meaning: string;
  audioUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface PronunciationResult {
  word: string;
  accuracy: number;
  feedback: string;
  suggestions: string[];
  score: number;
}

interface AIPronunciationProps {
  words: PronunciationWord[];
  onComplete?: (results: PronunciationResult[]) => void;
}

export function AIPronunciation({ words, onComplete }: AIPronunciationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [results, setResults] = useState<PronunciationResult[]>([]);
  const [currentResult, setCurrentResult] = useState<PronunciationResult | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentWord = words[currentWordIndex];

  // Initialize speech synthesis voices
  useEffect(() => {
    const initVoices = () => {
      if ('speechSynthesis' in window) {
        // Wait for voices to be loaded
        if (speechSynthesis.getVoices().length > 0) {
          setVoicesLoaded(true);
        } else {
          speechSynthesis.onvoiceschanged = () => {
            setVoicesLoaded(true);
          };
        }
      }
    };

    initVoices();
  }, []);

  // Mock AI pronunciation analysis (in real app, this would call an AI service)
  const analyzePronunciation = async (audioBlob: Blob, word: string): Promise<PronunciationResult> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock accuracy based on word difficulty
    const difficulties = { easy: 0.9, medium: 0.8, hard: 0.7 };
    const baseAccuracy = difficulties[word.difficulty];
    const accuracy = baseAccuracy + (Math.random() * 0.2 - 0.1); // Add some randomness
    
    const feedback = accuracy > 0.8 
      ? "Excellent pronunciation! You're getting the hang of this."
      : accuracy > 0.6
      ? "Good effort! Try to focus on the vowel sounds."
      : "Keep practicing! Pay attention to the pitch accent.";
    
    const suggestions = [
      "Listen to the native audio again",
      "Practice the word slowly",
      "Focus on the rhythm and timing"
    ];
    
    return {
      word: word.word,
      accuracy: Math.round(accuracy * 100),
      feedback,
      suggestions,
      score: Math.round(accuracy * 100)
    };
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const result = await analyzePronunciation(audioBlob, currentWord);
        setCurrentResult(result);
        setShowFeedback(true);
        setResults(prev => [...prev, result]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      // Ensure audio is loaded
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Add error handling for audio playback
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error('Error playing audio:', error);
              // Create a fallback audio if the file doesn't exist
              createFallbackAudio();
            });
        }
      }
    }
  };

  // Create actual pronunciation using text-to-speech instead of beep
  const createFallbackAudio = () => {
    try {
      // Use Web Speech API for text-to-speech
      if ('speechSynthesis' in window && voicesLoaded) {
        const utterance = new SpeechSynthesisUtterance(currentWord.word);
        
        // Set Japanese voice if available
        const voices = speechSynthesis.getVoices();
        const japaneseVoice = voices.find(voice => 
          voice.lang.includes('ja') || voice.lang.includes('jp')
        );
        
        if (japaneseVoice) {
          utterance.voice = japaneseVoice;
          utterance.lang = 'ja-JP';
        } else {
          // Fallback to English pronunciation
          utterance.lang = 'en-US';
          utterance.text = currentWord.reading; // Use romaji reading
        }
        
        utterance.rate = 0.8; // Slightly slower for clarity
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          setIsPlaying(false);
          // Fallback to alert
          alert(`Pronunciation: ${currentWord.reading} (${currentWord.meaning})`);
        };
        
        speechSynthesis.speak(utterance);
      } else if (!voicesLoaded) {
        // Wait for voices to load
        alert('Loading pronunciation voices... Please try again in a moment.');
        setIsPlaying(false);
      } else {
        // Fallback for browsers without speech synthesis
        alert(`Pronunciation: ${currentWord.reading} (${currentWord.meaning})`);
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Text-to-speech failed:', error);
      // Final fallback
      alert(`Pronunciation: ${currentWord.reading} (${currentWord.meaning})`);
      setIsPlaying(false);
    }
  };

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setShowFeedback(false);
      setCurrentResult(null);
    } else {
      // Practice complete
      onComplete?.(results);
    }
  };

  const retryWord = () => {
    setShowFeedback(false);
    setCurrentResult(null);
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return "text-green-600";
    if (accuracy >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getAccuracyBadge = (accuracy: number) => {
    if (accuracy >= 80) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (accuracy >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
    return <Badge className="bg-red-100 text-red-800">Needs Practice</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{currentWordIndex + 1} / {words.length}</span>
        </div>
        <Progress value={((currentWordIndex + 1) / words.length) * 100} className="h-2" />
      </div>

      {/* Current Word Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentWord.word}
          </CardTitle>
          <CardDescription className="text-lg">
            {currentWord.reading} • {currentWord.meaning}
          </CardDescription>
          <Badge variant="outline" className="mt-2">
            {currentWord.difficulty} difficulty
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Audio Controls */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={playAudio}
              className="flex items-center gap-2"
              disabled={!voicesLoaded}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
              {voicesLoaded ? "Listen to Native" : "Loading Voices..."}
            </Button>
            
            <Button
              variant={isRecording ? "destructive" : "default"}
              size="lg"
              onClick={isRecording ? stopRecording : startRecording}
              className="flex items-center gap-2"
            >
              {isRecording ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
          </div>

          {/* Voice Loading Status */}
          {!voicesLoaded && (
            <div className="text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                Loading pronunciation voices...
              </div>
            </div>
          )}

          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            src={currentWord.audioUrl}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Recording Status */}
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 text-red-600">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                Recording... Speak now!
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* AI Feedback */}
      <AnimatePresence>
        {showFeedback && currentResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <CardTitle>AI Pronunciation Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Accuracy Score */}
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-blue-600">
                    {currentResult.accuracy}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pronunciation Accuracy
                  </div>
                  {getAccuracyBadge(currentResult.accuracy)}
                </div>

                {/* Feedback */}
                <div className="space-y-2">
                  <h4 className="font-medium">AI Feedback:</h4>
                  <p className="text-muted-foreground">{currentResult.feedback}</p>
                </div>

                {/* Suggestions */}
                <div className="space-y-2">
                  <h4 className="font-medium">Suggestions:</h4>
                  <ul className="space-y-1">
                    {currentResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" onClick={retryWord} className="flex-1">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button onClick={nextWord} className="flex-1">
                    {currentWordIndex < words.length - 1 ? "Next Word" : "Complete Practice"}
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Practice Results</CardTitle>
            <CardDescription>
              Your pronunciation accuracy for completed words
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      result.accuracy >= 80 ? 'bg-green-100 text-green-800' :
                      result.accuracy >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {result.accuracy}%
                    </div>
                    <div>
                      <div className="font-medium">{result.word}</div>
                      <div className="text-sm text-muted-foreground">
                        {result.accuracy >= 80 ? 'Excellent' : 
                         result.accuracy >= 60 ? 'Good' : 'Needs Practice'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Word {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
