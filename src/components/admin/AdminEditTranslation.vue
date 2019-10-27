<script>
export default {
  name: 'AdminEditTranslation',

  components: {},

  props: {
    enId: {
      type: String,
      required: true,
    },
    doc: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isNewDoc: true,
      id: '',
      text: '',
      mp3_ref: '',
      mp3_url: '',
      webm_ref: '',
      webm_url: '',
      version: 0,
      lastUpdatedAt: null,
      createdAt: null,
      hasUnsavedChanges: false,
      isIdSet: false,
    };
  },

  computed: {
    disabled() {
      const { id, hasUnsavedChanges, mp3_url } = this;
      return !id || !mp3_url || !hasUnsavedChanges;
    },
  },

  watch: {
    enId: {
      handler() {
        this.isNewDoc = !this.savedId;
        this.setUnsavedData();
      },
      immediate: true,
    },
  },

  methods: {
    setUnsavedData() {},

    setHasUnsavedChanges() {
      this.hasUnsavedChanges = true;
    },
  },
};
</script>

<template>
  <div class="mb-5">
    <h4 class="mb-3">{{ doc.lang }}</h4>
    <h5>
      <strong>1</strong>&nbsp;&nbsp;Add Language
    </h5>
    <v-form>
      <v-container>
        <v-row class="mb-3">
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

        <v-row class="justify-end">
          <v-btn
            rounded
            color="secondary"
            type="submit"
            :disabled="disabled"
            @click.prevent="saveToDb"
          >Add Language</v-btn>
        </v-row>
      </v-container>
    </v-form>
    <h5>
      <strong>2</strong>&nbsp;&nbsp;Add Audio
    </h5>
  </div>
</template>

<style lang="scss" scoped>
// @import '@/design/colors.scss';
</style>
