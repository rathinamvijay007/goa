import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Download, Share2, Copy, CheckCircle2, AlertCircle, X, Loader2,
} from 'lucide-react';

const SHARE_CAPTION = "I'm building at Hacker House Goa 2026 🏖️ #HHGoa2026";

// ─── Template config type ───────────────────────────────────────────
interface TextPos { x: number; y: number; size: number; align?: CanvasTextAlign }
interface TemplateConfig {
  id: number;
  label: string;
  src: string | null;
  available: boolean;
  exportW: number;
  exportH: number;
  photo: { x: number; y: number; width: number; height: number };
  namePos: TextPos;
  rolePos: TextPos;
  badgePos: TextPos;
  colors: {
    text: string;
    textShadow: string;
    photoBorder: string;
    photoBg: string[];
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
    photo: { x: 0.04, y: 0.42, width: 0.28, height: 0.28 },
    namePos: { x: 0.60, y: 0.50, size: 0.048, align: 'center' },
    rolePos: { x: 0.58, y: 0.63, size: 0.028 },
    badgePos: { x: 0.58, y: 0.78, size: 0.015 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#f26522',
      photoBg: ['#c94080', '#8b3fa0', '#5a2d82'],
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
    photo: { x: 0.04, y: 0.42, width: 0.28, height: 0.28 },
    namePos: { x: 0.60, y: 0.50, size: 0.048, align: 'center' },
    rolePos: { x: 0.58, y: 0.63, size: 0.028 },
    badgePos: { x: 0.58, y: 0.78, size: 0.015 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#729787',
      photoBg: ['#c9dbd5', '#729787', '#1c3429'],
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
    photo: { x: 0.04, y: 0.42, width: 0.28, height: 0.28 },
    namePos: { x: 0.70, y: 0.54, size: 0.034, align: 'center' },
    rolePos: { x: 0.70, y: 0.64, size: 0.019 },
    badgePos: { x: 0.70, y: 0.78, size: 0.015 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#c44535',
      photoBg: ['#79a68a', '#478363', '#23523b'],
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
    photo: { x: 0.04, y: 0.42, width: 0.28, height: 0.28 },
    namePos: { x: 0.60, y: 0.50, size: 0.048, align: 'center' },
    rolePos: { x: 0.58, y: 0.63, size: 0.028 },
    badgePos: { x: 0.58, y: 0.78, size: 0.015 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#e66236',
      photoBg: ['#79afb5', '#408390', '#1c5e6d'],
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
    photo: { x: 0.04, y: 0.42, width: 0.28, height: 0.28 },
    namePos: { x: 0.60, y: 0.50, size: 0.048, align: 'center' },
    rolePos: { x: 0.58, y: 0.63, size: 0.028 },
    badgePos: { x: 0.58, y: 0.78, size: 0.015 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#d3984d',
      photoBg: ['#a26c48', '#4b5e3d', '#1d3126'],
      pillBg: 'rgba(28,35,51,0.7)',
      pillBorder: '#d3984d',
    },
  },
];

const BUILDER_CLASSES = [
  'Shipper',
  'Architect',
  'Growth Hacker',
  'Infra Engineer',
  'AI Engineer',
  'Web3 Developer',
  'Fullstack Builder',
  'Designer',
  'Founder',
  'Security Researcher',
];

export default function BuilderCardGenerator() {
  const [tplIdx, setTplIdx] = useState(0);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [builderClass, setBuilderClass] = useState('Shipper');
  const [badge, setBadge] = useState('BUILDER');

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState(false);

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

  // ─── File upload ────────────────────────────────────────────────
  const handleFileUpload = async (file: File) => {
    const isHeic = /\.(heic|heif)$/i.test(file.name) ||
                   file.type === 'image/heic' || file.type === 'image/heif';
    let processable = file;

    if (isHeic) {
      setIsProcessing(true);
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
      const img = document.createElement('img');
      img.onload = () => {
        userImgRef.current = img;
        setImageSrc(src);
        setIsProcessing(false);
      };
      img.onerror = () => {
        setError('Failed to load image.');
        setIsProcessing(false);
      };
      img.src = src;
    };
    reader.readAsDataURL(processable);
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

    // ─── 2. Photo region (rectangular, aspect-ratio preserving) ───
    const p = tpl.photo;
    const px = p.x * W;
    const py = p.y * H;
    const pw = p.width * W;
    const ph = p.height * H;

    // A. Subtle drop shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(px, py, pw, ph);
    ctx.restore();

    // B. Photo background
    ctx.fillStyle = '#1c2333';
    ctx.fillRect(px, py, pw, ph);

    // C. Draw user photo — fit within rect, preserve aspect ratio
    if (userImgRef.current) {
      const img = userImgRef.current;
      const scale = Math.min(pw / img.width, ph / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = px + (pw - dw) / 2;
      const dy = py + (ph - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    } else {
      // Placeholder
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.font = `bold ${W * 0.018}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('YOUR PHOTO', px + pw / 2, py + ph / 2);
    }

    // D. Clean border
    ctx.strokeStyle = tpl.colors.photoBorder;
    ctx.lineWidth = 3;
    ctx.strokeRect(px + 1.5, py + 1.5, pw - 3, ph - 3);

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
  }, [tpl, name, role, badge, imageSrc]);

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

  // ─── Toast ──────────────────────────────────────────────────────
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

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
            showToast('Copied! Paste (Ctrl/Cmd+V) into your post.');
          } catch { handleDownload(); }
        } else { handleDownload(); }
        setIsCopying(false);
      }, 'image/png');
    } catch { setIsCopying(false); }
  };

  // ─── Share ──────────────────────────────────────────────────────
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
  };

  // ─── UI ─────────────────────────────────────────────────────────
  return (
    <>
      {/* Error toast */}
      {error && (
        <div className="mb-6 p-4 border-2 border-[#E91E8C] bg-[#084A2E] rounded-sm flex items-center gap-3 text-[#E91E8C] label-mono" role="alert">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-[#6B9A85] hover:text-[#FFFFFF]">✕</button>
        </div>
      )}

      {/* Success toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 border-2 border-[#F5C518] bg-[#084A2E] rounded-sm label-mono text-[#FFFFFF] glow-gold" role="status">
          <CheckCircle2 className="w-5 h-5 text-[#F5C518] inline-block mr-2" />
          {toast}
        </div>
      )}

      {/* Main 2-col layout */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">

        {/* Left: Preview Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full border-2 border-[#FFFFFF]/20 rounded-sm overflow-hidden bg-[#0A0A0A]">
            <canvas
              ref={canvasRef}
              className="w-full h-auto"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-[#0B5D3B]/80 backdrop-blur-sm flex items-center justify-center gap-3 label-mono text-[#F5C518]">
                <Loader2 className="w-6 h-6 animate-spin" />
                Processing…
              </div>
            )}
          </div>

          {/* Template selector */}
          <div className="mt-6 w-full">
            <p className="label-mono text-[#B8D4C8] mb-3">Choose Template</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {TEMPLATES.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => t.available && setTplIdx(i)}
                  disabled={!t.available}
                  className={`relative shrink-0 w-32 sm:w-40 border-2 aspect-video flex items-center justify-center overflow-hidden rounded-sm transition-all ${
                    i === tplIdx
                      ? 'border-[#F5C518] shadow-[0_0_12px_rgba(245,197,24,0.3)]'
                      : t.available
                        ? 'border-[#FFFFFF]/20 hover:border-[#F5C518]/50'
                        : 'border-[#FFFFFF]/10 opacity-35 cursor-not-allowed'
                  }`}
                >
                  {t.src ? (
                    <img src={t.src} alt={t.label} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1 bg-[#084A2E] w-full h-full p-2">
                      <span className="label-mono text-[10px] text-center text-[#F5C518]/90 font-bold leading-tight">
                        {t.label}
                      </span>
                    </div>
                  )}
                  {i === tplIdx && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#F5C518]/90 text-[#0B5D3B] label-mono text-[8px] text-center py-0.5 font-bold">
                      SELECTED
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 border-2 border-[#FFFFFF]/20 rounded-sm bg-[#084A2E]">
            <h3 className="font-display text-2xl uppercase tracking-wide border-b-2 border-[#FFFFFF]/20 pb-3 text-[#F5C518]">
              Your Details
            </h3>

            {/* Upload */}
            <div className="mt-5">
              <label className="block label-mono text-[#B8D4C8] mb-2">Photo</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.heic,.heif"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-[#FFFFFF]/40 bg-[#0B5D3B] hover:bg-[#0A5636] text-[#FFFFFF] font-bold label-mono text-xs flex items-center justify-center gap-3 transition-colors"
              >
                {imageSrc ? 'Change Photo' : 'Upload Photo (JPG / PNG / HEIC)'}
              </button>
              <p className="label-mono text-[10px] text-[#6B9A85] mt-1.5">Clear headshot recommended — the frame is built for faces.</p>
            </div>

            {/* Name */}
            <div className="mt-4">
              <label className="block label-mono text-[#B8D4C8] mb-1">Name</label>
              <input
                type="text" maxLength={24}
                value={name} onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivers"
                className="input"
              />
            </div>

            {/* Role */}
            <div className="mt-4">
              <label className="block label-mono text-[#B8D4C8] mb-1">Stack / Role</label>
              <input
                type="text" maxLength={36}
                value={role} onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Fullstack · AI Engineer"
                className="input"
              />
            </div>

            {/* Builder Class */}
            <div className="mt-4">
              <label className="block label-mono text-[#B8D4C8] mb-1">Builder Class</label>
              <select
                value={builderClass} onChange={(e) => setBuilderClass(e.target.value)}
                className="select"
              >
                {BUILDER_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Badge */}
            <div className="mt-4">
              <label className="block label-mono text-[#B8D4C8] mb-1">Builder Title</label>
              <select
                value={badge} onChange={(e) => setBadge(e.target.value)}
                className="select"
              >
                {['BUILDER', 'HACKER', 'SHIPPER', 'FOUNDER', 'AI ENGINEER', 'WEB3 DEV', 'INFRA ENG', 'DESIGNER'].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button onClick={handleDownload} className="btn btn-yellow w-full" disabled={isProcessing || isCopying}>
              <Download className="w-4 h-4 inline-block mr-2" />
              {isProcessing ? 'Processing…' : 'Download'}
            </button>
            <button onClick={handleCopy} className="btn btn-ghost w-full" disabled={isProcessing || isCopying}>
              <Copy className="w-4 h-4 inline-block mr-2" />
              {isCopying ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button onClick={handleShare} className="btn btn-magenta w-full" disabled={isProcessing}>
              <Share2 className="w-4 h-4 inline-block mr-2" />
              Share on X
            </button>
          </div>
        </div>
      </div>
    </>
  );
}