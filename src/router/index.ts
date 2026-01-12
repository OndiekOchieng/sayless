import { createWebHistory, createRouter } from "vue-router";
import Plain from "../components/templates/Plain.vue";
import Twitter from "../components/templates/Twitter.vue";
import Pricing from "../views/Pricing.vue";
import Faqs from "../views/Faqs.vue";
import Templates from "../views/Templates.vue";
import App from "../App.vue";

const routes = [
  {
    path: "/",
    redirect: "/templates",
    name: "home",
    component: App,
    children: [
      {
        path: "/templates",
        name: "templates",
        redirect: "/templates/twitter",
        component: Templates,
        default: Plain,
        children: [
          {
            path: "plain",
            component: Plain,
            name: "plain"
          },
          {
            path: "twitter",
            component: Twitter,
            name: "twitter"
          },
        ],
      },
      {
        path: "pricing",
        component: Pricing,
        name: "pricing"
      },
      {
        path: "faqs",
        component: Faqs,
        name: "faqs"
      },
    ],
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
