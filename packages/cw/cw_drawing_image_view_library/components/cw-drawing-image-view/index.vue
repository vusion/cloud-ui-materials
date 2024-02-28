<template>
  <div class="drawing2d-main" v-bind="[$attrs, $props]">
    <div class="drawing2d-header" v-if="mode==='dev'">
      <el-button @click="handleSubmit" type="primary" style="width:84px">保存</el-button>
      <el-button @click="handleToImg" type="primary" style="width:84px">生成图片</el-button>
    </div>
    <div class="drawing2d-body">
        <div class="drawing2d-aside">
          <div>
             <h1>基础图形</h1>
             <div class="drawing2d-aside-room">
              <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:1},$event)">
                 <div style=" pointer-events: none;">
                    <img src="../../assets/1.png" alt="">
                    <p>文字</p>
                </div>
              </div>
               <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:2},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/2.png" alt="">
                  <p>矩形</p>
                </div>
              </div>
               <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:4},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/7.png" alt="">
                  <p>三角形</p>
                </div>
              </div>
              <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:5},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/11.png" alt="">
                  <p>梯形</p>
                </div>
              </div>
              <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:6},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/6.png" alt="">
                  <p>圆形</p>
                </div>
              </div>
              <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:7},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/12.png" alt="">
                  <p>平行四边</p>
                </div>
              </div>
               <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:8},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/16.png" alt="">
                  <p>直三角</p>
                </div>
              </div>
              <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:9},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/10.png" alt="">
                  <p>四边形</p>
                </div>
              </div>
               <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:10},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/9.png" alt="">
                  <p>T字形</p>
                </div>
              </div>
              <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:11},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/8.png" alt="">
                  <p>L字形</p>
                </div>
              </div>
              <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:12},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/13.png" alt="">
                  <p>飞镖形</p>
                </div>
              </div>
              <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:15},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/14.png" alt="">
                  <p>半圆弧形</p>
                </div>
              </div>
               <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:14},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/15.png" alt="">
                  <p>虚线</p>
                </div>
              </div>
               <div class="drawing2d-aside-cell" draggable="true" @dragstart="handleDrag({type:13},$event)">
                <div style=" pointer-events: none;">
                  <img src="../../assets/17.png" alt="">
                  <p>实线</p>
                </div>
              </div>
             </div>
          </div>
          <div style="margin-top:8px">
             <h1>小部件</h1>
             <div class="drawing2d-aside-room">
              <div class="drawing2d-aside-cell" draggable="true" v-for="(item,idx) in comData" :key="idx" @dragstart="handleDrag(item,$event)">
                <div style=" pointer-events: none;">
                  <img :src="item.img" alt="">
                  <p>{{item.title}}</p>
                </div>
              </div>
             </div>
          </div>
        </div>
        <div class="drawing2d-canvas-body">
          <canvas id="canvas"></canvas>
        </div>
        <div class="drawing2d-right">
          <div class="drawing2d-right-title">
            {{typeMap[selectedObj.type]||"画布"}}
          </div>
          <div class="drawing2d-right-body">
            <div class="drawing2d-right-body-cell" v-if="!selectedObj.type">
              <div class="drawing2d-input-room">
                <div class="drawing2d-input-room-cell" style="margin-top:10px">
                  <span>背景</span>
                  <div class="drawing2d-bg-room" :class="bgImg?'active':''">
                    <img class="drawing2d-bg-img" :src="bgImg" alt="" v-if="bgImg">
                    <img @click="handleBgClose" class="drawing2d-bg-close" src="../../assets/close.png" alt="">
                  </div>
                  <el-button style="width:102px;position:relative;" >
                    {{ bgImg ? '重新选择' : '选择图片'}} 
                      <input accept="image/*,application/pdf" @change="handleUploadImg" class="drawing2d-upload" palceholder="请输入" type="file" ></input>
                  </el-button>
                </div>
              </div>
            </div>

            <div class="drawing2d-right-body-cell" v-if="['rect','polygon','triangle','circle','path','polyline'].includes(selectedObj.type)">
              <h3>图形</h3>
              <div class="drawing2d-input-room">
                <!-- <div class="drawing2d-input-room-cell">
                  <span>高度</span>
                  <el-input palceholder="请输入"  v-model="selectedObj.height"  @change="handleTextHeightChange" ></el-input>
                </div>
                 <div class="drawing2d-input-room-cell">
                  <span>宽度</span>
                  <el-input palceholder="请输入"  v-model="selectedObj.width" @change="handleTextWidthChange" ></el-input>
                </div> -->
                 <div class="drawing2d-input-room-cell">
                  <span>边框颜色</span>
                   <el-color-picker :value="selectedObj.stroke" @change="handleBorderColorChange" ></el-color-picker>
                   <el-input style="margin-left:8px" readOnly palceholder="请输入" :value="selectedObj.stroke"  @change="handleBorderColorChange"></el-input>
                </div>
                 <div class="drawing2d-input-room-cell" v-if="selectedObj.type!=='polyline'">
                  <span>背景颜色</span>
                   <el-color-picker :value="selectedObj.fill" @change="handleRectBgColorChange" ></el-color-picker>
                  <el-input style="margin-left:8px" readOnly :value="selectedObj.fill" @change="handleRectBgColorChange"  palceholder="请输入" ></el-input>
                </div>
              </div>
            </div>
            <div class="drawing2d-right-body-cell" v-if="selectedObj.type==='textbox'">
              <h3>文本</h3>
              <div class="drawing2d-input-room">
                <div class="drawing2d-input-room-cell">
                  <el-input v-model="selectedObj.text" @change="handleTextChange" palceholder="请输入" ></el-input>
                </div>
                 <div class="drawing2d-input-room-cell">
                  <span>文字颜色</span>
                  <el-color-picker :value="selectedObj.fill" @change="handleTextColorChange" ></el-color-picker>
                  <el-input style="margin-left:8px" readOnly :value="selectedObj.fill"    palceholder="请输入" ></el-input>
                </div>
              </div>
            </div>
             <!-- <div class="drawing2d-right-body-cell" v-if="selectedObj.type==='image'">
              <div class="drawing2d-input-room-cell">
                  <span>高度</span>
                  <el-input palceholder="请输入"  v-model="selectedObj.height"  @change="handleTextHeightChange" ></el-input>
                </div>
                 <div class="drawing2d-input-room-cell">
                  <span>宽度</span>
                  <el-input palceholder="请输入"  v-model="selectedObj.width" @change="handleTextWidthChange" ></el-input>
                </div>
            </div> -->
            <div class="drawing2d-right-body-cell">
              <h3>操作</h3>
              <div class="drawing2d-action-room">
                <el-button :disabled="selectedList.length<2" class="btn" type="primary" @click="handleGroup" >组合</el-button>
                <el-button :disabled="!(selectedList.length === 1&&selectedList[0].type==='group')"  @click="handleSplit" class="btn" type="primary" >拆分</el-button>
                <el-button :disabled="selectedList.length<1"  @click="handleClone" class="btn" type="primary" >复制</el-button>
                <el-button :disabled="selectedList.length<1" @click="handleBindData" class="btn" type="primary" >绑定数据</el-button>
                <el-button :disabled="selectedList.length<1" class="btn" @click="handleTop" >层级上移</el-button>
                <el-button :disabled="selectedList.length<1" class="btn" type="danger" @click="handleDelete" >删除</el-button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import { fabric } from 'fabric'
