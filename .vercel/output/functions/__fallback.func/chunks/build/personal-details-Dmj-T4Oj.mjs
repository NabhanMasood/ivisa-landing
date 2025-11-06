import { mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { ChevronLeft } from 'lucide-vue-next';
import Button from './button-Cy1RM3F0.mjs';
import Card from './Card-CXXOLw0c.mjs';
import _sfc_main$2 from './input-BjW8rXgt.mjs';
import _sfc_main$1 from './label-Du92n_Nj.mjs';
import Select from './Select-BT9XQi4a.mjs';
import SelectContent from './SelectContent-BojwDvXK.mjs';
import SelectItem from './SelectItem-RYQOH1xm.mjs';
import SelectTrigger from './SelectTrigger-BwVa_K9-.mjs';
import SelectValue from './SelectValue-BEkb05o4.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import 'radix-vue';

const _sfc_main = {
  __name: "personal-details",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const goBack = () => {
      router.back();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center pt-10 pb-20 min-h-screen" }, _attrs))}><div class="flex flex-col w-[776px] gap-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
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
      _push(`<h1 class="text-2xl font-semibold tracking-tight text-foreground"> Personal Details </h1></div><div class="flex gap-3">`);
      _push(ssrRenderComponent(Button, {
        variant: "outline",
        class: "rounded-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Discard `);
          } else {
            return [
              createTextVNode(" Discard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Button, { class: "rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Save Changes `);
          } else {
            return [
              createTextVNode(" Save Changes ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(Card, { class: "rounded-xl border p-[30px_24px] bg-white" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-6"${_scopeId}><h2 class="text-lg font-semibold text-foreground"${_scopeId}>Personal Details</h2><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "email",
              class: "text-sm font-medium text-foreground"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Email `);
                } else {
                  return [
                    createTextVNode(" Email ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "email",
              type: "email",
              placeholder: "john@gmail.com",
              class: "rounded-lg h-11"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "language",
              class: "text-sm font-medium text-foreground"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Language `);
                } else {
                  return [
                    createTextVNode(" Language ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(Select, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(SelectTrigger, {
                    id: "language",
                    class: "rounded-lg h-11 px-3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(SelectValue, { placeholder: "English" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(SelectValue, { placeholder: "English" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SelectContent, { class: "[&_[role=option]]:px-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(SelectItem, { value: "english" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`English`);
                            } else {
                              return [
                                createTextVNode("English")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "spanish" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Spanish`);
                            } else {
                              return [
                                createTextVNode("Spanish")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "french" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`French`);
                            } else {
                              return [
                                createTextVNode("French")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(SelectItem, { value: "german" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`German`);
                            } else {
                              return [
                                createTextVNode("German")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(SelectItem, { value: "english" }, {
                            default: withCtx(() => [
                              createTextVNode("English")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "spanish" }, {
                            default: withCtx(() => [
                              createTextVNode("Spanish")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "french" }, {
                            default: withCtx(() => [
                              createTextVNode("French")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "german" }, {
                            default: withCtx(() => [
                              createTextVNode("German")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(SelectTrigger, {
                      id: "language",
                      class: "rounded-lg h-11 px-3"
                    }, {
                      default: withCtx(() => [
                        createVNode(SelectValue, { placeholder: "English" })
                      ]),
                      _: 1
                    }),
                    createVNode(SelectContent, { class: "[&_[role=option]]:px-3" }, {
                      default: withCtx(() => [
                        createVNode(SelectItem, { value: "english" }, {
                          default: withCtx(() => [
                            createTextVNode("English")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "spanish" }, {
                          default: withCtx(() => [
                            createTextVNode("Spanish")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "french" }, {
                          default: withCtx(() => [
                            createTextVNode("French")
                          ]),
                          _: 1
                        }),
                        createVNode(SelectItem, { value: "german" }, {
                          default: withCtx(() => [
                            createTextVNode("German")
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
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-6" }, [
                createVNode("h2", { class: "text-lg font-semibold text-foreground" }, "Personal Details"),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode(_sfc_main$1, {
                    for: "email",
                    class: "text-sm font-medium text-foreground"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Email ")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$2, {
                    id: "email",
                    type: "email",
                    placeholder: "john@gmail.com",
                    class: "rounded-lg h-11"
                  })
                ]),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode(_sfc_main$1, {
                    for: "language",
                    class: "text-sm font-medium text-foreground"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Language ")
                    ]),
                    _: 1
                  }),
                  createVNode(Select, null, {
                    default: withCtx(() => [
                      createVNode(SelectTrigger, {
                        id: "language",
                        class: "rounded-lg h-11 px-3"
                      }, {
                        default: withCtx(() => [
                          createVNode(SelectValue, { placeholder: "English" })
                        ]),
                        _: 1
                      }),
                      createVNode(SelectContent, { class: "[&_[role=option]]:px-3" }, {
                        default: withCtx(() => [
                          createVNode(SelectItem, { value: "english" }, {
                            default: withCtx(() => [
                              createTextVNode("English")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "spanish" }, {
                            default: withCtx(() => [
                              createTextVNode("Spanish")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "french" }, {
                            default: withCtx(() => [
                              createTextVNode("French")
                            ]),
                            _: 1
                          }),
                          createVNode(SelectItem, { value: "german" }, {
                            default: withCtx(() => [
                              createTextVNode("German")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/personal-details.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=personal-details-Dmj-T4Oj.mjs.map
