import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
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

const _imports_0 = publicAssetsURL("/svg/gray-calendar.svg");
const _imports_1 = publicAssetsURL("/svg/land-plane.svg");
const _imports_2 = publicAssetsURL("/svg/calendar-check.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VisaStats",
  __ssrInlineRender: true,
  props: {
    destination: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "w-[1040px] h-[104px] border rounded-xl mb-6",
        style: { "border-color": "#BDBDBD", "border-width": "1px", "gap": "24px", "padding": "30px 20px" }
      }, _attrs))}><div class="w-[1000px] h-11 flex justify-between items-center"><h2 style="${ssrRenderStyle({ "font-family": "Manrope, sans-serif", "font-weight": "700", "font-size": "20px", "line-height": "28px", "color": "#0B3947" })}">${ssrInterpolate(__props.destination)} Visa </h2><div class="flex gap-5"><div class="flex gap-2 items-center"><div class="w-10 h-11 rounded-lg flex items-center justify-center" style="${ssrRenderStyle({ "background-color": "#383838" })}"><img${ssrRenderAttr("src", _imports_0)} alt="Valid for" style="${ssrRenderStyle({ "width": "19.2px", "height": "19.2px" })}"></div><div><div style="${ssrRenderStyle({ "font-family": "Manrope, sans-serif", "font-weight": "400", "font-size": "12px", "line-height": "20px", "color": "#6B7280" })}">Valid for</div><div style="${ssrRenderStyle({ "font-family": "Manrope, sans-serif", "font-weight": "400", "font-size": "14px", "line-height": "24px", "color": "#0B3947" })}">180 days after issued</div></div></div><div class="flex gap-2 items-center"><div class="w-10 h-11 rounded-lg flex items-center justify-center" style="${ssrRenderStyle({ "background-color": "#383838" })}"><img${ssrRenderAttr("src", _imports_1)} alt="Entries" style="${ssrRenderStyle({ "width": "19.2px", "height": "19.2px" })}"></div><div><div style="${ssrRenderStyle({ "font-family": "Manrope, sans-serif", "font-weight": "400", "font-size": "12px", "line-height": "20px", "color": "#6B7280" })}">Number of entries</div><div style="${ssrRenderStyle({ "font-family": "Manrope, sans-serif", "font-weight": "400", "font-size": "14px", "line-height": "24px", "color": "#0B3947" })}">Single entry</div></div></div><div class="flex gap-2 items-center"><div class="w-10 h-11 rounded-lg flex items-center justify-center" style="${ssrRenderStyle({ "background-color": "#383838" })}"><img${ssrRenderAttr("src", _imports_2)} alt="Max stay" style="${ssrRenderStyle({ "width": "19.2px", "height": "19.2px" })}"></div><div><div style="${ssrRenderStyle({ "font-family": "Manrope, sans-serif", "font-weight": "400", "font-size": "12px", "line-height": "20px", "color": "#6B7280" })}">Max stay</div><div style="${ssrRenderStyle({ "font-family": "Manrope, sans-serif", "font-weight": "400", "font-size": "14px", "line-height": "24px", "color": "#0B3947" })}">30 days per entry</div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/visa/VisaStats.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const VisaStats = Object.assign(_sfc_main, { __name: "VisaStats" });

export { VisaStats as default };
//# sourceMappingURL=VisaStats-Cew3JOII.mjs.map
