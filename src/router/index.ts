import { createWebHistory, createRouter } from "vue-router";
import Templates from "../views/Templates.vue";
import NotFound from "../views/NotFound.vue";
import Contact from "../views/Contact.vue";
import Tip from "../views/Tip.vue";
import Preview from "../views/Preview.vue";
import Poster from "../components/templates/Poster.vue";
import Paper from "../components/templates/Paper.vue";
import Twitter from "../components/templates/Twitter.vue";
import Minimal from "../components/templates/Minimal.vue";
import Highlight from "../components/templates/Highlight.vue";

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
        path: "minimal",
        component: Minimal,
        name: "minimal",
      },
      {
        path: "twitter",
        component: Twitter,
        name: "twitter",
      },
      {
        path: "paper",
        component: Paper,
        name: "paper",
      },
      {
        path: "highlight",
        component: Highlight,
        name: "highlight",
      },
      {
        path: "poster",
        component: Poster,
        name: "poster",
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
    path: "/contact",
    component: Contact,
    name: "contact",
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
