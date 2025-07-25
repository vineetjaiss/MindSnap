import { Button } from './ui/button.tsx'
import { Card } from './ui/card.tsx'
import { Brain, Sparkles, Camera, MessageSquare, Star, Trophy, Target, Zap, Cpu, Database, Globe } from 'lucide-react'
import { motion } from 'motion/react'
import { Progress } from './ui/progress.tsx'
import { Badge } from './ui/badge.tsx'

type Page = 'home' | 'chat' | 'upload' | 'signin' | 'signup'

interface HomePageProps {
  onNavigate: (page: Page) => void
  isAuthenticated: boolean
  userProgress: {
    questionsAsked: number
    imagesAnalyzed: number
    level: number
    points: number
  }
}

export function HomePage({ onNavigate, isAuthenticated, userProgress }: HomePageProps) {
  const achievements = [
    { name: 'First Neural Link', icon: MessageSquare, unlocked: userProgress.questionsAsked >= 1, description: 'Establish first AI connection' },
    { name: 'Visual Scanner', icon: Camera, unlocked: userProgress.imagesAnalyzed >= 1, description: 'Analyze digital imagery' },
    { name: 'Mind Hacker', icon: Brain, unlocked: userProgress.questionsAsked >= 5, description: 'Process 5 neural queries' },
    { name: 'Level Ascension', icon: Trophy, unlocked: userProgress.level >= 2, description: 'Transcend to level 2' },
  ]

  const currentLevelProgress = (userProgress.points % 100)

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="inline-flex items-center gap-3 mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.div 
            className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
            animate={{ 
              rotate: [0, 5, -5, 0],
              boxShadow: [
                '0 0 20px rgba(139, 92, 246, 0.3)',
                '0 0 30px rgba(139, 92, 246, 0.5)',
                '0 0 20px rgba(139, 92, 246, 0.3)'
              ]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Brain className="w-7 h-7 text-white" />
            
            {/* Neural network lines */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
          
          <div className="text-left">
            <h1 className="text-4xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
              MindSnap
            </h1>
            <div className="text-xs text-cyan-300 font-mono opacity-70">
              v2.0.77 // Neural Interface
            </div>
          </div>
        </motion.div>
        <motion.p 
          className="text-slate-300 text-lg font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          AI that explains everything like you're 5! 🚀
        </motion.p>
        <motion.div
          className="mt-2 text-sm text-cyan-400 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          [ NEURAL LEARNING PROTOCOL ACTIVE ]
        </motion.div>
      </motion.div>

      {/* User Progress Section */}
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6 bg-slate-900/60 border border-cyan-400/30 backdrop-blur-sm relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, cyan 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
                animate={{ x: [0, 20], y: [0, 20] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                  <h3 className="text-xl text-cyan-300 font-mono">Neural Level {userProgress.level}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-emerald-300 font-mono">{userProgress.points} XP</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-slate-400 font-mono">
                  <span>Progress to Level {userProgress.level + 1}</span>
                  <span>{currentLevelProgress}/100</span>
                </div>
                <div className="relative">
                  <Progress value={currentLevelProgress} className="h-2 bg-slate-800" />
                  <motion.div
                    className="absolute inset-0 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                    style={{ width: `${currentLevelProgress}%` }}
                    animate={{
                      boxShadow: [
                        '0 0 5px rgba(34, 211, 238, 0.5)',
                        '0 0 15px rgba(34, 211, 238, 0.8)',
                        '0 0 5px rgba(34, 211, 238, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-blue-400/20">
                  <div className="text-2xl text-blue-400 font-mono">{userProgress.questionsAsked}</div>
                  <div className="text-sm text-slate-400 font-mono">Neural Queries</div>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-emerald-400/20">
                  <div className="text-2xl text-emerald-400 font-mono">{userProgress.imagesAnalyzed}</div>
                  <div className="text-sm text-slate-400 font-mono">Visual Scans</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Sign In/Up Section */}
      {!isAuthenticated && (
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="p-6 bg-slate-900/60 border border-purple-400/30 backdrop-blur-sm relative overflow-hidden">
            {/* Scan line effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="text-center relative z-10">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Cpu className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              </motion.div>
              <h2 className="text-xl mb-2 text-purple-300 font-mono">Access Required</h2>
              <p className="text-slate-400 mb-4 font-mono text-sm">
                Initialize neural connection to begin AI learning
              </p>
              <div className="flex gap-3 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => onNavigate('signin')}
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 font-mono border border-purple-400/30"
                  >
                    Access Portal
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => onNavigate('signup')}
                    variant="outline"
                    className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-mono"
                  >
                    Create Neural ID
                  </Button>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Features Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card 
            className="p-6 bg-slate-900/60 border border-purple-400/30 hover:border-purple-400/50 backdrop-blur-sm cursor-pointer group relative overflow-hidden"
            onClick={() => isAuthenticated && onNavigate('chat')}
          >
            {/* Neural network animation */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            <motion.div
              className="flex items-center gap-3 mb-4 relative z-10"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative">
                <MessageSquare className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(168, 85, 247, 0.3)',
                      '0 0 20px rgba(168, 85, 247, 0.5)',
                      '0 0 10px rgba(168, 85, 247, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div>
                <h3 className="text-xl mb-1 text-purple-300 font-mono">Neural Chat</h3>
                {isAuthenticated && (
                  <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border border-purple-400/30 font-mono">
                    {userProgress.questionsAsked} queries
                  </Badge>
                )}
              </div>
            </motion.div>
            <p className="text-slate-400 font-mono text-sm relative z-10">
              Interface with AI that processes complex data into simple neural patterns
            </p>
            {!isAuthenticated && (
              <div className="mt-3 text-sm text-purple-400 opacity-70 font-mono">
                [ ACCESS REQUIRED ]
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card 
            className="p-6 bg-slate-900/60 border border-emerald-400/30 hover:border-emerald-400/50 backdrop-blur-sm cursor-pointer group relative overflow-hidden"
            onClick={() => isAuthenticated && onNavigate('upload')}
          >
            {/* Scanner animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div
              className="flex items-center gap-3 mb-4 relative z-10"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative">
                <Camera className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(34, 197, 94, 0.3)',
                      '0 0 20px rgba(34, 197, 94, 0.5)',
                      '0 0 10px rgba(34, 197, 94, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div>
                <h3 className="text-xl mb-1 text-emerald-300 font-mono">Digital Scanner</h3>
                {isAuthenticated && (
                  <Badge variant="secondary" className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
                    {userProgress.imagesAnalyzed} scans
                  </Badge>
                )}
              </div>
            </motion.div>
            <p className="text-slate-400 font-mono text-sm relative z-10">
              Upload visual data for AI analysis and detailed explanations
            </p>
            {!isAuthenticated && (
              <div className="mt-3 text-sm text-emerald-400 opacity-70 font-mono">
                [ ACCESS REQUIRED ]
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>

      {/* Achievements Section */}
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6 bg-slate-900/60 border border-cyan-400/30 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(45deg, transparent 40%, cyan 50%, transparent 60%)`,
                  backgroundSize: '20px 20px'
                }}
                animate={{ x: [-20, 20], y: [-20, 20] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <Database className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl text-cyan-300 font-mono">Achievement Matrix</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 relative z-10">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className={`p-3 rounded-lg border-2 relative overflow-hidden ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-400/30' 
                      : 'bg-slate-800/50 border-slate-600/30'
                  }`}
                >
                  {achievement.unlocked && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent"
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  
                  <div className="flex items-center gap-2 mb-1 relative z-10">
                    <achievement.icon 
                      className={`w-5 h-5 ${
                        achievement.unlocked ? 'text-yellow-400' : 'text-slate-500'
                      }`} 
                    />
                    <span className={`text-sm font-mono ${achievement.unlocked ? 'text-slate-200' : 'text-slate-500'}`}>
                      {achievement.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono relative z-10">{achievement.description}</p>
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                      className="absolute top-1 right-1"
                    >
                      <Star className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* AI Knowledge Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <Card className="p-6 bg-slate-900/60 border border-pink-400/30 backdrop-blur-sm relative overflow-hidden">
          {/* Matrix rain effect */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px bg-gradient-to-b from-transparent via-pink-400 to-transparent"
                style={{
                  left: `${12.5 * i}%`,
                  height: '100%'
                }}
                animate={{ y: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
              />
            ))}
          </div>
          
          <div className="text-center relative z-10">
            <motion.div 
              className="inline-flex items-center gap-2 mb-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="w-6 h-6 text-pink-400" />
              </motion.div>
              <h3 className="text-xl text-pink-300 font-mono">AI Knowledge Base</h3>
              <motion.div
                animate={{ rotate: [360, 180, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="w-6 h-6 text-pink-400" />
              </motion.div>
            </motion.div>
            <p className="text-slate-400 font-mono text-sm">
              MindSnap processes vast amounts of information from digital sources to explain 
              anything from stellar formation to molecular interactions - 
              all in neural patterns designed for young minds! 🌌✨
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}