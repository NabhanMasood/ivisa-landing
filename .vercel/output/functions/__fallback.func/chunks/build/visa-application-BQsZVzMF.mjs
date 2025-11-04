import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import VisaStepper from './VisaStepper-AXHsCKlR.mjs';
import VisaStats from './VisaStats-Cew3JOII.mjs';
import TripInfoForm from './TripInfoForm-FYFMAowu.mjs';
import YourInfoForm from './YourInfoForm-xoL2eVn8.mjs';
import PassportDetailsForm from './PassportDetailsForm-BexLPiCS.mjs';
import CheckoutForm from './CheckoutForm-BwpbxOdb.mjs';
import '../routes/renderer.mjs';
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
import './button-Cy1RM3F0.mjs';
import 'class-variance-authority';
import './utils-BpV8ZjlK.mjs';
import './Label-08dQakc7.mjs';
import './Select-BT9XQi4a.mjs';
import 'radix-vue';
import './SelectTrigger-CiNhqUX3.mjs';
import 'lucide-vue-next';
import './SelectContent-BwhOjIc3.mjs';
import './SelectItem-RYQOH1xm.mjs';
import './SelectValue-BEkb05o4.mjs';
import './virtual_public-D1aBSLhn.mjs';
import './input-BjW8rXgt.mjs';
import './Checkbox-Dghd6ShO.mjs';

const STORAGE_KEY = "visa_application_data";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "visa-application",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    useRoute();
    const currentStep = ref(1);
    const nationalityCountry = ref("");
    const destinationCountry = ref("");
    const tripData = ref({});
    const travelersData = ref({});
    const passportData = ref({});
    const saveToLocalStorage = () => {
      const dataToSave = {
        step: currentStep.value,
        tripData: tripData.value,
        travelersData: travelersData.value,
        passportData: passportData.value,
        // ✅ Save passport data
        nationalityCountry: nationalityCountry.value,
        destinationCountry: destinationCountry.value
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      console.log("Saved to localStorage:", dataToSave);
    };
    const handleStepOne = (data) => {
      tripData.value = {
        ...data,
        applicants: parseInt(data.applicants)
      };
      currentStep.value = 2;
      saveToLocalStorage();
      console.log("Step 1 data (Trip Info):", data);
    };
    const handleStepTwo = (data) => {
      travelersData.value = data;
      currentStep.value = 3;
      saveToLocalStorage();
      console.log("Step 2 data (Personal Details):", data);
    };
    const handleStepThree = (data) => {
      passportData.value = data;
      currentStep.value = 4;
      saveToLocalStorage();
      console.log("Step 3 data (Passport Details):", data);
    };
    const handleStepFour = (data) => {
      console.log("Step 4 data (Processing Time):", data);
      console.log("Processing type:", data.processingType);
      console.log("Processing fee:", data.processingFee);
      const completeApplication = {
        tripInfo: tripData.value,
        personalDetails: travelersData.value,
        passportDetails: passportData.value,
        processingInfo: data
      };
      console.log("Complete Application Data:", completeApplication);
      alert(`Application complete!
Processing: ${data.processingType}
Fee: Rs ${data.processingFee}`);
      clearSavedData();
    };
    const clearSavedData = () => {
      localStorage.removeItem(STORAGE_KEY);
      console.log("Cleared saved data");
    };
    __expose({ clearSavedData });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#FAFAFA]" }, _attrs))}><div class="flex items-start justify-center px-4 py-8"><div class="w-full max-w-[1200px] rounded-xl shadow-sm bg-white p-8"><h1 style="${ssrRenderStyle({ "font-family": "Geist, sans-serif", "font-weight": "600", "font-size": "24px", "line-height": "32px", "letter-spacing": "-0.6px", "color": "#0B3947" })}" class="mb-6"> Apply now for your ${ssrInterpolate(destinationCountry.value)} e VISA </h1>`);
      _push(ssrRenderComponent(VisaStepper, { "current-step": currentStep.value }, null, _parent));
      if (currentStep.value === 1) {
        _push(ssrRenderComponent(VisaStats, { destination: destinationCountry.value }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (currentStep.value === 1) {
        _push(ssrRenderComponent(TripInfoForm, {
          nationality: nationalityCountry.value,
          destination: destinationCountry.value,
          onNext: handleStepOne
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (currentStep.value === 2) {
        _push(ssrRenderComponent(YourInfoForm, {
          destination: destinationCountry.value,
          "initial-traveler-count": tripData.value.applicants,
          "initial-travelers-data": travelersData.value.travelers,
          onNext: handleStepTwo,
          onBack: ($event) => currentStep.value = 1
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (currentStep.value === 3) {
        _push(ssrRenderComponent(PassportDetailsForm, {
          destination: destinationCountry.value,
          "traveler-count": travelersData.value.travelers?.length || 0,
          "initial-passport-data": passportData.value.passportDetails,
          onNext: handleStepThree,
          onBack: ($event) => currentStep.value = 2
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (currentStep.value === 4) {
        _push(ssrRenderComponent(CheckoutForm, {
          destination: destinationCountry.value,
          "traveler-count": travelersData.value.travelers?.length || 0,
          "government-fee": (travelersData.value.travelers?.length || 0) * 3667.16,
          onNext: handleStepFour,
          onBack: ($event) => currentStep.value = 3
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/visa-application.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=visa-application-BQsZVzMF.mjs.map
