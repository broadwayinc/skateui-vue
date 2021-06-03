import SuiCard from '../components/sui-card';
import SuiSlider from '../components/sui-slider';
import SuiButton from '../components/sui-button';
import SuiLabel from '../components/sui-label';
import SuiOption from '../components/sui-option';
import SuiInput from '../components/sui-input';
import SuiSelect from '../components/sui-select';
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

export default {
    install(Vue, options) {
        Vue.component('sui-card', SuiCard);
        Vue.component('sui-list', SuiList);
        Vue.component('sui-slider', SuiSlider);
        Vue.component('sui-button', SuiButton);
        Vue.component('sui-label', SuiLabel);
        Vue.component('sui-option', SuiOption);
        Vue.component('sui-input', SuiInput);
        Vue.component('sui-select', SuiSelect);
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