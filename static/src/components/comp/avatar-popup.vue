<template lang="html">
  <popup class="avatar popup-wrapper" :show.sync="showAvatarPopup">
    <span slot="title">设置头像</span>
    <div class="popup-body" slot="body">
      <div>
        <div class="wrapper">
          <input type="file" accept="images/*" @change="inputChange" v-el:file>
          <button @click="$els.file.click()" v-show="!showCanvas && !haveImg">
            <em class="W_ficon ficon_add S_ficon">+</em>
            选择图片</button>
          <div class="container">
            <div class="resizer" :class="{'have-img': haveImg}">
              <div class="inner" v-el:inner>
                <img v-el:img ></img>
                <div class="frames" v-el:frames @mouseup="lastPoint=null" @mousedown="getOffset" @mousemove="mouseMove">
                </div>
              </div>
              <!-- <button class="ok" v-el:ok-button @click="clipImage">&#10003;</button> -->
              <canvas :width="canvasSize" :height="canvasSize" v-el:canvas v-if="showCanvas"></canvas>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="submit" @click="submit">确认</button>
          <button @click="showAvatarPopup=false">取消</button>
        </div>
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
        var width = this.$els.inner.offsetWidth,
            height = this.$els.inner.offsetHeight;
        this.offset={
            width: width,
            height: height
        };
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
            console.log(this);
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
        this.clipImage();
        setTimeout(()=>{
          var image = this.resizedImage;
          var fd = new FormData();
          fd.append('uploaded_file',image);
          this.$http.post('/avatar',fd)
            .then(()=>{
              window.location.reload();
            });
        },1000)

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
    padding-bottom: 0px;
  }
  .avatar.popup-wrapper {
    .popup-body {
      text-align: center;
      .wrapper {
        padding-bottom: 20px;
        button {
          padding: 0 10px;
        }
      }
    }
    .container{
        width: 300px;
        margin: 0 auto;
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
        // border: 1px solid black;
        cursor: move;
        outline: rgba(0, 0, 0, 0.6) solid 10000px;
    }
    canvas{
        max-width: 100%;
        margin:auto;
        display: block;
    }
    input[type=file]{
      display: none;
    }
    div.buttons {
      padding: 10px 0;
      background: #f2f2f5;
    }
    button {
      padding: 0;
      white-space: nowrap;
      display: inline-block;
      border-radius: 2px;
      line-height: 25px;
      text-decoration: none;
      font-size: 12px;
      min-width: 60px;
      text-align: center;
      outline: none;
      background: #FFF;
      border: 1px solid #d9d9d9;
      color: #333;
      box-shadow: 0px 1px 2px rgba(0,0,0,0.1);
      cursor: pointer;
      &:hover {
        border-color: #cccccc;
        box-shadow: 0px 1px 1px rgba(0,0,0,0.15);
      }
      em {
        color: #fa7d3c;
      }
      &.submit {
        background: #ff8140;
        border: 1px solid #f77c3d;
        color: #FFF;
        &:hover {
          background: #f7671d;
          border: 1px solid #f06923;
        }
      }
    }
  }


</style>
