#!/usr/bin/env python3
"""Генерирует SVG-графику для README в стиле сайта TermoClimat.

Запуск из корня проекта:  python3 .github/readme/generate.py
Нужен ffmpeg (делает миниатюры фото, которые встраиваются прямо в SVG —
GitHub не подгружает внешние картинки внутри SVG).
"""
import base64
import math
import pathlib
import subprocess
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[2]
ASSETS = ROOT / 'web' / 'public' / 'assets'
OUT = pathlib.Path(__file__).resolve().parent

FONT = "'Inter Tight','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
MONO = "'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"

THEMES = {
    'light': dict(bg='#ffffff', ink='#0b0d12', soft='#b9bcc5', muted='#8a8f9c', field='#f4f5f7',
                  line='#e7e8ec', btn='#0b0d12', btn_ink='#ffffff', word='#eceef1', word_dot='#f6d3d4'),
    'dark': dict(bg='#0d1117', ink='#ffffff', soft='#5d616d', muted='#8d929e', field='#161b22',
                 line='#272a33', btn='#ffffff', btn_ink='#0b0d12', word='#1a1f27', word_dot='#4a1c20'),
}


def thumb(path: pathlib.Path, w: int, h: int, contain: bool = False) -> str:
    """Миниатюра в base64 (JPEG). contain=True — вписать товар на белый фон."""
    with tempfile.TemporaryDirectory() as td:
        out = pathlib.Path(td) / 't.jpg'
        if contain:
            vf = (f"scale={int(w * .8)}:{int(h * .8)}:force_original_aspect_ratio=decrease,"
                  f"pad={w}:{h}:(ow-iw)/2:(oh-ih)/2:color=white")
            cmd = ['ffmpeg', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', f'color=white:s={w}x{h}',
                   '-i', str(path), '-filter_complex', f'[1]{vf}[p];[0][p]overlay', '-frames:v', '1']
        else:
            vf = f'scale={w}:{h}:force_original_aspect_ratio=increase,crop={w}:{h}'
            cmd = ['ffmpeg', '-loglevel', 'error', '-y', '-i', str(path), '-vf', vf, '-frames:v', '1']
        subprocess.run(cmd + ['-q:v', '7', str(out)], check=True)
        return 'data:image/jpeg;base64,' + base64.b64encode(out.read_bytes()).decode()


def png64(path: pathlib.Path) -> str:
    return 'data:image/png;base64,' + base64.b64encode(path.read_bytes()).decode()


def esc(s: str) -> str:
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


ARC = [
    ('projects/38.webp', 'КАРАБУЛАК · 30 КВТ', False),
    ('products/SUNPOLO-6KW-01-500x500.jpg', 'ИНВЕРТОР', True),
    ('img/heatpump.jpg', 'ТЕПЛОВОЙ НАСОС', False),
    ('projects/43.webp', 'ТОКМОК · 40 КВТ', False),
    ('products/termoclimat_boiler-500x500.png', 'КОТЛЫ', True),
    ('projects/37.webp', 'ОФИС 2ГИС · 30 КВТ', False),
    ('gallery/23.jpg', 'КОТЕЛЬНАЯ', False),
    ('products/city_air_8-500x500.png', 'РЕКУПЕРАТОР', True),
    ('projects/40.webp', 'АКТИЛЕК · 20 КВТ', False),
    ('img/wastewater.jpg', 'ОЧИСТНЫЕ', False),
    ('products/APS-100-500x500.png', 'НАСОСЫ', True),
    ('gallery/29.jpg', 'ТУРЛАГЕРЬ · СЭС', False),
    ('projects/45.webp', 'КЕЛСУУ · 6 КВТ', False),
]


