var R="./wasm_game_of_life_bg.wasm";var ae=typeof TextDecoder>"u"?(0,module.require)("util").TextDecoder:TextDecoder,T=new ae("utf-8",{ignoreBOM:!0,fatal:!0});T.decode();var S=null;function se(){return(S===null||S.buffer!==j.buffer)&&(S=new Uint8Array(j.buffer)),S}function ie(e,t){return T.decode(se().subarray(e,e+t))}var _=class{static __wrap(t){let n=Object.create(_.prototype);return n.ptr=t,n}__destroy_into_raw(){let t=this.ptr;return this.ptr=0,t}free(){let t=this.__destroy_into_raw();U(t)}constructor(t,n){let o=F(t,n);return _.__wrap(o)}random(){O(this.ptr)}get asPtr(){return $(this.ptr)}get cellsPtr(){return z(this.ptr)}get rowCount(){return B(this.ptr)>>>0}get columnCount(){return G(this.ptr)>>>0}setCellAlive(t,n,o){K(this.ptr,t,n,o)}tick(){N(this.ptr)}},g=class{static __wrap(t){let n=Object.create(g.prototype);return n.ptr=t,n}__destroy_into_raw(){let t=this.ptr;return this.ptr=0,t}free(){let t=this.__destroy_into_raw();X(t)}constructor(t,n,o,a,r){let s=H(t,n,o,a,r);return g.__wrap(s)}get width(){return W(this.ptr)>>>0}get height(){return V(this.ptr)>>>0}get dataPtr(){return Y(this.ptr)}drawCells(t){J(this.ptr,t)}};function D(){return Date.now()}function M(e,t){throw new Error(ie(e,t))}var Ae={["./wasm_game_of_life_bg.js"]:{__wbg_now_c3277d0b8a8f625b:D,__wbindgen_throw:M}};async function ce(e,t){if(typeof e=="string"){let n=await fetch(e);if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(n,t)}catch(o){if(n.headers.get("Content-Type")!="application/wasm")console.warn(o);else throw o}e=await n.arrayBuffer()}return await WebAssembly.instantiate(e,t)}var{instance:c,module:be}=await ce(R,Ae),j=c.exports.memory,U=c.exports.__wbg_universe_free,F=c.exports.universe_new,O=c.exports.universe_random,$=c.exports.universe_asPtr,z=c.exports.universe_cellsPtr,B=c.exports.universe_rowCount,G=c.exports.universe_columnCount,K=c.exports.universe_setCellAlive,N=c.exports.universe_tick,X=c.exports.__wbg_universecanvasdrawer_free,H=c.exports.universecanvasdrawer_new,W=c.exports.universecanvasdrawer_width,V=c.exports.universecanvasdrawer_height,Y=c.exports.universecanvasdrawer_dataPtr,J=c.exports.universecanvasdrawer_drawCells;var f=document.body.appendChild(document.createElement("aside"));f.style.position="fixed";f.style.top="16px";f.style.right="16px";f.style.padding="4px";f.style.background="rgba(255,255,255,.8)";f.style.whiteSpace="nowrap";f.style.userSelect="none";var w=3,m=w+1,q=[204,204,204],E=[255,255,255],C=[0,0,0],Z=([e,t,n])=>`rgb(${e},${t},${n})`,x=([e,t,n])=>(255<<24)+(n<<16)+(t<<8)+e,ue=(()=>{let e=f.appendChild(document.createElement("div"));e.style.float="right",e.style.color="hsl(150,100%,50%)",e.style.textShadow="1px 1px 1px hsl(150,100%,20%)",e.style.fontVariantNumeric="tabular-nums",e.textContent="0 fps";let t=0,n=performance.now();return setInterval(()=>{let o=performance.now();e.textContent=`${Math.round(t*1e3/(o-n))} fps`,t=0,n=o},512),()=>t++})(),de=e=>{let t,n=()=>{e(),ue(),t=requestAnimationFrame(n)};return n(),{stop:()=>t!==void 0&&cancelAnimationFrame(t)}},k=(e,t,n)=>{let{rowCount:o,columnCount:a}=e,r=new Uint8Array(j.buffer,e.cellsPtr,o*a),s=0;for(let i=0;i<o;i++)for(let l=0;l<a;l++){let p=r[s];(!n||p&2)&&t(i,l,p&1),s++}},ee=e=>{let t=e.getImageData(0,0,e.canvas.width,e.canvas.height),n=new Int32Array(t.data.buffer),o=x(q);for(let a=0;a<e.canvas.width;a+=m)for(let r=0;r<e.canvas.height;r++)n[r*e.canvas.width+a]=o;for(let a=0;a<e.canvas.height;a+=m)for(let r=0;r<e.canvas.width;r++)n[a*e.canvas.width+r]=o;e.putImageData(t,0,0)},me=(e,t)=>{e.width=m*t.columnCount+1,e.height=m*t.rowCount+1;let n=e.getContext("2d",{desynchronized:!0});ee(n);let o=Z(E),a=Z(C),r=(s,i,l)=>{n.fillStyle=l?a:o,n.fillRect(i*m+1,s*m+1,w,w)};return k(t,r),()=>k(t,r,!0)},pe=(e,t)=>{e.width=m*t.columnCount+1,e.height=m*t.rowCount+1;let n=e.getContext("2d",{desynchronized:!0});ee(n);let o=n.getImageData(0,0,e.width,e.height),a=new Int32Array(o.data.buffer),r=(p,A,u,d,b)=>{let v=p+A*e.width;for(let y=0;y<d;y++){for(let h=0;h<u;h++)a[v+h]=b;v+=e.width}},s=x(E),i=x(C),l=(p,A,u)=>{r(A*m+1,p*m+1,w,w,u?i:s)};return k(t,l),n.putImageData(o,0,0),()=>{k(t,l,!0),n.putImageData(o,0,0)}},we=(e,t)=>{let n=new g(t.asPtr,w,x(q),x(E),x(C)),o=new ImageData(new Uint8ClampedArray(j.buffer,n.dataPtr,n.width*n.height*4),n.width,n.height);e.width=n.width,e.height=n.height;let a=e.getContext("2d",{desynchronized:!0});return n.drawCells(!1),a.putImageData(o,0,0),()=>{n.drawCells(!1),a.putImageData(o,0,0)}},ve=e=>{let t=[];try{return e((n,o)=>(t.unshift(()=>o(n)),n))}finally{t.forEach(n=>n())}},Q=(e,t,n)=>ve(o=>{let a=o(e.createShader(e.VERTEX_SHADER),i=>e.deleteShader(i));if(e.shaderSource(a,t),e.compileShader(a),!e.getShaderParameter(a,e.COMPILE_STATUS))throw Error("vertex shader compilation failure: "+e.getShaderInfoLog(a));let r=o(e.createShader(e.FRAGMENT_SHADER),i=>e.deleteShader(i));if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw Error("fragment shader compilation failure: "+e.getShaderInfoLog(r));let s=o(e.createProgram(),i=>e.deleteProgram(i));if(e.attachShader(s,a),e.attachShader(s,r),e.linkProgram(s),!e.getProgramParameter(s,e.LINK_STATUS))throw Error("program link failure: "+e.getProgramInfoLog(s));return e.useProgram(s),s}),fe=(e,t)=>{let{columnCount:n,rowCount:o}=t;e.width=m*n+1,e.height=m*o+1;let a=String.raw,r=e.getContext("webgl2",{desynchronized:!0,preserveDrawingBuffer:!0});r.viewport(0,0,e.width,e.height);{let l=Q(r,a`#version 300 es
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
      `,a`#version 300 es
        precision highp float;
        uniform vec4 gridColor;
        out vec4 outColor;

        void main() {
          outColor = gridColor;
        }
      `);r.uniform2f(r.getUniformLocation(l,"resolution"),e.width,e.height),r.uniform1f(r.getUniformLocation(l,"cellSize"),w),r.uniform4f(r.getUniformLocation(l,"gridColor"),q[0]/256,q[1]/256,q[2]/256,1),r.uniform1ui(r.getUniformLocation(l,"vertical"),1),r.drawArrays(r.LINES,0,t.columnCount*2+2),r.uniform1ui(r.getUniformLocation(l,"vertical"),0),r.drawArrays(r.LINES,0,t.rowCount*2+2)}let s=Q(r,a`#version 300 es
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
    `,a`#version 300 es
      precision highp float;
      in vec4 cellColor;
      out vec4 outColor;

      void main() {
        outColor = cellColor;
      }
    `);r.uniform2f(r.getUniformLocation(s,"resolution"),r.canvas.width,r.canvas.height),r.uniform1i(r.getUniformLocation(s,"columnCount"),n),r.uniform1i(r.getUniformLocation(s,"cellSize"),w),r.uniform4f(r.getUniformLocation(s,"deadColor"),E[0]/256,E[1]/256,E[2]/256,1),r.uniform4f(r.getUniformLocation(s,"aliveColor"),C[0]/256,C[1]/256,C[2]/256,1),r.bindTexture(r.TEXTURE_2D,r.createTexture()),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST);let i=()=>{let l=new Uint8Array(j.buffer,t.cellsPtr,o*n);r.texImage2D(r.TEXTURE_2D,0,r.R8UI,n,o,0,r.RED_INTEGER,r.UNSIGNED_BYTE,l),r.drawArrays(r.TRIANGLES,0,o*n*6)};return i(),i};{let e=document.body.appendChild(document.createElement("canvas")),t=new _(200,200);t.random();let n=A=>Math.min(Math.floor(A),t.rowCount-1),o=A=>Math.min(Math.floor(A),t.columnCount-1),a=(A,u)=>{let d=e.getBoundingClientRect(),b=(A-d.x-1)*e.width/d.width,v=(u-d.y-1)*e.height/d.height;return[n(v/(w+1)),o(b/(w+1))]};addEventListener("pointerdown",A=>{if(A.target===e){let[u,d]=a(A.clientX,A.clientY);t.setCellAlive(u,d,!0),i();let b=y=>{let[h,L]=a(y.clientX,y.clientY),te=Math.hypot(h-u,L-d),P=Math.atan2(h-u,L-d),re=Math.sin(P),ne=Math.cos(P);for(let I=0;I<te;I++)t.setCellAlive(n(u+I*re),o(d+I*ne),!0);t.setCellAlive(u,d,!0),u=h,d=L,i()},v=()=>{removeEventListener("pointerup",v),removeEventListener("pointercancel",v),removeEventListener("pointermove",b),p()};addEventListener("pointerup",v),addEventListener("pointercancel",v),addEventListener("pointermove",b),l()}});let r=f.appendChild(document.createElement("div"));r.innerHTML=`
    <fieldset>
      <legend style="padding:0 8px">Renderer</legend>
      <label style="cursor:pointer"><input type="radio" name="renderer">Stop</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="canvas-api">fillRect (JS)</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="image-data">putImageData (JS)</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="wasm">putImageData (WASM)</label><br>
      <label style="cursor:pointer"><input type="radio" name="renderer" value="webgl2" checked>WebGL2</label><br>
    </fieldset>
    <fieldset>
      <legend style="padding:0 8px">Vastness</legend>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="200" checked>200x200</label><br>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="400">400x400</label><br>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="600">600x600</label><br>
      <label style="cursor:pointer"><input type="radio" name="vastness" value="800">800x800</label><br>
    </fieldset>
  `,r.addEventListener("change",A=>{if(A.target instanceof HTMLInputElement){if(l(),A.target.name==="vastness"){let u=+A.target.value;t=new _(u,u),t.random()}p()}});let s=()=>(e.remove(),e.width=0,e.height=0,e=document.body.appendChild(document.createElement("canvas")),e.style.cursor="crosshair",e),i,l,p=()=>{switch(r.querySelector("[name=renderer]:checked").value){case"canvas-api":i=me(s(),t);break;case"image-data":i=pe(s(),t);break;case"wasm":i=we(s(),t);break;case"webgl2":i=fe(s(),t);break;default:l=()=>{};return}({stop:l}=de(()=>{t.tick(),i()}))};p()}
