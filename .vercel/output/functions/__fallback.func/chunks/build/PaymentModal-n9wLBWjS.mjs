import { defineComponent, ref, reactive, withCtx, createTextVNode, createVNode, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-DJzu2MsY.mjs';
import Dialog from './Dialog-B31xGaki.mjs';
import DialogContent from './Dialogcontent-Vjwp0JDb.mjs';
import DialogHeader from './Dialogheader-z5W8MBmq.mjs';
import DialogTitle from './Dialogtitle-IOxRdQ2i.mjs';
import DialogDescription from './Dialogdescription-BjIwAc9o.mjs';
import _sfc_main$1 from './input-BjW8rXgt.mjs';
import Button from './button-Cy1RM3F0.mjs';
import SuccessModal from './Successmodal-CvcEugtr.mjs';
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
  __name: "PaymentModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    amount: {}
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isProcessing = ref(false);
    const showSuccessModal = ref(false);
    const cardDetails = reactive({
      cardholderName: "",
      expiryDate: "",
      cvv: "",
      cardNumber: ""
    });
    const formatCardNumber = (event) => {
      const input = event.target;
      let value = input.value.replace(/\s/g, "").replace(/\D/g, "");
      const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
      cardDetails.cardNumber = formatted;
    };
    const formatExpiryDate = (event) => {
      const input = event.target;
      let value = input.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      cardDetails.expiryDate = value;
    };
    const formatCVV = (event) => {
      const input = event.target;
      cardDetails.cvv = input.value.replace(/\D/g, "");
    };
    const handleOpenChange = (value) => {
      if (!value && !isProcessing.value) {
        emit("close");
      }
    };
    const handlePayment = async () => {
      isProcessing.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 2e3));
        const paymentData = {
          cardholderName: cardDetails.cardholderName,
          cardNumberLast4: cardDetails.cardNumber.slice(-4),
          amount: props.amount,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        };
        cardDetails.cardholderName = "";
        cardDetails.expiryDate = "";
        cardDetails.cvv = "";
        cardDetails.cardNumber = "";
        showSuccessModal.value = true;
      } catch (error) {
        console.error("Payment failed:", error);
        alert("Payment failed. Please try again.");
      } finally {
        isProcessing.value = false;
      }
    };
    const handleSuccessClose = () => {
      showSuccessModal.value = false;
      emit("close");
      emit("success", {
        cardholderName: cardDetails.cardholderName,
        amount: props.amount,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(Dialog, {
        open: __props.isOpen && !showSuccessModal.value,
        "onUpdate:open": handleOpenChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(DialogContent, { class: "w-[440px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Card Details`);
                            } else {
                              return [
                                createTextVNode("Card Details")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(DialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Add the card details below `);
                            } else {
                              return [
                                createTextVNode(" Add the card details below ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Card Details")
                            ]),
                            _: 1
                          }),
                          createVNode(DialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode(" Add the card details below ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    modelValue: cardDetails.cardholderName,
                    "onUpdate:modelValue": ($event) => cardDetails.cardholderName = $event,
                    type: "text",
                    placeholder: "Cardholder name",
                    required: "",
                    class: "pr-20 h-12",
                    style: { "border": "1px solid #1ECE84" }
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="absolute right-3 top-1/2 transform -translate-y-1/2"${_scopeId2}><img${ssrRenderAttr("src", _imports_0)} alt="Stripe" class="h-6" style="${ssrRenderStyle({ "width": "auto" })}"${_scopeId2}></div></div><div class="flex gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    modelValue: cardDetails.expiryDate,
                    "onUpdate:modelValue": ($event) => cardDetails.expiryDate = $event,
                    type: "text",
                    placeholder: "MM/YY",
                    required: "",
                    maxlength: "5",
                    onInput: formatExpiryDate,
                    class: "flex-1 h-12",
                    style: { "border": "1px solid #1ECE84" }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    modelValue: cardDetails.cvv,
                    "onUpdate:modelValue": ($event) => cardDetails.cvv = $event,
                    type: "text",
                    placeholder: "CVV",
                    required: "",
                    maxlength: "4",
                    onInput: formatCVV,
                    class: "flex-1 h-12",
                    style: { "border": "1px solid #1ECE84" }
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    modelValue: cardDetails.cardNumber,
                    "onUpdate:modelValue": ($event) => cardDetails.cardNumber = $event,
                    type: "text",
                    placeholder: "Card number",
                    required: "",
                    maxlength: "19",
                    onInput: formatCardNumber,
                    class: "h-12",
                    style: { "border": "1px solid #1ECE84" }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(Button, {
                    type: "submit",
                    class: "w-full",
                    style: { "height": "36px", "border-radius": "6px", "padding": "8px 24px", "background-color": "#1ECE84" },
                    disabled: isProcessing.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(isProcessing.value ? "Processing..." : `Pay PKR ${__props.amount.toFixed(2)}`)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(isProcessing.value ? "Processing..." : `Pay PKR ${__props.amount.toFixed(2)}`), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form>`);
                } else {
                  return [
                    createVNode(DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Card Details")
                          ]),
                          _: 1
                        }),
                        createVNode(DialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode(" Add the card details below ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(handlePayment, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode(_sfc_main$1, {
                          modelValue: cardDetails.cardholderName,
                          "onUpdate:modelValue": ($event) => cardDetails.cardholderName = $event,
                          type: "text",
                          placeholder: "Cardholder name",
                          required: "",
                          class: "pr-20 h-12",
                          style: { "border": "1px solid #1ECE84" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "absolute right-3 top-1/2 transform -translate-y-1/2" }, [
                          createVNode("img", {
                            src: _imports_0,
                            alt: "Stripe",
                            class: "h-6",
                            style: { "width": "auto" }
                          })
                        ])
                      ]),
                      createVNode("div", { class: "flex gap-4" }, [
                        createVNode(_sfc_main$1, {
                          modelValue: cardDetails.expiryDate,
                          "onUpdate:modelValue": ($event) => cardDetails.expiryDate = $event,
                          type: "text",
                          placeholder: "MM/YY",
                          required: "",
                          maxlength: "5",
                          onInput: formatExpiryDate,
                          class: "flex-1 h-12",
                          style: { "border": "1px solid #1ECE84" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$1, {
                          modelValue: cardDetails.cvv,
                          "onUpdate:modelValue": ($event) => cardDetails.cvv = $event,
                          type: "text",
                          placeholder: "CVV",
                          required: "",
                          maxlength: "4",
                          onInput: formatCVV,
                          class: "flex-1 h-12",
                          style: { "border": "1px solid #1ECE84" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_sfc_main$1, {
                        modelValue: cardDetails.cardNumber,
                        "onUpdate:modelValue": ($event) => cardDetails.cardNumber = $event,
                        type: "text",
                        placeholder: "Card number",
                        required: "",
                        maxlength: "19",
                        onInput: formatCardNumber,
                        class: "h-12",
                        style: { "border": "1px solid #1ECE84" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(Button, {
                        type: "submit",
                        class: "w-full",
                        style: { "height": "36px", "border-radius": "6px", "padding": "8px 24px", "background-color": "#1ECE84" },
                        disabled: isProcessing.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(isProcessing.value ? "Processing..." : `Pay PKR ${__props.amount.toFixed(2)}`), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(DialogContent, { class: "w-[440px]" }, {
                default: withCtx(() => [
                  createVNode(DialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(DialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Card Details")
                        ]),
                        _: 1
                      }),
                      createVNode(DialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode(" Add the card details below ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    onSubmit: withModifiers(handlePayment, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "relative" }, [
                      createVNode(_sfc_main$1, {
                        modelValue: cardDetails.cardholderName,
                        "onUpdate:modelValue": ($event) => cardDetails.cardholderName = $event,
                        type: "text",
                        placeholder: "Cardholder name",
                        required: "",
                        class: "pr-20 h-12",
                        style: { "border": "1px solid #1ECE84" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", { class: "absolute right-3 top-1/2 transform -translate-y-1/2" }, [
                        createVNode("img", {
                          src: _imports_0,
                          alt: "Stripe",
                          class: "h-6",
                          style: { "width": "auto" }
                        })
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-4" }, [
                      createVNode(_sfc_main$1, {
                        modelValue: cardDetails.expiryDate,
                        "onUpdate:modelValue": ($event) => cardDetails.expiryDate = $event,
                        type: "text",
                        placeholder: "MM/YY",
                        required: "",
                        maxlength: "5",
                        onInput: formatExpiryDate,
                        class: "flex-1 h-12",
                        style: { "border": "1px solid #1ECE84" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$1, {
                        modelValue: cardDetails.cvv,
                        "onUpdate:modelValue": ($event) => cardDetails.cvv = $event,
                        type: "text",
                        placeholder: "CVV",
                        required: "",
                        maxlength: "4",
                        onInput: formatCVV,
                        class: "flex-1 h-12",
                        style: { "border": "1px solid #1ECE84" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_sfc_main$1, {
                      modelValue: cardDetails.cardNumber,
                      "onUpdate:modelValue": ($event) => cardDetails.cardNumber = $event,
                      type: "text",
                      placeholder: "Card number",
                      required: "",
                      maxlength: "19",
                      onInput: formatCardNumber,
                      class: "h-12",
                      style: { "border": "1px solid #1ECE84" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(Button, {
                      type: "submit",
                      class: "w-full",
                      style: { "height": "36px", "border-radius": "6px", "padding": "8px 24px", "background-color": "#1ECE84" },
                      disabled: isProcessing.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(isProcessing.value ? "Processing..." : `Pay PKR ${__props.amount.toFixed(2)}`), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ], 32)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(SuccessModal, {
        "is-open": showSuccessModal.value,
        onClose: handleSuccessClose
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/visa/PaymentModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PaymentModal = Object.assign(_sfc_main, { __name: "VisaPaymentModal" });

export { PaymentModal as default };
//# sourceMappingURL=PaymentModal-n9wLBWjS.mjs.map
