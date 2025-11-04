import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import Button from './button-Cy1RM3F0.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';

const _imports_0 = publicAssetsURL("/svg/linkedin.svg");
const _imports_1 = publicAssetsURL("/svg/messages.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "w-full bg-gray-50 border-t border-gray-200 mt-auto" }, _attrs))} data-v-505cf226><div class="container mx-auto max-w-7xl px-6 lg:px-8" data-v-505cf226><div class="py-8" data-v-505cf226><div class="flex items-center justify-between" data-v-505cf226><div class="flex items-center gap-6" data-v-505cf226>`);
      _push(ssrRenderComponent(Button, {
        variant: "link",
        class: "!p-0 !h-auto !font-medium !text-gray-900 hover:!text-gray-700",
        onClick: () => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Home `);
          } else {
            return [
              createTextVNode(" Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Button, {
        variant: "link",
        class: "!p-0 !h-auto !font-normal !text-gray-700 hover:!text-gray-900",
        onClick: () => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/destinations")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Destinations `);
          } else {
            return [
              createTextVNode(" Destinations ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Button, {
        variant: "link",
        class: "!p-0 !h-auto !font-normal !text-gray-700 hover:!text-gray-900",
        onClick: () => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/about-us")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` About us `);
          } else {
            return [
              createTextVNode(" About us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Button, {
        variant: "link",
        class: "!p-0 !h-auto !font-normal !text-gray-700 hover:!text-gray-900",
        onClick: () => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/contact-us")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact us `);
          } else {
            return [
              createTextVNode(" Contact us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(Button, {
        variant: "link",
        class: "!p-0 !h-auto !font-normal !text-gray-700 hover:!text-gray-900",
        onClick: () => _ctx.window.location.href = "mailto:opportunity@visa123.com"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` opportunity@visa123.com `);
          } else {
            return [
              createTextVNode(" opportunity@visa123.com ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="border-t border-gray-200 py-4" data-v-505cf226><div class="flex items-center justify-between" data-v-505cf226><div class="text-sm text-gray-600" data-v-505cf226> © 2025 All rights Reserved. </div><div class="flex items-center gap-4" data-v-505cf226>`);
      _push(ssrRenderComponent(Button, {
        variant: "ghost",
        size: "icon",
        class: "!h-8 !w-8 !text-gray-500 hover:!text-gray-700",
        onClick: () => _ctx.window.open("https://linkedin.com", "_blank")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="LinkedIn" class="h-4 w-4" data-v-505cf226${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "LinkedIn",
                class: "h-4 w-4"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Button, {
        variant: "ghost",
        size: "icon",
        class: "!h-8 !w-8 !text-gray-500 hover:!text-gray-700",
        onClick: () => _ctx.window.location.href = "mailto:opportunity@visa123.com"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_1)} alt="Email" class="h-4 w-4" data-v-505cf226${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_1,
                alt: "Email",
                class: "h-4 w-4"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-505cf226"]]), { __name: "Footer" });

export { __nuxt_component_1 as default };
//# sourceMappingURL=Footer-BoaBZxuy.mjs.map
