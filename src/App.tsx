import { useState, useEffect } from 'react'
import { HomePage } from './components/HomePage'
import { ChatPage } from './components/ChatPage'
import { UploadPage } from './components/UploadPage'
import { SignInPage } from './components/SignInPage'
import { SignUpPage } from './components/SignUpPage'
import { Navigation } from './components/Navigation'
import { motion, AnimatePresence } from 'motion/react'
import { anticipate } from 'motion'
import { toast, Toaster } from 'sonner'

type Page = 'home' | 'chat' | 'upload' | 'signin' | 'signup'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userProgress, setUserProgress] = useState({
    questionsAsked: 0,
    imagesAnalyzed: 0,
    level: 1,
    points: 0
  })

  // Simulate checking authentication on load
  useEffect(() => {
    const savedAuth = localStorage.getItem('mindsnap-auth')
    const savedProgress = localStorage.getItem('mindsnap-progress')
    
    if (savedAuth) {
      setIsAuthenticated(true)
    }
    
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    }
  }, [])

  const handlePageNavigation = (page: Page) => {
    setCurrentPage(page)
    
    // Add futuristic feedback
    if (page === 'chat') {
      toast.success('🚀 Neural Network Activated!', {
        duration: 2000,
        position: 'top-center'
      })
    } else if (page === 'upload') {
      toast.success('📡 Visual Scanner Online!', {
        duration: 2000,
        position: 'top-center'
      })
    }
  }

  const handleProgressUpdate = (type: 'question' | 'image') => {
    setUserProgress(prev => {
      const newProgress = {
        ...prev,
        questionsAsked: type === 'question' ? prev.questionsAsked + 1 : prev.questionsAsked,
        imagesAnalyzed: type === 'image' ? prev.imagesAnalyzed + 1 : prev.imagesAnalyzed,
        points: prev.points + 10
      }
      
      // Level up logic
      if (newProgress.points >= newProgress.level * 100) {
        newProgress.level += 1
        toast.success(`⚡ LEVEL UP! Neural Network Enhanced to Level ${newProgress.level}!`, {
          duration: 3000,
          position: 'top-center'
        })
      }
      
      localStorage.setItem('mindsnap-progress', JSON.stringify(newProgress))
      return newProgress
    })
  }

  const handleAuthentication = (isSignIn: boolean) => {
    setIsAuthenticated(true)
    localStorage.setItem('mindsnap-auth', 'true')
    
    toast.success(isSignIn ? '🛡️ Access Granted! Welcome Back!' : '✨ Neural Account Created! Welcome to the Future!', {
      duration: 3000,
      position: 'top-center'
    })
  }

  const pageVariants = {
    enter: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      filter: 'blur(10px)'
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      filter: 'blur(10px)'
    }
  }
  const pageTransition = {
    ease: anticipate,
    duration: 0.4
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handlePageNavigation} isAuthenticated={isAuthenticated} userProgress={userProgress} />
      case 'chat':
        return <ChatPage onProgressUpdate={handleProgressUpdate} userProgress={userProgress} />
      case 'upload':
        return <UploadPage onProgressUpdate={handleProgressUpdate} userProgress={userProgress} />
      case 'signin':
        return <SignInPage onNavigate={handlePageNavigation} onSignIn={() => handleAuthentication(true)} />
      case 'signup':
        return <SignUpPage onNavigate={handlePageNavigation} onSignUp={() => handleAuthentication(false)} />
      default:
        return <HomePage onNavigate={handlePageNavigation} isAuthenticated={isAuthenticated} userProgress={userProgress} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Futuristic animated background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Neon glow orbs */}
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-48 h-48 bg-gradient-to-br from-emerald-400/15 to-cyan-500/15 rounded-full blur-xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Scan line effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent transform -skew-y-12" />
      </motion.div>

      {isAuthenticated && !['signin', 'signup'].includes(currentPage) && (
        <Navigation 
          currentPage={currentPage} 
          onNavigate={handlePageNavigation} 
          userProgress={userProgress}
        />
      )}
      
      <main className="pb-20 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="enter"
            animate="center"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="min-h-screen"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Toaster 
        richColors 
        theme="dark"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: 'white',
            backdropFilter: 'blur(10px)'
          }
        }}
      />
    </div>
  )
}