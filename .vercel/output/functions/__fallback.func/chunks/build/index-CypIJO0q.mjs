import { mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { ChevronLeft, AlertCircle } from 'lucide-vue-next';
import Button from './button-Cy1RM3F0.mjs';
import Card from './Card-CXXOLw0c.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const goBack = () => {
      router.back();
    };
    const navigateToAddCard = () => {
      router.push("/my-account/payment-methods/add-card");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center pt-10 pb-20 min-h-screen px-4" }, _attrs))}><div class="flex flex-col w-full max-w-[776px] gap-6"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(Button, {
        onClick: goBack,
        variant: "ghost",
        size: "icon",
        class: "rounded-md w-[42px] h-[36px] border border-[#E4E4E8]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChevronLeft), { class: "h-5 w-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ChevronLeft), { class: "h-5 w-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl font-semibold tracking-tight text-foreground font-geist"> Manage Payment Method </h1></div>`);
      _push(ssrRenderComponent(Button, {
        onClick: navigateToAddCard,
        class: "rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Add Card `);
          } else {
            return [
              createTextVNode(" Add Card ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(Card, { class: "rounded-xl border border-[#DC7609] p-4" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-5 w-5 text-[#DC7609] flex-shrink-0 mt-0.5" }, null, _parent2, _scopeId));
            _push2(`<div class="flex flex-col gap-1 font-inter"${_scopeId}><h3 class="text-sm font-semibold text-[#DC7609]"${_scopeId}> A card is needed </h3><p class="text-sm text-[#DC7609]"${_scopeId}> You need to add a debit or credit card. </p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-3" }, [
                createVNode(unref(AlertCircle), { class: "h-5 w-5 text-[#DC7609] flex-shrink-0 mt-0.5" }),
                createVNode("div", { class: "flex flex-col gap-1 font-inter" }, [
                  createVNode("h3", { class: "text-sm font-semibold text-[#DC7609]" }, " A card is needed "),
                  createVNode("p", { class: "text-sm text-[#DC7609]" }, " You need to add a debit or credit card. ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/payment-methods/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CypIJO0q.mjs.map
