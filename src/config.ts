export const SITE = {
  website: "https://minhperry.de/", // replace this with your deployed domain
  author: "minhperry",
  profile: "https://github.com/minhperry",
  desc: "minhperry's personal blog - thoughts on software, development, and technology.",
  title: "minhperry's Blog",
  ogImage: "minhperry-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 0, // 0 minutes - show posts immediately
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/minhperry/my-blog/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Berlin", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
