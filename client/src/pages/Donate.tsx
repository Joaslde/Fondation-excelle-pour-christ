import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Heart,
  Gift,
  Lightbulb,
  CreditCard,
  Smartphone,
  Check,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DonationType = "dime" | "offering" | "project";

const donationTypes = [
  {
    id: "dime" as DonationType,
    title: "Dîme",
    icon: Heart,
    description: "La dîme représente 10% de vos revenus, une obéissance à la Parole.",
    verse: "Apportez à la maison du trésor toutes les dîmes...",
    reference: "Malachie 3:10",
  },
  {
    id: "offering" as DonationType,
    title: "Offrande",
    icon: Gift,
    description: "Une expression libre de gratitude envers Dieu pour ses bienfaits.",
    verse: "Que chacun donne comme il l'a résolu en son cœur...",
    reference: "2 Corinthiens 9:7",
  },
  {
    id: "project" as DonationType,
    title: "Soutenir un Projet",
    icon: Lightbulb,
    description: "Contribuez à des projets spécifiques : missions, construction, aide sociale.",
    verse: "Donnez, et il vous sera donné...",
    reference: "Luc 6:38",
  },
];

const suggestedAmounts = [5000, 10000, 25000, 50000, 100000];

export default function Donate() {
  const [selectedType, setSelectedType] = useState<DonationType | null>(null);
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mobile");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const formatCFA = (value: number) => {
    return new Intl.NumberFormat('fr-FR').format(value);
  };

  const handleDonate = async () => {
    const donationAmount = amount || customAmount;
    if (!donationAmount || !selectedType) {
      toast({
        title: "Information manquante",
        description: "Veuillez sélectionner un type de don et un montant.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    toast({
      title: "Merci pour votre générosité !",
      description: `Votre ${donationTypes.find((t) => t.id === selectedType)?.title.toLowerCase()} de ${formatCFA(parseInt(donationAmount))} FCFA a été enregistré.`,
    });

    setSelectedType(null);
    setAmount("");
    setCustomAmount("");
  };

  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#011C40] via-[#021F59] to-[#011C40] opacity-50" />
        <div className="relative container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Faire un <span className="text-gradient-gold">Don</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Votre générosité permet de soutenir l'œuvre de Dieu et d'impacter des vies.
              Chaque don, petit ou grand, fait une différence.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Choisissez votre type de don
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {donationTypes.map((type, index) => (
              <AnimatedSection key={type.id} animation="fade-up" delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedType(type.id)}
                  className="cursor-pointer"
                >
                  <Card
                    className={`p-6 h-full transition-all duration-300 ${
                      selectedType === type.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border"
                    }`}
                    data-testid={`card-donation-${type.id}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-md flex items-center justify-center ${
                          selectedType === type.id
                            ? "bg-primary"
                            : "bg-primary/20"
                        }`}
                        animate={
                          selectedType === type.id
                            ? { scale: [1, 1.1, 1] }
                            : {}
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <type.icon
                          className={`w-6 h-6 ${
                            selectedType === type.id
                              ? "text-primary-foreground"
                              : "text-primary"
                          }`}
                        />
                      </motion.div>
                      <h3 className="text-xl font-semibold">{type.title}</h3>
                      {selectedType === type.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {type.description}
                    </p>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm italic text-muted-foreground">
                        "{type.verse}"
                      </p>
                      <p className="text-xs text-primary mt-1">{type.reference}</p>
                    </div>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatePresence>
            {selectedType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <Card className="p-8" data-testid="donation-form">
                  <h3 className="text-xl font-semibold mb-6 text-center">
                    Montant de votre{" "}
                    {donationTypes.find((t) => t.id === selectedType)?.title.toLowerCase()}
                  </h3>

                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                    {suggestedAmounts.map((amt) => (
                      <motion.button
                        key={amt}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setAmount(amt.toString());
                          setCustomAmount("");
                        }}
                        className={`py-3 px-2 rounded-md font-semibold transition-all text-sm ${
                          amount === amt.toString()
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                        data-testid={`button-amount-${amt}`}
                      >
                        {formatCFA(amt)}
                      </motion.button>
                    ))}
                  </div>

                  <div className="mb-8">
                    <Label htmlFor="customAmount" className="mb-2 block">
                      Ou entrez un montant personnalisé
                    </Label>
                    <div className="relative">
                      <Input
                        id="customAmount"
                        type="number"
                        placeholder="Montant en FCFA"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setAmount("");
                        }}
                        className="pr-16"
                        data-testid="input-custom-amount"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        FCFA
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <Label className="mb-4 block">Mode de paiement</Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="grid grid-cols-2 gap-4"
                    >
                      <Label
                        htmlFor="mobile"
                        className={`flex items-center gap-3 p-4 rounded-md border cursor-pointer transition-all ${
                          paymentMethod === "mobile"
                            ? "border-primary bg-primary/10"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem value="mobile" id="mobile" />
                        <Smartphone className="w-5 h-5" />
                        <span>Mobile Money</span>
                      </Label>
                      <Label
                        htmlFor="card"
                        className={`flex items-center gap-3 p-4 rounded-md border cursor-pointer transition-all ${
                          paymentMethod === "card"
                            ? "border-primary bg-primary/10"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="w-5 h-5" />
                        <span>Carte bancaire</span>
                      </Label>
                    </RadioGroup>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full text-lg py-6 gold-glow-hover"
                      onClick={handleDonate}
                      disabled={isProcessing || (!amount && !customAmount)}
                      data-testid="button-donate-submit"
                    >
                      {isProcessing ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Faire un don
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Paiement 100% sécurisé via Mobile Money ou carte bancaire.
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
              Pourquoi <span className="text-gradient-gold">donner</span> ?
            </h2>
            <div className="space-y-6 text-left">
              <AnimatedSection animation="fade-left" delay={0.1}>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Soutenir les ministères</h3>
                  <p className="text-muted-foreground text-sm">
                    Vos dons permettent de financer les activités de l'église, les programmes
                    de formation et les événements communautaires.
                  </p>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fade-right" delay={0.2}>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Aider les plus démunis</h3>
                  <p className="text-muted-foreground text-sm">
                    Une partie de vos dons est consacrée aux actions sociales et à l'aide
                    aux familles dans le besoin au Bénin.
                  </p>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fade-left" delay={0.3}>
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Financer les missions</h3>
                  <p className="text-muted-foreground text-sm">
                    Vos contributions soutiennent les missionnaires et les projets
                    humanitaires à travers l'Afrique.
                  </p>
                </Card>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
