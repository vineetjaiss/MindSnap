import { useState, useRef, useCallback } from 'react'
import { Button } from './ui/button.tsx'
import { Card } from './ui/card.tsx'
import { Upload, Camera, Image, Sparkles, Eye, RefreshCw, Download, Share2, Scan, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Progress } from './ui/progress.tsx'
import { toast } from 'sonner'

interface UploadPageProps {
  onProgressUpdate: (type: 'question' | 'image') => void
  userProgress: {
    questionsAsked: number
    imagesAnalyzed: number
    level: number
    points: number
  }
}

export function UploadPage({ onProgressUpdate, userProgress }: UploadPageProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setAnalysis(null)
        setAnalysisProgress(0)
        toast.success('📡 Digital data stream established! Visual matrix loaded!')
      }
      reader.readAsDataURL(file)
    } else {
      toast.error(' Invalid data format! Please upload visual digital data!')
    }
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    
    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 8
      })
    }, 150)
    
    // Simulate AI analysis
    setTimeout(() => {
      const responses = [
        "Digital scan complete! Visual data matrix decoded! 🌟",
        "Molecular analysis finished! Fascinating structures detected! 👁️",
        "Neural pattern recognition successful! Incredible data revealed! ✨",
        "Atomic level scanning complete! Amazing interactions discovered! 🔬"
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setAnalysis(`${randomResponse} I've processed this visual data through my AI neural networks to decode the molecular patterns into simple cognitive understanding... (Demo mode - full AI analysis would provide detailed atomic-level explanations optimized for neural level ${userProgress.level}!)`)
      setIsAnalyzing(false)
      onProgressUpdate('image')
      
      // Celebration for milestone images
      if (userProgress.imagesAnalyzed % 3 === 0) {
        toast.success('⚡ Digital expertise achieved! Visual processing enhanced!', {
          duration: 3000,
          position: 'top-center'
        })
      }
    }, 2500)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleShare = () => {
    toast.success('🚀 Digital sharing protocol activated!')
  }

  const handleDownload = () => {
    toast.success('💾 Neural data export initiated!')
  }

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
          className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-emerald-400/30"
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
          <Camera className="w-8 h-8 text-white" />
          
          {/* Scanner effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            animate={{
              background: [
                'linear-gradient(0deg, transparent, rgba(34, 197, 94, 0.2), transparent)',
                'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent)',
                'linear-gradient(180deg, transparent, rgba(34, 197, 94, 0.2), transparent)',
                'linear-gradient(270deg, transparent, rgba(34, 197, 94, 0.2), transparent)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        
        <h1 className="text-3xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2 font-mono">
          Digital Scanner
        </h1>
        <p className="text-slate-300 font-mono text-sm">
          Upload visual data for AI analysis! 📡
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-slate-500 font-mono">
          <span>Neural Level {userProgress.level}</span>
          <span>•</span>
          <span>{userProgress.imagesAnalyzed} digital scans</span>
        </div>
      </motion.div>

      {/* Upload Area */}
      {!uploadedImage ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card 
            className={`p-8 border-2 border-dashed transition-all duration-300 cursor-pointer relative overflow-hidden ${
              isDragging 
                ? 'border-emerald-400/60 bg-slate-900/80 scale-105' 
                : 'border-emerald-400/30 bg-slate-900/40 hover:border-emerald-400/50'
            } backdrop-blur-sm`}
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Scanner grid */}
            <div className="absolute inset-0 opacity-20">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }}
              />
            </div>
            
            {/* Scanner sweep */}
            {isDragging && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"
                animate={{ x: [-100, 300] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}
            
            <div className="text-center relative z-10">
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/30"
                animate={isDragging ? { 
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360]
                } : {
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: isDragging ? 1 : 3, repeat: Infinity }}
              >
                <Upload className="w-10 h-10 text-emerald-400" />
              </motion.div>
              <h3 className="text-xl mb-2 text-emerald-300 font-mono">
                {isDragging ? 'Initiating Digital Upload... 🎯' : 'Deploy Visual Data Here!'}
              </h3>
              <p className="text-slate-400 mb-4 font-mono text-sm">
                Or access local digital storage
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 border border-emerald-400/30 font-mono">
                  <Image className="w-4 h-4 mr-2" />
                  Access Data Matrix
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Uploaded Image */}
          <Card className="p-6 bg-slate-900/60 border border-cyan-400/30 backdrop-blur-sm relative overflow-hidden">
            {/* Holographic effect */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'linear-gradient(45deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
                    'linear-gradient(135deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
                    'linear-gradient(225deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
                    'linear-gradient(315deg, transparent, rgba(34, 211, 238, 0.1), transparent)',
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <div className="text-center mb-4 relative z-10">
              <motion.div 
                className="inline-flex items-center gap-2 mb-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Scan className="w-5 h-5 text-cyan-400" />
                </motion.div>
                <h3 className="text-lg text-cyan-300 font-mono">Digital Data Loaded</h3>
                <motion.div
                  animate={{ rotate: [360, 180, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Scan className="w-5 h-5 text-cyan-400" />
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div 
              className="relative max-w-md mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative">
                <img 
                  src={uploadedImage} 
                  alt="AI Analysis Target" 
                  className="w-full h-auto rounded-lg shadow-lg border border-cyan-400/20"
                />
                
                {/* Scanning overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent rounded-lg"
                  initial={{ x: -100 }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Corner scanners */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-4 h-4 border-2 border-cyan-400 ${
                      i === 0 ? 'top-2 left-2 border-r-0 border-b-0' :
                      i === 1 ? 'top-2 right-2 border-l-0 border-b-0' :
                      i === 2 ? 'bottom-2 left-2 border-r-0 border-t-0' :
                      'bottom-2 right-2 border-l-0 border-t-0'
                    }`}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
            
            <div className="flex gap-3 justify-center mt-4 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border border-cyan-400/30 font-mono"
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                      </motion.div>
                      AI Processing...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Analyze Digital Data!
                    </>
                  )}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    setUploadedImage(null)
                    setAnalysis(null)
                    setIsAnalyzing(false)
                    setAnalysisProgress(0)
                  }}
                  variant="outline"
                  className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 font-mono"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Scanner
                </Button>
              </motion.div>
            </div>
            
            {/* Analysis progress */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-2 relative z-10"
                >
                  <div className="flex justify-between text-sm text-slate-400 font-mono">
                    <span>AI analysis in progress...</span>
                    <span>{analysisProgress}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={analysisProgress} className="h-2 bg-slate-800" />
                    <motion.div
                      className="absolute inset-0 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                      style={{ width: `${analysisProgress}%` }}
                      animate={{
                        boxShadow: [
                          '0 0 5px rgba(34, 211, 238, 0.5)',
                          '0 0 15px rgba(34, 211, 238, 0.8)',
                          '0 0 5px rgba(34, 211, 238, 0.5)'
                        ]
                      }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Analysis Result */}
          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Card className="p-6 bg-slate-900/60 border border-emerald-400/30 backdrop-blur-sm relative overflow-hidden">
                  {/* Neural network visualization */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                        style={{
                          left: `${10 + (i % 4) * 25}%`,
                          top: `${20 + Math.floor(i / 4) * 30}%`,
                        }}
                        animate={{
                          scale: [1, 2, 1],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-start gap-3 relative z-10">
                    <motion.div 
                      className="w-8 h-8 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full flex items-center justify-center shrink-0 border border-emerald-400/30"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-lg mb-2 text-emerald-300 font-mono">AI Analysis Complete!</h4>
                      <p className="text-slate-300 leading-relaxed font-mono text-sm">{analysis}</p>
                      
                      <div className="flex gap-2 mt-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={handleShare}
                            size="sm"
                            variant="outline"
                            className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10 font-mono"
                          >
                            <Share2 className="w-3 h-3 mr-1" />
                            Transmit
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={handleDownload}
                            size="sm"
                            variant="outline"
                            className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10 font-mono"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Archive
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Digital Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Card className="p-6 bg-slate-900/60 border border-purple-400/30 backdrop-blur-sm mt-8 relative overflow-hidden">
          {/* Data stream effect */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                style={{ top: `${20 + i * 20}%` }}
                animate={{ x: [-100, 100] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
              />
            ))}
          </div>
          
          <h4 className="text-lg mb-3 text-center text-purple-300 font-mono relative z-10">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🔬
            </motion.span>
            {' '}Digital Scanning Protocols
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400 font-mono relative z-10">
            <motion.div 
              className="flex items-start gap-2"
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-cyan-400">📡</span>
              <span>High-resolution digital data preferred!</span>
            </motion.div>
            <motion.div 
              className="flex items-start gap-2"
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-emerald-400">🔬</span>
              <span>Molecular-level analysis of all visual data!</span>
            </motion.div>
            <motion.div 
              className="flex items-start gap-2"
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-purple-400">⚡</span>
              <span>AI processing optimized for clarity!</span>
            </motion.div>
            <motion.div 
              className="flex items-start gap-2"
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-pink-400">🚀</span>
              <span>Enhanced neural understanding guaranteed!</span>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}