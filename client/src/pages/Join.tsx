import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Heart,
  Music,
  BookOpen,
  Baby,
  Utensils,
  Send,
  Check,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  interest: z.string().min(1, "Veuillez sélectionner un centre d'intérêt"),
  message: z.string().optional(),
  newsletter: z.boolean().default(false),
  volunteer: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const volunteerAreas = [
  { id: "worship", label: "Louange & Musique", icon: Music },
  { id: "teaching", label: "Enseignement", icon: BookOpen },
  { id: "children", label: "Ministère Enfants", icon: Baby },
  { id: "hospitality", label: "Accueil & Hospitalité", icon: Utensils },
  { id: "community", label: "Actions Sociales", icon: Heart },
  { id: "youth", label: "Ministère Jeunesse", icon: Users },
];

export default function Join() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedVolunteerAreas, setSelectedVolunteerAreas] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
      newsletter: false,
      volunteer: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          volunteerAreas: selectedVolunteerAreas,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSubmitted(true);
      toast({
        title: "Message envoyé !",
        description: "Nous vous contacterons très prochainement.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleVolunteerArea = (areaId: string) => {
    setSelectedVolunteerAreas((prev) =>
      prev.includes(areaId)
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId]
    );
  };

  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#011C40] via-[#021F59] to-[#011C40] opacity-50" />
        <div className="relative container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Nous <span className="text-gradient-gold">rejoindre</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nous serions ravis de vous accueillir au sein de notre communauté.
              Remplissez le formulaire ci-dessous et nous vous contacterons.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <AnimatedSection animation="fade-left">
                <Card className="p-8" data-testid="join-form-card">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                          className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-10 h-10 text-primary-foreground" />
                        </motion.div>
                        <h3 className="text-2xl font-semibold mb-4">
                          Merci pour votre intérêt !
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Nous avons bien reçu votre message et nous vous contacterons
                          dans les plus brefs délais.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsSubmitted(false);
                            form.reset();
                            setSelectedVolunteerAreas([]);
                          }}
                          data-testid="button-new-request"
                        >
                          Envoyer une nouvelle demande
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div key="form">
                        <h2 className="text-2xl font-semibold mb-6">
                          Formulaire de contact
                        </h2>

                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                      <motion.div
                                        whileFocus={{ scale: 1.01 }}
                                        transition={{ type: "spring" }}
                                      >
                                        <Input
                                          placeholder="Jean"
                                          {...field}
                                          data-testid="input-first-name"
                                        />
                                      </motion.div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Dupont"
                                        {...field}
                                        data-testid="input-last-name"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="email"
                                        placeholder="jean@exemple.fr"
                                        {...field}
                                        data-testid="input-email"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Téléphone</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="06 12 34 56 78"
                                        {...field}
                                        data-testid="input-phone"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name="interest"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Je souhaite...</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger data-testid="select-interest">
                                        <SelectValue placeholder="Sélectionnez une option" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="visit">Visiter l'église</SelectItem>
                                      <SelectItem value="member">Devenir membre</SelectItem>
                                      <SelectItem value="info">Obtenir plus d'informations</SelectItem>
                                      <SelectItem value="prayer">Demander une prière</SelectItem>
                                      <SelectItem value="volunteer">Devenir bénévole</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="message"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Message (optionnel)</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Parlez-nous un peu de vous ou posez-nous une question..."
                                      className="min-h-[120px]"
                                      {...field}
                                      data-testid="textarea-message"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="space-y-4">
                              <FormField
                                control={form.control}
                                name="volunteer"
                                render={({ field }) => (
                                  <FormItem className="flex items-center gap-3">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        data-testid="checkbox-volunteer"
                                      />
                                    </FormControl>
                                    <FormLabel className="!mt-0 cursor-pointer">
                                      Je souhaite devenir bénévole
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />

                              <AnimatePresence>
                                {form.watch("volunteer") && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pl-6 pt-2"
                                  >
                                    <p className="text-sm text-muted-foreground mb-4">
                                      Sélectionnez les domaines qui vous intéressent :
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                      {volunteerAreas.map((area) => (
                                        <motion.button
                                          key={area.id}
                                          type="button"
                                          whileHover={{ scale: 1.02 }}
                                          whileTap={{ scale: 0.98 }}
                                          onClick={() => toggleVolunteerArea(area.id)}
                                          className={`p-3 rounded-md border text-left flex items-center gap-2 transition-all ${
                                            selectedVolunteerAreas.includes(area.id)
                                              ? "border-primary bg-primary/10"
                                              : "border-border hover:border-primary/50"
                                          }`}
                                          data-testid={`button-volunteer-${area.id}`}
                                        >
                                          <area.icon className="w-4 h-4 text-primary" />
                                          <span className="text-sm">{area.label}</span>
                                        </motion.button>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <FormField
                                control={form.control}
                                name="newsletter"
                                render={({ field }) => (
                                  <FormItem className="flex items-center gap-3">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        data-testid="checkbox-newsletter"
                                      />
                                    </FormControl>
                                    <FormLabel className="!mt-0 cursor-pointer">
                                      Je souhaite recevoir la newsletter
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            </div>

                            <motion.div
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <Button
                                type="submit"
                                className="w-full text-lg py-6 gold-glow-hover"
                                disabled={isSubmitting}
                                data-testid="button-submit"
                              >
                                {isSubmitting ? (
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                                  />
                                ) : (
                                  <>
                                    Envoyer
                                    <Send className="w-5 h-5 ml-2" />
                                  </>
                                )}
                              </Button>
                            </motion.div>
                          </form>
                        </Form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </AnimatedSection>
            </div>

            <div className="space-y-6">
              <AnimatedSection animation="fade-right" delay={0.1}>
                <Card className="p-6" data-testid="card-location">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Adresse</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    123 Rue de la Foi
                    <br />
                    75001 Paris, France
                  </p>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fade-right" delay={0.2}>
                <Card className="p-6" data-testid="card-hours">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Horaires</h3>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Dimanche : 10h00 - 12h30</p>
                    <p>Mercredi : 19h00 - 21h00</p>
                    <p>Vendredi : 19h00 - 21h00</p>
                  </div>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fade-right" delay={0.3}>
                <Card className="p-6" data-testid="card-contact">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Contact</h3>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>+33 1 23 45 67 89</p>
                    <p>contact@eglise.fr</p>
                  </div>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="scale" delay={0.4}>
                <Card className="p-6 bg-primary/10 border-primary/20">
                  <h3 className="font-semibold mb-3">
                    Vous êtes les bienvenus !
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Peu importe votre parcours ou vos croyances, notre porte est ouverte.
                    Venez comme vous êtes et découvrez une communauté chaleureuse et
                    accueillante.
                  </p>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
