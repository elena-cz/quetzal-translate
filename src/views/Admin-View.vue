<script>
import fb from '@/firebaseConfig';
import AdminEditPhrases from '@/components/admin/AdminEditPhrases.vue';

export default {
  name: 'AdminView',

  components: {
    AdminEditPhrases,
  },

  data() {
    return {
      currentId: '',
      docs: {},
    };
  },

  computed: {
    page() {
      return this.$route.params.page || 'phrases';
    },

    collection() {
      return this.page;
    },

    currentDoc() {
      const { currentId, docs } = this;
      return currentId ? docs[currentId] || {} : {};
    },

    newButtonText() {
      const { page } = this;
      const nouns = {
        phrases: 'Phrase',
        topics: 'Topic',
      };
      const noun = nouns[page] || 'Phrase';
      return `New ${noun}`;
    },
  },

  watch: {
    page: {
      handler() {
        this.currentId = '';
        this.docs = {};
        this.getDocs();
      },
      immediate: true,
    },
  },

  methods: {
    getDocs() {
      const { docs, collection } = this;
      const updatedDocs = {};

      fb.db.collection(collection).onSnapshot(
        snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type !== 'removed') {
              const { id } = change.doc;
              updatedDocs[id] = change.doc.data();
            }
          });
          this.docs = { ...docs, ...updatedDocs };
        },
        error => {
          console.log('Error getting docs', error);
        }
      );
    },

    setCurrentId(id) {
      this.currentId = id || '';
    },
  },
};
</script>

<template>
  <div class="app-container">
    <v-app-bar app flat color="transparent">
      <v-toolbar-title class="headline white--text">
        <span>Quetzal Admin</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="admin-grid">
        <aside class="sidebar">
          <v-btn color="primary" rounded @click="setCurrentId('')">{{ newButtonText }}</v-btn>

          <v-list shaped dense>
            <v-subheader>PHRASES</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(doc, i) in docs"
                :key="doc.id"
                :input-value="currentId"
                @click="setCurrentId(doc.id)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="doc.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </aside>
        <div class="main">
          <AdminEditPhrases :saved-id="currentId" :doc="currentDoc" :set-current-id="setCurrentId" />
        </div>
      </v-container>
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
.admin-grid {
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: auto;
  grid-template-areas: 'sidebar main';
  grid-gap: 1rem;
  align-content: flex-start;
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
}

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: calc(250px + 1rem);
  height: 100%;
  max-height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
}

.main {
  grid-area: main;
  width: 100%;
}
</style>
