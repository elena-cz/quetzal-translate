<script>
import moment from 'moment';
import axios from 'axios';
import fb from '@/firebaseConfig';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'AdminUploadAudio',

  components: {
    // HelloWorld,
  },

  filters: {
    filename: (value = '') => value.split('/')[1] || '',
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    updateFileData: {
      type: Function,
      required: true,
    },
    mp3_ref: {
      type: String,
      default: '',
    },
    mp3_url: {
      type: String,
      default: '',
    },
    webm_ref: {
      type: String,
      default: '',
    },
    webm_url: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      required: true,
    },
    hasUnsavedChanges: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      mp3_filename: '',
      mp3_task: null,
      mp3_progress: 0,
      mp3_error: '',
      webm_filename: '',
      webm_task: null,
      webm_progress: 0,
      webm_error: '',
    };
  },

  computed: {
    storageUrl() {
      const { id } = this;
      return `https://console.firebase.google.com/u/0/project/quetzal-translate/storage/quetzal-translate.appspot.com/files~2F${id}~2F`;
    },
  },

  watch: {
    hasUnsavedChanges(bool) {
      if (!bool) {
        this.resetData();
      }
    },
  },

  methods: {
    // Get file from input for uploading
    getFileFromInput(files, tag) {
      const { db, id, updateFileData, uploadFile } = this;
      // Add example file from input
      const file = files[0];
      const filename = file.name;
      const format = tag;
      const fileFormat = file.type.split('/')[1]; // ex: "audio/mp3"
      if (fileFormat !== format) {
        this[`${tag}_error`] = `Incorrect format, should be ${format}`;
        return;
      }

      this[`${tag}_error`] = '';
      this[`${tag}_filename`] = filename;
      updateFileData({ tag, ref: '', url: '' });

      const timestamp = moment().format('YYYYMMDDHHmm');
      const ref = `${id}/${id}-${timestamp}.${format}`;
      uploadFile(tag, file, filename, ref);
    },

    uploadFile(tag, file, filename, ref) {
      const { updateFileData } = this;
      const storageRef = fb.storage.ref(ref);

      this[`${tag}_task`] = storageRef.put(file);
      this[`${tag}_task`].on(
        'state_changed',
        snapshot => {
          // Progress
          this[`${tag}_progress`] = Math.ceil(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        error => {
          // Error
          this[
            `${tag}_error`
          ] = `Error uploading ${filename}: ${error.message}`;
          this[`${tag}_filename`] = '';
          this[`${tag}_progress`] = 0;
          this[`${tag}_task`] = null;
          console.log('Error uploading file', error);
        },
        () => {
          // Success
          this[`${tag}_task`].snapshot.ref
            .getDownloadURL()
            .then(downloadURL => {
              updateFileData({ tag, ref, url: downloadURL });
              this[`${tag}_progress`] = 0;
              this[`${tag}_task`] = null;
              this[`${tag}_error`] = '';
            });
        }
      );
    },

    cancelUpload(tag, index) {
      const { $refs } = this;
      const task = this[`${tag}_task`];
      if (task) {
        task.cancel();
      }
      $refs.fileUpload[index].value = '';
    },

    resetData() {
      this.mp3_filename = '';
      this.mp3_task = null;
      this.mp3_progress = 0;
      this.mp3_error = '';
      this.webm_filename = '';
      this.webm_task = null;
      this.webm_progress = 0;
      this.webm_error = '';
      this.cancelUpload('mp3', 0);
      this.cancelUpload('webm', 1);
    },
  },
};
</script>

<template>
  <div class="upload-container">
    <p>
      Storage Folder:
      <a :href="storageUrl" target="_blank">{{ `${id}/` }}</a>
    </p>

    <table class="audio-table">
      <tr>
        <th>Upload</th>
        <th>Format</th>
        <th class="file-column">Filename</th>
        <th>URL</th>
        <th class="center-text">Status</th>
        <th class="center-text">Play</th>
      </tr>

      <tr v-for="(tag, index) in tags" :key="tag">
        <!-- Upload -->
        <td>
          <input
            ref="fileUpload"
            type="file"
            class="fileButton"
            value="upload"
            @input="getFileFromInput($event.target.files, tag)"
          />
          <v-btn
            v-if="$data[`${tag}_progress`]"
            text
            icon
            color="accent"
            @click.prevent="cancelUpload(tag, index)"
          >
            <v-icon class="material-icons-round">cancel</v-icon>
          </v-btn>
          <v-btn v-else text icon color="secondary" @click.prevent="$refs.fileUpload[index].click">
            <v-icon class="material-icons-round">cloud_upload</v-icon>
          </v-btn>
        </td>

        <!-- Format -->
        <td>
          <strong>{{ tag }}</strong>
        </td>

        <!-- Filename -->
        <td>
          <p class="caption grey--text">{{ $data[`${tag}_filename`] || '' }}</p>
          <p v-if="$props[`${tag}_ref`]" class="filename">
            <v-icon
              v-if="$data[`${tag}_filename`]"
              class="material-icons-round"
            >subdirectory_arrow_right</v-icon>
            {{ $props[`${tag}_ref`] | filename }}
          </p>
        </td>

        <!-- Url -->
        <td class="url-cell">{{ $props[`${tag}_url`] }}</td>

        <!-- Status: Cloud = Uploaded, not saved, Check = Uploaded and saved -->
        <td class="center-text">
          <span v-if="$data[`${tag}_progress`]">{{ $data[`${tag}_progress`] }}%</span>

          <v-icon
            v-if="$data[`${tag}_filename`] && $props[`${tag}_url`]"
            class="material-icons-round"
            color="secondary"
          >cloud_done</v-icon>

          <v-icon
            v-if="!$data[`${tag}_filename`] && $props[`${tag}_url`]"
            class="material-icons-round"
            color="secondary"
          >check</v-icon>
        </td>

        <!-- Play -->
        <td>
          <!-- <AudioPlayer :playlist="[[$props[`${tag}_url`]]]" height="36" /> -->
        </td>
      </tr>
    </table>

    <!-- Errors -->
    <p v-if="mp3_error" class="red-text">{{ mp3_error }}</p>

    <p v-if="webm_error" class="red-text">{{ webm_error }}</p>
  </div>
</template>

<style lang="scss" scoped>
.upload-container {
  width: 100%;
}

table {
  width: 100%;
  margin: 1rem 0;
}

table,
th,
td {
  border-bottom: 1px solid;
  // border-color: $blue-light;
  border-collapse: collapse;
}

td {
  padding: 12px 3px;
  font-size: 0.9rem;
}

th {
  min-width: 60px;
  width: 60px;
  max-width: 60px;
  padding: 12px 3px;
  box-sizing: border-box;
  // font-family: $font-family-thin;
  font-weight: normal;
  font-size: 0.8rem;
  text-align: left;
}

.file-column {
  width: 100%;
  max-width: 100%;
}

.url-cell {
  width: 60px;
  max-width: 60px;
  white-space: nowrap;
  overflow: hidden;
}

.fileButton {
  display: none;
}

.filename {
  font-size: 0.9rem;
}
</style>
