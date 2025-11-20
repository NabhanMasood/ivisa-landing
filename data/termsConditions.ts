// data/termsConditions.ts

export interface TermsSection {
    title: string
    content: string
    subsections?: {
      label: string
      title: string
      content: string
    }[]
  }
  
  export const termsConditionsData: TermsSection[] = [
    {
      title: "1. Introduction and Acceptance of Terms",
      content: "By accessing or using the services provided by VISA123, you agree to be bound by these Terms of Service (TOS), our Privacy Policy, and all applicable laws and regulations. If you use our services, you agree with the whole of these terms"
    },
    {
      title: "2. Nature of Our Service",
      content: "VISA123 is a private, third-party visa and travel document processing agency.",
      subsections: [
        {
          label: "A.",
          title: "Independent Service:",
          content: "We are not affiliated with any government or embassy. We act on the customer's behalf to submit, process, and manage visa and travel authorization applications to the appropriate government authorities."
        },
        {
          label: "B.",
          title: "Value Proposition:",
          content: "Our service fee covers the provision of simplified application forms, 24/7 expert document review, Error Protection Guarantee, and personalized customer support."
        },
        {
          label: "C.",
          title: "Government Authority:",
          content: "We do not issue visas or make final decisions on application approval. The final approval or rejection of any visa application is solely at the discretion of the relevant government or immigration authority."
        }
      ]
    },
    {
      title: "3. Application Process and Customer Responsibility",
      content: "",
      subsections: [
        {
          label: "A.",
          title: "Accuracy of Information:",
          content: "The customer is solely responsible for providing accurate, truthful, and complete information on the application form. Providing false or misleading information is grounds for application rejection by the government and may lead to legal consequences by the issuing country."
        },
        {
          label: "B.",
          title: "Documentation:",
          content: "The customer is responsible for providing all requested supporting documents (e.g., passport scans, photos) in the correct format as advised by The Company."
        },
        {
          label: "C.",
          title: "Error Protection Guarantee:",
          content: "Our service includes an Expert Review to minimize human error on the forms. If our specialist detects an error, we will notify the customer for correction before submission. This guarantee does not cover government rejection due to customer ineligibility (e.g., criminal record, past immigration violations)."
        }
      ]
    },
    {
      title: "4. Fees, Payments, and Refunds",
      content: "",
      subsections: [
        {
          label: "A.",
          title: "Total Cost:",
          content: "The total price charged includes the non-refundable Government Fee (paid to the embassy/government) and our Service Fee (paid to The Company for administrative and expert review services)."
        },
        {
          label: "B.",
          title: "Payment:",
          content: "All fees are due at the time the application is submitted through our checkout system. Processing will not begin until payment is confirmed."
        },
        {
          label: "C.",
          title: "Refund Policy:",
          content: "Service Fee Refund: A 100% refund of the Service Fee will be issued only if the application is rejected by the government due to a demonstrable error made by The Company during the transcription or submission of correct information provided by the customer.\n\nNon-Refundable: The Service Fee is non-refundable if the application is rejected due to: (i) customer ineligibility; (ii) fraudulent or false information provided by the customer; (iii) the customer canceling the application after it has been submitted to the government; or (iv) the application is still pending with the government.\n\nGovernment Fee: The Government Fee is non-refundable in most cases once the application has been submitted to the government, regardless of the outcome."
        }
      ]
    },
    {
      title: "5. Limitation of Liability and Disclaimers",
      content: "",
      subsections: [
        {
          label: "A.",
          title: "Processing Time:",
          content: "Any processing times stated are estimates based on standard government averages and are not guaranteed. The Company is not responsible for delays, itinerary changes, or losses caused by government processing delays."
        },
        {
          label: "B.",
          title: "Travel Advice:",
          content: "Information provided on this website regarding visa requirements is for general guidance only. Requirements can change rapidly. The customer is ultimately responsible for confirming final travel requirements with the appropriate government sources before departure."
        },
        {
          label: "C.",
          title: "Damages:",
          content: "In no event shall VISA123, its directors, employees, or partners be liable for any consequential, incidental, direct, or indirect damages arising out of the use or inability to use the materials on The Company's website, even if The Company has been notified orally or in writing of the possibility of such damage. The Company's liability is strictly limited to the amount of the Service Fee paid by the customer."
        }
      ]
    },
    {
      title: "6. Changes to Terms",
      content: "The Company reserves the right to revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms of service."
    }
  ]

