var L="./wasm_game_of_life_bg.wasm";var ae=typeof TextDecoder>"u"?(0,module.require)("util").TextDecoder:TextDecoder,B=new ae("utf-8",{ignoreBOM:!0,fatal:!0});B.decode();var k=null;function se(){return(k===null||k.buffer!==h.buffer)&&(k=new Uint8Array(h.buffer)),k}function ie(e,t){return B.decode(se().subarray(e,e+t))}var f=class{static __wrap(t){let r=Object.create(f.prototype);return r.ptr=t,r}__destroy_into_raw(){let t=this.ptr;return this.ptr=0,t}free(){let t=this.__destroy_into_raw();R(t)}constructor(t,r){var n=F(t,r);return f.__wrap(n)}random(){U(this.ptr)}single_space_ship(t,r){O(this.ptr,t,r)}get as_ptr(){var t=P(this.ptr);return t}get cells_ptr(){var t=G(this.ptr);return t}get row_count(){var t=K(this.ptr);return t>>>0}get column_count(){var t=N(this.ptr);return t>>>0}set_cell_alive(t,r,n){H(this.ptr,t,r,n)}tick(){z(this.ptr)}},b=class{static __wrap(t){let r=Object.create(b.prototype);return r.ptr=t,r}__destroy_into_raw(){let t=this.ptr;return this.ptr=0,t}free(){let t=this.__destroy_into_raw();X(t)}constructor(t,r,n,o,A){var a=V(t,r,n,o,A);return b.__wrap(a)}get width(){var t=W(this.ptr);return t>>>0}get height(){var t=Y(this.ptr);return t>>>0}get data_ptr(){var t=J(this.ptr);return t}draw_cells(t){Z(this.ptr,t)}};function T(){var e=Date.now();return e}function D(e,t){throw new Error(ie(e,t))}var ce={["./wasm_game_of_life_bg.js"]:{__wbg_now_c3277d0b8a8f625b:T,__wbindgen_throw:D}};async function je(e,t){if(typeof e=="string"){let r=await fetch(e);if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(r,t)}catch(n){if(r.headers.get("Content-Type")!="application/wasm")console.warn(n);else throw n}e=await r.arrayBuffer()}return await WebAssembly.instantiate(e,t)}var{instance:c,module:Ee}=await je(L,ce),h=c.exports.memory,R=c.exports.__wbg_universe_free,F=c.exports.universe_new,U=c.exports.universe_random,O=c.exports.universe_single_space_ship,P=c.exports.universe_as_ptr,G=c.exports.universe_cells_ptr,K=c.exports.universe_row_count,N=c.exports.universe_column_count,H=c.exports.universe_set_cell_alive,z=c.exports.universe_tick,X=c.exports.__wbg_universecanvasdrawer_free,V=c.exports.universecanvasdrawer_new,W=c.exports.universecanvasdrawer_width,Y=c.exports.universecanvasdrawer_height,J=c.exports.universecanvasdrawer_data_ptr,Z=c.exports.universecanvasdrawer_draw_cells;var v=document.body.appendChild(document.createElement("aside"));v.style.position="fixed";v.style.top="16px";v.style.right="16px";v.style.padding="4px";v.style.background="rgba(255,255,255,.8)";v.style.whiteSpace="nowrap";v.style.userSelect="none";var _=3,d=_+1,I=[204,204,204],E=[255,255,255],x=[0,0,0],Q=([e,t,r])=>`rgb(${e},${t},${r})`,q=([e,t,r])=>(255<<24)+(r<<16)+(t<<8)+e,ue=(()=>{let e=v.appendChild(document.createElement("div"));e.style.float="right",e.style.color="hsl(150,100%,50%)",e.style.textShadow="1px 1px 1px hsl(150,100%,20%)",e.style.fontVariantNumeric="tabular-nums",e.textContent="0 fps";let t=0,r=performance.now();return setInterval(()=>{let n=performance.now();e.textContent=`${Math.round(t*1e3/(n-r))} fps`,t=0,r=n},512),()=>t++})(),de=e=>{let t,r=()=>{e(),ue(),t=requestAnimationFrame(r)};return r(),{stop:()=>t!==void 0&&cancelAnimationFrame(t)}},S=(e,t,r)=>{let{row_count:n,column_count:o}=e,A=new Uint8Array(h.buffer,e.cells_ptr,n*o),a=0;for(let s=0;s<n;s++)for(let i=0;i<o;i++){let m=A[a];(!r||m&2)&&t(s,i,m&1),a++}},te=e=>{let t=e.getImageData(0,0,e.canvas.width,e.canvas.height),r=new Int32Array(t.data.buffer),n=q(I);for(let o=0;o<e.canvas.width;o+=d)for(let A=0;A<e.canvas.height;A++)r[A*e.canvas.width+o]=n;for(let o=0;o<e.canvas.height;o+=d)for(let A=0;A<e.canvas.width;A++)r[o*e.canvas.width+A]=n;e.putImageData(t,0,0)},me=(e,t)=>{e.width=d*t.column_count+1,e.height=d*t.row_count+1;let r=e.getContext("2d");te(r);let n=Q(E),o=Q(x),A=(a,s,i)=>{r.fillStyle=i?o:n,r.fillRect(s*d+1,a*d+1,_,_)};return S(t,A),()=>S(t,A,!0)},_e=(e,t)=>{e.width=d*t.column_count+1,e.height=d*t.row_count+1;let r=e.getContext("2d");te(r);let n=r.getImageData(0,0,e.width,e.height),o=new Int32Array(n.data.buffer),A=(m,l,j,u,g)=>{let p=m+l*e.width;for(let y=0;y<u;y++){for(let w=0;w<j;w++)o[p+w]=g;p+=e.width}},a=q(E),s=q(x),i=(m,l,j)=>{A(l*d+1,m*d+1,_,_,j?s:a)};return S(t,i),r.putImageData(n,0,0),()=>{S(t,i,!0),r.putImageData(n,0,0)}},pe=(e,t)=>{let r=new b(t.as_ptr,_,q(I),q(E),q(x)),n=new ImageData(new Uint8ClampedArray(h.buffer,r.data_ptr,r.width*r.height*4),r.width,r.height);e.width=r.width,e.height=r.height;let o=e.getContext("2d");return r.draw_cells(!1),o.putImageData(n,0,0),()=>{r.draw_cells(!1),o.putImageData(n,0,0)}},ve=e=>{let t=[];try{return e((r,n)=>(t.unshift(()=>n(r)),r))}finally{t.forEach(r=>r())}},ee=(e,t,r)=>ve(n=>{let o=n(e.createShader(e.VERTEX_SHADER),s=>e.deleteShader(s));if(e.shaderSource(o,t),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))throw Error("vertex shader compilation failure: "+e.getShaderInfoLog(o));let A=n(e.createShader(e.FRAGMENT_SHADER),s=>e.deleteShader(s));if(e.shaderSource(A,r),e.compileShader(A),!e.getShaderParameter(A,e.COMPILE_STATUS))throw Error("fragment shader compilation failure: "+e.getShaderInfoLog(A));let a=n(e.createProgram(),s=>e.deleteProgram(s));if(e.attachShader(a,o),e.attachShader(a,A),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS))throw Error("program link failure: "+e.getProgramInfoLog(a));return e.useProgram(a),a}),we=(e,t)=>{let{column_count:r,row_count:n}=t;e.width=d*r+1,e.height=d*n+1;let o=String.raw,A=e.getContext("webgl2",{preserveDrawingBuffer:!0});A.viewport(0,0,e.width,e.height);{let i=ee(A,o`#version 300 es
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
      `);A.uniform2f(A.getUniformLocation(i,"resolution"),e.width,e.height),A.uniform1f(A.getUniformLocation(i,"cellSize"),_),A.uniform4f(A.getUniformLocation(i,"gridColor"),I[0]/256,I[1]/256,I[2]/256,1),A.uniform1ui(A.getUniformLocation(i,"vertical"),1),A.drawArrays(A.LINES,0,t.column_count*2+2),A.uniform1ui(A.getUniformLocation(i,"vertical"),0),A.drawArrays(A.LINES,0,t.row_count*2+2)}let a=ee(A,o`#version 300 es
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
    `);A.uniform2f(A.getUniformLocation(a,"resolution"),A.canvas.width,A.canvas.height),A.uniform1i(A.getUniformLocation(a,"columnCount"),r),A.uniform1i(A.getUniformLocation(a,"cellSize"),_),A.uniform4f(A.getUniformLocation(a,"deadColor"),E[0]/256,E[1]/256,E[2]/256,1),A.uniform4f(A.getUniformLocation(a,"aliveColor"),x[0]/256,x[1]/256,x[2]/256,1),A.bindTexture(A.TEXTURE_2D,A.createTexture()),A.texParameteri(A.TEXTURE_2D,A.TEXTURE_MIN_FILTER,A.NEAREST),A.texParameteri(A.TEXTURE_2D,A.TEXTURE_MAG_FILTER,A.NEAREST);let s=()=>{let i=new Uint8Array(h.buffer,t.cells_ptr,n*r);A.texImage2D(A.TEXTURE_2D,0,A.R8UI,r,n,0,A.RED_INTEGER,A.UNSIGNED_BYTE,i),A.drawArrays(A.TRIANGLES,0,n*r*6)};return s(),s};{let e=document.body.appendChild(document.createElement("canvas")),t=new f(200,200);t.random();let r=l=>Math.min(Math.floor(l),t.row_count-1),n=l=>Math.min(Math.floor(l),t.column_count-1),o=(l,j)=>{let u=e.getBoundingClientRect(),g=(l-u.x-1)*e.width/u.width,p=(j-u.y-1)*e.height/u.height;return[r(p/(_+1)),n(g/(_+1))]};addEventListener("pointerdown",l=>{if(l.target===e){let[j,u]=o(l.clientX,l.clientY);t.set_cell_alive(j,u,!0),s();let g=y=>{let[w,M]=o(y.clientX,y.clientY),Ae=Math.hypot(w-j,M-u),$=Math.atan2(w-j,M-u),re=Math.sin($),ne=Math.cos($);for(let C=0;C<Ae;C++)t.set_cell_alive(r(j+C*re),n(u+C*ne),!0);t.set_cell_alive(j,u,!0),j=w,u=M,s()},p=()=>{removeEventListener("pointerup",p),removeEventListener("pointercancel",p),removeEventListener("pointermove",g),m()};addEventListener("pointerup",p),addEventListener("pointercancel",p),addEventListener("pointermove",g),i()}});let A=v.appendChild(document.createElement("div"));A.innerHTML=`
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
  `,A.addEventListener("change",l=>{if(l.target instanceof HTMLInputElement){if(i(),l.target.name==="vastness"){let j=+l.target.value;t=new f(j,j),t.random()}m()}});let a=()=>(e.remove(),e.width=0,e.height=0,e=document.body.appendChild(document.createElement("canvas")),e.style.cursor="crosshair",e),s,i,m=()=>{switch(A.querySelector("[name=renderer]:checked").value){case"canvas-api":s=me(a(),t);break;case"image-data":s=_e(a(),t);break;case"wasm":s=pe(a(),t);break;case"webgl2":s=we(a(),t);break;default:i=()=>{};return}({stop:i}=de(()=>{t.tick(),s()}))};m()}
