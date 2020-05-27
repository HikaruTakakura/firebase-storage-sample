<template>
  <div>
    <h2>ImageViewer</h2>
    <button @click="getImages">更新</button>
    <div class="images-container">
      <div v-for="image in images" :key="image.id">
        <img :src="image.url" :alt="image.name" />
        <div>{{ image.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  data() {
    return {
      images: []
    };
  },
  methods: {
    getImages() {
      db.collection("images")
        .orderBy("createdAt")
        .limit(5)
        .get()
        .then(collection => {
          this.images = collection.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            };
          });
          // 上は下のコードと同じ意味
          // map については Array.prototype.map で調べてみてください
          //
          // const images = [];
          // for (const doc of collection.docs) {
          //   images.push({
          //     id: doc.id,
          //     ...doc.data()
          //   });
          // }
          // this.images = images;
        });
    }
  },
  mounted() {
    this.getImages();
  }
};
</script>

<style scoped></style>
