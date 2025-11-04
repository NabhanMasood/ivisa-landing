import { defineComponent, unref, mergeProps, withCtx, createVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { SelectTrigger as SelectTrigger$1, SelectIcon } from 'radix-vue';
import { ChevronDown } from 'lucide-vue-next';
import { c as cn } from './utils-BpV8ZjlK.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectTrigger",
  __ssrInlineRender: true,
  props: {
    class: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectTrigger$1), mergeProps({
        class: unref(cn)(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          props.class
        )
      }, _ctx.$attrs, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(ssrRenderComponent(unref(SelectIcon), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ChevronDown), { class: "h-4 w-4 opacity-50" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ChevronDown), { class: "h-4 w-4 opacity-50" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              createVNode(unref(SelectIcon), null, {
                default: withCtx(() => [
                  createVNode(unref(ChevronDown), { class: "h-4 w-4 opacity-50" })
                ]),
                _: 1
              })
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
//# sourceMappingURL=SelectTrigger-CiNhqUX3.mjs.map
