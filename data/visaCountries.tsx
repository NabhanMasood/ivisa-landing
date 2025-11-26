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
    Schengen: {
      name: 'Schengen',
      flag: '🇪🇺',
      heroImage: '/images/turkey-article.jpg',
      title: 'Discover Europe with One Visa',
      introduction: "Dreaming of your next European adventure? Whether it's gliding through Venice's canals, attending a conference in Paris, or reuniting with loved ones in Spain — the Schengen Visa (Type C) is your single ticket to 29 European countries.",
      sections: {
        whatIs: {
          title: 'What is a Schengen Visa (Type C)?',
          content: "The Schengen Visa (Type C) lets you travel freely across all countries in the Schengen Zone with one application. It's designed for travelers from nations that don't have visa-free access to Europe, allowing short stays for tourism, business, or personal visits."
        },
        documents: [
          'A completed visa application form',
          'A valid passport (issued within the last 10 years and valid at least 3 months beyond your stay)',
          'Two recent passport-size photos',
          'Travel insurance covering at least €30,000',
          'Confirmed flight booking or travel itinerary',
          'Proof of accommodation (hotel reservation or invitation letter)',
          'Evidence of financial stability (bank statements or payslips)',
          'A brief cover letter explaining your travel purpose',
          'Additional documents depending on your visit type'
        ],
        visaTypes: [
          { name: 'Tourist Visa', description: 'for vacations and sightseeing across Europe' },
          { name: 'Business Visa', description: 'for meetings, events, and conferences' },
          { name: 'Family Visit Visa', description: 'for visiting relatives or friends' },
          { name: 'Cultural/Sports Visa', description: 'for attending events, performances, or competitions' },
          { name: 'Medical Visa', description: 'for receiving medical treatment in Europe' }
        ],
        howToApply: [
          "Identify the country where you'll spend most of your trip and apply through its embassy or visa center.",
          'Collect all the required documents listed above.',
          'Fill out the Schengen visa application form carefully.',
          'Book your appointment at the relevant visa center.',
          'Attend your appointment and submit your biometrics.',
          'Pay the visa fee as per embassy guidelines.',
          'Wait for your visa decision.'
        ],
        whyVisa123: 'Visa123 simplifies the entire process with step-by-step guidance, document checks, and expert support — making your Schengen visa application faster and easier than ever.'
      }
    },

    UK: {
      name: 'UK ETA',
      flag: '🇬🇧',
      heroImage: '/images/uk-article.jpg',
      title: 'Travel to the UK with ETA',
      introduction: "Planning a trip to the United Kingdom? The UK ETA (Electronic Travel Authorisation) is your digital gateway to exploring England, Scotland, Wales, and Northern Ireland. Whether you're visiting for tourism, business, short-term study, or transit, this online authorization simplifies your entry process.",
      sections: {
        whatIs: {
          title: 'What is UK ETA?',
          content: "The UK ETA (Electronic Travel Authorisation) is an online approval required for travelers from visa-free countries before visiting the UK. It allows you to enter the UK for short stays including tourism, business activities, short-term study, or transit purposes. Once approved, your ETA is electronically linked to your passport, eliminating the need for additional documents upon arrival."
        },
        documents: [
          'A valid passport from an eligible country',
          'Digital copy of your passport\'s photo page',
          'Recent headshot photo of yourself',
          'Personal details including full name, date of birth, nationality, and contact information',
          'Travel details including trip dates and purpose of visit',
          'Access to a smartphone or computer to complete the online application'
        ],
        visaTypes: [
          { name: 'Tourism', description: 'for sightseeing, visiting attractions, and exploring the UK' },
          { name: 'Business', description: 'for attending meetings, conferences, and business activities' },
          { name: 'Short-term Study', description: 'for educational courses and training programs up to 6 months' },
          { name: 'Transit', description: 'for passing through the UK to another destination' }
        ],
        howToApply: [
          'Start your application online through the official UK ETA portal.',
          'Enter all your personal details accurately, including name, birthdate, nationality, and contact information.',
          'Upload a clear digital copy of your passport\'s photo page and a recent headshot photo.',
          'Answer all questions about your trip details and background information truthfully.',
          'Pay the application fee securely using a credit card or mobile payment method.',
          'Save your confirmation email. Your UK ETA will be electronically linked to your passport once approved.'
        ],
        whyVisa123: 'Visa123 streamlines your UK ETA application with expert guidance, document verification, and 24/7 support. Our experienced team ensures your application is complete and accurate, helping you avoid delays and get approved faster.'
      }
    },

    USA: {
      name: 'US ESTA',
      flag: '🇺🇸',
      heroImage: '/images/usa-article.jpg',
      title: 'Travel to the USA with ESTA',
      introduction: "Ready to explore the United States? The US ESTA (Electronic System for Travel Authorization) is your digital travel authorization for visiting America. Whether you're planning a vacation, business trip, or transit through the US, ESTA allows eligible travelers from Visa Waiver Program countries to visit for up to 90 days without a traditional visa.",
      sections: {
        whatIs: {
          title: 'What is US ESTA?',
          content: "ESTA (Electronic System for Travel Authorization) is a web-based system administered by the U.S. Department of Homeland Security. It determines the eligibility of visitors to travel to the United States under the Visa Waiver Program (VWP) without requiring a traditional visa. ESTA is not a visa, but rather a travel authorization that allows eligible travelers to visit the US for tourism, business, or transit purposes for up to 90 days."
        },
        documents: [
          'A valid electronic passport from a Visa Waiver Program (VWP) country',
          'A valid email address for receiving your ESTA confirmation',
          'Credit or debit card for payment of the application fee',
          'Basic personal information including full name, date of birth, and nationality',
          'Travel information including trip dates and purpose of visit',
          'Emergency contact details',
          'Employment information'
        ],
        visaTypes: [
          { name: 'Tourism', description: 'for vacations, sightseeing, and visiting attractions across the United States' },
          { name: 'Business', description: 'for attending meetings, conferences, and business activities' },
          { name: 'Transit', description: 'for passing through the United States to another destination' }
        ],
        howToApply: [
          'Apply online through the official ESTA portal or with Visa123\'s streamlined application service.',
          'Enter your passport and travel information accurately, ensuring all details match your passport exactly.',
          'Provide your personal details, emergency contact information, and employment details.',
          'Pay the application fee securely using a credit or debit card.',
          'Submit your application and wait for approval, which is typically processed within minutes to 72 hours.',
          'Save your ESTA confirmation email. Your ESTA is electronically linked to your passport and valid for multiple trips over two years.'
        ],
        whyVisa123: 'Visa123 makes your US ESTA application simple and stress-free. Our expert team guides you through every step, ensures your information is accurate, and provides 24/7 support. With our streamlined process, you can get approved quickly and travel to the USA with confidence.'
      }
    },

    Turkey: {
      name: 'Turkey e-Visa',
      flag: '🇹🇷',
      heroImage: '/images/turkey-article.jpg',
      title: 'Travel to Turkey with e-Visa',
      introduction: "Ready to explore the rich history and stunning landscapes of Turkey? The Turkey e-Visa is your electronic visa that's linked directly to your passport, allowing you to enter Turkey for up to 90 days. Whether you're visiting for tourism, business, or transit, the entire application process is quick and completed entirely online.",
      sections: {
        whatIs: {
          title: 'What is a Turkey e-Visa?',
          content: "A Turkey e-Visa is an electronic visa linked to your passport that allows you to enter Turkey for up to 90 days for tourism, business, or transit purposes. The whole process is completed online and is quick and straightforward. Once approved, your e-Visa is electronically linked to your passport, making travel to Turkey simple and convenient."
        },
        documents: [
          'A valid passport with at least 6 months validity from your date of entry',
          'A valid email address for receiving your e-Visa confirmation',
          'Credit or debit card for payment of the visa fee',
          'Travel itinerary including flight details and accommodation information',
          'Passport-sized digital photograph',
          'Additional documents may be required based on your nationality'
        ],
        visaTypes: [
          { name: 'Tourism', description: 'for sightseeing, visiting historical sites, and exploring Turkey\'s beautiful destinations' },
          { name: 'Business', description: 'for attending meetings, conferences, and business activities' },
          { name: 'Transit', description: 'for passing through Turkey to another destination' }
        ],
        howToApply: [
          'Start your application online through the official Turkey e-Visa portal or with Visa123\'s streamlined service.',
          'Upload a clear scan of your passport\'s photo page, ensuring all details are visible and legible.',
          'Pay the visa fee securely using your credit or debit card.',
          'Get your e-Visa by email within 24 hours of submission. Most applications are processed much faster.',
          'Print your e-Visa or save it on your mobile device and present it when you arrive in Turkey.'
        ],
        whyVisa123: 'Visa123 simplifies your Turkey e-Visa application with expert guidance and document verification. Our experienced team ensures your application is complete and accurate, helping you get approved quickly. With our 24/7 support and streamlined process, you can travel to Turkey with confidence and peace of mind.'
      }
    },

    Morocco: {
      name: 'Morocco eVisa',
      flag: '🇲🇦',
      heroImage: '/images/morocco-article.jpg',
      title: 'Travel to Morocco with eVisa',
      introduction: "Ready to explore the vibrant culture and stunning landscapes of Morocco? The Morocco eVisa is your fully online electronic visa that's digitally linked to your passport. With approval in as fast as 24 to 72 hours and no embassy visits required, getting your Morocco eVisa is quick, easy, and convenient.",
      sections: {
        whatIs: {
          title: 'What is Morocco eVisa?',
          content: "Morocco eVisa is a fully online electronic visa that's digitally linked to your passport. The entire application process is completed online with no need to visit an embassy. Your eVisa is valid for 180 days from issue and allows you to stay in Morocco for up to 30 days (can be extended). The application is quick, with approval typically received within 24 to 72 hours."
        },
        documents: [
          'A valid passport with at least 6 months validity from your date of entry',
          'Digital passport photo (recent, color photograph)',
          'Confirmed accommodation details (hotel reservation or invitation letter)',
          'Return flight tickets or travel itinerary',
          'Proof of sufficient funds (bank statements or financial documents)',
          'A valid email address for receiving your eVisa confirmation',
          'Credit or debit card for payment of the visa fee'
        ],
        visaTypes: [
          { name: 'Tourism', description: 'for sightseeing, exploring Morocco\'s cities, and experiencing its rich culture' },
          { name: 'Business', description: 'for attending meetings, conferences, and business activities' },
          { name: 'Transit', description: 'for passing through Morocco to another destination' }
        ],
        howToApply: [
          'Start your application online through the official Morocco eVisa portal or with Visa123\'s streamlined service.',
          'Upload a clear scan of your passport and a recent digital passport photo, ensuring all details are visible.',
          'Pay the visa fee securely using your credit or debit card.',
          'Get a confirmation email with your application number for tracking your status.',
          'Wait 1-3 working days for approval. Most applications are processed within 24 to 72 hours.',
          'Download and print your eVisa PDF once approved. Apply at least 7 days before your travel date to ensure timely processing.'
        ],
        whyVisa123: 'Visa123 makes your Morocco eVisa application simple and stress-free. With our fully online process, you can apply from anywhere without visiting an embassy. Our expert team guides you through every step, ensures your documents are complete, and provides 24/7 support. Get approved in as fast as 24 to 72 hours and travel to Morocco with confidence.'
      }
    },
 
  }
  
  export const getCountryData = (slug: string): CountryData => {
    // Normalize slug to match keys (handle case variations)
    const normalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase()
    const country = visaCountries[normalizedSlug] || visaCountries[slug]
    if (!country) {
      // Default fallback
      return visaCountries['Schengen'] as CountryData
    }
    return country
  }
