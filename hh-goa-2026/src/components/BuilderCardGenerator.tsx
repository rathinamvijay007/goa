import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Upload, Download, Share2, Copy, RefreshCw, Move,
  CheckCircle2, AlertCircle, X, Lock, ZoomIn,
} from 'lucide-react';

// ─── Share caption ──────────────────────────────────────────────────
const SHARE_CAPTION = "I'm going to Hacker House Goa 2026 ⚡🏖️ #FrameInGoa";

// ─── Template config type ───────────────────────────────────────────
interface TextPos { x: number; y: number; size: number; align?: CanvasTextAlign }
interface TemplateConfig {
  id: number;
  label: string;
  src: string | null;
  available: boolean;
  exportW: number;
  exportH: number;
  // Photo area (drawn ON TOP of template background)
  photo: { cx: number; cy: number; size: number; };
  namePos:  TextPos;
  rolePos:  TextPos;
  badgePos: TextPos;
  colors: {
    text: string;
    textShadow: string;
    photoBorder: string;
    photoBg: string[];        // gradient stops to sync with template palette
    pillBg: string;
    pillBorder: string;
  };
}

// ─── Templates ──────────────────────────────────────────────────────
const TEMPLATES: TemplateConfig[] = [
  {
    id: 1,
    label: 'Retro Cathedral',
    src: '/templates/template-1-v2.jpg',
    available: true,
    exportW: 2048,
    exportH: 1142,
    // Photo sits in the lower-left, perfectly round
    photo: { cx: 0.22, cy: 0.65, size: 0.50 },
    // Text overlays on the right side
    namePos:  { x: 0.60, y: 0.50, size: 0.048, align: 'center' },
    rolePos:  { x: 0.58, y: 0.63, size: 0.028 },
    badgePos: { x: 0.58, y: 0.78, size: 0.015 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#f26522', // Sun orange to sync with template/branding
      photoBg: ['#c94080', '#8b3fa0', '#5a2d82'],  // pink→purple to match template
      pillBg: 'rgba(28,35,51,0.7)',
      pillBorder: '#f26522',
    },
  },
  {
    id: 2,
    label: 'Silver Waterfall',
    src: '/templates/template-2-v3.jpg',
    available: true,
    exportW: 2048,
    exportH: 1142,
    // Photo sits in the lower-left, matching the first template layout
    photo: { cx: 0.22, cy: 0.65, size: 0.50 },
    // Text overlays on the right side
    namePos:  { x: 0.60, y: 0.50, size: 0.048, align: 'center' },
    rolePos:  { x: 0.58, y: 0.63, size: 0.028 },
    badgePos: { x: 0.58, y: 0.78, size: 0.015 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#729787', // Muted mint green from the silver title outline
      photoBg: ['#c9dbd5', '#729787', '#1c3429'],  // Silver/green gradient
      pillBg: 'rgba(28,35,51,0.7)',
      pillBorder: '#729787',
    },
  },
  {
    id: 3,
    label: 'Red Temple',
    src: '/templates/template-3.jpg',
    available: true,
    exportW: 2048,
    exportH: 1142,
    // Photo on the left side in the green sky area
    photo: { cx: 0.22, cy: 0.65, size: 0.50 },
    // Text overlays on the right side
    namePos:  { x: 0.70, y: 0.54, size: 0.034, align: 'center' },
    rolePos:  { x: 0.70, y: 0.64, size: 0.019 },
    badgePos: { x: 0.70, y: 0.78, size: 0.015 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#c44535', // Reddish orange from the temple roof
      photoBg: ['#79a68a', '#478363', '#23523b'],  // Green gradient matching the left sky
      pillBg: 'rgba(28,35,51,0.7)',
      pillBorder: '#c44535',
    },
  },
  {
    id: 4,
    label: 'Sunset Beach',
    src: '/templates/template-4.jpg',
    available: true,
    exportW: 2048,
    exportH: 1142,
    // Photo sits in the lower-left, matching the first three templates
    photo: { cx: 0.22, cy: 0.65, size: 0.50 },
    // Text overlays on the right side
    namePos:  { x: 0.60, y: 0.50, size: 0.048, align: 'center' },
    rolePos:  { x: 0.58, y: 0.63, size: 0.028 },
    badgePos: { x: 0.58, y: 0.78, size: 0.015 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#e66236', // Sunset orange from the title
      photoBg: ['#79afb5', '#408390', '#1c5e6d'],  // Teal/ocean gradient
      pillBg: 'rgba(28,35,51,0.7)',
      pillBorder: '#e66236',
    },
  },
  {
    id: 5,
    label: 'Aguada Fort',
    src: '/templates/template-5.jpg',
    available: true,
    exportW: 2048,
    exportH: 1142,
    // Photo sits in the lower-left, matching the first three templates
    photo: { cx: 0.22, cy: 0.65, size: 0.50 },
    // Text overlays on the right side
    namePos:  { x: 0.60, y: 0.50, size: 0.048, align: 'center' },
    rolePos:  { x: 0.58, y: 0.63, size: 0.028 },
    badgePos: { x: 0.58, y: 0.78, size: 0.015 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#d3984d', // Warm gold from the title typography
      photoBg: ['#a26c48', '#4b5e3d', '#1d3126'],  // Earthy browns and deep greens
      pillBg: 'rgba(28,35,51,0.7)',
      pillBorder: '#d3984d',
    },
  },
];