import  ColorPicker from 'element-ui/lib/color-picker'
import Button from 'element-ui/lib/button'
import Input  from 'element-ui/lib/input'
import 'element-ui/lib/theme-chalk/color-picker.css'
import 'element-ui/lib/theme-chalk/button.css'
import 'element-ui/lib/theme-chalk/input.css'
Vue.prototype.$ELEMENT = { size: 'small' }

Vue.use(ColorPicker)
Vue.use(Button)
Vue.use(Input)

let canvas = null
export default {
    name:"cw-drawing-image-view",
    props:{
      value:{
        type:String,
      },
      comData:{
        type:Array,
        default:()=>[]
      },
      mode:{
        type:String,
        default:"prod"
      }
    },
    data(){
      return {
        bgImg:"",
        selectedList:[],
        typeMap:{
          rect:"矩形",
          iText:"文本",
          image:"自定义"
        }
      }
    },
    async created(){
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.8.162/pdf.min.js')
    },
     mounted(){
      this.init();
      this.initCanvas()
    },
    computed:{
      getcanvasJson(){
        return JSON.stringify(canvas.toJSON(['_id']))
      },
      selectedObj(){
        return  this.selectedList.length === 1 ? this.selectedList[0] : {}
      }
    },
    watch:{
      value(val){
        console.log(val);
        this.initCanvas()
      }
    },
    
    methods:{
       loadScript(url) {
        return new Promise((resolve,reject) => {
              let script = document.createElement('script');
              script.src = url;
              document.body.appendChild(script);
              script.onload = () => {
                resolve(true)
                console.log('jspdf加载完成');
              }
              script.onerror = () => {
                reject(false)
              }
          })
      
        },
      initCanvas(){
        let value = null
        if(this.mode==="dev"){
           value = localStorage.getItem("canvasData")
        }else{
           value = this.value? JSON.parse(this.value):null
        }
        if(value){
          canvas.loadFromJSON(value,()=>{
            canvas.renderAll()
          })
        }
       
      },
         getNewId(){
          return Math.random().toString(36).substr(2)
        },
      init(){
        document.addEventListener("keydown", (e) => {
          if(e.keyCode===18){
            canvas.defaultCursor = "grab"
          }
          const objs = canvas.getActiveObjects()
           if(objs.length){
                if(e.keyCode === 40){
                  objs.forEach(item=>{item.top = item.top + 1})
                  e.preventDefault();
                }else if(e.keyCode === 38){
                  objs.forEach(item=>{item.top = item.top - 1})
                  e.preventDefault();
                }else if(e.keyCode === 37){
                  objs.forEach(item=>{item.left = item.left -1})
                  e.preventDefault();
                }else if(e.keyCode === 39){
                  objs.forEach(item=>{item.left = item.left +1})
                  e.preventDefault();
                }
                canvas.requestRenderAll()
            }else{
              
            }
        });
        document.addEventListener("keyup", (e) => {
          if(e.keyCode===18){
            canvas.defaultCursor = "default"
          }
        });
        console.log(fabric);
          canvas = new fabric.Canvas('canvas',{
            // selectionLineWidth: 1,
            // backgroundColor:"#ccc"
            // selectionBorderColor: '#4CAF50',
            // selectionColor: '#4CAF5040',
            // freeDrawingBrush: new fabric.PencilBrush({ decimate: 8 }),
          });
          const bd  =  document.querySelector(".drawing2d-canvas-body")
          canvas.allowTouchScrolling = true
          canvas.setWidth( bd.clientWidth -32)
          canvas.setHeight( bd.clientHeight -32)
          this.canvas = canvas

          canvas.on('mouse:wheel', function(opt) {
            var delta = opt.e.deltaY;
            var pointer = canvas.getPointer(opt.e);
            var zoom = canvas.getZoom();
            zoom = zoom + delta/2000;
            if (zoom > 4) zoom = 4;
            if (zoom < 0.1) zoom = 0.1;
            canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
          });


          canvas.on('selection:created', (e) => {
              canvas.getActiveObject().cornerSize = 6
              this.selectedList =  e.selected
          })
          canvas.on('selection:updated', (e) => {
            if(e.selected.length===1&& e.selected[0].group){
              // console.log( e.selected[0],222);
              this.selectedList =  e.selected[0].group._objects
            }else{
              this.selectedList =  e.selected
            } 
          })
            canvas.on('selection:cleared', (e) => {
              console.log(e);
              this.selectedList = []
          })

           // 按下鼠标事件
            canvas.on('mouse:down', function (opt) {
              var evt = opt.e;
              if (evt.altKey === true) {
                this.isDragging = true
                this.lastPosX = evt.clientX
                this.lastPosY = evt.clientY
              }
            })

             // 移动鼠标事件
              canvas.on('mouse:move', function (opt) {
                if (this.isDragging) {
                  var e = opt.e;
                  var vpt = this.viewportTransform;
                  vpt[4] += e.clientX - this.lastPosX
                  vpt[5] += e.clientY - this.lastPosY
                  this.requestRenderAll()
                  this.lastPosX = e.clientX
                  this.lastPosY = e.clientY
                }
              })

            // 松开鼠标事件
              canvas.on('mouse:up', function (opt) {
                this.setViewportTransform(this.viewportTransform)
                this.isDragging = false
              })
          /* 拖拽事件 */
          var that = this
          canvas.on('drop',function(opt){
          
            let offset = {
              left: canvas.getSelectionElement().getBoundingClientRect().left,
              top: canvas.getSelectionElement().getBoundingClientRect().top
            }

            // 鼠标坐标转换成画布的坐标（未经过缩放和平移的坐标）
            let point = {
              x: opt.e.x - offset.left,
              y: opt.e.y - offset.top,
            }

            // 转换后的坐标，restorePointerVpt 不受视窗变换的影响
            let pointerVpt = canvas.restorePointerVpt(point)

            const de =  opt.e.dataTransfer.getData('text/plain');
            const data = JSON.parse(de)
            const _id = that.getNewId()
            if(data.type === 1){
              const rect2 = new fabric.Textbox("请输入文字",{ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                fontSize: 14,
                cornerSize: 6,
                width: 80,
                statefullCache: true,
                splitByGrapheme:true,
                _id
              }); 
              canvas.add(rect2);
            }
            if(data.type === 2){
              const rect2 = new fabric.Rect({ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                fill: '#A4C5FF', 
                width: 40, 
                height: 40,
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                _id
              }); 
              canvas.add(rect2);
            }
            if(data.type === 3){
              new fabric.Image.fromURL(data.img,(img)=>{
                img.scaleToWidth(32);
                img.scaleToHeight(32);
                img.cornerSize = 6
                img.left =pointerVpt.x,
                img.top = pointerVpt.y,
                canvas.add(img);
                img._id = _id
              })
            }
            /* 三角形 */
            if(data.type === 4){
              const rect2 = new fabric.Triangle({ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                fill: '#A4C5FF', 
                width: 40, 
                height: 40,
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                _id
              }); 
              canvas.add(rect2);
            }

            /* 圆形 */
            if(data.type === 6){
              const rect2 = new fabric.Circle({ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                fill: '#A4C5FF', 
                radius:20,
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                _id
              }); 
              canvas.add(rect2);
            }
            /* 梯形 */
            if(data.type === 5){
              const points = [
                { x: 0, y: 0 },
                { x: 40, y: 0 },
                { x: 60, y: 40 },
                { x: -20, y: 40 }
              ]
              const rect2 = new fabric.Polygon(points,{ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                fill: '#A4C5FF', 
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                _id
              }); 
              canvas.add(rect2);
            }
            /* 平行四边形 */
            if(data.type === 7){
              const points = [
                {x: 0, y: 0},
                {x: 40, y: 0},
                {x: 60, y: 40},
                {x: 20, y: 40}
              ]
              const rect2 = new fabric.Polygon(points,{ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                fill: '#A4C5FF', 
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                _id
              }); 
              canvas.add(rect2);
            }

            /* 平行四边形 */
            if(data.type === 9){
              const points = [
                {x: 0, y: 0},
                {x: 30, y: 15},
                {x: 40, y: 40},
                {x: 0, y: 40}
              ]
              const rect2 = new fabric.Polygon(points,{ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                fill: '#A4C5FF', 
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                _id
              }); 
              canvas.add(rect2);
            }
            /* 直三角 */
            if(data.type === 8){
              const points = [
                {x: 0, y: 0},
                {x: 0, y: 40},
                {x: 30, y: 40}
              ]
              const rect2 = new fabric.Polygon(points,{ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                fill: '#A4C5FF', 
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                _id
              }); 
              canvas.add(rect2);
            }
            /* T字形 */
            if(data.type === 10){
              const points = [
                {x: 0, y: 0},
                {x: 40, y: 0},
                {x: 40, y: 15},
                {x: 27, y: 15},
                {x: 27, y: 40},
                {x: 13, y: 40},
                {x: 13, y: 15},
                {x: 0, y: 15}
              ]
              const rect2 = new fabric.Polygon(points,{ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                fill: '#A4C5FF', 
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                _id
              }); 
              canvas.add(rect2);
            }
            /* L字形 */
            if(data.type === 11){
              const points = [
                {x: 0, y: 0},
                {x: 20, y: 0},
                {x: 20, y: 20},
                {x: 40, y: 20},
                {x: 40, y: 40},
                {x: 0, y: 40},
              ]
              const rect2 = new fabric.Polygon(points,{ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                fill: '#A4C5FF', 
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                _id
              }); 
              canvas.add(rect2);
            }
             /* 飞镖形 */
            if(data.type === 12){
              const points = [
                {x: 0, y: 0},
                {x: 10, y: 10},
                {x: 10, y: 20},
                {x: 20, y: 20},
                {x: 30, y: 30},
                {x: 0, y: 30},
              ]
              const rect2 = new fabric.Polygon(points,{ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                fill: '#A4C5FF', 
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                _id
              }); 
              canvas.add(rect2);
            }
             /* 实线 */
            if(data.type === 13){
              const points = [
                {x: 0, y: 0},
                {x: 100, y: 0},
              ]
              const rect2 = new fabric.Polyline(points,{ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                stroke: '#A4C5FF',
                height: 40,
                padding:6,
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                _id
              }); 
              canvas.add(rect2);
            }
              /* 虚线 */
            if(data.type === 14){
              const points = [
                {x: 0, y: 0},
                {x: 100, y: 0},
              ]
              const rect2 = new fabric.Polyline(points,{ 
                left:pointerVpt.x,
                top:pointerVpt.y,
                stroke: '#A4C5FF',
                height: 40,
                padding:6,
                strokeDashArray:[2,2],
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                _id
              }); 
              canvas.add(rect2);
            }
              /* 拱形 */
            if(data.type === 15){
              const path = new fabric.Path('M0 0 A40 40 0 0 1 0 80 L0 60 A20 20 0 0 0 0 20 L0 0', { 
                left:pointerVpt.x,
                top:pointerVpt.y,
                fill: '#A4C5FF', 
                lockUniScaling:false,
                cornerSize: 6,
                statefullCache: true,
                originX: 'center',
                originY: 'center',
                angle:-90,
                _id
              });
              canvas.add(path);
              // const rect2 = new fabric.Rect({ 
              //  left:pointerVpt.x,
              //   top:pointerVpt.y,
              //   fill: '#A4C5FF', 
              //   width: 40, 
              //   height: 80,
              //   // lockUniScaling:false,
              //   clipPath: path,
              //   cornerSize: 6,
              //   // statefullCache: true,
              //   _id
              // }); 
              // canvas.add(rect2);
            }
          })
          
     },
      handleDelete(){
        canvas.getActiveObjects().forEach(item=>{
            canvas.remove(item);
        })
        canvas.discardActiveObject()
      },
      handleClone(){
          const _clipboard = canvas.getActiveObject()
          _clipboard.clone((clonedObj) => {
            clonedObj.set({
              left: clonedObj.left + 10,
              top: clonedObj.top + 10,
              evented: true,
              _id:this.getNewId()
            });
            if(_clipboard.type ==="activeSelection"){
              clonedObj.canvas = canvas
              clonedObj.forEachObject(function(obj) {
                canvas.add({obj, _id:this.getNewId()})
              })
            }else{
              canvas.add(clonedObj);
            }
            canvas.setActiveObject(clonedObj);
          })
      },
      handleGroup(){
        if(canvas.getActiveObject().type === "activeSelection"){
         const a = canvas.getActiveObject().toGroup()
         a.cornerSize = 6
         this.selectedList = [a]
        }
      },
      handleSplit(){
         if(canvas.getActiveObject().type === "group"){
           const a =  canvas.getActiveObject().toActiveSelection()
           a.cornerSize = 6
           this.selectedList = a._objects
         }
      }, 
      handleDrag(item,e){
        e.dataTransfer.setData('text/plain', JSON.stringify(item));
      },
      async handleUploadImg(e){
        const a =  e.target.files[0]
        console.log(a);
        let base64Data = null
        if( a.type == "application/pdf") {
          const pdf = await pdfjsLib.getDocument(URL.createObjectURL(a)).promise
          const page = await pdf.getPage(1)
          const viewport = page.getViewport({ scale: 1 })
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          const context = canvas.getContext('2d')
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          }
          await page.render(renderContext).promise
          base64Data =  canvas.toDataURL("image/png",1)
          // fabric.Image.fromURL(base64Data,(img)=>{
          //   img.scaleToWidth(canvas.width);
          //   img.scaleToHeight(canvas.height);
          //   canvas.setBackgroundImage(img,canvas.renderAll.bind(canvas),{
          //     opacity: 0.5,
          //     scaleX: canvas.width / img.width,
          //     scaleY: canvas.width / img.width,
          //   })
          // })
          // this.bgImg = base64Data
          // return
        }else{
         this.bgImg = URL.createObjectURL(a)
         base64Data =  await this.getImgToBase64(this.bgImg)
        }

        fabric.Image.fromURL(base64Data,(img)=>{
          img.scaleToWidth(canvas.width);
          img.scaleToHeight(canvas.height);
          canvas.setBackgroundImage(img,canvas.renderAll.bind(canvas),{
            opacity: 0.5,
            originX: 'center',
            originY: 'center',
            left: canvas.width/2,
            top: canvas.height/2,
            // scaleX: canvas.width / img.width,
            // scaleY: canvas.width / img.width,
          })
        })
      },
     async getImgToBase64(url){
       return new Promise((resolve,reject)=>{
          const _img = new Image();
          _img.src = url
          _img.onload = function () {
            const canvas = document.createElement('canvas')
            canvas.width = _img.width;
            canvas.height = _img.height;
            var context = canvas.getContext('2d');
            context.drawImage(_img, 0, 0, canvas.width, canvas.height); 
            var base64Data = canvas.toDataURL("image/png",1)
            resolve(base64Data)
          }
          _img.onerror = function () {
              reject(new Error('Could not load image at ' + url));
          }
        })
      },
      handleToImg(){
        // const url = canvas.toDataURL({
        //   format: 'png',
        // })
        // let el =  document.createElement("a")
        // el.href = url
        // el.download =true
        // el.click()
        // el = null
       return canvas.toDataURL({
          format: 'png',
        })
      },
      handleBgClose(){
        canvas.setBackgroundImage(null,canvas.renderAll.bind(canvas))
        const el = document.querySelector(".drawing2d-upload")
        el.value = null
        this.bgImg = ""
      },
      handleSubmit(){
        if(this.mode==="dev"){
          localStorage.setItem("canvasData",JSON.stringify(canvas.toJSON(['_id'])))
        }else{
         
          this.$emit("onSave",JSON.stringify(canvas.toJSON(['_id'])))
        }
      },
      handleBindData(){
        this.$emit("onBindData",this.selectedObj)
          console.log(this.selectedObj);
          // this.handleSetColor({
          //     textColor:"red",
          //     bgColor:"blue"
          // })
      },
      handleTop(){
        canvas.getActiveObjects().forEach(item=>{
          canvas.bringToFront(item)
        })
        console.log(this.selectedObj);
      },
      handleTextChange(e){
        this.selectedObj.text = e
        canvas.renderAll()
      },
      handleTextColorChange(e){
        console.log(e,12);
        this.selectedObj.set("fill",e)
        console.log(this.selectedObj);
        canvas.renderAll()
      },
      handleBorderColorChange(e){
        this.selectedObj.set("stroke",e)
        canvas.renderAll()
      },
      handleRectBgColorChange(e){
        console.log(e)
        this.selectedObj.set("fill",e)
        canvas.renderAll()
      },
      handleSetColor(data){
        const objects =  this.selectedObj.getObjects()
        objects.forEach(item=>{
          if(item.type == "rect" ){
              item.set("fill",data.bgColor)
          }else{
              item.set("fill",data.textColor)
          }
        })
        console.log(objects);
        canvas.renderAll()
      },
      getCanvasPointer(ev){
        let canvasBoundaries = canvas.calcViewportBoundaries()
        let obj = ev.target
        let objBoundingRect = obj.getBoundingRect()
        if (objBoundingRect.left < canvasBoundaries.tl.x) {
          ev.target.left = canvasBoundaries.tl.x
        }

        // 【公式2】
        if (objBoundingRect.left + objBoundingRect.width > canvasBoundaries.br.x) {
          ev.target.left = canvasBoundaries.br.x - objBoundingRect.width
        }

        // 【公式3】
        if (objBoundingRect.top < canvasBoundaries.tl.y) {
          ev.target.top = canvasBoundaries.tl.y
        }

        // 【公式4】
        if (objBoundingRect.top + objBoundingRect.height > canvasBoundaries.br.y) {
          ev.target.top = canvasBoundaries.br.y - objBoundingRect.height
        }
        return ev.target
      },
    
    }
}
</script>

