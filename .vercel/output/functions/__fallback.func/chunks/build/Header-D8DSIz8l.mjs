import { _ as __nuxt_component_0$1 } from './nuxt-link-BLVv8aHW.mjs';
import { n as navigateTo } from './server.mjs';
import { defineComponent, computed, ref, withCtx, createVNode, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-BcspCJ2z.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { useRoute } from 'vue-router';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import 'radix-vue';

const _imports_1 = publicAssetsURL("/svg/my-account/search-bar.svg");
const _imports_2 = publicAssetsURL("/svg/my-account/bell.svg");
const _imports_3 = publicAssetsURL("/svg/my-account/user.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    showAuthButtons: { type: Boolean, default: true }
  },
  setup(__props) {
    const route = useRoute();
    const isMyAccountRoute = computed(() => {
      return route.path.startsWith("/my-account");
    });
    const searchQuery = ref("");
    const currentLanguage = ref("EN | د.إ AED");
    const setLanguage = (lang) => {
      if (lang === "EN") {
        currentLanguage.value = "EN | د.إ AED";
      } else if (lang === "AR") {
        currentLanguage.value = "العربية | د.إ AED";
      }
    };
    const handleLogin = () => {
      navigateTo("/login");
    };
    const handleSignUp = () => {
      navigateTo("/signup");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<!--[-->`);
      if (isMyAccountRoute.value) {
        _push(`<header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200"><div class="px-6 lg:px-8"><div class="flex items-center justify-between h-16"><div class="flex items-center gap-4"><div class="flex items-center flex-shrink-0">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "inline-flex items-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="VISA123" style="${ssrRenderStyle({ "width": "161.05px", "height": "50px" })}"${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: _imports_0,
                  alt: "VISA123",
                  style: { "width": "161.05px", "height": "50px" }
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="bg-gray-300" style="${ssrRenderStyle({ "width": "1px", "height": "16px" })}"></div><div class="relative" style="${ssrRenderStyle({ "width": "384px" })}"><input type="text" placeholder="Search..." class="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1ECE84] focus:border-transparent text-sm pl-4 pr-12" style="${ssrRenderStyle({ "height": "36px" })}"${ssrRenderAttr("value", searchQuery.value)}><div class="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-gray-50 rounded" style="${ssrRenderStyle({ "width": "30px", "height": "24px", "border-radius": "4px", "padding": "4px" })}"><img${ssrRenderAttr("src", _imports_1)} alt="Search" style="${ssrRenderStyle({ "width": "100%", "height": "100%" })}"></div></div></div><div class="flex items-center flex-shrink-0" style="${ssrRenderStyle({ "gap": "10px" })}"><button class="relative rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center" style="${ssrRenderStyle({ "width": "36px", "height": "36px" })}"><img${ssrRenderAttr("src", _imports_2)} alt="Notifications" class="w-5 h-5"><span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span></button><div class="bg-gray-300" style="${ssrRenderStyle({ "width": "1px", "height": "16px" })}"></div>`);
        _push(ssrRenderComponent(DropdownMenu, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, { asChild: "" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<button class="rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center" style="${ssrRenderStyle({ "width": "36px", "height": "36px" })}"${_scopeId2}><img${ssrRenderAttr("src", _imports_3)} alt="User" class="w-9 h-9 rounded-full"${_scopeId2}></button>`);
                  } else {
                    return [
                      createVNode("button", {
                        class: "rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center",
                        style: { "width": "36px", "height": "36px" }
                      }, [
                        createVNode("img", {
                          src: _imports_3,
                          alt: "User",
                          class: "w-9 h-9 rounded-full"
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(DropdownMenuContent, {
                align: "end",
                class: "w-56"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="px-2 py-1.5 text-sm font-semibold"${_scopeId2}>My Account</div>`);
                    _push3(ssrRenderComponent(DropdownMenuItem, {
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/my-account"),
                      class: "cursor-pointer"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span${_scopeId3}>Profile</span>`);
                        } else {
                          return [
                            createVNode("span", null, "Profile")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(DropdownMenuItem, {
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/my-account/settings"),
                      class: "cursor-pointer"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span${_scopeId3}>Settings</span>`);
                        } else {
                          return [
                            createVNode("span", null, "Settings")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(DropdownMenuItem, { class: "cursor-pointer text-red-600" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span${_scopeId3}>Logout</span>`);
                        } else {
                          return [
                            createVNode("span", null, "Logout")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "px-2 py-1.5 text-sm font-semibold" }, "My Account"),
                      createVNode(DropdownMenuItem, {
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/my-account"),
                        class: "cursor-pointer"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Profile")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(DropdownMenuItem, {
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/my-account/settings"),
                        class: "cursor-pointer"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Settings")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(DropdownMenuItem, { class: "cursor-pointer text-red-600" }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Logout")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$1, { asChild: "" }, {
                  default: withCtx(() => [
                    createVNode("button", {
                      class: "rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center",
                      style: { "width": "36px", "height": "36px" }
                    }, [
                      createVNode("img", {
                        src: _imports_3,
                        alt: "User",
                        class: "w-9 h-9 rounded-full"
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(DropdownMenuContent, {
                  align: "end",
                  class: "w-56"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "px-2 py-1.5 text-sm font-semibold" }, "My Account"),
                    createVNode(DropdownMenuItem, {
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/my-account"),
                      class: "cursor-pointer"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", null, "Profile")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(DropdownMenuItem, {
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/my-account/settings"),
                      class: "cursor-pointer"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", null, "Settings")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(DropdownMenuItem, { class: "cursor-pointer text-red-600" }, {
                      default: withCtx(() => [
                        createVNode("span", null, "Logout")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></header>`);
      } else {
        _push(`<header class="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200"><div class="container mx-auto max-w-7xl px-6 lg:px-8"><div class="flex items-center justify-between h-20"><div class="flex items-center">`);
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
        _push(`</div><div class="${ssrRenderClass([__props.showAuthButtons ? "gap-20" : "gap-6", "flex items-center"])}">`);
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
        if (__props.showAuthButtons) {
          _push(`<div class="flex items-center gap-4">`);
          _push(ssrRenderComponent(Button, {
            variant: "ghost",
            size: "sm",
            class: "h-[34px] px-4 font-medium text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent",
            onClick: handleLogin
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Login `);
              } else {
                return [
                  createTextVNode(" Login ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(Button, {
            size: "sm",
            class: "!bg-[#1ECE84] hover:!bg-[#1AB876] !text-white !rounded-full !h-[34px] !px-5 !min-w-[95px] !font-medium !border-0",
            onClick: handleSignUp
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Sign Up `);
              } else {
                return [
                  createTextVNode(" Sign Up ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></header>`);
      }
      _push(`<div class="${ssrRenderClass(isMyAccountRoute.value ? "h-16" : "h-20")}"></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "Header" });

export { __nuxt_component_0 as default };
//# sourceMappingURL=Header-D8DSIz8l.mjs.map
