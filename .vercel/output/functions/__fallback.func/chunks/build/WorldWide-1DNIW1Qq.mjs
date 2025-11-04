import { defineComponent, mergeProps, withCtx, createVNode, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import Card from './Card-CXXOLw0c.mjs';
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
import './utils-BpV8ZjlK.mjs';
import 'vue-router';

const _imports_0 = publicAssetsURL("/svg/countries/Schengen.svg");
const _imports_1 = publicAssetsURL("/svg/countries/lasVegas.svg");
const _imports_2 = publicAssetsURL("/svg/countries/England.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorldWide",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-white py-12 lg:py-20" }, _attrs))} data-v-89156e3a><div class="container mx-auto px-6 lg:px-8" data-v-89156e3a><div class="text-center max-w-4xl mx-auto mb-12 lg:mb-16" data-v-89156e3a><h2 class="text-[48px] leading-[50px] font-bold text-black tracking-[1px] mb-6" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif", "font-weight": "700" })}" data-v-89156e3a> Worldwide Destinations </h2><p class="text-[16px] leading-[34px] text-[#0B3947]" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif", "font-weight": "500" })}" data-v-89156e3a> Check out our customers&#39; most frequented travel destinations </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto" data-v-89156e3a>`);
      _push(ssrRenderComponent(Card, { class: "group relative overflow-hidden rounded-[16px] border-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative h-[450px] w-[364px] max-w-full rounded-[16px] overflow-hidden" data-v-89156e3a${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="Schengen destination with autumn scenery" class="absolute inset-0 w-full h-full object-cover rounded-[16px]" data-v-89156e3a${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[16px]" data-v-89156e3a${_scopeId}></div><div class="absolute bottom-0 left-0 right-0 p-6 text-white rounded-b-[16px]" data-v-89156e3a${_scopeId}><h3 class="text-[32px] leading-[40px] font-bold mb-2" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif", "font-weight": "700" })}" data-v-89156e3a${_scopeId}> Schengen </h3><div class="flex items-center gap-2" data-v-89156e3a${_scopeId}><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" data-v-89156e3a${_scopeId}><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" data-v-89156e3a${_scopeId}></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clip-rule="evenodd" data-v-89156e3a${_scopeId}></path></svg><span class="text-[13px] leading-[34px] font-normal text-white" style="${ssrRenderStyle({ "font-family": "'Helvetica', sans-serif", "font-weight": "400" })}" data-v-89156e3a${_scopeId}> +46,750 processed Visas </span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "relative h-[450px] w-[364px] max-w-full rounded-[16px] overflow-hidden" }, [
                createVNode("img", {
                  src: _imports_0,
                  alt: "Schengen destination with autumn scenery",
                  class: "absolute inset-0 w-full h-full object-cover rounded-[16px]"
                }),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[16px]" }),
                createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-6 text-white rounded-b-[16px]" }, [
                  createVNode("h3", {
                    class: "text-[32px] leading-[40px] font-bold mb-2",
                    style: { "font-family": "'Manrope', sans-serif", "font-weight": "700" }
                  }, " Schengen "),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createVNode("path", { d: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" }),
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z",
                        "clip-rule": "evenodd"
                      })
                    ])),
                    createVNode("span", {
                      class: "text-[13px] leading-[34px] font-normal text-white",
                      style: { "font-family": "'Helvetica', sans-serif", "font-weight": "400" }
                    }, " +46,750 processed Visas ")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, { class: "group relative overflow-hidden rounded-[16px] border-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative h-[450px] w-[364px] max-w-full rounded-[16px] overflow-hidden" data-v-89156e3a${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="United States destination" class="absolute inset-0 w-full h-full object-cover rounded-[16px]" data-v-89156e3a${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[16px]" data-v-89156e3a${_scopeId}></div><div class="absolute bottom-0 left-0 right-0 p-6 text-white rounded-b-[16px]" data-v-89156e3a${_scopeId}><h3 class="text-[32px] leading-[40px] font-bold mb-2" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif", "font-weight": "700" })}" data-v-89156e3a${_scopeId}> United States </h3><div class="flex items-center gap-2" data-v-89156e3a${_scopeId}><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" data-v-89156e3a${_scopeId}><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" data-v-89156e3a${_scopeId}></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clip-rule="evenodd" data-v-89156e3a${_scopeId}></path></svg><span class="text-[13px] leading-[34px] font-normal text-white" style="${ssrRenderStyle({ "font-family": "'Helvetica', sans-serif", "font-weight": "400" })}" data-v-89156e3a${_scopeId}> +89,500 processed Visas </span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "relative h-[450px] w-[364px] max-w-full rounded-[16px] overflow-hidden" }, [
                createVNode("img", {
                  src: _imports_1,
                  alt: "United States destination",
                  class: "absolute inset-0 w-full h-full object-cover rounded-[16px]"
                }),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[16px]" }),
                createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-6 text-white rounded-b-[16px]" }, [
                  createVNode("h3", {
                    class: "text-[32px] leading-[40px] font-bold mb-2",
                    style: { "font-family": "'Manrope', sans-serif", "font-weight": "700" }
                  }, " United States "),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createVNode("path", { d: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" }),
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z",
                        "clip-rule": "evenodd"
                      })
                    ])),
                    createVNode("span", {
                      class: "text-[13px] leading-[34px] font-normal text-white",
                      style: { "font-family": "'Helvetica', sans-serif", "font-weight": "400" }
                    }, " +89,500 processed Visas ")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, { class: "group relative overflow-hidden rounded-[16px] border-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative h-[450px] w-[364px] max-w-full rounded-[16px] overflow-hidden" data-v-89156e3a${_scopeId}><img${ssrRenderAttr("src", _imports_2)} alt="England destination" class="absolute inset-0 w-full h-full object-cover rounded-[16px]" data-v-89156e3a${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[16px]" data-v-89156e3a${_scopeId}></div><div class="absolute bottom-0 left-0 right-0 p-6 text-white rounded-b-[16px]" data-v-89156e3a${_scopeId}><h3 class="text-[32px] leading-[40px] font-bold mb-2" style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif", "font-weight": "700" })}" data-v-89156e3a${_scopeId}> England </h3><div class="flex items-center gap-2" data-v-89156e3a${_scopeId}><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" data-v-89156e3a${_scopeId}><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" data-v-89156e3a${_scopeId}></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clip-rule="evenodd" data-v-89156e3a${_scopeId}></path></svg><span class="text-[13px] leading-[34px] font-normal text-white" style="${ssrRenderStyle({ "font-family": "'Helvetica', sans-serif", "font-weight": "400" })}" data-v-89156e3a${_scopeId}> +42,000 processed Visas </span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "relative h-[450px] w-[364px] max-w-full rounded-[16px] overflow-hidden" }, [
                createVNode("img", {
                  src: _imports_2,
                  alt: "England destination",
                  class: "absolute inset-0 w-full h-full object-cover rounded-[16px]"
                }),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[16px]" }),
                createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-6 text-white rounded-b-[16px]" }, [
                  createVNode("h3", {
                    class: "text-[32px] leading-[40px] font-bold mb-2",
                    style: { "font-family": "'Manrope', sans-serif", "font-weight": "700" }
                  }, " England "),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createVNode("path", { d: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" }),
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z",
                        "clip-rule": "evenodd"
                      })
                    ])),
                    createVNode("span", {
                      class: "text-[13px] leading-[34px] font-normal text-white",
                      style: { "font-family": "'Helvetica', sans-serif", "font-weight": "400" }
                    }, " +42,000 processed Visas ")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WorldWide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-89156e3a"]]), { __name: "WorldWide" });

export { __nuxt_component_2 as default };
//# sourceMappingURL=WorldWide-1DNIW1Qq.mjs.map