<style>


.drawing2d-main{
  display: flex;
  flex-direction:column;
}
.drawing2d-main:first-child{
  flex-direction:column;
  display: flex;
  height: 100%;
  width: 100%;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.2);
  min-height: 600px;
}

.drawing2d-body{
  display: flex;
  flex:1
}
.drawing2d-canvas-body{
  padding: 16px;
  flex:1;
}

.drawing2d-aside{
  width: 168px;
  padding: 9px 16px ;
  flex-shrink: 0;
  /* border-top: 1px solid rgba(0,0,0,0.1); */
   border-right: 1px solid rgba(0,0,0,0.1);
}
.drawing2d-aside h1{
  font-size: 14px;
  font-weight: 500;
  color: #333333;
}

.drawing2d-right{
  width: 240px;
  border-left: 1px solid rgba(0,0,0,0.1);
  /* padding: 9px 16px; */
}

.drawing2d-header{
  display: flex;
  align-items: center;
  box-shadow: 0 1px 0 1px #cccccc41;
  justify-content:flex-end;
  height: 48px;
  width: 100%;
  padding: 0 16px;
}

.drawing2d-aside-room{
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
 
  /* align-items: center; */
  /* display: flex;
  flex */
}
.drawing2d-aside-cell div{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}
.drawing2d-aside-cell img{
  width:32px;
  height: 32px;
}

