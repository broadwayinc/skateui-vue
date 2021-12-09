import SuiCard from '../components/sui-card';
import SuiTitle from '../components/sui-title';
import SuiRating from '../components/sui-ratings';
import SuiSlider from '../components/sui-slider';
import SuiButton from '../components/sui-button';
import SuiFieldset from '../components/_sui-fieldset';
import SuiInput from '../components/sui-input';
import SuiSelect from '../components/sui-select';
import SuiDatalist from '../components/sui-datalist';
import SuiOption from '../components/sui-option';
import SuiTextarea from '../components/sui-textarea';
import SuiAccordion from '../components/sui-accordion';
import SuiTooltip from '../components/sui-tooltip';
import SuiAutosize from '../components/sui-autosize';
import SuiSteps from '../components/sui-steps';
import SuiStep from '../components/sui-step';
import SuiImage from '../components/sui-image';
import SuiSvg from '../components/sui-svg';
import SuiList from '../components/sui-list';
import SuiApp from '../components/sui-app';
import SuiSticky from '../components/sui-sticky';
import '../lib/skateui.js';

const SkateUI = {
    install(Vue, options) {
        Vue.component('sui-card', SuiCard);
        Vue.component('sui-title', SuiTitle);
        Vue.component('sui-rating', SuiRating);
        Vue.component('sui-list', SuiList);
        Vue.component('sui-slider', SuiSlider);
        Vue.component('sui-button', SuiButton);
        Vue.component('sui-fieldset', SuiFieldset);
        Vue.component('sui-input', SuiInput);
        Vue.component('sui-select', SuiSelect);
        Vue.component('sui-datalist', SuiDatalist);
        Vue.component('sui-option', SuiOption);
        Vue.component('sui-textarea', SuiTextarea);
        Vue.component('sui-accordion', SuiAccordion);
        Vue.component('sui-tooltip', SuiTooltip);
        Vue.component('sui-autosize', SuiAutosize);
        Vue.component('sui-svg', SuiSvg);
        Vue.component('sui-steps', SuiSteps);
        Vue.component('sui-step', SuiStep);
        Vue.component('sui-image', SuiImage);
        Vue.component('sui-app', SuiApp);
        Vue.component('sui-sticky', SuiSticky);
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SkateUI);
}

export default SkateUI;