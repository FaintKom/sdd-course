# Бенчмарк: как другие учат Spec-Driven Development и «AI-агенты для разработчиков»

> Основа для принятия решений по дизайну курса. Веб-ресёрч инструментов и курсов SDD.
> Источники — внизу.

## TL;DR
Рынок сошёлся на едином backbone SDD: **Constitution/Steering → Specify → (Clarify) → Plan →
Tasks → Implement → Verify**. Инструменты (GitHub Spec Kit, AWS Kiro, Tessl) учат механике;
курсы (DeepLearning.AI, Udemy) — смене мышления (vibe-coding → инженерия). Почти всё —
короткое, self-paced, видео+квиз, один follow-along проект. **Незакрытые пробелы рынка:
brownfield/легаси, governance на команду, drift detection, и graded capstone с реальным ревью.**

## Backbone (де-факто стандарт)
1. **Governance первым** — Constitution (Spec Kit) / Steering files (Kiro) / CLAUDE.md+AGENTS.md (Udemy).
2. **Specify** — что/зачем, без реализации; user stories + acceptance criteria; измеримый успех.
3. **Clarify** — явный гейт устранения неоднозначности (`NEEDS CLARIFICATION`) ДО планирования.
4. **Plan** — архитектура/решения под существующий код + конституцию.
5. **Tasks** — атомарные, ревьюируемые, с зависимостями (пометка параллельных).
6. **Implement** — агент выполняет, human-in-the-loop, контроль дрейфа.
7. **Verify** — тесты-как-спека, кросс-артефактный анализ, реплан между фичами.
Сквозное: спеки в git; тесты из спеки, не после кода; **EARS** — эмерджентный стандарт AC;
агенты заменяемы/agnostic; человек аппрувит на гейтах.

## Источники по отдельности

### GitHub Spec Kit (open-source, free, agent-agnostic)
Фазы (слэш-команды): `/constitution` → `/specify` → `/clarify` → `/plan` → `/analyze` → `/tasks`
→ `/implement` → `/checklist`. Конституция = 9 неизменных принципов (Library-First, CLI, Test-First,
Simplicity ≤3 проекта, Framework Trust). Branch-per-spec, human-reviewed. До ~8 файлов на спеку.
Минус (Fowler): артефакты «многословны и нудны», агенты «часто игнорят задокументированные ограничения».

### DeepLearning.AI — «Spec-Driven Development with Coding Agents» (с JetBrains, P. Everitt)
~15 видео + 1 квиз, beginner. Последовательность: Why SDD → workflow → setup → **constitution →
feature spec → implementation → validation → replanning → second feature → MVP → legacy support →
build your own workflow → agent replaceability**. Проект «AgentClinic» end-to-end. Есть **легаси** и
**заменяемость агента** (редко). Минус: beginner, оценка — один квиз, нет капстоуна.

### Udemy — «SDD: From Vibe-Coding to AI Engineering» (Skliar)
~3ч45м, квиз после каждого урока. Четыре фазы: **Specify → Plan → Tasks → Implement** (+ drift
detection). Модули: M1 смена мышления («power inversion», SDLC/PRD/TDD/BDD→SDD); M2 workflow;
M3 governance (constitution, CLAUDE.md/AGENTS.md, «always/ask/never»); M4 spec-writing (**EARS**,
clarification gates, визуалы для UI). Силён в mindset/governance. Минус: короткий, мало brownfield.

### AWS Kiro (tooling)
Линейные 3 фазы: Requirements (`requirements.md`, **EARS**: `WHEN [event] THE SYSTEM SHALL [behavior]`)
→ Design (`design.md`) → Tasks. Steering files = конституция. Agent hooks. Исполнение «волнами»
(waves последовательно, задачи в волне параллельно). Минус: избыточен для мелких задач.

