import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Clock, 
  Play,
  Pause,
  Volume2,
  RotateCcw,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Brain,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

const mockLesson = {
  id: "lesson-1",
  title: "Introduction to Hiragana",
  level: "N5",
  difficulty: "Beginner",
  estimatedTime: "30 min",
  progress: 0,
  content: `# Welcome to Japanese!

Hiragana (ひらがな) is one of the three writing systems in Japanese. It consists of 46 basic characters, each representing a sound.

## The Five Vowels
- あ (a) - like "ah"
- い (i) - like "ee"  
- う (u) - like "oo"
- え (e) - like "eh"
- お (o) - like "oh"

## Basic Consonants
Let's learn the first row of consonants with the 'a' vowel:
- か (ka) - like "kah"
- さ (sa) - like "sah"
- た (ta) - like "tah"
- な (na) - like "nah"
- は (ha) - like "hah"

## Practice
Try writing each character several times to build muscle memory. Remember, Japanese is written from top to bottom, left to right within each character.`,
  
  vocabulary: [
    { term: "ひらがな", reading: "ひらがな", meaning: "hiragana" },
    { term: "あ", reading: "あ", meaning: "a (vowel)" },
    { term: "い", reading: "い", meaning: "i (vowel)" },
    { term: "う", reading: "う", meaning: "u (vowel)" },
    { term: "え", reading: "え", meaning: "e (vowel)" },
    { term: "お", reading: "お", meaning: "o (vowel)" },
    { term: "か", reading: "か", meaning: "ka" },
    { term: "さ", reading: "さ", meaning: "sa" }
  ],
  
  audio: {
    url: "/audio/hiragana-intro.mp3",
    duration: "3:45"
  },
  
  // Section-specific audio files
  sectionAudio: [
    {
      title: "Introduction",
      url: "/audio/section-1-intro.mp3",
      duration: "1:20"
    },
    {
      title: "The Five Vowels",
      url: "/audio/section-2-vowels.mp3",
      duration: "2:15"
    },
    {
      title: "Basic Consonants",
      url: "/audio/section-3-consonants.mp3",
      duration: "2:30"
    },
    {
      title: "Practice",
      url: "/audio/section-4-practice.mp3",
      duration: "1:45"
    }
  ],
  
  relatedLessons: [
    { id: "lesson-2", title: "Basic Greetings", progress: 0 },
    { id: "lesson-3", title: "Hiragana: K and S sounds", progress: 0 },
    { id: "lesson-4", title: "Numbers 1-10", progress: 0 }
  ]
};

export default function LessonDetail() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [audioProgress, setAudioProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const sections = mockLesson.content.split('## ').filter(Boolean);
  const totalSections = sections.length;
  const progress = (completedSections.length / totalSections) * 100;

  const currentAudio = mockLesson.sectionAudio[currentSection];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setAudioProgress((audio.currentTime / audio.duration) * 100);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setAudioProgress(0);
    };

    const handleError = (error: Event) => {
      console.error('Audio error:', error);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Reload audio when section changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setCurrentTime(0);
      setAudioProgress(0);
      setIsPlaying(false);
    }
  }, [currentSection]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
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
  };

  // Create actual pronunciation using text-to-speech instead of beep
  const createFallbackAudio = () => {
    try {
      // Use Web Speech API for text-to-speech
      if ('speechSynthesis' in window) {
        const sectionTitle = sections[currentSection]?.split('\n')[0] || 'Introduction';
        const utterance = new SpeechSynthesisUtterance(sectionTitle);
        
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
          utterance.text = `Section ${currentSection + 1}: ${sectionTitle}`;
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
          alert(`Section ${currentSection + 1}: ${sectionTitle}`);
        };
        
        speechSynthesis.speak(utterance);
      } else {
        // Fallback for browsers without speech synthesis
        const sectionTitle = sections[currentSection]?.split('\n')[0] || 'Introduction';
        alert(`Section ${currentSection + 1}: ${sectionTitle}`);
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Text-to-speech failed:', error);
      // Final fallback
      const sectionTitle = sections[currentSection]?.split('\n')[0] || 'Introduction';
      alert(`Section ${currentSection + 1}: ${sectionTitle}`);
      setIsPlaying(false);
    }
  };

  const restartAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setAudioProgress(0);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const markSectionComplete = () => {
    if (!completedSections.includes(currentSection)) {
      setCompletedSections([...completedSections, currentSection]);
    }
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
      // Reset audio when moving to next section
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        setCurrentTime(0);
        setAudioProgress(0);
      }
    }
  };

  const nextSection = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
      // Reset audio when moving to next section
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        setCurrentTime(0);
        setAudioProgress(0);
      }
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      // Reset audio when moving to previous section
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        setCurrentTime(0);
        setAudioProgress(0);
      }
    }
  };

  const handleSectionChange = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    // Reset audio when changing sections
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setAudioProgress(0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentAudio?.url}
        preload="metadata"
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <Link 
          to="/levels/n5" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to N5 Lessons
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary">{mockLesson.level}</Badge>
              <Badge variant="outline">{mockLesson.difficulty}</Badge>
            </div>
            <h1 className="text-4xl font-bold">{mockLesson.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {mockLesson.estimatedTime}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {totalSections} sections
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/flashcards">
                <Brain className="h-4 w-4 mr-2" />
                Practice Flashcards
              </Link>
            </Button>
          </div>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Lesson Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSections.length} / {totalSections} sections completed
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Lesson Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    Section {currentSection + 1}: {sections[currentSection]?.split('\n')[0] || 'Introduction'}
                  </CardTitle>
                  {completedSections.includes(currentSection) && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap">
                  {currentSection === 0 ? mockLesson.content.split('## ')[0] : '## ' + sections[currentSection]}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Audio Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Section {currentSection + 1} Audio: {currentAudio?.title}
                </CardTitle>
                <CardDescription>
                  Listen to native pronunciation for this section
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAudio}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-muted rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full transition-all duration-100"
                        style={{ width: `${audioProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={restartAudio}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Audio file info */}
                <div className="mt-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-3 w-3" />
                    <span>Audio file: {currentAudio?.url}</span>
                  </div>
                  <div className="mt-1 text-xs">
                    {currentAudio?.url ? 
                      "Click play to listen to native pronunciation" : 
                      "Audio file not found - will play fallback sound"
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevSection}
              disabled={currentSection === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <Button onClick={markSectionComplete}>
              {completedSections.includes(currentSection) ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                "Mark Complete"
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={nextSection}
              disabled={currentSection === totalSections - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Vocabulary Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Vocabulary</CardTitle>
                <CardDescription>
                  Key terms introduced in this lesson
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {mockLesson.vocabulary.map((vocab, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-lg">{vocab.term}</div>
                        <div className="text-sm text-muted-foreground">{vocab.reading}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{vocab.meaning}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Section Navigation */}
          <Card>
            <CardHeader>
              <CardTitle>Lesson Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => handleSectionChange(index)}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    currentSection === index
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {completedSections.includes(index) ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2" />
                    )}
                    <span className="text-sm font-medium">
                      Section {index + 1}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 truncate">
                    {section.split('\n')[0] || 'Introduction'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {mockLesson.sectionAudio[index]?.duration}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Related Lessons */}
          <Card>
            <CardHeader>
              <CardTitle>Up Next</CardTitle>
              <CardDescription>
                Continue your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLesson.relatedLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  className="block p-3 border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{lesson.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Progress: {lesson.progress}%
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/flashcards">
                  <Brain className="h-4 w-4 mr-2" />
                  Add to Flashcards
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Star className="h-4 w-4 mr-2" />
                Bookmark Lesson
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}