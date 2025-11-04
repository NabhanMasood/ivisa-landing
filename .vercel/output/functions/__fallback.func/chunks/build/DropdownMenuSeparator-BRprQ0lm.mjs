import { defineComponent, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { DropdownMenuSeparator as DropdownMenuSeparator$1 } from 'radix-vue';
import { c as cn } from './utils-BpV8ZjlK.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSeparator",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuSeparator$1).Separator, mergeProps({
        class: unref(cn)("my-1 h-px bg-gray-200", props.class)
      }, props, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dropdown-menu/DropdownMenuSeparator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DropdownMenuSeparator = Object.assign(_sfc_main, { __name: "UiDropdownMenuSeparator" });

export { DropdownMenuSeparator as default };
//# sourceMappingURL=DropdownMenuSeparator-BRprQ0lm.mjs.map
