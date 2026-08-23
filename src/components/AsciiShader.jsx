import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const SCENE_FRAG = `
precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uPortrait;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float mapScene(vec3 p) {
  vec2 yz = rot(uTime * 0.62) * p.yz;
  p.y = yz.x;
  p.z = yz.y;
  vec2 xy = rot(uTime * 0.28 + 0.4) * p.xy;
  p.x = xy.x;
  p.y = xy.y;
  float ang = atan(p.z, p.x);
  float thick = 0.18 + 0.045 * sin(ang * 6.0 + uTime * 1.6);
  return sdTorus(p, vec2(0.78, thick));
}

vec3 calcNormal(vec3 p) {
  float e = 0.0018;
  return normalize(vec3(
    mapScene(p + vec3(e, 0.0, 0.0)) - mapScene(p - vec3(e, 0.0, 0.0)),
    mapScene(p + vec3(0.0, e, 0.0)) - mapScene(p - vec3(0.0, e, 0.0)),
    mapScene(p + vec3(0.0, 0.0, e)) - mapScene(p - vec3(0.0, 0.0, e))
  ));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv.x += mix(0.42, 0.0, uPortrait);
  uv.y += mix(0.04, -0.28, uPortrait);
  uv.x += (uMouse.x - 0.5) * mix(0.12, 0.04, uPortrait);
  uv.y += (uMouse.y - 0.5) * mix(0.08, 0.03, uPortrait);

  vec3 ro = vec3(0.0, 0.05, mix(2.45, 2.2, uPortrait));
  vec3 rd = normalize(vec3(uv, -1.35));

  float t = 0.0;
  float hit = 0.0;
  for (int i = 0; i < 64; i++) {
    vec3 p = ro + rd * t;
    float d = mapScene(p);
    if (d < 0.002) {
      hit = 1.0;
      break;
    }
    if (t > 8.0) break;
    t += d;
  }

  vec3 col = vec3(0.012, 0.01, 0.01);
  float star = step(0.9978, hash(floor(uv * 95.0)));
  col += vec3(0.45, 0.4, 0.34) * star * 0.55;

  if (hit > 0.5) {
    vec3 p = ro + rd * t;
    vec3 n = calcNormal(p);
    vec3 l1 = normalize(vec3(0.65, 0.55, 0.5));
    vec3 l2 = normalize(vec3(-0.4, -0.1, 0.7));
    float diff = pow(max(dot(n, l1), 0.0), 1.1);
    float fill = max(dot(n, l2), 0.0) * 0.18;
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 2.6);
    float spec = pow(max(dot(reflect(-l1, n), -rd), 0.0), 32.0);
    vec3 fire = vec3(1.0, 0.46, 0.12);
    vec3 cream = vec3(0.96, 0.93, 0.84);
    col = fire * (0.05 + diff * 0.95 + fill);
    col += fire * rim * 0.55;
    col += cream * spec * 0.65;
    col *= 1.15;
  }

  gl_FragColor = vec4(col, 1.0);
}
`

const ASCII_FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uScene;
uniform sampler2D uAtlas;
uniform vec2 uResolution;
uniform float uCell;
uniform float uChars;

void main() {
  vec2 cell = floor(gl_FragCoord.xy / uCell);
  vec2 sceneUv = (cell + 0.5) * uCell / uResolution;
  vec3 scene = texture2D(uScene, sceneUv).rgb;
  float lum = dot(scene, vec3(0.299, 0.587, 0.114));
  if (lum < 0.07) {
    gl_FragColor = vec4(0.02, 0.016, 0.014, 1.0);
    return;
  }
  lum = pow(clamp((lum - 0.07) / 0.78, 0.0, 1.0), 0.72);
  float idx = min(floor(lum * (uChars - 0.0001)), uChars - 1.0);
  vec2 inCell = fract(gl_FragCoord.xy / uCell);
  vec2 atlasUv = vec2((idx + inCell.x) / uChars, inCell.y);
  float glyph = texture2D(uAtlas, atlasUv).r;
  vec3 tint = mix(vec3(1.0, 0.46, 0.12), scene, 0.25);
  gl_FragColor = vec4(tint * glyph, 1.0);
}
`

const CHARS = ' .:;+*#%@'

function compile(gl, type, src) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || 'Shader compile failed')
  }
  return shader
}

function program(gl, vert, frag) {
  const p = gl.createProgram()
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vert))
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, frag))
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(p) || 'Program link failed')
  }
  return p
}

function makeAtlas(gl, cell) {
  const canvas = document.createElement('canvas')
  canvas.width = cell * CHARS.length
  canvas.height = cell
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#fff'
  ctx.font = `700 ${Math.floor(cell * 0.78)}px "IBM Plex Mono", ui-monospace, monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < CHARS.length; i += 1) {
    ctx.fillText(CHARS[i], (i + 0.5) * cell, cell * 0.54)
  }
  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return tex
}

function makeFbo(gl, w, h) {
  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  const fb = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
  return { tex, fb, w, h }
}

