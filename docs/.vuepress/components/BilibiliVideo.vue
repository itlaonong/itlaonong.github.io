<!--docs/.vuepress/components/iframeComp.vue-->
<template>
  <div>
    <iframe
      class="video-iframe"
      width="100%"
      frameborder="no"
      scrolling="no"
      seamless=""
      allowfullscreen="allowfullscreen"
      :src="ihtml"
      referrerpolicy="origin-when-cross-origin"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ihtml: "",
    };
  },
  props: {
    aid: {
      type: String,
    },
    bid: {
      type: String,
    },
    page: {
      type: String,
    },
  },
  mounted() {
    this.autoSize();
    const that = this;
    window.onresize = function () {
      that.autoSize();
    };
  },
  created() {
    const base = "https://player.bilibili.com/player.html";
    //const base = "https://www.bilibili.com/blackboard/html5mobileplayer.html";
    //const base = "https://www.bilibili.com/blackboard/newplayer.html";
    //const base = "https://www.bilibili.com/blackboard/html5player.html";
    //const base = "/bilibili-player.html";

    this.ihtml = `${base}?cid=${this.cid || ""}&aid=${this.aid || ""}&bvid=${
      this.bid || ""
    }&page=${this.page || "1"}&high_quality=1`;
  },
  methods: {
    autoSize() {
      const video = document.getElementsByClassName("video-iframe");
      const width =
        document.getElementsByClassName("video-iframe")[0].scrollWidth;
      for (let i = 0; i < video.length; i++) {
        video[i].style.height = width * 0.75 + "px";
      }
    },
  },
};
</script>
