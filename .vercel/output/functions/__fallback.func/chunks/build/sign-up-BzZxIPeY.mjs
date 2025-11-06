import { defineComponent, ref, reactive, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_0$1 } from './virtual_public-BcspCJ2z.mjs';
import _sfc_main$1 from './input-BjW8rXgt.mjs';
import Button from './button-Cy1RM3F0.mjs';
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

const _imports_0 = publicAssetsURL("/png/brand.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sign-up",
  __ssrInlineRender: true,
  emits: ["signUpComplete"],
  setup(__props, { emit: __emit }) {
    const isSubmitting = ref(false);
    const formData = reactive({
      email: "",
      password: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col lg:flex-row min-h-screen" }, _attrs))}><div class="w-full lg:w-1/2 h-64 lg:h-screen"><img${ssrRenderAttr("src", _imports_0)} alt="Visa Background" class="w-full h-full object-cover"></div><div class="w-full lg:w-1/2 min-h-screen flex items-center justify-center bg-gray-50/50 shadow-sm p-6"><div class="w-full max-w-md space-y-8"><div><img${ssrRenderAttr("src", _imports_0$1)} alt="VISA123 Logo" class="h-12 w-auto"></div><div class="space-y-1.5 pt-5"><h1 class="text-3xl font-semibold leading-none tracking-tight" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#020617", "letter-spacing": "-0.0075em" })}"> Complete Account Creation </h1><p class="text-base leading-6" style="${ssrRenderStyle({ "font-family": "Geist", "color": "#64748B" })}"> Complete this to access your account </p></div><form class="space-y-6"><div class="space-y-4">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.email,
        "onUpdate:modelValue": ($event) => formData.email = $event,
        type: "email",
        placeholder: "Email Address",
        required: "",
        class: "w-full h-12 border-gray-200"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: formData.password,
        "onUpdate:modelValue": ($event) => formData.password = $event,
        type: "password",
        placeholder: "Password",
        required: "",
        class: "w-full h-12 border-gray-200"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(Button, {
        type: "submit",
        class: "w-full h-9 rounded-md px-4 text-white font-medium text-sm",
        style: { "background-color": "#1ECE84", "font-family": "Geist" },
        disabled: isSubmitting.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(isSubmitting.value ? "Creating Account..." : "Finish Sign Up")}`);
          } else {
            return [
              createTextVNode(toDisplayString(isSubmitting.value ? "Creating Account..." : "Finish Sign Up"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sign-up.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sign-up-BzZxIPeY.mjs.map
