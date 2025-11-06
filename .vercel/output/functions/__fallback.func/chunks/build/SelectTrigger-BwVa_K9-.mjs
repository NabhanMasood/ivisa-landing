import { defineComponent, unref, mergeProps, withCtx, renderSlot, createBlock, createCommentVNode, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { SelectTrigger as SelectTrigger$1 } from 'radix-vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectTrigger",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "default"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectTrigger$1), mergeProps({
        class: [
          "flex items-center justify-between w-full border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50",
          __props.variant === "form" ? "h-9 px-3 py-2 text-sm" : ""
        ],
        style: __props.variant === "form" ? "border-color: #E2E8F0; font-family: Inter; font-weight: 400; font-size: 14px; line-height: 20px; letter-spacing: 0; color: #6B7280;" : ""
      }, _ctx.$attrs, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            if (__props.variant === "form") {
              _push2(`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-2"${_scopeId}><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              __props.variant === "form" ? (openBlock(), createBlock("svg", {
                key: 0,
                width: "12",
                height: "12",
                viewBox: "0 0 12 12",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                class: "ml-2"
              }, [
                createVNode("path", {
                  d: "M3 4.5L6 7.5L9 4.5",
                  stroke: "currentColor",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/SelectTrigger.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SelectTrigger = Object.assign(_sfc_main, { __name: "UiSelectTrigger" });

export { SelectTrigger as default };
//# sourceMappingURL=SelectTrigger-BwVa_K9-.mjs.map
