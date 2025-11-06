import { defineComponent, ref, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import VisaStepper from './VisaStepper-DGWUEsRX.mjs';
import VisaStats from './VisaStats-Cew3JOII.mjs';
import TripInfoForm from './TripInfoForm-I-u0cI84.mjs';
import YourInfoForm from './YourInfoForm-CFzt2ueG.mjs';
import PassportDetailsForm from './PassportDetailsForm-DyDRgEEd.mjs';
import CheckoutForm from './CheckoutForm-DA2rNJ-e.mjs';
import ReviewOrder from './ReviewOrder-vAt9vsg2.mjs';
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
import './label-Du92n_Nj.mjs';
import './input-BjW8rXgt.mjs';
import './virtual_public-D1aBSLhn.mjs';
import './Label-08dQakc7.mjs';
import './Select-BT9XQi4a.mjs';
import 'radix-vue';
import './SelectTrigger-BwVa_K9-.mjs';
import './SelectContent-BojwDvXK.mjs';
import './SelectItem-RYQOH1xm.mjs';
import 'lucide-vue-next';
import './SelectValue-BEkb05o4.mjs';
import './Checkbox-Dghd6ShO.mjs';
import './PaymentModal-n9wLBWjS.mjs';
import './virtual_public-DJzu2MsY.mjs';
import './Dialog-B31xGaki.mjs';
import './Dialogcontent-Vjwp0JDb.mjs';
import './Dialogheader-z5W8MBmq.mjs';
import './Dialogtitle-IOxRdQ2i.mjs';
import './Dialogdescription-BjIwAc9o.mjs';
import './Successmodal-CvcEugtr.mjs';

const STORAGE_KEY = "visa_application_data";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "visa-application",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const route = useRoute();
    const router = useRouter();
    const currentStep = ref(1);
    const nationalityCountry = ref("");
    const destinationCountry = ref("");
    const tripData = ref({});
    const travelersData = ref({});
    const passportData = ref({});
    const processingData = ref({});
    const updateURL = () => {
      const stepParam = currentStep.value <= 1 ? "step-1" : currentStep.value <= 3 ? "step-2" : "step-3";
      router.push({
        query: {
          ...route.query,
          step: stepParam
        }
      });
    };
    const saveToLocalStorage = () => {
      const dataToSave = {
        step: currentStep.value,
        tripData: tripData.value,
        travelersData: travelersData.value,
        passportData: passportData.value,
        processingData: processingData.value,
        nationalityCountry: nationalityCountry.value,
        destinationCountry: destinationCountry.value
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      console.log("Saved to localStorage:", dataToSave);
    };
    const getTravelerNames = () => {
      if (!travelersData.value.travelers) return [];
      return travelersData.value.travelers.map(
        (t) => `${t.firstName} ${t.lastName}`.trim() || "John Doe"
      );
    };
    const getVisaDetails = () => {
      const visaTypeMap = {
        "180-single": {
          validity: "180 days after issued",
          maxStay: "30 days per entry",
          entries: "Single entry"
        },
        "180-multiple": {
          validity: "180 days after issued",
          maxStay: "30 days per entry",
          entries: "Multiple entry"
        },
        "90-single": {
          validity: "90 days after issued",
          maxStay: "30 days per entry",
          entries: "Single entry"
        }
      };
      return visaTypeMap[tripData.value.visaType] || visaTypeMap["180-single"];
    };
    watch(currentStep, () => {
      updateURL();
      saveToLocalStorage();
    });
    const handleStepOne = (data) => {
      tripData.value = {
        ...data,
        applicants: parseInt(data.applicants)
      };
      currentStep.value = 2;
      console.log("Step 1 data (Trip Info):", data);
    };
    const handleStepTwo = (data) => {
      travelersData.value = data;
      currentStep.value = 3;
      console.log("Step 2 data (Personal Details):", data);
    };
    const handleStepThree = (data) => {
      passportData.value = data;
      currentStep.value = 4;
      console.log("Step 3 data (Passport Details):", data);
    };
    const handleStepFour = (data) => {
      processingData.value = data;
      currentStep.value = 5;
      console.log("Step 4 data (Processing Time):", data);
    };
    const handleStepFive = (paymentData) => {
      console.log("Payment completed:", paymentData);
      const completeApplication = {
        tripInfo: tripData.value,
        personalDetails: travelersData.value,
        passportDetails: passportData.value,
        processingInfo: processingData.value,
        paymentInfo: paymentData
      };
      console.log("Complete Application Data:", completeApplication);
      alert("Payment successful! Your visa application has been submitted.");
      clearSavedData();
    };
    const clearSavedData = () => {
      localStorage.removeItem(STORAGE_KEY);
      console.log("Cleared saved data");
    };
    __expose({ clearSavedData });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}><div class="flex items-start justify-center px-4 py-8"><div class="w-full max-w-[1200px] rounded-xl shadow-sm bg-white p-8"><div class="flex items-center gap-4 mb-6">`);
      if (currentStep.value > 1) {
        _push(`<button class="flex items-center justify-center w-8 h-8 rounded-full border transition-colors hover:bg-gray-50" style="${ssrRenderStyle({ "border-color": "#E5E7EB" })}" type="button"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="#0B3947" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 style="${ssrRenderStyle({ "font-family": "Geist, sans-serif", "font-weight": "600", "font-size": "24px", "line-height": "32px", "letter-spacing": "-0.6px", "color": "#0B3947" })}">${ssrInterpolate(currentStep.value === 5 ? "Review you order" : `Apply now for your ${destinationCountry.value} e VISA`)}</h1></div>`);
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
      if (currentStep.value === 5) {
        _push(ssrRenderComponent(ReviewOrder, {
          destination: destinationCountry.value,
          travelers: getTravelerNames(),
          "government-fee": (travelersData.value.travelers?.length || 0) * 3667.16,
          "processing-fee": processingData.value.processingFee || 0,
          "visa-details": getVisaDetails(),
          onNext: handleStepFive,
          onBack: ($event) => currentStep.value = 4
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
//# sourceMappingURL=visa-application-C0lynxaN.mjs.map
