import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { Label } from './ui/label'
import { Brain, Eye, EyeOff, Sparkles, UserPlus, Cpu, Zap } from 'lucide-react'
import { motion } from 'motion/react'

type Page = 'home' | 'chat' | 'upload' | 'signin' | 'signup'

interface SignUpPageProps {
  onNavigate: (page: Page) => void
  onSignUp: () => void
}

export function SignUpPage({ onNavigate, onSignUp }: SignUpPageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert('Digital keys do not match!')
      return
    }
    
    setIsLoading(true)
    
    // Simulate sign up
    setTimeout(() => {
      setIsLoading(false)
      onSignUp()
      onNavigate('home')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8 relative">
      {/* Background neural network */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Connecting lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 30}%`,
              width: '15%',
              transform: `rotate(${i * 45}deg)`
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
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
            className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-emerald-400/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(34, 197, 94, 0.3)',
                '0 0 30px rgba(34, 197, 94, 0.5)',
                '0 0 20px rgba(34, 197, 94, 0.3)'
              ]
            }}
          >
            <UserPlus className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2 font-mono">
            Neural Genesis
          </h1>
          <p className="text-slate-400 font-mono text-sm">
            Initialize new digital consciousness! 🧠
          </p>
        </motion.div>

        {/* Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="p-6 bg-slate-900/60 border border-emerald-400/30 backdrop-blur-sm shadow-lg relative overflow-hidden">
            {/* Data stream effect */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                  style={{ top: `${20 + i * 20}%` }}
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                />
              ))}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-emerald-300 font-mono">Neural Designation</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your digital identity name"
                    required
                    className="bg-slate-800/50 border-emerald-400/30 text-slate-200 placeholder:text-slate-500 font-mono focus:border-emerald-400/50"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-md pointer-events-none"
                    animate={name ? {
                      boxShadow: [
                        '0 0 10px rgba(34, 197, 94, 0.2)',
                        '0 0 20px rgba(34, 197, 94, 0.4)',
                        '0 0 10px rgba(34, 197, 94, 0.2)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-emerald-300 font-mono">Digital Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@neural.network"
                    required
                    className="bg-slate-800/50 border-emerald-400/30 text-slate-200 placeholder:text-slate-500 font-mono focus:border-emerald-400/50"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-md pointer-events-none"
                    animate={email ? {
                      boxShadow: [
                        '0 0 10px rgba(34, 197, 94, 0.2)',
                        '0 0 20px rgba(34, 197, 94, 0.4)',
                        '0 0 10px rgba(34, 197, 94, 0.2)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-emerald-300 font-mono">Encryption Matrix</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Generate digital security key"
                    required
                    className="bg-slate-800/50 border-emerald-400/30 text-slate-200 placeholder:text-slate-500 font-mono focus:border-emerald-400/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1 h-8 w-8 p-0 text-slate-500 hover:text-emerald-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <motion.div
                    className="absolute inset-0 rounded-md pointer-events-none"
                    animate={password ? {
                      boxShadow: [
                        '0 0 10px rgba(34, 197, 94, 0.2)',
                        '0 0 20px rgba(34, 197, 94, 0.4)',
                        '0 0 10px rgba(34, 197, 94, 0.2)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-emerald-300 font-mono">Verify Matrix</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm digital encryption key"
                    required
                    className="bg-slate-800/50 border-emerald-400/30 text-slate-200 placeholder:text-slate-500 font-mono focus:border-emerald-400/50"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-md pointer-events-none"
                    animate={confirmPassword ? {
                      boxShadow: [
                        '0 0 10px rgba(34, 197, 94, 0.2)',
                        '0 0 20px rgba(34, 197, 94, 0.4)',
                        '0 0 10px rgba(34, 197, 94, 0.2)'
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
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 border border-emerald-400/30 font-mono"
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
                      Initializing Neural Core...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Create Digital Account 🚀
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="mt-6 text-center relative z-10">
              <p className="text-slate-400 font-mono text-sm">
                Neural account exists?{' '}
                <button
                  onClick={() => onNavigate('signin')}
                  className="text-emerald-400 hover:text-emerald-300 underline font-mono"
                >
                  Access existing matrix!
                </button>
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="mt-6 p-4 bg-slate-900/60 border border-cyan-400/30 backdrop-blur-sm">
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              </motion.div>
              <p className="text-sm text-slate-400 font-mono">
                Prepare for digital consciousness expansion! Neural enhancement awaits! 🌌
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
              className="text-slate-500 hover:text-emerald-400 font-mono"
            >
              ← Return to Base
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}