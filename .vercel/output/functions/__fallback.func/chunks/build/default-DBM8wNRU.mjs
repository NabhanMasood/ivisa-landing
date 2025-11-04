import __nuxt_component_0 from './Header-D3q8Jzw4.mjs';
import __nuxt_component_1 from './Footer-BoaBZxuy.mjs';
import { computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import './nuxt-link-BLVv8aHW.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './virtual_public-BcspCJ2z.mjs';
import 'lucide-vue-next';
import './button-Cy1RM3F0.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import './DropdownMenu-C-dUPqGY.mjs';
import 'radix-vue';
import './DropdownMenuTrigger-B7jF-YDx.mjs';
import './DropdownMenuContent-BPx_eUMr.mjs';
import './DropdownMenuItem-D2DqBvlk.mjs';

const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const hideFooter = computed(() => {
      return route.path === "/visa-application" || route.path.includes("/visa-");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = __nuxt_component_0;
      const _component_Footer = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Header, null, null, _parent));
      _push(`<main class="overflow-x-hidden">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      if (!hideFooter.value) {
        _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-DBM8wNRU.mjs.map
