<template>
  <div class="ListNote">
      <ul>
          <li v-for="(item, index) in notes" v-bind:key="index">
            <button class="btn-note" @click="editNote(item.id)">
                <label>{{ item.title }}</label>
                <span>{{ item.description }}</span>
            </button>
          </li>
      </ul>
  </div>
</template>

<script type=text/javascript>
    export default {
        name: 'ListNote',
        props: {
            propEditNote: {
                type: Function
            }
        },
        data: function(){
            return{
                notes: [
                    {
                        id: 1,
                        title: 'Prepare lunch',
                        description: 'Ambil sayur buat makan siang'
                    },
                    {
                        id: 2,
                        title: 'Washing Motorcyle',
                        description: 'at 04:00 PM'
                    }
                ]
            }
        },
        methods:{
            editNote(id){
            let dataForm = this.notes.find(note => note.id === id);

            // fungsi emit mengirimkan sebuah event yang dapat ditangkap didalam app.vue, formNote.vue listNote.vue ataupun component lainnya
            this.$root.$emit('emitForm', dataForm);
            }
        },
        mounted(){
            this.$root.$on('emitRemoveNote', data => {
                let noteIndex = this.notes.findIndex(note => note.id === data.id);
                
                // splice ini digunakan untuk membuat sebuah array berdasarkan nilai indexnya.
                this.notes.splice(noteIndex, 1);
            });
        }
    }
</script>

<style scoped>
ul {
     list-style-type: none;
     padding: 0;
     margin:0px;
}

.btn-note {
    text-align: left;
    border: none;
    border-bottom: 1px solid gainsboro;
    padding: 0px 15px;
    cursor: pointer;
    outline: none;
    background: #f7f7f7;
    height: 150px;
    width: 100%;
}
.btn-note:hover {
    background:#eaeaea;
}
.btn-note label{
    display:block;
    color: #444444;
    font-size: 1.5em;
    margin-bottom: 15px;
}
.btn-note span{
color: #545454;
}

</style>