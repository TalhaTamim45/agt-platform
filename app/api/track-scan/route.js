import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Private server-side storage location (NOT accessible publicly via HTTP)
const DATA_DIR = path.join(process.cwd(), 'data');
const LOG_FILE = path.join(DATA_DIR, 'qr-scans.json');
const MAX_LOG_ENTRIES = 2000; // Cap log to prevent disk exhaustion attacks

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory already exists
  }
}

/**
 * Clean & truncate strings to prevent malicious header injections
 */
function sanitizeString(str, maxLength = 100) {
  if (!str || typeof str !== 'string') return 'unknown';
  return str.replace(/[<>"'`\r\n]/g, '').trim().slice(0, maxLength);
}

/**
 * GET /api/track-scan?ref=qr
 * Logs a QR scan event and safely redirects to the catalog.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get('ref');

  if (ref === 'qr') {
    const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rawUa = request.headers.get('user-agent') || 'unknown';
    const rawRef = request.headers.get('referer') || 'direct';

    const scanEntry = {
      timestamp: new Date().toISOString(),
      ip: sanitizeString(rawIp.split(',')[0], 45), // First IP in list, capped to max IPv6 length
      userAgent: sanitizeString(rawUa, 180),
      referer: sanitizeString(rawRef, 150),
    };

    try {
      await ensureDataDir();
      let scans = [];
      try {
        const data = await fs.readFile(LOG_FILE, 'utf8');
        scans = JSON.parse(data);
        if (!Array.isArray(scans)) scans = [];
      } catch {
        scans = [];
      }

      scans.push(scanEntry);

      // Keep only recent entries to maintain lightweight storage
      if (scans.length > MAX_LOG_ENTRIES) {
        scans = scans.slice(-MAX_LOG_ENTRIES);
      }

      await fs.writeFile(LOG_FILE, JSON.stringify(scans, null, 2), 'utf8');
    } catch (err) {
      console.error('QR scan tracking error:', err);
    }
  }

  // Safe redirect using origin URL to prevent open redirect vulnerabilities
  return NextResponse.redirect(new URL('/#catalog', request.url));
}

/**
 * POST /api/track-scan
 * Returns scan data for the internal analytics dashboard.
 */
export async function POST() {
  try {
    let scans = [];
    try {
      const data = await fs.readFile(LOG_FILE, 'utf8');
      scans = JSON.parse(data);
      if (!Array.isArray(scans)) scans = [];
    } catch {
      scans = [];
    }

    const totalScans = scans.length;
    const today = new Date().toISOString().split('T')[0];
    const todayScans = scans.filter(s => s?.timestamp && s.timestamp.startsWith(today)).length;

    const uniqueIPs = new Set(scans.map(s => s.ip)).size;

    const last7Days = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      last7Days[key] = scans.filter(s => s?.timestamp && s.timestamp.startsWith(key)).length;
    }

    const mobileCount = scans.filter(s => 
      s.userAgent && /mobile|android|iphone|ipad/i.test(s.userAgent)
    ).length;

    return NextResponse.json({
      totalScans,
      todayScans,
      uniqueVisitors: uniqueIPs,
      mobilePercentage: totalScans > 0 ? Math.round((mobileCount / totalScans) * 100) : 0,
      last7Days,
      recentScans: scans.slice(-10).reverse(),
    });
  } catch {
    return NextResponse.json({
      totalScans: 0,
      todayScans: 0,
      uniqueVisitors: 0,
      mobilePercentage: 0,
      last7Days: {},
      recentScans: [],
    });
  }
}
