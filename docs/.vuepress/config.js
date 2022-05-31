module.exports = {
  // Website title
  title: "码农笔记",
  // Description of your website
  description: "老农的代码笔记",
  // Favicon and others of website
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],

  // Theme to use
  theme: "melodydl",
  // Theme config
  themeConfig: {
    title: "码农笔记",
    // Personal information
    personalInfo: {
      // Nikename
      name: "老农",
      // Avatar image
      avatar: "/uploads/avatar.jpg",
      // Background image in header
      headerBackgroundImg: "/uploads/avatar-bg.jpeg",
      // Introduction of yourself (HTML supported)
      description: "老农的代码笔记",
      // Email
      email: "itlaonong@gmail.com",
      // Location
      location: "Hefei, China",
    },
    // Header config (Optional)
    nav: [
      { text: "HOME", link: "/" },
      { text: "ABOUT", link: "/about/" },
      { text: "TAGS", link: "/tags/" },
    ],

    //  Background image of navbar in public directory
    header: {
      home: {
        title: "码农笔记",
        subtitle: "与其感慨路难行，不如马上出发",
        headerImage: "/uploads/home-bg.jpeg",
      },

      // title and background image about tag in public directory
      tags: {
        title: "Tags",
        subtitle: "It took all my luck to meet you",
        headerImage: "/uploads/tags-bg.jpg",
      },

      // background image of Post's navbar
      postHeaderImg: "/uploads/post-bg.jpeg",
    },

    // Accounts of SNS
    sns: {
      // Jianshu account and link
      /*jianshu: {
        account: "jianshu",
        link: "https://www.jianshu.com/u/5dddaee8f351",
      },

      // Weibo account and link
      weibo: {
        account: "",
        link: "",
      },

      // Zhihu account and link
      zhihu: {
        account: "zhihu",
        link: "https://www.zhihu.com/people/sheng-tang-de-xing-kong",
      },
      */
      // Github account and link
      github: {
        account: "github",
        link: "https://github.com/itlaonong",
      },
    },
    // Footer of website config
    footer: {
      // Gitbutton config
      /*gitbtn: {
        // github repository
        repository:
          "https://ghbtns.com/github-btn.html?user=youdeliang&repo=vuepress-theme-top&type=star&count=true",
        frameborder: 0,
        scrolling: 0,
        width: "80px",
        height: "20px",
      },*/

      // Add footer content
      custom: `Copyright &copy; 2022 itlaonong.com <br /> 
    Theme By <a href="https://www.vuepress.cn/" target="_blank">VuePress</a>
    | <a href="https://www.github.com/youdeliang/" target="_blank">youdeliang</a>`,
    },

    // Pagination config
    pagination: {
      // number of perPage
      perPage: 5,
    },

    // Comments config. See the [Posts Comments] section below.
    comments: {
      owner: "itlaonong",
      repo: "itlaonong.github.io",
      clientId: "cdcf2d36291938b823f8",
      clientSecret: "b7473e3df93c0c6ce0fe394f2e1b2da92073a228",
      autoCreateIssue: false,
    },
  },
};
