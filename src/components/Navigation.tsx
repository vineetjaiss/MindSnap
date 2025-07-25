import { Home, MessageCircle, Upload, Star, Trophy, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { Badge } from './ui/badge.tsx'
import { Progress } from './ui/progress.tsx'

type Page = 'home' | 'chat' | 'upload' | 'signin' | 'signup'

interface NavigationProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  userProgress: {
    questionsAsked: number
    imagesAnalyzed: number
    level: number
    points: number
  }
}

export function Navigation({ currentPage, onNavigate, userProgress }: NavigationProps) {
  const navItems = [
    { 
      id: 'home' as Page, 
      icon: Home, 
      label: 'Base', 
      color: 'text-cyan-400',
      glowColor: 'shadow-cyan-400/50'
    },
    { 
      id: 'chat' as Page, 
      icon: MessageCircle, 
      label: 'Neural', 
      color: 'text-purple-400',
      glowColor: 'shadow-purple-400/50',
      badge: userProgress.questionsAsked
    },
    { 
      id: 'upload' as Page, 
      icon: Upload, 
      label: 'Scanner', 
      color: 'text-emerald-400',
      glowColor: 'shadow-emerald-400/50',
      badge: userProgress.imagesAnalyzed
    },
  ]

  const currentLevelProgress = (userProgress.points % 100)

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-t border-cyan-400/20 shadow-lg z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%)',
        boxShadow: '0 -4px 20px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(139, 92, 246, 0.2)'
      }}
    >
      {/* Progress bar for current level */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Trophy className="w-4 h-4 text-yellow-400" />
            </motion.div>
            <span className="text-xs text-cyan-300 font-mono">LVL {userProgress.level}</span>
          </div>
          <div className="flex items-center gap-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-3 h-3 text-yellow-400" />
            </motion.div>
            <span className="text-xs text-emerald-300 font-mono">{userProgress.points} XP</span>
          </div>
        </div>
        <div className="max-w-md mx-auto mt-1">
          <Progress 
            value={currentLevelProgress} 
            className="h-1 bg-slate-800 border border-cyan-400/20"
          />
          <div 
            className="h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-300"
            style={{ width: `${currentLevelProgress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-around max-w-md mx-auto px-4 py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'scale-110' 
                  : 'hover:scale-105'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`relative p-2 rounded-xl border transition-all duration-300 ${
                  isActive 
                    ? 'bg-slate-800/50 border-cyan-400/50 shadow-lg' 
                    : 'bg-slate-800/30 border-slate-600/30 hover:border-cyan-400/30'
                }`}
                animate={isActive ? {
                  boxShadow: [
                    '0 0 10px rgba(139, 92, 246, 0.3)',
                    '0 0 20px rgba(139, 92, 246, 0.5)',
                    '0 0 10px rgba(139, 92, 246, 0.3)'
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon 
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? item.color : 'text-slate-400 hover:text-cyan-400'
                  }`} 
                />
                
                {/* Holographic effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-30"
                    animate={{
                      background: [
                        'linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.1), transparent)',
                        'linear-gradient(135deg, transparent, rgba(139, 92, 246, 0.1), transparent)',
                        'linear-gradient(225deg, transparent, rgba(139, 92, 246, 0.1), transparent)',
                        'linear-gradient(315deg, transparent, rgba(139, 92, 246, 0.1), transparent)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.div>
              
              <span className={`text-xs font-mono transition-all duration-300 ${
                isActive ? item.color : 'text-slate-500 hover:text-cyan-400'
              }`}>
                {item.label}
              </span>
              
              {/* Badge for activity count */}
              {item.badge && item.badge > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 5px rgba(34, 197, 94, 0.5)',
                        '0 0 15px rgba(34, 197, 94, 0.8)',
                        '0 0 5px rgba(34, 197, 94, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-full"
                  >
                    <Badge 
                      variant="secondary" 
                      className="text-xs h-5 w-5 p-0 flex items-center justify-center bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono"
                    >
                      {item.badge}
                    </Badge>
                  </motion.div>
                </motion.div>
              )}
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  animate={{
                    boxShadow: [
                      '0 0 5px rgba(34, 211, 238, 0.5)',
                      '0 0 15px rgba(34, 211, 238, 0.8)',
                      '0 0 5px rgba(34, 211, 238, 0.5)'
                    ]
                  }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}