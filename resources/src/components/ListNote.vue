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
    import axios from 'axios';

    export default {
        name: 'ListNote',
        data: function(){
            return{
                notes: [
                    
                ]
            }
        },
        methods:{
            editNote(id){
            let dataForm = this.notes.find(note => note.id === id);
            dataForm.mode = 'update';

            // fungsi emit mengirimkan sebuah event yang dapat ditangkap didalam app.vue, formNote.vue listNote.vue ataupun component lainnya
            this.$root.$emit('emitForm', dataForm);
            },
            // untuk membuat id baru 
            // createNewId(){
            //     let newId = 0;
                
            //     if(this.notes.length === 0){
            //         newId = 1;
            //     }else{
            //         newId = this.notes[this.notes.length - 1].id + 1;
            //     }

            //     return newId;
            // },
            getData(){
                axios.get('http://localhost:8080/wegodev-notes/note').then(response =>{
                    this.notes = response.data;
                    // console.log(response);
                });
            }
        },
        mounted(){
            this.getData();

            this.$root.$on('emitRemoveNote', data => {
                let noteIndex = this.notes.findIndex(note => note.id === data.id);
                
                // splice ini digunakan untuk membuat sebuah array berdasarkan nilai indexnya.
                this.notes.splice(noteIndex, 1);
            });

            this.$root.$on('emitUpdateNote', data => {
                let noteIndex = this.notes.findIndex(note => note.id === data.id);
                
                this.notes[noteIndex].title = data.title;
                this.notes[noteIndex].description = data.description;
            });

            this.$root.$on('emitSaveNote', data => {
                let newNote = { id:data.id, 'title' : data.title, 'description' : data.description }

                // unshitf berfungsi jika ada data baru maka akan di letakan di bagian pertama
                this.notes.unshift(newNote);
                this.editNote(data.id);
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