.drawing2d-aside-room p{
  text-align: center;
  margin: 0;
}

.drawing2d-right-title{
  height: 40px;
  color: #333333;
  font-weight: 500;
  font-size: 14px;
  border-bottom:1px solid #EDEDED ;
  line-height: 40px;
  padding-left: 16px;
}
.drawing2d-right-body{
  padding: 0px 16px;
 
}
.drawing2d-right-body-cell{
  padding-bottom: 10px;
   border-bottom: 1px solid #EDEDED;
}
h3{
    font-size: 14px;
   height: 40px;
   font-weight: 500;
   line-height: 40px;
   margin: 0;
}

.drawing2d-action-room .el-button+.el-button{
  margin-left: 0px;
}

.drawing2d-action-room{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 8px;
  grid-column-gap: 8px;
}
.drawing2d-input-room-cell{
  display: flex;
  height: 40px;
  align-items: center;
}
.drawing2d-input-room-cell>span{
  width: 64px;
  flex-shrink:0;
}

#canvas{
 border: 1px solid #ccc;
}

.drawing2d-upload{
  opacity: 0;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100%;
}

.drawing2d-bg-room{
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  flex-shrink: 0;
  position: relative;
}

.drawing2d-bg-room .drawing2d-bg-img{
  width: 100%;
  height: 100%;
}

.drawing2d-bg-room.active:hover .drawing2d-bg-close{
  display: block;
}

.drawing2d-bg-close{
  display: none;
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 14px;
  height: 14px;
  cursor: pointer;
}

.el-color-picker__color{
  border: 0px;
}
</style>