### Tessl (контрарная модель)
**Spec-as-source-of-truth**: спеки долговечны (1:1 с файлами кода), `GENERATED FROM SPEC — DO NOT EDIT`,
двусторонняя синхронизация, регенерация вместо правки. Единственная модель для долгой жизни спеки. Beta.

### Общий паттерн «AI для разработчиков»
Vanderbilt AI Agent Developer (Coursera, 6 курсов, капстоун). Anthropic Claude Code 101 (agentic loop:
gather→act→verify; Explore→Plan→Code→Commit). **CodePath Applied AI Engineering — 10-нед когорта,
1 live 2ч/нед + 4–9ч дз** (ближайший формат-аналог). IBM/OpenAI сертификаты — реальный капстоун + роль.

## Решения для нашего курса

### ADOPT (проверенное)
- **7-шаговый backbone** как явный костяк; учить tool-agnostic, Spec Kit как reference (free).
- **Constitution/steering + AGENTS.md/CLAUDE.md** на старте (наш W3 «контекст» — это оно).
- **EARS** для acceptance criteria (W2) — конкретно, тестируемо, легко оценивать.
- **Clarification gate** (`NEEDS CLARIFICATION`) до планирования (W2).
- **Mindset «power inversion»** + lineage TDD/BDD→SDD как мотивирующий W1.
- **Follow-along проект, растущий фича-за-фичей с репланом** (наш сквозной проект).
- **Build-your-own skills + заменяемость агента** — усиление к финалу.
- **Поурочные квизы** для закрепления.

### DIFFERENTIATE (пробелы конкурентов = наши козыри)
1. **Brownfield/легаси вглубь** — у нас отдельная неделя W7 (у конкурентов 0–1 урок). Главный козырь.
2. **Governance на команду** — мульти-автор спеки, branch-per-spec, PR-ревью спек, конституция на команду.
3. **Drift detection + жизнь спеки** — операционная дисциплина (идея Tessl spec-as-source как advanced).
4. **Review fatigue / когда SDD избыточен** — честный блок (пробел, который называет Fowler).
5. **Реальный graded capstone + peer review** — у нас W8 защита (конкуренты стоп на квизе).
6. **Senior-трек глубже** — architecture-decision спеки, contract testing, мульти-агент.

### Наш канон vs backbone (выравнивание)
| Backbone | Наша неделя |
|---|---|
| Mindset + Constitution | W1 (mindset) + W3 (constitution/context) |
| Specify (+EARS, Clarify) | W2 |
| Plan / Tasks | W4 |
| Implement (human-in-loop) | W4 |
| Verify (tests, review) | W5–W6 |
| Brownfield | W7 |
| Capstone | W8 |

Вывод: наш 8-недельный канон уже совпадает с индустриальным backbone и закрывает 2 главных пробела
(легаси, капстоун). Точечные усиления из бенчмарка: EARS + clarification gate в W2; явный блок
«когда SDD избыточен»; governance-на-команду как enrichment для senior-трека.

## Источники
- Spec Kit: https://github.com/github/spec-kit · https://github.com/github/spec-kit/blob/main/spec-driven.md · https://github.github.com/spec-kit/
- DeepLearning.AI: https://www.deeplearning.ai/courses/spec-driven-development-with-coding-agents · https://github.com/https-deeplearning-ai/sc-spec-driven-development-files
- Udemy (Skliar): https://www.udemy.com/course/spec-driven-development-sdd-from-vibe-coding-to-reliable/
- AWS Kiro: https://kiro.dev/docs/specs/ · EARS: https://alistairmavin.com/ears/
- Fowler (Kiro/Spec Kit/Tessl): https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
- Vanderbilt: https://www.coursera.org/specializations/ai-agents
- CodePath: https://www.codepath.org/courses/applied-ai-engineering · https://www.anthropic.com/news/anthropic-codepath-partnership
- Anthropic Academy: https://anthropic.skilljar.com/claude-code-101
- IBM RAG/Agentic: https://www.coursera.org/professional-certificates/ibm-rag-and-agentic-ai
- GitHub blog: https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
