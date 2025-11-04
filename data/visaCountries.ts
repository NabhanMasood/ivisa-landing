// data/visaCountries.ts

export interface VisaType {
    name: string
    description: string
  }
  
  export interface CountryData {
    name: string
    flag: string
    heroImage: string
    title: string
    introduction: string
    sections: {
      whatIs: {
        title: string
        content: string
      }
      documents: string[]
      visaTypes: VisaType[]
      howToApply: string[]
      whyVisa123: string
    }
  }
  
  export const visaCountries: Record<string, CountryData> = {
    turkey: {
      name: 'Turkey',
      flag: '🇹🇷',
      heroImage: '/images/turkey-article.jpg',
      title: 'Discover Turkey with Confidence',
      introduction: 'Dreaming of exploring Turkey? From Istanbul\'s historic sites to Cappadocia\'s stunning landscapes, Turkey offers an unforgettable experience for every traveler.',
      sections: {
        whatIs: {
          title: 'What is a Turkey Visa?',
          content: 'The Turkey e-Visa allows travelers to visit Turkey for tourism or business purposes. It\'s a quick and convenient online process that lets you obtain your visa before departure.'
        },
        documents: [
          'A valid passport (valid for at least 6 months)',
          'A completed online visa application',
          'A valid email address',
          'Payment method for visa fee',
          'Return flight ticket',
          'Hotel reservation or accommodation proof'
        ],
        visaTypes: [
          { name: 'Tourist Visa', description: 'for vacations and sightseeing' },
          { name: 'Business Visa', description: 'for business meetings and conferences' },
          { name: 'Transit Visa', description: 'for passing through Turkey' }
        ],
        howToApply: [
          'Visit the Turkey e-Visa website',
          'Fill out the online application form',
          'Upload required documents',
          'Pay the visa fee online',
          'Receive your e-Visa via email',
          'Print your e-Visa and carry it with you'
        ],
        whyVisa123: 'Visa123 simplifies your Turkey visa application with expert guidance, quick processing, and 24/7 support to ensure a smooth experience.'
      }
    },
  
    spain: {
      name: 'Spain',
      flag: '🇪🇸',
      heroImage: '/images/spain-hero.jpg',
      title: 'Explore Spain with Ease',
      introduction: 'Planning your Spanish adventure? From the beaches of Barcelona to the cultural richness of Madrid, Spain welcomes you with open arms.',
      sections: {
        whatIs: {
          title: 'What is a Spanish Schengen Visa?',
          content: 'The Spanish Schengen Visa allows you to visit Spain for tourism, business, or visiting family and friends. As part of the Schengen area, it also grants access to other Schengen countries.'
        },
        documents: [
          'A completed visa application form',
          'A valid passport (valid for at least 3 months beyond stay)',
          'Two recent passport-size photos',
          'Travel insurance covering €30,000',
          'Flight bookings',
          'Hotel reservations or invitation letter',
          'Proof of financial means',
          'Cover letter explaining travel purpose'
        ],
        visaTypes: [
          { name: 'Tourist Visa', description: 'for exploring Spanish culture and attractions' },
          { name: 'Business Visa', description: 'for business meetings and conferences' },
          { name: 'Family Visit Visa', description: 'for visiting family members' },
          { name: 'Cultural/Sports Visa', description: 'for events and performances' }
        ],
        howToApply: [
          'Complete the online application form',
          'Gather required documents',
          'Schedule an appointment at the Spanish consulate',
          'Attend your appointment and submit biometrics',
          'Pay the visa fee',
          'Wait for visa decision (usually 15 days)'
        ],
        whyVisa123: 'Visa123 makes applying for your Spanish visa simple with expert guidance, document verification, and appointment scheduling assistance.'
      }
    },
  
    france: {
      name: 'France',
      flag: '🇫🇷',
      heroImage: '/images/france-hero.jpg',
      title: 'Experience France Like Never Before',
      introduction: 'Dream of strolling through Paris, tasting wine in Bordeaux, or skiing in the Alps? A French visa opens doors to these unforgettable experiences.',
      sections: {
        whatIs: {
          title: 'What is a French Schengen Visa?',
          content: 'The French Schengen Visa permits short stays in France and other Schengen countries for tourism, business, or family visits, typically up to 90 days within a 180-day period.'
        },
        documents: [
          'Completed Schengen visa application form',
          'Valid passport (at least 3 months beyond intended stay)',
          'Two passport photographs',
          'Travel health insurance (minimum €30,000 coverage)',
          'Proof of accommodation in France',
          'Round-trip flight reservation',
          'Bank statements (last 3-6 months)',
          'Employment letter or business documents',
          'Cover letter stating purpose of visit'
        ],
        visaTypes: [
          { name: 'Tourist Visa', description: 'for leisure travel and sightseeing' },
          { name: 'Business Visa', description: 'for professional meetings and conferences' },
          { name: 'Family/Friend Visit', description: 'for visiting relatives or friends' },
          { name: 'Cultural Visa', description: 'for cultural events and activities' }
        ],
        howToApply: [
          'Determine which French consulate has jurisdiction over your area',
          'Complete the online visa application',
          'Collect all required supporting documents',
          'Schedule your visa appointment',
          'Attend the appointment and provide biometrics',
          'Pay the applicable visa fee',
          'Track your application and await decision'
        ],
        whyVisa123: 'Visa123 streamlines your French visa journey with personalized support, document review, and expert advice to maximize your approval chances.'
      }
    },
  
    italy: {
      name: 'Italy',
      flag: '🇮🇹',
      heroImage: '/images/italy-hero.jpg',
      title: 'Discover Italy\'s Timeless Beauty',
      introduction: 'From Rome\'s ancient history to Venice\'s romantic canals and Tuscany\'s rolling hills, Italy captivates every visitor. Start your Italian journey with the right visa.',
      sections: {
        whatIs: {
          title: 'What is an Italian Schengen Visa?',
          content: 'The Italian Schengen Visa allows entry to Italy and free movement across the Schengen Zone for up to 90 days within a 180-day period for tourism, business, or family visits.'
        },
        documents: [
          'Completed and signed visa application form',
          'Valid passport (minimum 6 months validity)',
          'Two recent color photographs',
          'Travel medical insurance (€30,000 minimum)',
          'Proof of accommodation (hotel bookings or invitation)',
          'Flight itinerary',
          'Financial proof (bank statements, sponsorship letter)',
          'Employment verification or student enrollment',
          'Travel itinerary and purpose letter'
        ],
        visaTypes: [
          { name: 'Tourist Visa', description: 'for vacations and exploring Italy' },
          { name: 'Business Visa', description: 'for business activities and meetings' },
          { name: 'Visit Visa', description: 'for visiting family or friends' },
          { name: 'Medical Visa', description: 'for medical treatment in Italy' }
        ],
        howToApply: [
          'Identify the Italian consulate serving your region',
          'Fill out the visa application accurately',
          'Prepare all supporting documents',
          'Book your visa appointment online',
          'Attend your appointment with all documents',
          'Submit biometric data',
          'Pay the visa processing fee',
          'Wait for your visa (typically 10-15 working days)'
        ],
        whyVisa123: 'Visa123 takes the stress out of Italian visa applications with comprehensive guidance, document checks, and real-time application tracking.'
      }
    },
  
    germany: {
      name: 'Germany',
      flag: '🇩🇪',
      heroImage: '/images/germany-hero.jpg',
      title: 'Experience Germany\'s Innovation and Culture',
      introduction: 'Whether you\'re visiting Berlin\'s vibrant culture, Munich\'s festivals, or Germany\'s beautiful countryside, the German Schengen visa is your gateway to this incredible destination.',
      sections: {
        whatIs: {
          title: 'What is a German Schengen Visa?',
          content: 'The German Schengen Visa permits travelers to visit Germany and other Schengen countries for tourism, business, or personal reasons for stays up to 90 days within 180 days.'
        },
        documents: [
          'Fully completed visa application form',
          'Valid passport (at least 3 months after planned departure)',
          'Two biometric passport photos',
          'Travel health insurance (€30,000 coverage)',
          'Proof of accommodation in Germany',
          'Flight reservations (round trip)',
          'Financial evidence (bank statements, payslips)',
          'Employment letter or school enrollment',
          'Detailed travel itinerary',
          'Cover letter explaining visit purpose'
        ],
        visaTypes: [
          { name: 'Tourist Visa', description: 'for sightseeing and leisure travel' },
          { name: 'Business Visa', description: 'for business trips and conferences' },
          { name: 'Visitor Visa', description: 'for visiting relatives or friends' },
          { name: 'Medical Treatment Visa', description: 'for medical purposes' },
          { name: 'Cultural/Sports Visa', description: 'for attending events' }
        ],
        howToApply: [
          'Find your nearest German embassy or consulate',
          'Complete the visa application online',
          'Gather all required documentation',
          'Schedule your visa appointment',
          'Attend your appointment and submit documents',
          'Provide fingerprints and photo',
          'Pay the visa fee',
          'Track your application status online',
          'Collect your passport with visa'
        ],
        whyVisa123: 'Visa123 offers end-to-end support for your German visa application, including document preparation, appointment booking, and expert consultation to ensure success.'
      }
    }
  }
  
  export const getCountryData = (slug: string): CountryData => {
    return visaCountries[slug] ?? visaCountries.turkey
  }