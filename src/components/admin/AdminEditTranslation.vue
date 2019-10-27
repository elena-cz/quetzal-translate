<script>
import moment from 'moment';

export default {
  name: 'AdminEditTranslation',

  components: {},

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
  },

  data() {
    return {
      id: '',
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
      console.log('createdAt', createdAt);
      this.id = id || '';
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
