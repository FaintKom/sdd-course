# -*- coding: utf-8 -*-
"""Собирает один workspace-HTML из всех материалов курса. Запуск из tools/."""
import os, markdown

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (group, title, type, path)
DOCS = [
    ("Старт",        "Обзор и статус готовности", "md", "README.md"),
    ("Главное",      "Программа и образовательные результаты", "md", "program-and-outcomes.md"),
    ("Главное",      "Бенчмарк конкурентов → решения", "md", "00-source-materials/competitor-benchmark.md"),
    ("Главное",      "Метрики качества и план", "md", "01-quality-metrics-and-plan.md"),
    ("Дизайн",       "LXD-дизайн курса (полный)", "iframe", "sdd-course-design.html"),
    ("Дизайн",       "Kickoff-kit для SME", "iframe", "sme-kickoff-kit.html"),
    ("Материалы",    "Шаблон спецификации (W2)", "md", "02-materials/spec-template.md"),
    ("Материалы",    "Чек-лист ревью + дефекты (W5)", "md", "02-materials/review-checklist-ai-code.md"),
    ("Материалы",    "Контекст AGENTS.md (W3)", "md", "02-materials/context-AGENTS.sample.md"),
    ("Материалы",    "Pre-work окружения", "md", "02-materials/pre-work-environment-checklist.md"),
    ("Материалы",    "Рубрика защиты (W8)", "md", "02-materials/defense-rubric.md"),
    ("Материалы",    "Материалы — индекс", "md", "02-materials/README.md"),
    ("Первый урок",  "План урока W1", "md", "03-lesson-01/lesson-plan-w1.md"),
    ("Первый урок",  "Подготовка фасилитатора W1", "md", "03-lesson-01/facilitator-prep-w1.md"),
    ("Первый урок",  "Кейсы-диалоги W1 (+ключ)", "md", "03-lesson-01/dialogue-cases-w1.md"),
    ("Первый урок",  "Карта доверия/контроля", "md", "03-lesson-01/trust-control-map-template.md"),
    ("Первый урок",  "Первый урок — индекс", "md", "03-lesson-01/README.md"),
    ("Визуалы",      "SJM (карта пути)", "iframe", "04-visuals/sjm.html"),
    ("Визуалы",      "Граф модули→ОР", "iframe", "04-visuals/graph.html"),
]

md = markdown.Markdown(extensions=["tables", "fenced_code", "sane_lists", "nl2br"])

def slug(i): return f"sec{i}"

nav_groups = {}
sections = []
for i, (grp, title, typ, path) in enumerate(DOCS):
    sid = slug(i)
    nav_groups.setdefault(grp, []).append((sid, title))
    if typ == "md":
        fp = os.path.join(ROOT, path)
        try:
            md.reset()
            body = md.convert(open(fp, encoding="utf-8").read())
        except Exception as e:
            body = f"<p style='color:#b5523a'>Не прочитан: {path} ({e})</p>"
        sections.append(f'<section id="{sid}" class="doc"><div class="doc-head"><span class="doc-tag">{path}</span></div>{body}</section>')
    else:
        sections.append(
            f'<section id="{sid}" class="doc"><div class="doc-head"><span class="doc-tag">{path}</span>'
            f'<a class="open" href="{path}" target="_blank">↗ открыть в новой вкладке</a></div>'
            f'<iframe src="{path}" loading="lazy"></iframe></section>')

nav_html = []
for grp, items in nav_groups.items():
    nav_html.append(f'<div class="nav-grp">{grp}</div>')
    for sid, title in items:
        nav_html.append(f'<a href="#{sid}" data-t="{title.lower()}">{title}</a>')
nav_html = "\n".join(nav_html)
sections_html = "\n".join(sections)

