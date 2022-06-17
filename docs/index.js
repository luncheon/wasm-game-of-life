var T="./wasm_game_of_life_bg.wasm";var J=typeof TextDecoder>"u"?(0,module.require)("util").TextDecoder:TextDecoder,k=new J("utf-8",{ignoreBOM:!0,fatal:!0});k.decode();var x=null;function Q(){return(x===null||x.buffer!==b.buffer)&&(x=new Uint8Array(b.buffer)),x}function ee(e,r){return k.decode(Q().subarray(e,e+r))}var h=class{static __wrap(r){let n=Object.create(h.prototype);return n.ptr=r,n}__destroy_into_raw(){let r=this.ptr;return this.ptr=0,r}free(){let r=this.__destroy_into_raw();M(r)}constructor(r,n){let o=U(r,n);return h.__wrap(o)}random(){F(this.ptr)}get asPtr(){return O(this.ptr)}get cellsPtr(){return $(this.ptr)}get rowCount(){return B(this.ptr)>>>0}get columnCount(){return N(this.ptr)>>>0}setCellAlive(r,n,o){z(this.ptr,r,n,o)}tick(){G(this.ptr)}};function D(){return Date.now()}function P(e,r){throw new Error(ee(e,r))}var re={["./wasm_game_of_life_bg.js"]:{__wbg_now_c3277d0b8a8f625b:D,__wbindgen_throw:P}};async function ne(e,r){if(typeof e=="string"){let n=await fetch(e);if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(n,r)}catch(o){if(n.headers.get("Content-Type")!="application/wasm")console.warn(o);else throw o}e=await n.arrayBuffer()}return await WebAssembly.instantiate(e,r)}var{instance:p,module:pe}=await ne(T,re),b=p.exports.memory,M=p.exports.__wbg_universe_free,U=p.exports.universe_new,F=p.exports.universe_random,O=p.exports.universe_asPtr,$=p.exports.universe_cellsPtr,B=p.exports.universe_rowCount,N=p.exports.universe_columnCount,z=p.exports.universe_setCellAlive,G=p.exports.universe_tick;var w=document.body.appendChild(document.createElement("aside"));w.style.position="fixed";w.style.top="16px";w.style.right="16px";w.style.padding="4px";w.style.background="rgba(255,255,255,.8)";w.style.whiteSpace="nowrap";w.style.userSelect="none";var v=3,m=v+1,q=[204,204,204],E=[255,255,255],j=[0,0,0],X=([e,r,n])=>`rgb(${e},${r},${n})`,R=([e,r,n])=>(255<<24)+(n<<16)+(r<<8)+e,oe=(()=>{let e=w.appendChild(document.createElement("div"));e.style.float="right",e.style.color="hsl(150,100%,50%)",e.style.textShadow="1px 1px 1px hsl(150,100%,20%)",e.style.fontVariantNumeric="tabular-nums",e.textContent="0 fps";let r=0,n=performance.now();return setInterval(()=>{let o=performance.now();e.textContent=`${Math.round(r*1e3/(o-n))} fps`,r=0,n=o},512),()=>r++})(),ie=e=>{let r,n=()=>{e(),oe(),r=requestAnimationFrame(n)};return n(),{stop:()=>r!==void 0&&cancelAnimationFrame(r)}},I=(e,r,n)=>{let{rowCount:o,columnCount:i}=e,t=new Uint8Array(b.buffer,e.cellsPtr,o*i),a=0;for(let s=0;s<o;s++)for(let l=0;l<i;l++){let d=t[a];(!n||d&2)&&r(s,l,d&1),a++}},H=e=>{let r=e.getImageData(0,0,e.canvas.width,e.canvas.height),n=new Int32Array(r.data.buffer),o=R(q);for(let i=0;i<e.canvas.width;i+=m)for(let t=0;t<e.canvas.height;t++)n[t*e.canvas.width+i]=o;for(let i=0;i<e.canvas.height;i+=m)for(let t=0;t<e.canvas.width;t++)n[i*e.canvas.width+t]=o;e.putImageData(r,0,0)},ae=(e,r)=>{e.width=m*r.columnCount+1,e.height=m*r.rowCount+1;let n=e.getContext("2d",{desynchronized:!0});H(n);let o=X(E),i=X(j),t=(a,s,l)=>{n.fillStyle=l?i:o,n.fillRect(s*m+1,a*m+1,v,v)};return I(r,t),()=>I(r,t,!0)},se=(e,r)=>{e.width=m*r.columnCount+1,e.height=m*r.rowCount+1;let n=e.getContext("2d",{desynchronized:!0});H(n);let o=n.getImageData(0,0,e.width,e.height),i=new Int32Array(o.data.buffer),t=(d,c,A,u,g)=>{let f=d+c*e.width;for(let C=0;C<u;C++){for(let _=0;_<A;_++)i[f+_]=g;f+=e.width}},a=R(E),s=R(j),l=(d,c,A)=>{t(c*m+1,d*m+1,v,v,A?s:a)};return I(r,l),n.putImageData(o,0,0),()=>{I(r,l,!0),n.putImageData(o,0,0)}},le=e=>{let r=[];try{return e((n,o)=>(r.unshift(()=>o(n)),n))}finally{r.forEach(n=>n())}},K=(e,r,n)=>le(o=>{let i=o(e.createShader(e.VERTEX_SHADER),s=>e.deleteShader(s));if(e.shaderSource(i,r),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS))throw Error("vertex shader compilation failure: "+e.getShaderInfoLog(i));let t=o(e.createShader(e.FRAGMENT_SHADER),s=>e.deleteShader(s));if(e.shaderSource(t,n),e.compileShader(t),!e.getShaderParameter(t,e.COMPILE_STATUS))throw Error("fragment shader compilation failure: "+e.getShaderInfoLog(t));let a=o(e.createProgram(),s=>e.deleteProgram(s));if(e.attachShader(a,i),e.attachShader(a,t),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS))throw Error("program link failure: "+e.getProgramInfoLog(a));return e.useProgram(a),a}),ce=(e,r)=>{let{columnCount:n,rowCount:o}=r;e.width=m*n+1,e.height=m*o+1;let i=String.raw,t=e.getContext("webgl2",{desynchronized:!0,preserveDrawingBuffer:!0});t.viewport(0,0,e.width,e.height);{let l=K(t,i`#version 300 es
        uniform vec2 resolution;
        uniform float cellSize;
        uniform bool vertical;

        void main() {
          float p1 = float(gl_VertexID / 2) * (cellSize + 1.0) + 0.5;
          float p2 = gl_VertexID % 2 == 0 ? -1.0 : 1.0;
          gl_Position = vertical
            ? vec4(p1 / resolution.x * 2.0 - 1.0, p2, 0.0, 1.0)
            : vec4(p2, p1 / resolution.y * 2.0 - 1.0, 0.0, 1.0);
        }
      `,i`#version 300 es
        precision highp float;
        uniform vec4 gridColor;
        out vec4 outColor;

        void main() {
          outColor = gridColor;
        }
      `);t.uniform2f(t.getUniformLocation(l,"resolution"),e.width,e.height),t.uniform1f(t.getUniformLocation(l,"cellSize"),v),t.uniform4f(t.getUniformLocation(l,"gridColor"),q[0]/256,q[1]/256,q[2]/256,1),t.uniform1ui(t.getUniformLocation(l,"vertical"),1),t.drawArrays(t.LINES,0,r.columnCount*2+2),t.uniform1ui(t.getUniformLocation(l,"vertical"),0),t.drawArrays(t.LINES,0,r.rowCount*2+2)}let a=K(t,i`#version 300 es
      precision highp usampler2D;
      uniform usampler2D cells;
      uniform vec2 resolution;
      uniform int columnCount;
      uniform int cellSize;
      uniform vec4 deadColor;
      uniform vec4 aliveColor;
      out vec4 cellColor;

      void main() {
        int cellIndex = gl_VertexID / 6;
        ivec2 cellPosition = ivec2(cellIndex % columnCount, cellIndex / columnCount);
        int vertexOffsetIndex = gl_VertexID % 6;
        ivec2 vertexPosition = cellPosition * (cellSize + 1) + 1 + ivec2(
          vertexOffsetIndex == 0 ? ivec2(0, 0) :
          vertexOffsetIndex == 1 || vertexOffsetIndex == 3 ? ivec2(cellSize, 0) :
          vertexOffsetIndex == 2 || vertexOffsetIndex == 4 ? ivec2(0, cellSize) :
          ivec2(cellSize, cellSize)
        );
        gl_Position = vec4((vec2(vertexPosition) / resolution) * 2.0 - 1.0, 0.0, 1.0);
        gl_Position.y = -gl_Position.y;

        uint cellState = texelFetch(cells, cellPosition, 0).x;
        cellColor = cellState == 1u || cellState == 3u ? aliveColor : deadColor;
      }
    `,i`#version 300 es
      precision highp float;
      in vec4 cellColor;
      out vec4 outColor;

      void main() {
        outColor = cellColor;
      }
    `);t.uniform2f(t.getUniformLocation(a,"resolution"),t.canvas.width,t.canvas.height),t.uniform1i(t.getUniformLocation(a,"columnCount"),n),t.uniform1i(t.getUniformLocation(a,"cellSize"),v),t.uniform4f(t.getUniformLocation(a,"deadColor"),E[0]/256,E[1]/256,E[2]/256,1),t.uniform4f(t.getUniformLocation(a,"aliveColor"),j[0]/256,j[1]/256,j[2]/256,1),t.bindTexture(t.TEXTURE_2D,t.createTexture()),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);let s=()=>{let l=new Uint8Array(b.buffer,r.cellsPtr,o*n);t.texImage2D(t.TEXTURE_2D,0,t.R8UI,n,o,0,t.RED_INTEGER,t.UNSIGNED_BYTE,l),t.drawArrays(t.TRIANGLES,0,o*n*6)};return s(),s};{let e=document.body.appendChild(document.createElement("canvas")),r=new h(200,200);r.random();let n=c=>Math.min(Math.floor(c),r.rowCount-1),o=c=>Math.min(Math.floor(c),r.columnCount-1),i=(c,A)=>{let u=e.getBoundingClientRect(),g=(c-u.x-1)*e.width/u.width,f=(A-u.y-1)*e.height/u.height;return[n(f/(v+1)),o(g/(v+1))]};addEventListener("pointerdown",c=>{if(c.target===e){let[A,u]=i(c.clientX,c.clientY);r.setCellAlive(A,u,!0),s();let g=C=>{let[_,S]=i(C.clientX,C.clientY),V=Math.hypot(_-A,S-u),L=Math.atan2(_-A,S-u),W=Math.sin(L),Y=Math.cos(L);for(let y=0;y<V;y++)r.setCellAlive(n(A+y*W),o(u+y*Y),!0);r.setCellAlive(A,u,!0),A=_,u=S,s()},f=()=>{removeEventListener("pointerup",f),removeEventListener("pointercancel",f),removeEventListener("pointermove",g),d()};addEventListener("pointerup",f),addEventListener("pointercancel",f),addEventListener("pointermove",g),l()}});let t=w.appendChild(document.createElement("div"));t.innerHTML=`
    <fieldset>
      <legend style="padding:0 8px">Renderer</legend>
      <label style="cursor:pointer"><input type="radio" name="renderer">Stop</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="fillRect">fillRect</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="putImageData">putImageData</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="webgl2" checked>WebGL2</label><br>
    </fieldset>
    <fieldset>
      <legend style="padding:0 8px">Vastness</legend>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="200" checked>200x200</label><br>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="400">400x400</label><br>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="600">600x600</label><br>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="800">800x800</label><br>
    </fieldset>
  `,t.addEventListener("change",c=>{if(c.target instanceof HTMLInputElement){if(l(),c.target.name==="vastness"){let A=+c.target.value;r=new h(A,A),r.random()}d()}});let a=()=>(e.remove(),e.width=0,e.height=0,e=document.body.appendChild(document.createElement("canvas")),e.style.cursor="crosshair",e),s,l,d=()=>{switch(t.querySelector("[name=renderer]:checked").value){case"fillRect":s=ae(a(),r);break;case"putImageData":s=se(a(),r);break;case"webgl2":s=ce(a(),r);break;default:l=()=>{};return}({stop:l}=ie(()=>{r.tick(),s()}))};d()}
