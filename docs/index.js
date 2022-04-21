var T="./wasm_game_of_life_bg.wasm";var ae=typeof TextDecoder>"u"?(0,module.require)("util").TextDecoder:TextDecoder,D=new ae("utf-8",{ignoreBOM:!0,fatal:!0});D.decode();var S=null;function se(){return(S===null||S.buffer!==g.buffer)&&(S=new Uint8Array(g.buffer)),S}function ie(e,t){return D.decode(se().subarray(e,e+t))}var f=class{static __wrap(t){let n=Object.create(f.prototype);return n.ptr=t,n}__destroy_into_raw(){let t=this.ptr;return this.ptr=0,t}free(){let t=this.__destroy_into_raw();F(t)}constructor(t,n){let o=O(t,n);return f.__wrap(o)}random(){P(this.ptr)}get as_ptr(){return $(this.ptr)}get cells_ptr(){return B(this.ptr)}get row_count(){return K(this.ptr)>>>0}get column_count(){return N(this.ptr)>>>0}set_cell_alive(t,n,o){G(this.ptr,t,n,o)}tick(){z(this.ptr)}},j=class{static __wrap(t){let n=Object.create(j.prototype);return n.ptr=t,n}__destroy_into_raw(){let t=this.ptr;return this.ptr=0,t}free(){let t=this.__destroy_into_raw();X(t)}constructor(t,n,o,a,r){let s=H(t,n,o,a,r);return j.__wrap(s)}get width(){return W(this.ptr)>>>0}get height(){return V(this.ptr)>>>0}get data_ptr(){return Y(this.ptr)}draw_cells(t){J(this.ptr,t)}};function M(){return Date.now()}function U(e,t){throw new Error(ie(e,t))}var le={["./wasm_game_of_life_bg.js"]:{__wbg_now_c3277d0b8a8f625b:M,__wbindgen_throw:U}};async function Ae(e,t){if(typeof e=="string"){let n=await fetch(e);if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(n,t)}catch(o){if(n.headers.get("Content-Type")!="application/wasm")console.warn(o);else throw o}e=await n.arrayBuffer()}return await WebAssembly.instantiate(e,t)}var{instance:A,module:be}=await Ae(T,le),g=A.exports.memory,F=A.exports.__wbg_universe_free,O=A.exports.universe_new,P=A.exports.universe_random,$=A.exports.universe_as_ptr,B=A.exports.universe_cells_ptr,K=A.exports.universe_row_count,N=A.exports.universe_column_count,G=A.exports.universe_set_cell_alive,z=A.exports.universe_tick,X=A.exports.__wbg_universecanvasdrawer_free,H=A.exports.universecanvasdrawer_new,W=A.exports.universecanvasdrawer_width,V=A.exports.universecanvasdrawer_height,Y=A.exports.universecanvasdrawer_data_ptr,J=A.exports.universecanvasdrawer_draw_cells;var v=document.body.appendChild(document.createElement("aside"));v.style.position="fixed";v.style.top="16px";v.style.right="16px";v.style.padding="4px";v.style.background="rgba(255,255,255,.8)";v.style.whiteSpace="nowrap";v.style.userSelect="none";var p=3,m=p+1,I=[204,204,204],E=[255,255,255],x=[0,0,0],Z=([e,t,n])=>`rgb(${e},${t},${n})`,y=([e,t,n])=>(255<<24)+(n<<16)+(t<<8)+e,ue=(()=>{let e=v.appendChild(document.createElement("div"));e.style.float="right",e.style.color="hsl(150,100%,50%)",e.style.textShadow="1px 1px 1px hsl(150,100%,20%)",e.style.fontVariantNumeric="tabular-nums",e.textContent="0 fps";let t=0,n=performance.now();return setInterval(()=>{let o=performance.now();e.textContent=`${Math.round(t*1e3/(o-n))} fps`,t=0,n=o},512),()=>t++})(),de=e=>{let t,n=()=>{e(),ue(),t=requestAnimationFrame(n)};return n(),{stop:()=>t!==void 0&&cancelAnimationFrame(t)}},k=(e,t,n)=>{let{row_count:o,column_count:a}=e,r=new Uint8Array(g.buffer,e.cells_ptr,o*a),s=0;for(let i=0;i<o;i++)for(let c=0;c<a;c++){let _=r[s];(!n||_&2)&&t(i,c,_&1),s++}},ee=e=>{let t=e.getImageData(0,0,e.canvas.width,e.canvas.height),n=new Int32Array(t.data.buffer),o=y(I);for(let a=0;a<e.canvas.width;a+=m)for(let r=0;r<e.canvas.height;r++)n[r*e.canvas.width+a]=o;for(let a=0;a<e.canvas.height;a+=m)for(let r=0;r<e.canvas.width;r++)n[a*e.canvas.width+r]=o;e.putImageData(t,0,0)},me=(e,t)=>{e.width=m*t.column_count+1,e.height=m*t.row_count+1;let n=e.getContext("2d");ee(n);let o=Z(E),a=Z(x),r=(s,i,c)=>{n.fillStyle=c?a:o,n.fillRect(i*m+1,s*m+1,p,p)};return k(t,r),()=>k(t,r,!0)},_e=(e,t)=>{e.width=m*t.column_count+1,e.height=m*t.row_count+1;let n=e.getContext("2d");ee(n);let o=n.getImageData(0,0,e.width,e.height),a=new Int32Array(o.data.buffer),r=(_,l,u,d,b)=>{let w=_+l*e.width;for(let q=0;q<d;q++){for(let h=0;h<u;h++)a[w+h]=b;w+=e.width}},s=y(E),i=y(x),c=(_,l,u)=>{r(l*m+1,_*m+1,p,p,u?i:s)};return k(t,c),n.putImageData(o,0,0),()=>{k(t,c,!0),n.putImageData(o,0,0)}},pe=(e,t)=>{let n=new j(t.as_ptr,p,y(I),y(E),y(x)),o=new ImageData(new Uint8ClampedArray(g.buffer,n.data_ptr,n.width*n.height*4),n.width,n.height);e.width=n.width,e.height=n.height;let a=e.getContext("2d");return n.draw_cells(!1),a.putImageData(o,0,0),()=>{n.draw_cells(!1),a.putImageData(o,0,0)}},we=e=>{let t=[];try{return e((n,o)=>(t.unshift(()=>o(n)),n))}finally{t.forEach(n=>n())}},Q=(e,t,n)=>we(o=>{let a=o(e.createShader(e.VERTEX_SHADER),i=>e.deleteShader(i));if(e.shaderSource(a,t),e.compileShader(a),!e.getShaderParameter(a,e.COMPILE_STATUS))throw Error("vertex shader compilation failure: "+e.getShaderInfoLog(a));let r=o(e.createShader(e.FRAGMENT_SHADER),i=>e.deleteShader(i));if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw Error("fragment shader compilation failure: "+e.getShaderInfoLog(r));let s=o(e.createProgram(),i=>e.deleteProgram(i));if(e.attachShader(s,a),e.attachShader(s,r),e.linkProgram(s),!e.getProgramParameter(s,e.LINK_STATUS))throw Error("program link failure: "+e.getProgramInfoLog(s));return e.useProgram(s),s}),ve=(e,t)=>{let{column_count:n,row_count:o}=t;e.width=m*n+1,e.height=m*o+1;let a=String.raw,r=e.getContext("webgl2",{preserveDrawingBuffer:!0});r.viewport(0,0,e.width,e.height);{let c=Q(r,a`#version 300 es
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
      `);r.uniform2f(r.getUniformLocation(c,"resolution"),e.width,e.height),r.uniform1f(r.getUniformLocation(c,"cellSize"),p),r.uniform4f(r.getUniformLocation(c,"gridColor"),I[0]/256,I[1]/256,I[2]/256,1),r.uniform1ui(r.getUniformLocation(c,"vertical"),1),r.drawArrays(r.LINES,0,t.column_count*2+2),r.uniform1ui(r.getUniformLocation(c,"vertical"),0),r.drawArrays(r.LINES,0,t.row_count*2+2)}let s=Q(r,a`#version 300 es
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
    `);r.uniform2f(r.getUniformLocation(s,"resolution"),r.canvas.width,r.canvas.height),r.uniform1i(r.getUniformLocation(s,"columnCount"),n),r.uniform1i(r.getUniformLocation(s,"cellSize"),p),r.uniform4f(r.getUniformLocation(s,"deadColor"),E[0]/256,E[1]/256,E[2]/256,1),r.uniform4f(r.getUniformLocation(s,"aliveColor"),x[0]/256,x[1]/256,x[2]/256,1),r.bindTexture(r.TEXTURE_2D,r.createTexture()),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST);let i=()=>{let c=new Uint8Array(g.buffer,t.cells_ptr,o*n);r.texImage2D(r.TEXTURE_2D,0,r.R8UI,n,o,0,r.RED_INTEGER,r.UNSIGNED_BYTE,c),r.drawArrays(r.TRIANGLES,0,o*n*6)};return i(),i};{let e=document.body.appendChild(document.createElement("canvas")),t=new f(200,200);t.random();let n=l=>Math.min(Math.floor(l),t.row_count-1),o=l=>Math.min(Math.floor(l),t.column_count-1),a=(l,u)=>{let d=e.getBoundingClientRect(),b=(l-d.x-1)*e.width/d.width,w=(u-d.y-1)*e.height/d.height;return[n(w/(p+1)),o(b/(p+1))]};addEventListener("pointerdown",l=>{if(l.target===e){let[u,d]=a(l.clientX,l.clientY);t.set_cell_alive(u,d,!0),i();let b=q=>{let[h,L]=a(q.clientX,q.clientY),te=Math.hypot(h-u,L-d),R=Math.atan2(h-u,L-d),re=Math.sin(R),ne=Math.cos(R);for(let C=0;C<te;C++)t.set_cell_alive(n(u+C*re),o(d+C*ne),!0);t.set_cell_alive(u,d,!0),u=h,d=L,i()},w=()=>{removeEventListener("pointerup",w),removeEventListener("pointercancel",w),removeEventListener("pointermove",b),_()};addEventListener("pointerup",w),addEventListener("pointercancel",w),addEventListener("pointermove",b),c()}});let r=v.appendChild(document.createElement("div"));r.innerHTML=`
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
  `,r.addEventListener("change",l=>{if(l.target instanceof HTMLInputElement){if(c(),l.target.name==="vastness"){let u=+l.target.value;t=new f(u,u),t.random()}_()}});let s=()=>(e.remove(),e.width=0,e.height=0,e=document.body.appendChild(document.createElement("canvas")),e.style.cursor="crosshair",e),i,c,_=()=>{switch(r.querySelector("[name=renderer]:checked").value){case"canvas-api":i=me(s(),t);break;case"image-data":i=_e(s(),t);break;case"wasm":i=pe(s(),t);break;case"webgl2":i=ve(s(),t);break;default:c=()=>{};return}({stop:c}=de(()=>{t.tick(),i()}))};_()}
