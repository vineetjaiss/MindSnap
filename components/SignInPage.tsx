import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { Label } from './ui/label'
import { Brain, Eye, EyeOff, Sparkles, Shield, Cpu } from 'lucide-react'
import { motion } from 'motion/react'

type Page = 'home' | 'chat' | 'upload' | 'signin' | 'signup'

interface SignInPageProps {
  onNavigate: (page: Page) => void
  onSignIn: () => void
}

export function SignInPage({ onNavigate, onSignIn }: SignInPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      onSignIn()
      onNavigate('home')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8 relative">
      {/* Background matrix effect */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            style={{ left: `${6.67 * i}%` }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-cyan-400/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(34, 211, 238, 0.3)',
                '0 0 30px rgba(34, 211, 238, 0.5)',
                '0 0 20px rgba(34, 211, 238, 0.3)'
              ]
            }}
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 font-mono">
            Neural Access
          </h1>
          <p className="text-slate-400 font-mono text-sm">
            Authenticate digital identity! 🔐
          </p>
        </motion.div>

        {/* Sign In Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="p-6 bg-slate-900/60 border border-cyan-400/30 backdrop-blur-sm shadow-lg relative overflow-hidden">
            {/* Scan line effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cyan-300 font-mono">Neural ID</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@digital.id"
                    required
                    className="bg-slate-800/50 border-cyan-400/30 text-slate-200 placeholder:text-slate-500 font-mono focus:border-cyan-400/50"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-md pointer-events-none"
                    animate={email ? {
                      boxShadow: [
                        '0 0 10px rgba(34, 211, 238, 0.2)',
                        '0 0 20px rgba(34, 211, 238, 0.4)',
                        '0 0 10px rgba(34, 211, 238, 0.2)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-cyan-300 font-mono">Digital Key</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your neural encryption key"
                    required
                    className="bg-slate-800/50 border-cyan-400/30 text-slate-200 placeholder:text-slate-500 font-mono focus:border-cyan-400/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1 h-8 w-8 p-0 text-slate-500 hover:text-cyan-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <motion.div
                    className="absolute inset-0 rounded-md pointer-events-none"
                    animate={password ? {
                      boxShadow: [
                        '0 0 10px rgba(34, 211, 238, 0.2)',
                        '0 0 20px rgba(34, 211, 238, 0.4)',
                        '0 0 10px rgba(34, 211, 238, 0.2)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border border-cyan-400/30 font-mono"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Cpu className="w-4 h-4 mr-2" />
                      </motion.div>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Access Neural Network ⚡
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="mt-6 text-center relative z-10">
              <p className="text-slate-400 font-mono text-sm">
                No neural account?{' '}
                <button
                  onClick={() => onNavigate('signup')}
                  className="text-cyan-400 hover:text-cyan-300 underline font-mono"
                >
                  Create digital identity!
                </button>
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Security Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="mt-6 p-4 bg-slate-900/60 border border-purple-400/30 backdrop-blur-sm">
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              </motion.div>
              <p className="text-sm text-slate-400 font-mono">
                Digital encryption protocols active! Your neural data is secured! 🛡️
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              onClick={() => onNavigate('home')}
              className="text-slate-500 hover:text-cyan-400 font-mono"
            >
              ← Return to Base
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}