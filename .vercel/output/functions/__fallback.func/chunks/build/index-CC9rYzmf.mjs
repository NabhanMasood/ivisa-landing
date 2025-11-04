import __nuxt_component_0 from './Hero-CHyeV3Uw.mjs';
import __nuxt_component_1 from './WhyChooseUs-YMFMLc7F.mjs';
import __nuxt_component_2 from './WorldWide-1DNIW1Qq.mjs';
import ApplicationForm from './ApplicationForm-CdKLkvp9.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
import './button-Cy1RM3F0.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import './Card-CXXOLw0c.mjs';
import './CardContent-DLRaKZzq.mjs';
import './Label-08dQakc7.mjs';
import './Select-BT9XQi4a.mjs';
import 'radix-vue';
import './SelectTrigger-CiNhqUX3.mjs';
import 'lucide-vue-next';
import './SelectContent-BwhOjIc3.mjs';
import './SelectItem-RYQOH1xm.mjs';
import './SelectValue-BEkb05o4.mjs';
import 'vue-router';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Hero = __nuxt_component_0;
  const _component_WhyChooseUs = __nuxt_component_1;
  const _component_WorldWide = __nuxt_component_2;
  const _component_ApplicationForm = ApplicationForm;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Hero, null, null, _parent));
  _push(ssrRenderComponent(_component_WhyChooseUs, null, null, _parent));
  _push(ssrRenderComponent(_component_WorldWide, null, null, _parent));
  _push(ssrRenderComponent(_component_ApplicationForm, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-CC9rYzmf.mjs.map
