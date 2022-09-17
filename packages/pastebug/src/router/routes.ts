import { RouteRecordRaw } from 'vue-router';

import { useUserStore } from 'stores/user';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'invite', component: () => import('pages/InvitePage.vue') },
      { path: 'auth', component: () => import('pages/AuthPage.vue') },
      { path: 'signin', component: () => import('pages/SignInPage.vue') },
      {
        path: 'signout',
        component: () => import('pages/SignInPage.vue'),
        props: { isSignOut: true },
      },
      { path: 'p', component: () => import('pages/paste/PasteIndexPage.vue') },
      {
        path: 'p/create',
        component: () => import('pages/paste/create/PasteCreatePage.vue'),
      },
      //{ path: 'p/:id/edit/', component: () => import('pages/paste/update/PasteUpdatePage.vue'), props: true },
      //{ path: 'p/:id', component: () => import('pages/paste/read/PasteReadPage.vue'), props: true },
      { path: 'p/:id/preview/', component: () => import('pages/paste/read/PasteReadPage.vue'), props: true },
      {
        path: 'p/:id',
        component: () => {
          const { isSignedIn } = useUserStore();
          if (isSignedIn) {
            return import('pages/paste/update/PasteUpdatePage.vue');
          } else {
            return import('pages/paste/read/PasteReadPage.vue');
          }
        },
        props: true,
      },
      /*
      {
        path: 'p/:id',
        component: () => import('pages/paste/PastePage.vue'),
      },
      */
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;