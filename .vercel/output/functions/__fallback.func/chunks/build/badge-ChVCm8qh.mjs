import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "badge",
  __ssrInlineRender: true,
  props: {
    variant: { default: "default" },
    customClass: { default: "" }
  },
  setup(__props) {
    const badgeVariants = computed(() => {
      return ({ variant, class: customClass }) => {
        const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
        const variants = {
          default: "bg-primary text-primary-foreground hover:bg-primary/80",
          secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          outline: "text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80"
        };
        return `${base} ${variants[variant || "default"]} ${customClass || ""}`;
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: badgeVariants.value({ variant: __props.variant, class: __props.customClass })
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/badge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const badge = Object.assign(_sfc_main, { __name: "UiBadge" });

export { badge as default };
//# sourceMappingURL=badge-ChVCm8qh.mjs.map
