import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import Dialog from './Dialog-B31xGaki.mjs';
import DialogContent from './Dialogcontent-Vjwp0JDb.mjs';
import Button from './button-Cy1RM3F0.mjs';
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
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';

const _imports_0 = publicAssetsURL("/svg/success.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Successmodal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleOpenChange = (value) => {
      if (!value) {
        emit("close");
      }
    };
    const handleClose = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(Dialog, mergeProps({
        open: __props.isOpen,
        "onUpdate:open": handleOpenChange
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(DialogContent, { class: "w-[360px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col items-center text-center py-4"${_scopeId2}><div class="relative mb-6"${_scopeId2}><div class="w-32 h-32 rounded-full flex items-center justify-center" style="${ssrRenderStyle({ "background-color": "#F0F0F0" })}"${_scopeId2}><div class="w-24 h-24 rounded-full flex items-center justify-center bg-white"${_scopeId2}><img${ssrRenderAttr("src", _imports_0)} alt="Success" class="w-102 h-102"${_scopeId2}></div></div></div><h2 style="${ssrRenderStyle({ "font-family": "Manrope", "font-weight": "600", "font-size": "20px", "line-height": "28px", "color": "#0B3947", "margin-bottom": "24px" })}"${_scopeId2}> Application Submitted </h2>`);
                  _push3(ssrRenderComponent(Button, {
                    onClick: handleClose,
                    class: "w-full",
                    style: { "height": "48px", "border-radius": "6px", "background-color": "#1ECE84", "color": "white", "font-family": "Inter", "font-weight": "500", "font-size": "16px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Ok `);
                      } else {
                        return [
                          createTextVNode(" Ok ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-center text-center py-4" }, [
                      createVNode("div", { class: "relative mb-6" }, [
                        createVNode("div", {
                          class: "w-32 h-32 rounded-full flex items-center justify-center",
                          style: { "background-color": "#F0F0F0" }
                        }, [
                          createVNode("div", { class: "w-24 h-24 rounded-full flex items-center justify-center bg-white" }, [
                            createVNode("img", {
                              src: _imports_0,
                              alt: "Success",
                              class: "w-102 h-102"
                            })
                          ])
                        ])
                      ]),
                      createVNode("h2", { style: { "font-family": "Manrope", "font-weight": "600", "font-size": "20px", "line-height": "28px", "color": "#0B3947", "margin-bottom": "24px" } }, " Application Submitted "),
                      createVNode(Button, {
                        onClick: handleClose,
                        class: "w-full",
                        style: { "height": "48px", "border-radius": "6px", "background-color": "#1ECE84", "color": "white", "font-family": "Inter", "font-weight": "500", "font-size": "16px" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Ok ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(DialogContent, { class: "w-[360px]" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col items-center text-center py-4" }, [
                    createVNode("div", { class: "relative mb-6" }, [
                      createVNode("div", {
                        class: "w-32 h-32 rounded-full flex items-center justify-center",
                        style: { "background-color": "#F0F0F0" }
                      }, [
                        createVNode("div", { class: "w-24 h-24 rounded-full flex items-center justify-center bg-white" }, [
                          createVNode("img", {
                            src: _imports_0,
                            alt: "Success",
                            class: "w-102 h-102"
                          })
                        ])
                      ])
                    ]),
                    createVNode("h2", { style: { "font-family": "Manrope", "font-weight": "600", "font-size": "20px", "line-height": "28px", "color": "#0B3947", "margin-bottom": "24px" } }, " Application Submitted "),
                    createVNode(Button, {
                      onClick: handleClose,
                      class: "w-full",
                      style: { "height": "48px", "border-radius": "6px", "background-color": "#1ECE84", "color": "white", "font-family": "Inter", "font-weight": "500", "font-size": "16px" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Ok ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/visa/Successmodal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SuccessModal = Object.assign(_sfc_main, { __name: "VisaSuccessmodal" });

export { SuccessModal as default };
//# sourceMappingURL=Successmodal-CvcEugtr.mjs.map
