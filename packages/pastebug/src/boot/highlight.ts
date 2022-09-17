import { boot } from 'quasar/wrappers';
import 'highlight.js/styles/stackoverflow-dark.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';
  
export default boot(({ app }) => {
    app.use(hljsVuePlugin)
});

export { hljsVuePlugin };