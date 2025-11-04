import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import HeaderLoggedIn from './HeaderLoggedIn-B8RzWlof.mjs';
import { _ as _export_sfc } from './server.mjs';
import './nuxt-link-BLVv8aHW.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './virtual_public-BcspCJ2z.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'lucide-vue-next';
import './button-Cy1RM3F0.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import './DropdownMenu-C-dUPqGY.mjs';
import 'radix-vue';
import './DropdownMenuTrigger-B7jF-YDx.mjs';
import './DropdownMenuContent-BPx_eUMr.mjs';
import './DropdownMenuItem-D2DqBvlk.mjs';
import 'vue-router';

const termsConditionsData = [
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
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "terms-and-conditions",
  __ssrInlineRender: true,
  setup(__props) {
    const termsData = ref(termsConditionsData);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))} data-v-dfe89d68>`);
      _push(ssrRenderComponent(HeaderLoggedIn, null, null, _parent));
      _push(`<div class="container mx-auto px-6 lg:px-8 pt-[174px]" data-v-dfe89d68><div class="max-w-[1200px] mx-auto flex flex-col gap-[121px]" data-v-dfe89d68><div class="flex flex-col gap-3 max-w-[558px]" data-v-dfe89d68><div class="inline-flex items-center gap-2.5 w-fit bg-[#F1F9FC] rounded-full px-[15px] py-[5px] h-[34px]" data-v-dfe89d68><span class="font-manrope font-bold text-base leading-6 tracking-normal uppercase text-[#374151]" data-v-dfe89d68> TERMS &amp; CONDITIONS </span></div><h1 class="font-manrope font-bold text-[48px] leading-[64px] tracking-[-1.8px] text-[#0B3947]" data-v-dfe89d68> Terms &amp; Conditions </h1></div><div class="flex flex-col gap-12" data-v-dfe89d68><!--[-->`);
      ssrRenderList(termsData.value, (section, index) => {
        _push(`<div class="flex flex-col gap-6" data-v-dfe89d68><h2 class="font-manrope font-bold text-[24px] leading-8 tracking-normal text-[#0B3947]" data-v-dfe89d68>${ssrInterpolate(section.title)}</h2>`);
        if (section.content) {
          _push(`<p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947]" data-v-dfe89d68>${ssrInterpolate(section.content)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (section.subsections && section.subsections.length > 0) {
          _push(`<div class="flex flex-col gap-[10px]" data-v-dfe89d68><!--[-->`);
          ssrRenderList(section.subsections, (subsection, subIndex) => {
            _push(`<div class="flex gap-2 px-[30px]" data-v-dfe89d68><span class="font-manrope font-extrabold text-base leading-7 tracking-normal text-[#0B3947] flex-shrink-0 w-[20px]" data-v-dfe89d68>${ssrInterpolate(subsection.label)}</span><div class="flex-1" data-v-dfe89d68><span class="font-manrope text-base leading-7 tracking-normal text-[#0B3947]" data-v-dfe89d68><span class="font-bold" data-v-dfe89d68>${ssrInterpolate(subsection.title)}</span><span class="font-normal" data-v-dfe89d68>${ssrInterpolate(subsection.content.split("\n\n")[0])}</span></span><!--[-->`);
            ssrRenderList(subsection.content.split("\n\n").slice(1), (paragraph, pIndex) => {
              _push(`<p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] mt-4" data-v-dfe89d68>${ssrInterpolate(paragraph)}</p>`);
            });
            _push(`<!--]--></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div><div class="h-[211px]" data-v-dfe89d68></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/terms-and-conditions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const termsAndConditions = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dfe89d68"]]);

export { termsAndConditions as default };
//# sourceMappingURL=terms-and-conditions-Cw54X6qj.mjs.map
