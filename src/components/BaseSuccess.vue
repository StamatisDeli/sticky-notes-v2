<template>
    <div class="wrapper">
    <div class="animated">

        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 161.2 161.2" enable-background="new 0 0 161.2 161.2" xml:space="preserve">

        <path class="path" fill="none" stroke="#7DB0D5" stroke-miterlimit="10" d="M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4
            c-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5
            c0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z"/>

        <circle class="path" fill="none" stroke="#7DB0D5" stroke-width="4" stroke-miterlimit="10" cx="80.6" cy="80.6" r="62.1"/>

        <polyline class="path" fill="none" stroke="#7DB0D5" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="113,52.8 
            74.1,108.4 48.2,86.4 "/>

        <circle class="spin" fill="none" stroke="#7DB0D5" stroke-width="4" stroke-miterlimit="10" stroke-dasharray="12.2175,12.2175" cx="80.6" cy="80.6" r="73.9"/>
        </svg>
        <p>Login Successful</p>
    </div>
    
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.wrapper{
    z-index: 5;
    position: absolute;
    top:0%;
    left:0%;
    width: 100%;
    height: 100%;
    
}
.animated {
    border-radius: 10px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    background-color: rgba(240, 248, 255, 0.795);
}

.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  animation: dash 1s ease-in-out;
  -webkit-animation: dash 1s ease-in-out;
}

.spin {
  animation: spin 1s;
  -webkit-animation: spin 1s;
  transform-origin: 50% 50%;
  -webkit-transform-origin: 50% 50%;
}

p {
  font-family: sans-serif;
  color: rgb(130, 138, 255);
  font-size: 1.1rem;
  font-weight: bold;

  text-align: center;
  animation: text .5s linear .4s;
  -webkit-animation: text .4s linear .3s;
}

@-webkit-keyframes dash {
 0% {
   stroke-dashoffset: 1000;
 }
 100% {
   stroke-dashoffset: 0;
 }
}

@keyframes dash {
 0% {
   stroke-dashoffset: 1000;
 }
 100% {
   stroke-dashoffset: 0;
 }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes text {
  0% {
    opacity: 0; }
  100% {
    opacity: 1;
  }
}
  
  @keyframes text {
  0% {
    opacity: 0; }
  100% {
    opacity: 1;
  }
}

</style>