import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { useRouter } from 'vue-router';
import Card from './Card-CXXOLw0c.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './utils-BpV8ZjlK.mjs';

const _imports_0 = publicAssetsURL("/svg/my-account/order.svg");
const _imports_1 = publicAssetsURL("/svg/my-account/card.svg");
const _imports_2 = publicAssetsURL("/svg/my-account/users.svg");
const _imports_3 = publicAssetsURL("/svg/my-account/security.svg");
const _imports_4 = publicAssetsURL("/svg/my-account/speaker.svg");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const navigateTo = (path) => {
      router.push(`/my-account${path}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center pt-10 pb-20 min-h-screen" }, _attrs))}><div class="flex flex-col w-[1000px] gap-4"><h1 class="text-2xl font-semibold tracking-tight text-foreground"> My Account </h1><div class="grid grid-cols-3 gap-6">`);
      _push(ssrRenderComponent(Card, {
        onClick: ($event) => navigateTo("/my-orders"),
        class: "rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-6"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="My Orders Icon" class="w-[39px] h-[39px]"${_scopeId}><div${_scopeId}><h3 class="text-xl font-semibold text-foreground"${_scopeId}>My Orders</h3><p class="text-muted-foreground"${_scopeId}> View your order and travel documents </p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-6" }, [
                createVNode("img", {
                  src: _imports_0,
                  alt: "My Orders Icon",
                  class: "w-[39px] h-[39px]"
                }),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-xl font-semibold text-foreground" }, "My Orders"),
                  createVNode("p", { class: "text-muted-foreground" }, " View your order and travel documents ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, {
        onClick: ($event) => navigateTo("/payment-methods"),
        class: "rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-6"${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="Payment Methods Icon" class="w-[39px] h-[39px]"${_scopeId}><div${_scopeId}><h3 class="text-xl font-semibold text-foreground"${_scopeId}>Payment Methods</h3><p class="text-muted-foreground"${_scopeId}> Manage your account payment methods </p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-6" }, [
                createVNode("img", {
                  src: _imports_1,
                  alt: "Payment Methods Icon",
                  class: "w-[39px] h-[39px]"
                }),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-xl font-semibold text-foreground" }, "Payment Methods"),
                  createVNode("p", { class: "text-muted-foreground" }, " Manage your account payment methods ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, {
        onClick: ($event) => navigateTo("/personal-details"),
        class: "rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-6"${_scopeId}><img${ssrRenderAttr("src", _imports_2)} alt="Personal Details Icon" class="w-[39px] h-[39px]"${_scopeId}><div${_scopeId}><h3 class="text-xl font-semibold text-foreground"${_scopeId}>Personal Details</h3><p class="text-muted-foreground"${_scopeId}> Update your email and language settings </p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-6" }, [
                createVNode("img", {
                  src: _imports_2,
                  alt: "Personal Details Icon",
                  class: "w-[39px] h-[39px]"
                }),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-xl font-semibold text-foreground" }, "Personal Details"),
                  createVNode("p", { class: "text-muted-foreground" }, " Update your email and language settings ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, {
        onClick: ($event) => navigateTo("/security-privacy"),
        class: "rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-6"${_scopeId}><img${ssrRenderAttr("src", _imports_3)} alt="Security &amp; Privacy Icon" class="w-[39px] h-[39px]"${_scopeId}><div${_scopeId}><h3 class="text-xl font-semibold text-foreground"${_scopeId}>Security &amp; Privacy</h3><p class="text-muted-foreground"${_scopeId}> Update your account email and password </p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-6" }, [
                createVNode("img", {
                  src: _imports_3,
                  alt: "Security & Privacy Icon",
                  class: "w-[39px] h-[39px]"
                }),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-xl font-semibold text-foreground" }, "Security & Privacy"),
                  createVNode("p", { class: "text-muted-foreground" }, " Update your account email and password ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Card, {
        onClick: ($event) => navigateTo("/referrals"),
        class: "rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-6"${_scopeId}><img${ssrRenderAttr("src", _imports_4)} alt="Referrals Icon" class="w-[39px] h-[39px]"${_scopeId}><div${_scopeId}><h3 class="text-xl font-semibold text-foreground"${_scopeId}>Referrals</h3><p class="text-muted-foreground"${_scopeId}> Give discounts on referrals in your account </p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-6" }, [
                createVNode("img", {
                  src: _imports_4,
                  alt: "Referrals Icon",
                  class: "w-[39px] h-[39px]"
                }),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-xl font-semibold text-foreground" }, "Referrals"),
                  createVNode("p", { class: "text-muted-foreground" }, " Give discounts on referrals in your account ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BafiGR3C.mjs.map
