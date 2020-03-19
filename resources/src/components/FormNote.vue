<template>
  <div class="FormNote">
    <div class="menu">
        <form @submit="submitNote">
            <button type="button" @click="submitRemove" class="bg-danger btn btn-delete">Delete</button>
            <button type="submit" class="bg-success btn">Save</button>
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
    export default {
        name: 'FormNote',
        props: {
            propSaveNote: {
                type: Function
            },
            propUpdateNote: {
                type: Function
            }
        },
        data: function(){
            return{
                id: 0,
                title: '',
                description: ''
            }
        },
        methods: {
            submitNote(e){
                e.preventDefault();
                if(this.id === 0){
                    this.propSaveNote(this.title, this.description);
                }
                else{
                    this.propUpdateNote(this.id, this.title, this.description);
                }
            },
            submitRemove(){
                let data = { id: this.id}
                this.$root.$emit('emitRemoveNote', data);
                this.resetinput();
            },
            resetinput(){
                this.id = 0,
                this.title = '',
                this.description = ''
            }
        },
        // watch digunakan untuk selalu memantau setiap kali ada perubahan berdasarkan data atau methode yang dibuat
        watch: {
        },
        // mounted ini digunakan untuk mendeklarasikan yang harus dijalankan pertama kali dari sebuah komponen.
        mounted(){
            // on itu yg tadinya emit, disini menggunakan on karena akan menjadi penerima dari emit yang ada didalam listnote tersebut
            // root akan mengacu pada komponen utama pada vue.js dan kompenonen utama sekarang adalah app.vue
            this.$root.$on('emitForm', data => {
                this.id = data.id;
                this.title = data.title;
                this.description = data.description;
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