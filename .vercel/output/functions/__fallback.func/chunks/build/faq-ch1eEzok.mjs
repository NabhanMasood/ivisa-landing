import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import HeaderLoggedIn from './HeaderLoggedIn-B8RzWlof.mjs';
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
import 'vue-router';

const _imports_0 = publicAssetsURL("/svg/click.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "faq",
  __ssrInlineRender: true,
  setup(__props) {
    const faqs = ref([
      {
        question: "Is it safe to enter my passport and personal data on your website?",
        answer: "Yes, it is completely secure. We use bank-level 256-bit SSL encryption for all data transmission. Your passport details are only used for government application submission and are never stored on our servers after the process is complete. We are fully compliant with global data protection laws (including GDPR)"
      },
      {
        question: "Are you affiliated with the government?",
        answer: "No, we are a private, independent visa processing agency. We expedite and simplify the application process on your behalf. We charge a service fee for our expert review, 24/7 support, and error protection, a service not provided by government sites."
      },
      {
        question: "How can I verify the status of my application?",
        answer: "Once submitted, you'll receive a unique tracking ID and a link to your personal dashboard. You can check the real-time status (e.g., Under Expert Review, Submitted to Government, Approved) 24/7 on your account."
      },
      {
        question: "Why is the total cost higher than the government's fee?",
        answer: "The price shown includes two parts: the non-negotiable Government Fee and our Service Fee. Our fee covers the convenience, 24/7 support, mobile-friendly forms, and, most importantly, our Error Protection Guarantee, ensuring your time and money aren't wasted on unnecessary rejections."
      },
      {
        question: "What is your refund policy for rejected applications?",
        answer: "We are committed to fairness. If your application is rejected due to a demonstrable mistake made by our review team in processing correct data, we will issue a full refund of our service fee. Rejections based on the applicant's ineligibility (e.g., criminal history, insufficient funds) are non-refundable, as our work was successfully performed."
      }
    ]);
    const openIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))} data-v-ed34f6d4>`);
      _push(ssrRenderComponent(HeaderLoggedIn, null, null, _parent));
      _push(`<div class="container mx-auto max-w-7xl px-6 lg:px-8 py-12" data-v-ed34f6d4><div class="max-w-[1200px] mx-auto flex flex-col gap-[100px]" data-v-ed34f6d4><div class="w-full max-w-[1200px] min-h-[174px] flex flex-col lg:flex-row justify-between items-start gap-10" data-v-ed34f6d4><div class="flex flex-col gap-6 flex-1" data-v-ed34f6d4><div class="inline-flex items-center bg-[#F1F9FC] rounded-full px-[15px] py-[5px] h-[34px] w-fit" data-v-ed34f6d4><span class="font-manrope font-bold text-base leading-6 tracking-normal uppercase text-[#374151]" data-v-ed34f6d4> FAQ </span></div><h1 class="font-manrope font-bold text-[48px] leading-[64px] tracking-[-0.015em] text-[#111827] max-w-[550px]" data-v-ed34f6d4> Find the Right Answer<br data-v-ed34f6d4>Before You Pack. </h1></div><div class="flex flex-col gap-4 max-w-[500px] flex-shrink-0 lg:mt-[58px]" data-v-ed34f6d4><div class="flex items-center justify-start" data-v-ed34f6d4><img${ssrRenderAttr("src", _imports_0)} alt="chat icon" class="w-[23.33px] h-[20.71px] mt-[4.67px] ml-[2.33px]" data-v-ed34f6d4></div><p class="font-manrope font-normal text-base leading-7 tracking-[-0.006em] text-[#71717A]" data-v-ed34f6d4> Have a question or need clarification? Don&#39;t hesitate to reach out. Our team is here to help and we&#39;re ready to provide all the answers you need. </p></div></div><div class="w-full max-w-[1200px] flex flex-col gap-8" data-v-ed34f6d4><!--[-->`);
      ssrRenderList(faqs.value, (faq2, index) => {
        _push(`<div class="flex flex-col w-full" data-v-ed34f6d4><div class="flex items-center gap-8 cursor-pointer py-2 transition-opacity hover:opacity-80" data-v-ed34f6d4><span class="w-[72px] font-manrope font-bold text-sm leading-5 tracking-[-0.006em] text-[#00D474] flex-shrink-0" data-v-ed34f6d4>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span><h3 class="flex-1 font-manrope font-medium text-[20px] leading-6 tracking-[-0.015em] text-[#111827]" data-v-ed34f6d4>${ssrInterpolate(faq2.question)}</h3><img${ssrRenderAttr("src", openIndex.value === index ? "/svg/cross.svg" : "/svg/plus.svg")} alt="toggle icon" class="w-6 h-6 flex-shrink-0 transition-transform" data-v-ed34f6d4></div>`);
        if (openIndex.value === index) {
          _push(`<div class="mt-10 ml-[104px] max-w-[995px]" data-v-ed34f6d4><p class="font-manrope font-normal text-base leading-7 tracking-[-0.006em] text-[#51515E]" data-v-ed34f6d4>${ssrInterpolate(faq2.answer)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (index < faqs.value.length - 1) {
          _push(`<div class="w-full h-px bg-[#E5E7EB] mt-8" data-v-ed34f6d4></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div><div class="h-[211px]" data-v-ed34f6d4></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ed34f6d4"]]);

export { faq as default };
//# sourceMappingURL=faq-ch1eEzok.mjs.map
