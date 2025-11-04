import { computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

const _sfc_main = {
  __name: "UiSeparator",
  __ssrInlineRender: true,
  props: {
    orientation: {
      type: String,
      default: "horizontal",
      validator: (value) => ["horizontal", "vertical"].includes(value)
    },
    class: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const separatorClasses = computed(() => {
      const base = "shrink-0 bg-gray-200";
      const orientationClasses = {
        horizontal: "h-px w-full",
        vertical: "h-full w-px"
      };
      return `${base} ${orientationClasses[props.orientation]} ${props.class}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: separatorClasses.value,
        "data-orientation": __props.orientation
      }, _attrs))}></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/separator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=separator-b0uZ_nsg.mjs.map
