import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-D1aBSLhn.mjs';
import Button from './button-Cy1RM3F0.mjs';
import '../routes/renderer.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CheckoutForm",
  __ssrInlineRender: true,
  props: {
    destination: {},
    travelerCount: {},
    governmentFee: {}
  },
  emits: ["next", "back"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const selectedProcessing = ref("standard");
    const processingFees = {
      "standard": 5320,
      "rush": 5320,
      "super-rush": 15320
    };
    const handleContinue = () => {
      if (!selectedProcessing.value) {
        alert("Please select a processing time");
        return;
      }
      emit("next", {
        processingType: selectedProcessing.value,
        processingFee: processingFees[selectedProcessing.value]
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex gap-6" }, _attrs))}><div class="flex-1"><div class="mb-6" style="${ssrRenderStyle({ "width": "656px", "height": "43px", "gap": "7px", "padding-right": "24px", "padding-bottom": "6px" })}"><h2 style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "16px", "color": "#27272B" })}"> Choose your processing time </h2><p style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#757579" })}"> Enter the details as they appear on your passport. </p></div><div class="border rounded-xl p-6" style="${ssrRenderStyle({ "border-color": "#E5E7EB" })}"><div class="mb-6 max-w-[588px] mx-auto"><h3 style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Passport Details </h3><p style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#6B7280" })}"> Enter the details as they appear on your passport. </p></div><div class="space-y-4 flex flex-col items-center"><button class="text-left transition-all" style="${ssrRenderStyle({
        width: "588px",
        height: "70px",
        borderWidth: "1px",
        gap: "10px",
        borderRadius: "10px",
        paddingTop: "14px",
        paddingRight: "15px",
        paddingBottom: "14px",
        paddingLeft: "15px",
        border: selectedProcessing.value === "standard" ? "1px solid #1ECE84" : "1px solid #D4D4DA",
        backgroundColor: selectedProcessing.value === "standard" ? "#E8FFF6" : "#FFFFFF"
      })}" type="button"><div class="flex justify-between items-center"><div><h4 style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Standard </h4><p style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#6B7280" })}"> 24 Hour Processing </p></div><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> +5,320 PKR </span></div></button><button class="text-left transition-all" style="${ssrRenderStyle({
        width: "588px",
        height: "70px",
        borderWidth: "1px",
        gap: "10px",
        borderRadius: "10px",
        paddingTop: "14px",
        paddingRight: "15px",
        paddingBottom: "14px",
        paddingLeft: "15px",
        border: selectedProcessing.value === "rush" ? "1px solid #1ECE84" : "1px solid #D4D4DA",
        backgroundColor: selectedProcessing.value === "rush" ? "#E8FFF6" : "#FFFFFF"
      })}" type="button"><div class="flex justify-between items-center"><div><h4 style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Rush </h4><p style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#6B7280" })}"> 4 Hour Processing </p></div><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> +5,320 PKR </span></div></button><button class="text-left transition-all" style="${ssrRenderStyle({
        width: "588px",
        height: "70px",
        borderWidth: "1px",
        gap: "10px",
        borderRadius: "10px",
        paddingTop: "14px",
        paddingRight: "15px",
        paddingBottom: "14px",
        paddingLeft: "15px",
        border: selectedProcessing.value === "super-rush" ? "1px solid #1ECE84" : "1px solid #D4D4DA",
        backgroundColor: selectedProcessing.value === "super-rush" ? "#E8FFF6" : "#FFFFFF"
      })}" type="button"><div class="flex justify-between items-center"><div><h4 style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Super Rush </h4><p style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#6B7280" })}"> 30 Minute Processing </p></div><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> +15,320 PKR </span></div></button></div></div></div><div class="w-[400px] space-y-4"><div class="border-2 rounded-xl p-6" style="${ssrRenderStyle({ "border-color": "#1ECE84" })}"><div class="space-y-4"><div class="flex justify-between items-center"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}">${ssrInterpolate(__props.destination)} Visa </span><div class="flex justify-end"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#27272B" })}">${ssrInterpolate(__props.travelerCount)} traveler${ssrInterpolate(__props.travelerCount > 1 ? "s" : "")}</span></div></div><div class="flex justify-between items-center"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "20px", "color": "#0B3947" })}"> Government Fee </span><div class="flex justify-end"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#27272B" })}"> Rs ${ssrInterpolate(__props.governmentFee.toFixed(2))}</span></div></div><div class="border-t" style="${ssrRenderStyle({ "border-color": "#E5E7EB" })}"></div><div class="flex justify-between items-center"><span style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Total </span><div class="flex justify-end"><span style="${ssrRenderStyle({ "font-family": "geist", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#27272B" })}"> Calculated at checkout </span></div></div></div></div>`);
      _push(ssrRenderComponent(Button, {
        onClick: handleContinue,
        class: "w-full h-12",
        style: { "background-color": "#1ECE84", "color": "white", "border-radius": "6px", "font-family": "Geist", "font-weight": "500", "font-size": "14px", "line-height": "24px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Save &amp; Countinue `);
          } else {
            return [
              createTextVNode(" Save & Countinue ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="border rounded-xl p-4" style="${ssrRenderStyle({ "border-color": "#E5E7EB" })}"><div class="flex items-start gap-3"><img${ssrRenderAttr("src", _imports_0)} alt="Security" style="${ssrRenderStyle({ "width": "19.2px", "height": "19.2px" })}"><p style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "500", "font-size": "16px", "line-height": "20px", "color": "#3E3E3E" })}"> We take strong measuresto protect your information </p></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/visa/CheckoutForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CheckoutForm = Object.assign(_sfc_main, { __name: "VisaCheckoutForm" });

export { CheckoutForm as default };
//# sourceMappingURL=CheckoutForm-BwpbxOdb.mjs.map
