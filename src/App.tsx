
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Levels from "./pages/levels";
import LevelDetail from "./pages/levels/[id]";
import Leaderboard from "./pages/leaderboard";
import Community from "./pages/community";
import Login from "./pages/login";
import Signup from "./pages/signup";
import NotFound from "./pages/NotFound";
import Flashcards from "./pages/flashcards";
import LessonDetail from "./pages/lesson/[id]";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import AIPronunciation from "./pages/ai-pronunciation";
import ResponsiveTest from "./pages/responsive-test";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="lovable-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/levels" element={<Levels />} />
                  <Route path="/levels/:levelId" element={<LevelDetail />} />
                  <Route path="/ai-pronunciation" element={<AIPronunciation />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/lesson/:id" element={<LessonDetail />} />
                  <Route path="/flashcards" element={<Flashcards />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/responsive-test" element={<ResponsiveTest />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
