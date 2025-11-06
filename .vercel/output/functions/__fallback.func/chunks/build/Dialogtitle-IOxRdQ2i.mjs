import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

const __default__ = {
  name: "DialogTitle"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<h2${ssrRenderAttrs(mergeProps({
        class: [_ctx.$props.class],
        style: { "font-family": "Inter", "font-weight": "500", "font-size": "16px", "line-height": "100%", "letter-spacing": "-0.006em", "color": "#0B3947", "margin-bottom": "4px" }
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</h2>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/Dialogtitle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DialogTitle = Object.assign(_sfc_main, { __name: "UiDialogDialogtitle" });

export { DialogTitle as default };
//# sourceMappingURL=Dialogtitle-IOxRdQ2i.mjs.map
