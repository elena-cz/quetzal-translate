<script>
import moment from 'moment';
import fb from '@/firebaseConfig';
import AdminUploadAudio from '@/components/admin/AdminUploadAudio.vue';

export default {
  name: 'AdminEditTranslation',

  components: {
    AdminUploadAudio,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    doc: {
      type: Object,
      required: true,
    },
    langName: {
      type: String,
      default: '',
    },
    updateLangArray: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      enId: '',
      lang: '',
      text: '',
      mp3_ref: '',
      mp3_url: '',
      webm_ref: '',
      webm_url: '',
      version: 0,
      lastUpdatedAt: null,
      createdAt: null,
      tags: ['mp3', 'webm'], // Tags are the format for each file
      hasUnsavedChanges: false,
    };
  },

  computed: {
    disabled() {
      const { id, hasUnsavedChanges } = this;
      return !id || !hasUnsavedChanges;
    },
  },

  watch: {
    id: {
      handler() {
        this.setUnsavedData();
      },
      immediate: true,
    },
  },

  methods: {
    setUnsavedData() {
      const { id, doc } = this;
      const {
        enId,
        lang,
        text,
        mp3_ref,
        mp3_url,
        webm_ref,
        webm_url,
        version,
        lastUpdatedAt,
        createdAt,
      } = doc;
      this.enId = enId || '';
      this.lang = lang || '';
      this.text = text || '';
      this.mp3_ref = mp3_ref || '';
      this.mp3_url = mp3_url || '';
      this.webm_ref = webm_ref || '';
      this.webm_url = webm_url || '';
      this.version = version || 0;
      this.lastUpdatedAt = lastUpdatedAt
        ? moment(lastUpdatedAt).format('MMM Do YYYY, h:mm')
        : null;
      this.createdAt = createdAt
        ? moment(createdAt).format('MMM Do YYYY')
        : null;
      this.hasUnsavedChanges = false;
    },

    setHasUnsavedChanges() {
      this.hasUnsavedChanges = true;
    },

    updateFileData({ tag, ref, url }) {
      this.hasUnsavedChanges = true;
      this[`${tag}_ref`] = ref;
      this[`${tag}_url`] = url;
    },

    saveToDb() {
      const { updateLangArray, setUnsavedData } = this;
      const {
        id,
        enId,
        lang,
        text,
        mp3_ref,
        mp3_url,
        webm_ref,
        webm_url,
        version,
      } = this;
      const newVersion = version + 1;

      const data = {
        text,
        mp3_ref,
        mp3_url,
        webm_ref,
        webm_url,
        version: newVersion,
        lastUpdatedAt: moment().format(),
      };

      fb.phrasesCollection
        .doc(enId)
        .collection('translations')
        .doc(id)
        .set(data, { merge: true })
        .then(() => {
          if (mp3_url) {
            updateLangArray(lang);
          }
          setUnsavedData();
          console.log('Doc updated');
        })
        .catch(error => {
          console.error('Error writing document: ', error);
        });
    },
  },
};
</script>

<template>
  <div class="mb-5">
    <v-form>
      <v-container>
        <v-row class="mb-3 justify-space-between">
          <h4 class="mb-3">{{ doc.lang }} - {{langName}}</h4>
          <p class="caption">ID: {{id}}</p>
        </v-row>

        <v-row>
          <v-textarea
            outlined
            auto-grow
            rows="2"
            name="text"
            label="Text (optional)"
            color="secondary"
            v-model.trim="text"
            @input="setHasUnsavedChanges"
          ></v-textarea>
        </v-row>

        <v-row>
          <AdminUploadAudio
            :id="id"
            :updateFileData="updateFileData"
            :mp3_ref="mp3_ref"
            :mp3_url="mp3_url"
            :webm_ref="webm_ref"
            :webm_url="webm_url"
            :tags="tags"
            :hasUnsavedChanges="hasUnsavedChanges"
          />
        </v-row>

        <v-row>
          <p class="caption grey--text">
            Version: {{ version }}
            <br />
            Updated At: {{ lastUpdatedAt }}
            <br />
            Created At: {{ createdAt }}
          </p>
        </v-row>

        <v-row class="save-container justify-space-between align-center">
          <span>
            <v-icon small :color="hasUnsavedChanges ? 'grey' : 'secondary'" class="mr-2">lens</v-icon>
            {{ hasUnsavedChanges ? 'Not Saved' : 'Saved' }}
          </span>

          <div class="save-buttons">
            <v-btn rounded class="mr-4" @click.prevent="setUnsavedData()">Cancel</v-btn>
            <v-btn
              rounded
              color="secondary"
              type="submit"
              :disabled="disabled"
              @click.prevent="saveToDb"
            >Save {{lang}}</v-btn>
          </div>
        </v-row>
      </v-container>
      <v-divider class="my-4" />
    </v-form>
  </div>
</template>

<style lang="scss" scoped>
// @import '@/design/colors.scss';
</style>
