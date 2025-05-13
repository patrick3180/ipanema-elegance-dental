
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    
    // In a real implementation, this would send the form data to a server
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em breve.",
    });
    
    form.reset();
  };

  return (
    <PageLayout>
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-lg mb-4">Contato</h1>
            <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
            <p className="text-dental-gray mb-6">
              Entre em contato conosco para agendar sua consulta
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-display mb-6">Envie uma mensagem</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Seu nome" 
                                {...field} 
                                className="border-dental-gray/20 focus-visible:ring-dental-gold"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="seu@email.com" 
                                type="email" 
                                {...field} 
                                className="border-dental-gray/20 focus-visible:ring-dental-gold"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(21) 99999-9999" 
                              {...field} 
                              className="border-dental-gray/20 focus-visible:ring-dental-gold"
                            />
                          </FormControl>
                          <FormDescription>
                            Preferência para WhatsApp
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Como podemos ajudar?" 
                              {...field} 
                              className="min-h-[120px] border-dental-gray/20 focus-visible:ring-dental-gold"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-dental-gold hover:bg-dental-gold/90 text-white"
                    >
                      Enviar mensagem
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white rounded-lg p-8 shadow-sm h-full">
                <h2 className="text-2xl font-display mb-6">Informações de contato</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-dental-gold mt-1" />
                    <div>
                      <p className="font-medium">Endereço</p>
                      <p className="text-dental-gray">
                        Rua Visconde de Pirajá, 550 - Sala 1107<br />
                        Ipanema, Rio de Janeiro - RJ<br />
                        CEP: 22410-901
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-dental-gold mt-1" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-dental-gray">
                        (21) 3738-7909<br />
                        (21) 99330-4045
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-dental-gold mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-dental-gray">contato@dracarlachristoph.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-dental-gold mt-1" />
                    <div>
                      <p className="font-medium">Horário de atendimento</p>
                      <p className="text-dental-gray">
                        Segunda à Sexta: 9h às 18h<br />
                        Sábados: 9h às 13h
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-4">Localização</h3>
                  <div className="aspect-video bg-dental-beige/50 rounded-lg flex items-center justify-center">
                    <div className="text-dental-gray text-center p-8">
                      <p className="text-sm mb-2">Mapa do Google</p>
                      <p className="text-xs">Esta é uma imagem placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
