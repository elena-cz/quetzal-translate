<script>
import moment from 'moment';
import { mapState } from 'vuex';
import fb from '@/firebaseConfig';
import AdminEditTranslation from '@/components/admin/AdminEditTranslation.vue';

export default {
  name: 'AdminManageTranslations',

  components: {
    AdminEditTranslation,
  },

  props: {
    enId: {
      type: String,
      required: true,
    },
    langs: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      translations: {},
      newLang: '',
    };
  },

  computed: {
    ...mapState('languages', ['langNames']),

    existingLangs() {
      const { translations } = this;
      return Object.keys(translations).map(doc => doc.lang);
    },

    availableLangs() {
      const { existingLangs, langNames } = this;
      const langSet = new Set(Object.keys(langNames));
      existingLangs.forEach(lang => {
        langSet.delete(lang);
      });
      return Array.from(langSet).map(lang => ({
        value: lang,
        text: `${lang} - ${langNames[lang]}`,
      }));
    },
  },

  watch: {
    enId: {
      handler() {
        this.getTranslations();
      },
      immediate: true,
    },
  },

  methods: {
    getTranslations() {
      const { enId } = this;
      fb.phrasesCollection
        .doc(enId)
        .collection('translations')
        .onSnapshot(
          snapshot => {
            const translations = {};
            snapshot.forEach(doc => {
              translations[doc.id] = doc.data();
            });
            this.translations = translations;
          },
          error => {
            console.error('Error getting translations', error);
          }
        );
    },

    addTranslation() {
      const { enId, newLang } = this;
      const id = `${newLang}-${enId}`;
      const data = {
        id,
        lang: newLang,
        enId,
        createdAt: moment().format(),
        lastUpdatedAt: moment().format(),
        version: 0,
      };
      fb.phrasesCollection
        .doc(enId)
        .collection('translations')
        .doc(id)
        .set(data, { merge: true })
        .then(() => {
          this.newLang = '';
          console.log('Translation doc created');
        })
        .catch(error => {
          console.error('Error writing document: ', error);
        });
    },

    updateLangArray(lang) {
      const { enId } = this;
      fb.phrasesCollection
        .doc(enId)
        .update({
          langs: fb.dbFieldValue.arrayUnion(lang),
        })
        .catch(error => {
          console.error('Error updating languages', error);
        });
    },
  },
};
</script>

<template>
  <div class="mt-6">
    <h3 class="display-2 mb-5">Translations</h3>
    <v-container v-if="availableLangs.length > 0">
      <v-row class="justify-stretch align-stretch">
        <v-select
          v-model="newLang"
          :items="availableLangs"
          label="Add Language"
          outlined
          color="secondary"
        ></v-select>

        <v-btn
          color="secondary"
          height="56"
          class="ml-5"
          :disabled="!newLang"
          @click.prevent="addTranslation"
        >Add</v-btn>
      </v-row>
    </v-container>

    <v-divider class="my-3" />

    <AdminEditTranslation
      v-for="doc in translations"
      :id="doc.id"
      :doc="doc"
      :lang-name="langNames[doc.lang]"
      :updateLangArray="updateLangArray"
    />
  </div>
</template>

<style lang="scss" scoped>
// @import '@/design/colors.scss';
</style>
