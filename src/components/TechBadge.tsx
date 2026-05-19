import React from "react";

interface TechBadgeProps {
  tag: string;
  size?: "sm" | "md" | "lg";
}

const techIcons: Record<string, string> = {
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "react native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg",
  flask: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "tailwind css": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "framer motion": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg",
  framer: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg",
  vite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg",
  gemini: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  "gemini ai": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  redux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  expo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg",
  flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "machine learning": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  tensorflow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  opencv: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  "open ai": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg",
  openai: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg",
  vercel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  supabase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  prisma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  graphql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  apollo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apollo-graphql/apollo-graphql-original.svg",
  axios: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-original.svg",
  "material ui": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  "material-ui": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  "chakra ui": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chakraui/chakraui-line.svg",
  bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  sass: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  less: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/less/less-original.svg",
  npm: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  yarn: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg",
  pnpm: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pnpm/pnpm-original.svg",
  jest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  cypress: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypress/cypress-original.svg",
  playwright: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg",
  express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  fastapi: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "google cloud": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  heroku: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
  netlify: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
  render: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/render/render-original.svg",
  redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  strapi: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/strapi/strapi-original.svg",
  "socket.io": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  stripe: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg",
  paypal: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg",
  cloudinary: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudinary/cloudinary-original.svg",
  jwt: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg",
  rest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rest/rest-original.svg",
  c: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  "c++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  swift: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  rust: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  php: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  symfony: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg",
  wordpress: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
  shopify: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg",
  unity: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
  unreal: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg",
  blender: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
  aftereffects: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
  premiere: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg",
  photoshop: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
  illustrator: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-original.svg",
  xd: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-original.svg",
  sketch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg",
  notion: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg",
  vscode: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "visual studio": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-original.svg",
  jupyter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  colab: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecolab/googlecolab-original.svg",
  numpy: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  scikit: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikit-learn/scikit-learn-original.svg",
  openai: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg",
};

export const TechBadge: React.FC<TechBadgeProps> = ({ tag, size = "sm" }) => {
  const tagLower = tag.toLowerCase();
  const iconUrl = techIcons[tagLower];
  
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-7 w-7",
  };

  const textSizeClasses = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-[11px]",
  };

  if (iconUrl) {
    return (
      <span className={`inline-flex items-center gap-1.5 bg-warm-sand/30 px-2.5 py-1 rounded-lg border border-border-cream/50 ${textSizeClasses[size]}`}>
        <img 
          src={iconUrl} 
          alt={tag}
          className={`${sizeClasses[size]} object-contain`}
        />
        <span className="font-sans font-medium uppercase tracking-tighter text-charcoal-warm">{tag}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center bg-warm-sand/30 px-2.5 py-1 rounded-lg border border-border-cream/50 ${textSizeClasses[size]}`}>
      <span className="font-sans font-medium uppercase tracking-tighter text-charcoal-warm">{tag}</span>
    </span>
  );
};