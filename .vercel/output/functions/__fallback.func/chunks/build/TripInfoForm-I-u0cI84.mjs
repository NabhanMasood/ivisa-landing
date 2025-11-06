import { defineComponent, ref, watch, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import Button from './button-Cy1RM3F0.mjs';
import _sfc_main$1 from './label-Du92n_Nj.mjs';
import _sfc_main$2 from './input-BjW8rXgt.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TripInfoForm",
  __ssrInlineRender: true,
  props: {
    nationality: {},
    destination: {}
  },
  emits: ["next"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formData = ref({
      nationality: props.nationality,
      visaType: "180-single",
      applicants: 1
    });
    watch(() => props.nationality, (newNationality) => {
      if (newNationality) {
        formData.value.nationality = newNationality;
      }
    }, { immediate: true });
    const handleNext = () => {
      emit("next", {
        nationality: formData.value.nationality,
        visaType: formData.value.visaType,
        applicants: formData.value.applicants
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "border rounded-xl p-6",
        style: { "border-color": "#E5E7EB" }
      }, _attrs))}><div class="mb-6"><p style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "14px", "line-height": "22px", "color": "#0B3947" })}"> The ${ssrInterpolate(__props.destination)} Visa is mandatory for ${ssrInterpolate(__props.nationality)} passport holders planning to enter ${ssrInterpolate(__props.destination)}</p></div><div class="space-y-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        htmlFor: "nationality",
        style: { "font-family": "Manrope, sans-serif", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` What&#39;s your nationality? `);
          } else {
            return [
              createTextVNode(" What's your nationality? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<select id="nationality" class="w-full mt-2 h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" style="${ssrRenderStyle({ "font-family": "Manrope, sans-serif", "font-size": "14px" })}"><option value="United Arab Emirates"${ssrIncludeBooleanAttr(Array.isArray(formData.value.nationality) ? ssrLooseContain(formData.value.nationality, "United Arab Emirates") : ssrLooseEqual(formData.value.nationality, "United Arab Emirates")) ? " selected" : ""}>🇦🇪 United Arab Emirates</option><option value="United States"${ssrIncludeBooleanAttr(Array.isArray(formData.value.nationality) ? ssrLooseContain(formData.value.nationality, "United States") : ssrLooseEqual(formData.value.nationality, "United States")) ? " selected" : ""}>🇺🇸 United States</option><option value="India"${ssrIncludeBooleanAttr(Array.isArray(formData.value.nationality) ? ssrLooseContain(formData.value.nationality, "India") : ssrLooseEqual(formData.value.nationality, "India")) ? " selected" : ""}>🇮🇳 India</option><option value="United Kingdom"${ssrIncludeBooleanAttr(Array.isArray(formData.value.nationality) ? ssrLooseContain(formData.value.nationality, "United Kingdom") : ssrLooseEqual(formData.value.nationality, "United Kingdom")) ? " selected" : ""}>🇬🇧 United Kingdom</option><option value="Canada"${ssrIncludeBooleanAttr(Array.isArray(formData.value.nationality) ? ssrLooseContain(formData.value.nationality, "Canada") : ssrLooseEqual(formData.value.nationality, "Canada")) ? " selected" : ""}>🇨🇦 Canada</option><option value="Pakistan"${ssrIncludeBooleanAttr(Array.isArray(formData.value.nationality) ? ssrLooseContain(formData.value.nationality, "Pakistan") : ssrLooseEqual(formData.value.nationality, "Pakistan")) ? " selected" : ""}>🇵🇰 Pakistan</option><option value="Morocco"${ssrIncludeBooleanAttr(Array.isArray(formData.value.nationality) ? ssrLooseContain(formData.value.nationality, "Morocco") : ssrLooseEqual(formData.value.nationality, "Morocco")) ? " selected" : ""}>🇲🇦 Morocco</option></select></div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, { htmlFor: "visaType" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="#" style="${ssrRenderStyle({ "color": "#27272B", "font-family": "Manrope, sans-serif", "font-weight": "500", "font-size": "14px", "line-height": "20px" })}" class="hover:underline"${_scopeId}> Applying for </a>`);
          } else {
            return [
              createVNode("a", {
                href: "#",
                style: { "color": "#27272B", "font-family": "Manrope, sans-serif", "font-weight": "500", "font-size": "14px", "line-height": "20px" },
                class: "hover:underline"
              }, " Applying for ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<select id="visaType" class="w-full mt-2 h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" style="${ssrRenderStyle({ "font-family": "Manrope, sans-serif", "font-size": "14px" })}"><option value="180-single"${ssrIncludeBooleanAttr(Array.isArray(formData.value.visaType) ? ssrLooseContain(formData.value.visaType, "180-single") : ssrLooseEqual(formData.value.visaType, "180-single")) ? " selected" : ""}>${ssrInterpolate(__props.destination)} Visa - 180 days, Single entry</option><option value="180-multiple"${ssrIncludeBooleanAttr(Array.isArray(formData.value.visaType) ? ssrLooseContain(formData.value.visaType, "180-multiple") : ssrLooseEqual(formData.value.visaType, "180-multiple")) ? " selected" : ""}>${ssrInterpolate(__props.destination)} Visa - 180 days, Multiple entry</option><option value="90-single"${ssrIncludeBooleanAttr(Array.isArray(formData.value.visaType) ? ssrLooseContain(formData.value.visaType, "90-single") : ssrLooseEqual(formData.value.visaType, "90-single")) ? " selected" : ""}>${ssrInterpolate(__props.destination)} Visa - 90 days, Single entry</option></select></div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        htmlFor: "applicants",
        style: { "font-family": "Manrope, sans-serif", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Number of applicants `);
          } else {
            return [
              createTextVNode(" Number of applicants ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "applicants",
        modelValue: formData.value.applicants,
        "onUpdate:modelValue": ($event) => formData.value.applicants = $event,
        modelModifiers: { number: true },
        type: "number",
        min: "1",
        max: "10",
        class: "w-full mt-2",
        placeholder: "Enter number of applicants"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(Button, {
        onClick: handleNext,
        class: "w-[143px] h-9",
        style: { "background-color": "#1ECE84", "color": "white", "border-radius": "6px", "padding": "8px 16px", "font-family": "Geist, sans-serif", "font-weight": "500", "font-size": "14px", "line-height": "20px", "text-align": "center" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Start Application `);
          } else {
            return [
              createTextVNode(" Start Application ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/visa/TripInfoForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TripInfoForm = Object.assign(_sfc_main, { __name: "VisaTripInfoForm" });

export { TripInfoForm as default };
//# sourceMappingURL=TripInfoForm-I-u0cI84.mjs.map
