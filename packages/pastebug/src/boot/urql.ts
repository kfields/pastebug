import { boot } from 'quasar/wrappers';
import urql, { createClient } from '@urql/vue'

const headers = {
    apikey: import.meta.env.SUPABASE_ANON_KEY,
    authorization: `Bearer: ${import.meta.env.SUPABASE_ANON_KEY}`
  }
const client = createClient({
url: `${import.meta.env.SUPABASE_URL}/graphql/v1`,
fetchOptions: function createFetchOptions() {
    return { headers }
},
});
  
export default boot(({ app }) => {
    app.use(urql, client)
});

export { client };