var x="./wasm_game_of_life_bg.wasm";var AA=typeof TextDecoder>"u"?(0,module.require)("util").TextDecoder:TextDecoder,I=new AA("utf-8",{ignoreBOM:!0,fatal:!0});I.decode();var m=null;function eA(){return(m===null||m.buffer!==_.buffer)&&(m=new Uint8Array(_.buffer)),m}function tA(e,A){return I.decode(eA().subarray(e,e+A))}var u=class{static __wrap(A){let t=Object.create(u.prototype);return t.ptr=A,t}__destroy_into_raw(){let A=this.ptr;return this.ptr=0,A}free(){let A=this.__destroy_into_raw();G(A)}constructor(A,t){var r=B(A,t);return u.__wrap(r)}random(){$(this.ptr)}single_space_ship(A,t){K(this.ptr,A,t)}get as_ptr(){var A=C(this.ptr);return A}get cells_ptr(){var A=D(this.ptr);return A}get row_count(){var A=L(this.ptr);return A>>>0}get column_count(){var A=H(this.ptr);return A>>>0}tick(){T(this.ptr)}},p=class{static __wrap(A){let t=Object.create(p.prototype);return t.ptr=A,t}__destroy_into_raw(){let A=this.ptr;return this.ptr=0,A}free(){let A=this.__destroy_into_raw();R(A)}constructor(A,t,r,j,n){var s=S(A,t,r,j,n);return p.__wrap(s)}get width(){var A=N(this.ptr);return A>>>0}get height(){var A=U(this.ptr);return A>>>0}get data_ptr(){var A=P(this.ptr);return A}draw_cells(A){W(this.ptr,A)}};function O(){var e=Date.now();return e}function F(e,A){throw new Error(tA(e,A))}var jA={["./wasm_game_of_life_bg.js"]:{__wbg_now_c3277d0b8a8f625b:O,__wbindgen_throw:F}};async function nA(e,A){if(typeof e=="string"){let t=await fetch(e);if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(t,A)}catch(r){if(t.headers.get("Content-Type")!="application/wasm")console.warn(r);else throw r}e=await t.arrayBuffer()}return await WebAssembly.instantiate(e,A)}var{instance:a,module:dA}=await nA(x,jA),_=a.exports.memory,G=a.exports.__wbg_universe_free,B=a.exports.universe_new,$=a.exports.universe_random,K=a.exports.universe_single_space_ship,C=a.exports.universe_as_ptr,D=a.exports.universe_cells_ptr,L=a.exports.universe_row_count,H=a.exports.universe_column_count,T=a.exports.universe_tick,R=a.exports.__wbg_universecanvasdrawer_free,S=a.exports.universecanvasdrawer_new,N=a.exports.universecanvasdrawer_width,U=a.exports.universecanvasdrawer_height,P=a.exports.universecanvasdrawer_data_ptr,W=a.exports.universecanvasdrawer_draw_cells;var i=document.body.appendChild(document.createElement("aside"));i.style.position="fixed";i.style.top="16px";i.style.right="16px";i.style.padding="4px";i.style.background="rgba(255,255,255,.8)";i.style.whiteSpace="nowrap";i.style.userSelect="none";var v=3,o=v+1,Q=[204,204,204],q=[255,255,255],E=[0,0,0],J=([e,A,t])=>`rgb(${e},${A},${t})`,w=([e,A,t])=>(255<<24)+(t<<16)+(A<<8)+e,aA=(()=>{let e=i.appendChild(document.createElement("div"));e.style.float="right",e.style.color="hsl(150,100%,50%)",e.style.textShadow="1px 1px 1px hsl(150,100%,20%)",e.style.fontVariantNumeric="tabular-nums",e.textContent="0 fps";let A=0,t=performance.now();return setInterval(()=>{let r=performance.now();e.textContent=`${Math.round(A*1e3/(r-t))} fps`,A=0,t=r},512),()=>A++})(),f=e=>{let A,t=()=>{e(),aA(),A=requestAnimationFrame(t)};return t(),{stop:()=>A!==void 0&&cancelAnimationFrame(A)}},b=(e,A,t)=>{let{row_count:r,column_count:j}=e,n=new Uint8Array(_.buffer,e.cells_ptr,r*j),s=0;for(let l=0;l<r;l++)for(let c=0;c<j;c++){let d=n[s];(!t||d&2)&&A(l,c,d&1),s++}},Z=e=>{let A=e.getImageData(0,0,e.canvas.width,e.canvas.height),t=new Int32Array(A.data.buffer),r=w(Q);for(let j=0;j<e.canvas.width;j+=o)for(let n=0;n<e.canvas.height;n++)t[n*e.canvas.width+j]=r;for(let j=0;j<e.canvas.height;j+=o)for(let n=0;n<e.canvas.width;n++)t[j*e.canvas.width+n]=r;e.putImageData(A,0,0)},sA=(e,A)=>{e.width=o*A.column_count+1,e.height=o*A.row_count+1;let t=e.getContext("2d");Z(t);let r=J(q),j=J(E),n=(s,l,c)=>{t.fillStyle=c?j:r,t.fillRect(l*o+1,s*o+1,v,v)};return b(A,n),f(()=>{A.tick(),b(A,n,!0)})},oA=(e,A)=>{e.width=o*A.column_count+1,e.height=o*A.row_count+1;let t=e.getContext("2d");Z(t);let r=t.getImageData(0,0,e.width,e.height),j=new Int32Array(r.data.buffer),n=(d,k,h,z,Y)=>{let y=d+k*e.width;for(let M=0;M<z;M++){for(let g=0;g<h;g++)j[y+g]=Y;y+=e.width}},s=w(q),l=w(E),c=(d,k,h)=>{n(k*o+1,d*o+1,v,v,h?l:s)};return b(A,c),f(()=>{t.putImageData(r,0,0),A.tick(),b(A,c,!0)})},V=(e,A)=>{let t=new p(A.as_ptr,v,w(Q),w(q),w(E)),r=new ImageData(new Uint8ClampedArray(_.buffer,t.data_ptr,t.width*t.height*4),t.width,t.height);e.width=t.width,e.height=t.height;let j=e.getContext("2d");return t.draw_cells(!1),f(()=>{j.putImageData(r,0,0),A.tick(),t.draw_cells(!0)})};{let e=document.body.appendChild(document.createElement("canvas")),A=new u(200,200);A.random();let{stop:t}=V(e,A),r=()=>(e.remove(),e.width=0,e.height=0,e=document.body.appendChild(document.createElement("canvas"))),j=i.appendChild(document.createElement("div"));j.innerHTML=`
    <fieldset>
      <legend style="padding:0 8px">Renderer</legend>
      <label style="cursor:pointer"><input type="radio" name="renderer">Stop</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="canvas-api">fillRect (JS)</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="image-data">putImageData (JS)</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="wasm" checked>putImageData (WASM)</label><br>
    </fieldset>
    <fieldset>
      <legend style="padding:0 8px">Vastness</legend>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="200" checked>200x200</label><br>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="400">400x400</label><br>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="600">600x600</label><br>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="800">800x800</label><br>
    </fieldset>
  `,j.addEventListener("change",n=>{if(n.target instanceof HTMLInputElement){if(t(),n.target.name==="vastness"){let s=+n.target.value;A=new u(s,s),A.random()}switch(j.querySelector("[name=renderer]:checked").value){case"canvas-api":({stop:t}=sA(r(),A));break;case"image-data":({stop:t}=oA(r(),A));break;case"wasm":({stop:t}=V(r(),A));break;default:t=()=>{};break}}})}
