import { defineComponent, ref, computed, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import Button from './button-Cy1RM3F0.mjs';
import PaymentModal from './PaymentModal-n9wLBWjS.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import './virtual_public-DJzu2MsY.mjs';
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
import './Dialog-B31xGaki.mjs';
import './Dialogcontent-Vjwp0JDb.mjs';
import './Dialogheader-z5W8MBmq.mjs';
import './Dialogtitle-IOxRdQ2i.mjs';
import './Dialogdescription-BjIwAc9o.mjs';
import './input-BjW8rXgt.mjs';
import './Successmodal-CvcEugtr.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ReviewOrder",
  __ssrInlineRender: true,
  props: {
    destination: {},
    travelers: {},
    governmentFee: {},
    processingFee: {},
    visaDetails: {}
  },
  emits: ["next", "back"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const showPaymentModal = ref(false);
    const totalAmount = computed(() => {
      return props.governmentFee + props.processingFee;
    });
    const expectedDeliveryDate = computed(() => {
      const date = /* @__PURE__ */ new Date();
      date.setDate(date.getDate() + 3);
      return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    });
    const handleContinueToPayment = () => {
      showPaymentModal.value = true;
    };
    const handlePaymentSuccess = (paymentData) => {
      console.log("Payment successful:", paymentData);
      showPaymentModal.value = false;
      emit("next", paymentData);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="flex gap-6"><div class="flex-1"><div class="border rounded-xl p-4 mb-6" style="${ssrRenderStyle({ "border-color": "#1ECE84" })}"><p style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "14px", "line-height": "20px", "color": "#0B3947" })}"> Expected delivery date: ${ssrInterpolate(expectedDeliveryDate.value)}</p></div><div class="border rounded-xl p-6" style="${ssrRenderStyle({ "border-color": "#E5E7EB" })}"><div class="mb-6"><h3 style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "20px", "line-height": "28px", "color": "#0B3947" })}">${ssrInterpolate(__props.destination)} Visa </h3><p style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#6B7280" })}"> You can see the order details below. </p></div><div class="space-y-4 mb-6"><div class="flex justify-between"><span style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" })}"> Valid for: </span><span style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" })}">${ssrInterpolate(__props.visaDetails.validity)}</span></div><div class="flex justify-between"><span style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" })}"> Max stay: </span><span style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" })}">${ssrInterpolate(__props.visaDetails.maxStay)}</span></div><div class="flex justify-between"><span style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" })}"> Number of entries: </span><span style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" })}">${ssrInterpolate(__props.visaDetails.entries)}</span></div></div><div class="border-t mb-6" style="${ssrRenderStyle({ "border-color": "#E5E7EB" })}"></div><div class="flex justify-between items-start"><h4 style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Travelers: </h4><div style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column", "gap": "20px" })}"><!--[-->`);
      ssrRenderList(__props.travelers, (traveler, index) => {
        _push(`<div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style="${ssrRenderStyle({ "background-color": "#E8FFF6" })}"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 7C8.933 7 10.5 5.433 10.5 3.5C10.5 1.567 8.933 0 7 0C5.067 0 3.5 1.567 3.5 3.5C3.5 5.433 5.067 7 7 7Z" fill="#1ECE84"></path><path d="M7 8.75C4.101 8.75 1.75 11.101 1.75 14H12.25C12.25 11.101 9.899 8.75 7 8.75Z" fill="#1ECE84"></path></svg></div><span style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "500", "font-size": "14px", "line-height": "20px", "color": "#0B3947" })}">${ssrInterpolate(traveler)}</span></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="w-[400px] space-y-4"><div class="border-2 rounded-xl p-6" style="${ssrRenderStyle({ "border-color": "#1ECE84" })}"><div class="space-y-4"><div class="flex justify-between items-center"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}">${ssrInterpolate(__props.destination)} Visa </span><div class="flex justify-end"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#27272B" })}">${ssrInterpolate(__props.travelers.length)} traveler${ssrInterpolate(__props.travelers.length > 1 ? "s" : "")}</span></div></div><div class="flex justify-between items-center"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "20px", "color": "#0B3947" })}"> Government Fee </span><div class="flex justify-end"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "400", "font-size": "14px", "line-height": "20px", "color": "#27272B" })}"> Rs ${ssrInterpolate(__props.governmentFee.toFixed(2))}</span></div></div><div class="border-t" style="${ssrRenderStyle({ "border-color": "#E5E7EB" })}"></div><div class="flex justify-between items-center"><span style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> Total </span><div class="flex justify-end"><span style="${ssrRenderStyle({ "font-family": "Geist", "font-weight": "600", "font-size": "16px", "line-height": "24px", "color": "#0B3947" })}"> PKR ${ssrInterpolate(totalAmount.value.toFixed(2))}</span></div></div></div></div>`);
      _push(ssrRenderComponent(Button, {
        onClick: handleContinueToPayment,
        class: "w-full h-12",
        style: { "background-color": "#1ECE84", "color": "white", "border-radius": "6px", "font-family": "Geist", "font-weight": "500", "font-size": "14px", "line-height": "24px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Continue to payment `);
          } else {
            return [
              createTextVNode(" Continue to payment ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(PaymentModal, {
        "is-open": showPaymentModal.value,
        amount: totalAmount.value,
        onClose: ($event) => showPaymentModal.value = false,
        onSuccess: handlePaymentSuccess
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/visa/ReviewOrder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ReviewOrder = Object.assign(_sfc_main, { __name: "VisaReviewOrder" });

export { ReviewOrder as default };
//# sourceMappingURL=ReviewOrder-vAt9vsg2.mjs.map
