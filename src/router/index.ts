import { createWebHistory, createRouter } from "vue-router";
import Plain from "../components/templates/Plain.vue";
import Twitter from "../components/templates/Twitter.vue";
import Pricing from "../views/Pricing.vue";
import Faqs from "../views/Faqs.vue";
import Templates from "../views/Templates.vue";
import Notepad from "../components/templates/Notepad.vue";

const routes = [
  {
    path: "/",
    redirect: "/templates",
  },
  {
    path: "/templates",
    name: "templates",
    redirect: "/templates/plain",
    component: Templates,
    // default: Plain,
    children: [
      {
        path: "plain",
        component: Plain,
        name: "plain",
      },
      {
        path: "twitter",
        component: Twitter,
        name: "twitter",
      },
      {
        path: "notepad",
        component: Notepad,
        name: "notepad"
      }
    ],
  },
  {
    path: "/pricing",
    component: Pricing,
    name: "pricing",
  },
  {
    path: "/faqs",
    component: Faqs,
    name: "faqs",
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
