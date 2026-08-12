import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Download, Share2, Copy, CheckCircle2, AlertCircle, X, Loader2, Users,
} from 'lucide-react';

const SHARE_CAPTION = "I'm building at Hacker House Goa 2026 🏖️ #HHGoa2026";

// ─── Template config ────────────────────────────────────────────────
interface TextPos { x: number; y: number; size: number; align?: CanvasTextAlign }
interface TemplateConfig {
  id: number;
  label: string;
  src: string | null;
  available: boolean;
  exportW: number;
  exportH: number;
  // Team photo area — defines the bounding box where 3 circular slots go
  teamPhotoArea: { x: number; y: number; width: number; height: number };
  namePos: TextPos;
  rolePos: TextPos;
  badgePos: TextPos;
  colors: {
    text: string;
    textShadow: string;
    photoBorder: string;
    pillBg: string;
    pillBorder: string;
    teamBadgeBg: string;
    teamBadgeBorder: string;
  };
}

// ─── Team Templates (matching the 3 Goa landmark styles) ────────────
const TEAM_TEMPLATES: TemplateConfig[] = [
  {
    id: 1,
    label: 'Basilica of Bom Jesus',
    src: '/templates/team-basilica.png',
    available: true,
    exportW: 2048,
    exportH: 1142,
    // Pink signboard on left — photos go here
    teamPhotoArea: { x: 0.06, y: 0.40, width: 0.26, height: 0.34 },
    namePos: { x: 0.78, y: 0.20, size: 0.032, align: 'center' },
    rolePos: { x: 0.78, y: 0.28, size: 0.016 },
    badgePos: { x: 0.78, y: 0.78, size: 0.014 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#F5C518',
      pillBg: '#E91E8C',
      pillBorder: '#FFFFFF',
      teamBadgeBg: '#E91E8C',
      teamBadgeBorder: '#FFFFFF',
    },
  },
  {
    id: 2,
    label: 'Fort Aguada',
    src: '/templates/template-5.jpg',
    available: true,
    exportW: 2048,
    exportH: 1142,
    teamPhotoArea: { x: 0.06, y: 0.38, width: 0.26, height: 0.36 },
    namePos: { x: 0.78, y: 0.20, size: 0.032, align: 'center' },
    rolePos: { x: 0.78, y: 0.28, size: 0.016 },
    badgePos: { x: 0.78, y: 0.78, size: 0.014 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#F5C518',
      pillBg: '#E91E8C',
      pillBorder: '#FFFFFF',
      teamBadgeBg: '#E91E8C',
      teamBadgeBorder: '#FFFFFF',
    },
  },
  {
    id: 3,
    label: 'Palolem Beach',
    src: '/templates/template-4.jpg',
    available: true,
    exportW: 2048,
    exportH: 1142,
    teamPhotoArea: { x: 0.06, y: 0.38, width: 0.26, height: 0.36 },
    namePos: { x: 0.78, y: 0.20, size: 0.032, align: 'center' },
    rolePos: { x: 0.78, y: 0.28, size: 0.016 },
    badgePos: { x: 0.78, y: 0.78, size: 0.014 },
    colors: {
      text: '#fef5e0',
      textShadow: 'rgba(0,0,0,0.9)',
      photoBorder: '#F5C518',
      pillBg: '#E91E8C',
      pillBorder: '#FFFFFF',
      teamBadgeBg: '#E91E8C',
      teamBadgeBorder: '#FFFFFF',
    },
  },
];

interface MemberPhoto {
  src: string | null;
  img: HTMLImageElement | null;
  name: string;
  role: string;
}

const BUILDER_CLASSES = [
  'Shipper', 'Architect', 'Growth Hacker', 'Infra Engineer',
  'AI Engineer', 'Web3 Developer', 'Fullstack Builder', 'Designer',
];

