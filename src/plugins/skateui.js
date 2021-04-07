import SuiCard from '../components/sui-card';
import SuiButton from '../components/sui-button';
import SuiInput from '../components/sui-input';
import SuiAccordion from '../components/sui-accordion';
import SuiTooltip from '../components/sui-tooltip';
import SuiAutosize from '../components/sui-autosize';
import SuiSvg from '../components/sui-svg';
import {ColorMangle} from "colormangle";

export default {
    install(Vue, options) {
        Vue.component('sui-card', SuiCard);
        Vue.component('sui-button', SuiButton);
        Vue.component('sui-input', SuiInput);
        Vue.component('sui-accordion', SuiAccordion);
        Vue.component('sui-tooltip', SuiTooltip);
        Vue.component('sui-autosize', SuiAutosize);
        Vue.component('sui-svg', SuiSvg);
        let cs = new ColorMangle('#00807f').colorScheme();
        let body = document.getElementsByTagName('BODY')[0];
        for (let c in cs) {
            body.style.setProperty(c, cs[c]);
            if (c === '--toolbar')
                body.style.backgroundColor = cs[c];
        }
    }
}