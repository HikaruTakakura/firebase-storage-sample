<template>
  <div>
    <ImageUploader />
    <ImageViewer />
  </div>
</template>

<script>
import ImageViewer from "@/components/ImageViewer";
import ImageUploader from "@/components/ImageUploader";
export default {
  components: {
    ImageViewer,
    ImageUploader
  }
};
</script>
