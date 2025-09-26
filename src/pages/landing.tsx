import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Brain, 
  Users, 
  Trophy, 
  Zap, 
  Target,
  Play,
  CheckCircle,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import heroImage from "@/assets/hero-image.jpg";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Lessons",
    description: "Learn with engaging content from N5 to N1 levels, with audio pronunciation and stroke practice."
  },
  {
    icon: Brain,
    title: "Smart Flashcards",
    description: "Spaced repetition system that adapts to your learning pace for maximum retention."
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Connect with fellow learners, ask questions, and share your progress."
  },
  {
    icon: Trophy,
    title: "Achievements & Badges",
    description: "Earn badges and climb the leaderboard as you master Japanese."
  },
  {
    icon: Zap,
    title: "AI Pronunciation",
    description: "Practice pronunciation with AI feedback to perfect your speaking skills."
  },
  {
    icon: Target,
    title: "Personalized Path",
    description: "Adaptive learning path that adjusts to your strengths and areas for improvement."
  }
];

const testimonials = [
  {
    name: "Sarah Kim",
    role: "Business Student",
            content: "AriGato made learning Japanese fun and addictive! I went from complete beginner to N4 level in 6 months.",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "Software Engineer",
    content: "The community features are amazing. Getting help from other learners made all the difference.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Language Enthusiast",
    content: "Best Japanese learning platform I've used. The pronunciation practice is incredibly helpful.",
    rating: 5
  }
];

const stats = [
  { label: "Active Learners", value: "50K+" },
  { label: "Lessons Completed", value: "2M+" },
  { label: "Success Rate", value: "94%" },
  { label: "Average Daily Streak", value: "28 days" }
];

export default function Landing() {
  const { user, isLoading } = useAuth();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle px-4 sm:px-6 py-16 sm:py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-8 lg:gap-16 items-center lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="space-y-4">
                <Badge className="inline-flex items-center gap-2 bg-primary-soft text-primary border-0 text-xs sm:text-sm">
                  <Zap className="h-3 w-3" />
                  New: AI Pronunciation Practice
                </Badge>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                  Master Japanese
                  <span className="bg-gradient-primary bg-clip-text text-transparent block">
                    with ZenMaster
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg">
                  Join thousands of learners on their journey from hiragana to fluency. 
                  Interactive lessons, smart flashcards, and a supportive community await.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg" asChild>
                  <Link to="/login">
                    Start Learning
                    <Play className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg" asChild>
                  <Link to="/levels">
                    Explore Levels
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8 pt-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="text-center"
                  >
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative order-first lg:order-last"
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Japanese learning platform"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20"></div>
              </div>
              
              {/* Floating Elements - Hidden on very small screens */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-card border shadow-lg rounded-lg sm:rounded-xl p-2 sm:p-4 hidden sm:block"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
                  <span className="text-xs sm:text-sm font-medium">Lesson Complete!</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">+50 XP earned</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-card border shadow-lg rounded-lg sm:rounded-xl p-2 sm:p-4 hidden sm:block"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-japanese-gold" />
                  <span className="text-xs sm:text-sm font-medium">7-Day Streak!</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Keep it up!</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12 sm:mb-16"
          >
            <Badge variant="outline" className="text-sm">Features</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold sm:text-4xl lg:text-5xl">
              Everything you need to
              <span className="bg-gradient-secondary bg-clip-text text-transparent"> succeed</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Our comprehensive platform provides all the tools and support you need 
              to master Japanese effectively.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12 sm:mb-16"
          >
            <Badge variant="outline" className="text-sm">Testimonials</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold sm:text-4xl">
              Loved by learners worldwide
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              See what our community has to say about their Japanese learning journey.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-japanese-gold text-japanese-gold" />
                      ))}
                    </div>
                    <blockquote className="text-lg mb-4">
                      "{testimonial.content}"
                    </blockquote>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-gradient-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold sm:text-4xl lg:text-5xl">
              Ready to start your Japanese journey?
            </h2>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto px-4">
              Join thousands of learners who have transformed their lives through Japanese with ZenMaster. 
              Sign in to continue or create a new account to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" variant="secondary" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg" asChild>
                <Link to="/login">
                  Sign In
                  <Play className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-transparent border-white text-white hover:bg-white hover:text-primary" 
                asChild
              >
                <Link to="/signup">
                  Create Account
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}