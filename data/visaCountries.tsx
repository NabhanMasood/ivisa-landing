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
      whoNeeds?: {
        title: string
        content: string
      }
      goodToKnow?: string[]
      documents: string[]
      visaTypes: VisaType[]
      howToApply: string[]
      whyVisa123: string
    }
  }
  
  export const visaCountries: Record<string, CountryData> = {
    Schengen: {
      name: 'Schengen Visa',
      flag: '🇪🇺',
      heroImage: '/images/germany-bg.jpg',
      title: 'Schengen Visa (Type C)',
      introduction: "Dreaming of a European getaway? Whether it is exploring the canals of Venice, attending a business meeting in Paris, or visiting family in Spain, the Schengen visa (Type C) makes it all possible with just one application.",
      sections: {
        whatIs: {
          title: 'What is a Schengen visa (Type C)?',
          content: "A Schengen visa (Type C) allows short visits to countries in the Schengen Area without needing separate visas for each country. It is needed if you come from a country that does not have visa-free travel to Europe."
        },
        documents: [
          'Completed application form',
          'Valid passport (issued in last 10 years, valid for 3 months after your trip)',
          'Two recent passport photos',
          'Travel insurance covering at least €30,000',
          'Flight tickets or reservation',
          'Proof of accommodation (hotel bookings or invitation)',
          'Proof of funds (bank statements or payslips)',
          'Cover letter explaining your visit',
          'Extra documents depending on your visit reason'
        ],
        visaTypes: [
          { name: 'Tourist visa', description: 'for vacations and sightseeing' },
          { name: 'Business visa', description: 'for meetings and conferences' },
          { name: 'Family visit visa', description: 'to see relatives or friends' },
          { name: 'Cultural and sports visa', description: 'for events and competitions' },
          { name: 'Medical visa', description: 'for treatment in Europe' }
        ],
        howToApply: [
          'Choose the country where you will spend most time & start your application',
          'Collect all required documents',
          'Fill out the application form',
          'Book a visa appointment at the embassy or visa center',
          'Attend the appointment and provide documents and biometrics',
          'Pay the visa fee',
          'Wait for the decision'
        ],
        whyVisa123: 'Visa123 simplifies the entire process with step-by-step guidance, document checks, and expert support — making your Schengen visa application faster and easier than ever.'
      }
    },

    UK: {
      name: 'UK Visit Visa',
      flag: '🇬🇧',
      heroImage: '/images/uk-bg.jpg',
      title: 'UK Visit Visa',
      introduction: "Travelling to the UK? Whether for fun, family, or business, the UK Visit Visa lets you step inside and explore.",
      sections: {
        whatIs: {
          title: 'UK Visit Visa explained',
          content: "A UK Visit Visa, officially called a Standard Visitor Visa, allows people to travel to the United Kingdom for a short stay. It is meant for tourism, visiting family or friends, short business activities, academic reasons, medical treatment, or passing through the UK on the way to another country.\n\nThis visa usually allows you to stay in the UK for up to 6 months, though longer-term visit visas (2, 5, or 10 years) are available for frequent travelers.\n\nYou must leave the UK before your visa expires and cannot work or live permanently while on this visa."
        },
        goodToKnow: [
          'You cannot work, claim public funds, or stay longer than allowed',
          'You must prove that you will leave the UK at the end of your visit',
          'Your visa can be refused if you do not provide enough proof of your purpose or funds',
          'If you are from a visa-free country, you may need an ETA (Electronic Travel Authorisation) before travel'
        ],
        documents: [
          'Have a valid passport (with at least one blank page)',
          'Fill out the online visa application form',
          'Provide a recent passport-sized photo',
          'Show proof you can pay for your trip (bank statements, payslips, or sponsor\'s documents)',
          'Provide details of where you will stay (hotel booking or invitation from family/friends)',
          'Show your travel plans, including return flight tickets',
          'Submit a letter from your employer or proof of self-employment',
          'Add documents based on your visit purpose (like invitation letters, medical appointment confirmation, or business event details)'
        ],
        visaTypes: [
          { name: 'General Visit Visa', description: 'For tourism, visiting family/friends, or business activities' },
          { name: 'Business Visit Visa', description: 'For business meetings, conferences, and professional activities' },
          { name: 'Medical Visit Visa', description: 'For private medical treatment in the UK' },
          { name: 'Student Visit', description: 'For short term study like an English language course' },
          { name: 'Academic Visit Visa', description: 'For academic activities, research, or conferences' },
          { name: 'Transit Visa', description: 'For passing through the UK to another country' }
        ],
        howToApply: [
          'Apply online',
          'Pay the fee',
          'Book a biometric appointment',
          'Prepare documents',
          'Attend your appointment',
          'Wait for a decision'
        ],
        whyVisa123: 'Visa123 streamlines your UK Visit Visa application with expert guidance, document verification, and 24/7 support. Our experienced team ensures your application is complete and accurate, helping you avoid delays and get approved faster.'
      }
    },

    USA: {
      name: 'US ESTA',
      flag: '🇺🇸',
      heroImage: '/images/usa-bg.jpg',
      title: 'US ESTA',
      introduction: "US ESTA lets you visit the United States without a visa. It's fast, simple, and done completely online.",
      sections: {
        whatIs: {
          title: 'What is US ESTA?',
          content: "ESTA (Electronic System for Travel Authorization) is a web-based system administered by the U.S. Department of Homeland Security. It determines the eligibility of visitors to travel to the United States under the Visa Waiver Program (VWP) without requiring a traditional visa.\n\nESTA is not a visa, but rather a travel authorization that allows eligible travelers to visit the US for tourism, business, or transit purposes for up to 90 days."
        },
        whoNeeds: {
          title: 'Who needs US ESTA?',
          content: "You need ESTA if you are a citizen of a Visa Waiver Program (VWP) country. VWP countries include: United Kingdom, Germany, France, Japan, Australia, South Korea, and many others (42 countries total). You also need ESTA if you are traveling to the US for tourism, business, or transit, planning to stay for 90 days or less, and traveling by air or sea to the United States."
        },
        documents: [
          'Valid electronic passport from a VWP country',
          'Valid email address',
          'Credit or debit card for payment',
          'Basic personal and travel information',
          'Emergency contact details',
          'Employment information'
        ],
        visaTypes: [
          { name: 'Tourism', description: 'for vacations, sightseeing, and visiting attractions across the United States' },
          { name: 'Business', description: 'for attending meetings, conferences, and business activities' },
          { name: 'Transit', description: 'for passing through the United States to another destination' }
        ],
        howToApply: [
          'Apply online',
          'Enter your passport and travel info accurately',
          'Pay the fee using a credit or debit card',
          'Submit your application and wait for approval',
          'Save your ESTA confirmation, it\'s linked to your passport'
        ],
        whyVisa123: 'Visa123 makes your US ESTA application simple and stress-free. Our expert team guides you through every step, ensures your information is accurate, and provides 24/7 support. With our streamlined process, you can get approved quickly and travel to the USA with confidence.'
      }
    },

    Turkey: {
      name: 'Turkey e-Visa',
      flag: '🇹🇷',
      heroImage: '/images/turkey-article.jpg',
      title: 'Turkey e-Visa',
      introduction: "Planning a trip to Turkey? Whether for tourism, business, or transit, getting a Turkey e-Visa makes your travel simple and fast.",
      sections: {
        whatIs: {
          title: 'What is a Turkey e-Visa?',
          content: "A Turkey e-Visa is an electronic visa linked to your passport. It lets you enter Turkey for up to 90 days for tourism, business, or transit. The whole process is online and quick."
        },
        whoNeeds: {
          title: 'Who needs Turkey e-Visa?',
          content: "You need a Turkey e-Visa if you're from a country that isn't visa-free but is eligible for online application. This includes travelers from places like South Africa, China, Australia, and many others visiting Turkey for tourism, business, or transit. Some nationalities, such as India, Pakistan, or Bangladesh, can also apply, but only if they have a valid visa or residence permit from the US, UK, Schengen countries, or Ireland."
        },
        documents: [
          'Valid passport with at least 6 months validity',
          'Valid email address for receiving the e-Visa',
          'Credit or debit card for payment',
          'Travel itinerary (flight details, accommodation)',
          'Passport-sized digital photograph',
          'Additional documents may be required based on nationality'
        ],
        visaTypes: [
          { name: 'Tourism', description: 'for sightseeing, visiting historical sites, and exploring Turkey\'s beautiful destinations' },
          { name: 'Business', description: 'for attending meetings, conferences, and business activities' },
          { name: 'Transit', description: 'for passing through Turkey to another destination' }
        ],
        howToApply: [
          'Start your application online',
          'Upload your passport scan',
          'Pay the visa fee with your card',
          'Get your visa by email within 24 hours',
          'Print your e-Visa and show it when you arrive in Turkey'
        ],
        whyVisa123: 'Visa123 simplifies your Turkey e-Visa application with expert guidance and document verification. Our experienced team ensures your application is complete and accurate, helping you get approved quickly. With our 24/7 support and streamlined process, you can travel to Turkey with confidence and peace of mind.'
      }
    },

    Morocco: {
      name: 'Morocco eVisa',
      flag: '🇲🇦',
      heroImage: '/images/morocco-bg.jpg',
      title: 'Morocco eVisa',
      introduction: "Apply for your Morocco eVisa in minutes. The process is 100% online — no embassy visits, no paperwork. Ideal for tourists and business travelers from eligible countries.",
      sections: {
        whatIs: {
          title: 'Why choose Morocco eVisa?',
          content: "Fully online application with no need to visit an embassy. Approval in as fast as 24 to 72 hours. Visa is linked to your passport digitally. Valid for 180 days from issue. Stay up to 30 days (can be extended)."
        },
        whoNeeds: {
          title: 'Who needs Morocco eVisa?',
          content: "You need Morocco eVisa if you are from a country not visa-exempt, you have a valid residence permit from the US, UK, EU, Canada, Australia, etc., or you hold a valid multiple-entry visa for the US, UK, Schengen, Canada, Australia, etc. If your passport allows visa-free entry (like from the EU, UK, US), you don't need an eVisa for stays up to 90 days."
        },
        documents: [
          'Valid passport with at least 6 months validity',
          'Digital passport photo (recent, color)',
          'Confirmed accommodation details',
          'Return flight tickets',
          'Proof of sufficient funds',
          'Valid email address',
          'Credit/debit card for payment'
        ],
        visaTypes: [
          { name: 'Tourism', description: 'for sightseeing, exploring Morocco\'s cities, and experiencing its rich culture' },
          { name: 'Business', description: 'for attending meetings, conferences, and business activities' }
        ],
        howToApply: [
          'Start your application online',
          'Upload passport scan and photo',
          'Pay the visa fee with a card',
          'Get a confirmation email with your application number',
          'Wait 1–3 working days for approval',
          'Download and print your eVisa PDF'
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
