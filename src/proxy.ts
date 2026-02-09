import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const ua = req.headers.get('user-agent')?.toLowerCase() || '';
  const url = req.nextUrl.clone();

  const isMobile = /iphone|ipod|android.*mobile|windows phone|ipad/.test(ua);

  if (url.pathname === '/') {
    url.pathname = isMobile ? '/home/mobile' : '/home/desktop';

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
