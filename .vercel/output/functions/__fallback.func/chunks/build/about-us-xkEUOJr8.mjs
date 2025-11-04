import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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

const _imports_0 = publicAssetsURL("/svg/star.svg");
const _imports_1 = publicAssetsURL("/svg/thumbs-up.svg");
const _imports_2 = publicAssetsURL("/svg/globe.svg");
const _imports_3 = publicAssetsURL("/svg/location-pin.svg");
const _imports_4 = publicAssetsURL("/svg/email-icon.svg");
const _imports_5 = publicAssetsURL("/svg/phone-icon.svg");
const _imports_6 = publicAssetsURL("/images/us-flag.png");
const _imports_7 = publicAssetsURL("/svg/arrow-right.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about-us",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))} data-v-6c133939>`);
      _push(ssrRenderComponent(HeaderLoggedIn, null, null, _parent));
      _push(`<div class="container mx-auto px-6 lg:px-8" data-v-6c133939><div class="max-w-[1200px] mx-auto flex flex-col gap-[80px]" data-v-6c133939><div class="flex flex-col gap-[42px]" data-v-6c133939><div class="flex flex-col gap-[19px] max-w-[982px]" data-v-6c133939><div class="inline-flex items-center gap-2.5 w-fit bg-[#02D275] rounded-full px-[15px] py-[5px] h-[34px]" data-v-6c133939><span class="font-manrope font-bold text-base leading-6 tracking-normal text-center uppercase text-[#0B3947]" data-v-6c133939>ABOUT US</span></div><h1 class="font-manrope font-bold text-[56px] leading-[67.2px] tracking-normal text-left text-[#0B3947] max-w-[982px] whitespace-nowrap" data-v-6c133939> We make traveling easy for everyone </h1><p class="font-manrope font-normal text-[20px] leading-[34px] tracking-normal text-left text-gray-600 max-w-[982px]" data-v-6c133939> Learn why our clients trust us </p></div><div class="flex flex-col md:flex-row gap-8 justify-center" data-v-6c133939><div class="w-full md:w-[379px] h-[234px] flex flex-col items-center gap-[11px] rounded-[24px] bg-[#F1F9FC] px-[33px] py-[48px]" data-v-6c133939><div class="w-8 h-8 relative" data-v-6c133939><img${ssrRenderAttr("src", _imports_0)} alt="star icon" class="absolute top-[3.58px] left-[4.11px] w-[23.79px] h-[22.78px]" data-v-6c133939></div><p class="w-full max-w-[313px] font-manrope font-extralight text-[20px] leading-[34px] tracking-normal text-center text-[#0B3947]" data-v-6c133939> Over 1.5M clients have trusted us to get their travel documents. </p></div><div class="w-full md:w-[379px] h-[234px] flex flex-col items-center gap-[11px] rounded-[24px] bg-[#F1F9FC] px-[33px] py-[48px]" data-v-6c133939><div class="w-8 h-8 relative" data-v-6c133939><img${ssrRenderAttr("src", _imports_1)} alt="thumbsup icon" class="absolute top-[3.58px] left-[4.11px] w-[23.79px] h-[22.78px]" data-v-6c133939></div><p class="w-full max-w-[313px] font-manrope font-extralight text-[20px] leading-[34px] tracking-normal text-center text-[#0B3947]" data-v-6c133939> 10+ years in the industry, leading providers of online visa services. </p></div><div class="w-full md:w-[379px] h-[234px] flex flex-col items-center gap-[11px] rounded-[24px] bg-[#F1F9FC] px-[33px] py-[48px]" data-v-6c133939><div class="w-8 h-8 relative" data-v-6c133939><img${ssrRenderAttr("src", _imports_2)} alt="globe icon" class="absolute top-[3.58px] left-[4.11px] w-[23.79px] h-[22.78px]" data-v-6c133939></div><p class="w-full max-w-[313px] font-manrope font-extralight text-[20px] leading-[34px] tracking-normal text-center text-[#0B3947]" data-v-6c133939> Global company, with 200+ employees based all around the world. </p></div></div></div><div class="flex flex-col items-center gap-12 mt-20" data-v-6c133939><div class="flex flex-col items-center gap-2" data-v-6c133939><h2 class="font-manrope font-bold text-[48px] leading-[64px] tracking-[-1.6px] text-center text-[#0B3947]" data-v-6c133939> Legal Information </h2></div><div class="w-full max-w-[1200px] h-[216px] flex flex-col md:flex-row gap-5 rounded-[20px] bg-[#F1F9FC]" data-v-6c133939><div class="flex-1 flex flex-col items-start justify-center gap-4 p-8" data-v-6c133939><div class="w-6 h-6" data-v-6c133939><img${ssrRenderAttr("src", _imports_3)} alt="location icon" class="w-full h-full" data-v-6c133939></div><div class="flex flex-col gap-[9px] max-w-[309px]" data-v-6c133939><h3 class="font-manrope font-bold text-base leading-6 tracking-normal text-[#0B3947]" data-v-6c133939> Mailing Address </h3><p class="font-manrope font-bold text-sm leading-[22px] tracking-normal text-[#0B3947]" data-v-6c133939> Visa 123 LLC Shams Business Centre, Sharjah media City Free Zone Al Messaned Sharjah </p></div></div><div class="hidden md:block w-[0.5px] h-[120px] bg-[#0B3947] self-center" data-v-6c133939></div><div class="flex-1 flex flex-col items-start justify-center gap-4 p-8" data-v-6c133939><div class="w-6 h-6" data-v-6c133939><img${ssrRenderAttr("src", _imports_4)} alt="email icon" class="w-full h-full" data-v-6c133939></div><div class="flex flex-col gap-[9px] max-w-[309px]" data-v-6c133939><h3 class="font-manrope font-bold text-base leading-6 tracking-normal text-[#0B3947]" data-v-6c133939> Contact Email </h3><p class="font-manrope font-bold text-sm leading-[22px] tracking-normal text-[#0B3947]" data-v-6c133939> contact@visa123.com </p></div></div><div class="hidden md:block w-[0.5px] h-[120px] bg-[#0B3947] self-center" data-v-6c133939></div><div class="flex-1 flex flex-col items-start justify-center gap-4 p-8" data-v-6c133939><div class="w-6 h-6" data-v-6c133939><img${ssrRenderAttr("src", _imports_5)} alt="phone icon" class="w-full h-full" data-v-6c133939></div><div class="flex flex-col gap-[9px] max-w-[309px]" data-v-6c133939><h3 class="font-manrope font-bold text-base leading-6 tracking-normal text-[#0B3947]" data-v-6c133939> Company Phone Number </h3><p class="font-manrope font-bold text-sm leading-[22px] tracking-normal text-[#0B3947]" data-v-6c133939> +971 585743188 </p></div></div></div></div><div class="flex flex-col gap-[80px] mt-20" data-v-6c133939><h2 class="font-manrope font-bold text-[48px] leading-[56px] tracking-normal text-center text-[#0B3947]" data-v-6c133939> Our offices around the world </h2><div class="flex flex-col md:flex-row items-center gap-[10px] p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow" data-v-6c133939><div class="w-[148px] h-[145px] flex-shrink-0 rounded-2xl overflow-hidden" data-v-6c133939><img${ssrRenderAttr("src", _imports_6)} alt="UAE office" class="w-full h-full object-cover" data-v-6c133939></div><div class="flex-1 flex flex-col gap-[5px]" data-v-6c133939><h3 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947] w-full max-w-[978px] h-[45px] border-b border-gray-300 pb-2" data-v-6c133939> United Arab Emirates </h3><p class="font-manrope font-bold text-sm leading-[22px] tracking-normal text-[#0B3947]" data-v-6c133939> Visa 123 LLC Shams Business Centre,<br data-v-6c133939> Sharjah media City Free Zone Al<br data-v-6c133939> Messaned Sharjah </p><div class="flex items-center gap-2 mt-2" data-v-6c133939><span class="font-manrope font-extralight text-base leading-7 tracking-normal text-[#0B3947]" data-v-6c133939> +971 585743188 </span><div class="w-6 h-6 relative" data-v-6c133939><img${ssrRenderAttr("src", _imports_7)} alt="arrow" class="absolute top-[5.22px] left-[4.09px] w-[15.81px] h-[13.55px]" data-v-6c133939></div></div></div></div></div></div></div><div class="h-[211px]" data-v-6c133939></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const aboutUs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6c133939"]]);

export { aboutUs as default };
//# sourceMappingURL=about-us-xkEUOJr8.mjs.map
