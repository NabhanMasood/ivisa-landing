import { defineComponent, computed, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderSlot } from 'vue/server-renderer';

const __default__ = {
  name: "Dialog"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isOpen = computed({
      get: () => props.open || false,
      set: (value) => emit("update:open", value)
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (isOpen.value) {
          _push2(`<div class="fixed inset-0 z-50 bg-black/50"><div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">`);
          if (isOpen.value) {
            _push2(`<div class="bg-white rounded-2xl shadow-xl">`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/dialog/Dialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dialog = Object.assign(_sfc_main, { __name: "UiDialog" });

export { Dialog as default };
//# sourceMappingURL=Dialog-B31xGaki.mjs.map
