import { createWebHistory, createRouter } from "vue-router";
import Twitter from "../components/templates/SaylessTwitter.vue";
import Tip from "../views/SaylessTip.vue";
import Templates from "../views/SaylessTemplates.vue";
import NotFound from "../views/NotFound.vue";
import Preview from "../views/SaylessPreview.vue";
import Paper from "../components/templates/SaylessPaper.vue";
import Contact from "../views/SaylessContact.vue";
import Minimal from "../components/templates/SaylessMinimal.vue";
import Poster from "../components/templates/SaylessPoster.vue";
import Highlight from "../components/templates/SaylessHighlight.vue";

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
