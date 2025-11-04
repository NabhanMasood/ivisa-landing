import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VisaStepper",
  __ssrInlineRender: true,
  props: {
    currentStep: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex items-center justify-center mb-8" }, _attrs))}><div class="flex items-start justify-center" style="${ssrRenderStyle({ "width": "600px", "height": "64px" })}"><div class="flex flex-col items-center gap-1" style="${ssrRenderStyle({ "width": "162px", "height": "64px" })}"><div class="w-8 h-8 flex-shrink-0 rounded-full border-2 flex items-center justify-center" style="${ssrRenderStyle({
        borderColor: __props.currentStep >= 1 ? "#1ECE84" : "#E5E7EB",
        backgroundColor: __props.currentStep > 1 ? "#1ECE84" : "transparent"
      })}">`);
      if (__props.currentStep > 1) {
        _push(`<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>`);
      } else {
        _push(`<div class="w-3 h-3 rounded-full" style="${ssrRenderStyle({ backgroundColor: __props.currentStep === 1 ? "#1ECE84" : "#E5E7EB" })}"></div>`);
      }
      _push(`</div><span style="${ssrRenderStyle({ "font-family": "Manrope, sans-serif", "font-weight": "700", "font-size": "20px", "line-height": "28px", "text-align": "center", "color": "#0B3947" })}"> Trip info </span></div><div class="flex items-center" style="${ssrRenderStyle({ "width": "144.75px", "margin-top": "16px" })}"><div style="${ssrRenderStyle([{ "width": "144.75px", "height": "1.35px", "border-radius": "2px" }, { background: __props.currentStep >= 2 ? "#1ECE84" : "#E5E7EB" }])}"></div></div><div class="flex flex-col items-center gap-1" style="${ssrRenderStyle({ "width": "162px", "height": "64px" })}"><div class="w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center" style="${ssrRenderStyle({ borderColor: __props.currentStep >= 2 ? "#1ECE84" : "#E5E7EB" })}"><div class="w-3 h-3 rounded-full" style="${ssrRenderStyle({ backgroundColor: __props.currentStep >= 2 ? "#1ECE84" : "#E5E7EB" })}"></div></div><span style="${ssrRenderStyle({ "font-family": "Manrope, sans-serif", "font-weight": "700", "font-size": "20px", "line-height": "28px", "text-align": "center", "color": "#0B3947" })}"> Your info </span></div><div class="flex items-center" style="${ssrRenderStyle({ "width": "144.75px", "margin-top": "16px" })}"><div style="${ssrRenderStyle({ "width": "144.75px", "height": "1.35px", "background": "#E5E7EB", "border-radius": "2px" })}"></div></div><div class="flex flex-col items-center gap-1" style="${ssrRenderStyle({ "width": "162px", "height": "64px" })}"><div class="w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center" style="${ssrRenderStyle({ "border-color": "#E5E7EB" })}"><div class="w-3 h-3 rounded-full" style="${ssrRenderStyle({ "background-color": "#E5E7EB" })}"></div></div><span style="${ssrRenderStyle({ "font-family": "Manrope, sans-serif", "font-weight": "700", "font-size": "20px", "line-height": "28px", "text-align": "center", "color": "#0B3947" })}"> Checkout </span></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/visa/VisaStepper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const VisaStepper = Object.assign(_sfc_main, { __name: "VisaStepper" });

export { VisaStepper as default };
//# sourceMappingURL=VisaStepper-AXHsCKlR.mjs.map
