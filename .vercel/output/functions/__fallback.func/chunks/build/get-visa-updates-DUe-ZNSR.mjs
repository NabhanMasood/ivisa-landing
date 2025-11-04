import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import HeaderLoggedIn from './HeaderLoggedIn-B8RzWlof.mjs';
import Button from './button-Cy1RM3F0.mjs';
import _sfc_main$1 from './input-BjW8rXgt.mjs';
import Card from './Card-CXXOLw0c.mjs';
import CardContent from './CardContent-DLRaKZzq.mjs';
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
import './DropdownMenu-C-dUPqGY.mjs';
import 'radix-vue';
import './DropdownMenuTrigger-B7jF-YDx.mjs';
import './DropdownMenuContent-BPx_eUMr.mjs';
import './utils-BpV8ZjlK.mjs';
import './DropdownMenuItem-D2DqBvlk.mjs';
import 'class-variance-authority';
import 'vue-router';

const _imports_0 = publicAssetsURL("/svg/get-visa-1.svg");
const _imports_1 = publicAssetsURL("/svg/get-visa-2.svg");
const _imports_2 = publicAssetsURL("/svg/get-visa-3.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "get-visa-updates",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const handleJoinNow = () => {
      if (email.value) {
        console.log("Subscribing email:", email.value);
        alert("Thank you for subscribing! You will receive visa updates at " + email.value);
        email.value = "";
      } else {
        alert("Please enter your email address");
      }
    };
    const handleSubscribe = () => {
      alert("Subscribe button clicked! Please use the email form above to subscribe.");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))} data-v-08e9dc00>`);
      _push(ssrRenderComponent(HeaderLoggedIn, null, null, _parent));
      _push(`<div class="container mx-auto px-6 lg:px-8 py-12" data-v-08e9dc00><div class="max-w-[1200px] mx-auto flex flex-col gap-[121px]" data-v-08e9dc00><div class="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12" data-v-08e9dc00><div class="flex flex-col gap-6" data-v-08e9dc00><div class="inline-flex items-center gap-2.5 w-fit bg-[#F1F9FC] rounded-full px-[15px] py-[5px] h-[34px]" data-v-08e9dc00><span class="font-manrope font-medium text-sm text-gray-700 uppercase" data-v-08e9dc00>GET VISA UPDATES</span></div><h1 class="font-manrope font-bold text-[48px] leading-[64px] tracking-[-1.8px] text-[#0A3D3F] max-w-[558px]" data-v-08e9dc00> Stay Ahead.<br data-v-08e9dc00>Travel with Confidence. </h1></div><div class="flex flex-col gap-6 max-w-[642px] lg:mt-[58px]" data-v-08e9dc00><p class="font-manrope font-normal text-base leading-7 tracking-[-0.12px] text-gray-600" data-v-08e9dc00> Join thousands of travelers who rely on Visa123 for timely visa updates, practical travel advice, and exclusive offers delivered straight to your inbox. </p><div class="flex flex-col sm:flex-row gap-5 max-w-[581px]" data-v-08e9dc00>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        type: "email",
        placeholder: "Enter your email",
        modelValue: email.value,
        "onUpdate:modelValue": ($event) => email.value = $event,
        "custom-class": "flex-1 h-[50px] rounded-[10px] font-manrope"
      }, null, _parent));
      _push(ssrRenderComponent(Button, {
        onClick: handleJoinNow,
        class: "w-full sm:w-[164px] h-[50px] rounded-[10px] !bg-[#02D275] hover:!bg-[#02D275]/90 !text-white font-manrope font-semibold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Join now `);
          } else {
            return [
              createTextVNode(" Join now ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-08e9dc00>`);
      _push(ssrRenderComponent(Card, { class: "w-full h-auto lg:h-[226px] rounded-lg bg-[#F1F9FC] border-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CardContent, { class: "p-[35px] flex flex-col gap-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-[61.875px] h-[60px]" data-v-08e9dc00${_scopeId2}><img${ssrRenderAttr("src", _imports_0)} alt="visa alert icon" class="w-full h-full" data-v-08e9dc00${_scopeId2}></div><div class="flex flex-col gap-2" data-v-08e9dc00${_scopeId2}><h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-gray-900" data-v-08e9dc00${_scopeId2}> Fresh visa alerts </h3><p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-gray-600" data-v-08e9dc00${_scopeId2}> Be notified instantly of important visa changes that could impact your journey. </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-[61.875px] h-[60px]" }, [
                      createVNode("img", {
                        src: _imports_0,
                        alt: "visa alert icon",
                        class: "w-full h-full"
                      })
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode("h3", { class: "font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-gray-900" }, " Fresh visa alerts "),
                      createVNode("p", { class: "font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-gray-600" }, " Be notified instantly of important visa changes that could impact your journey. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(CardContent, { class: "p-[35px] flex flex-col gap-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-[61.875px] h-[60px]" }, [
                    createVNode("img", {
                      src: _imports_0,
                      alt: "visa alert icon",
                      class: "w-full h-full"
                    })
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("h3", { class: "font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-gray-900" }, " Fresh visa alerts "),
                    createVNode("p", { class: "font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-gray-600" }, " Be notified instantly of important visa changes that could impact your journey. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, { class: "w-full h-auto lg:h-[226px] rounded-lg bg-[#F1F9FC] border-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CardContent, { class: "p-[35px] flex flex-col gap-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-[61.875px] h-[60px]" data-v-08e9dc00${_scopeId2}><img${ssrRenderAttr("src", _imports_1)} alt="travel guidance icon" class="w-full h-full" data-v-08e9dc00${_scopeId2}></div><div class="flex flex-col gap-2" data-v-08e9dc00${_scopeId2}><h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-gray-900" data-v-08e9dc00${_scopeId2}> Smart travel guidance </h3><p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-gray-600" data-v-08e9dc00${_scopeId2}> Get insider tips that make your trips simpler, safer, and more enjoyable. </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-[61.875px] h-[60px]" }, [
                      createVNode("img", {
                        src: _imports_1,
                        alt: "travel guidance icon",
                        class: "w-full h-full"
                      })
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode("h3", { class: "font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-gray-900" }, " Smart travel guidance "),
                      createVNode("p", { class: "font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-gray-600" }, " Get insider tips that make your trips simpler, safer, and more enjoyable. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(CardContent, { class: "p-[35px] flex flex-col gap-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-[61.875px] h-[60px]" }, [
                    createVNode("img", {
                      src: _imports_1,
                      alt: "travel guidance icon",
                      class: "w-full h-full"
                    })
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("h3", { class: "font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-gray-900" }, " Smart travel guidance "),
                    createVNode("p", { class: "font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-gray-600" }, " Get insider tips that make your trips simpler, safer, and more enjoyable. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, { class: "w-full h-auto lg:h-[226px] rounded-lg bg-[#F1F9FC] border-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CardContent, { class: "p-[35px] flex flex-col gap-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-[61.875px] h-[60px]" data-v-08e9dc00${_scopeId2}><img${ssrRenderAttr("src", _imports_2)} alt="special deals icon" class="w-full h-full" data-v-08e9dc00${_scopeId2}></div><div class="flex flex-col gap-2" data-v-08e9dc00${_scopeId2}><h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-gray-900" data-v-08e9dc00${_scopeId2}> Special deals </h3><p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-gray-600" data-v-08e9dc00${_scopeId2}> Enjoy access to unique discounts and limited-time savings on your travels. </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-[61.875px] h-[60px]" }, [
                      createVNode("img", {
                        src: _imports_2,
                        alt: "special deals icon",
                        class: "w-full h-full"
                      })
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode("h3", { class: "font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-gray-900" }, " Special deals "),
                      createVNode("p", { class: "font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-gray-600" }, " Enjoy access to unique discounts and limited-time savings on your travels. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(CardContent, { class: "p-[35px] flex flex-col gap-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-[61.875px] h-[60px]" }, [
                    createVNode("img", {
                      src: _imports_2,
                      alt: "special deals icon",
                      class: "w-full h-full"
                    })
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("h3", { class: "font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-gray-900" }, " Special deals "),
                    createVNode("p", { class: "font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-gray-600" }, " Enjoy access to unique discounts and limited-time savings on your travels. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-[-100px]" data-v-08e9dc00>`);
      _push(ssrRenderComponent(Button, {
        onClick: handleSubscribe,
        class: "w-full sm:w-[164px] h-[50px] rounded-[10px] !bg-[#02D275] hover:!bg-[#02D275]/90 !text-white font-manrope font-semibold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Subscribe Now `);
          } else {
            return [
              createTextVNode(" Subscribe Now ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="h-[211px]" data-v-08e9dc00></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/get-visa-updates.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const getVisaUpdates = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-08e9dc00"]]);

export { getVisaUpdates as default };
//# sourceMappingURL=get-visa-updates-DUe-ZNSR.mjs.map
