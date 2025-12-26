import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCw, BookOpen, X } from "lucide-react";
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
  onNewVerse,
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
            className="relative w-full max-w-lg bg-gradient-to-br from-[#011C40] via-[#021F59] to-[#011C40] border border-primary/30 rounded-md p-8 shadow-2xl"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            data-testid="verse-card"
          >
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                data-testid="button-close-verse"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </motion.div>
            </div>

            <div className="pt-6">
              <motion.div
                className="relative mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="absolute -left-2 -top-2 text-6xl text-primary/20 font-serif">"</span>
                <p
                  className="text-xl md:text-2xl leading-relaxed text-center font-serif italic text-white/90 px-4"
                  data-testid="text-verse"
                >
                  {verse.text}
                </p>
                <span className="absolute -right-2 -bottom-4 text-6xl text-primary/20 font-serif">"</span>
              </motion.div>

              <motion.div
                className="flex items-center justify-center gap-2 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
                <p
                  className="text-sm text-primary font-semibold uppercase tracking-wider"
                  data-testid="text-verse-reference"
                >
                  {verse.reference}
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
              </motion.div>
            </div>

            <motion.div
              className="flex items-center justify-center gap-3 pt-6 border-t border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="outline"
                size="default"
                onClick={onNewVerse}
                disabled={isLoading}
                className="border-white/20 text-white hover:bg-white/10"
                data-testid="button-new-verse"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Nouveau verset
              </Button>
              <Button
                size="default"
                onClick={onDownload}
                className="gold-glow-hover"
                data-testid="button-download-verse"
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
