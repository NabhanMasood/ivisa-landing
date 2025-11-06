import { defineComponent, computed, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { useRoute } from 'vue-router';
import HeaderLoggedIn from './HeaderLoggedIn-B8RzWlof.mjs';
import ApplicationForm from './ApplicationForm-CdKLkvp9.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './nuxt-link-BLVv8aHW.mjs';
import './virtual_public-BcspCJ2z.mjs';
import 'lucide-vue-next';
import './button-Cy1RM3F0.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import './DropdownMenu-C-dUPqGY.mjs';
import 'radix-vue';
import './DropdownMenuTrigger-B7jF-YDx.mjs';
import './DropdownMenuContent-BPx_eUMr.mjs';
import './DropdownMenuItem-D2DqBvlk.mjs';

const _imports_0 = publicAssetsURL("/svg/flags/US.svg");
const _imports_1 = publicAssetsURL("/svg/flags/TR.svg");
const _imports_2 = publicAssetsURL("/svg/protect.svg");
const _imports_3 = publicAssetsURL("/svg/check-2.svg");
const _imports_4 = publicAssetsURL("/svg/doc.svg");
const _imports_5 = publicAssetsURL("/svg/audience.svg");
const visaCountries = {
  Turkey: {
    name: "Schengen",
    flag: "🇪🇺",
    heroImage: "/images/turkey-article.jpg",
    title: "Discover Europe with One Visa",
    introduction: "Dreaming of your next European adventure? Whether it's gliding through Venice's canals, attending a conference in Paris, or reuniting with loved ones in Spain — the Schengen Visa (Type C) is your single ticket to 29 European countries.",
    sections: {
      whatIs: {
        title: "What is a Schengen Visa (Type C)?",
        content: "The Schengen Visa (Type C) lets you travel freely across all countries in the Schengen Zone with one application. It's designed for travelers from nations that don't have visa-free access to Europe, allowing short stays for tourism, business, or personal visits."
      },
      documents: ["A completed visa application form", "A valid passport (issued within the last 10 years and valid at least 3 months beyond your stay)", "Two recent passport-size photos", "Travel insurance covering at least €30,000", "Confirmed flight booking or travel itinerary", "Proof of accommodation (hotel reservation or invitation letter)", "Evidence of financial stability (bank statements or payslips)", "A brief cover letter explaining your travel purpose", "Additional documents depending on your visit type"],
      visaTypes: [{
        name: "Tourist Visa",
        description: "for vacations and sightseeing across Europe"
      }, {
        name: "Business Visa",
        description: "for meetings, events, and conferences"
      }, {
        name: "Family Visit Visa",
        description: "for visiting relatives or friends"
      }, {
        name: "Cultural/Sports Visa",
        description: "for attending events, performances, or competitions"
      }, {
        name: "Medical Visa",
        description: "for receiving medical treatment in Europe"
      }],
      howToApply: ["Identify the country where you'll spend most of your trip and apply through its embassy or visa center.", "Collect all the required documents listed above.", "Fill out the Schengen visa application form carefully.", "Book your appointment at the relevant visa center.", "Attend your appointment and submit your biometrics.", "Pay the visa fee as per embassy guidelines.", "Wait for your visa decision."],
      whyVisa123: "Visa123 simplifies the entire process with step-by-step guidance, document checks, and expert support — making your Schengen visa application faster and easier than ever."
    }
  },
  spain: {
    name: "Spain",
    flag: "🇪🇸",
    heroImage: "/images/spain-hero.jpg",
    title: "Explore Spain with Ease",
    introduction: "Planning your Spanish adventure? From the beaches of Barcelona to the cultural richness of Madrid, Spain welcomes you with open arms.",
    sections: {
      whatIs: {
        title: "What is a Spanish Schengen Visa?",
        content: "The Spanish Schengen Visa allows you to visit Spain for tourism, business, or visiting family and friends. As part of the Schengen area, it also grants access to other Schengen countries."
      },
      documents: ["A completed visa application form", "A valid passport (valid for at least 3 months beyond stay)", "Two recent passport-size photos", "Travel insurance covering €30,000", "Flight bookings", "Hotel reservations or invitation letter", "Proof of financial means", "Cover letter explaining travel purpose"],
      visaTypes: [{
        name: "Tourist Visa",
        description: "for exploring Spanish culture and attractions"
      }, {
        name: "Business Visa",
        description: "for business meetings and conferences"
      }, {
        name: "Family Visit Visa",
        description: "for visiting family members"
      }, {
        name: "Cultural/Sports Visa",
        description: "for events and performances"
      }],
      howToApply: ["Complete the online application form", "Gather required documents", "Schedule an appointment at the Spanish consulate", "Attend your appointment and submit biometrics", "Pay the visa fee", "Wait for visa decision (usually 15 days)"],
      whyVisa123: "Visa123 makes applying for your Spanish visa simple with expert guidance, document verification, and appointment scheduling assistance."
    }
  },
  france: {
    name: "France",
    flag: "🇫🇷",
    heroImage: "/images/france-hero.jpg",
    title: "Experience France Like Never Before",
    introduction: "Dream of strolling through Paris, tasting wine in Bordeaux, or skiing in the Alps? A French visa opens doors to these unforgettable experiences.",
    sections: {
      whatIs: {
        title: "What is a French Schengen Visa?",
        content: "The French Schengen Visa permits short stays in France and other Schengen countries for tourism, business, or family visits, typically up to 90 days within a 180-day period."
      },
      documents: ["Completed Schengen visa application form", "Valid passport (at least 3 months beyond intended stay)", "Two passport photographs", "Travel health insurance (minimum €30,000 coverage)", "Proof of accommodation in France", "Round-trip flight reservation", "Bank statements (last 3-6 months)", "Employment letter or business documents", "Cover letter stating purpose of visit"],
      visaTypes: [{
        name: "Tourist Visa",
        description: "for leisure travel and sightseeing"
      }, {
        name: "Business Visa",
        description: "for professional meetings and conferences"
      }, {
        name: "Family/Friend Visit",
        description: "for visiting relatives or friends"
      }, {
        name: "Cultural Visa",
        description: "for cultural events and activities"
      }],
      howToApply: ["Determine which French consulate has jurisdiction over your area", "Complete the online visa application", "Collect all required supporting documents", "Schedule your visa appointment", "Attend the appointment and provide biometrics", "Pay the applicable visa fee", "Track your application and await decision"],
      whyVisa123: "Visa123 streamlines your French visa journey with personalized support, document review, and expert advice to maximize your approval chances."
    }
  },
  italy: {
    name: "Italy",
    flag: "🇮🇹",
    heroImage: "/images/italy-hero.jpg",
    title: "Discover Italy's Timeless Beauty",
    introduction: "From Rome's ancient history to Venice's romantic canals and Tuscany's rolling hills, Italy captivates every visitor. Start your Italian journey with the right visa.",
    sections: {
      whatIs: {
        title: "What is an Italian Schengen Visa?",
        content: "The Italian Schengen Visa allows entry to Italy and free movement across the Schengen Zone for up to 90 days within a 180-day period for tourism, business, or family visits."
      },
      documents: ["Completed and signed visa application form", "Valid passport (minimum 6 months validity)", "Two recent color photographs", "Travel medical insurance (€30,000 minimum)", "Proof of accommodation (hotel bookings or invitation)", "Flight itinerary", "Financial proof (bank statements, sponsorship letter)", "Employment verification or student enrollment", "Travel itinerary and purpose letter"],
      visaTypes: [{
        name: "Tourist Visa",
        description: "for vacations and exploring Italy"
      }, {
        name: "Business Visa",
        description: "for business activities and meetings"
      }, {
        name: "Visit Visa",
        description: "for visiting family or friends"
      }, {
        name: "Medical Visa",
        description: "for medical treatment in Italy"
      }],
      howToApply: ["Identify the Italian consulate serving your region", "Fill out the visa application accurately", "Prepare all supporting documents", "Book your visa appointment online", "Attend your appointment with all documents", "Submit biometric data", "Pay the visa processing fee", "Wait for your visa (typically 10-15 working days)"],
      whyVisa123: "Visa123 takes the stress out of Italian visa applications with comprehensive guidance, document checks, and real-time application tracking."
    }
  },
  germany: {
    name: "Germany",
    flag: "🇩🇪",
    heroImage: "/images/germany-hero.jpg",
    title: "Experience Germany's Innovation and Culture",
    introduction: "Whether you're visiting Berlin's vibrant culture, Munich's festivals, or Germany's beautiful countryside, the German Schengen visa is your gateway to this incredible destination.",
    sections: {
      whatIs: {
        title: "What is a German Schengen Visa?",
        content: "The German Schengen Visa permits travelers to visit Germany and other Schengen countries for tourism, business, or personal reasons for stays up to 90 days within 180 days."
      },
      documents: ["Fully completed visa application form", "Valid passport (at least 3 months after planned departure)", "Two biometric passport photos", "Travel health insurance (€30,000 coverage)", "Proof of accommodation in Germany", "Flight reservations (round trip)", "Financial evidence (bank statements, payslips)", "Employment letter or school enrollment", "Detailed travel itinerary", "Cover letter explaining visit purpose"],
      visaTypes: [{
        name: "Tourist Visa",
        description: "for sightseeing and leisure travel"
      }, {
        name: "Business Visa",
        description: "for business trips and conferences"
      }, {
        name: "Visitor Visa",
        description: "for visiting relatives or friends"
      }, {
        name: "Medical Treatment Visa",
        description: "for medical purposes"
      }, {
        name: "Cultural/Sports Visa",
        description: "for attending events"
      }],
      howToApply: ["Find your nearest German embassy or consulate", "Complete the visa application online", "Gather all required documentation", "Schedule your visa appointment", "Attend your appointment and submit documents", "Provide fingerprints and photo", "Pay the visa fee", "Track your application status online", "Collect your passport with visa"],
      whyVisa123: "Visa123 offers end-to-end support for your German visa application, including document preparation, appointment booking, and expert consultation to ensure success."
    }
  }
};
const getCountryData = (slug) => {
  const country = visaCountries[slug];
  if (!country) {
    return visaCountries["Turkey"];
  }
  return country;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[country]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const countrySlug = computed(() => route.params.country || "turkey");
    const countryData = computed(() => getCountryData(countrySlug.value));
    const formData = ref({
      from: "United States",
      to: "Turkey"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))} data-v-07aeaa1b>`);
      _push(ssrRenderComponent(HeaderLoggedIn, null, null, _parent));
      _push(`<section class="relative w-full" data-v-07aeaa1b><div class="container mx-auto px-6 lg:px-8" data-v-07aeaa1b><div class="relative w-full max-w-[1200px] h-[554px] mx-auto rounded-2xl overflow-hidden mt-8" data-v-07aeaa1b><img${ssrRenderAttr("src", countryData.value.heroImage)}${ssrRenderAttr("alt", countryData.value.name)} class="absolute inset-0 w-full h-full object-cover" data-v-07aeaa1b><div class="absolute inset-0 bg-black/30" data-v-07aeaa1b></div><div class="absolute top-[99px] left-[89px] flex gap-[54px] w-[1012px] h-[336px]" data-v-07aeaa1b><div class="w-[585px] h-[336px] flex flex-col gap-6 rounded-2xl p-[25px] bg-[#68919C80] backdrop-blur-[20px]" data-v-07aeaa1b><h2 class="w-[535px] h-[32px] font-manrope font-bold text-[28px] leading-[32px] text-white" data-v-07aeaa1b> Start your application </h2><form class="flex flex-col gap-4" data-v-07aeaa1b><div data-v-07aeaa1b><label class="font-manrope text-sm font-medium text-white/90 mb-2 block" data-v-07aeaa1b> Where are you from? </label><div class="relative" data-v-07aeaa1b><select class="w-full h-[50px] pl-12 pr-12 border border-gray-300 rounded-lg font-manrope font-normal text-sm leading-6 bg-white text-[#71717B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02D275] focus:border-transparent appearance-none" data-v-07aeaa1b><option value="" class="text-gray-400" disabled data-v-07aeaa1b${ssrIncludeBooleanAttr(Array.isArray(formData.value.from) ? ssrLooseContain(formData.value.from, "") : ssrLooseEqual(formData.value.from, "")) ? " selected" : ""}>Select country</option><option value="United States" class="text-[#71717B]" data-v-07aeaa1b${ssrIncludeBooleanAttr(Array.isArray(formData.value.from) ? ssrLooseContain(formData.value.from, "United States") : ssrLooseEqual(formData.value.from, "United States")) ? " selected" : ""}>United States</option><option value="United Kingdom" class="text-[#71717B]" data-v-07aeaa1b${ssrIncludeBooleanAttr(Array.isArray(formData.value.from) ? ssrLooseContain(formData.value.from, "United Kingdom") : ssrLooseEqual(formData.value.from, "United Kingdom")) ? " selected" : ""}>United Kingdom</option><option value="Canada" class="text-[#71717B]" data-v-07aeaa1b${ssrIncludeBooleanAttr(Array.isArray(formData.value.from) ? ssrLooseContain(formData.value.from, "Canada") : ssrLooseEqual(formData.value.from, "Canada")) ? " selected" : ""}>Canada</option><option value="Australia" class="text-[#71717B]" data-v-07aeaa1b${ssrIncludeBooleanAttr(Array.isArray(formData.value.from) ? ssrLooseContain(formData.value.from, "Australia") : ssrLooseEqual(formData.value.from, "Australia")) ? " selected" : ""}>Australia</option></select>`);
      if (formData.value.from === "United States" || formData.value.from === "") {
        _push(`<img${ssrRenderAttr("src", _imports_0)} class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full object-cover" alt="USA flag" data-v-07aeaa1b>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-07aeaa1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-07aeaa1b></path></svg></div></div><div data-v-07aeaa1b><label class="font-manrope text-sm font-medium text-white/90 mb-2 block" data-v-07aeaa1b> Where are you going? </label><div class="relative" data-v-07aeaa1b><select class="w-full h-[50px] pl-12 pr-12 border border-gray-300 rounded-lg font-manrope font-normal text-sm leading-6 bg-white text-[#71717B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02D275] focus:border-transparent appearance-none" data-v-07aeaa1b><option value="" class="text-gray-400" disabled data-v-07aeaa1b${ssrIncludeBooleanAttr(Array.isArray(formData.value.to) ? ssrLooseContain(formData.value.to, "") : ssrLooseEqual(formData.value.to, "")) ? " selected" : ""}>Select destination</option><option value="Turkey" class="text-[#71717B]" data-v-07aeaa1b${ssrIncludeBooleanAttr(Array.isArray(formData.value.to) ? ssrLooseContain(formData.value.to, "Turkey") : ssrLooseEqual(formData.value.to, "Turkey")) ? " selected" : ""}>Turkey</option></select><img${ssrRenderAttr("src", _imports_1)} class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full object-cover" alt="Turkey flag" data-v-07aeaa1b><svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-07aeaa1b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-07aeaa1b></path></svg></div></div><button type="submit" class="w-[535px] h-[46px] rounded-[10px] bg-[#00D474] hover:bg-[#00D474]/90 font-manrope font-bold text-lg leading-6 text-white text-center flex items-center justify-center gap-2" data-v-07aeaa1b><span data-v-07aeaa1b>➜</span><span data-v-07aeaa1b>Apply Now!</span></button></form></div><div class="w-[373px] flex flex-col gap-5" data-v-07aeaa1b><div class="w-[373px]" data-v-07aeaa1b><h1 class="text-white text-5xl font-bold leading-tight" data-v-07aeaa1b> Apply now for your Schengen Visa </h1></div><p class="w-[373px] font-manrope font-medium text-[20px] leading-[26px] text-white" data-v-07aeaa1b> Plan your trip to Schengen confidently, easy, online, and optimised for travellers just like you. </p></div></div></div></div></section><section class="py-16 bg-gray-50" data-v-07aeaa1b><div class="container mx-auto px-6 lg:px-8" data-v-07aeaa1b><div class="max-w-[1002px] mx-auto flex flex-col gap-10" data-v-07aeaa1b><h2 class="font-manrope font-bold text-[32px] leading-[40px] tracking-normal text-center text-[#0A3D3F]" data-v-07aeaa1b> Streamlined Application Process </h2><div class="flex flex-col gap-10" data-v-07aeaa1b><div class="flex items-center justify-center" data-v-07aeaa1b><div class="flex flex-col items-center" data-v-07aeaa1b><div class="w-[44px] h-[44px] bg-[#00D474] rounded-full flex items-center justify-center relative shadow-[0_0.93px_1.4px_rgba(26,25,37,0.12),0_1.87px_3.73px_rgba(26,25,37,0.12)]" data-v-07aeaa1b><span class="font-manrope font-medium text-[20px] leading-[28px] tracking-[-0.02em] text-white text-center" data-v-07aeaa1b>1</span></div></div><div class="w-8" data-v-07aeaa1b></div><div class="w-[182px] h-0 border-t border-[#EEEEF0]" data-v-07aeaa1b></div><div class="w-8" data-v-07aeaa1b></div><div class="flex flex-col items-center" data-v-07aeaa1b><div class="w-[44px] h-[44px] bg-[#00D474] rounded-full flex items-center justify-center relative shadow-[0_0.93px_1.4px_rgba(26,25,37,0.12),0_1.87px_3.73px_rgba(26,25,37,0.12)]" data-v-07aeaa1b><span class="font-manrope font-medium text-[20px] leading-[28px] tracking-[-0.02em] text-white text-center" data-v-07aeaa1b>2</span></div></div><div class="w-8" data-v-07aeaa1b></div><div class="w-[182px] h-0 border-t border-[#EEEEF0]" data-v-07aeaa1b></div><div class="w-8" data-v-07aeaa1b></div><div class="flex flex-col items-center" data-v-07aeaa1b><div class="w-[44px] h-[44px] bg-[#00D474] rounded-full flex items-center justify-center relative shadow-[0_0.93px_1.4px_rgba(26,25,37,0.12),0_1.87px_3.73px_rgba(26,25,37,0.12)]" data-v-07aeaa1b><span class="font-manrope font-medium text-[20px] leading-[28px] tracking-[-0.02em] text-white text-center" data-v-07aeaa1b>3</span></div></div></div><div class="flex gap-[45px] justify-center" data-v-07aeaa1b><div class="w-[304px] h-[220px] flex flex-col items-center gap-4 rounded-2xl bg-[#F1F9FC] px-5 py-10" data-v-07aeaa1b><h3 class="w-[264px] h-[64px] font-manrope font-bold text-[22px] leading-[32px] tracking-[-0.02em] text-center text-[#0B3947]" data-v-07aeaa1b> Smarter Task Management Flow </h3><p class="w-[264px] h-[60px] font-manrope font-normal text-base leading-5 tracking-[-0.006em] text-center text-[#0B3947] opacity-70" data-v-07aeaa1b> Minimal, organized structure to help you manage, sort, and access every task. </p></div><div class="w-[304px] h-[220px] flex flex-col items-center gap-4 rounded-2xl bg-[#F1F9FC] px-5 py-10" data-v-07aeaa1b><h3 class="w-[264px] h-[64px] font-manrope font-bold text-[22px] leading-[32px] tracking-[-0.02em] text-center text-[#0B3947]" data-v-07aeaa1b> All-in-One Project Beam Control </h3><p class="w-[264px] h-[60px] font-manrope font-normal text-base leading-5 tracking-[-0.006em] text-center text-[#0B3947] opacity-70" data-v-07aeaa1b> Design, edit, publish, and manage projects without leaving your workspace. </p></div><div class="w-[304px] h-[220px] flex flex-col items-center gap-4 rounded-2xl bg-[#F1F9FC] px-5 py-10" data-v-07aeaa1b><h3 class="w-[264px] h-[64px] font-manrope font-bold text-[22px] leading-[32px] tracking-[-0.02em] text-center text-[#0B3947]" data-v-07aeaa1b> Real-Time Usage Analytics </h3><p class="w-[264px] h-[60px] font-manrope font-normal text-base leading-5 tracking-[-0.006em] text-center text-[#0B3947] opacity-70" data-v-07aeaa1b> Compare free and premium user activity at a glance — track growth. </p></div></div></div></div></div></section><section class="py-16 bg-white" data-v-07aeaa1b><div class="container mx-auto px-6 lg:px-8" data-v-07aeaa1b><div class="max-w-[1200px] mx-auto flex flex-col gap-6" data-v-07aeaa1b><div class="flex gap-6" data-v-07aeaa1b><div class="flex-1 flex flex-col bg-[#F1F9FC] rounded-2xl" style="${ssrRenderStyle({ "width": "588px", "height": "250px", "padding": "35px", "gap": "16px" })}" data-v-07aeaa1b><div class="w-[61.875px] h-[60px]" data-v-07aeaa1b><img${ssrRenderAttr("src", _imports_2)} alt="visa alerts" class="w-full h-full" data-v-07aeaa1b></div><div class="flex flex-col gap-2" data-v-07aeaa1b><h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-[#0A3D3F]" data-v-07aeaa1b> Risk-Free Applications </h3><p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-[#40444C]" data-v-07aeaa1b> If your visa isn&#39;t approved, you don&#39;t lose a thing. With Visa123&#39;s Application Protection, you can apply with total confidence and zero financial risk. </p></div></div><div class="flex-1 flex flex-col bg-[#F1F9FC] rounded-2xl" style="${ssrRenderStyle({ "width": "588px", "height": "250px", "padding": "35px", "gap": "16px" })}" data-v-07aeaa1b><div class="w-[61.875px] h-[60px]" data-v-07aeaa1b><img${ssrRenderAttr("src", _imports_3)} alt="travel guidance" class="w-full h-full" data-v-07aeaa1b></div><div class="flex flex-col gap-2" data-v-07aeaa1b><h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-[#0A3D3F]" data-v-07aeaa1b> 17+ Years of Experience </h3><p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-[#40444C]" data-v-07aeaa1b> Our visa experts have been helping travelers navigate global visa processes for over 17 years. Every application is carefully reviewed by our experienced team to ensure accuracy and approval readiness </p></div></div></div><div class="flex gap-6" data-v-07aeaa1b><div class="flex-1 flex flex-col bg-[#F1F9FC] rounded-2xl" style="${ssrRenderStyle({ "width": "588px", "height": "250px", "padding": "35px", "gap": "16px" })}" data-v-07aeaa1b><div class="w-[61.875px] h-[60px]" data-v-07aeaa1b><img${ssrRenderAttr("src", _imports_4)} alt="visa alerts" class="w-full h-full" data-v-07aeaa1b></div><div class="flex flex-col gap-2" data-v-07aeaa1b><h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-[#0A3D3F]" data-v-07aeaa1b> 60+ Global Destinations </h3><p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-[#40444C]" data-v-07aeaa1b> Visa123 supports visa processing for more than 60 countries worldwide. Wherever you&#39;re headed, our team provides the right guidance to make your travel plans simple and stress-free. </p></div></div><div class="flex-1 flex flex-col bg-[#F1F9FC] rounded-2xl" style="${ssrRenderStyle({ "width": "588px", "height": "250px", "padding": "35px", "gap": "16px" })}" data-v-07aeaa1b><div class="w-[61.875px] h-[60px]" data-v-07aeaa1b><img${ssrRenderAttr("src", _imports_5)} alt="travel guidance" class="w-full h-full" data-v-07aeaa1b></div><div class="flex flex-col gap-2" data-v-07aeaa1b><h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-[#0A3D3F]" data-v-07aeaa1b> 10K+ Successful Consultations </h3><p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-[#40444C]" data-v-07aeaa1b> Over 10,000 travelers have trusted Visa123 to guide their applications. We tailor each consultation to your unique travel goals and personal circumstances, ensuring the best possible outcome. </p></div></div></div></div></div></section><section class="py-16 bg-white" data-v-07aeaa1b><div class="container mx-auto px-6 lg:px-8" data-v-07aeaa1b><div class="max-w-[1200px] h-[540px] mx-auto rounded-[30px] overflow-hidden" data-v-07aeaa1b>`);
      _push(ssrRenderComponent(ApplicationForm, null, null, _parent));
      _push(`</div></div></section><section class="py-16 bg-white" data-v-07aeaa1b><div class="container mx-auto px-6 lg:px-8" data-v-07aeaa1b><div class="max-w-[1200px] mx-auto flex flex-col gap-[60px]" data-v-07aeaa1b><div class="mb-0" data-v-07aeaa1b><h1 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947]" data-v-07aeaa1b>${ssrInterpolate(countryData.value.title)}</h1></div><div class="flex flex-col gap-5" data-v-07aeaa1b><p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] w-full" data-v-07aeaa1b>${ssrInterpolate(countryData.value.introduction)}</p></div><div class="flex flex-col gap-5" data-v-07aeaa1b><h2 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947]" data-v-07aeaa1b>${ssrInterpolate(countryData.value.sections.whatIs.title)}</h2><p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] w-full" data-v-07aeaa1b>${ssrInterpolate(countryData.value.sections.whatIs.content)}</p></div><div class="flex flex-col gap-5" data-v-07aeaa1b><h2 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947]" data-v-07aeaa1b> Documents You&#39;ll Need </h2><p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] w-full mb-4" data-v-07aeaa1b> When applying for a ${ssrInterpolate(countryData.value.name)} visa, prepare the following: </p><ul class="space-y-2" data-v-07aeaa1b><!--[-->`);
      ssrRenderList(countryData.value.sections.documents, (doc, index) => {
        _push(`<li class="flex items-start gap-3" data-v-07aeaa1b><span class="text-[#0B3947] mt-1" data-v-07aeaa1b>•</span><span class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947]" data-v-07aeaa1b>${ssrInterpolate(doc)}</span></li>`);
      });
      _push(`<!--]--></ul></div><div class="flex flex-col gap-5" data-v-07aeaa1b><h2 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947]" data-v-07aeaa1b> Types of ${ssrInterpolate(countryData.value.name)} Visas </h2><p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] w-full mb-4" data-v-07aeaa1b> Choose the visa that best fits your travel purpose: </p><ul class="space-y-2" data-v-07aeaa1b><!--[-->`);
      ssrRenderList(countryData.value.sections.visaTypes, (visa, index) => {
        _push(`<li class="flex items-start gap-3" data-v-07aeaa1b><span class="text-[#0B3947] mt-1" data-v-07aeaa1b>•</span><span class="font-manrope text-base leading-7 tracking-normal text-[#0B3947]" data-v-07aeaa1b><strong class="font-bold" data-v-07aeaa1b>${ssrInterpolate(visa.name)}</strong><span class="font-normal" data-v-07aeaa1b> – ${ssrInterpolate(visa.description)}</span></span></li>`);
      });
      _push(`<!--]--></ul></div><div class="flex flex-col gap-5" data-v-07aeaa1b><h2 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947]" data-v-07aeaa1b> How to Apply for a ${ssrInterpolate(countryData.value.name)} Visa </h2><p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] w-full mb-4" data-v-07aeaa1b> Here&#39;s how to start your application through Visa123: </p><ol class="space-y-2" data-v-07aeaa1b><!--[-->`);
      ssrRenderList(countryData.value.sections.howToApply, (step, index) => {
        _push(`<li class="flex items-start gap-3" data-v-07aeaa1b><span class="font-manrope font-bold text-base leading-7 text-[#0B3947]" data-v-07aeaa1b>${ssrInterpolate(index + 1)}.</span><span class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947]" data-v-07aeaa1b>${ssrInterpolate(step)}</span></li>`);
      });
      _push(`<!--]--></ol></div><div class="flex flex-col gap-5" data-v-07aeaa1b><h2 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947]" data-v-07aeaa1b> Why Apply with Visa123 </h2><p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] w-full" data-v-07aeaa1b>${ssrInterpolate(countryData.value.sections.whyVisa123)}</p></div></div></div></section><div class="h-[211px]" data-v-07aeaa1b></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/travel-article/[country].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _country_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-07aeaa1b"]]);

export { _country_ as default };
//# sourceMappingURL=_country_-CIr2x6hl.mjs.map
