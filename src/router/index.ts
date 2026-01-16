import { createWebHistory, createRouter } from "vue-router";
import Plain from "../components/templates/Plain.vue";
import Twitter from "../components/templates/Twitter.vue";
import Tip from "../views/Tip.vue";
import Faqs from "../views/Faqs.vue";
import Templates from "../views/Templates.vue";
import NotFound from "../views/NotFound.vue";
import Preview from "../views/Preview.vue";
import Paper from "../components/templates/Paper.vue";

const routes = [
  {
    path: "/",
    redirect: "/templates",
  },
  {
    path: "/templates",
    name: "templates",
    redirect: "/templates/twitter",
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
        path: "paper",
        component: Paper,
        name: "paper ",
      },
    ],
  },
  {
    path: "/templates/:name/preview",
    component: Preview,
    name: "preview",
  },
  {
    path: "/tip",
    component: Tip,
    name: "tip",
  },
  {
    path: "/faqs",
    component: Faqs,
    name: "faqs",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
