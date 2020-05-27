<template>
  <div>
    <h2>ImageUploader</h2>
    <!-- 画像だけが選択できるように accept を設定する -->
    <!-- アップロード中は disabled で選択できないようにする -->
    <input
      type="file"
      accept="image/*"
      :disabled="disabled"
      @change="onFileChange"
    />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import { db, storage } from "@/firebase";
export default {
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.upload(file);
    },
    upload(file) {
      this.message = "アップロード中...";
      this.disabled = true;

      // ref は reference の略。データの在り処＝住所を表すイメージ。
      const storageRef = storage.ref();

      // 同じ名前のファイルと区別できるように timestamp を追加して、ユニークなファイル名をつける
      const createdAt = new Date();
      const timestamp = createdAt.getTime();
      const uniqueFileName = timestamp + "_" + file.name;
      const fileRef = storageRef.child("images/" + uniqueFileName);

      // fileRef の場所に file を送る。 put は "置き換える" の意味。
      // uploadTask.on("state_changed", ...) を使う方法もあるが、ひとまず then で実装する
      fileRef
        .put(file)
        .then(() => fileRef.getDownloadURL())
        // 上の then のなかで snapshot.getDownloadURL().then(...) と書いてもいいが、
        // then で続けられるやつを return すると、外側に then を続けることができ、よみやすい
        // 例 fetch(...).then(res => res.json()).then(...)
        .then(url => {
          // storage にアップロードしたファイルに対応するドキュメントを保存する
          const image = {
            name: file.name,
            url,
            createdAt
          };
          return db.collection("images").add(image);
        })
        .then(() => {
          this.message = "アップロード完了！";
          setTimeout(() => {
            this.message = "";
            this.disabled = false;
          }, 1000);
        });
    }
  },
  data() {
    return {
      disabled: false,
      message: ""
    };
  }
};
</script>
