import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Next Project",
  author: "Stefano",
  description:
    "Next.js 14+  with app router, shadcn/ui, typesafe env, icons and configs setup.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI", "shadcn/ui"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://stefano.puffapps.com",
  },
  links: {
    github: "https://github.com/degrand91",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
