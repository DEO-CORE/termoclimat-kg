#!/usr/bin/env python3
"""Собирает страницы: pages/*.html + partials -> site/*.html
Первая строка страницы — метаданные:  <!-- title | description | nav-key -->"""
import pathlib, re
root = pathlib.Path(__file__).parent
head = (root / 'partials/head.html').read_text(encoding='utf-8')
foot = (root / 'partials/foot.html').read_text(encoding='utf-8')
for page in sorted((root / 'pages').glob('*.html')):
    src = page.read_text(encoding='utf-8')
    meta, body = src.split('\n', 1)
    title, desc, nav = [x.strip() for x in re.match(r'<!--(.*)-->', meta).group(1).split('|')]
    h = head.replace('{{title}}', title).replace('{{desc}}', desc)
    h = h.replace(f'data-nav="{nav}"', f'data-nav="{nav}" class="active" aria-current="page"')
    (root / 'site' / page.name).write_text(h + body + foot, encoding='utf-8')
    print('built', page.name)
