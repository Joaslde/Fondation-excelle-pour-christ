import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VerseCardProps {
  verse: {
    text: string;
    reference: string;
  } | null;
  isLoading: boolean;
  onNewVerse: () => void;
  onDownload: () => void;
  onClose?: () => void;
}

export function VerseCard({
  verse,
  isLoading,
  onDownload,
  onClose,
}: VerseCardProps) {
  return (
    <AnimatePresence mode="wait">
      {verse && (
        <motion.div
          key={verse.reference}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          data-testid="verse-card-overlay"
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-md shadow-2xl"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            data-testid="verse-card"
          >
            <div 
              className="relative w-full"
              style={{
                backgroundImage: `url(https://res.cloudinary.com/dmngvz0f4/image/upload/v1767006741/entrer_le_verset_biblique_bq3fnk.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {onClose && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white/70 hover:text-white hover:bg-black/50 transition-colors"
                  data-testid="button-close-verse"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[350px]">
                <div className="flex-1 flex items-center justify-center p-8 md:p-12">
                  <div className="text-center">
                    <img 
                      src="https://res.cloudinary.com/dmngvz0f4/image/upload/v1766769765/logo_f_rzbbkh.png"
                      alt="Excelle pour Christ"
                      className="w-32 h-32 mx-auto mb-4 opacity-60"
                    />
                    <p className="text-2xl md:text-3xl font-serif italic text-[#011C40]">
                      Voici la parole de Dieu
                    </p>
                    <p className="text-2xl md:text-3xl font-serif italic text-[#011C40]">
                      pour toi cette année !
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-xl md:text-2xl font-bold text-[#011C40] underline underline-offset-4 mb-6 text-center">
                      VERSET BIBLIQUE
                    </h2>
                    
                    <p
                      className="text-base md:text-lg leading-relaxed text-[#011C40] text-center mb-4"
                      data-testid="text-verse"
                    >
                      {verse.text}
                    </p>
                    
                    <p
                      className="text-sm font-semibold text-[#D9AA52] text-center"
                      data-testid="text-verse-reference"
                    >
                      {verse.reference}
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    size="default"
                    onClick={onDownload}
                    className="bg-[#D9AA52] hover:bg-[#A6702E] text-white"
                    data-testid="button-download-verse"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </motion.div>
              </div>

              <div className="absolute bottom-8 left-8">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="text-[#D9AA52]"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-8 right-8">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="text-[#D9AA52]"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
