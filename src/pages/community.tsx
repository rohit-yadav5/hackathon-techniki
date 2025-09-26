
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Search,
  Plus,
  TrendingUp,
  Clock,
  Users,
  Pin,
  Heart,
  MessageCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { NewThreadModal } from "@/components/new-thread-modal";

const mockThreads = [
  {
    id: '1',
    title: 'Help with particle を vs が usage',
    content: 'I\'m struggling to understand when to use を versus が particles. Can someone explain the difference with examples?',
    author: {
      name: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      level: 'N4'
    },
    category: 'Grammar',
    replies: 12,
    likes: 23,
    isPinned: false,
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    title: '📌 Welcome to the Community!',
    content: 'Welcome new learners! Please read the community guidelines and introduce yourself.',
    author: {
      name: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      level: 'Admin'
    },
    category: 'Announcements',
    replies: 45,
    likes: 89,
    isPinned: true,
    createdAt: '1 week ago'
  },
  {
    id: '3',
    title: 'Best kanji learning apps?',
    content: 'What apps do you recommend for learning kanji? I\'ve tried Anki but looking for alternatives.',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      level: 'N5'
    },
    category: 'Study Tips',
    replies: 28,
    likes: 34,
    isPinned: false,
    createdAt: '4 hours ago'
  },
  {
    id: '4',
    title: 'N3 study group - join us!',
    content: 'Looking for motivated learners to form an N3 study group. We meet weekly online.',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      level: 'N3'
    },
    category: 'Study Tips',
    replies: 15,
    likes: 27,
    isPinned: false,
    createdAt: '6 hours ago'
  },
  {
    id: '5',
    title: 'Keigo (honorific language) confusion',
    content: 'I understand the basics of keigo but struggle with when to use different levels. Any tips?',
    author: {
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      level: 'N2'
    },
    category: 'Grammar',
    replies: 22,
    likes: 41,
    isPinned: false,
    createdAt: '8 hours ago'
  },
  {
    id: '6',
    title: 'Japanese cultural etiquette tips',
    content: 'Planning to visit Japan soon. What cultural etiquette should I know beyond basic language?',
    author: {
      name: 'Lisa Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      level: 'N4'
    },
    category: 'Culture',
    replies: 18,
    likes: 32,
    isPinned: false,
    createdAt: '12 hours ago'
  }
];

const categories = [
  { name: 'All', count: 156 },
  { name: 'Grammar', count: 45 },
  { name: 'Vocabulary', count: 38 },
  { name: 'Study Tips', count: 35 },
  { name: 'Culture', count: 28 },
  { name: 'Practice', count: 22 },
  { name: 'Announcements', count: 8 }
];

export default function Community() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Users className="h-10 w-10 text-primary" />
            Community
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect with fellow Japanese learners
          </p>
        </div>
        <Button 
          className="self-start"
          onClick={() => setShowNewThreadModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Thread
        </Button>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      variant={selectedCategory === category.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.name)}
                      className="whitespace-nowrap"
                    >
                      {category.name}
                      <Badge variant="secondary" className="ml-2">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thread List */}
          <div className="space-y-4">
            {mockThreads.map((thread, index) => (
              <motion.div
                key={thread.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
                        <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {thread.isPinned && <Pin className="h-4 w-4 text-primary" />}
                              <Link 
                                to={`/community/thread/${thread.id}`}
                                className="text-lg font-semibold hover:text-primary transition-colors"
                              >
                                {thread.title}
                              </Link>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{thread.author.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {thread.author.level}
                              </Badge>
                              <span>•</span>
                              <Clock className="h-3 w-3" />
                              <span>{thread.createdAt}</span>
                              <span>•</span>
                              <Badge variant="secondary">{thread.category}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground line-clamp-2">
                          {thread.content}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{thread.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{thread.replies} replies</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
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
                Popular Today
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Link to="/community/thread/3" className="block hover:text-primary transition-colors">
                  <div className="text-sm font-medium line-clamp-2">
                    Best kanji learning apps?
                  </div>
                  <div className="text-xs text-muted-foreground">28 replies</div>
                </Link>
              </div>
              <div className="space-y-2">
                <Link to="/community/thread/4" className="block hover:text-primary transition-colors">
                  <div className="text-sm font-medium line-clamp-2">
                    N3 study group - join us!
                  </div>
                  <div className="text-xs text-muted-foreground">15 replies</div>
                </Link>
              </div>
              <div className="space-y-2">
                <Link to="/community/thread/1" className="block hover:text-primary transition-colors">
                  <div className="text-sm font-medium line-clamp-2">
                    Particle を vs が usage help
                  </div>
                  <div className="text-xs text-muted-foreground">12 replies</div>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Total Members</span>
                <span className="font-medium">3,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Today</span>
                <span className="font-medium">284</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Threads</span>
                <span className="font-medium">1,156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Answered Questions</span>
                <span className="font-medium">96%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">New This Week</span>
                <span className="font-medium">47</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <NewThreadModal 
        open={showNewThreadModal} 
        onOpenChange={setShowNewThreadModal} 
      />
    </div>
  );
}
