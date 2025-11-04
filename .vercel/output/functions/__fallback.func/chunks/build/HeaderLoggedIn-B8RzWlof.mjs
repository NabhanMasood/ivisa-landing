import { _ as __nuxt_component_0 } from './nuxt-link-BLVv8aHW.mjs';
import { defineComponent, ref, withCtx, createVNode, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-BcspCJ2z.mjs';
import { ChevronDown } from 'lucide-vue-next';
import Button from './button-Cy1RM3F0.mjs';
import DropdownMenu from './DropdownMenu-C-dUPqGY.mjs';
import _sfc_main$1 from './DropdownMenuTrigger-B7jF-YDx.mjs';
import DropdownMenuContent from './DropdownMenuContent-BPx_eUMr.mjs';
import DropdownMenuItem from './DropdownMenuItem-D2DqBvlk.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import 'radix-vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HeaderLoggedIn",
  __ssrInlineRender: true,
  setup(__props) {
    const currentLanguage = ref("EN | د.إ AED");
    const setLanguage = (lang) => {
      if (lang === "EN") {
        currentLanguage.value = "EN | د.إ AED";
      } else if (lang === "AR") {
        currentLanguage.value = "العربية | د.إ AED";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200"><div class="container mx-auto max-w-7xl px-6 lg:px-8"><div class="flex items-center justify-between h-20"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="VISA123" style="${ssrRenderStyle({ "width": "161px", "height": "50px" })}"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "VISA123",
                style: { "width": "161px", "height": "50px" }
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-6">`);
      _push(ssrRenderComponent(DropdownMenu, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, { asChild: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(Button, {
                    variant: "ghost",
                    size: "sm",
                    class: "h-[34px] px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(currentLanguage.value)} `);
                        _push4(ssrRenderComponent(unref(ChevronDown), { class: "ml-1 h-3 w-3" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(toDisplayString(currentLanguage.value) + " ", 1),
                          createVNode(unref(ChevronDown), { class: "ml-1 h-3 w-3" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(Button, {
                      variant: "ghost",
                      size: "sm",
                      class: "h-[34px] px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(currentLanguage.value) + " ", 1),
                        createVNode(unref(ChevronDown), { class: "ml-1 h-3 w-3" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(DropdownMenuContent, {
              align: "end",
              class: "w-48"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(DropdownMenuItem, {
                    onClick: ($event) => setLanguage("EN"),
                    class: "cursor-pointer"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="flex w-full justify-between"${_scopeId3}><span${_scopeId3}>English</span><span class="text-gray-500"${_scopeId3}>AED</span></span>`);
                      } else {
                        return [
                          createVNode("span", { class: "flex w-full justify-between" }, [
                            createVNode("span", null, "English"),
                            createVNode("span", { class: "text-gray-500" }, "AED")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(DropdownMenuItem, {
                    onClick: ($event) => setLanguage("AR"),
                    class: "cursor-pointer"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="flex w-full justify-between"${_scopeId3}><span${_scopeId3}>العربية</span><span class="text-gray-500"${_scopeId3}>AED</span></span>`);
                      } else {
                        return [
                          createVNode("span", { class: "flex w-full justify-between" }, [
                            createVNode("span", null, "العربية"),
                            createVNode("span", { class: "text-gray-500" }, "AED")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(DropdownMenuItem, {
                      onClick: ($event) => setLanguage("EN"),
                      class: "cursor-pointer"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "flex w-full justify-between" }, [
                          createVNode("span", null, "English"),
                          createVNode("span", { class: "text-gray-500" }, "AED")
                        ])
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(DropdownMenuItem, {
                      onClick: ($event) => setLanguage("AR"),
                      class: "cursor-pointer"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "flex w-full justify-between" }, [
                          createVNode("span", null, "العربية"),
                          createVNode("span", { class: "text-gray-500" }, "AED")
                        ])
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, { asChild: "" }, {
                default: withCtx(() => [
                  createVNode(Button, {
                    variant: "ghost",
                    size: "sm",
                    class: "h-[34px] px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(currentLanguage.value) + " ", 1),
                      createVNode(unref(ChevronDown), { class: "ml-1 h-3 w-3" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(DropdownMenuContent, {
                align: "end",
                class: "w-48"
              }, {
                default: withCtx(() => [
                  createVNode(DropdownMenuItem, {
                    onClick: ($event) => setLanguage("EN"),
                    class: "cursor-pointer"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "flex w-full justify-between" }, [
                        createVNode("span", null, "English"),
                        createVNode("span", { class: "text-gray-500" }, "AED")
                      ])
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(DropdownMenuItem, {
                    onClick: ($event) => setLanguage("AR"),
                    class: "cursor-pointer"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "flex w-full justify-between" }, [
                        createVNode("span", null, "العربية"),
                        createVNode("span", { class: "text-gray-500" }, "AED")
                      ])
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></header><div class="h-20"></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeaderLoggedIn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HeaderLoggedIn = Object.assign(_sfc_main, { __name: "HeaderLoggedIn" });

export { HeaderLoggedIn as default };
//# sourceMappingURL=HeaderLoggedIn-B8RzWlof.mjs.map
