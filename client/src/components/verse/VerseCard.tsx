import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCw, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VerseCardProps {
  verse: {
    text: string;
    reference: string;
  } | null;
  isLoading: boolean;
  onNewVerse: () => void;
  onDownload: () => void;
}

export function VerseCard({
  verse,
  isLoading,
  onNewVerse,
  onDownload,
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
          className="w-full max-w-lg mx-auto"
          data-testid="verse-card"
        >
          <Card className="relative overflow-visible bg-card/80 backdrop-blur-sm border-primary/20 p-8">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>

            <div className="pt-4">
              <motion.p
                className="text-lg md:text-xl leading-relaxed text-center font-serif italic mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                data-testid="text-verse"
              >
                "{verse.text}"
              </motion.p>

              <motion.p
                className="text-sm text-primary font-semibold text-center uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                data-testid="text-verse-reference"
              >
                — {verse.reference}
              </motion.p>
            </div>

            <motion.div
              className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-border"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={onNewVerse}
                disabled={isLoading}
                data-testid="button-new-verse"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Nouveau verset
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onDownload}
                data-testid="button-download-verse"
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
