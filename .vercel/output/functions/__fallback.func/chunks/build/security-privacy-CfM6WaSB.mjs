import { ref, mergeProps, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { ChevronLeft, EyeOff, Eye } from 'lucide-vue-next';
import Button from './button-Cy1RM3F0.mjs';
import Card from './Card-CXXOLw0c.mjs';
import _sfc_main$2 from './input-BjW8rXgt.mjs';
import _sfc_main$1 from './label-Du92n_Nj.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';

const _sfc_main = {
  __name: "security-privacy",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const password = ref("");
    const repeatPassword = ref("");
    const showPassword = ref(false);
    const showRepeatPassword = ref(false);
    const goBack = () => {
      router.back();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center pt-10 pb-20 min-h-screen px-4" }, _attrs))}><div class="flex flex-col w-full max-w-[776px] gap-6"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(Button, {
        onClick: goBack,
        variant: "ghost",
        size: "icon",
        class: "rounded-md w-[42px] h-[36px] border border-[#E4E4E8]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChevronLeft), { class: "h-5 w-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl font-semibold tracking-tight text-foreground font-geist text-[#27272B]"> Security &amp; Privacy </h1></div><div class="flex gap-3 w-full sm:w-auto">`);
      _push(ssrRenderComponent(Button, {
        variant: "outline",
        class: "rounded-lg flex-1 sm:flex-none !bg-[#EFEFEF] hover:!bg-[#E5E5E5] border-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Discard `);
          } else {
            return [
              createTextVNode(" Discard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Button, { class: "rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white flex-1 sm:flex-none" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Save Changes `);
          } else {
            return [
              createTextVNode(" Save Changes ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(Card, { class: "rounded-xl border p-4 sm:p-6 bg-white" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-6"${_scopeId}><h2 class="text-lg font-semibold text-foreground font-geist"${_scopeId}>Change Password</h2><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "password",
              class: "text-sm font-medium text-foreground font-inter"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Password `);
                } else {
                  return [
                    createTextVNode(" Password ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "password",
              type: showPassword.value ? "text" : "password",
              modelValue: password.value,
              "onUpdate:modelValue": ($event) => password.value = $event,
              placeholder: "********",
              class: "rounded-lg h-11 font-inter pr-10"
            }, null, _parent2, _scopeId));
            _push2(`<button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"${_scopeId}>`);
            if (showPassword.value) {
              _push2(ssrRenderComponent(unref(EyeOff), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Eye), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            }
            _push2(`</button></div></div><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "repeatPassword",
              class: "text-sm font-medium text-foreground font-inter"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Repeat Password `);
                } else {
                  return [
                    createTextVNode(" Repeat Password ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "repeatPassword",
              type: showRepeatPassword.value ? "text" : "password",
              modelValue: repeatPassword.value,
              "onUpdate:modelValue": ($event) => repeatPassword.value = $event,
              placeholder: "********",
              class: "rounded-lg h-11 font-inter pr-10"
            }, null, _parent2, _scopeId));
            _push2(`<button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"${_scopeId}>`);
            if (showRepeatPassword.value) {
              _push2(ssrRenderComponent(unref(EyeOff), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Eye), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            }
            _push2(`</button></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-6" }, [
                createVNode("h2", { class: "text-lg font-semibold text-foreground font-geist" }, "Change Password"),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode(_sfc_main$1, {
                    for: "password",
                    class: "text-sm font-medium text-foreground font-inter"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Password ")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$2, {
                      id: "password",
                      type: showPassword.value ? "text" : "password",
                      modelValue: password.value,
                      "onUpdate:modelValue": ($event) => password.value = $event,
                      placeholder: "********",
                      class: "rounded-lg h-11 font-inter pr-10"
                    }, null, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => showPassword.value = !showPassword.value,
                      class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    }, [
                      showPassword.value ? (openBlock(), createBlock(unref(EyeOff), {
                        key: 0,
                        class: "h-5 w-5"
                      })) : (openBlock(), createBlock(unref(Eye), {
                        key: 1,
                        class: "h-5 w-5"
                      }))
                    ], 8, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode(_sfc_main$1, {
                    for: "repeatPassword",
                    class: "text-sm font-medium text-foreground font-inter"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Repeat Password ")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "relative" }, [
                    createVNode(_sfc_main$2, {
                      id: "repeatPassword",
                      type: showRepeatPassword.value ? "text" : "password",
                      modelValue: repeatPassword.value,
                      "onUpdate:modelValue": ($event) => repeatPassword.value = $event,
                      placeholder: "********",
                      class: "rounded-lg h-11 font-inter pr-10"
                    }, null, 8, ["type", "modelValue", "onUpdate:modelValue"]),
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => showRepeatPassword.value = !showRepeatPassword.value,
                      class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    }, [
                      showRepeatPassword.value ? (openBlock(), createBlock(unref(EyeOff), {
                        key: 0,
                        class: "h-5 w-5"
                      })) : (openBlock(), createBlock(unref(Eye), {
                        key: 1,
                        class: "h-5 w-5"
                      }))
                    ], 8, ["onClick"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/security-privacy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=security-privacy-CfM6WaSB.mjs.map
