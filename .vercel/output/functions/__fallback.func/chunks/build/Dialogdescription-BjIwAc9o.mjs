import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

const __default__ = {
  name: "DialogDescription"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({
        class: [_ctx.$props.class],
        style: { "font-family": "Inter", "font-weight": "400", "font-size": "14px", "line-height": "20px", "letter-spacing": "0", "color": "#64748B" }
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</p>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/Dialogdescription.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DialogDescription = Object.assign(_sfc_main, { __name: "UiDialogDialogdescription" });

export { DialogDescription as default };
//# sourceMappingURL=Dialogdescription-BjIwAc9o.mjs.map
