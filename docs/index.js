var R="./wasm_game_of_life_bg.wasm";var ae=typeof TextDecoder>"u"?(0,module.require)("util").TextDecoder:TextDecoder,T=new ae("utf-8",{ignoreBOM:!0,fatal:!0});T.decode();var C=null;function se(){return(C===null||C.buffer!==g.buffer)&&(C=new Uint8Array(g.buffer)),C}function ie(e,t){return T.decode(se().subarray(e,e+t))}var w=class{static __wrap(t){let A=Object.create(w.prototype);return A.ptr=t,A}__destroy_into_raw(){let t=this.ptr;return this.ptr=0,t}free(){let t=this.__destroy_into_raw();M(t)}constructor(t,A){let n=F(t,A);return w.__wrap(n)}random(){O(this.ptr)}single_space_ship(t,A){U(this.ptr,t,A)}get as_ptr(){return K(this.ptr)}get cells_ptr(){return P(this.ptr)}get row_count(){return G(this.ptr)>>>0}get column_count(){return N(this.ptr)>>>0}set_cell_alive(t,A,n){H(this.ptr,t,A,n)}tick(){z(this.ptr)}},h=class{static __wrap(t){let A=Object.create(h.prototype);return A.ptr=t,A}__destroy_into_raw(){let t=this.ptr;return this.ptr=0,t}free(){let t=this.__destroy_into_raw();X(t)}constructor(t,A,n,o,r){let a=V(t,A,n,o,r);return h.__wrap(a)}get width(){return W(this.ptr)>>>0}get height(){return J(this.ptr)>>>0}get data_ptr(){return Y(this.ptr)}draw_cells(t){Z(this.ptr,t)}};function B(){return Date.now()}function D(e,t){throw new Error(ie(e,t))}var ce={["./wasm_game_of_life_bg.js"]:{__wbg_now_c3277d0b8a8f625b:B,__wbindgen_throw:D}};async function ue(e,t){if(typeof e=="string"){let A=await fetch(e);if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(A,t)}catch(n){if(A.headers.get("Content-Type")!="application/wasm")console.warn(n);else throw n}e=await A.arrayBuffer()}return await WebAssembly.instantiate(e,t)}var{instance:c,module:Ee}=await ue(R,ce),g=c.exports.memory,M=c.exports.__wbg_universe_free,F=c.exports.universe_new,O=c.exports.universe_random,U=c.exports.universe_single_space_ship,K=c.exports.universe_as_ptr,P=c.exports.universe_cells_ptr,G=c.exports.universe_row_count,N=c.exports.universe_column_count,H=c.exports.universe_set_cell_alive,z=c.exports.universe_tick,X=c.exports.__wbg_universecanvasdrawer_free,V=c.exports.universecanvasdrawer_new,W=c.exports.universecanvasdrawer_width,J=c.exports.universecanvasdrawer_height,Y=c.exports.universecanvasdrawer_data_ptr,Z=c.exports.universecanvasdrawer_draw_cells;var v=document.body.appendChild(document.createElement("aside"));v.style.position="fixed";v.style.top="16px";v.style.right="16px";v.style.padding="4px";v.style.background="rgba(255,255,255,.8)";v.style.whiteSpace="nowrap";v.style.userSelect="none";var _=3,d=_+1,y=[204,204,204],E=[255,255,255],q=[0,0,0],Q=([e,t,A])=>`rgb(${e},${t},${A})`,x=([e,t,A])=>(255<<24)+(A<<16)+(t<<8)+e,je=(()=>{let e=v.appendChild(document.createElement("div"));e.style.float="right",e.style.color="hsl(150,100%,50%)",e.style.textShadow="1px 1px 1px hsl(150,100%,20%)",e.style.fontVariantNumeric="tabular-nums",e.textContent="0 fps";let t=0,A=performance.now();return setInterval(()=>{let n=performance.now();e.textContent=`${Math.round(t*1e3/(n-A))} fps`,t=0,A=n},512),()=>t++})(),de=e=>{let t,A=()=>{e(),je(),t=requestAnimationFrame(A)};return A(),{stop:()=>t!==void 0&&cancelAnimationFrame(t)}},S=(e,t,A)=>{let{row_count:n,column_count:o}=e,r=new Uint8Array(g.buffer,e.cells_ptr,n*o),a=0;for(let s=0;s<n;s++)for(let i=0;i<o;i++){let m=r[a];(!A||m&2)&&t(s,i,m&1),a++}},te=e=>{let t=e.getImageData(0,0,e.canvas.width,e.canvas.height),A=new Int32Array(t.data.buffer),n=x(y);for(let o=0;o<e.canvas.width;o+=d)for(let r=0;r<e.canvas.height;r++)A[r*e.canvas.width+o]=n;for(let o=0;o<e.canvas.height;o+=d)for(let r=0;r<e.canvas.width;r++)A[o*e.canvas.width+r]=n;e.putImageData(t,0,0)},me=(e,t)=>{e.width=d*t.column_count+1,e.height=d*t.row_count+1;let A=e.getContext("2d");te(A);let n=Q(E),o=Q(q),r=(a,s,i)=>{A.fillStyle=i?o:n,A.fillRect(s*d+1,a*d+1,_,_)};return S(t,r),()=>S(t,r,!0)},_e=(e,t)=>{e.width=d*t.column_count+1,e.height=d*t.row_count+1;let A=e.getContext("2d");te(A);let n=A.getImageData(0,0,e.width,e.height),o=new Int32Array(n.data.buffer),r=(m,l,u,j,b)=>{let p=m+l*e.width;for(let k=0;k<j;k++){for(let f=0;f<u;f++)o[p+f]=b;p+=e.width}},a=x(E),s=x(q),i=(m,l,u)=>{r(l*d+1,m*d+1,_,_,u?s:a)};return S(t,i),A.putImageData(n,0,0),()=>{S(t,i,!0),A.putImageData(n,0,0)}},pe=(e,t)=>{let A=new h(t.as_ptr,_,x(y),x(E),x(q)),n=new ImageData(new Uint8ClampedArray(g.buffer,A.data_ptr,A.width*A.height*4),A.width,A.height);e.width=A.width,e.height=A.height;let o=e.getContext("2d");return A.draw_cells(!1),o.putImageData(n,0,0),()=>{A.draw_cells(!1),o.putImageData(n,0,0)}},ve=e=>{let t=[];try{return e((A,n)=>(t.unshift(()=>n(A)),A))}finally{t.forEach(A=>A())}},ee=(e,t,A)=>ve(n=>{let o=n(e.createShader(e.VERTEX_SHADER),s=>e.deleteShader(s));if(e.shaderSource(o,t),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))throw Error("vertex shader compilation failure: "+e.getShaderInfoLog(o));let r=n(e.createShader(e.FRAGMENT_SHADER),s=>e.deleteShader(s));if(e.shaderSource(r,A),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw Error("fragment shader compilation failure: "+e.getShaderInfoLog(r));let a=n(e.createProgram(),s=>e.deleteProgram(s));if(e.attachShader(a,o),e.attachShader(a,r),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS))throw Error("program link failure: "+e.getProgramInfoLog(a));return e.useProgram(a),a}),we=(e,t)=>{let{column_count:A,row_count:n}=t;e.width=d*A+1,e.height=d*n+1;let o=String.raw,r=e.getContext("webgl2",{preserveDrawingBuffer:!0});r.viewport(0,0,e.width,e.height);{let i=ee(r,o`#version 300 es
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
      `,o`#version 300 es
        precision highp float;
        uniform vec4 gridColor;
        out vec4 outColor;

        void main() {
          outColor = gridColor;
        }
      `);r.uniform2f(r.getUniformLocation(i,"resolution"),e.width,e.height),r.uniform1f(r.getUniformLocation(i,"cellSize"),_),r.uniform4f(r.getUniformLocation(i,"gridColor"),y[0]/256,y[1]/256,y[2]/256,1),r.uniform1ui(r.getUniformLocation(i,"vertical"),1),r.drawArrays(r.LINES,0,t.column_count*2+2),r.uniform1ui(r.getUniformLocation(i,"vertical"),0),r.drawArrays(r.LINES,0,t.row_count*2+2)}let a=ee(r,o`#version 300 es
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
    `,o`#version 300 es
      precision highp float;
      in vec4 cellColor;
      out vec4 outColor;

      void main() {
        outColor = cellColor;
      }
    `);r.uniform2f(r.getUniformLocation(a,"resolution"),r.canvas.width,r.canvas.height),r.uniform1i(r.getUniformLocation(a,"columnCount"),A),r.uniform1i(r.getUniformLocation(a,"cellSize"),_),r.uniform4f(r.getUniformLocation(a,"deadColor"),E[0]/256,E[1]/256,E[2]/256,1),r.uniform4f(r.getUniformLocation(a,"aliveColor"),q[0]/256,q[1]/256,q[2]/256,1),r.bindTexture(r.TEXTURE_2D,r.createTexture()),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST);let s=()=>{let i=new Uint8Array(g.buffer,t.cells_ptr,n*A);r.texImage2D(r.TEXTURE_2D,0,r.R8UI,A,n,0,r.RED_INTEGER,r.UNSIGNED_BYTE,i),r.drawArrays(r.TRIANGLES,0,n*A*6)};return s(),s};{let e=document.body.appendChild(document.createElement("canvas")),t=new w(200,200);t.random();let A=l=>Math.min(Math.floor(l),t.row_count-1),n=l=>Math.min(Math.floor(l),t.column_count-1),o=(l,u)=>{let j=e.getBoundingClientRect(),b=(l-j.x-1)*e.width/j.width,p=(u-j.y-1)*e.height/j.height;return[A(p/(_+1)),n(b/(_+1))]};addEventListener("pointerdown",l=>{if(l.target===e){let[u,j]=o(l.clientX,l.clientY);t.set_cell_alive(u,j,!0),s();let b=k=>{let[f,L]=o(k.clientX,k.clientY),re=Math.hypot(f-u,L-j),$=Math.atan2(f-u,L-j),Ae=Math.sin($),ne=Math.cos($);for(let I=0;I<re;I++)t.set_cell_alive(A(u+I*Ae),n(j+I*ne),!0);t.set_cell_alive(u,j,!0),u=f,j=L,s()},p=()=>{removeEventListener("pointerup",p),removeEventListener("pointercancel",p),removeEventListener("pointermove",b),m()};addEventListener("pointerup",p),addEventListener("pointercancel",p),addEventListener("pointermove",b),i()}});let r=v.appendChild(document.createElement("div"));r.innerHTML=`
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
  `,r.addEventListener("change",l=>{if(l.target instanceof HTMLInputElement){if(i(),l.target.name==="vastness"){let u=+l.target.value;t=new w(u,u),t.random()}m()}});let a=()=>(e.remove(),e.width=0,e.height=0,e=document.body.appendChild(document.createElement("canvas")),e.style.cursor="crosshair",e),s,i,m=()=>{switch(r.querySelector("[name=renderer]:checked").value){case"canvas-api":s=me(a(),t);break;case"image-data":s=_e(a(),t);break;case"wasm":s=pe(a(),t);break;case"webgl2":s=we(a(),t);break;default:i=()=>{};return}({stop:i}=de(()=>{t.tick(),s()}))};m()}