export default function AsciiShader() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    })

    if (!gl || gl.isContextLost()) return undefined

    let raf = 0
    let disposed = false
    let atlas
    let fbo
    let buffer
    let onResize = null
    let observer = null
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onMove = (event) => {
      if (canvas.clientHeight > canvas.clientWidth) return
      const rect = canvas.getBoundingClientRect()
      mouse.tx = (event.clientX - rect.left) / rect.width
      mouse.ty = 1 - (event.clientY - rect.top) / rect.height
    }

    try {
      const sceneProg = program(gl, VERT, SCENE_FRAG)
      const asciiProg = program(gl, VERT, ASCII_FRAG)

      buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      )

      const bindAttrib = (prog) => {
        const loc = gl.getAttribLocation(prog, 'aPos')
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      }

      const resize = () => {
        if (gl.isContextLost()) return
        const cssW = canvas.clientWidth
        const cssH = canvas.clientHeight
        const portrait = cssH > cssW
        const dpr = Math.min(window.devicePixelRatio || 1, portrait ? 1.5 : 1.25)
        const width = Math.max(1, Math.floor(cssW * dpr))
        const height = Math.max(1, Math.floor(cssH * dpr))
        if (fbo && canvas.width === width && canvas.height === height) return
        canvas.width = width
        canvas.height = height
        const cellCss = portrait ? 9 : 11
        const cell = Math.max(5, Math.round(cellCss * dpr))
        const fw = Math.max(1, Math.ceil(width / cell))
        const fh = Math.max(1, Math.ceil(height / cell))
        if (fbo?.tex) gl.deleteTexture(fbo.tex)
        if (fbo?.fb) gl.deleteFramebuffer(fbo.fb)
        fbo = makeFbo(gl, fw, fh)
        fbo.cell = cell
        fbo.portrait = portrait ? 1 : 0
        if (atlas) gl.deleteTexture(atlas)
        atlas = makeAtlas(gl, 64)
      }

      onResize = resize
      resize()
      observer = new ResizeObserver(onResize)
      observer.observe(canvas)
      window.addEventListener('resize', onResize)
      window.addEventListener('orientationchange', onResize)
      window.addEventListener('pointermove', onMove, { passive: true })

      const locScene = {
        res: gl.getUniformLocation(sceneProg, 'uResolution'),
        time: gl.getUniformLocation(sceneProg, 'uTime'),
        mouse: gl.getUniformLocation(sceneProg, 'uMouse'),
        portrait: gl.getUniformLocation(sceneProg, 'uPortrait'),
      }
      const locAscii = {
        scene: gl.getUniformLocation(asciiProg, 'uScene'),
        atlas: gl.getUniformLocation(asciiProg, 'uAtlas'),
        res: gl.getUniformLocation(asciiProg, 'uResolution'),
        cell: gl.getUniformLocation(asciiProg, 'uCell'),
        chars: gl.getUniformLocation(asciiProg, 'uChars'),
      }

      const start = performance.now()
      let frozen = 0

      const frame = (now) => {
        if (disposed || gl.isContextLost() || !fbo || !atlas) return
        const t = reduce ? frozen : (now - start) / 1000
        if (reduce && frozen === 0) frozen = t

        if (fbo.portrait && !reduce) {
          mouse.tx = 0.5 + Math.sin(t * 0.18) * 0.12
          mouse.ty = 0.52 + Math.cos(t * 0.13) * 0.08
        }
        mouse.x += (mouse.tx - mouse.x) * 0.045
        mouse.y += (mouse.ty - mouse.y) * 0.045

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.fb)
        gl.viewport(0, 0, fbo.w, fbo.h)
        gl.useProgram(sceneProg)
        bindAttrib(sceneProg)
        gl.uniform2f(locScene.res, fbo.w, fbo.h)
        gl.uniform1f(locScene.time, t)
        gl.uniform2f(locScene.mouse, mouse.x, mouse.y)
        gl.uniform1f(locScene.portrait, fbo.portrait)
        gl.drawArrays(gl.TRIANGLES, 0, 3)

        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.useProgram(asciiProg)
        bindAttrib(asciiProg)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, fbo.tex)
        gl.uniform1i(locAscii.scene, 0)
        gl.activeTexture(gl.TEXTURE1)
        gl.bindTexture(gl.TEXTURE_2D, atlas)
        gl.uniform1i(locAscii.atlas, 1)
        gl.uniform2f(locAscii.res, canvas.width, canvas.height)
        gl.uniform1f(locAscii.cell, fbo.cell)
        gl.uniform1f(locAscii.chars, CHARS.length)
        gl.drawArrays(gl.TRIANGLES, 0, 3)

        raf = requestAnimationFrame(frame)
      }

      raf = requestAnimationFrame(frame)

      document.fonts?.ready?.then(() => {
        if (!disposed && !gl.isContextLost()) {
          if (atlas) gl.deleteTexture(atlas)
          atlas = makeAtlas(gl, 64)
        }
      })
    } catch (error) {
      console.error('ASCII shader failed', error)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      if (observer) observer.disconnect()
      if (onResize) {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onResize)
      }
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
