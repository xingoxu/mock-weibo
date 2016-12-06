<template lang="html">
  <popup class="forward popup-wrapper" :show.sync="showAvatarPopup">
    <span slot="title">设置头像</span>
    <div class="popup-body" slot="body">
      <div>
        <div class="wrapper">
          <input type="file" accept="images/*" @change="inputChange">
          <div class="container">
            <div class="resizer" :class="{'have-img': haveImg}">
              <div class="inner" v-el:inner>
                <img / v-el:img>
                <div class="frames" v-el:frames @mouseup="lastPoint=null" @mousedown="getOffset" @mousemove="mouseMove">
                  
                </div>
              </div>
              <button class="ok" v-el:ok-button @click="clipImage">&#10003;</button>
              <canvas :width="canvasSize" :height="canvasSize" v-el:canvas v-if="showCanvas"></canvas>
            </div>
          </div>
        </div>
        <button class="submit">确认</button>
        <button>取消</button>
      </div>
    </div>
  </popup>
</template>

<script>
  import popup from './popup';

  export default {
    props: ['currentUser'],
    data(){
      var resizer = {};
      resizer.frameOffset={
          top:0,
          left:0
      };

      var time;
      var that = this;
      window.onresize=function(){
          clearTimeout(time)
          time=setTimeout(()=>{
            that.setFrames()
          },1000);
      };

      return {
        weibo: {
          user: {}
        },
        showAvatarPopup: false,
        resizer: resizer,
        canvasSize: 0,
        showCanvas: false,
        offset: {
          width: 0,
          height: 0,
        },
        resizedImage: null,
        lastPoint: null,
        haveImg: false,
      }
    },
    ready(){
      if(Uint8Array&&HTMLCanvasElement&&atob&&Blob){
          
      }else{
        return false;
      }
      this.resizer.image= this.$els.img;
      this.resizer.frames= this.$els.frames;
      this.resizer.okButton= this.$els.okButton;
    },
    events: {
      show(){
        this.showAvatarPopup = true;
      },
    },
    methods:{
      clipImage(){
        var nh=this.resizer.image.naturalHeight,
            nw=this.resizer.image.naturalWidth,
            size=nw>nh?nh:nw;
        size=size>1000?1000:size;
        this.canvasSize = size;
        this.showCanvas = true;

        this.$nextTick(()=>{
          var canvas = this.$els.canvas;
          this.resizer.canvas= canvas;
          var ctx=canvas.getContext('2d'),
              scale=nw/this.offset.width,
              x=this.resizer.frameOffset.left*scale,
              y=this.resizer.frameOffset.top*scale,
              w=this.resizer.frameOffset.size*scale,
              h=this.resizer.frameOffset.size*scale;
          
          ctx.drawImage(this.resizer.image,x,y,w,h,0,0,size,size);
          var src=canvas.toDataURL();
          this.haveImg = false;

          src=src.split(',')[1];
          if(!src)
            return this.resizer.doneCallback(null);
          src=window.atob(src);
          
          var ia = new Uint8Array(src.length);
          for (var i = 0; i < src.length; i++) {
              ia[i] = src.charCodeAt(i);
          };
          
          this.resizer.doneCallback(new Blob([ia], {type:"image/png"}));
          console.log('test');
        })
      },
      resize(file,done){
        this.reset();
        this.resizer.doneCallback = done;
        this.setFrameSize(0);
        this.resizer.frames.style.top = 0;
        this.resizer.frames.style.left = 0;
        var reader = new FileReader();
        var that = this;
        reader.onload = function(){
            that.resizer.image.src = reader.result;
            reader = null;
            that.haveImg = true;
            // that.resizer.addClass('have-img');
            setTimeout(()=>{
              that.setFrames();
            },0);
        };
        reader.readAsDataURL(file);
      },
      reset(){
        this.resizer.image.src='';
        this.haveImg = false;
        this.showCanvas = false;
      },
      getDefaultSize(){
        console.log(this.$els.inner.offsetWidth);
        console.log(this.$els.inner.offsetHeight);
        var width = this.$els.inner.offsetWidth,
            height = this.$els.inner.offsetHeight;
        this.offset={
            width: width,
            height: height
        };
        console.log(this.offset)
        return width>height? height:width;
      },
      setFrameSize(size){
        this.resizer.frameOffset.size = size;
        this.$els.frames.style.width = size+'px';
        this.$els.frames.style.height = size+'px';
      },
      moveFrames(offset){
        var x=offset.x,
            y=offset.y,
            top=this.resizer.frameOffset.top,
            left=this.resizer.frameOffset.left,
            size=this.resizer.frameOffset.size,
            width=this.offset.width,
            height=this.offset.height;
        
        if(x+size+left>width){
            x=width-size;
        }else{
            x=x+left;
        };
        
        if(y+size+top>height){
            y=height-size;
        }else{
            y=y+top;
        };
        x=x<0?0:x;
        y=y<0?0:y;
        this.$els.frames.style.top = y+'px';
        this.$els.frames.style.left = x+'px';
        
        this.resizer.frameOffset.top=y;
        this.resizer.frameOffset.left=x;
      },
      setFrames(){
        var size = this.getDefaultSize();
        this.setFrameSize(size);
      },
      inputChange(event){
        var file = event.target.files[0];
        this.resize(file,(file)=>{
            this.resizedImage = file;
        });
      },
      getOffset(event){
        var x,y;
        if(event.touches){
            var touch=event.touches[0];
            x = touch.clientX;
            y = touch.clientY;
        }else{
            x=event.clientX;
            y=event.clientY;
        }
        
        if(!this.lastPoint){
            this.lastPoint={
                x:x,
                y:y
            };
        };
        
        var offset={
            x:x-this.lastPoint.x,
            y:y-this.lastPoint.y
        }
        this.lastPoint={
            x: x,
            y: y
        };
        return offset;
      },
      mouseMove(event){
        if(!this.lastPoint)return;
        var offset=this.getOffset(event);
        this.moveFrames(offset);
      },
      submit(){
        var url=$('input.url').val();
        if(!url||!resizedFile)return;
        var fd=new FormData();
        fd.append('file',resizedFile);
        $.ajax({
            type:'POST',
            url:url,
            data:fd
        });
      },
      test(){
        // $.imageResizer=function(){
        //     (function(){
        //         resizer.frames.on('touchstart mousedown',function(event){
        //             getOffset(event);
        //         });

        //     })();
        //     return resizer;
        // };

      }
    },
    components: {
      popup,
    }
  }
</script>

<style lang="less">
  div.popup-body {
    // padding-top: 16px;
    padding-top: 10px;
    padding-bottom: 6px;
  }
  .container{
      width: 300px;
  }
  .resizer{
      overflow: hidden;
  }
  .resizer.have-img button.ok{
      display: inline-block;
  }
  .resizer.have-img .inner {
      display: block;
  }
  .inner{
      width: 100%;
      position: relative;
      font-size: 0;
      overflow: hidden;
      display: none;
  }
  img{
      width: 100%;
  }

  .frames{
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid black;
      cursor: move;
      outline: rgba(0, 0, 0, 0.6) solid 10000px;
  }
  button.ok{
      float:right;
      margin-left: 5px;
      display: none;
  }
  canvas{
      max-width: 100%;
      margin:auto;
      display: block;
  }

</style>