HTML = f"""<!DOCTYPE html>
<html lang="ru"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SDD-курс — рабочее пространство</title>
<style>
:root{{--paper:#faf7f2;--paper2:#fff;--ink:#1c1917;--muted:#6f6557;--soft:#9a9082;
--rule:rgba(28,25,23,0.14);--accent:#b5523a;--tint:#f0ddd6;--band:#f4ece2;--link:#2e5aa8;}}
*{{box-sizing:border-box;}}html{{scroll-behavior:smooth;}}
body{{margin:0;background:var(--paper);color:var(--ink);font-family:-apple-system,"Segoe UI",Roboto,system-ui,sans-serif;font-size:15px;line-height:1.55;}}
.wrap{{display:grid;grid-template-columns:280px 1fr;}}
nav{{position:sticky;top:0;height:100vh;overflow-y:auto;padding:18px 14px;border-right:1px solid var(--rule);background:var(--band);}}
.brand{{font-family:Georgia,serif;font-size:19px;margin:0 0 4px;}}
.brand small{{display:block;font-family:ui-monospace,monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-top:4px;}}
#flt{{width:100%;margin:12px 0;padding:7px 10px;border:1px solid var(--rule);border-radius:6px;font-size:13px;background:var(--paper2);}}
.nav-grp{{font-family:ui-monospace,monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin:14px 0 4px;font-weight:700;}}
nav a{{display:block;color:var(--ink);text-decoration:none;font-size:13px;padding:5px 8px;border-radius:5px;border-left:2px solid transparent;}}
nav a:hover{{background:rgba(181,82,58,0.08);color:var(--accent);}}
nav a.active{{background:var(--tint);border-left-color:var(--accent);color:var(--accent);font-weight:600;}}
main{{padding:32px 48px 90px;min-width:0;}}
.doc{{border-bottom:1px solid var(--rule);padding-bottom:36px;margin-bottom:36px;}}
.doc-head{{display:flex;gap:12px;align-items:center;margin-bottom:8px;}}
.doc-tag{{font-family:ui-monospace,monospace;font-size:10px;color:var(--soft);background:var(--band);padding:2px 7px;border-radius:3px;}}
.open{{font-family:ui-monospace,monospace;font-size:11px;color:var(--link);text-decoration:none;}}
.doc h1{{font-family:Georgia,serif;font-weight:400;font-size:28px;margin:6px 0 10px;}}
.doc h2{{font-size:20px;margin:24px 0 8px;border-top:1px solid var(--rule);padding-top:14px;}}
.doc h3{{font-size:16px;margin:18px 0 6px;}}
.doc h4{{font-size:14px;margin:14px 0 4px;}}
.doc p{{margin:7px 0;}}.doc ul,.doc ol{{padding-left:22px;margin:7px 0;}}.doc li{{margin:2px 0;}}
code{{font-family:ui-monospace,monospace;font-size:12.5px;background:var(--band);padding:1px 5px;border-radius:3px;}}
pre{{background:var(--ink);color:#f0e9df;padding:12px 14px;border-radius:8px;overflow-x:auto;font-size:12.5px;}}
pre code{{background:none;color:inherit;padding:0;}}
table{{border-collapse:collapse;width:100%;margin:12px 0;font-size:12.5px;}}
th,td{{border:1px solid var(--rule);padding:7px 9px;text-align:left;vertical-align:top;}}
th{{background:var(--ink);color:#fff;font-size:11.5px;}}
tbody tr:nth-child(even){{background:rgba(28,25,23,0.025);}}
blockquote{{margin:10px 0;padding:8px 14px;border-left:4px solid var(--accent);background:var(--paper2);border-radius:0 6px 6px 0;color:var(--muted);}}
iframe{{width:100%;height:80vh;border:1px solid var(--rule);border-radius:8px;background:#fff;}}
.top{{position:fixed;right:20px;bottom:20px;background:var(--ink);color:#fff;border:none;border-radius:50%;width:42px;height:42px;font-size:18px;cursor:pointer;opacity:.85;}}
@media print{{.wrap{{grid-template-columns:1fr;}}nav,.top{{display:none;}}main{{padding:0;}}iframe{{height:auto;min-height:400px;}}}}
@media(max-width:900px){{.wrap{{grid-template-columns:1fr;}}nav{{position:static;height:auto;}}main{{padding:20px;}}}}
</style></head>
<body>
<div class="wrap">
<nav>
  <div class="brand">SDD-курс<small>рабочее пространство</small></div>
  <input id="flt" type="text" placeholder="фильтр разделов…">
  {nav_html}
</nav>
<main>
{sections_html}
</main>
</div>
<button class="top" onclick="scrollTo(0,0)" title="наверх">↑</button>
<script>
const flt=document.getElementById('flt'),links=[...document.querySelectorAll('nav a')];
flt.addEventListener('input',()=>{{const q=flt.value.toLowerCase();links.forEach(a=>{{a.style.display=a.dataset.t.includes(q)?'block':'none';}});}});
const secs=[...document.querySelectorAll('section.doc')];
const obs=new IntersectionObserver(es=>{{es.forEach(e=>{{if(e.isIntersecting){{const id=e.target.id;links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));}}}});}},{{rootMargin:'-20% 0px -70% 0px'}});
secs.forEach(s=>obs.observe(s));
</script>
</body></html>"""

out = os.path.join(ROOT, "course-workspace.html")
open(out, "w", encoding="utf-8").write(HTML)
print("written:", out, round(len(HTML)/1024, 1), "KB,", len(DOCS), "sections")