def banner(theme: str, cards: list[tuple[str, str, bool]]) -> str:
    t = THEMES[theme]
    W, H = 1280, 720
    logo = png64(ASSETS / 'img' / 'logo.png')
    cw, ch, gap, curve = 112, 142, 10, 0.00028
    n = len(cards)
    parts = []
    for i, (src, tag, prod) in enumerate(cards):
        x = (i - (n - 1) / 2) * (cw + gap)
        y = curve * x * x
        rot = math.degrees(math.atan(2 * curve * x))
        cx, cy = W / 2 + x, 488 + y
        parts.append(f'''
    <g transform="translate({cx:.1f} {cy:.1f}) rotate({rot:.2f})" filter="url(#sh-{theme})">
      <clipPath id="c{theme}{i}"><rect x="{-cw/2}" y="{-ch/2}" width="{cw}" height="{ch}" rx="12"/></clipPath>
      <rect x="{-cw/2}" y="{-ch/2}" width="{cw}" height="{ch}" rx="12" fill="#fff"/>
      <image href="{src}" x="{-cw/2}" y="{-ch/2}" width="{cw}" height="{ch}" clip-path="url(#c{theme}{i})" preserveAspectRatio="xMidYMid slice"/>
      <rect x="{-cw/2+7}" y="{ch/2-25}" width="{cw-14}" height="18" rx="5" fill="#0a0b0f" fill-opacity="{.72 if prod else .55}"/>
      <text x="{-cw/2+13}" y="{ch/2-12.5}" font-family="{MONO}" font-size="7.6" fill="#fff" letter-spacing=".3">{esc(tag)}</text>
    </g>''')
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="TermoClimat — инженерные системы для дома и бизнеса">
  <defs>
    <filter id="sh-{theme}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#0a0c14" flood-opacity="{.16 if theme == 'light' else .5}"/></filter>
    <linearGradient id="fade-{theme}" x1="0" x2="1">
      <stop offset="0" stop-color="{t['bg']}"/><stop offset=".1" stop-color="{t['bg']}" stop-opacity="0"/>
      <stop offset=".9" stop-color="{t['bg']}" stop-opacity="0"/><stop offset="1" stop-color="{t['bg']}"/>
    </linearGradient>
  </defs>
  <rect width="{W}" height="{H}" rx="28" fill="{t['bg']}"/>
  <!-- nav pill -->
  <rect x="290" y="26" width="700" height="52" rx="26" fill="#ffffff" stroke="{t['line']}"/>
  <image href="{logo}" x="312" y="41" width="101" height="22"/>
  <g font-family="{FONT}" font-size="13" fill="#3b3f4a">
    <text x="470" y="57">Решения</text><text x="545" y="57">Каталог</text><text x="618" y="57">Услуги</text>
    <text x="683" y="57">Проекты</text><text x="756" y="57">Контакты</text>
  </g>
  <rect x="846" y="34" width="134" height="36" rx="18" fill="#0b0d12"/>
  <text x="913" y="57" text-anchor="middle" font-family="{FONT}" font-size="13" font-weight="500" fill="#fff">Обсудить проект</text>
  <!-- headline -->
  <g font-family="{FONT}" font-weight="600" text-anchor="middle" letter-spacing="-3">
    <text x="640" y="176" font-size="72" fill="{t['ink']}">Инженерные системы</text>
    <text x="640" y="250" font-size="72" fill="{t['soft']}">для дома и бизнеса</text>
  </g>
  <text x="640" y="294" text-anchor="middle" font-family="{FONT}" font-size="17" fill="{t['muted']}">Солнечные станции · тепловые насосы · вентиляция · очистные сооружения</text>
  <!-- ask field -->
  <rect x="400" y="320" width="480" height="50" rx="25" fill="{t['field']}" stroke="{t['line']}"/>
  <text x="424" y="350" font-family="{FONT}" font-size="14" fill="{t['muted']}">Next.js 16 · React 19 · TypeScript strict · Static export</text>
  <circle cx="855" cy="345" r="19" fill="{t['btn']}"/>
  <path d="M855 353v-16m0 0-6.5 6.5m6.5-6.5 6.5 6.5" stroke="{t['btn_ink']}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="640" y="398" text-anchor="middle" font-family="{MONO}" font-size="10.5" letter-spacing="1" fill="{t['muted']}">9+ ЛЕТ НА РЫНКЕ · ОФИЦИАЛЬНЫЕ ДИСТРИБЬЮТОРЫ · БИШКЕК</text>
  <!-- arc -->{''.join(parts)}
  <rect width="{W}" height="{H}" fill="url(#fade-{theme})"/>
</svg>'''


def directions(photos: dict[str, str]) -> str:
    W, H = 1280, 470
    items = [('solar', 'Солнечные электростанции', 'Панели, инверторы, накопители'),
             ('heatpump', 'Тепловые насосы', 'Отопление, охлаждение, ГВС'),
             ('ventilation', 'Вентиляция', 'Приток, вытяжка, рекуперация'),
             ('wastewater', 'Очистные сооружения', 'Станции по объёму стоков')]
    cw, chh, gap, x0, y0 = 272, 270, 16, 64, 150
    cards = []
    for i, (key, title, sub) in enumerate(items):
        x = x0 + i * (cw + gap)
        cards.append(f'''
  <clipPath id="d{i}"><rect x="{x}" y="{y0}" width="{cw}" height="{chh}" rx="16"/></clipPath>
  <g clip-path="url(#d{i})">
    <image href="{photos[key]}" x="{x}" y="{y0}" width="{cw}" height="{chh}" preserveAspectRatio="xMidYMid slice"/>
    <rect x="{x}" y="{y0}" width="{cw}" height="{chh}" fill="url(#shade)"/>
  </g>
  <circle cx="{x + cw - 20}" cy="{y0 + 20}" r="11" fill="#e5252a"/><circle cx="{x + cw - 20}" cy="{y0 + 20}" r="3" fill="#fff"/>
  <text x="{x + 16}" y="{y0 + chh - 36}" font-family="{FONT}" font-size="17" font-weight="600" fill="#fff" letter-spacing="-.3">{title}</text>
  <text x="{x + 16}" y="{y0 + chh - 16}" font-family="{FONT}" font-size="12.5" fill="#fff" fill-opacity=".72">{sub}</text>''')
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="Четыре направления: солнце, тепло, воздух, вода">
  <defs><linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".78"/></linearGradient></defs>
  <rect width="{W}" height="{H}" rx="32" fill="#0a0b0f"/>
  <text x="640" y="84" text-anchor="middle" font-family="{FONT}" font-size="48" font-weight="600" fill="#fff" letter-spacing="-2">Солнце. Тепло. Воздух. <tspan fill="#5d616d">Вода.</tspan></text>
  <text x="640" y="118" text-anchor="middle" font-family="{FONT}" font-size="15" fill="#8d929e">Четыре инженерных направления — от расчёта нагрузки до сервиса после запуска</text>{''.join(cards)}
</svg>'''


