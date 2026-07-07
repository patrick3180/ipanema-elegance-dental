import { LandingPageConfig } from "@/types/LandingPageConfig";

export const enGeneralConsultationLPConfig: LandingPageConfig = {
  campaign: "general_consultation_ipanema_en",

  messageMatch: {
    adGroup: "general_consultation_en",
    keyword: "dentist ipanema rio english"
  },

  whatsapp: {
    number: "5521993304045",
    message: "Hello! I'd like to book a dental checkup with Dr. Carla Christoph."
  },

  hero: {
    headline: "Your Dentist in Ipanema — Checkups, Cleaning & Preventive Care",
    subheadline: "Comprehensive dental exams with 3D digital scanning, professional cleaning, and personalized care plans — all in a private practice that dedicates a minimum of 1 full hour to every appointment.",
    ctaText: "Book Your Checkup via WhatsApp",
    backgroundImage: "/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
  },

  benefits: [
    "1-hour minimum appointments — never rushed",
    "iTero Element 5D digital scanner — no traditional molds",
    "20+ years of clinical experience in Ipanema",
    "Private practice — personalized, one-on-one attention",
    "Fluent in English, Portuguese & Spanish",
    "Transparent pricing — no surprises"
  ],

  problem: {
    title: "Why Patients Put Off Checkups",
    description: "We hear the same concerns every week — and we've designed our practice to address each one directly:",
    problems: [
      "\"I just don't have time for the dentist.\" — We respect your schedule. Appointments are punctual, efficient, and completed within 1 hour — including cleaning and exam.",
      "\"Nothing hurts, so I must be fine.\" — Most dental problems are painless in the early stages. Cavities, gum disease, and even cracks develop silently until they become expensive to treat.",
      "\"I had a bad experience before.\" — We hear this often. Dr. Carla explains every step before proceeding and creates a calm, unhurried environment with no pressure.",
      "\"I'm only in Rio temporarily — can I even see a dentist?\" — Absolutely. Many of our patients are expats, digital nomads, and tourists. We communicate in your language and provide all documentation you need."
    ]
  },

  guide: {
    title: "What to Expect at Your Appointment",
    subtitle: "A clear, structured approach — no surprises, no upselling.",
    steps: [
      { number: "1", title: "3D Digital Scan", description: "We begin with a full intraoral scan using the iTero Element 5D — capturing a precise 3D model of your teeth, gums, and bite alignment without radiation or discomfort." },
      { number: "2", title: "Clinical Examination", description: "Dr. Carla performs a thorough inspection of each tooth, checking for cavities, cracks, gum recession, and early signs of oral conditions." },
      { number: "3", title: "Professional Cleaning", description: "Ultrasonic scaling removes tartar and plaque — especially in areas brushing and flossing can't reach — followed by polishing for a smooth, fresh feel." },
      { number: "4", title: "Prevention Plan", description: "Based on the findings, we create a personalized plan: recommended visit schedule, any needed treatments with clear pricing, and oral hygiene guidance." }
    ]
  },

  socialProof: {
    title: "What Our Patients Say",
    // Onda 4 (jul/2026): Gerald (real, check-up/limpeza — tema da LP) + tradução
    // fiel de depoimento real do config PT (dorDeDenteConfig, diagnóstico honesto)
    testimonials: [
      { name: "Gerald G. — United Kingdom", text: "Excellent dentist, very gentle, calm and will explain the process with you. The office space is very clean. I had my teeth cleaned, dental X-rays, 3 porcelain fillings and the outcome was brilliant. I had 2 sensitive teeth and she managed to rectify that for me." },
      { name: "Roberto C. — Copacabana", text: "I thought I was going to need a root canal. Dr. Carla evaluated everything calmly and it was actually just a leaking filling. She fixed it on the spot. (translated from Portuguese)" }
    ],
    stats: [
      { number: "20+", label: "Years of Experience" },
      { number: "1h", label: "Minimum per Appointment" },
      { number: "iTero 5D", label: "Digital Scanner" },
      { number: "90%", label: "Of Oral Diseases Are Preventable" }
    ]
  },

  faq: {
    title: "Frequently Asked Questions",
    questions: [
      { question: "What does a dental checkup include?", answer: "A comprehensive exam including clinical inspection, digital 3D scan with the iTero Element 5D, risk assessment for cavities and gum disease, professional cleaning (scaling and polishing), and personalized oral hygiene guidance." },
      { question: "How often should I schedule a checkup?", answer: "For most adults, every 6 months is recommended. Patients with a history of gum disease or higher cavity risk may benefit from visits every 3–4 months. We'll recommend the right schedule for your needs." },
      { question: "Does dental cleaning hurt?", answer: "Ultrasonic cleaning is very comfortable — most patients describe only a mild vibration. For very sensitive areas, we can apply topical numbing gel." },
      { question: "Do you accept dental insurance?", answer: "We are a private practice. This allows us to dedicate proper time to each patient and use only high-quality materials. We provide clear, detailed cost estimates before any treatment begins." },
      { question: "What should I bring to my first appointment?", answer: "Bring any recent dental X-rays or records you may have and a list of medications you're currently taking. If you don't have any of these, no worries — we'll gather everything we need during your visit." },
      { question: "How long does a checkup appointment take?", answer: "We dedicate a minimum of 1 hour for every checkup. This ensures time for a thorough examination, unhurried cleaning, and a proper discussion of findings and any treatment options." }
    ]
  },

  cta: {
    title: "Due for a Checkup?",
    subtitle: "Prevention is the most intelligent investment in oral health. Book your exam and cleaning — we'll take the time to explain everything we find.",
    buttonText: "Book on WhatsApp",
    urgency: "Private practice in Ipanema — Dr. Carla sees you personally. Mon–Fri, 9 AM–6 PM."
  },

  contact: {
    whatsappNumber: "5521993304045",
    whatsappMessage: "Hello! I'd like to book a dental checkup with Dr. Carla Christoph.",
    doctorName: "Dr. Carla Christoph",
    clinicName: "Ipanema Elegance Dental"
  },

  seo: {
    title: "Dental Checkup & Cleaning in Ipanema | Dr. Carla Christoph",
    description: "Comprehensive dental checkup with 3D digital scanning, professional cleaning, and personalized prevention plans in Ipanema, Rio de Janeiro. 1-hour appointments. Book via WhatsApp.",
    keywords: ["dentist ipanema", "dental checkup rio de janeiro", "teeth cleaning ipanema", "dentist english rio", "dentist checkup brazil", "preventive dentistry ipanema"]
  },

  tracking: {
    gtmId: "GTM-WZRDNBKQ",
    gtagId: "AW-16894364517"
  }
};