const BADGES = [
  'BUILDER', 'HACKER', 'SHIPPER', 'FOUNDER',
  'AI AGENT DEV', 'WEB3 DEV', 'INFRA ENGINEER', 'DESIGNER',
];

// ─── Component ──────────────────────────────────────────────────────
export default function BuilderCardGenerator() {
  const [tplIdx, setTplIdx] = useState(0);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [badge, setBadge] = useState('BUILDER');

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1.0);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const userImgRef = useRef<HTMLImageElement | null>(null);
  const tplImgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const tpl = TEMPLATES[tplIdx];

  // ─── Load template image ────────────────────────────────────────
  useEffect(() => {
    tplImgRef.current = null;
    if (!tpl.src) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { tplImgRef.current = img; };
    img.src = tpl.src;
  }, [tpl.src]);

  // ─── Toast ──────────────────────────────────────────────────────
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(prev => prev === msg ? null : prev), 4500);
  };

  // ─── File upload (JPG / PNG / HEIC) ─────────────────────────────
  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setError(null);
    setIsProcessing(true);

    try {
      let processable = file;
      const isHeic = /\.(heic|heif)$/i.test(file.name) ||
                     file.type === 'image/heic' || file.type === 'image/heif';
      if (isHeic) {
        try {
          const heic2any = (await import('heic2any')).default;
          const blob = await heic2any({ blob: file, toType: 'image/png' });
          const result = Array.isArray(blob) ? blob[0] : blob;
          processable = new File([result], 'converted.png', { type: 'image/png' });
        } catch {
          setError('Could not convert HEIC image. Try uploading a JPG or PNG.');
          setIsProcessing(false);
          return;
        }
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          userImgRef.current = img;
          setImageSrc(src);
          setZoom(1.0);
          setPanX(0);
          setPanY(0);
          setIsProcessing(false);
        };
        img.onerror = () => {
          setError('Failed to load image.');
          setIsProcessing(false);
        };
        img.src = src;
      };
      reader.readAsDataURL(processable);
    } catch {
      setError('Something went wrong processing the image.');
      setIsProcessing(false);
    }
  };

  // ─── Canvas render ──────────────────────────────────────────────
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = tpl.exportW;
    const H = tpl.exportH;
    canvas.width = W;
    canvas.height = H;

    ctx.fillStyle = '#1c2333';
    ctx.fillRect(0, 0, W, H);

    // ── 1. Draw template as full background ──
    if (tplImgRef.current) {
      ctx.drawImage(tplImgRef.current, 0, 0, W, H);
    }

    // ── 2. Photo region (Analog / Screen-printed style) ──
    const p = tpl.photo;
    const diameter = p.size * H;
    const radius = diameter / 2;
    const cx = p.cx * W;
    const cy = p.cy * H;
    
    // Helper to draw a slightly irregular, organic circle path
    const drawIrregularCircle = (ctxRef: CanvasRenderingContext2D, center_x: number, center_y: number, r: number, noiseScale: number) => {
      const steps = 70;
      ctxRef.beginPath();
      for (let i = 0; i < steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        // Subtle waviness
        const rOffset = Math.sin(angle * 14) * noiseScale + Math.cos(angle * 9) * (noiseScale * 0.6);
        const x = center_x + Math.cos(angle) * (r + rOffset);
        const y = center_y + Math.sin(angle) * (r + rOffset);
        if (i === 0) ctxRef.moveTo(x, y);
        else ctxRef.lineTo(x, y);
      }
      ctxRef.closePath();
    };

    // A. Soft, printed shadow (warm, dark magenta/purple for depth)
    ctx.save();
    ctx.shadowColor = 'rgba(50, 10, 40, 0.55)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 12;
    ctx.fillStyle = '#220b29'; // dark base
    drawIrregularCircle(ctx, cx, cy, radius, 1.5);
    ctx.fill();
    ctx.restore();

    // B. Clipping path for photo (irregular edge)
    ctx.save();
    drawIrregularCircle(ctx, cx, cy, radius - 2, 2.0); // Slightly smaller to allow border bleed
    ctx.clip();

    // Draw user photo
    if (userImgRef.current) {
      const img = userImgRef.current;
      const coverScale = Math.max(diameter / img.width, diameter / img.height);
      const dw = img.width * coverScale * zoom;
      const dh = img.height * coverScale * zoom;
      const displayEl = canvas.getBoundingClientRect();
      const ratio = displayEl.width > 0 ? W / displayEl.width : 2;
      const drawX = cx + panX * ratio;
      const drawY = cy + panY * ratio;
      ctx.drawImage(img, drawX - dw / 2, drawY - dh / 2, dw, dh);
    } else {
      ctx.fillStyle = 'rgba(28,35,51,0.6)';
      ctx.fillRect(cx - radius, cy - radius, diameter, diameter);
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.font = `bold ${W * 0.02}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('YOUR PHOTO', cx, cy);
    }

    // C. Inner feathered bleed (Magenta creeping in)
    const innerGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius);
    innerGrad.addColorStop(0, 'rgba(150, 40, 120, 0)');
    innerGrad.addColorStop(0.8, 'rgba(200, 60, 120, 0.25)');
    innerGrad.addColorStop(1, 'rgba(150, 20, 80, 0.7)');
    ctx.fillStyle = innerGrad;
    // We are still clipped, so this fills the inside edges
    ctx.fillRect(cx - radius, cy - radius, diameter, diameter);
    ctx.restore();

    // D. Analog screen-print registration border
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    
    // Draw 3 offset strokes imitating misaligned printing plates
    const strokes = [
      { color: 'rgba(242, 101, 34, 0.8)', ox: 3, oy: -1, noise: 3.5, width: 6 },  // Orange
      { color: 'rgba(201, 64, 128, 0.8)', ox: -2, oy: 3, noise: 4.5, width: 7 },  // Magenta
      { color: 'rgba(255, 215, 0, 0.65)', ox: 0, oy: 4, noise: 2.5, width: 5 }    // Yellow
    ];

    strokes.forEach(s => {
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      drawIrregularCircle(ctx, cx + s.ox, cy + s.oy, radius, s.noise);
      ctx.stroke();
    });
    ctx.restore();

    // E. Edge grain / halftone speckles
    ctx.save();
    ctx.fillStyle = 'rgba(242, 101, 34, 0.7)'; // Orange grain
    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius + (Math.random() * 12 - 6);
      const s = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, s, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(140, 30, 90, 0.7)'; // Dark magenta grain
    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius + (Math.random() * 16 - 8);
      const s = Math.random() * 2 + 0.5;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, s, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // ── 3. Text overlays ──
    const setShadow = (blur: number) => {
      ctx.shadowColor = tpl.colors.textShadow;
      ctx.shadowBlur = blur;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
    };
    const clearShadow = () => {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    };

    ctx.fillStyle = tpl.colors.text;

    // Name
    const drawName = name.trim();
    if (drawName) {
      const ns = Math.round(W * tpl.namePos.size);
      ctx.font = `bold ${ns}px "Space Grotesk", sans-serif`;
      ctx.textAlign = tpl.namePos.align || 'center';
      ctx.textBaseline = 'middle';
      setShadow(16);
      ctx.fillText(drawName.toUpperCase(), tpl.namePos.x * W, tpl.namePos.y * H);
      clearShadow();
    }

    // Role
    const drawRole = role.trim();
    if (drawRole) {
      const rs = Math.round(W * tpl.rolePos.size);
      ctx.font = `500 ${rs}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      setShadow(12);
      ctx.globalAlpha = 0.92;
      ctx.fillText(drawRole, tpl.rolePos.x * W, tpl.rolePos.y * H);
      ctx.globalAlpha = 1;
      clearShadow();
    }

    // Badge pill
    if (badge) {
      const scaleByBadge = badge === 'AI AGENT DEV' ? 2.8 : 2.4;
      const ts = Math.round(W * tpl.badgePos.size * scaleByBadge);
      const pillText = `⚡ ${badge} ⚡`;
      ctx.font = `bold ${ts}px "Space Grotesk", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const met = ctx.measureText(pillText);
      const pillW = met.width + ts * 2.5;
      const pillH = ts * 2.8;
      const pillCx = tpl.badgePos.x * W;
      const pillCy = tpl.badgePos.y * H;

      ctx.fillStyle = tpl.colors.pillBg;
      ctx.beginPath();
      ctx.roundRect(pillCx - pillW / 2, pillCy - pillH / 2, pillW, pillH, pillH / 2);
      ctx.fill();

      ctx.strokeStyle = tpl.colors.pillBorder;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(pillCx - pillW / 2, pillCy - pillH / 2, pillW, pillH, pillH / 2);
      ctx.stroke();

      ctx.fillStyle = tpl.colors.text;
      ctx.fillText(pillText, pillCx, pillCy);
    }
  }, [tpl, name, role, badge, zoom, panX, panY, imageSrc]);

  // Re-render on dependency change
  useEffect(() => { renderCanvas(); }, [renderCanvas]);

  // Re-render once template image loads
  useEffect(() => {
    if (!tpl.src) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { tplImgRef.current = img; renderCanvas(); };
    img.src = tpl.src;
  }, [tpl.src, renderCanvas]);

  // ─── Mouse drag ─────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panX, y: e.clientY - panY };
  };
  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setPanX(e.clientX - dragStartRef.current.x);
    setPanY(e.clientY - dragStartRef.current.y);
  };
  const onMouseUp = () => setIsDragging(false);

  // ─── Touch drag ────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    setIsDragging(true);
    dragStartRef.current = { x: t.clientX - panX, y: t.clientY - panY };
  };
  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    setPanX(t.clientX - dragStartRef.current.x);
    setPanY(t.clientY - dragStartRef.current.y);
  };
  const onTouchEnd = () => setIsDragging(false);

  // ─── Download ───────────────────────────────────────────────────
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `hhgoa-2026-${(name || 'builder').toLowerCase().replace(/\s+/g, '-')}.png`;
      a.href = url;
      a.click();
      showToast('Image downloaded!');
    } catch {
      setError('Failed to export image.');
    }
  };

  // ─── Copy ───────────────────────────────────────────────────────
  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsCopying(true);
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) { setIsCopying(false); return; }
        if (navigator.clipboard && window.ClipboardItem) {
          try {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            showToast('Copied! Paste (Ctrl/Cmd+V) into your X post.');
          } catch { handleDownload(); }
        } else { handleDownload(); }
        setIsCopying(false);
      }, 'image/png');
    } catch { setIsCopying(false); }
  };

  // ─── Share to X ─────────────────────────────────────────────────
  const handleShare = () => {
    handleDownload();
    try {
      canvasRef.current?.toBlob(async (blob) => {
        if (blob && navigator.clipboard && window.ClipboardItem) {
          try { await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]); } catch {}
        }
      }, 'image/png');
    } catch {}
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_CAPTION)}`,
      '_blank', 'noopener,noreferrer'
    );
    showToast('Image downloaded — attach it to your tweet! (Also copied to clipboard)');
  };

  // ─── UI ─────────────────────────────────────────────────────────
  return (
    <section id="generator" className="bg-background py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-5">

        {/* Header */}
        <p className="label-mono text-sun font-bold">Frame in Goa</p>
        <h2 className="mt-1 text-5xl md:text-7xl text-ink leading-none">
          GET YOUR<br />BUILDER FRAME
        </h2>
        <p className="mt-3 text-base text-muted-foreground max-w-lg">
          Upload a photo, fill your details, download your branded HH Goa 2026 card. Share it on X. No signup.
        </p>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-16 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 card-hard bg-sun text-ink p-4 flex items-center gap-3 label-mono text-xs"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="flex-1">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 border-2 border-ink bg-red-100 text-red-900 text-sm flex items-center justify-between label-mono">
            <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</span>
            <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Template Selector */}
        <div className="mt-8">
          <p className="label-mono text-muted-foreground mb-3">Choose Template</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {TEMPLATES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => t.available && setTplIdx(i)}
                disabled={!t.available}
                className={`relative shrink-0 w-32 sm:w-40 border-2 aspect-video flex items-center justify-center overflow-hidden transition-all rounded-sm ${
                  i === tplIdx
                    ? 'border-sun shadow-[3px_3px_0_0_var(--ink)] ring-2 ring-sun/30'
                    : t.available
                      ? 'border-ink hover:border-sun/50'
                      : 'border-ink/20 opacity-35 cursor-not-allowed'
                }`}
              >
                {t.src ? (
                  <img src={t.src} alt={t.label} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1 bg-muted w-full h-full">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[9px] label-mono text-muted-foreground">SOON</span>
                  </div>
                )}
                {i === tplIdx && (
                  <div className="absolute bottom-0 left-0 right-0 bg-sun/90 text-ink label-mono text-[8px] text-center py-0.5 font-bold">
                    SELECTED
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-col layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left: Preview Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full card-hard p-2 md:p-3 overflow-hidden bg-ink/5">
              <canvas
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="w-full h-auto cursor-grab active:cursor-grabbing"
                style={{ touchAction: 'none' }}
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm flex flex-col items-center justify-center text-sun label-mono text-xs">
                  <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                  Processing…
                </div>
              )}
            </div>

            {imageSrc && (
              <p className="mt-2 label-mono text-xs text-muted-foreground flex items-center gap-1">
                <Move className="w-3 h-3" /> Drag photo to reposition
              </p>
            )}

            {/* Action buttons */}
            <div className="w-full grid grid-cols-3 gap-3 mt-5">
              <button
                onClick={handleDownload}
                className="py-3 border-2 border-ink bg-sun text-ink font-bold label-mono text-xs shadow-[3px_3px_0_0_var(--ink)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download
              </button>
              <button
                onClick={handleShare}
                className="py-3 border-2 border-ink bg-[#1DA1F2] text-white font-bold label-mono text-xs shadow-[3px_3px_0_0_var(--ink)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" /> Share X
              </button>
              <button
                onClick={handleCopy}
                disabled={isCopying}
                className="py-3 border-2 border-ink bg-card text-ink font-bold label-mono text-xs shadow-[3px_3px_0_0_var(--ink)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Copy className="w-4 h-4" /> {isCopying ? '…' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="lg:col-span-5 space-y-5 card-hard p-5 md:p-7">
            <h3 className="font-display text-2xl uppercase tracking-wide border-b-2 border-ink pb-3 text-ink">
              Your Details
            </h3>

            {/* Upload */}
            <div>
              <label className="block label-mono text-muted-foreground mb-2">Photo</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.heic,.heif"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-ink bg-card hover:bg-muted text-ink font-bold label-mono text-xs flex items-center justify-center gap-3 transition-colors"
              >
                <Upload className="w-5 h-5 text-sun" />
                {imageSrc ? 'Change Photo' : 'Upload Photo (JPG / PNG / HEIC)'}
              </button>
            </div>

            {/* Zoom */}
            {imageSrc && (
              <div className="p-3 border border-ink bg-muted space-y-2">
                <div className="flex justify-between label-mono text-muted-foreground">
                  <span className="flex items-center gap-1"><ZoomIn className="w-3 h-3" /> Zoom</span>
                  <span>{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range" min="0.5" max="3" step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-sun cursor-pointer"
                />
                <button
                  onClick={() => { setZoom(1); setPanX(0); setPanY(0); }}
                  className="label-mono text-xs text-muted-foreground hover:text-ink transition-colors"
                >
                  ↺ Reset Position
                </button>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block label-mono text-muted-foreground mb-1">Name</label>
              <input
                type="text" maxLength={24}
                value={name} onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivers"
                className="w-full border-2 border-ink bg-card text-ink p-3 text-sm focus:outline-none focus:border-sun transition-colors"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block label-mono text-muted-foreground mb-1">Stack / Role</label>
              <input
                type="text" maxLength={36}
                value={role} onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Fullstack · AI Agent Dev"
                className="w-full border-2 border-ink bg-card text-ink p-3 text-sm focus:outline-none focus:border-sun transition-colors"
              />
            </div>

            {/* Badge */}
            <div>
              <label className="block label-mono text-muted-foreground mb-1">Builder Title</label>
              <select
                value={badge} onChange={(e) => setBadge(e.target.value)}
                className="w-full border-2 border-ink bg-card text-ink p-3 text-sm focus:outline-none focus:border-sun transition-colors"
              >
                {BADGES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