def stats() -> str:
    W, H = 1280, 250
    data = [('9+', '', 'лет на рынке'), ('146', ' кВт', 'солнечной генерации'), ('7', '', 'страниц сайта'), ('0', '', 'any в TypeScript')]
    cols = []
    for i, (v, u, label) in enumerate(data):
        x = 64 + i * 296
        cols.append(f'''
  <line x1="{x}" y1="86" x2="{x + 264}" y2="86" stroke="#272a33"/>
  <text x="{x}" y="166" font-family="{FONT}" font-size="64" font-weight="600" fill="#fff" letter-spacing="-3">{v}<tspan font-size="24" fill="#8d929e" letter-spacing="0">{u}</tspan></text>
  <text x="{x}" y="200" font-family="{FONT}" font-size="15" fill="#8d929e">{label}</text>''')
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="TermoClimat в цифрах">
  <clipPath id="sc"><rect width="{W}" height="{H}" rx="32"/></clipPath>
  <g clip-path="url(#sc)">
    <rect width="{W}" height="{H}" fill="#0a0b0f"/>
    <circle cx="1210" cy="-40" r="210" fill="none" stroke="#e5252a" stroke-opacity=".12" stroke-width="60"/>
  </g>
  <text x="64" y="56" font-family="{MONO}" font-size="12" letter-spacing="1.2" fill="#8d929e">TERMOCLIMAT · В ЦИФРАХ</text>{''.join(cols)}
</svg>'''


def palette() -> str:
    W, H = 1280, 200
    sw = [('#1c2a6e', 'Brand navy', 'логотип, акценты'), ('#e5252a', 'Accent red', 'точки, бейджи'),
          ('#0b0d12', 'Ink', 'текст, кнопки'), ('#e7e8ec', 'Line', 'границы карточек'),
          ('#f4f5f7', 'Soft', 'поля, подложки'), ('#b9bcc5', 'Muted', 'вторая строка заголовков')]
    cells = []
    for i, (hexv, name, role) in enumerate(sw):
        x = 24 + i * 208
        cells.append(f'''
  <rect x="{x}" y="24" width="192" height="96" rx="16" fill="{hexv}" stroke="#e7e8ec"/>
  <text x="{x + 4}" y="146" font-family="{FONT}" font-size="15" font-weight="600" fill="#0b0d12">{name}</text>
  <text x="{x + 4}" y="166" font-family="{MONO}" font-size="11.5" fill="#8a8f9c">{hexv.upper()}</text>
  <text x="{x + 4}" y="184" font-family="{FONT}" font-size="12" fill="#8a8f9c">{role}</text>''')
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="Палитра сайта">
  <rect width="{W}" height="{H}" rx="24" fill="#ffffff"/>{''.join(cells)}
</svg>'''


def wordmark(theme: str) -> str:
    t = THEMES[theme]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="230" viewBox="0 0 1280 230" role="img" aria-label="termoclimat">
  <text x="640" y="190" text-anchor="middle" font-family="{FONT}" font-size="212" font-weight="700" letter-spacing="-14" fill="{t['word']}">termoclimat<tspan fill="{t['word_dot']}">.</tspan></text>
</svg>'''


def main() -> None:
    cards = [(thumb(ASSETS / p, 224, 284, contain=prod), tag, prod) for p, tag, prod in ARC]
    photos = {k: thumb(ASSETS / 'img' / f'{k}.jpg', 544, 540) for k in ('solar', 'heatpump', 'ventilation', 'wastewater')}
    files = {
        'banner-light.svg': banner('light', cards),
        'banner-dark.svg': banner('dark', cards),
        'directions.svg': directions(photos),
        'stats.svg': stats(),
        'palette.svg': palette(),
        'wordmark-light.svg': wordmark('light'),
        'wordmark-dark.svg': wordmark('dark'),
    }
    for name, svg in files.items():
        (OUT / name).write_text(svg, encoding='utf-8')
        print(f'{name:20} {len(svg) // 1024} KB')


if __name__ == '__main__':
    main()
