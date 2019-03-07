<template>
<div class="wrapper">
    <section v-if="!this.isNew">
        <p>Created: {{ this.note.created }}</p>
    </section>
<div class="container note">
    <form>
    <div class="form-group">
        <label for="inputTitle">Title</label>
        <input type="title" class="form-control" id="inputTitle" placeholder="Note Title" v-model="note.title">
    </div>
    <div class="form-group">
        <label for="inputDate">Action Date</label>
        <input type="date" class="form-control" id="inputDate" placeholder="day/month/year" v-model="note.date">
    </div>
    <div class="form-group">
        <label for="inputTime">Action Time</label>
        <input type="time" class="form-control" id="inputTime" placeholder="12:00" v-model="note.time">
    </div>
    <div class="form-group">
      <label for="comment">Make a note:</label>
      <textarea class="form-control" rows="5" id="comment" v-model="note.comment"></textarea>
    </div>
    </form>
    <section class="btn-group btn-group-justified">
        <div class="btn-group">
            <button type="button" class="btn btn-success"
            @click="handleDoneButton">Done!</button>
        </div>
        <div class="btn-group">
            <button type="button" class="btn btn-danger"
            @click="deleteFromFirebase">Delete</button>
        </div>
        <div class="btn-group">
            <button type="button" class="btn btn-warning"
            @click="handleCancelButton">Cancel</button>
        </div>
    </section>
</div>
</div>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'

export default {
    data(){
        return{
            note:{
                id:'',
                date:null,
                time:null,
                title:'',
                comment:'',
                created: this.getDate()
            }
        }
    },
    computed:{
        ...mapState({
            userId: state => state.auth.userId,
            idToken: state => state.auth.idToken,
        }),
        ...mapGetters (
            'oldNote',
            { oldNote: 'oldNote' }
        ),
        ...mapGetters(
            'booleans', 
            {isLoading:'isLoading'}
        ),
        ...mapGetters(
            'booleans', 
            {isNew:'isNew'}
        )
    },
    methods:{
        returnEmptyNote() {
            return {
                id:this.note.id,
                date:this.note.date,
                time:this.note.time,
                title:this.note.title,
                comment:this.note.comment,
                created:this.note.created,
            }
        },
        handleDoneButton() {
            if (this.isNew) { this.sendToFirebase() }
            else { this.editExistingNote() }
        },
        sendToFirebase() {
            let userId = this.userId
            let idToken = this.idToken

            if (!this.note.title.length) {
                alert ("You can't make a note without a Title!")
                return
                }
            return axios.post(`users/${userId}/notes.json?auth=${idToken}`, this.note)
                .then((response) => {
                    console.log(response);
                })
                .then(this.$router.push('/'))
                .then(this.getNotes)
                .catch((error) => {
                    NProgress.done()
                    console.log("Error: ",error);
                })
        },
        getNotes(){
            this.$store.dispatch('notes/getNotes')
        },
        async deleteFromFirebase(){
            if(this.isNew) return
            // const id = this.note.id
            // const userId = this.userId
            // const idToken = this.idToken
            //axios.delete(`users/${userId}/notes/${id}/.json?auth=${idToken}`, this.note)
            await this.$store.dispatch('notes/deleteNote', this.note)
            await this.$store.dispatch('notes/getNotes')
                // .then((response) => {
                //     console.log(response);
                // })
                // .then(this.getNotes)
                .catch((error) => {
                    console.log("Error: ",error);
                })
            this.$router.push('/')
        },
        editExistingNote(){
            if (!this.note.title.length) {
                alert ("You can't make a note without a Title!")
                return
                }
                
            const id = this.note.id
            const userId = this.userId
            const idToken = this.idToken

            axios.put(`users/${userId}/notes/${id}/.json?auth=${idToken}`, this.note)
                .then((response) => {
                    console.log(response);
                })
                .then(this.getNotes)
                .catch((error) => {
                    console.log("Error: ",error);
                })
            this.$router.push('/')
        },
        handleCancelButton(){
            this.$router.push('/')
        },
        getDate () {
            let today = new Date().toLocaleString();
            return today
        }
    },
    mounted() {
        if (this.oldNote != undefined){
            this.note = this.oldNote;
        }
        else {
            this.note = this.returnEmptyNote()
         }
        this.getDate()
        console.log(this.note.id)
    }
}
</script>

<style scoped>
.wrapper {
    padding-top:80px;
}
.note {
    max-width: 400px;
    max-height: 400px;
    min-width: 280px;
    min-height: 280px;
    /* background-color: rgba(255, 255, 0, 0.63);
    border: 1px solid rgba(53, 7, 7, 0.384); */
    background-image: url("../assets/sticky-note.svg");
    background-repeat: no-repeat;
}
form {
    padding-bottom: 3rem;
    min-width: 280px;
    text-align: left;
}
input{
    background-color: rgba(255, 255, 255, 0);
    width: 90%;
    border: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.712);
    box-shadow: none;
}
textarea{
    background-color: rgba(255, 255, 255, 0);
    width: 90%;
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.712);
}
::-webkit-input-placeholder { color: rgba(255, 255, 255, 0.712); }
:-moz-placeholder           { color: rgba(255, 255, 255, 0.712); }
::-moz-placeholder          { color: rgba(255, 255, 255, 0.712); }
:-ms-input-placeholder      { color: rgba(255, 255, 255, 0.712); }
</style>