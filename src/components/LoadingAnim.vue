<template>
    <div class="animated">
        <transition name="fade" appear>
            <div class="fake-nav">
                <div class="fake fake-hamburger"></div>
                <div class="fake fake-logo-small-app"></div>
                <div class="fake fake-user-container"></div>
            </div>
        </transition>
        <transition name="fade" appear>
            <div class="fake-notes-container">
                <div class="fake fake-note" ></div>
                <div class="fake fake-note"></div>
                <div class="fake fake-note"></div>
                <div class="fake fake-note"></div>
            </div>
        </transition>
        <transition name="fade" appear>
            <div class="fake fake-button"></div>
        </transition>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .animated{
        position: absolute;
        top:0;
        left:0;
        z-index: 100;
        width: 100%;
        height: 100%;
    }
    .fake {
        background-image: linear-gradient(to right bottom, #a6a6a6, #b1b1b1, #bcbcbc, #c7c7c7, #d2d2d2);        cursor:none;
        border-radius: 8px;
    }
    .fake-nav{
        padding: 35px;
    }
    .fake-hamburger { 
        position: absolute;
        width: 35px;
        height: 35px;
        top: 20px;
        left: 25px;
    }
    .fake-logo-small-app { 
        position: absolute;
        top: 10px;
        left: 80px;
        width:80px;
        height: 55px;
    }
    .fake-user-container { 
        position: absolute;
        top: 20px;
        right: 22px;
        width: 105px;
        height: 35px;
        border-radius: 15px;
    }
    .fake-notes-container {
        display: flex;
        flex-flow: row;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-right: 8%;
        margin-left: 8%;
    }
    .fake-note { 
        min-width: 150px;
        min-height: 150px;
        border-radius: 15px;
        display: inline-block;
        box-sizing: border-box;
        margin: 12px;
    }
    .fake-button { 
        position: absolute;
        bottom: 20px;
        right: 18px;
        border-radius: 50%;
        width: 62px;
        height: 62px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s ease;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    @media (max-width: 540px){
        .fake-nav{
            padding: 70px;
        }
        .fake-notes-container {
            margin-left: 1%;
            margin-right: 1%;
        }
        .fake-note { 
        margin: 8px;
    }
    }
    @media (max-width: 620px){
        .fake-notes-container {
            margin-left: 0%;
            margin-right: 0%;
        }
    }
</style>