export default function TeamCardGenerator() {
  const [tplIdx, setTplIdx] = useState(0);
  const [teamName, setTeamName] = useState('NULL POINTERS');
  const [builderClass, setBuilderClass] = useState('Fullstack Builder');
  const [members, setMembers] = useState<MemberPhoto[]>([
    { src: null, img: null, name: '', role: '' },
    { src: null, img: null, name: '', role: '' },
    { src: null, img: null, name: '', role: '' },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tplImgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const tpl = TEAM_TEMPLATES[tplIdx];

  // ─── Load template image ────────────────────────────────────────
  useEffect(() => {
    tplImgRef.current = null;
    if (!tpl.src) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { tplImgRef.current = img; };
    img.src = tpl.src;
  }, [tpl.src]);

  // ─── File upload per member ─────────────────────────────────────
  const handleMemberUpload = async (file: File, index: number) => {
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
        setError('Could not convert HEIC image.');
        setIsProcessing(false);
        return;
      }
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = document.createElement('img');
      img.onload = () => {
        setMembers(prev => prev.map((m, i) => i === index ? { ...m, src, img } : m));
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

  const updateMember = (index: number, field: 'name' | 'role', value: string) => {
    setMembers(prev => prev.map((m, i) => i === index ? { ...m, [field]: value } : m));
  };

  const removeMemberPhoto = (index: number) => {
    setMembers(prev => prev.map((m, i) => i === index ? { ...m, src: null, img: null } : m));
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

    // ── 1. Draw template background ──
    if (tplImgRef.current) {
      ctx.drawImage(tplImgRef.current, 0, 0, W, H);
    }

    // ── 2. Draw 3 circular photo slots inside the pink signboard ──
    const area = tpl.teamPhotoArea;
    const areaX = area.x * W;
    const areaY = area.y * H;
    const areaW = area.width * W;
    const areaH = area.height * H;

    // 3 circles in triangular layout: 2 top, 1 bottom-center
    // Pink signboard is roughly 30% wide x 40% tall on left side
    const slotRadius = Math.min(areaW / 5.2, areaH / 4.2);

    const positions = [
      { x: areaX + areaW * 0.32, y: areaY + areaH * 0.30 },  // Top-left
      { x: areaX + areaW * 0.68, y: areaY + areaH * 0.30 },  // Top-right
      { x: areaX + areaW * 0.50, y: areaY + areaH * 0.72 },  // Bottom-center
    ];

    for (let i = 0; i < 3; i++) {
      const cx = positions[i].x;
      const cy = positions[i].y;
      const r = slotRadius;
      const member = members[i];

      // Drop shadow
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = 14;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 4;

      // Gold ring border
      ctx.beginPath();
      ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
      ctx.fillStyle = tpl.colors.photoBorder;
      ctx.fill();
      ctx.restore();

      // Dark inner circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = '#0A0A0A';
      ctx.fill();

      // Clip and draw photo (auto-crop: cover fill, centered)
      if (member?.img) {
        const img = member.img;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.clip();

        const scale = Math.max((r * 2) / img.width, (r * 2) / img.height);
        const dw = img.width * scale;
        const dh = img.height * scale;
        ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
        ctx.restore();
      } else {
        // Placeholder with member number
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.font = `700 ${Math.round(W * 0.012)}px "Space Grotesk", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${i + 1}`, cx, cy);
      }

      // Inner highlight ring
      ctx.beginPath();
      ctx.arc(cx, cy, r + 1, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // ── 3. Team name badge (top right magenta signboard) ──
    if (teamName.trim()) {
      const badgeFontSize = Math.round(W * 0.04);
      const badgeText = teamName.toUpperCase();
      ctx.font = `900 ${badgeFontSize}px "Space Grotesk", sans-serif`;
      const tm = ctx.measureText(badgeText);
      const badgeW = tm.width + 60;
      const badgeH = badgeFontSize * 2.2;

      // Position on the magenta signboard (top right)
      const badgeCx = W * 0.82;
      const badgeCy = H * 0.20;

      // Badge background (magenta)
      ctx.fillStyle = tpl.colors.teamBadgeBg;
      ctx.beginPath();
      ctx.roundRect(badgeCx - badgeW / 2, badgeCy - badgeH / 2, badgeW, badgeH, 6);
      ctx.fill();

      // Badge border (white)
      ctx.strokeStyle = tpl.colors.teamBadgeBorder;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(badgeCx - badgeW / 2 + 1.5, badgeCy - badgeH / 2 + 1.5, badgeW - 3, badgeH - 3, 5);
      ctx.stroke();

      // Inner border
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(badgeCx - badgeW / 2 + 10, badgeCy - badgeH / 2 + 10, badgeW - 20, badgeH - 20, 3);
      ctx.stroke();

      // "TEAM" label
      const teamLabelSize = Math.round(W * 0.014);
      ctx.font = `700 ${teamLabelSize}px "Space Grotesk", sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TEAM', badgeCx, badgeCy - badgeH * 0.28);

      // Main team name (large)
      ctx.font = `900 ${badgeFontSize}px "Space Grotesk", sans-serif`;
      ctx.fillStyle = tpl.colors.text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeText, badgeCx, badgeCy + badgeH * 0.08);
    }

    // ── 4. Date/location (top left yellow signboard) ──
    const dateSize = Math.round(W * 0.018);
    ctx.font = `700 ${dateSize}px "Space Grotesk", monospace`;
    ctx.fillStyle = '#0B5D3B';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('GOA, INDIA · 28–31 OCT 2026', W * 0.06, H * 0.14);

    // ── 5. HH GOA 2026 · ID CARD (bottom right yellow signboard) ──
    const idCardSize = Math.round(W * 0.016);
    ctx.font = `700 ${idCardSize}px "Space Grotesk", monospace`;
    ctx.fillStyle = '#0B5D3B';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('HH GOA 2026 · ID CARD', W * 0.82, H * 0.68);

    // ── 6. Builder class pill (below team name) ──
    const classText = builderClass.toUpperCase();
    const classFontSize = Math.round(W * 0.013);
    ctx.font = `600 ${classFontSize}px "Space Grotesk", monospace`;
    const classMetrics = ctx.measureText(classText);
    const classPillW = classMetrics.width + 20;
    const classPillH = classFontSize + 10;

    const classPillX = W * 0.82 - classPillW / 2;
    const classPillY = H * 0.38;

    ctx.fillStyle = 'rgba(245, 197, 24, 0.2)';
    ctx.beginPath();
    ctx.roundRect(classPillX, classPillY, classPillW, classPillH, classPillH / 2);
    ctx.fill();

    ctx.strokeStyle = tpl.colors.photoBorder;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(classPillX + 0.75, classPillY + 0.75, classPillW - 1.5, classPillH - 1.5, classPillH / 2 - 0.75);
    ctx.stroke();

    ctx.fillStyle = tpl.colors.photoBorder;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(classText, classPillX + classPillW / 2, classPillY + classPillH / 2);

  }, [tpl, teamName, builderClass, members]);

  // Re-render on changes
  useEffect(() => { renderCanvas(); }, [renderCanvas]);

  // Re-render once template image loads
  useEffect(() => {
    if (!tpl.src) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { tplImgRef.current = img; renderCanvas(); };
    img.src = tpl.src;
  }, [tpl.src, renderCanvas]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `hhgoa-2026-team-${(teamName || 'team').toLowerCase().replace(/\s+/g, '-')}.png`;
      a.href = url;
      a.click();
      showToast('Team card downloaded!');
    } catch {
      setError('Failed to export image.');
    }
  };

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

  const handleShare = () => {
    handleDownload();
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_CAPTION)}`,
      '_blank', 'noopener,noreferrer'
    );
  };

  // ─── UI ─────────────────────────────────────────────────────────
  return (
    <>
      {/* Error */}
      {error && (
        <div className="mb-6 p-4 border-2 border-[#E91E8C] bg-[#084A2E] rounded-sm flex items-center gap-3 text-[#E91E8C] label-mono" role="alert">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-[#6B9A85] hover:text-[#FFFFFF]">✕</button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 border-2 border-[#F5C518] bg-[#084A2E] rounded-sm label-mono text-[#FFFFFF] glow-gold" role="status">
          <CheckCircle2 className="w-5 h-5 text-[#F5C518] inline-block mr-2" />
          {toast}
        </div>
      )}

      {/* Template selector */}
      <div className="mb-8">
        <p className="label-mono text-[#B8D4C8] mb-3">Choose Template</p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {TEAM_TEMPLATES.map((t, i) => (
            <button
              key={t.id}
              onClick={() => t.available && setTplIdx(i)}
              disabled={!t.available}
              className={`relative shrink-0 w-40 sm:w-48 border-2 aspect-video flex items-center justify-center overflow-hidden rounded-sm transition-all ${
                i === tplIdx
                  ? 'border-[#F5C518] shadow-[0_0_12px_rgba(245,197,24,0.3)]'
                  : 'border-[#FFFFFF]/20 hover:border-[#F5C518]/50'
              }`}
            >
              {t.src ? (
                <img src={t.src} alt={t.label} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 bg-[#084A2E] w-full h-full p-2">
                  <span className="label-mono text-[10px] text-center text-[#F5C518] font-bold leading-tight">{t.label}</span>
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

      {/* Main 2-col layout */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left: Preview */}
        <div className="lg:col-span-7">
          <div className="relative w-full border-2 border-[#FFFFFF]/20 rounded-sm overflow-hidden bg-[#0A0A0A]">
            <canvas ref={canvasRef} className="w-full h-auto" />
            {isProcessing && (
              <div className="absolute inset-0 bg-[#0B5D3B]/80 backdrop-blur-sm flex items-center justify-center gap-3 label-mono text-[#F5C518]">
                <Loader2 className="w-6 h-6 animate-spin" />
                Processing…
              </div>
            )}
          </div>
        </div>

        {/* Right: Controls */}
        <div className="lg:col-span-5 space-y-4">
          {/* Team Name */}
          <div className="p-5 border-2 border-[#FFFFFF]/20 rounded-sm bg-[#084A2E]">
            <label className="label-mono text-[#B8D4C8] mb-2 block">Team Name</label>
            <input
              type="text" maxLength={24}
              value={teamName} onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. NULL POINTERS"
              className="input"
            />
          </div>

          {/* Member 1 */}
          {members.map((member, idx) => (
            <div key={idx} className="p-5 border-2 border-[#FFFFFF]/20 rounded-sm bg-[#084A2E]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full border-2 border-[#F5C518] bg-[#0B5D3B] flex items-center justify-center label-mono text-[10px] text-[#F5C518] font-bold">
                  {idx + 1}
                </div>
                <label className="label-mono text-[#B8D4C8]">Member {idx + 1}</label>
              </div>

              {/* Photo upload */}
              <input
                ref={el => { fileInputRefs.current[idx] = el; }}
                type="file"
                accept="image/*,.heic,.heif"
                onChange={(e) => e.target.files?.[0] && handleMemberUpload(e.target.files[0], idx)}
                className="hidden"
              />
              <button
                onClick={() => fileInputRefs.current[idx]?.click()}
                className={`w-full py-3 border-2 border-dashed rounded-sm label-mono text-xs flex items-center justify-center gap-2 transition-colors ${
                  member.src
                    ? 'border-[#F5C518] bg-[#0B5D3B] text-[#F5C518]'
                    : 'border-[#FFFFFF]/30 bg-[#0B5D3B] text-[#6B9A85] hover:border-[#F5C518]/50'
                }`}
                disabled={isProcessing}
              >
                {member.src ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Photo Ready
                  </>
                ) : (
                  <>
                    Upload Photo
                  </>
                )}
              </button>
              {member.src && (
                <button
                  onClick={() => removeMemberPhoto(idx)}
                  className="mt-2 label-mono text-[10px] text-[#6B9A85] hover:text-[#E91E8C] transition-colors"
                >
                  Remove photo
                </button>
              )}

              {/* Name */}
              <div className="mt-3">
                <label className="block label-mono text-[#B8D4C8] mb-1 text-[10px]">Name</label>
                <input
                  type="text" maxLength={24}
                  value={member.name}
                  onChange={(e) => updateMember(idx, 'name', e.target.value)}
                  placeholder={`Member ${idx + 1} name`}
                  className="input"
                />
              </div>

              {/* Role */}
              <div className="mt-3">
                <label className="block label-mono text-[#B8D4C8] mb-1 text-[10px]">Stack / Role</label>
                <input
                  type="text" maxLength={36}
                  value={member.role}
                  onChange={(e) => updateMember(idx, 'role', e.target.value)}
                  placeholder="e.g. Backend · AI"
                  className="input"
                />
              </div>
            </div>
          ))}

          {/* Builder Class */}
          <div className="p-5 border-2 border-[#FFFFFF]/20 rounded-sm bg-[#084A2E]">
            <label className="label-mono text-[#B8D4C8] mb-2 block">Builder Class</label>
            <select
              value={builderClass} onChange={(e) => setBuilderClass(e.target.value)}
              className="select"
            >
              {BUILDER_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Actions */}
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