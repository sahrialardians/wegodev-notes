<template>
  <div class="FormNote">
    <div class="menu">
        <form>
            <button type="button" @click="submitRemove" class="bg-danger btn btn-delete">Delete</button>
            <button type="button" @click="submitSave"  class="bg-success btn" v-if="mode == 'save'">Save</button>
            <button type="button" @click="submitUpdate"  class="bg-success btn" v-if="mode == 'update'">Update</button>
        </form>
    </div>

    <div class="content">
        <input type="text" class="text" placeholder="id" v-model="id">
        <input type="text" class="text" placeholder="Title" v-model="title">
        <textarea class="text textarea" placeholder="Write plans your! ex: Playing football.." v-model="description"></textarea>
    </div>
  </div>
</template>

<script type=text/javascript>
    import axios from 'axios';

    export default {
        name: 'FormNote',
        props: {
            
        },
        data: function(){
            return{
                id: 0,
                title: '',
                description: '',
                mode: 'save'
            }
        },
        methods: {
            submitSave(){
                params = new URLSearchParams();
                params.append('title', this.title);
                params.append('description', this.description);

                axios.post('http://localhost:8080/wegodev-notes/note/create', params).then(response =>{
                    let data = {
                        id: this.response.data.id,
                        title: this.title,
                        description: this.description
                    } 
                    this.$root.$emit('emitSaveNote', data);
                    this.resetinput();
                });
            },
            submitUpdate(){
                let data = {
                    id: this.id,
                    title: this.title,
                    description: this.description
                }
                this.$root.$emit('emitUpdateNote', data);
                this.resetinput();
            },
            submitRemove(){
                let data = { id: this.id}
                this.$root.$emit('emitRemoveNote', data);
                this.resetinput();
            },
            resetinput(){
                this.id = 0,
                this.title = '',
                this.description = '',
                this.mode = 'save'
            }
        },
        // mounted ini digunakan untuk mendeklarasikan yang harus dijalankan pertama kali dari sebuah komponen.
        mounted(){
            // on itu yg tadinya emit, disini menggunakan on karena akan menjadi penerima dari emit yang ada didalam listnote tersebut
            // root akan mengacu pada komponen utama pada vue.js dan kompenonen utama sekarang adalah app.vue
            this.$root.$on('emitForm', data => {
                this.id = data.id;
                this.title = data.title;
                this.description = data.description;
                this.mode = data.mode;
            })
        }
    }
</script>

<style scoped>
.menu{
    background: #f7f7f7;
    padding:10px 25px;
    margin-bottom: 25px;
    text-align:right;
    border-bottom: 1px solid #e8e6e6;
}
.btn-delete{ 
    margin-right:10px; 
}
.content{
    padding: 0px 25px;
}
.text{
    display: block;
    width: 100%;
    padding: 0px;
    font-size: 20px;
    font-weight: bold;
    color: #2c3e50;
    border: none;
    margin-bottom: 10px;
    box-sizing: border-box;
    outline: none;
}
.textarea{
    min-height: 350px;
    font-size: 15px;
    font-weight: lighter;
    line-height: 30px;
}
.loader{
    vertical-align: middle;
}
</style>