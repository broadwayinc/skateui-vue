import SuiButton from '../components/sui-button';
import SuiCard from '../components/sui-card';
import {ColorMangle} from "colormangle";

export default {
    install(Vue, options) {
        Vue.component('sui-card', SuiCard);
        Vue.component('sui-button', SuiButton);

        let cs = new ColorMangle('#00807f').colorScheme();
        let body = document.getElementsByTagName('BODY')[0];
        for (let c in cs) {
            body.style.setProperty(c, cs[c]);
            if (c === '--toolbar')
                body.style.backgroundColor = cs[c];
        }
    }
}