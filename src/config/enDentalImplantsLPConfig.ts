import { LandingPageConfig } from "@/types/LandingPageConfig";

export const enDentalImplantsLPConfig: LandingPageConfig = {
  campaign: "dental_implants_ipanema_en",

  messageMatch: {
    adGroup: "dental_implants_en",
    keyword: "dental implants ipanema rio"
  },

  whatsapp: {
    number: "5521993304045",
    message: "Hello! I'm interested in dental implants with Dr. Carla Christoph. Can you help me?"
  },

  hero: {
    headline: "Replace Missing Teeth with Confidence — in Ipanema, Rio de Janeiro",
    subheadline: "Dental implants by Dr. Carla Christoph — specialist in prosthodontics and implant dentistry with 20+ years in Ipanema. 3D digital planning for predictable, lasting results.",
    // Onda 4 (jul/2026): CTA encurtado ("We Reply in Your Language" virou pill do hero)
    ctaText: "Book Your Implant Consultation",
    backgroundImage: "/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
  },

  benefits: [
    "Specialist in implant dentistry — 20+ years of experience",
    "3D digital planning with iTero 5D scanner",
    "Same dentist from planning to final prosthesis",
    "Minimum 1-hour appointments — no rushed procedures",
    "Internationally recognized implant brands",
    "We reply in your language via WhatsApp"
  ],

  problem: {
    title: "Does any of this sound familiar?",
    description: "Whether you're visiting Rio or living here, missing teeth affect more than just your smile. These are the most common concerns we hear from international patients considering implants:",
    problems: [
      "You avoid certain foods because chewing is painful or your denture loosens — meals that used to be enjoyable now feel like a challenge.",
      "You feel self-conscious about gaps in your smile — you've stopped smiling in photos or cover your mouth when laughing.",
      "Your removable denture requires daily adhesive and still slips when you speak — you've adapted, but it's exhausting.",
      "You've been told you need bone grafting and are unsure if implants are even possible — you want an honest, realistic assessment."
    ]
  },

  guide: {
    title: "How Dr. Carla Christoph Approaches Dental Implants",
    subtitle: "Every implant case follows a structured, evidence-based protocol — CRO-RJ 27.509. No rushed decisions.",
    steps: [
      { number: "1", title: "Digital Assessment & Planning", description: "Full examination with iTero Element 5D scanner and imaging analysis. We evaluate bone quality, quantity, and overall health to determine the best implant strategy for your case." },
      { number: "2", title: "Implant Placement", description: "Minimally invasive surgery under local anesthesia. The titanium implant is precisely positioned based on digital planning. Provisional prosthesis provided when indicated." },
      { number: "3", title: "Osseointegration Period", description: "3 to 6 months for the implant to fuse with your jawbone. You wear a provisional prosthesis during this time. Dr. Carla monitors healing via periodic check-ups." },
      { number: "4", title: "Final Prosthesis & Follow-Up", description: "Digital impression for your definitive ceramic crown, bridge, or full-arch prosthesis. Natural color, shape, and function restored. Remote follow-up available via WhatsApp after you return home." }
    ]
  },

  socialProof: {
    title: "What Our Patients Say",
    // Onda 4 (jul/2026): depoimentos temáticos de implante — traduções fiéis dos
    // depoimentos reais do config PT (implantesDentariosConfig); Gerald/Haley
    // deixam de se repetir nas 4 LPs EN
    testimonials: [
      { name: "Marina P. — Ipanema", text: "I needed a full rehabilitation with implants and prosthetics. Dr. Carla planned everything digitally and the result exceeded my expectations. She followed each step personally. (translated from Portuguese)" },
      { name: "Roberto S. — Copacabana", text: "I spent years with a removable denture and had resigned myself to it. After the implant, I can eat everything again — it feels like getting back something I thought I had lost. (translated from Portuguese)" },
      { name: "Márcia L. — Ipanema", text: "I was very afraid of the surgery, but it was easier than having a tooth pulled. What surprised me most was the follow-up — Dr. Carla was present at every step. (translated from Portuguese)" }
    ],
    stats: [
      { number: "20+", label: "Years of Experience" },
      { number: "95%+", label: "Implant Success Rate" },
      { number: "iTero 5D", label: "Digital Scanner" },
      { number: "24h", label: "WhatsApp Available" }
    ]
  },

  faq: {
    title: "Common Questions About Dental Implants",
    questions: [
      { question: "Is it safe to get dental implants in Brazil?", answer: "Absolutely. Brazilian implant dentistry is world-renowned. Dr. Carla Christoph is registered with CRO-RJ (27.509), uses internationally recognized implant brands with FDA clearance, and follows strict sterilization protocols that meet international standards. The iTero Element 5D scanner enables precise 3D digital planning." },
      { question: "How many appointments will I need?", answer: "The initial evaluation and implant placement typically require 2-3 visits over a few days. After the osseointegration period (3-6 months), you'll return for 2-3 more visits for the final prosthesis. We can coordinate your treatment around your travel dates." },
      { question: "Is the implant procedure painful?", answer: "The surgery is performed under local anesthesia — you feel no pain during the procedure. Post-operative recovery is generally smooth, with mild discomfort managed by medication. Most patients return to normal activities within 2-3 days." },
      { question: "Can I get implants if I have limited bone?", answer: "Yes. Bone grafting techniques or sinus lift procedures can increase bone volume when needed. Short or angled implants (as in All-on-4 protocols) are also alternatives. Imaging analysis during your evaluation determines the best approach." },
      { question: "What if I have a problem after I return home?", answer: "We maintain contact via WhatsApp after your treatment. If any issue arises, we consult remotely with photos and video. For cases requiring in-person attention, we coordinate with trusted colleagues worldwide." },
      { question: "Can I get a virtual consultation before traveling?", answer: "Yes. Send us photos and X-rays via WhatsApp. Dr. Carla will review your case and provide an initial assessment with estimated timeline and treatment plan — all before you book your flight." }
    ]
  },

  cta: {
    title: "Ready to Restore Your Smile with Dental Implants?",
    subtitle: "Send us a message on WhatsApp with your X-rays or a photo. Dr. Carla will personally review your case and respond — in your language.",
    buttonText: "Book Your Implant Consultation",
    urgency: "Private practice in Ipanema — every patient is seen personally by Dr. Carla from evaluation to final prosthesis."
  },

  contact: {
    whatsappNumber: "5521993304045",
    whatsappMessage: "Hello! I'm interested in dental implants with Dr. Carla Christoph. Can you help me?",
    doctorName: "Dr. Carla Christoph",
    clinicName: "Ipanema Elegance Dental"
  },

  seo: {
    title: "Dental Implants in Ipanema, Rio de Janeiro | Dr. Carla Christoph",
    description: "Dental implants in Ipanema by Dr. Carla Christoph — specialist in implant dentistry with 20+ years experience. 3D digital planning, internationally recognized brands, minimally invasive techniques. We reply in your language.",
    keywords: ["dental implants ipanema", "dental implants rio de janeiro", "implant dentist brazil", "all on 4 rio", "dental tourism brazil implants", "dentist ipanema english"]
  },

  tracking: {
    gtmId: "GTM-WZRDNBKQ",
    gtagId: "AW-16894364517"
  }
};
