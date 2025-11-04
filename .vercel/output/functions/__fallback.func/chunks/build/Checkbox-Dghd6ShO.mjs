import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: { type: Boolean },
    disabled: { type: Boolean },
    class: {}
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const className = computed(() => props.class || "");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        role: "checkbox",
        "aria-checked": __props.checked,
        class: [
          "peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 ring-offset-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          __props.checked ? "bg-[#1ECE84] border-[#1ECE84] text-white" : "bg-white",
          className.value
        ],
        disabled: __props.disabled
      }, _attrs))}>`);
      if (__props.checked) {
        _push(`<svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Checkbox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Checkbox = Object.assign(_sfc_main, { __name: "UiCheckbox" });

export { Checkbox as default };
//# sourceMappingURL=Checkbox-Dghd6ShO.mjs.map
