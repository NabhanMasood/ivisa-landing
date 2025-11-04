import { defineComponent, mergeProps, withCtx, createTextVNode, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import Button from './button-Cy1RM3F0.mjs';
import Card from './Card-CXXOLw0c.mjs';
import { n as navigateTo } from './server.mjs';
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
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import 'vue-router';

const _imports_0 = publicAssetsURL("/png/choose-us.png");
const _imports_1 = publicAssetsURL("/svg/clock.svg");
const _imports_2 = publicAssetsURL("/svg/check.svg");
const _imports_3 = publicAssetsURL("/svg/spy.svg");
const _imports_4 = publicAssetsURL("/svg/question.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WhyChooseUs",
  __ssrInlineRender: true,
  setup(__props) {
    const handleApplyNow = () => {
      navigateTo("/visa-application");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-white py-8 lg:py-12" }, _attrs))}><div class="container mx-auto px-6 lg:px-8"><div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto"><div class="space-y-8"><div class="space-y-6"><h2 class="text-[48px] leading-[50px] font-bold text-black tracking-[1px]" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif", "font-weight": "700" })}"> Why choose us? </h2><p class="text-[16px] leading-[34px] text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif", "font-weight": "500" })}"> Our Journey, Simplified. No more visa confusion. No more endless paperwork. Whether it&#39;s a Thailand ETA, Morocco eVisa, Turkish Visa, or Egypt Standard Visa — we&#39;re here to make your travel dreams stress-free. </p></div><div>`);
      _push(ssrRenderComponent(Button, {
        size: "lg",
        class: "!bg-[#08D07A] hover:!bg-[#06B869] !text-white !h-[50.8px] !rounded-[10px] !px-8 !font-semibold !text-base shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 active:translate-y-0",
        style: { "font-family": "'Manrope', sans-serif" },
        onClick: handleApplyNow
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Apply Now <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg>`);
          } else {
            return [
              createTextVNode(" Apply Now "),
              (openBlock(), createBlock("svg", {
                class: "ml-2 w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M17 8l4 4m0 0l-4 4m4-4H3"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="relative">`);
      _push(ssrRenderComponent(Card, { class: "!rounded-[24px] overflow-hidden shadow-2xl border-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="Traveler exploring historic architecture" class="w-full h-[500px] lg:h-[600px] object-cover"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "Traveler exploring historic architecture",
                class: "w-full h-[500px] lg:h-[600px] object-cover"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="flex flex-wrap justify-center gap-8 mt-12 lg:mt-16">`);
      _push(ssrRenderComponent(Card, { class: "!rounded-[16px] !bg-[#F1F9FC] !border-0 text-center flex flex-col items-center justify-center p-10 w-[580px] h-[190px]" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-center space-y-2"${_scopeId}><div class="w-14 h-14 flex items-center justify-center"${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="Clock" class="w-[25px] h-[25px]"${_scopeId}></div><h3 class="text-[20.8px] leading-[24.96px] font-bold text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif" })}"${_scopeId}> Fast and hassle-free </h3><p class="text-[16px] leading-[25px] text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif" })}"${_scopeId}> Enjoy a far simpler process than dealing with foreign governments. </p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-center space-y-2" }, [
                createVNode("div", { class: "w-14 h-14 flex items-center justify-center" }, [
                  createVNode("img", {
                    src: _imports_1,
                    alt: "Clock",
                    class: "w-[25px] h-[25px]"
                  })
                ]),
                createVNode("h3", {
                  class: "text-[20.8px] leading-[24.96px] font-bold text-[#0B3947]",
                  style: { "font-family": "'Manrope', sans-serif" }
                }, " Fast and hassle-free "),
                createVNode("p", {
                  class: "text-[16px] leading-[25px] text-[#0B3947]",
                  style: { "font-family": "'Manrope', sans-serif" }
                }, " Enjoy a far simpler process than dealing with foreign governments. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, { class: "!rounded-[16px] !bg-[#F1F9FC] !border-0 text-center flex flex-col items-center justify-center p-10 w-[580px] h-[190px]" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-center space-y-2"${_scopeId}><div class="w-14 h-14 flex items-center justify-center"${_scopeId}><img${ssrRenderAttr("src", _imports_2)} alt="Check" class="w-[25px] h-[25px]"${_scopeId}></div><h3 class="text-[20.8px] leading-[24.96px] font-bold text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif" })}"${_scopeId}> Get approved </h3><p class="text-[16px] leading-[25px] text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif" })}"${_scopeId}> We have a 98% visa approval rate. Our team is committed to your success! </p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-center space-y-2" }, [
                createVNode("div", { class: "w-14 h-14 flex items-center justify-center" }, [
                  createVNode("img", {
                    src: _imports_2,
                    alt: "Check",
                    class: "w-[25px] h-[25px]"
                  })
                ]),
                createVNode("h3", {
                  class: "text-[20.8px] leading-[24.96px] font-bold text-[#0B3947]",
                  style: { "font-family": "'Manrope', sans-serif" }
                }, " Get approved "),
                createVNode("p", {
                  class: "text-[16px] leading-[25px] text-[#0B3947]",
                  style: { "font-family": "'Manrope', sans-serif" }
                }, " We have a 98% visa approval rate. Our team is committed to your success! ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, { class: "!rounded-[16px] !bg-[#F1F9FC] !border-0 text-center flex flex-col items-center justify-center p-10 w-[580px] h-[190px]" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-center space-y-2"${_scopeId}><div class="w-14 h-14 flex items-center justify-center"${_scopeId}><img${ssrRenderAttr("src", _imports_3)} alt="Security" class="w-[25px] h-[25px]"${_scopeId}></div><h3 class="text-[20.8px] leading-[24.96px] font-bold text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif" })}"${_scopeId}> Secure and safe </h3><p class="text-[16px] leading-[25px] text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif" })}"${_scopeId}> Your security is our priority. </p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-center space-y-2" }, [
                createVNode("div", { class: "w-14 h-14 flex items-center justify-center" }, [
                  createVNode("img", {
                    src: _imports_3,
                    alt: "Security",
                    class: "w-[25px] h-[25px]"
                  })
                ]),
                createVNode("h3", {
                  class: "text-[20.8px] leading-[24.96px] font-bold text-[#0B3947]",
                  style: { "font-family": "'Manrope', sans-serif" }
                }, " Secure and safe "),
                createVNode("p", {
                  class: "text-[16px] leading-[25px] text-[#0B3947]",
                  style: { "font-family": "'Manrope', sans-serif" }
                }, " Your security is our priority. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, { class: "!rounded-[16px] !bg-[#F1F9FC] !border-0 text-center flex flex-col items-center justify-center p-10 w-[580px] h-[190px]" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-center space-y-2"${_scopeId}><div class="w-14 h-14 flex items-center justify-center"${_scopeId}><img${ssrRenderAttr("src", _imports_4)} alt="Support" class="w-[25px] h-[25px]"${_scopeId}></div><h3 class="text-[20.8px] leading-[24.96px] font-bold text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif" })}"${_scopeId}> Awesome support </h3><p class="text-[16px] leading-[25px] text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif" })}"${_scopeId}> Don&#39;t worry! Our customer support is ready to help you 24/7. </p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-center space-y-2" }, [
                createVNode("div", { class: "w-14 h-14 flex items-center justify-center" }, [
                  createVNode("img", {
                    src: _imports_4,
                    alt: "Support",
                    class: "w-[25px] h-[25px]"
                  })
                ]),
                createVNode("h3", {
                  class: "text-[20.8px] leading-[24.96px] font-bold text-[#0B3947]",
                  style: { "font-family": "'Manrope', sans-serif" }
                }, " Awesome support "),
                createVNode("p", {
                  class: "text-[16px] leading-[25px] text-[#0B3947]",
                  style: { "font-family": "'Manrope', sans-serif" }
                }, " Don't worry! Our customer support is ready to help you 24/7. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WhyChooseUs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "WhyChooseUs" });

export { __nuxt_component_1 as default };
//# sourceMappingURL=WhyChooseUs-YMFMLc7F.mjs.map
