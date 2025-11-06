import { computed, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { ChevronLeft, Trash2, Pencil, Lock } from 'lucide-vue-next';
import Button from './button-Cy1RM3F0.mjs';
import Checkbox from './Checkbox-Dghd6ShO.mjs';
import _sfc_main$1 from './Table-0-dkKYVh.mjs';
import _sfc_main$5 from './Tablebody-CLcMcatf.mjs';
import _sfc_main$6 from './Tablecell-CoezOhNd.mjs';
import _sfc_main$4 from './Tablehead-DWB4F9eG.mjs';
import _sfc_main$2 from './Tableheader-DMBcOO0j.mjs';
import _sfc_main$3 from './Tablerow-BlJM8gji.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const orderId = computed(() => route.params.id);
    const activeTab = ref("documents");
    const searchQuery = ref("");
    const selectedRows = ref([]);
    const travelers = ref([
      {
        id: 1,
        name: "Ali Raza",
        email: "ali@gmail.com",
        passport: "AB1234567",
        issueDate: "01/01/2025",
        expiryDate: "01/01/26",
        hasLock: false
      },
      {
        id: 2,
        name: "Ali Raza",
        email: "ali@gmail.com",
        passport: "AB1234567",
        issueDate: "01/01/2025",
        expiryDate: "01/01/26",
        hasLock: false
      },
      {
        id: 3,
        name: "Ali Raza",
        email: "ali@gmail.com",
        passport: "AB1234567",
        issueDate: "01/01/2025",
        expiryDate: "01/01/26",
        hasLock: false
      },
      {
        id: 4,
        name: "Ali Raza",
        email: "ali@gmail.com",
        passport: "AB1234567",
        issueDate: "01/01/2025",
        expiryDate: "01/01/26",
        hasLock: false
      },
      {
        id: 5,
        name: "Ali Raza",
        email: "ali@gmail.com",
        passport: "AB1234567",
        issueDate: "01/01/2025",
        expiryDate: "01/01/26",
        hasLock: false
      }
    ]);
    const goBack = () => {
      router.back();
    };
    const toggleRowSelection = (id) => {
      if (selectedRows.value.includes(id)) {
        selectedRows.value = selectedRows.value.filter((rowId) => rowId !== id);
      } else {
        selectedRows.value = [...selectedRows.value, id];
      }
    };
    const toggleAllRows = () => {
      if (selectedRows.value.length === travelers.value.length) {
        selectedRows.value = [];
      } else {
        selectedRows.value = travelers.value.map((t) => t.id);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))}><div class="mx-auto px-4 sm:px-6 lg:px-[200px] pt-10 pb-20 lg:pb-[113px] max-w-[1400px]"><div class="flex flex-col gap-6 w-full lg:w-[952px]"><div class="flex items-center justify-between flex-wrap gap-4"><div class="flex items-center gap-4">`);
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
      _push(`<h1 class="text-2xl font-semibold tracking-tight font-geist text-[#27272B]">${ssrInterpolate(orderId.value)}</h1></div>`);
      _push(ssrRenderComponent(Button, { class: "rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white font-geist" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create New Order `);
          } else {
            return [
              createTextVNode(" Create New Order ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="inline-flex h-10 items-center justify-start rounded-md bg-[#F1F5F9] p-1 w-full lg:w-[425px] overflow-x-auto"><button class="${ssrRenderClass([
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-geist flex-shrink-0",
        activeTab.value === "application" ? "bg-white text-[#27272B] shadow-sm" : "text-[#64748B] hover:text-[#27272B]"
      ])}"> Application Details </button><button class="${ssrRenderClass([
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-geist flex-shrink-0",
        activeTab.value === "travelers" ? "bg-white text-[#27272B] shadow-sm" : "text-[#64748B] hover:text-[#27272B]"
      ])}"> Travelers </button><button class="${ssrRenderClass([
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-geist flex-shrink-0",
        activeTab.value === "documents" ? "bg-white text-[#27272B] shadow-sm" : "text-[#64748B] hover:text-[#27272B]"
      ])}"> Documents </button><button class="${ssrRenderClass([
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-geist flex-shrink-0",
        activeTab.value === "payment" ? "bg-white text-[#27272B] shadow-sm" : "text-[#64748B] hover:text-[#27272B]"
      ])}"> Payment </button></div><div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search Applications" class="h-9 px-3 py-1 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 font-geist bg-white w-full sm:w-[384px]" style="${ssrRenderStyle({ "box-shadow": "0px 1px 2px 0px rgba(0, 0, 0, 0.1)" })}"></div><div class="border rounded-lg bg-white overflow-x-auto w-full">`);
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, { class: "bg-white hover:bg-white border-b" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "w-[50px]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(Checkbox, {
                                checked: selectedRows.value.length === travelers.value.length,
                                "onUpdate:checked": toggleAllRows
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(Checkbox, {
                                  checked: selectedRows.value.length === travelers.value.length,
                                  "onUpdate:checked": toggleAllRows
                                }, null, 8, ["checked"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Name`);
                            } else {
                              return [
                                createTextVNode("Name")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Email`);
                            } else {
                              return [
                                createTextVNode("Email")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Passport`);
                            } else {
                              return [
                                createTextVNode("Passport")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Issue Date`);
                            } else {
                              return [
                                createTextVNode("Issue Date")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Expiry Date`);
                            } else {
                              return [
                                createTextVNode("Expiry Date")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, { class: "w-[100px]" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$4, { class: "w-[50px]" }, {
                            default: withCtx(() => [
                              createVNode(Checkbox, {
                                checked: selectedRows.value.length === travelers.value.length,
                                "onUpdate:checked": toggleAllRows
                              }, null, 8, ["checked"])
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                            default: withCtx(() => [
                              createTextVNode("Name")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                            default: withCtx(() => [
                              createTextVNode("Email")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                            default: withCtx(() => [
                              createTextVNode("Passport")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                            default: withCtx(() => [
                              createTextVNode("Issue Date")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                            default: withCtx(() => [
                              createTextVNode("Expiry Date")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4, { class: "w-[100px]" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3, { class: "bg-white hover:bg-white border-b" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$4, { class: "w-[50px]" }, {
                          default: withCtx(() => [
                            createVNode(Checkbox, {
                              checked: selectedRows.value.length === travelers.value.length,
                              "onUpdate:checked": toggleAllRows
                            }, null, 8, ["checked"])
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                          default: withCtx(() => [
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                          default: withCtx(() => [
                            createTextVNode("Email")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                          default: withCtx(() => [
                            createTextVNode("Passport")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                          default: withCtx(() => [
                            createTextVNode("Issue Date")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                          default: withCtx(() => [
                            createTextVNode("Expiry Date")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4, { class: "w-[100px]" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(travelers.value, (traveler) => {
                    _push3(ssrRenderComponent(_sfc_main$3, {
                      key: traveler.id,
                      class: "hover:bg-gray-50 border-b last:border-0"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$6, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(Checkbox, {
                                  checked: selectedRows.value.includes(traveler.id),
                                  "onUpdate:checked": ($event) => toggleRowSelection(traveler.id)
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(Checkbox, {
                                    checked: selectedRows.value.includes(traveler.id),
                                    "onUpdate:checked": ($event) => toggleRowSelection(traveler.id)
                                  }, null, 8, ["checked", "onUpdate:checked"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(traveler.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(traveler.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(traveler.email)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(traveler.email), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(traveler.passport)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(traveler.passport), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(traveler.issueDate)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(traveler.issueDate), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(traveler.expiryDate)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(traveler.expiryDate), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$6, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center gap-2"${_scopeId4}>`);
                                _push5(ssrRenderComponent(Button, {
                                  variant: "ghost",
                                  size: "icon",
                                  class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4 text-gray-600" }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(Trash2), { class: "h-4 w-4 text-gray-600" })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(Button, {
                                  variant: "ghost",
                                  size: "icon",
                                  class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(Pencil), { class: "h-4 w-4 text-gray-600" }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(Pencil), { class: "h-4 w-4 text-gray-600" })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                if (traveler.hasLock) {
                                  _push5(ssrRenderComponent(unref(Lock), { class: "h-4 w-4 text-purple-600" }, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createVNode(Button, {
                                      variant: "ghost",
                                      size: "icon",
                                      class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Trash2), { class: "h-4 w-4 text-gray-600" })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(Button, {
                                      variant: "ghost",
                                      size: "icon",
                                      class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Pencil), { class: "h-4 w-4 text-gray-600" })
                                      ]),
                                      _: 1
                                    }),
                                    traveler.hasLock ? (openBlock(), createBlock(unref(Lock), {
                                      key: 0,
                                      class: "h-4 w-4 text-purple-600"
                                    })) : createCommentVNode("", true)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$6, null, {
                              default: withCtx(() => [
                                createVNode(Checkbox, {
                                  checked: selectedRows.value.includes(traveler.id),
                                  "onUpdate:checked": ($event) => toggleRowSelection(traveler.id)
                                }, null, 8, ["checked", "onUpdate:checked"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(traveler.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(traveler.email), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(traveler.passport), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(traveler.issueDate), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(traveler.expiryDate), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_sfc_main$6, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode(Button, {
                                    variant: "ghost",
                                    size: "icon",
                                    class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Trash2), { class: "h-4 w-4 text-gray-600" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(Button, {
                                    variant: "ghost",
                                    size: "icon",
                                    class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Pencil), { class: "h-4 w-4 text-gray-600" })
                                    ]),
                                    _: 1
                                  }),
                                  traveler.hasLock ? (openBlock(), createBlock(unref(Lock), {
                                    key: 0,
                                    class: "h-4 w-4 text-purple-600"
                                  })) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(travelers.value, (traveler) => {
                      return openBlock(), createBlock(_sfc_main$3, {
                        key: traveler.id,
                        class: "hover:bg-gray-50 border-b last:border-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$6, null, {
                            default: withCtx(() => [
                              createVNode(Checkbox, {
                                checked: selectedRows.value.includes(traveler.id),
                                "onUpdate:checked": ($event) => toggleRowSelection(traveler.id)
                              }, null, 8, ["checked", "onUpdate:checked"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(traveler.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(traveler.email), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(traveler.passport), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(traveler.issueDate), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(traveler.expiryDate), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_sfc_main$6, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(Button, {
                                  variant: "ghost",
                                  size: "icon",
                                  class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Trash2), { class: "h-4 w-4 text-gray-600" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(Button, {
                                  variant: "ghost",
                                  size: "icon",
                                  class: "h-8 w-8 rounded-md hover:bg-gray-100"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Pencil), { class: "h-4 w-4 text-gray-600" })
                                  ]),
                                  _: 1
                                }),
                                traveler.hasLock ? (openBlock(), createBlock(unref(Lock), {
                                  key: 0,
                                  class: "h-4 w-4 text-purple-600"
                                })) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3, { class: "bg-white hover:bg-white border-b" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$4, { class: "w-[50px]" }, {
                        default: withCtx(() => [
                          createVNode(Checkbox, {
                            checked: selectedRows.value.length === travelers.value.length,
                            "onUpdate:checked": toggleAllRows
                          }, null, 8, ["checked"])
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                        default: withCtx(() => [
                          createTextVNode("Name")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                        default: withCtx(() => [
                          createTextVNode("Email")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                        default: withCtx(() => [
                          createTextVNode("Passport")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                        default: withCtx(() => [
                          createTextVNode("Issue Date")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "font-geist font-medium text-[#64748B]" }, {
                        default: withCtx(() => [
                          createTextVNode("Expiry Date")
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$4, { class: "w-[100px]" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_sfc_main$5, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(travelers.value, (traveler) => {
                    return openBlock(), createBlock(_sfc_main$3, {
                      key: traveler.id,
                      class: "hover:bg-gray-50 border-b last:border-0"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$6, null, {
                          default: withCtx(() => [
                            createVNode(Checkbox, {
                              checked: selectedRows.value.includes(traveler.id),
                              "onUpdate:checked": ($event) => toggleRowSelection(traveler.id)
                            }, null, 8, ["checked", "onUpdate:checked"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(traveler.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(traveler.email), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(traveler.passport), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(traveler.issueDate), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, { class: "font-geist text-[#27272B]" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(traveler.expiryDate), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_sfc_main$6, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(Button, {
                                variant: "ghost",
                                size: "icon",
                                class: "h-8 w-8 rounded-md hover:bg-gray-100"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Trash2), { class: "h-4 w-4 text-gray-600" })
                                ]),
                                _: 1
                              }),
                              createVNode(Button, {
                                variant: "ghost",
                                size: "icon",
                                class: "h-8 w-8 rounded-md hover:bg-gray-100"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Pencil), { class: "h-4 w-4 text-gray-600" })
                                ]),
                                _: 1
                              }),
                              traveler.hasLock ? (openBlock(), createBlock(unref(Lock), {
                                key: 0,
                                class: "h-4 w-4 text-purple-600"
                              })) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center justify-between flex-wrap gap-4 w-full"><div class="text-sm text-[#64748B] font-geist">${ssrInterpolate(selectedRows.value.length)} of ${ssrInterpolate(travelers.value.length)} row(s) selected. </div><div class="flex gap-2">`);
      _push(ssrRenderComponent(Button, {
        variant: "outline",
        class: "rounded-md border-[#E5E5E5] font-geist text-[#27272B] hover:bg-gray-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Previous `);
          } else {
            return [
              createTextVNode(" Previous ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Button, {
        variant: "outline",
        class: "rounded-md border-[#E5E5E5] font-geist text-[#27272B] hover:bg-gray-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Next `);
          } else {
            return [
              createTextVNode(" Next ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="border rounded-lg bg-white p-6"><div class="flex flex-col gap-2"><h2 class="text-xl font-semibold font-geist text-[#27272B]"> Application Details </h2><p class="text-sm text-[#64748B] font-geist"> Here you can see the application details </p></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/my-orders/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CG8JBB-t.mjs.map
