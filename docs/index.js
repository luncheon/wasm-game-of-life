var T="./wasm_game_of_life_bg.wasm";var se=typeof TextDecoder>"u"?(0,module.require)("util").TextDecoder:TextDecoder,D=new se("utf-8",{ignoreBOM:!0,fatal:!0});D.decode();var S=null;function ie(){return(S===null||S.buffer!==g.buffer)&&(S=new Uint8Array(g.buffer)),S}function Ae(e,t){return D.decode(ie().subarray(e,e+t))}var j=class{static __wrap(t){let n=Object.create(j.prototype);return n.ptr=t,n}__destroy_into_raw(){let t=this.ptr;return this.ptr=0,t}free(){let t=this.__destroy_into_raw();U(t)}constructor(t,n){let o=F(t,n);return j.__wrap(o)}random(){O(this.ptr)}single_space_ship(t,n){P(this.ptr,t,n)}get as_ptr(){return $(this.ptr)}get cells_ptr(){return N(this.ptr)}get row_count(){return K(this.ptr)>>>0}get column_count(){return G(this.ptr)>>>0}set_cell_alive(t,n,o){z(this.ptr,t,n,o)}tick(){X(this.ptr)}},h=class{static __wrap(t){let n=Object.create(h.prototype);return n.ptr=t,n}__destroy_into_raw(){let t=this.ptr;return this.ptr=0,t}free(){let t=this.__destroy_into_raw();H(t)}constructor(t,n,o,a,r){let s=W(t,n,o,a,r);return h.__wrap(s)}get width(){return V(this.ptr)>>>0}get height(){return Y(this.ptr)>>>0}get data_ptr(){return J(this.ptr)}draw_cells(t){Z(this.ptr,t)}};function M(){return Date.now()}function B(e,t){throw new Error(Ae(e,t))}var le={["./wasm_game_of_life_bg.js"]:{__wbg_now_c3277d0b8a8f625b:M,__wbindgen_throw:B}};async function ue(e,t){if(typeof e=="string"){let n=await fetch(e);if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(n,t)}catch(o){if(n.headers.get("Content-Type")!="application/wasm")console.warn(o);else throw o}e=await n.arrayBuffer()}return await WebAssembly.instantiate(e,t)}var{instance:l,module:Ee}=await ue(T,le),g=l.exports.memory,U=l.exports.__wbg_universe_free,F=l.exports.universe_new,O=l.exports.universe_random,P=l.exports.universe_single_space_ship,$=l.exports.universe_as_ptr,N=l.exports.universe_cells_ptr,K=l.exports.universe_row_count,G=l.exports.universe_column_count,z=l.exports.universe_set_cell_alive,X=l.exports.universe_tick,H=l.exports.__wbg_universecanvasdrawer_free,W=l.exports.universecanvasdrawer_new,V=l.exports.universecanvasdrawer_width,Y=l.exports.universecanvasdrawer_height,J=l.exports.universecanvasdrawer_data_ptr,Z=l.exports.universecanvasdrawer_draw_cells;var w=document.body.appendChild(document.createElement("aside"));w.style.position="fixed";w.style.top="16px";w.style.right="16px";w.style.padding="4px";w.style.background="rgba(255,255,255,.8)";w.style.whiteSpace="nowrap";w.style.userSelect="none";var p=3,m=p+1,I=[204,204,204],E=[255,255,255],x=[0,0,0],Q=([e,t,n])=>`rgb(${e},${t},${n})`,y=([e,t,n])=>(255<<24)+(n<<16)+(t<<8)+e,de=(()=>{let e=w.appendChild(document.createElement("div"));e.style.float="right",e.style.color="hsl(150,100%,50%)",e.style.textShadow="1px 1px 1px hsl(150,100%,20%)",e.style.fontVariantNumeric="tabular-nums",e.textContent="0 fps";let t=0,n=performance.now();return setInterval(()=>{let o=performance.now();e.textContent=`${Math.round(t*1e3/(o-n))} fps`,t=0,n=o},512),()=>t++})(),me=e=>{let t,n=()=>{e(),de(),t=requestAnimationFrame(n)};return n(),{stop:()=>t!==void 0&&cancelAnimationFrame(t)}},k=(e,t,n)=>{let{row_count:o,column_count:a}=e,r=new Uint8Array(g.buffer,e.cells_ptr,o*a),s=0;for(let i=0;i<o;i++)for(let A=0;A<a;A++){let _=r[s];(!n||_&2)&&t(i,A,_&1),s++}},te=e=>{let t=e.getImageData(0,0,e.canvas.width,e.canvas.height),n=new Int32Array(t.data.buffer),o=y(I);for(let a=0;a<e.canvas.width;a+=m)for(let r=0;r<e.canvas.height;r++)n[r*e.canvas.width+a]=o;for(let a=0;a<e.canvas.height;a+=m)for(let r=0;r<e.canvas.width;r++)n[a*e.canvas.width+r]=o;e.putImageData(t,0,0)},_e=(e,t)=>{e.width=m*t.column_count+1,e.height=m*t.row_count+1;let n=e.getContext("2d");te(n);let o=Q(E),a=Q(x),r=(s,i,A)=>{n.fillStyle=A?a:o,n.fillRect(i*m+1,s*m+1,p,p)};return k(t,r),()=>k(t,r,!0)},pe=(e,t)=>{e.width=m*t.column_count+1,e.height=m*t.row_count+1;let n=e.getContext("2d");te(n);let o=n.getImageData(0,0,e.width,e.height),a=new Int32Array(o.data.buffer),r=(_,c,u,d,b)=>{let v=_+c*e.width;for(let q=0;q<d;q++){for(let f=0;f<u;f++)a[v+f]=b;v+=e.width}},s=y(E),i=y(x),A=(_,c,u)=>{r(c*m+1,_*m+1,p,p,u?i:s)};return k(t,A),n.putImageData(o,0,0),()=>{k(t,A,!0),n.putImageData(o,0,0)}},ve=(e,t)=>{let n=new h(t.as_ptr,p,y(I),y(E),y(x)),o=new ImageData(new Uint8ClampedArray(g.buffer,n.data_ptr,n.width*n.height*4),n.width,n.height);e.width=n.width,e.height=n.height;let a=e.getContext("2d");return n.draw_cells(!1),a.putImageData(o,0,0),()=>{n.draw_cells(!1),a.putImageData(o,0,0)}},we=e=>{let t=[];try{return e((n,o)=>(t.unshift(()=>o(n)),n))}finally{t.forEach(n=>n())}},ee=(e,t,n)=>we(o=>{let a=o(e.createShader(e.VERTEX_SHADER),i=>e.deleteShader(i));if(e.shaderSource(a,t),e.compileShader(a),!e.getShaderParameter(a,e.COMPILE_STATUS))throw Error("vertex shader compilation failure: "+e.getShaderInfoLog(a));let r=o(e.createShader(e.FRAGMENT_SHADER),i=>e.deleteShader(i));if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw Error("fragment shader compilation failure: "+e.getShaderInfoLog(r));let s=o(e.createProgram(),i=>e.deleteProgram(i));if(e.attachShader(s,a),e.attachShader(s,r),e.linkProgram(s),!e.getProgramParameter(s,e.LINK_STATUS))throw Error("program link failure: "+e.getProgramInfoLog(s));return e.useProgram(s),s}),je=(e,t)=>{let{column_count:n,row_count:o}=t;e.width=m*n+1,e.height=m*o+1;let a=String.raw,r=e.getContext("webgl2",{preserveDrawingBuffer:!0});r.viewport(0,0,e.width,e.height);{let A=ee(r,a`#version 300 es
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
      `);r.uniform2f(r.getUniformLocation(A,"resolution"),e.width,e.height),r.uniform1f(r.getUniformLocation(A,"cellSize"),p),r.uniform4f(r.getUniformLocation(A,"gridColor"),I[0]/256,I[1]/256,I[2]/256,1),r.uniform1ui(r.getUniformLocation(A,"vertical"),1),r.drawArrays(r.LINES,0,t.column_count*2+2),r.uniform1ui(r.getUniformLocation(A,"vertical"),0),r.drawArrays(r.LINES,0,t.row_count*2+2)}let s=ee(r,a`#version 300 es
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
    `);r.uniform2f(r.getUniformLocation(s,"resolution"),r.canvas.width,r.canvas.height),r.uniform1i(r.getUniformLocation(s,"columnCount"),n),r.uniform1i(r.getUniformLocation(s,"cellSize"),p),r.uniform4f(r.getUniformLocation(s,"deadColor"),E[0]/256,E[1]/256,E[2]/256,1),r.uniform4f(r.getUniformLocation(s,"aliveColor"),x[0]/256,x[1]/256,x[2]/256,1),r.bindTexture(r.TEXTURE_2D,r.createTexture()),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST);let i=()=>{let A=new Uint8Array(g.buffer,t.cells_ptr,o*n);r.texImage2D(r.TEXTURE_2D,0,r.R8UI,n,o,0,r.RED_INTEGER,r.UNSIGNED_BYTE,A),r.drawArrays(r.TRIANGLES,0,o*n*6)};return i(),i};{let e=document.body.appendChild(document.createElement("canvas")),t=new j(200,200);t.random();let n=c=>Math.min(Math.floor(c),t.row_count-1),o=c=>Math.min(Math.floor(c),t.column_count-1),a=(c,u)=>{let d=e.getBoundingClientRect(),b=(c-d.x-1)*e.width/d.width,v=(u-d.y-1)*e.height/d.height;return[n(v/(p+1)),o(b/(p+1))]};addEventListener("pointerdown",c=>{if(c.target===e){let[u,d]=a(c.clientX,c.clientY);t.set_cell_alive(u,d,!0),i();let b=q=>{let[f,L]=a(q.clientX,q.clientY),re=Math.hypot(f-u,L-d),R=Math.atan2(f-u,L-d),ne=Math.sin(R),oe=Math.cos(R);for(let C=0;C<re;C++)t.set_cell_alive(n(u+C*ne),o(d+C*oe),!0);t.set_cell_alive(u,d,!0),u=f,d=L,i()},v=()=>{removeEventListener("pointerup",v),removeEventListener("pointercancel",v),removeEventListener("pointermove",b),_()};addEventListener("pointerup",v),addEventListener("pointercancel",v),addEventListener("pointermove",b),A()}});let r=w.appendChild(document.createElement("div"));r.innerHTML=`
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
  `,r.addEventListener("change",c=>{if(c.target instanceof HTMLInputElement){if(A(),c.target.name==="vastness"){let u=+c.target.value;t=new j(u,u),t.random()}_()}});let s=()=>(e.remove(),e.width=0,e.height=0,e=document.body.appendChild(document.createElement("canvas")),e.style.cursor="crosshair",e),i,A,_=()=>{switch(r.querySelector("[name=renderer]:checked").value){case"canvas-api":i=_e(s(),t);break;case"image-data":i=pe(s(),t);break;case"wasm":i=ve(s(),t);break;case"webgl2":i=je(s(),t);break;default:A=()=>{};return}({stop:A}=me(()=>{t.tick(),i()}))};_()}
