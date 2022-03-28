var B="./wasm_game_of_life_bg.wasm";var eA=typeof TextDecoder>"u"?(0,module.require)("util").TextDecoder:TextDecoder,O=new eA("utf-8",{ignoreBOM:!0,fatal:!0});O.decode();var k=null;function tA(){return(k===null||k.buffer!==d.buffer)&&(k=new Uint8Array(d.buffer)),k}function rA(A,e){return O.decode(tA().subarray(A,A+e))}var u=class{static __wrap(e){let t=Object.create(u.prototype);return t.ptr=e,t}__destroy_into_raw(){let e=this.ptr;return this.ptr=0,e}free(){let e=this.__destroy_into_raw();$(e)}constructor(e,t){var r=M(e,t);return u.__wrap(r)}random(){C(this.ptr)}single_space_ship(e,t){R(this.ptr,e,t)}get as_ptr(){var e=D(this.ptr);return e}get cells_ptr(){var e=P(this.ptr);return e}get row_count(){var e=H(this.ptr);return e>>>0}get column_count(){var e=L(this.ptr);return e>>>0}tick(){S(this.ptr)}},l=class{static __wrap(e){let t=Object.create(l.prototype);return t.ptr=e,t}__destroy_into_raw(){let e=this.ptr;return this.ptr=0,e}free(){let e=this.__destroy_into_raw();T(e)}constructor(e,t,r,n,j){var i=N(e,t,r,n,j);return l.__wrap(i)}get width(){var e=W(this.ptr);return e>>>0}get height(){var e=J(this.ptr);return e>>>0}get data_ptr(){var e=U(this.ptr);return e}draw(){V(this.ptr)}};function G(){var A=Date.now();return A}function F(A,e){throw new Error(rA(A,e))}var nA={["./wasm_game_of_life_bg.js"]:{__wbg_now_c3277d0b8a8f625b:G,__wbindgen_throw:F}};async function aA(A,e){if(typeof A=="string"){let t=await fetch(A);if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(t,e)}catch(r){if(t.headers.get("Content-Type")!="application/wasm")console.warn(r);else throw r}A=await t.arrayBuffer()}return await WebAssembly.instantiate(A,e)}var{instance:a,module:_A}=await aA(B,nA),d=a.exports.memory,$=a.exports.__wbg_universe_free,M=a.exports.universe_new,C=a.exports.universe_random,R=a.exports.universe_single_space_ship,D=a.exports.universe_as_ptr,P=a.exports.universe_cells_ptr,H=a.exports.universe_row_count,L=a.exports.universe_column_count,S=a.exports.universe_tick,T=a.exports.__wbg_universecanvasdrawer_free,N=a.exports.universecanvasdrawer_new,W=a.exports.universecanvasdrawer_width,J=a.exports.universecanvasdrawer_height,U=a.exports.universecanvasdrawer_data_ptr,V=a.exports.universecanvasdrawer_draw;var c=document.body.appendChild(document.createElement("aside"));c.style.position="fixed";c.style.top="16px";c.style.left="16px";c.style.padding="4px";c.style.background="rgba(255,255,255,.8)";c.style.userSelect="none";var p=3,o=p+1,Z=[204,204,204],I=[255,255,255],y=[0,0,0],s=new u(800,800);s.random();var Q=([A,e,t])=>`rgb(${A},${e},${t})`,_=([A,e,t])=>(255<<24)+(t<<16)+(e<<8)+A,E=()=>{let A=document.querySelector("canvas");A&&(A.remove(),A.width=0,A.height=0)},sA=(()=>{let A=c.appendChild(document.createElement("div"));A.style.float="right",A.style.color="hsl(150,100%,50%)",A.style.textShadow="1px 1px 1px hsl(150,100%,20%)",A.style.fontVariantNumeric="tabular-nums",A.textContent="0 fps";let e=0,t=performance.now();return setInterval(()=>{let r=performance.now();A.textContent=`${Math.round(e*1e3/(r-t))} fps`,e=0,t=r},512),()=>e++})(),x=A=>{let e,t=()=>{A(),sA(),e=requestAnimationFrame(t)};return t(),{cancel:()=>e!==void 0&&cancelAnimationFrame(e)}},Y=A=>{let{row_count:e,column_count:t}=s,r=new Uint8Array(d.buffer,s.cells_ptr,e*t),n=0;for(let j=0;j<e;j++)for(let i=0;i<t;i++)A(j,i,r[n]),n++},z=A=>{let e=A.getImageData(0,0,A.canvas.width,A.canvas.height),t=new Int32Array(e.data.buffer),r=_(Z);for(let n=0;n<A.canvas.width;n+=o)for(let j=0;j<A.canvas.height;j++)t[j*A.canvas.width+n]=r;for(let n=0;n<A.canvas.height;n+=o)for(let j=0;j<A.canvas.width;j++)t[n*A.canvas.width+j]=r;A.putImageData(e,0,0)},oA=()=>{let A=document.body.appendChild(document.createElement("canvas"));A.width=o*s.column_count+1,A.height=o*s.row_count+1;let e=A.getContext("2d");z(e);let t=Q(I),r=Q(y),n=()=>{Y((j,i,h)=>{e.fillStyle=h?r:t,e.fillRect(i*o+1,j*o+1,p,p)})};return x(()=>{n(),s.tick()})},iA=()=>{let A=document.body.appendChild(document.createElement("canvas"));A.width=o*s.column_count+1,A.height=o*s.row_count+1;let e=A.getContext("2d");z(e);let t=e.getImageData(0,0,A.width,A.height),r=new Int32Array(t.data.buffer),n=(b,g,f,w,m)=>{let v=b+g*A.width;for(let K=0;K<w;K++){for(let q=0;q<f;q++)r[v+q]=m;v+=A.width}},j=_(I),i=_(y),h=()=>{Y((b,g,f)=>{let w=f?i:j,m=g*o+1,v=b*o+1;r[m+v*A.width]!==w&&n(m,v,p,p,w)}),e.putImageData(t,0,0)};return x(()=>{h(),s.tick()})},X=()=>{let A=new l(s.as_ptr,p,_(Z),_(I),_(y)),e=new ImageData(new Uint8ClampedArray(d.buffer,A.data_ptr,A.width*A.height*4),A.width,A.height),t=document.body.appendChild(document.createElement("canvas"));t.width=A.width,t.height=A.height;let r=t.getContext("2d");return x(()=>{A.draw(),r.putImageData(e,0,0),s.tick()})};{let{cancel:A}=X(),e=c.appendChild(document.createElement("div"));e.innerHTML=`
    <label style="cursor:pointer"><input type="radio" name="renderer">Stop</label><br>
    <label style="cursor:pointer"><input type="radio" name="renderer" value="canvas-api">fillRect (JS)</label><br>
    <label style="cursor:pointer"><input type="radio" name="renderer" value="image-data">putImageData (JS)</label><br>
    <label style="cursor:pointer"><input type="radio" name="renderer" value="wasm" checked>putImageData (WASM)</label><br>
  `,e.addEventListener("change",t=>{if(!(!(t.target instanceof HTMLInputElement)||t.target.name!=="renderer"))switch(A(),t.target.value){case"canvas-api":E(),{cancel:A}=oA();break;case"image-data":E(),{cancel:A}=iA();break;case"wasm":E(),{cancel:A}=X();break;default:A=()=>{};break}})}
