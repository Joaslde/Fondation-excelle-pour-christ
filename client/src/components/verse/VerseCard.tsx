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
            duration: 0.2,
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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
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

              <div className="flex items-center justify-center min-h-[400px] md:min-h-[450px] p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center max-w-xl"
                >
                  <p
                    className="text-lg md:text-xl leading-relaxed text-[#011C40] mb-6"
                    data-testid="text-verse"
                  >
                    {verse.text}
                  </p>
                  
                  <p
                    className="text-base font-semibold text-[#D9AA52]"
                    data-testid="text-verse-reference"
                  >
                    {verse.reference}
                  </p>
                </motion.div>
              </div>

              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <Button
                  size="default"
                  onClick={onDownload}
                  className="bg-[#D9AA52] hover:bg-[#A6702E] text-white"
                  data-testid="button-download-verse"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
