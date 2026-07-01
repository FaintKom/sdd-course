/* @ds-bundle: {"format":3,"namespace":"GrassLMSDesignSystem_662f3d","components":[],"sourceHashes":{"design_handoff_grasslms/feedback/app.jsx":"310b8296ef2c","design_handoff_grasslms/feedback/ex-drag.jsx":"6eb733ef885d","design_handoff_grasslms/feedback/ex-fill.jsx":"9414f49e13b5","design_handoff_grasslms/feedback/ex-lang.jsx":"cf995d5a90f4","design_handoff_grasslms/feedback/ex-matching.jsx":"b67dccedf388","design_handoff_grasslms/feedback/ex-math.jsx":"864601cb7afc","design_handoff_grasslms/feedback/ex-numberline.jsx":"b833d04de4f6","design_handoff_grasslms/feedback/ex-quiz.jsx":"fbd34bb9211e","design_handoff_grasslms/feedback/shell.jsx":"eb6cb051f1d8","design_handoff_grasslms/feedback/theory.jsx":"6bdcdd3bea3d","design_handoff_grasslms/ui_kits/lms_app/admin.jsx":"52f6c1848332","design_handoff_grasslms/ui_kits/lms_app/catalog.jsx":"300ed1b0564d","design_handoff_grasslms/ui_kits/lms_app/dashboard.jsx":"b8d7f32d41c4","design_handoff_grasslms/ui_kits/lms_app/lesson.jsx":"bff45576619a","design_handoff_grasslms/ui_kits/lms_app/primitives.jsx":"82dee36e4253","design_handoff_grasslms/ui_kits/lms_app/sidebar.jsx":"e69bdaa2b392","feedback/app.jsx":"d9c630e6049b","feedback/ex-drag.jsx":"6eb733ef885d","feedback/ex-fill.jsx":"9414f49e13b5","feedback/ex-lang.jsx":"cf995d5a90f4","feedback/ex-matching.jsx":"b67dccedf388","feedback/ex-math.jsx":"864601cb7afc","feedback/ex-numberline.jsx":"b833d04de4f6","feedback/ex-quiz.jsx":"fbd34bb9211e","feedback/shell.jsx":"eb6cb051f1d8","feedback/theory.jsx":"6bdcdd3bea3d","feedback/tweaks-panel.jsx":"6591467622ed","ui_kits/lms_app/Admin.jsx":"52f6c1848332","ui_kits/lms_app/Catalog.jsx":"300ed1b0564d","ui_kits/lms_app/Dashboard.jsx":"b8d7f32d41c4","ui_kits/lms_app/Lesson.jsx":"bff45576619a","ui_kits/lms_app/Primitives.jsx":"82dee36e4253","ui_kits/lms_app/Sidebar.jsx":"e69bdaa2b392"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GrassLMSDesignSystem_662f3d = window.GrassLMSDesignSystem_662f3d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// design_handoff_grasslms/feedback/app.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ============================================================
   app.jsx — демо-композиция хендофа (без Tweaks).
   Режим проверки зафиксирован: deferred (по кнопке «Проверить»)
   для «Пар» и «Категорий»; конфетти включено.
   ============================================================ */

const FB_TABS = [{
  key: 'theory',
  label: 'Теория'
}, {
  key: 'quiz',
  label: 'Выбор',
  group: 'БАЗА'
}, {
  key: 'matching',
  label: 'Пары'
}, {
  key: 'fill',
  label: 'Пропуски'
}, {
  key: 'ordering',
  label: 'Порядок'
}, {
  key: 'categorize',
  label: 'Категории'
}, {
  key: 'numberline',
  label: 'Ось'
}, {
  key: 'input',
  label: 'Ввод'
}, {
  key: 'balance',
  label: 'Весы',
  group: 'МАТЕМ'
}, {
  key: 'coords',
  label: 'Координаты'
}, {
  key: 'stepwise',
  label: 'По шагам'
}, {
  key: 'sentence',
  label: 'Фраза',
  group: 'ЯЗЫКИ'
}, {
  key: 'dialogue',
  label: 'Диалог'
}, {
  key: 'flashcards',
  label: 'Карточки'
}];
function FbApp() {
  const [tab, setTab] = React.useState('theory');
  const [xp, setXp] = React.useState(2840);
  const [streak, setStreak] = React.useState(7);
  const [solved, setSolved] = React.useState({});
  const [bump, setBump] = React.useState(false);
  const [runId, setRunId] = React.useState(0);
  const reward = fromEl => {
    flyXP(fromEl, 20, () => {
      setXp(x => x + 20);
      setBump(true);
      setTimeout(() => setBump(false), 500);
    });
  };
  const onTaskEnd = key => correct => {
    setSolved(s => ({
      ...s,
      [key]: correct
    }));
    setStreak(s => correct ? s + 1 : 0);
  };
  const tabIdx = FB_TABS.findIndex(x => x.key === tab);
  const onAdvance = () => {
    setTab(FB_TABS[(tabIdx + 1) % FB_TABS.length].key);
    setRunId(r => r + 1);
    window.scrollTo({
      top: 0
    });
  };
  const switchTab = key => {
    setTab(key);
    setRunId(r => r + 1);
    window.scrollTo({
      top: 0
    });
  };
  const common = {
    step: tabIdx,
    totalSteps: FB_TABS.length - 1,
    streak,
    reward,
    onAdvance,
    confettiEnabled: true,
    onTaskEnd: onTaskEnd(tab),
    deferred: true
  };
  let screen = null;
  if (tab === 'theory') screen = /*#__PURE__*/React.createElement(Theory, {
    key: 'th' + runId,
    onAdvance: onAdvance,
    reward: reward,
    confettiEnabled: true
  });else {
    const Comp = {
      quiz: ExQuiz,
      matching: ExMatching,
      fill: ExFill,
      ordering: ExOrdering,
      categorize: ExCategorize,
      numberline: ExNumberLine,
      input: ExInput,
      balance: ExBalance,
      coords: ExCoords,
      stepwise: ExStepwise,
      sentence: ExSentence,
      dialogue: ExDialogue,
      flashcards: ExFlashcards
    }[tab];
    screen = /*#__PURE__*/React.createElement("div", {
      className: "fb-stage"
    }, /*#__PURE__*/React.createElement(Comp, _extends({
      key: tab + runId
    }, common)));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "fbp-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fbp-mark"
  }, "g"), /*#__PURE__*/React.createElement("nav", {
    className: "fbp-tabs"
  }, FB_TABS.map(x => /*#__PURE__*/React.createElement(React.Fragment, {
    key: x.key
  }, x.group && /*#__PURE__*/React.createElement("span", {
    className: "fbp-group"
  }, x.group), /*#__PURE__*/React.createElement("button", {
    className: 'fbp-tab' + (tab === x.key ? ' active' : ''),
    onClick: () => switchTab(x.key)
  }, x.label, solved[x.key] && /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }, "\u2713"))))), /*#__PURE__*/React.createElement("span", {
    className: "fbp-stat streak"
  }, /*#__PURE__*/React.createElement(FbIco.Flame, null), " ", streak), /*#__PURE__*/React.createElement("span", {
    id: "xp-anchor",
    className: 'fbp-stat xp' + (bump ? ' bump' : '')
  }, /*#__PURE__*/React.createElement(FbIco.Star, null), " ", xp.toLocaleString('ru-RU'), " XP")), tab === 'theory' ? screen : /*#__PURE__*/React.createElement("main", null, screen));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(FbApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/feedback/app.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/feedback/ex-drag.jsx
try { (() => {
/* ============================================================
   ex-drag.jsx — «Расставь по порядку» и «Разложи по группам»
   Pointer-драг: ghost с наклоном, расступающиеся соседи,
   подсветка корзины-цели, пружинный возврат при ошибке.
   ============================================================ */

/* ---------- Порядок ---------- */
const FB_ORDER_ITEMS = ['Привести уравнение к виду ax² + bx + c = 0', 'Вычислить Δ = b² − 4ac', 'Определить число корней по знаку Δ', 'Найти корни по формуле'];
const FB_ROW = 56,
  FB_GAP = 10,
  FB_SLOT = FB_ROW + FB_GAP;
function ExOrdering({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const n = FB_ORDER_ITEMS.length;
  const [order, setOrder] = React.useState(() => {
    let o = fbShuffle(FB_ORDER_ITEMS.map((_, i) => i));
    while (o.every((v, i) => v === i)) o = fbShuffle(o);
    return o;
  });
  const [drag, setDrag] = React.useState(null); // {pos, dy}
  const [settledIdx, setSettledIdx] = React.useState(null);
  const [graded, setGraded] = React.useState(false);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const startY = React.useRef(0);
  const listRef = React.useRef(null);
  const targetPos = drag ? Math.max(0, Math.min(n - 1, drag.pos + Math.round(drag.dy / FB_SLOT))) : null;
  const down = pos => e => {
    if (task.feedback || graded) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startY.current = e.clientY;
    setDrag({
      pos,
      dy: 0
    });
    setSettledIdx(null);
  };
  const move = e => {
    if (!drag) return;
    setDrag({
      ...drag,
      dy: e.clientY - startY.current
    });
  };
  const up = () => {
    if (!drag) return;
    const from = drag.pos,
      to = targetPos;
    if (from !== to) {
      const next = order.slice();
      const [m] = next.splice(from, 1);
      next.splice(to, 0, m);
      setOrder(next);
      setSettledIdx(to);
      setTimeout(() => setSettledIdx(null), 350);
    }
    setDrag(null);
  };
  const check = () => {
    setGraded(true);
    if (order.every((v, i) => v === i)) {
      task.win('Идеальная последовательность!');
      fire();
      reward(listRef.current);
    } else {
      const more = task.lose(null, FB_ORDER_ITEMS.map((s, i) => i + 1 + '. ' + s).join(' '), 'Порядок сохранён — поправь и проверь снова');
      if (more) setTimeout(() => setGraded(false), 900);
    }
  };
  const retry = () => {
    setGraded(false);
    task.clear();
  };
  const shiftFor = pos => {
    if (!drag || pos === drag.pos) return 0;
    if (drag.pos < targetPos && pos > drag.pos && pos <= targetPos) return -FB_SLOT;
    if (drag.pos > targetPos && pos < drag.pos && pos >= targetPos) return FB_SLOT;
    return 0;
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u041F\u041E\u0420\u042F\u0414\u041E\u041A \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u0420\u0430\u0441\u0441\u0442\u0430\u0432\u044C \u0448\u0430\u0433\u0438 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u043F\u043E \u043F\u043E\u0440\u044F\u0434\u043A\u0443",
    feedback: task.feedback,
    canCheck: !graded && !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    ref: listRef,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: FB_GAP,
      maxWidth: 540,
      margin: '0 auto',
      width: '100%'
    }
  }, order.map((itemIdx, pos) => {
    const isDrag = drag && drag.pos === pos;
    const showState = graded && task.feedback ? itemIdx === pos ? 'ok' : 'no' : '';
    const displayNum = isDrag ? targetPos + 1 : pos + 1 + (shiftFor(pos) < 0 ? -1 : shiftFor(pos) > 0 ? 1 : 0);
    return /*#__PURE__*/React.createElement("div", {
      key: itemIdx,
      className: 'fb-dragrow' + (isDrag ? ' dragging' : '') + (settledIdx === pos ? ' settled' : '') + (showState ? ' ' + showState : ''),
      style: {
        transform: isDrag ? 'translateY(' + drag.dy + 'px) rotate(calc(1.4deg * var(--mamp))) scale(1.02)' : 'translateY(' + shiftFor(pos) + 'px)'
      },
      onPointerDown: down(pos),
      onPointerMove: move,
      onPointerUp: up,
      onPointerCancel: up
    }, /*#__PURE__*/React.createElement("span", {
      className: "num"
    }, displayNum), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, FB_ORDER_ITEMS[itemIdx]), /*#__PURE__*/React.createElement("span", {
      className: "grip"
    }, "\u22EE\u22EE"));
  })));
}

/* ---------- Категории ---------- */
const FB_CAT_CHIPS = [{
  id: 0,
  label: 'x² − 5x + 6 = 0',
  cat: 'two'
}, {
  id: 1,
  label: 'x² + x + 1 = 0',
  cat: 'none'
}, {
  id: 2,
  label: 'x² − 9 = 0',
  cat: 'two'
}, {
  id: 3,
  label: 'x² − 2x + 5 = 0',
  cat: 'none'
}];
const FB_BUCKETS = [{
  key: 'two',
  title: 'Есть корни · Δ ≥ 0'
}, {
  key: 'none',
  title: 'Нет корней · Δ < 0'
}];
function ExCategorize({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled,
  deferred
}) {
  const [placed, setPlaced] = React.useState({
    two: [],
    none: []
  });
  const [chipStates, setChipStates] = React.useState({}); // id -> 'ok' | 'no'
  const [drag, setDrag] = React.useState(null); // {id, dx, dy, over}
  const [flash, setFlash] = React.useState(null); // {key, kind:'gotcha'|'reject'|'catch'}
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const start = React.useRef({
    x: 0,
    y: 0
  });
  const bucketRefs = React.useRef({});
  const wrapRef = React.useRef(null);
  const inTray = FB_CAT_CHIPS.filter(c => !placed.two.includes(c.id) && !placed.none.includes(c.id));
  const bucketAt = (x, y) => {
    for (const b of FB_BUCKETS) {
      const el = bucketRefs.current[b.key];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return b.key;
    }
    return null;
  };
  const down = id => e => {
    if (task.feedback) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = {
      x: e.clientX,
      y: e.clientY
    };
    setDrag({
      id,
      dx: 0,
      dy: 0,
      over: null
    });
  };
  const move = e => {
    if (!drag) return;
    setDrag({
      ...drag,
      dx: e.clientX - start.current.x,
      dy: e.clientY - start.current.y,
      over: bucketAt(e.clientX, e.clientY)
    });
  };
  const up = () => {
    if (!drag) return;
    const chip = FB_CAT_CHIPS.find(c => c.id === drag.id);
    const over = drag.over;
    setDrag(null);
    if (!over) return; // вернётся пружиной
    if (deferred) {
      /* принимаем в любую корзину — оценка по кнопке */
      setPlaced(p => ({
        ...p,
        [over]: [...p[over], chip.id]
      }));
      setFlash({
        key: over,
        kind: 'catch'
      });
      setTimeout(() => setFlash(null), 450);
      return;
    }
    if (chip.cat === over) {
      const next = {
        ...placed,
        [over]: [...placed[over], chip.id]
      };
      setPlaced(next);
      setFlash({
        key: over,
        kind: 'gotcha'
      });
      setTimeout(() => setFlash(null), 450);
      if (next.two.length + next.none.length === FB_CAT_CHIPS.length) {
        setTimeout(() => {
          task.win('Все уравнения по местам!');
          fire();
          reward(wrapRef.current);
        }, 380);
      }
    } else {
      setFlash({
        key: over,
        kind: 'reject'
      });
      setTimeout(() => setFlash(null), 450);
      task.lose('У этого уравнения другой знак Δ');
    }
  };

  /* отложенная проверка: неверные фишки возвращаются в ряд */
  const check = () => {
    const states = {};
    let badIds = [];
    FB_BUCKETS.forEach(b => {
      placed[b.key].forEach(id => {
        const ok = FB_CAT_CHIPS.find(c => c.id === id).cat === b.key;
        states[id] = ok ? 'ok' : 'no';
        if (!ok) badIds.push(id);
      });
    });
    setChipStates(states);
    if (badIds.length === 0) {
      task.win('Все уравнения по местам!');
      fire();
      reward(wrapRef.current);
    } else {
      setTimeout(() => {
        setPlaced(p => ({
          two: p.two.filter(id => !badIds.includes(id)),
          none: p.none.filter(id => !badIds.includes(id))
        }));
        setChipStates(s => {
          const ns = {
            ...s
          };
          badIds.forEach(id => delete ns[id]);
          return ns;
        });
        task.lose(badIds.length === 1 ? 'Одна фишка не на месте — она вернулась' : 'Не на месте: ' + badIds.length + ' — они вернулись в ряд');
      }, 750);
    }
  };

  /* клик по фишке в корзине — вернуть в ряд (до проверки) */
  const unplace = id => {
    if (!deferred || task.feedback || chipStates[id]) return;
    setPlaced(p => ({
      two: p.two.filter(x => x !== id),
      none: p.none.filter(x => x !== id)
    }));
  };
  const retry = () => {
    setPlaced({
      two: [],
      none: []
    });
    setChipStates({});
    task.clear();
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u041A\u0410\u0422\u0415\u0413\u041E\u0420\u0418\u0418 \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044F \u0432 \u0441\u0432\u043E\u044E \u0433\u0440\u0443\u043F\u043F\u0443",
    feedback: task.feedback,
    canCheck: deferred && inTray.length === 0 && !task.feedback,
    instant: !deferred,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    style: {
      maxWidth: 620,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      justifyContent: 'center',
      minHeight: 60,
      marginBottom: 26
    }
  }, inTray.map(c => {
    const isDrag = drag && drag.id === c.id;
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      className: 'fb-chip-drag' + (isDrag ? ' dragging' : ''),
      style: isDrag ? {
        transform: 'translate(' + drag.dx + 'px,' + drag.dy + 'px) rotate(calc(2deg * var(--mamp))) scale(1.06)'
      } : undefined,
      onPointerDown: down(c.id),
      onPointerMove: move,
      onPointerUp: up,
      onPointerCancel: up
    }, c.label);
  }), inTray.length === 0 && /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--ink-300)',
      alignSelf: 'center',
      letterSpacing: '.08em'
    }
  }, deferred && !task.feedback ? 'ВСЁ РАЗЛОЖЕНО — ЖМИ «ПРОВЕРИТЬ»' : 'ВСЁ РАЗЛОЖЕНО')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, FB_BUCKETS.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.key,
    ref: el => {
      bucketRefs.current[b.key] = el;
    },
    className: 'fb-bucket' + (drag && drag.over === b.key ? ' over' : '') + (flash && flash.key === b.key ? ' ' + flash.kind : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-bucket-title"
  }, b.title, /*#__PURE__*/React.createElement("span", {
    className: "cnt"
  }, placed[b.key].length)), placed[b.key].map(id => {
    const st = chipStates[id];
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      className: 'fb-chip-drag landed' + (st ? ' ' + st : ''),
      onClick: () => unplace(id),
      title: deferred && !st && !task.feedback ? 'Нажми, чтобы вернуть в ряд' : undefined,
      style: {
        cursor: deferred && !st && !task.feedback ? 'pointer' : 'default',
        alignSelf: 'flex-start',
        borderColor: st ? undefined : deferred ? 'color-mix(in oklab, var(--link-color) 55%, var(--ink-100))' : 'var(--green-300)',
        background: st ? undefined : deferred ? 'color-mix(in oklab, var(--link-color) 7%, var(--paper-2))' : 'var(--green-50)'
      }
    }, FB_CAT_CHIPS.find(c => c.id === id).label);
  }))))));
}
Object.assign(window, {
  ExOrdering,
  ExCategorize
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/feedback/ex-drag.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/feedback/ex-fill.jsx
try { (() => {
/* ============================================================
   ex-fill.jsx — «Заполни пропуски»
   Слово летит из банка в слот (FLIP-клон), слоты пульсируют
   при наведении на слово, пофрагментная проверка.
   ============================================================ */

const FB_FILL = {
  parts: ['Если дискриминант ', null, ' нуля, то уравнение имеет ', null, ' действительных корня.'],
  answers: ['больше', 'два'],
  bank: ['больше', 'меньше', 'два', 'ноль', 'один']
};
function ExFill({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const slotCount = FB_FILL.parts.filter(p => p === null).length;
  const [slots, setSlots] = React.useState(Array(slotCount).fill(null)); // word index | null
  const [used, setUsed] = React.useState([]);
  const [armed, setArmed] = React.useState(null);
  const [hoverBank, setHoverBank] = React.useState(false);
  const [slotStates, setSlotStates] = React.useState(Array(slotCount).fill('')); // '' | 'ok' | 'no' | 'flash'
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const pillRefs = React.useRef({});
  const slotRefs = React.useRef({});
  const wrapRef = React.useRef(null);
  const setSlotState = (si, st) => setSlotStates(ss => ss.map((x, i) => i === si ? st : x));
  const place = wi => {
    if (task.feedback || used.includes(wi)) return;
    const si = armed != null && slots[armed] === null ? armed : slots.findIndex(s => s === null);
    if (si < 0) return;
    setArmed(null);
    setUsed(u => [...u, wi]);
    flyClone(pillRefs.current[wi], slotRefs.current[si], null, () => {
      setSlots(s => s.map((x, i) => i === si ? wi : x));
      setSlotState(si, 'flash');
      setTimeout(() => setSlotState(si, ''), 450);
    });
  };
  const unplace = si => {
    if (task.feedback) return;
    if (slots[si] === null) {
      setArmed(armed === si ? null : si);
      return;
    }
    const wi = slots[si];
    setSlots(s => s.map((x, i) => i === si ? null : x));
    setSlotState(si, '');
    flyClone(slotRefs.current[si], pillRefs.current[wi], null, () => {
      setUsed(u => u.filter(x => x !== wi));
    });
  };
  const check = () => {
    const states = slots.map((wi, i) => FB_FILL.bank[wi] === FB_FILL.answers[i] ? 'ok' : 'no');
    setSlotStates(states);
    if (states.every(s => s === 'ok')) {
      task.win('Слова на своих местах!');
      fire();
      reward(wrapRef.current);
    } else {
      task.lose('Подсвеченные слова не подходят', FB_FILL.answers.join(' · '));
    }
  };

  // «Ещё раз»: верные остаются, неверные возвращаются в банк
  const retry = () => {
    slots.forEach((wi, i) => {
      if (wi !== null && FB_FILL.bank[wi] !== FB_FILL.answers[i]) {
        setUsed(u => u.filter(x => x !== wi));
        setSlots(s => s.map((x, j) => j === i ? null : x));
      }
    });
    setSlotStates(ss => ss.map(s => s === 'ok' ? 'ok' : ''));
    task.clear();
  };
  const allFilled = slots.every(s => s !== null);
  let slotCursor = -1;
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u041F\u0420\u041E\u041F\u0423\u0421\u041A\u0418 \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u0421\u043E\u0431\u0435\u0440\u0438 \u043F\u0440\u0430\u0432\u0438\u043B\u043E \u0438\u0437 \u0441\u043B\u043E\u0432",
    feedback: task.feedback,
    canCheck: allFilled && !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    ref: wrapRef
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      lineHeight: 2.3,
      fontWeight: 600,
      maxWidth: 560,
      margin: '0 auto 34px',
      textAlign: 'center'
    }
  }, FB_FILL.parts.map((p, i) => {
    if (p !== null) return /*#__PURE__*/React.createElement("span", {
      key: i
    }, p);
    slotCursor += 1;
    const si = slotCursor;
    const wi = slots[si];
    const st = slotStates[si];
    const cls = 'fb-slot' + (wi !== null ? ' filled' : '') + (armed === si ? ' armed' : '') + (wi === null && hoverBank && !task.feedback ? ' pulse' : '') + (st ? ' ' + st : '');
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      ref: el => {
        slotRefs.current[si] = el;
      },
      className: cls,
      onClick: () => unplace(si),
      title: wi !== null ? 'Нажми, чтобы вернуть слово' : 'Нажми, чтобы выбрать этот пропуск'
    }, wi === null ? '·' : FB_FILL.bank[wi]);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10,
      justifyContent: 'center',
      maxWidth: 520,
      margin: '0 auto'
    }
  }, FB_FILL.bank.map((w, wi) => /*#__PURE__*/React.createElement("button", {
    key: wi,
    ref: el => {
      pillRefs.current[wi] = el;
    },
    className: 'gp-tile' + (used.includes(wi) ? ' locked' : ''),
    style: {
      padding: '10px 18px',
      fontSize: 15,
      borderRadius: 999,
      opacity: used.includes(wi) ? .25 : 1
    },
    disabled: used.includes(wi) || !!task.feedback,
    onClick: () => place(wi),
    onPointerEnter: () => setHoverBank(true),
    onPointerLeave: () => setHoverBank(false)
  }, w)))));
}
Object.assign(window, {
  ExFill
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/feedback/ex-fill.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/feedback/ex-lang.jsx
try { (() => {
/* ============================================================
   ex-lang.jsx — языковые задания:
   · ExSentence — собери фразу из слов (Duolingo-tile build)
   · ExDialogue — диалог с выбором реплики (typing dots, баблы)
   · ExFlashcards — SRS-карточки (3D-флип, 4 оценки, интервалы)
   ============================================================ */

/* ---------- Собери фразу ---------- */
const FB_SENT = {
  source: 'Я учу математику каждый день',
  correct: ['I', 'study', 'math', 'every', 'day'],
  distractors: ['plays', 'the', 'week']
};
function ExSentence({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const all = React.useMemo(() => [...FB_SENT.correct, ...FB_SENT.distractors].map((w, i) => ({
    w,
    i
  })), []);
  const [bank, setBank] = React.useState(() => fbShuffle(all));
  const [picked, setPicked] = React.useState([]);
  const [graded, setGraded] = React.useState(false);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const rowRef = React.useRef(null);
  const toPicked = item => {
    if (task.feedback) return;
    setGraded(false);
    setBank(b => b.filter(x => x.i !== item.i));
    setPicked(p => [...p, item]);
  };
  const toBank = item => {
    if (task.feedback) return;
    setGraded(false);
    setPicked(p => p.filter(x => x.i !== item.i));
    setBank(b => [...b, item]);
  };
  const check = () => {
    setGraded(true);
    const got = picked.map(p => p.w);
    const ok = got.length === FB_SENT.correct.length && got.every((w, i) => w === FB_SENT.correct[i]);
    if (ok) {
      task.win('Идеальная фраза!');
      fire();
      reward(rowRef.current);
    } else {
      task.lose('Порядок не сошёлся — подсвечены слова не на месте', FB_SENT.correct.join(' '));
    }
  };
  const retry = () => {
    setGraded(false);
    task.clear();
  };
  const wordState = (item, pos) => {
    if (!graded || !task.feedback) return '';
    return FB_SENT.correct[pos] === item.w ? 'correct' : 'wrong';
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u0421\u041E\u0411\u0415\u0420\u0418 \u0424\u0420\u0410\u0417\u0423 \xB7 \u0410\u041D\u0413\u041B\u0418\u0419\u0421\u041A\u0418\u0419",
    title: "\u041F\u0435\u0440\u0435\u0432\u0435\u0434\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
    feedback: task.feedback,
    canCheck: picked.length > 0 && !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 540,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      background: 'var(--paper)',
      borderRadius: 14,
      border: '2px solid var(--ink-100)',
      fontSize: 17,
      fontWeight: 600,
      marginBottom: 22,
      textAlign: 'center'
    }
  }, FB_SENT.source), /*#__PURE__*/React.createElement("div", {
    ref: rowRef,
    style: {
      minHeight: 62,
      padding: '10px 4px',
      borderTop: '2px solid var(--ink-100)',
      borderBottom: '2px solid var(--ink-100)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      alignContent: 'flex-start',
      marginBottom: 24
    }
  }, picked.length === 0 && /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--ink-200)',
      alignSelf: 'center',
      letterSpacing: '.08em'
    }
  }, "\u041D\u0410\u0416\u0418\u041C\u0410\u0419 \u041D\u0410 \u0421\u041B\u041E\u0412\u0410 \u0412\u041D\u0418\u0417\u0423"), picked.map((p, pos) => /*#__PURE__*/React.createElement("button", {
    key: p.i,
    className: 'gp-tile ' + wordState(p, pos),
    style: {
      padding: '9px 15px',
      fontSize: 16
    },
    disabled: !!task.feedback && task.feedback.kind === 'ok',
    onClick: () => toBank(p),
    title: "\u041D\u0430\u0436\u043C\u0438, \u0447\u0442\u043E\u0431\u044B \u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0441\u043B\u043E\u0432\u043E"
  }, p.w))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'center'
    }
  }, bank.map(b => /*#__PURE__*/React.createElement("button", {
    key: b.i,
    className: "gp-tile",
    style: {
      padding: '9px 15px',
      fontSize: 16
    },
    disabled: !!task.feedback,
    onClick: () => toPicked(b)
  }, b.w)), bank.length === 0 && /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--ink-200)',
      letterSpacing: '.08em'
    }
  }, "\u0411\u0410\u041D\u041A \u041F\u0423\u0421\u0422"))));
}

/* ---------- Диалог ---------- */
const FB_DLG = {
  messages: [{
    speaker: 'Anna',
    text: 'Hi! How was your weekend?'
  }, {
    speaker: 'Anna',
    text: 'Did you do anything fun?'
  }],
  options: [{
    id: 'a',
    text: 'Yes, I went hiking with friends.',
    correct: true
  }, {
    id: 'b',
    text: 'Yes, tomorrow I will go.',
    correct: false
  }, {
    id: 'c',
    text: 'He is going to the cinema.',
    correct: false
  }]
};
function ExDialogue({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const [stage, setStage] = React.useState(0); // сколько NPC-сообщений показано; typing перед каждым
  const [typing, setTyping] = React.useState(true);
  const [pick, setPick] = React.useState(null);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const previewRef = React.useRef(null);

  /* поэтапное появление сообщений с индикатором набора */
  React.useEffect(() => {
    if (stage >= FB_DLG.messages.length) {
      setTyping(false);
      return;
    }
    setTyping(true);
    const t1 = setTimeout(() => {
      setTyping(false);
      const t2 = setTimeout(() => setStage(s => s + 1), 120);
      return () => clearTimeout(t2);
    }, stage === 0 ? 700 : 900);
    return () => clearTimeout(t1);
  }, [stage]);
  const check = () => {
    const opt = FB_DLG.options.find(o => o.id === pick);
    if (opt && opt.correct) {
      task.win('Отличный ответ — время и смысл сходятся');
      fire();
      reward(previewRef.current);
    } else {
      task.lose('Эта реплика не отвечает на вопрос о прошедших выходных', FB_DLG.options.find(o => o.correct).text);
    }
  };
  const retry = () => {
    setPick(null);
    task.clear();
  };
  const shown = FB_DLG.messages.slice(0, stage);
  const allShown = stage >= FB_DLG.messages.length;
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u0414\u0418\u0410\u041B\u041E\u0413 \xB7 \u0410\u041D\u0413\u041B\u0418\u0419\u0421\u041A\u0418\u0419",
    title: "\u0412\u044B\u0431\u0435\u0440\u0438 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0443\u044E \u0440\u0435\u043F\u043B\u0438\u043A\u0443",
    feedback: task.feedback,
    canCheck: pick !== null && !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 480,
      margin: '0 auto',
      width: '100%'
    }
  }, shown.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "fb-bubble-row pop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-avatar"
  }, m.speaker[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--ink-400)',
      fontWeight: 700,
      marginBottom: 3,
      letterSpacing: '.06em'
    }
  }, m.speaker.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    className: "fb-bubble"
  }, m.text)))), typing && !allShown && /*#__PURE__*/React.createElement("div", {
    className: "fb-bubble-row pop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-avatar"
  }, "A"), /*#__PURE__*/React.createElement("div", {
    className: "fb-bubble fb-typing"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null))), pick && /*#__PURE__*/React.createElement("div", {
    className: "fb-bubble-row me pop",
    ref: previewRef
  }, /*#__PURE__*/React.createElement("div", {
    className: 'fb-bubble me' + (task.feedback && task.feedback.kind === 'no' ? ' no' : '')
  }, FB_DLG.options.find(o => o.id === pick).text)), allShown && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      textAlign: 'center',
      margin: '18px 0 10px'
    }
  }, "\u0422\u0412\u041E\u0419 \u041E\u0422\u0412\u0415\u0422"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, FB_DLG.options.map(o => {
    let st = '';
    if (task.feedback) {
      if (o.correct) st = 'correct';else if (o.id === pick) st = 'wrong';else st = 'locked';
    } else if (o.id === pick) st = 'selected';
    return /*#__PURE__*/React.createElement("button", {
      key: o.id,
      className: 'gp-tile ' + st,
      style: {
        padding: '13px 17px',
        fontSize: 15,
        textAlign: 'left'
      },
      disabled: !!task.feedback,
      onClick: () => setPick(o.id)
    }, o.text);
  })))));
}

/* ---------- SRS-карточки ---------- */
const FB_CARDS = [{
  front: 'reliable',
  back: 'надёжный',
  hint: '[rɪˈlaɪəbl]'
}, {
  front: 'curious',
  back: 'любопытный',
  hint: '[ˈkjʊəriəs]'
}, {
  front: 'effort',
  back: 'усилие',
  hint: '[ˈefət]'
}];
const FB_RATES = [{
  key: 'again',
  label: 'Снова',
  iv: '<10м',
  bg: 'var(--coral-500)',
  sh: 'var(--coral-700)',
  fg: '#fff'
}, {
  key: 'hard',
  label: 'Трудно',
  iv: '1ч',
  bg: 'var(--sun-400)',
  sh: 'var(--sun-500)',
  fg: 'var(--ink-900)'
}, {
  key: 'good',
  label: 'Хорошо',
  iv: '1д',
  bg: 'var(--green-600)',
  sh: 'var(--green-700)',
  fg: '#fff'
}, {
  key: 'easy',
  label: 'Легко',
  iv: '4д',
  bg: 'var(--green-500)',
  sh: 'var(--green-700)',
  fg: '#fff'
}];
function ExFlashcards({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [anim, setAnim] = React.useState('enter'); // 'enter' | 'exit' | ''
  const [stats, setStats] = React.useState({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0
  });
  const [feedback, setFeedback] = React.useState(null);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const cardRef = React.useRef(null);
  const rate = key => {
    const ns = {
      ...stats,
      [key]: stats[key] + 1
    };
    setStats(ns);
    if (idx === FB_CARDS.length - 1) {
      const known = ns.good + ns.easy;
      setFeedback({
        kind: 'ok',
        msg: 'Колода пройдена: ' + known + ' / ' + FB_CARDS.length + ' уверенно',
        explain: 'Интервалы повторения обновлены'
      });
      onTaskEnd && onTaskEnd(true);
      fire();
      reward(cardRef.current);
      return;
    }
    setAnim('exit');
    setTimeout(() => {
      setIdx(i => i + 1);
      setFlipped(false);
      setAnim('enter');
    }, 320);
  };
  const card = FB_CARDS[idx];
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: null,
    eyebrow: 'КАРТОЧКИ · АНГЛИЙСКИЙ · ' + (idx + 1) + ' / ' + FB_CARDS.length,
    title: "\u041F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435 \u0441\u043B\u043E\u0432",
    feedback: feedback,
    canCheck: false,
    instant: true,
    instantLabel: flipped ? 'ОЦЕНИ, НАСКОЛЬКО ЛЕГКО ВСПОМНИЛОСЬ' : 'НАЖМИ НА КАРТОЧКУ, ЧТОБЫ ПЕРЕВЕРНУТЬ',
    onCheck: () => {},
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 400,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-dots"
  }, FB_CARDS.map((_, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    className: i < idx ? 'done' : i === idx ? 'cur' : ''
  }))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: 'fb-cardwrap ' + anim,
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'fb-card3d' + (flipped ? ' flipped' : ''),
    style: {
      height: 230
    },
    onClick: () => !feedback && setFlipped(true)
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner",
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-card-face"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, "\u0421\u041B\u041E\u0412\u041E"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 46,
      fontWeight: 800,
      letterSpacing: '-0.02em'
    }
  }, card.front), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 10,
      fontSize: 10,
      color: 'var(--ink-300)',
      letterSpacing: '.08em'
    }
  }, "\u041D\u0410\u0416\u041C\u0418, \u0427\u0422\u041E\u0411\u042B \u041F\u0415\u0420\u0415\u0412\u0415\u0420\u041D\u0423\u0422\u042C"))), /*#__PURE__*/React.createElement("div", {
    className: "fb-card-face back"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, "\u041F\u0415\u0420\u0415\u0412\u041E\u0414"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 800
    }
  }, card.back), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 6,
      fontSize: 14,
      color: 'var(--ink-500)'
    }
  }, card.hint)))))), flipped && !feedback && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 8
    }
  }, FB_RATES.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.key,
    className: "fb-rate",
    style: {
      background: r.bg,
      color: r.fg,
      boxShadow: '0 4px 0 0 ' + r.sh
    },
    onClick: () => rate(r.key)
  }, r.label, /*#__PURE__*/React.createElement("small", null, r.iv))))));
}
Object.assign(window, {
  ExSentence,
  ExDialogue,
  ExFlashcards
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/feedback/ex-lang.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/feedback/ex-matching.jsx
try { (() => {
/* ============================================================
   ex-matching.jsx — «Соедини пары»
   Два способа соединения:
   · клик-клик: выбрал плитку → выбрал пару
   · drag: зажал плитку → нить тянется за курсором → отпустил над целью
   Линия-резинка, магнит цели, постоянные линии после совпадения.
   ============================================================ */

const FB_PAIRS = [{
  left: 'Δ > 0',
  right: 'Два различных корня'
}, {
  left: 'Δ = 0',
  right: 'Один повторяющийся корень'
}, {
  left: 'Δ < 0',
  right: 'Действительных корней нет'
}, {
  left: 'b² − 4ac',
  right: 'Формула дискриминанта'
}];
function fbShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function ExMatching({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled,
  deferred
}) {
  const idxs = FB_PAIRS.map((_, i) => i);
  const [leftOrder] = React.useState(() => fbShuffle(idxs));
  const [rightOrder] = React.useState(() => fbShuffle(idxs));
  const [picked, setPicked] = React.useState(null); // {side,idx}
  const [hot, setHot] = React.useState(null); // {side,idx}
  const [matched, setMatched] = React.useState([]); // [idx] — подтверждённые
  const [links, setLinks] = React.useState([]); // [[l,r]] — соединено, не проверено
  const [freshLink, setFreshLink] = React.useState(null); // l свежей мягкой связи
  const [fresh, setFresh] = React.useState(null); // только что совпавшая пара
  const [wrongPairs, setWrongPairs] = React.useState(null); // [[l,r], ...]
  const [cursor, setCursor] = React.useState(null); // {x,y} в координатах wrap
  const [, setTick] = React.useState(0);
  const task = useTaskState(4, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const wrapRef = React.useRef(null);
  const tileRefs = React.useRef({});
  const dragRef = React.useRef(null); // {side, idx, x0, y0, moved, prevPicked}

  React.useEffect(() => {
    const onR = () => setTick(t => t + 1);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);
  const anchor = (side, idx) => {
    const el = tileRefs.current[side + idx];
    const wrap = wrapRef.current;
    if (!el || !wrap) return null;
    const r = el.getBoundingClientRect();
    const w = wrap.getBoundingClientRect();
    return {
      x: (side === 'L' ? r.right : r.left) - w.left,
      y: r.top + r.height / 2 - w.top
    };
  };
  const bezier = (a, b) => {
    const c = Math.max(30, Math.abs(b.x - a.x) * 0.45);
    const dir = b.x >= a.x ? 1 : -1;
    return 'M ' + a.x + ' ' + a.y + ' C ' + (a.x + c * dir) + ' ' + a.y + ', ' + (b.x - c * dir) + ' ' + b.y + ', ' + b.x + ' ' + b.y;
  };

  /* решение пары — общий выход для клика и перетаскивания */
  const resolvePair = (lIdx, rIdx) => {
    setHot(null);
    if (deferred) {
      /* просто связываем — оценка по кнопке «Проверить» */
      setLinks(ls => [...ls.filter(p => p[0] !== lIdx && p[1] !== rIdx), [lIdx, rIdx]]);
      setFreshLink(lIdx);
      setPicked(null);
      setCursor(null);
      return;
    }
    if (lIdx === rIdx) {
      setMatched(m => {
        const nm = [...m, lIdx];
        if (nm.length === FB_PAIRS.length) {
          setTimeout(() => {
            task.win('Все пары на месте!');
            fire();
            reward(wrapRef.current);
          }, 380);
        }
        return nm;
      });
      setFresh(lIdx);
      setPicked(null);
      setCursor(null);
    } else {
      setWrongPairs([[lIdx, rIdx]]);
      setPicked(null);
      setCursor(null);
      setTimeout(() => {
        setWrongPairs(null);
        task.lose('Эта пара не сходится');
      }, 620);
    }
  };

  /* отложенная проверка: верные закрепляются, неверные отцепляются */
  const check = () => {
    const ok = links.filter(p => p[0] === p[1]);
    const bad = links.filter(p => p[0] !== p[1]);
    if (ok.length) {
      setMatched(m => [...m, ...ok.map(p => p[0])]);
      setFresh(ok[0][0]);
    }
    if (bad.length === 0) {
      setLinks([]);
      task.win('Все пары сошлись!');
      fire();
      reward(wrapRef.current);
    } else {
      setLinks(bad);
      setWrongPairs(bad);
      setTimeout(() => {
        setWrongPairs(null);
        setLinks([]);
        task.lose(bad.length === 1 ? 'Одна пара не сошлась — она отцеплена' : 'Не сошлось пар: ' + bad.length + ' — они отцеплены');
      }, 700);
    }
  };

  /* нажатие на плитку: сразу цепляем нить — и для клика, и для drag */
  const tileDown = (side, idx) => e => {
    if (task.feedback || matched.includes(idx) || wrongPairs) return;
    /* связанная, но не проверенная плитка — отцепляем и берём заново */
    if (deferred) {
      setLinks(ls => ls.filter(p => p[side === 'L' ? 0 : 1] !== idx));
    }
    dragRef.current = {
      side,
      idx,
      x0: e.clientX,
      y0: e.clientY,
      moved: false,
      prevPicked: picked
    };
    if (!picked || picked.side === side) {
      setPicked({
        side,
        idx
      });
      const w = wrapRef.current && wrapRef.current.getBoundingClientRect();
      if (w) setCursor({
        x: e.clientX - w.left,
        y: e.clientY - w.top
      });
    }
  };
  const onMove = e => {
    const d = dragRef.current;
    if (d && !d.moved && Math.hypot(e.clientX - d.x0, e.clientY - d.y0) > 6) d.moved = true;
    if (!picked || !wrapRef.current) return;
    const w = wrapRef.current.getBoundingClientRect();
    setCursor({
      x: e.clientX - w.left,
      y: e.clientY - w.top
    });
  };

  /* отпускание где угодно: завершаем drag или трактуем как клик */
  React.useEffect(() => {
    const up = e => {
      const d = dragRef.current;
      if (!d) return;
      dragRef.current = null;
      if (task.feedback) return;
      if (!d.moved) {
        /* клик-семантика */
        const p = d.prevPicked;
        if (p && p.side === d.side && p.idx === d.idx) {
          setPicked(null);
          setCursor(null); // повторный клик — снять выбор
        } else if (p && p.side !== d.side) {
          const lIdx = d.side === 'L' ? d.idx : p.idx;
          const rIdx = d.side === 'R' ? d.idx : p.idx;
          resolvePair(lIdx, rIdx); // второй клик — решаем пару
        }
        return;
      }

      /* drag-семантика: ищем плитку под точкой отпускания */
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const t = el && el.closest('[data-mside]');
      if (t) {
        const side = t.dataset.mside;
        const idx = parseInt(t.dataset.midx, 10);
        if (side !== d.side && !matched.includes(idx)) {
          const lIdx = d.side === 'L' ? d.idx : idx;
          const rIdx = d.side === 'R' ? d.idx : idx;
          resolvePair(lIdx, rIdx);
          return;
        }
      }
      /* отпустили в пустоту — нить отцепляется */
      setPicked(null);
      setCursor(null);
      setHot(null);
    };
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  });
  const retry = () => {
    if (!deferred) {
      setMatched([]);
      setFresh(null);
    }
    setLinks([]);
    setFreshLink(null);
    setPicked(null);
    setWrongPairs(null);
    setCursor(null);
    task.clear();
  };
  const linkFor = (side, idx) => links.find(p => p[side === 'L' ? 0 : 1] === idx);
  const inWrong = (side, idx) => wrongPairs && wrongPairs.some(p => p[side === 'L' ? 0 : 1] === idx);
  const stateFor = (side, idx) => {
    if (matched.includes(idx)) return fresh === idx ? 'correct' : 'correct locked';
    if (inWrong(side, idx)) return 'wrong';
    if (picked && picked.side === side && picked.idx === idx) return 'selected';
    if (picked && picked.side !== side) {
      if (hot && hot.side === side && hot.idx === idx) return 'hot';
      return linkFor(side, idx) ? 'linked' : 'candidate';
    }
    if (linkFor(side, idx)) return 'linked';
    return '';
  };

  // линия-резинка: от выбранной плитки к курсору (или магнитом к горячей цели)
  let cursorPath = null;
  let cursorEnd = null;
  if (picked) {
    const a = anchor(picked.side, picked.idx);
    let b = null;
    if (hot && hot.side !== picked.side) b = anchor(hot.side, hot.idx);else if (cursor) b = cursor;
    if (a && b) {
      cursorPath = bezier(a, b);
      cursorEnd = b;
    }
  }
  const renderTile = (side, idx) => /*#__PURE__*/React.createElement("button", {
    key: side + idx,
    ref: el => {
      tileRefs.current[side + idx] = el;
    },
    "data-mside": side,
    "data-midx": idx,
    className: 'gp-tile ' + stateFor(side, idx),
    style: side === 'L' ? {
      fontFamily: "'Geist Mono', monospace",
      fontSize: 17,
      textAlign: 'center',
      touchAction: 'none'
    } : {
      fontSize: 14,
      textAlign: 'center',
      touchAction: 'none'
    },
    onPointerDown: tileDown(side, idx),
    onPointerEnter: () => picked && picked.side !== side && !matched.includes(idx) && setHot({
      side,
      idx
    }),
    onPointerLeave: () => setHot(null)
  }, FB_PAIRS[idx][side === 'L' ? 'left' : 'right']);
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u0421\u041E\u0415\u0414\u0418\u041D\u0418 \u041F\u0410\u0420\u042B \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u0421\u043E\u0435\u0434\u0438\u043D\u0438 \u0437\u043D\u0430\u043A \u0434\u0438\u0441\u043A\u0440\u0438\u043C\u0438\u043D\u0430\u043D\u0442\u0430 \u0441 \u0432\u044B\u0432\u043E\u0434\u043E\u043C",
    feedback: task.feedback,
    canCheck: deferred && links.length + matched.length === FB_PAIRS.length && !wrongPairs && !task.feedback,
    instant: !deferred,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    className: "fb-linkwrap",
    onPointerMove: onMove,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px 90px',
      maxWidth: 620,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    className: "fb-linksvg"
  }, matched.map(idx => {
    const a = anchor('L', idx);
    const b = anchor('R', idx);
    if (!a || !b) return null;
    return /*#__PURE__*/React.createElement("path", {
      key: idx,
      className: 'fb-line-done' + (fresh === idx ? ' fresh' : ''),
      d: bezier(a, b)
    });
  }), links.map(([l, r]) => {
    if (inWrong('L', l)) return null;
    const a = anchor('L', l);
    const b = anchor('R', r);
    if (!a || !b) return null;
    return /*#__PURE__*/React.createElement("path", {
      key: 's' + l + '-' + r,
      className: 'fb-line-soft' + (freshLink === l ? ' fresh' : ''),
      d: bezier(a, b)
    });
  }), wrongPairs && wrongPairs.map(([l, r]) => {
    const a = anchor('L', l);
    const b = anchor('R', r);
    if (!a || !b) return null;
    return /*#__PURE__*/React.createElement("path", {
      key: 'w' + l + '-' + r,
      className: "fb-line-wrong",
      d: bezier(a, b)
    });
  }), cursorPath && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    className: "fb-line-cursor",
    d: cursorPath
  }), (() => {
    const a = anchor(picked.side, picked.idx);
    return a ? /*#__PURE__*/React.createElement("circle", {
      className: "fb-line-anchor",
      cx: a.x,
      cy: a.y,
      r: "6"
    }) : null;
  })(), cursorEnd && /*#__PURE__*/React.createElement("circle", {
    className: "fb-line-dot",
    cx: cursorEnd.x,
    cy: cursorEnd.y,
    r: "5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, leftOrder.map(idx => renderTile('L', idx))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, rightOrder.map(idx => renderTile('R', idx)))), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      textAlign: 'center',
      fontSize: 11,
      color: 'var(--ink-300)',
      letterSpacing: '.06em',
      marginTop: 22
    }
  }, deferred ? 'СОЕДИНИ ВСЁ И НАЖМИ «ПРОВЕРИТЬ» · НАЖАТИЕ НА СВЯЗАННУЮ ПЛИТКУ ОТЦЕПЛЯЕТ НИТЬ' : 'КЛИКАЙ ПО ДВУМ ПЛИТКАМ — ИЛИ ПЕРЕТАЩИ НИТЬ С ОДНОЙ НА ДРУГУЮ'));
}
Object.assign(window, {
  ExMatching,
  fbShuffle
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/feedback/ex-matching.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/feedback/ex-math.jsx
try { (() => {
/* ============================================================
   ex-math.jsx — математические задания:
   · ExBalance — весы-уравнение (наклон-вобл, операции над обеими чашами)
   · ExCoords — координатная плоскость (drag точек, перекрестье, снап)
   · ExStepwise — решение по шагам (повалидация каждой строки)
   ============================================================ */

/* ---------- Весы ---------- */
const FB_BAL = {
  initial: {
    leftX: 3,
    leftW: 4,
    rightX: 1,
    rightW: 10
  },
  target: {
    leftX: 1,
    leftW: 0,
    rightX: 0,
    rightW: 3
  },
  explain: '3x + 4 = x + 10 → 2x + 4 = 10 → 2x = 6 → x = 3'
};
function fbEqState(a, b) {
  return a.leftX === b.leftX && a.leftW === b.leftW && a.rightX === b.rightX && a.rightW === b.rightW;
}
function FbScaleItems({
  kind,
  count
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 4,
      justifyContent: 'center'
    }
  }, Array.from({
    length: count
  }, (_, i) => kind === 'x' ? /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "fb-witem",
    style: {
      width: 26,
      height: 26,
      borderRadius: 6,
      background: 'var(--green-600)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontFamily: "'Geist Mono', monospace",
      fontWeight: 800,
      fontSize: 13,
      boxShadow: 'inset 0 -3px 0 var(--green-700)'
    }
  }, "x") : /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "fb-witem",
    style: {
      width: 15,
      height: 15,
      borderRadius: '50%',
      background: 'var(--sun-400)',
      boxShadow: 'inset 0 -2px 0 var(--sun-500)'
    }
  })));
}
function fbEqText(s) {
  const side = (x, w) => {
    if (x === 0 && w === 0) return '0';
    const parts = [];
    if (x > 0) parts.push((x > 1 ? x : '') + 'x');
    if (w > 0) parts.push(String(w));
    return parts.join(' + ');
  };
  return side(s.leftX, s.leftW) + ' = ' + side(s.rightX, s.rightW);
}
function ExBalance({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const [s, setS] = React.useState(FB_BAL.initial);
  const [moves, setMoves] = React.useState([]);
  const [wobble, setWobble] = React.useState(false);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const beamRef = React.useRef(null);
  const atTarget = fbEqState(s, FB_BAL.target);
  const applyOp = (label, next) => {
    if (task.feedback) return;
    setS(next);
    setMoves(m => [...m, label]);
    setWobble(true);
    setTimeout(() => setWobble(false), 650);
  };
  const ops = [{
    label: '−1 с обеих',
    can: s.leftW >= 1 && s.rightW >= 1,
    run: () => applyOp('−1', {
      ...s,
      leftW: s.leftW - 1,
      rightW: s.rightW - 1
    })
  }, {
    label: '−4 с обеих',
    can: s.leftW >= 4 && s.rightW >= 4,
    run: () => applyOp('−4', {
      ...s,
      leftW: s.leftW - 4,
      rightW: s.rightW - 4
    })
  }, {
    label: '−x с обеих',
    can: s.leftX >= 1 && s.rightX >= 1,
    run: () => applyOp('−x', {
      ...s,
      leftX: s.leftX - 1,
      rightX: s.rightX - 1
    })
  }, {
    label: '÷ ' + (s.leftX > 1 ? s.leftX : '…'),
    can: s.leftX >= 2 && s.leftW % s.leftX === 0 && s.rightW % s.leftX === 0 && s.rightX === 0,
    run: () => applyOp('÷' + s.leftX, {
      leftX: 1,
      leftW: s.leftW / s.leftX,
      rightX: 0,
      rightW: s.rightW / s.leftX
    })
  }];
  const check = () => {
    if (atTarget) {
      task.win('x выделен: x = 3', FB_BAL.explain);
      fire();
      reward(beamRef.current);
    } else {
      task.lose('x ещё не один на чаше — продолжай упрощать');
    }
  };
  const retry = () => {
    setS(FB_BAL.initial);
    setMoves([]);
    task.clear();
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u0412\u0415\u0421\u042B \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u041E\u0441\u0442\u0430\u0432\u044C x \u043E\u0434\u0438\u043D \u043D\u0430 \u043B\u0435\u0432\u043E\u0439 \u0447\u0430\u0448\u0435",
    feedback: task.feedback,
    canCheck: !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      textAlign: 'center',
      fontSize: 19,
      fontWeight: 700,
      marginBottom: 16,
      transition: 'color 200ms',
      color: atTarget ? 'var(--green-700)' : 'var(--ink-700)'
    }
  }, fbEqText(s)), /*#__PURE__*/React.createElement("div", {
    ref: beamRef,
    className: 'fb-beam-wrap fb-beam' + (wobble ? ' wobble' : '')
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'fb-pan' + (atTarget ? ' glow' : ''),
    style: {
      background: 'var(--green-50)',
      border: '2px solid var(--green-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, "\u041B\u0415\u0412\u0410\u042F"), /*#__PURE__*/React.createElement(FbScaleItems, {
    kind: "x",
    count: s.leftX
  }), /*#__PURE__*/React.createElement(FbScaleItems, {
    kind: "w",
    count: s.leftW
  })), /*#__PURE__*/React.createElement("div", {
    className: 'fb-pan' + (atTarget ? ' glow' : ''),
    style: {
      background: 'var(--sun-50)',
      border: '2px solid var(--sun-300)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, "\u041F\u0420\u0410\u0412\u0410\u042F"), /*#__PURE__*/React.createElement(FbScaleItems, {
    kind: "x",
    count: s.rightX
  }), /*#__PURE__*/React.createElement(FbScaleItems, {
    kind: "w",
    count: s.rightW
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      background: 'var(--ink-700)',
      borderRadius: 999,
      margin: '10px 40px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 22,
      background: 'var(--ink-700)',
      borderRadius: '0 0 6px 6px',
      margin: '0 auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 20
    }
  }, ops.map((op, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "gp-tile fb-op mono",
    style: {
      padding: '9px 15px',
      fontSize: 13
    },
    disabled: !op.can || !!task.feedback,
    onClick: op.run
  }, op.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 14,
      minHeight: 22
    }
  }, moves.map((m, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "fb-move-chip"
  }, m)))));
}

/* ---------- Координатная плоскость ---------- */
const FB_CP = {
  range: 6,
  targets: [{
    x: 2,
    y: 3,
    label: 'A',
    color: 'var(--green-600)'
  }, {
    x: -4,
    y: -2,
    label: 'B',
    color: 'var(--coral-500)'
  }, {
    x: 5,
    y: -4,
    label: 'C',
    color: '#2b91ff'
  }]
};
const FB_CP_SIZE = 360;
const FB_CP_PAD = 30;
function ExCoords({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const {
    range,
    targets
  } = FB_CP;
  const scale = (FB_CP_SIZE - FB_CP_PAD * 2) / (range * 2);
  const toX = v => FB_CP_PAD + (v + range) * scale;
  const toY = v => FB_CP_PAD + (range - v) * scale;
  const [pts, setPts] = React.useState([{
    x: 0,
    y: 1
  }, {
    x: 1,
    y: 0
  }, {
    x: -1,
    y: 0
  }]);
  const [drag, setDrag] = React.useState(null);
  const [graded, setGraded] = React.useState(false);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const svgRef = React.useRef(null);
  const fromEvent = e => {
    const r = svgRef.current.getBoundingClientRect();
    const x = Math.round((e.clientX - r.left - FB_CP_PAD) / scale - range);
    const y = Math.round(range - (e.clientY - r.top - FB_CP_PAD) / scale);
    return {
      x: Math.max(-range, Math.min(range, x)),
      y: Math.max(-range, Math.min(range, y))
    };
  };
  const down = i => e => {
    if (task.feedback) return;
    e.currentTarget.setPointerCapture && svgRef.current.setPointerCapture(e.pointerId);
    setDrag(i);
    setGraded(false);
  };
  const move = e => {
    if (drag === null || task.feedback) return;
    const p = fromEvent(e);
    setPts(ps => ps.map((pp, i) => i === drag ? p : pp));
  };
  const up = () => setDrag(null);
  const check = () => {
    setGraded(true);
    const allOk = targets.every((t, i) => pts[i].x === t.x && pts[i].y === t.y);
    if (allOk) {
      task.win('Все точки точно в цель!');
      fire();
      reward(svgRef.current);
    } else {
      const off = targets.filter((t, i) => pts[i].x !== t.x || pts[i].y !== t.y).length;
      task.lose('Мимо: ' + off + ' — цели показаны пунктиром');
    }
  };
  const retry = () => {
    setGraded(false);
    task.clear();
  };
  const gridLines = [];
  for (let v = -range; v <= range; v++) gridLines.push(v);
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u041A\u041E\u041E\u0420\u0414\u0418\u041D\u0410\u0422\u042B \xB7 \u0413\u0415\u041E\u041C\u0415\u0422\u0420\u0418\u042F",
    title: "\u0420\u0430\u0441\u0441\u0442\u0430\u0432\u044C \u0442\u043E\u0447\u043A\u0438 \u043F\u043E \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0430\u043C",
    feedback: task.feedback,
    canCheck: !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    ref: svgRef,
    width: FB_CP_SIZE,
    height: FB_CP_SIZE,
    style: {
      background: 'var(--paper)',
      border: '2px solid var(--ink-100)',
      borderRadius: 14,
      userSelect: 'none',
      touchAction: 'none'
    },
    onPointerMove: move,
    onPointerUp: up,
    onPointerCancel: up
  }, gridLines.map(v => /*#__PURE__*/React.createElement("g", {
    key: v
  }, /*#__PURE__*/React.createElement("line", {
    x1: toX(v),
    y1: toY(-range),
    x2: toX(v),
    y2: toY(range),
    stroke: "var(--ink-100)",
    strokeWidth: v === 0 ? 0 : 1
  }), /*#__PURE__*/React.createElement("line", {
    x1: toX(-range),
    y1: toY(v),
    x2: toX(range),
    y2: toY(v),
    stroke: "var(--ink-100)",
    strokeWidth: v === 0 ? 0 : 1
  }))), /*#__PURE__*/React.createElement("line", {
    x1: toX(0),
    y1: toY(-range),
    x2: toX(0),
    y2: toY(range),
    stroke: "var(--ink-400)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: toX(-range),
    y1: toY(0),
    x2: toX(range),
    y2: toY(0),
    stroke: "var(--ink-400)",
    strokeWidth: "1.5"
  }), drag !== null && /*#__PURE__*/React.createElement("g", {
    className: "fb-crosshair"
  }, /*#__PURE__*/React.createElement("line", {
    x1: toX(pts[drag].x),
    y1: toY(0),
    x2: toX(pts[drag].x),
    y2: toY(pts[drag].y),
    stroke: targets[drag].color,
    strokeWidth: "1.5",
    strokeDasharray: "3 4",
    opacity: ".6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: toX(0),
    y1: toY(pts[drag].y),
    x2: toX(pts[drag].x),
    y2: toY(pts[drag].y),
    stroke: targets[drag].color,
    strokeWidth: "1.5",
    strokeDasharray: "3 4",
    opacity: ".6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: toX(pts[drag].x) - 26,
    y: toY(pts[drag].y) - 44,
    width: "52",
    height: "22",
    rx: "6",
    fill: "var(--ink-900)"
  }), /*#__PURE__*/React.createElement("text", {
    x: toX(pts[drag].x),
    y: toY(pts[drag].y) - 29,
    textAnchor: "middle",
    fill: "#fff",
    fontSize: "11",
    fontWeight: "700",
    fontFamily: "'Geist Mono', monospace"
  }, pts[drag].x, ",", pts[drag].y)), graded && task.feedback && task.feedback.kind === 'no' && targets.map((t, i) => (pts[i].x !== t.x || pts[i].y !== t.y) && /*#__PURE__*/React.createElement("circle", {
    key: 't' + i,
    className: "fb-target-ring",
    cx: toX(t.x),
    cy: toY(t.y),
    r: "12",
    fill: "none",
    stroke: t.color,
    strokeWidth: "2",
    strokeDasharray: "3 3",
    opacity: ".55"
  })), pts.map((p, i) => {
    const t = targets[i];
    const isOk = graded && task.feedback && p.x === t.x && p.y === t.y;
    const isNo = graded && task.feedback && !isOk;
    return /*#__PURE__*/React.createElement("g", {
      key: i,
      className: 'fb-pt' + (drag === i ? ' grabbed' : '') + (isOk ? ' ok' : ''),
      onPointerDown: down(i)
    }, /*#__PURE__*/React.createElement("circle", {
      className: "body",
      cx: toX(p.x),
      cy: toY(p.y),
      r: "14",
      fill: isOk ? 'var(--green-600)' : isNo ? 'var(--err-border)' : t.color,
      stroke: "#fff",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("text", {
      x: toX(p.x),
      y: toY(p.y) + 4.5,
      textAnchor: "middle",
      fill: "#fff",
      fontSize: "12",
      fontWeight: "800",
      fontFamily: "'Geist Mono', monospace",
      style: {
        pointerEvents: 'none'
      }
    }, t.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "\u0420\u0410\u0417\u041C\u0415\u0421\u0422\u0418 \u0422\u041E\u0427\u041A\u0418"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, targets.map((t, i) => {
    const p = pts[i];
    const here = p.x === t.x && p.y === t.y;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '8px 10px',
        borderRadius: 10,
        background: 'var(--paper-2)',
        border: '2px solid ' + (graded && task.feedback ? here ? 'var(--green-300)' : 'var(--err-border)' : 'var(--ink-100)'),
        transition: 'border-color 200ms'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: t.color,
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        fontFamily: "'Geist Mono', monospace",
        fontWeight: 800,
        fontSize: 11
      }
    }, t.label), /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 12.5,
        fontWeight: 700,
        whiteSpace: 'nowrap'
      }
    }, "(", t.x, ", ", t.y, ")"), /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        marginLeft: 'auto',
        fontSize: 10,
        color: here ? 'var(--green-700)' : 'var(--ink-400)'
      }
    }, p.x, ",", p.y));
  })), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 12,
      fontSize: 10,
      color: 'var(--ink-300)',
      letterSpacing: '.06em',
      lineHeight: 1.7
    }
  }, "\u0422\u042F\u041D\u0418 \u0422\u041E\u0427\u041A\u0423 \u2014 \u041F\u0415\u0420\u0415\u041A\u0420\u0415\u0421\u0422\u042C\u0415 \u041F\u041E\u041A\u0410\u0416\u0415\u0422 \u041A\u041E\u041E\u0420\u0414\u0418\u041D\u0410\u0422\u042B"))));
}

/* ---------- По шагам ---------- */
const FB_SW = {
  problem: '2x + 6 = 14',
  steps: [{
    label: 'Шаг 1',
    expected: '2x = 8',
    hint: 'перенеси 6'
  }, {
    label: 'Шаг 2',
    expected: 'x = 4',
    hint: 'раздели на 2'
  }]
};
const fbNorm = s => s.replace(/\s+/g, '').toLowerCase();
function ExStepwise({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const [vals, setVals] = React.useState(FB_SW.steps.map(() => ''));
  const [graded, setGraded] = React.useState(false);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const inputRefs = React.useRef([]);
  const allFilled = vals.every(v => v.trim() !== '');
  const check = () => {
    setGraded(true);
    const flags = FB_SW.steps.map((s, i) => fbNorm(vals[i]) === fbNorm(s.expected));
    if (flags.every(Boolean)) {
      task.win('Каждый шаг точен!');
      fire();
      reward(inputRefs.current[FB_SW.steps.length - 1]);
    } else {
      task.lose('Проверь подсвеченные строки — верные сохранены', FB_SW.steps.map(s => s.expected).join(' → '));
    }
  };
  const retry = () => {
    setGraded(false);
    task.clear();
    const firstBad = FB_SW.steps.findIndex((s, i) => fbNorm(vals[i]) !== fbNorm(s.expected));
    setTimeout(() => firstBad >= 0 && inputRefs.current[firstBad] && inputRefs.current[firstBad].focus(), 60);
  };
  const stateFor = i => {
    if (!graded || !task.feedback) return '';
    return fbNorm(vals[i]) === fbNorm(FB_SW.steps[i].expected) ? 'ok' : 'no';
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u041F\u041E \u0428\u0410\u0413\u0410\u041C \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u0420\u0435\u0448\u0438 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435, \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0443",
    feedback: task.feedback,
    canCheck: allFilled && !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 440,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "th-formula",
    style: {
      marginBottom: 20,
      fontSize: 26
    }
  }, FB_SW.problem), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, FB_SW.steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "fb-step-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fb-step-label"
  }, s.label), /*#__PURE__*/React.createElement("input", {
    ref: el => {
      inputRefs.current[i] = el;
    },
    className: 'fb-step-input ' + stateFor(i),
    placeholder: s.hint,
    value: vals[i],
    disabled: !!task.feedback,
    onChange: e => {
      setVals(v => v.map((x, j) => j === i ? e.target.value : x));
      setGraded(false);
    },
    onKeyDown: e => {
      if (e.key !== 'Enter') return;
      if (i < FB_SW.steps.length - 1) inputRefs.current[i + 1] && inputRefs.current[i + 1].focus();else if (allFilled && !task.feedback) check();
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 14,
      fontSize: 10,
      color: 'var(--ink-300)',
      letterSpacing: '.06em',
      textAlign: 'center'
    }
  }, "ENTER \u2014 \u041A \u0421\u041B\u0415\u0414\u0423\u042E\u0429\u0415\u0419 \u0421\u0422\u0420\u041E\u041A\u0415 \xB7 \u041F\u0420\u041E\u0411\u0415\u041B\u042B \u0418 \u0420\u0415\u0413\u0418\u0421\u0422\u0420 \u041D\u0415 \u0412\u0410\u0416\u041D\u042B")));
}
Object.assign(window, {
  ExBalance,
  ExCoords,
  ExStepwise
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/feedback/ex-math.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/feedback/ex-numberline.jsx
try { (() => {
/* ============================================================
   ex-numberline.jsx — «Числовая ось»
   Маркер с нажатой физикой, всплывающее значение, магнит делений,
   призрак правильного ответа при провале.
   ============================================================ */

const FB_NL = {
  min: -5,
  max: 5,
  target: -2,
  start: 1
};
function ExNumberLine({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const {
    min,
    max,
    target
  } = FB_NL;
  const [pos, setPos] = React.useState(FB_NL.start);
  const [grabbed, setGrabbed] = React.useState(false);
  const [state, setState] = React.useState(''); // '' | 'ok' | 'no'
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const trackRef = React.useRef(null);
  const markerRef = React.useRef(null);
  const setFromX = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    setPos(Math.round(min + t * (max - min)));
  };
  const down = e => {
    if (task.feedback) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setGrabbed(true);
    setState('');
  };
  const move = e => {
    if (grabbed) setFromX(e.clientX);
  };
  const up = () => setGrabbed(false);
  const clickTrack = e => {
    if (!task.feedback && !grabbed) {
      setFromX(e.clientX);
      setState('');
    }
  };
  const check = () => {
    if (pos === target) {
      setState('ok');
      task.win('Ровно в точку!');
      fire();
      reward(markerRef.current);
    } else {
      setState('no');
      const more = task.lose('Маркер стоит на ' + pos, String(target));
      if (more) setTimeout(() => setState(''), 700);
    }
  };
  const retry = () => {
    setState('');
    task.clear();
  };
  const frac = (pos - min) / (max - min);
  const ticks = Array.from({
    length: max - min + 1
  }, (_, i) => min + i);
  const showGhost = task.out && task.feedback;
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u0427\u0418\u0421\u041B\u041E\u0412\u0410\u042F \u041E\u0421\u042C \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u041E\u0442\u043C\u0435\u0442\u044C \u0447\u0438\u0441\u043B\u043E \u22122 \u043D\u0430 \u043E\u0441\u0438",
    feedback: task.feedback,
    canCheck: !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      margin: '0 auto',
      width: '100%',
      padding: '40px 20px 10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onClick: clickTrack,
    style: {
      position: 'relative',
      height: 110,
      cursor: task.feedback ? 'default' : 'pointer',
      userSelect: 'none',
      touchAction: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      left: 0,
      right: 0,
      height: 4,
      background: 'var(--ink-200)',
      borderRadius: 999
    }
  }), ticks.map(n => {
    const t = (n - min) / (max - min);
    return /*#__PURE__*/React.createElement("div", {
      key: n,
      className: 'fb-tick' + (n === pos ? ' near' : ''),
      style: {
        position: 'absolute',
        top: 58,
        left: t * 100 + '%',
        width: 2,
        height: 16,
        marginLeft: -1,
        background: n === 0 ? 'var(--ink-700)' : 'var(--ink-300)',
        borderRadius: 1,
        transformOrigin: 'bottom'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        position: 'absolute',
        top: 22,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 13,
        fontWeight: 600,
        color: n === pos ? 'var(--green-700)' : n === 0 ? 'var(--ink-900)' : 'var(--ink-400)'
      }
    }, n));
  }), showGhost && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 20,
      left: (target - min) / (max - min) * 100 + '%',
      width: 46,
      height: 46,
      marginLeft: -23,
      borderRadius: 999,
      border: '2px dashed var(--green-500)',
      color: 'var(--green-700)',
      display: 'grid',
      placeItems: 'center',
      fontFamily: "'Geist Mono', monospace",
      fontSize: 14,
      fontWeight: 800
    }
  }, target), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 20,
      left: frac * 100 + '%',
      marginLeft: -23,
      transition: grabbed ? 'none' : 'left 140ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'fb-marker-bubble' + (grabbed ? ' show' : '')
  }, pos), /*#__PURE__*/React.createElement("div", {
    ref: markerRef,
    className: 'fb-marker' + (grabbed ? ' grabbed' : '') + (state ? ' ' + state : ''),
    onPointerDown: down,
    onPointerMove: move,
    onPointerUp: up,
    onPointerCancel: up
  }, pos))), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      textAlign: 'center',
      fontSize: 11,
      color: 'var(--ink-300)',
      letterSpacing: '.06em',
      marginTop: 8
    }
  }, "\u041F\u0415\u0420\u0415\u0422\u0410\u0429\u0418 \u041C\u0410\u0420\u041A\u0415\u0420 \u0418\u041B\u0418 \u041A\u041B\u0418\u041A\u041D\u0418 \u041F\u041E \u041E\u0421\u0418")));
}
Object.assign(window, {
  ExNumberLine
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/feedback/ex-numberline.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/feedback/ex-quiz.jsx
try { (() => {
/* ============================================================
   ex-quiz.jsx — «Один выбор» и «Ввод ответа»
   ============================================================ */

/* ---------- Один выбор ---------- */
function ExQuiz({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const options = ['Два различных корня', 'Один повторяющийся корень', 'Действительных корней нет', 'Нельзя определить'];
  const correct = 2;
  const [pick, setPick] = React.useState(null);
  const [graded, setGraded] = React.useState(false);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const bodyRef = React.useRef(null);
  const check = () => {
    setGraded(true);
    if (pick === correct) {
      task.win('Точно! Δ = 16 − 24 = −8 < 0');
      fire();
      reward(bodyRef.current);
    } else {
      const more = task.lose(null, options[correct], 'Δ = b² − 4ac = 16 − 24 = −8');
      if (!more) return;
    }
  };
  const retry = () => {
    setPick(null);
    setGraded(false);
    task.clear();
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u041E\u0414\u0418\u041D \u0412\u042B\u0411\u041E\u0420 \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0440\u043D\u0435\u0439 \u0443 2x\xB2 + 4x + 3 = 0?",
    feedback: task.feedback,
    canCheck: pick != null && !graded,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    ref: bodyRef,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      maxWidth: 560,
      margin: '0 auto',
      width: '100%'
    }
  }, options.map((opt, i) => {
    const isPick = pick === i;
    const showOk = graded && task.feedback && i === correct && task.feedback.kind === 'ok';
    const showNo = graded && task.feedback && isPick && i !== correct;
    const cls = showOk ? 'correct' : showNo ? 'wrong' : isPick ? 'selected' : '';
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: 'gp-tile ' + cls,
      disabled: !!task.feedback && task.feedback.kind === 'ok',
      onClick: () => {
        if (!task.feedback) {
          setPick(i);
          setGraded(false);
        }
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "tile-dot"
    }, isPick || showOk ? '✓' : showNo ? '✕' : ''), /*#__PURE__*/React.createElement("span", null, opt), showOk && /*#__PURE__*/React.createElement("span", {
      className: "tile-chip ok"
    }, "\u0412\u0415\u0420\u041D\u041E"), showNo && /*#__PURE__*/React.createElement("span", {
      className: "tile-chip no"
    }, "\u041C\u0418\u041C\u041E"));
  })));
}

/* ---------- Ввод ответа ---------- */
function ExInput({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const correct = -8;
  const [val, setVal] = React.useState('');
  const [state, setState] = React.useState(''); // '' | 'ok' | 'no'
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const inputRef = React.useRef(null);
  const check = () => {
    const num = parseFloat(val.replace(',', '.'));
    if (num === correct) {
      setState('ok');
      task.win('Δ = 4² − 4·2·3 = −8. Считаешь как калькулятор');
      fire();
      reward(inputRef.current);
    } else {
      setState('no');
      const more = task.lose(null, String(correct), 'Δ = b² − 4ac = 16 − 24');
      if (more) setTimeout(() => setState(''), 700);
    }
  };
  const retry = () => {
    setVal('');
    setState('');
    task.clear();
    setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u0412\u0412\u041E\u0414 \u041E\u0422\u0412\u0415\u0422\u0410 \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u0412\u044B\u0447\u0438\u0441\u043B\u0438 \u0434\u0438\u0441\u043A\u0440\u0438\u043C\u0438\u043D\u0430\u043D\u0442 2x\xB2 + 4x + 3 = 0",
    feedback: task.feedback,
    canCheck: val.trim() !== '' && !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "th-formula",
    style: {
      maxWidth: 360,
      margin: '0 auto 28px',
      fontSize: 21
    }
  }, "\u0394 = b\xB2 \u2212 4ac"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      fontFamily: "'Geist Mono', monospace",
      fontSize: 22,
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u0394 ="), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    className: 'fb-input ' + state,
    placeholder: "?",
    value: val,
    disabled: !!task.feedback,
    onChange: e => {
      setVal(e.target.value);
      setState('');
    },
    onKeyDown: e => {
      if (e.key === 'Enter' && val.trim() && !task.feedback) check();
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 18,
      fontSize: 11,
      color: 'var(--ink-300)',
      letterSpacing: '.06em'
    }
  }, "ENTER \u2014 \u041F\u0420\u041E\u0412\u0415\u0420\u0418\u0422\u042C")));
}
Object.assign(window, {
  ExQuiz,
  ExInput
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/feedback/ex-quiz.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/feedback/shell.jsx
try { (() => {
/* ============================================================
   shell.jsx — рама задания, фидбек-щит, конфетти, полёт XP
   ============================================================ */

const FbIco = {
  X: ({
    s = 16
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })),
  Heart: ({
    s = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  })),
  Flame: ({
    s = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-2.5C9 9 9 11 11 11c-.5-2 1-3 1-5 0-2-1-3-1-3s1.5.5 1 4Zm-2 8.5C9 11 8 12.5 8 14a4 4 0 0 0 8 0c0-2-1.5-3-2.5-3-.5 1 .5 2-.5 3-.5.5-1 .5-1.5 0-1-1 0-2-1.5-3.5Z"
  })),
  Check: ({
    s = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m5 12 5 5L20 7"
  })),
  Cross: ({
    s = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })),
  Star: ({
    s = 12
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2.9 6.26L21.5 9.3l-4.75 4.4 1.15 6.55L12 17.1l-5.9 3.15 1.15-6.55L2.5 9.3l6.6-1.04L12 2z"
  }))
};

/* ---------- Конфетти ---------- */
const FB_CONFETTI_COLORS = ['var(--green-500)', 'var(--sun-400)', 'var(--coral-500)', 'var(--green-300)', 'var(--sun-300)'];
function FbConfettiBurst() {
  const playful = document.documentElement.dataset.motion === 'playful';
  const pieces = React.useMemo(() => Array.from({
    length: playful ? 60 : 36
  }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 220,
    color: FB_CONFETTI_COLORS[i % FB_CONFETTI_COLORS.length],
    shape: i % 3
  })), []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, pieces.map((p, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      left: p.left + '%',
      background: p.color,
      borderRadius: p.shape === 0 ? '2px' : p.shape === 1 ? '50%' : '0',
      animationDelay: p.delay + 'ms'
    }
  })));
}
function useFbConfetti(enabled) {
  const [bursts, setBursts] = React.useState([]);
  const fire = React.useCallback(() => {
    if (!enabled) return;
    const id = Math.random();
    setBursts(bs => [...bs, id]);
    setTimeout(() => setBursts(bs => bs.filter(b => b !== id)), 1700);
  }, [enabled]);
  const layer = /*#__PURE__*/React.createElement("div", {
    className: "fb-confetti"
  }, bursts.map(id => /*#__PURE__*/React.createElement(FbConfettiBurst, {
    key: id
  })));
  return {
    fire,
    layer
  };
}

/* ---------- Полёт XP в шапку ---------- */
function flyXP(fromEl, amount, onArrive) {
  const target = document.getElementById('xp-anchor');
  if (!fromEl || !target) {
    onArrive && onArrive();
    return;
  }
  const a = fromEl.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = 'fb-xp-flyer';
  el.textContent = '+' + amount + ' XP';
  el.style.left = a.left + a.width / 2 - 34 + 'px';
  el.style.top = a.top - 16 + 'px';
  document.body.appendChild(el);
  // force layout, then send it to the header counter
  el.getBoundingClientRect();
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top - 16 + el.offsetHeight / 2);
  el.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(0.55)';
  el.style.opacity = '0';
  setTimeout(() => {
    el.remove();
    onArrive && onArrive();
  }, 760);
}

/* ---------- Летящий клон (пропуски: слово → слот) ---------- */
function flyClone(fromEl, toEl, className, done) {
  if (!fromEl || !toEl) {
    done && done();
    return;
  }
  const a = fromEl.getBoundingClientRect();
  const b = toEl.getBoundingClientRect();
  const el = fromEl.cloneNode(true);
  el.classList.add('fb-flyer');
  if (className) el.classList.add(className);
  el.style.left = a.left + 'px';
  el.style.top = a.top + 'px';
  el.style.width = a.width + 'px';
  el.style.height = a.height + 'px';
  el.style.margin = '0';
  el.style.transition = 'transform .32s cubic-bezier(.3,.9,.4,1.1), opacity .32s';
  document.body.appendChild(el);
  el.getBoundingClientRect();
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const sc = Math.min(1, (b.width - 8) / a.width);
  el.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ')';
  setTimeout(() => {
    el.remove();
    done && done();
  }, 330);
}

/* ---------- Фидбек-щит ---------- */
function FbSheet({
  feedback,
  onContinue,
  onRetry
}) {
  const ok = feedback.kind === 'ok';
  const canRetry = !ok && !!onRetry;
  return /*#__PURE__*/React.createElement("div", {
    className: 'fb-bottom sheet ' + (ok ? 'ok' : 'no')
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-fb-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: 'fb-fb-icon ' + (ok ? 'ok' : 'no')
  }, ok ? /*#__PURE__*/React.createElement(FbIco.Check, null) : /*#__PURE__*/React.createElement(FbIco.Cross, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'fb-fb-text ' + (ok ? 'ok' : 'no')
  }, feedback.msg || (ok ? 'Отлично!' : canRetry ? 'Попробуй ещё раз' : 'Не совсем')), feedback.correct && !ok && !canRetry && /*#__PURE__*/React.createElement("div", {
    className: "fb-fb-sub"
  }, "\u041E\u0442\u0432\u0435\u0442: ", /*#__PURE__*/React.createElement("b", null, feedback.correct)), feedback.explain && /*#__PURE__*/React.createElement("div", {
    className: "fb-fb-sub"
  }, feedback.explain)), /*#__PURE__*/React.createElement("button", {
    className: 'gp-btn ' + (ok ? '' : 'coral'),
    onClick: canRetry ? onRetry : onContinue
  }, canRetry ? 'Ещё раз' : 'Дальше')));
}

/* ---------- Рама задания ---------- */
function FbShell({
  step,
  totalSteps,
  hearts,
  streak,
  lostHeart,
  eyebrow,
  title,
  children,
  feedback,
  canCheck,
  onCheck,
  onContinue,
  onRetry,
  checkLabel,
  onSkip,
  confettiLayer,
  instant,
  instantLabel
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "fb-shell"
  }, confettiLayer, /*#__PURE__*/React.createElement("div", {
    className: "fb-top"
  }, /*#__PURE__*/React.createElement("button", {
    className: "fb-close",
    "aria-label": "\u0412\u044B\u0439\u0442\u0438"
  }, /*#__PURE__*/React.createElement(FbIco.X, null)), /*#__PURE__*/React.createElement("div", {
    className: "fb-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-progress-fill",
    style: {
      width: step / totalSteps * 100 + '%'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "fb-stepnum"
  }, step, " / ", totalSteps), /*#__PURE__*/React.createElement("span", {
    className: "fb-streak"
  }, /*#__PURE__*/React.createElement(FbIco.Flame, null), " ", streak), hearts != null && /*#__PURE__*/React.createElement("span", {
    className: 'fb-hearts ' + (lostHeart ? 'loss' : '')
  }, /*#__PURE__*/React.createElement(FbIco.Heart, null), " ", hearts)), /*#__PURE__*/React.createElement("div", {
    className: "fb-body"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    className: "gp-title"
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, children)), feedback ? /*#__PURE__*/React.createElement(FbSheet, {
    feedback: feedback,
    onContinue: onContinue,
    onRetry: onRetry
  }) : /*#__PURE__*/React.createElement("div", {
    className: "fb-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "gp-btn ghost",
    onClick: onSkip
  }, "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C"), instant ? /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      marginLeft: 'auto',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '.08em',
      color: 'var(--ink-300)'
    }
  }, instantLabel || 'ПРОВЕРКА ПРОИСХОДИТ СРАЗУ') : /*#__PURE__*/React.createElement("button", {
    className: "gp-btn",
    style: {
      marginLeft: 'auto'
    },
    disabled: !canCheck,
    onClick: onCheck
  }, checkLabel || 'Проверить'))));
}

/* ---------- Хук: общая логика попыток/фидбека ---------- */
function useTaskState(maxHearts, onTaskEnd) {
  const [hearts, setHearts] = React.useState(maxHearts);
  const [lostHeart, setLostHeart] = React.useState(false);
  const [feedback, setFeedback] = React.useState(null);
  const win = (msg, explain) => {
    setFeedback({
      kind: 'ok',
      msg,
      explain
    });
    onTaskEnd && onTaskEnd(true);
  };
  const lose = (msgWrong, correctAnswer, explain) => {
    const left = hearts - 1;
    setHearts(left);
    setLostHeart(true);
    setTimeout(() => setLostHeart(false), 550);
    if (left <= 0) {
      setFeedback({
        kind: 'no',
        msg: 'Попытки закончились',
        correct: correctAnswer,
        explain
      });
      onTaskEnd && onTaskEnd(false);
      return false;
    }
    setFeedback({
      kind: 'no',
      msg: msgWrong || (left === 1 ? 'Не то. Осталась 1 попытка' : 'Не то. Осталось попыток: ' + left)
    });
    return true;
  };
  const clear = () => setFeedback(null);
  return {
    hearts,
    lostHeart,
    feedback,
    win,
    lose,
    clear,
    out: hearts <= 0
  };
}
Object.assign(window, {
  FbIco,
  FbShell,
  FbSheet,
  useFbConfetti,
  useTaskState,
  flyXP,
  flyClone
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/feedback/shell.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/feedback/theory.jsx
try { (() => {
/* ============================================================
   theory.jsx — страница теории с живым фидбеком:
   прогресс чтения, чекпоинты разделов, выделение текста маркером,
   подсказки-термины, спойлер, inline-проверка, завершение урока.
   ============================================================ */

const TH_SECTIONS = [{
  id: 's1',
  label: 'Зачем нужен Δ'
}, {
  id: 's2',
  label: 'Формула'
}, {
  id: 's3',
  label: 'Как читать знак'
}, {
  id: 's4',
  label: 'Частая ошибка'
}, {
  id: 's5',
  label: 'Проверь себя'
}];
function ThSpoiler({
  children
}) {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: 'th-spoiler' + (open ? ' open' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "veil",
    onClick: () => setOpen(true)
  }, /*#__PURE__*/React.createElement("span", null, "\u041F\u041E\u041A\u0410\u0417\u0410\u0422\u042C \u041F\u041E\u0414\u0421\u041A\u0410\u0417\u041A\u0423")), /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, children));
}
function ThMiniQuiz() {
  const [pick, setPick] = React.useState(null);
  const correct = 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--ink-100)',
      borderRadius: 18,
      padding: '20px 22px',
      margin: '0 0 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, "\u0411\u042B\u0421\u0422\u0420\u0410\u042F \u041F\u0420\u041E\u0412\u0415\u0420\u041A\u0410"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 700,
      fontSize: 15.5,
      margin: '0 0 12px',
      color: 'var(--ink-900)'
    }
  }, "\u041C\u043E\u0436\u0435\u0442 \u043B\u0438 \u0443 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044F \u0441 \u0394 < 0 \u0431\u044B\u0442\u044C \u0434\u0432\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043A\u043E\u0440\u043D\u044F?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, ['Да', 'Нет'].map((opt, i) => {
    const cls = pick === null ? '' : i === correct ? pick === i ? 'correct' : '' : pick === i ? 'wrong' : '';
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: 'gp-tile ' + cls,
      style: {
        flex: 1,
        textAlign: 'center',
        padding: '12px 16px'
      },
      onClick: () => setPick(i)
    }, opt, pick !== null && pick === i && i === correct && /*#__PURE__*/React.createElement("span", {
      className: "tile-chip ok"
    }, "\u0412\u0415\u0420\u041D\u041E"), pick !== null && pick === i && i !== correct && /*#__PURE__*/React.createElement("span", {
      className: "tile-chip no"
    }, "\u041C\u0418\u041C\u041E"));
  })), pick !== null && /*#__PURE__*/React.createElement("p", {
    className: "mono",
    style: {
      margin: '12px 0 0',
      fontSize: 11,
      color: pick === correct ? 'var(--green-700)' : 'var(--ink-400)',
      letterSpacing: '.04em'
    }
  }, pick === correct ? 'ИМЕННО: Δ < 0 — КОРНЕЙ НЕТ' : 'НЕТ: ПРИ Δ < 0 КОРНЕЙ НЕ БЫВАЕТ. НАЖМИ «НЕТ»'));
}
function Theory({
  onAdvance,
  reward,
  confettiEnabled
}) {
  const [progress, setProgress] = React.useState(0);
  const [read, setRead] = React.useState({});
  const [active, setActive] = React.useState('s1');
  const [selTool, setSelTool] = React.useState(null); // {x, y}
  const [copied, setCopied] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const contentRef = React.useRef(null);
  const sectionRefs = React.useRef({});
  const doneBtnRef = React.useRef(null);

  /* прогресс чтения + чекпоинты разделов */
  React.useEffect(() => {
    const onScroll = () => {
      const c = contentRef.current;
      if (!c) return;
      const r = c.getBoundingClientRect();
      const vh = window.innerHeight;
      setProgress(Math.max(0, Math.min(1, (vh * 0.8 - r.top) / r.height)));
      const line = vh * 0.55;
      let act = 's1';
      const newRead = {};
      TH_SECTIONS.forEach(({
        id
      }) => {
        const el = sectionRefs.current[id];
        if (!el) return;
        const sr = el.getBoundingClientRect();
        if (sr.bottom < line) newRead[id] = true;
        if (sr.top < line) act = id;
      });
      setRead(prev => ({
        ...prev,
        ...newRead
      }));
      setActive(act);
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* выделение текста → плавающий тулбар */
  const onMouseUp = () => {
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !contentRef.current) {
        setSelTool(null);
        return;
      }
      if (!contentRef.current.contains(sel.anchorNode)) {
        setSelTool(null);
        return;
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      const wrap = contentRef.current.getBoundingClientRect();
      setSelTool({
        x: rect.left + rect.width / 2 - wrap.left,
        y: rect.top - wrap.top - 44
      });
    }, 0);
  };
  const doHighlight = () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      setSelTool(null);
      return;
    }
    try {
      const range = sel.getRangeAt(0);
      const span = document.createElement('span');
      span.className = 'th-hl';
      span.title = 'Нажми, чтобы убрать выделение';
      range.surroundContents(span);
    } catch (e) {/* выделение через границы элементов — пропускаем */}
    sel.removeAllRanges();
    setSelTool(null);
  };
  const doCopy = () => {
    const sel = window.getSelection();
    if (sel) {
      try {
        navigator.clipboard.writeText(sel.toString());
      } catch (e) {}
    }
    sel && sel.removeAllRanges();
    setSelTool(null);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  const onContentClick = e => {
    if (e.target.classList && e.target.classList.contains('th-hl')) {
      const span = e.target;
      span.replaceWith(...span.childNodes);
    }
  };
  const complete = () => {
    if (done) return;
    setDone(true);
    fire();
    reward(doneBtnRef.current);
  };
  const goTo = id => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  };
  const readCount = Object.keys(read).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, layer, /*#__PURE__*/React.createElement("div", {
    className: "th-readbar",
    "data-comment-anchor": "theory-readbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fill",
    style: {
      width: progress * 100 + '%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "th-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "th-content",
    ref: contentRef,
    onMouseUp: onMouseUp,
    onClick: onContentClick,
    style: {
      position: 'relative'
    },
    "data-screen-label": "\u0422\u0435\u043E\u0440\u0438\u044F"
  }, selTool && /*#__PURE__*/React.createElement("div", {
    className: "th-seltool",
    style: {
      left: Math.max(60, selTool.x) - 60,
      top: selTool.y
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: doHighlight
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      background: 'var(--sun-300)',
      borderRadius: 3,
      display: 'inline-block'
    }
  }), "\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u044C"), /*#__PURE__*/React.createElement("button", {
    onClick: doCopy
  }, "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C")), copied && /*#__PURE__*/React.createElement("div", {
    className: "th-seltool",
    style: {
      position: 'fixed',
      left: '50%',
      bottom: 90,
      top: 'auto',
      transform: 'translateX(-50%)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      cursor: 'default'
    }
  }, "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u2713")), /*#__PURE__*/React.createElement("section", {
    ref: el => {
      sectionRefs.current.s1 = el;
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, "\u0423\u0420\u041E\u041A 6 / 9 \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410 \xB7 4 \u041C\u0418\u041D"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 38,
      fontWeight: 800,
      letterSpacing: '-0.025em',
      margin: '0 0 16px',
      lineHeight: 1.08
    }
  }, "\u0414\u0438\u0441\u043A\u0440\u0438\u043C\u0438\u043D\u0430\u043D\u0442"), /*#__PURE__*/React.createElement("p", null, "\u041F\u0440\u0435\u0436\u0434\u0435 \u0447\u0435\u043C \u0440\u0435\u0448\u0430\u0442\u044C \u043A\u0432\u0430\u0434\u0440\u0430\u0442\u043D\u043E\u0435 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435, \u043F\u043E\u043B\u0435\u0437\u043D\u043E \u0443\u0437\u043D\u0430\u0442\u044C, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0443 \u043D\u0435\u0433\u043E \u0432\u043E\u043E\u0431\u0449\u0435 \u043A\u043E\u0440\u043D\u0435\u0439. \u0414\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u0435\u0441\u0442\u044C ", /*#__PURE__*/React.createElement("span", {
    className: "th-term"
  }, "\u0434\u0438\u0441\u043A\u0440\u0438\u043C\u0438\u043D\u0430\u043D\u0442", /*#__PURE__*/React.createElement("span", {
    className: "tip"
  }, "\u0427\u0438\u0441\u043B\u043E \u0394, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043A\u043E\u0440\u043D\u0435\u0439 \u043A\u0432\u0430\u0434\u0440\u0430\u0442\u043D\u043E\u0433\u043E \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044F")), " \u2014 \u043E\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u043D\u0430 \u044D\u0442\u043E\u0442 \u0432\u043E\u043F\u0440\u043E\u0441 \u0434\u043E \u0432\u0441\u044F\u043A\u0438\u0445 \u0432\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0439 \u043A\u043E\u0440\u043D\u0435\u0439."), /*#__PURE__*/React.createElement("p", null, "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439 \u0432\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u043B\u044E\u0431\u0443\u044E \u0444\u0440\u0430\u0437\u0443 \u0432 \u044D\u0442\u043E\u043C \u0442\u0435\u043A\u0441\u0442\u0435 \u2014 \u0435\u0451 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u0434\u0441\u0432\u0435\u0442\u0438\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0440\u043E\u043C \u0438\u043B\u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C. \u041F\u043E\u0434\u0447\u0451\u0440\u043A\u043D\u0443\u0442\u044B\u0435 \u0442\u0435\u0440\u043C\u0438\u043D\u044B \u0440\u0430\u0441\u043A\u0440\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u043F\u043E \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u044E.")), /*#__PURE__*/React.createElement("section", {
    ref: el => {
      sectionRefs.current.s2 = el;
    }
  }, /*#__PURE__*/React.createElement("h2", null, "\u0424\u043E\u0440\u043C\u0443\u043B\u0430"), /*#__PURE__*/React.createElement("div", {
    className: "th-formula"
  }, "\u0394 = b\xB2 \u2212 4ac"), /*#__PURE__*/React.createElement("p", null, "\u0417\u0434\u0435\u0441\u044C ", /*#__PURE__*/React.createElement("b", null, "a"), ", ", /*#__PURE__*/React.createElement("b", null, "b"), " \u0438 ", /*#__PURE__*/React.createElement("b", null, "c"), " \u2014 \u043A\u043E\u044D\u0444\u0444\u0438\u0446\u0438\u0435\u043D\u0442\u044B \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044F", /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      background: 'var(--ink-50)',
      padding: '2px 6px',
      borderRadius: 4,
      margin: '0 4px',
      fontSize: '0.9em'
    }
  }, "ax\xB2 + bx + c = 0"), ". \u0421\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u0437\u0430 \u043E\u0434\u0438\u043D \u0448\u0430\u0433, \u0430 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0442 \u0434\u0435\u0441\u044F\u0442\u044C.")), /*#__PURE__*/React.createElement("section", {
    ref: el => {
      sectionRefs.current.s3 = el;
    }
  }, /*#__PURE__*/React.createElement("h2", null, "\u041A\u0430\u043A \u0447\u0438\u0442\u0430\u0442\u044C \u0437\u043D\u0430\u043A"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      margin: '0 0 18px'
    }
  }, [{
    sign: 'Δ > 0',
    text: 'два различных корня',
    color: 'var(--green-700)'
  }, {
    sign: 'Δ = 0',
    text: 'один повторяющийся корень',
    color: 'var(--sun-700)'
  }, {
    sign: 'Δ < 0',
    text: 'действительных корней нет',
    color: 'var(--coral-700)'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '110px 1fr',
      gap: 16,
      alignItems: 'center',
      padding: '13px 16px',
      borderRadius: 14,
      background: 'var(--paper-2)',
      border: '1px solid var(--ink-100)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: r.color
    }
  }, r.sign), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, r.text))))), /*#__PURE__*/React.createElement("section", {
    ref: el => {
      sectionRefs.current.s4 = el;
    }
  }, /*#__PURE__*/React.createElement("h2", null, "\u0427\u0430\u0441\u0442\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430"), /*#__PURE__*/React.createElement("p", null, "\u0421\u0430\u043C\u043E\u0435 \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0435 \u043C\u0435\u0441\u0442\u043E \u2014 \u0437\u043D\u0430\u043A ", /*#__PURE__*/React.createElement("b", null, "c"), ". \u041F\u043E\u0442\u0435\u0440\u044F\u0435\u0448\u044C \u043C\u0438\u043D\u0443\u0441 \u2014 \u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430 \u043F\u0435\u0440\u0435\u0432\u0435\u0440\u043D\u0451\u0442\u0441\u044F. \u0415\u0441\u043B\u0438 \u0441\u043E\u043C\u043D\u0435\u0432\u0430\u0435\u0448\u044C\u0441\u044F, \u0440\u0430\u0441\u043A\u0440\u043E\u0439 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0443:"), /*#__PURE__*/React.createElement(ThSpoiler, null, "\u041F\u043E\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0439 \u043A\u043E\u044D\u0444\u0444\u0438\u0446\u0438\u0435\u043D\u0442\u044B \u0432 \u0441\u043A\u043E\u0431\u043A\u0430\u0445: \u0394 = b\xB2 \u2212 4\xB7a\xB7(c). \u0414\u043B\u044F 2x\xB2 + 4x \u2212 3 = 0 \u044D\u0442\u043E \u0394 = 16 \u2212 4\xB72\xB7(\u22123) = 16 + 24 = 40 \u2014 \u043C\u0438\u043D\u0443\u0441 \u043D\u0430 \u043C\u0438\u043D\u0443\u0441 \u0434\u0430\u043B \u043F\u043B\u044E\u0441.")), /*#__PURE__*/React.createElement("section", {
    ref: el => {
      sectionRefs.current.s5 = el;
    }
  }, /*#__PURE__*/React.createElement("h2", null, "\u041F\u0440\u043E\u0432\u0435\u0440\u044C \u0441\u0435\u0431\u044F"), /*#__PURE__*/React.createElement(ThMiniQuiz, null)), /*#__PURE__*/React.createElement("div", {
    className: 'th-foot' + (done ? ' donestate' : '')
  }, /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, "\u041F\u0420\u041E\u0427\u0418\u0422\u0410\u041D\u041E ", /*#__PURE__*/React.createElement("b", null, Math.round(progress * 100), "%"), " \xB7 \u0420\u0410\u0417\u0414\u0415\u041B\u041E\u0412 ", readCount, " / ", TH_SECTIONS.length), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, done ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--green-700)'
    }
  }, "\u2713 \u0423\u0420\u041E\u041A \u0417\u0410\u0412\u0415\u0420\u0428\u0401\u041D"), /*#__PURE__*/React.createElement("button", {
    className: "gp-btn",
    onClick: onAdvance
  }, "\u041A \u0437\u0430\u0434\u0430\u043D\u0438\u044F\u043C \u2192")) : /*#__PURE__*/React.createElement("button", {
    ref: doneBtnRef,
    className: "gp-btn",
    onClick: complete
  }, "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0443\u0440\u043E\u043A")))), /*#__PURE__*/React.createElement("aside", {
    className: "th-rail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "th-rail-title"
  }, "\u0420\u0430\u0437\u0434\u0435\u043B\u044B"), TH_SECTIONS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: 'th-rail-item' + (read[s.id] || done ? ' read' : '') + (active === s.id ? ' active' : ''),
    onClick: () => goTo(s.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, read[s.id] || done ? '✓' : ''), s.label)), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 18,
      fontSize: 10,
      color: 'var(--ink-300)',
      letterSpacing: '.06em',
      lineHeight: 1.8
    }
  }, "\u0413\u0410\u041B\u041E\u0427\u041A\u0418 \u0421\u0422\u0410\u0412\u042F\u0422\u0421\u042F \u0421\u0410\u041C\u0418,", /*#__PURE__*/React.createElement("br", null), "\u041F\u041E \u041C\u0415\u0420\u0415 \u041F\u0420\u041E\u041A\u0420\u0423\u0422\u041A\u0418"))));
}
Object.assign(window, {
  Theory
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/feedback/theory.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/ui_kits/lms_app/admin.jsx
try { (() => {
/* ============================================================
   Admin · KPI strip + students table (teacher / admin view)
   ============================================================ */

const Admin = ({
  onNav
}) => {
  const [range, setRange] = React.useState('7d');
  const kpis = [{
    lbl: 'Active students',
    v: '286',
    delta: '+12',
    tone: 'green',
    icon: 'users'
  }, {
    lbl: 'Courses live',
    v: '24',
    delta: '+2',
    tone: 'sun',
    icon: 'book'
  }, {
    lbl: 'Completion rate',
    v: '74%',
    delta: '+6pp',
    tone: 'green',
    icon: 'check_circ'
  }, {
    lbl: 'Avg score',
    v: '82%',
    delta: '−1pp',
    tone: 'coral',
    icon: 'pencil',
    down: true
  }, {
    lbl: 'Revenue · MTD',
    v: '$2,140',
    delta: '+18%',
    tone: 'ink',
    icon: 'star'
  }];
  const students = [{
    name: 'Anna P.',
    grade: '9th',
    xp: 2840,
    courses: 4,
    last: '14 min ago',
    score: 87,
    status: 'active'
  }, {
    name: 'Marco S.',
    grade: '9th',
    xp: 3120,
    courses: 3,
    last: '1 h ago',
    score: 91,
    status: 'active'
  }, {
    name: 'Sofia R.',
    grade: '10th',
    xp: 1980,
    courses: 5,
    last: 'yesterday',
    score: 78,
    status: 'active'
  }, {
    name: 'James K.',
    grade: '11th',
    xp: 4220,
    courses: 2,
    last: '2 days ago',
    score: 94,
    status: 'review'
  }, {
    name: 'Priya G.',
    grade: '9th',
    xp: 1240,
    courses: 3,
    last: '5 days ago',
    score: 62,
    status: 'risk'
  }, {
    name: 'Lukas H.',
    grade: '10th',
    xp: 2640,
    courses: 4,
    last: '38 min ago',
    score: 81,
    status: 'active'
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement(Crumbs, {
    trail: ['School'],
    current: "Admin \xB7 Overview"
  }), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 13
    })
  }, "Alerts (3)"), /*#__PURE__*/React.createElement(Avatar, {
    initials: "MR",
    tone: "ink",
    size: "md"
  })), /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "mono-eb",
    style: {
      color: 'var(--green-700)',
      margin: '0 0 8px'
    }
  }, "OVERVIEW \xB7 GRASS PREP MX"), /*#__PURE__*/React.createElement("h1", null, "Your school is ", /*#__PURE__*/React.createElement("em", null, "on track")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "5 of 6 cohorts on pace \xB7 2 students need a check-in this week.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      background: 'var(--ink-50)',
      padding: 4,
      borderRadius: 12
    }
  }, ['24h', '7d', '30d', '90d'].map(r => /*#__PURE__*/React.createElement("span", {
    key: r,
    onClick: () => setRange(r),
    className: "mono",
    style: {
      padding: '6px 12px',
      borderRadius: 8,
      cursor: 'pointer',
      background: range === r ? 'var(--ink-900)' : 'transparent',
      color: range === r ? '#fff' : 'var(--ink-500)',
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, r)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 14
    }
  }, kpis.map(k => /*#__PURE__*/React.createElement(Card, {
    key: k.lbl,
    style: {
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono-eb"
  }, k.lbl), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 7,
      display: 'grid',
      placeItems: 'center',
      background: k.tone === 'green' ? 'var(--green-50)' : k.tone === 'sun' ? 'var(--sun-50)' : k.tone === 'coral' ? 'var(--coral-50)' : 'var(--ink-50)',
      color: k.tone === 'green' ? 'var(--green-700)' : k.tone === 'sun' ? 'var(--sun-700)' : k.tone === 'coral' ? 'var(--coral-700)' : 'var(--ink-700)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: k.icon,
    size: 13
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1
    }
  }, k.v), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: k.down ? 'var(--coral-700)' : 'var(--green-700)'
    }
  }, k.delta), /*#__PURE__*/React.createElement(Sparkline, {
    tone: k.tone,
    down: k.down
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(PanelHead, {
    title: "Engagement \xB7 last 7 days",
    action: "Open analytics \u2192"
  }), /*#__PURE__*/React.createElement(SignupChart, null)), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(PanelHead, {
    title: "System status"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [['API', 'green', 'Operational', '120ms'], ['Database', 'green', 'Operational', '8 conn'], ['Sandbox', 'green', 'Operational', '14 active'], ['AI tutor', 'sun', 'Degraded', '1.4s avg']].map(([n, t, l, m]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 999,
      background: t === 'green' ? 'var(--green-500)' : t === 'sun' ? 'var(--sun-500)' : 'var(--coral-500)',
      boxShadow: t === 'green' ? '0 0 0 3px var(--green-100)' : '0 0 0 3px var(--sun-50)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      fontWeight: 700
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: t === 'green' ? 'var(--green-700)' : 'var(--sun-700)'
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--ink-400)'
    }
  }, m)))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 17,
      fontWeight: 800
    }
  }, "Students"), /*#__PURE__*/React.createElement("p", {
    className: "mono",
    style: {
      margin: '4px 0 0',
      fontSize: 11,
      color: 'var(--ink-400)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, "286 ACTIVE \xB7 12 NEED REVIEW")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 12
    })
  }, "Filter"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    })
  }, "Add students"))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--ink-50)',
      borderTop: '1px solid var(--ink-100)'
    }
  }, ['Student', 'Grade', 'XP', 'Courses', 'Last seen', 'Avg', 'Status'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    className: "mono",
    style: {
      padding: '12px 20px',
      textAlign: 'left',
      fontSize: 10,
      fontWeight: 600,
      color: 'var(--ink-500)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, students.map((s, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderTop: '1px solid var(--ink-100)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: s.name.split(' ').map(x => x[0]).join(''),
    tone: ['green', 'sun', 'coral', 'ink'][i % 4],
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 13
    }
  }, s.name))), /*#__PURE__*/React.createElement("td", {
    className: "mono",
    style: {
      padding: '14px 20px',
      fontSize: 12,
      color: 'var(--ink-500)'
    }
  }, s.grade), /*#__PURE__*/React.createElement("td", {
    className: "mono",
    style: {
      padding: '14px 20px',
      fontSize: 12,
      color: 'var(--ink-900)',
      fontWeight: 700
    }
  }, s.xp.toLocaleString()), /*#__PURE__*/React.createElement("td", {
    className: "mono",
    style: {
      padding: '14px 20px',
      fontSize: 12,
      color: 'var(--ink-500)'
    }
  }, s.courses), /*#__PURE__*/React.createElement("td", {
    className: "mono",
    style: {
      padding: '14px 20px',
      fontSize: 12,
      color: 'var(--ink-500)'
    }
  }, s.last), /*#__PURE__*/React.createElement("td", {
    className: "mono",
    style: {
      padding: '14px 20px',
      fontSize: 12,
      color: s.score >= 80 ? 'var(--green-700)' : s.score >= 70 ? 'var(--sun-700)' : 'var(--coral-700)',
      fontWeight: 700
    }
  }, s.score, "%"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 20px'
    }
  }, s.status === 'active' && /*#__PURE__*/React.createElement(Chip, {
    tone: "green",
    mono: true
  }, "Active"), s.status === 'review' && /*#__PURE__*/React.createElement(Chip, {
    tone: "sun",
    mono: true
  }, "Review"), s.status === 'risk' && /*#__PURE__*/React.createElement(Chip, {
    tone: "coral",
    mono: true
  }, "At risk")))))))));
};
const Sparkline = ({
  tone = 'green',
  down = false
}) => {
  const color = tone === 'green' ? '#0a8754' : tone === 'sun' ? '#f5b800' : tone === 'coral' ? '#ff7a5c' : '#1a2a1f';
  const pts = down ? '0,10 10,8 20,12 30,14 40,11 50,16 60,18' : '0,18 10,14 20,16 30,10 40,12 50,6 60,8';
  return /*#__PURE__*/React.createElement("svg", {
    width: "60",
    height: "22",
    viewBox: "0 0 60 22",
    fill: "none"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: pts,
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const SignupChart = () => {
  const data = [42, 56, 38, 64, 78, 52, 88];
  const max = 100;
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      height: 180,
      paddingBottom: 24,
      position: 'relative'
    }
  }, data.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--green-700)'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: `${v / max * 130}px`,
      background: 'linear-gradient(180deg, var(--green-400), var(--green-600))',
      borderRadius: '10px 10px 4px 4px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      position: 'absolute',
      bottom: 0,
      fontSize: 10,
      color: 'var(--ink-400)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, labels[i]))));
};
window.Admin = Admin;
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/ui_kits/lms_app/admin.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/ui_kits/lms_app/catalog.jsx
try { (() => {
/* ============================================================
   Catalog screen — Find courses · 3-col grid + filters
   ============================================================ */

const Catalog = ({
  onNav
}) => {
  const [filters, setFilters] = React.useState({
    level: 'All',
    subjects: new Set(['math', 'code'])
  });
  const [q, setQ] = React.useState('');
  const subjects = [{
    id: 'math',
    label: 'Mathematics',
    count: 84
  }, {
    id: 'code',
    label: 'Programming',
    count: 56
  }, {
    id: 'sat',
    label: 'SAT prep',
    count: 12
  }, {
    id: 'lang',
    label: 'Languages',
    count: 38
  }, {
    id: 'sci',
    label: 'Science',
    count: 22
  }, {
    id: 'soft',
    label: 'Soft skills',
    count: 14
  }];
  const courses = [{
    id: 1,
    title: 'Algebra Foundations',
    subject: 'Math · 9th',
    cover: 'cover-algebra',
    glyph: 'Σ',
    meta: '24 LESSONS',
    enrolled: 62,
    status: 'enrolled'
  }, {
    id: 2,
    title: 'JavaScript Essentials',
    subject: 'CS · self-paced',
    cover: 'cover-code',
    glyph: '</>',
    meta: '18 LESSONS',
    enrolled: 28,
    status: 'enrolled'
  }, {
    id: 3,
    title: 'Spanish A1 → A2',
    subject: 'Languages',
    cover: 'cover-lang',
    glyph: 'Ñ',
    meta: '32 LESSONS',
    enrolled: 85,
    status: 'enrolled'
  }, {
    id: 4,
    title: 'SAT Math · Full Prep',
    subject: 'SAT',
    cover: 'cover-sat',
    glyph: '★',
    meta: '40 LESSONS',
    enrolled: 42,
    status: 'enrolled'
  }, {
    id: 5,
    title: 'Geometry · Visual',
    subject: 'Math · 10th',
    cover: 'cover-algebra',
    glyph: '△',
    meta: '28 LESSONS',
    status: 'new'
  }, {
    id: 6,
    title: 'Python for Beginners',
    subject: 'CS · intro',
    cover: 'cover-code',
    glyph: '🐍',
    meta: '22 LESSONS',
    status: 'available'
  }, {
    id: 7,
    title: 'AP Computer Science',
    subject: 'CS · advanced',
    cover: 'cover-code',
    glyph: '{}',
    meta: '64 LESSONS',
    status: 'available'
  }, {
    id: 8,
    title: 'Pre-Calculus',
    subject: 'Math · 11th',
    cover: 'cover-algebra',
    glyph: '∫',
    meta: '36 LESSONS',
    status: 'available'
  }, {
    id: 9,
    title: 'French · A1',
    subject: 'Languages',
    cover: 'cover-lang',
    glyph: 'Ç',
    meta: '30 LESSONS',
    status: 'new'
  }];
  const toggle = id => {
    const next = new Set(filters.subjects);
    next.has(id) ? next.delete(id) : next.add(id);
    setFilters({
      ...filters,
      subjects: next
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement(Crumbs, {
    trail: ['Learn'],
    current: "Courses"
  }), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement(StreakPill, {
    days: 7
  }), /*#__PURE__*/React.createElement(XpToken, {
    amount: 2840
  }), /*#__PURE__*/React.createElement(Avatar, {
    initials: "AP",
    tone: "green",
    size: "md"
  }))), /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "mono-eb",
    style: {
      color: 'var(--green-700)',
      margin: '0 0 8px'
    }
  }, "BROWSE \xB7 324 COURSES"), /*#__PURE__*/React.createElement("h1", null, "Find your ", /*#__PURE__*/React.createElement("em", null, "subject")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "Programming, math, languages, SAT prep \u2014 every course your school has subscribed you to.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "list",
      size: 14
    })
  }, "Sort: newest"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    })
  }, "Request a course"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '240px 1fr',
      gap: 32,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      position: 'sticky',
      top: 80,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 800
    }
  }, "Filters"), /*#__PURE__*/React.createElement("a", {
    className: "mono",
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--coral-700)',
      cursor: 'pointer'
    }
  }, "Clear all")), /*#__PURE__*/React.createElement("div", {
    className: "mono-eb",
    style: {
      marginBottom: 8
    }
  }, "Subject"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 16,
      paddingBottom: 16,
      borderBottom: '1px solid var(--ink-100)'
    }
  }, subjects.map(s => {
    const on = filters.subjects.has(s.id);
    return /*#__PURE__*/React.createElement("label", {
      key: s.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: 5,
        background: on ? 'var(--green-600)' : '#fff',
        border: on ? 'none' : '2px solid var(--ink-200)',
        display: 'grid',
        placeItems: 'center',
        color: '#fff',
        fontSize: 10,
        lineHeight: 1,
        flex: 'none'
      },
      onClick: () => toggle(s.id)
    }, on && '✓'), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        color: 'var(--ink-700)'
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 10,
        color: 'var(--ink-400)'
      }
    }, s.count));
  })), /*#__PURE__*/React.createElement("div", {
    className: "mono-eb",
    style: {
      marginBottom: 8
    }
  }, "Level"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginBottom: 16,
      paddingBottom: 16,
      borderBottom: '1px solid var(--ink-100)'
    }
  }, ['All', 'Beginner', 'Intermediate', 'Advanced'].map(lv => /*#__PURE__*/React.createElement("span", {
    key: lv,
    className: `chip ${filters.level === lv ? 'solid-g' : 'ink'}`,
    style: {
      cursor: 'pointer'
    },
    onClick: () => setFilters({
      ...filters,
      level: lv
    })
  }, lv))), /*#__PURE__*/React.createElement("div", {
    className: "mono-eb",
    style: {
      marginBottom: 8
    }
  }, "Status"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, ['Enrolled', 'Not started', 'Completed'].map(s => /*#__PURE__*/React.createElement("label", {
    key: s,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 13,
      color: 'var(--ink-700)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: 999,
      border: '2px solid var(--ink-200)'
    }
  }), s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-bar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    style: {
      color: 'var(--ink-400)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search courses, teachers, topics\u2026",
    value: q,
    onChange: e => setQ(e.target.value)
  }), /*#__PURE__*/React.createElement("span", {
    className: "kbd"
  }, "\u2318K")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14
    }
  }, courses.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ccard",
    key: c.id,
    onClick: () => onNav('lesson')
  }, /*#__PURE__*/React.createElement("div", {
    className: `cover ${c.cover}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "glyph"
  }, c.glyph), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, c.meta)), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("h4", null, c.title), c.status === 'new' && /*#__PURE__*/React.createElement(Chip, {
    tone: "sun",
    mono: true
  }, "NEW")), /*#__PURE__*/React.createElement("p", {
    className: "nx"
  }, c.subject), c.status === 'enrolled' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgressBar, {
    value: c.enrolled,
    height: 6
  }), /*#__PURE__*/React.createElement("div", {
    className: "pct-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Progress"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, c.enrolled, "%"))) : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    style: {
      width: '100%',
      justifyContent: 'center',
      marginTop: 4
    }
  }, c.status === 'new' ? 'Start now →' : 'Enroll →'))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--ink-400)'
    }
  }, "Prev"), [1, 2, 3, 4].map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    className: "mono",
    style: {
      width: 28,
      height: 28,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 700,
      cursor: 'pointer',
      background: n === 1 ? 'var(--green-600)' : 'transparent',
      color: n === 1 ? '#fff' : 'var(--ink-500)'
    }
  }, n)), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--ink-400)'
    }
  }, "\u2026 27"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--ink-900)',
      fontWeight: 700,
      marginLeft: 4
    }
  }, "Next \u2192"))))));
};
window.Catalog = Catalog;
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/ui_kits/lms_app/catalog.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/ui_kits/lms_app/dashboard.jsx
try { (() => {
/* ============================================================
   Dashboard screen — the home view
   ============================================================ */

const Dashboard = ({
  onNav
}) => {
  const courses = [{
    id: 'algebra',
    title: 'The discriminant formula',
    meta: '9TH · ALGEBRA',
    cover: 'cover-algebra',
    glyph: 'x²',
    next: 'Module 3 · Lesson 7 of 14',
    pct: 32
  }, {
    id: 'js',
    title: 'JavaScript Basics',
    meta: 'SELF-PACED · 4 WEEKS',
    cover: 'cover-code',
    glyph: '</>',
    next: 'Functions and scope',
    pct: 48
  }, {
    id: 'spanish',
    title: 'Spanish · A2 elementary',
    meta: 'A2 · ELECTIVE',
    cover: 'cover-lang',
    glyph: '¡!',
    next: 'Hablando de la familia',
    pct: 12
  }, {
    id: 'sat',
    title: 'SAT Math · Practice 4',
    meta: 'PREP · DEC EXAM',
    cover: 'cover-sat',
    glyph: '★',
    next: 'Due tomorrow',
    pct: 0,
    urgent: true
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Topbar, null), /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, /*#__PURE__*/React.createElement(Hero, {
    onContinue: () => onNav('lesson'),
    onCatalog: () => onNav('catalog')
  }), /*#__PURE__*/React.createElement(StatsRow, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.7fr 1fr',
      gap: 24,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(PanelHead, {
    title: "Continue where you left off",
    action: "All courses \u2192",
    onAction: () => onNav('catalog')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, courses.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ccard",
    key: c.id,
    onClick: () => onNav('lesson')
  }, /*#__PURE__*/React.createElement("div", {
    className: `cover ${c.cover}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "glyph"
  }, c.glyph), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, c.meta)), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("h4", null, c.title), /*#__PURE__*/React.createElement("p", {
    className: "nx"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.urgent ? 'clock' : 'play',
    size: 11,
    style: {
      color: c.urgent ? 'var(--coral-500)' : 'var(--green-600)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: c.urgent ? {
      color: 'var(--coral-700)',
      fontWeight: 700
    } : {}
  }, c.next)), /*#__PURE__*/React.createElement(ProgressBar, {
    value: c.pct,
    tone: c.urgent ? 'coral' : 'green',
    height: 6
  }), /*#__PURE__*/React.createElement("div", {
    className: "pct-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Progress"), /*#__PURE__*/React.createElement("span", {
    className: "v",
    style: c.urgent ? {
      color: 'var(--coral-700)'
    } : {}
  }, c.pct, "%"))))))), /*#__PURE__*/React.createElement(TodaysTasks, null)), /*#__PURE__*/React.createElement(ActivityTimeline, null)));
};
const Topbar = () => /*#__PURE__*/React.createElement("div", {
  className: "topbar"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "arrow_left",
  size: 16,
  style: {
    color: 'var(--ink-400)',
    cursor: 'pointer'
  }
}), /*#__PURE__*/React.createElement(Crumbs, {
  trail: ['Learn'],
  current: "Dashboard"
}), /*#__PURE__*/React.createElement("div", {
  className: "spacer"
}), /*#__PURE__*/React.createElement("div", {
  className: "actions"
}, /*#__PURE__*/React.createElement(StreakPill, {
  days: 7
}), /*#__PURE__*/React.createElement(XpToken, {
  amount: 2840
}), /*#__PURE__*/React.createElement(Avatar, {
  initials: "AP",
  tone: "green",
  size: "md"
})));
const Hero = ({
  onContinue,
  onCatalog
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: 24
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    background: 'linear-gradient(135deg, var(--green-600), var(--green-800))',
    borderRadius: 'var(--radius-xl)',
    padding: '32px 36px',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement("p", {
  className: "mono-eb",
  style: {
    color: 'rgba(255,255,255,0.7)',
    margin: '0 0 14px'
  }
}, "TODAY \xB7 MONDAY MAY 4 \xB7 9:14"), /*#__PURE__*/React.createElement("h2", {
  style: {
    fontSize: 36,
    fontWeight: 800,
    letterSpacing: '-0.025em',
    lineHeight: 1.08,
    margin: '0 0 12px',
    maxWidth: 460
  }
}, "\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u0441\u0442\u0430\u0440\u0442\u0443,", /*#__PURE__*/React.createElement("br", null), "\u0441\u0435\u0433\u043E\u0434\u043D\u044F \u043F\u043E \u043F\u043B\u0430\u043D\u0443 \u2014 ", /*#__PURE__*/React.createElement("em", {
  style: {
    fontStyle: 'normal',
    background: 'var(--sun-300)',
    color: 'var(--ink-900)',
    padding: '0 10px',
    borderRadius: 10,
    display: 'inline-block',
    transform: 'rotate(-1.5deg)'
  }
}, "3 \u0443\u0440\u043E\u043A\u0430"), "."), /*#__PURE__*/React.createElement("p", {
  style: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    lineHeight: 1.55,
    margin: '0 0 20px',
    maxWidth: 480
  }
}, "Continue with the discriminant from yesterday. Should take about 12 minutes \u2014 then JavaScript and Spanish."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 10
  }
}, /*#__PURE__*/React.createElement(Button, {
  variant: "sun",
  onClick: onContinue,
  leading: /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 14
  })
}, "Continue lesson"), /*#__PURE__*/React.createElement(Button, {
  variant: "ghost",
  onClick: onCatalog,
  style: {
    color: '#fff'
  }
}, "Browse catalog \u2192")), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    right: -50,
    top: -50,
    width: 220,
    height: 220,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    right: 50,
    bottom: -80,
    width: 140,
    height: 140,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)'
  }
})), /*#__PURE__*/React.createElement(StreakCard, null));
const StreakCard = () => /*#__PURE__*/React.createElement(Card, {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "mono-eb",
  style: {
    color: 'var(--ink-400)',
    marginBottom: 4
  }
}, "CURRENT STREAK"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 52,
    fontWeight: 800,
    color: 'var(--coral-500)',
    lineHeight: 1,
    letterSpacing: '-0.04em'
  }
}, "7", /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 16,
    color: 'var(--ink-400)',
    marginLeft: 6,
    fontWeight: 600
  }
}, "days"))), /*#__PURE__*/React.createElement("div", {
  style: {
    width: 48,
    height: 48,
    borderRadius: 14,
    background: 'var(--coral-500)',
    boxShadow: '0 4px 0 0 var(--coral-700)',
    display: 'grid',
    placeItems: 'center',
    fontSize: 24
  }
}, "\uD83D\uDD25")), /*#__PURE__*/React.createElement("h3", {
  style: {
    margin: 0,
    fontSize: 16,
    fontWeight: 800
  }
}, "Don't break the chain"), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 4
  }
}, [['M', 28, 'done'], ['T', 29, 'done'], ['W', 30, 'done'], ['T', 1, 'done'], ['F', 2, 'done'], ['S', 3, 'done'], ['S', 4, 'today']].map(([d, n, st], i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    aspectRatio: '1',
    borderRadius: 8,
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'Geist Mono, monospace',
    fontSize: 10,
    fontWeight: 600,
    background: st === 'done' ? 'var(--coral-500)' : 'var(--coral-50)',
    color: st === 'done' ? '#fff' : 'var(--coral-700)',
    border: st === 'today' ? '2px dashed var(--coral-500)' : 'none',
    lineHeight: 1
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 8,
    opacity: 0.8
  }
}, d), /*#__PURE__*/React.createElement("div", {
  style: {
    fontWeight: 700
  }
}, n)))), /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    fontSize: 12,
    color: 'var(--ink-500)',
    lineHeight: 1.5
  }
}, "Just ", /*#__PURE__*/React.createElement("b", {
  style: {
    color: 'var(--coral-700)'
  }
}, "1 lesson"), " today keeps it alive \u2014 you're ", /*#__PURE__*/React.createElement("b", {
  style: {
    color: 'var(--coral-700)'
  }
}, "3 days"), " from your record."));
const StatsRow = () => {
  const stats = [{
    lbl: 'XP earned',
    v: '410',
    sub: 'xp',
    delta: '↑ 23% vs last week',
    tone: 'green',
    icon: 'star'
  }, {
    lbl: 'Lessons done',
    v: '8',
    sub: '/ 12',
    delta: '↑ on track',
    tone: 'sun',
    icon: 'check_circ'
  }, {
    lbl: 'Time studied',
    v: '3h 42m',
    sub: '',
    delta: '↓ 12m vs last week',
    tone: 'coral',
    icon: 'clock',
    down: true
  }, {
    lbl: 'Avg quiz score',
    v: '87%',
    sub: '',
    delta: '↑ 5pp vs last week',
    tone: 'ink',
    icon: 'pencil'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14
    }
  }, stats.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.lbl,
    style: {
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono-eb"
  }, s.lbl), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 9,
      display: 'grid',
      placeItems: 'center',
      color: '#fff',
      background: s.tone === 'green' ? 'var(--green-600)' : s.tone === 'sun' ? 'var(--sun-400)' : s.tone === 'coral' ? 'var(--coral-500)' : 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 14,
    style: {
      color: s.tone === 'sun' ? 'var(--sun-700)' : '#fff'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1,
      display: 'flex',
      alignItems: 'baseline',
      gap: 4
    }
  }, s.v, s.sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--ink-400)',
      fontWeight: 600,
      letterSpacing: 0
    }
  }, s.sub)), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: s.down ? 'var(--coral-700)' : 'var(--green-700)'
    }
  }, s.delta))));
};
const TodaysTasks = () => /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(PanelHead, {
  title: "Today's tasks",
  action: "View week \u2192"
}), [{
  dot: 'var(--green-500)',
  title: 'Discriminant practice',
  meta: 'DUE 14:00 · 12 MIN'
}, {
  dot: 'var(--sun-400)',
  title: 'SAT Math · timed test',
  meta: 'DUE 18:00 · 45 MIN'
}, {
  dot: 'var(--coral-500)',
  title: 'Spanish vocabulary',
  meta: 'OVERDUE · 8 MIN',
  overdue: true
}, {
  dot: 'var(--ink-300)',
  title: 'Code: array methods',
  meta: 'TOMORROW · 20 MIN'
}].map((t, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 0',
    borderBottom: i < 3 ? '1px dashed var(--ink-100)' : 'none'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 8,
    height: 8,
    borderRadius: 3,
    background: t.dot,
    flex: 'none'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13,
    fontWeight: 700,
    color: 'var(--ink-900)'
  }
}, t.title), /*#__PURE__*/React.createElement("div", {
  className: "mono",
  style: {
    fontSize: 10,
    color: t.overdue ? 'var(--coral-700)' : 'var(--ink-400)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    fontWeight: 600,
    marginTop: 2
  }
}, t.meta)), /*#__PURE__*/React.createElement(Icon, {
  name: "chevron_r",
  size: 14,
  style: {
    color: 'var(--ink-300)'
  }
}))));
const ActivityTimeline = () => /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(PanelHead, {
  title: "Recent activity"
}), /*#__PURE__*/React.createElement("div", {
  className: "mono-eb",
  style: {
    color: 'var(--green-700)',
    marginBottom: 8
  }
}, "TODAY"), [{
  who: 'Anna P.',
  tone: 'green',
  act: 'completed',
  what: 'Quadratic functions · Lesson 3',
  when: '14 min ago'
}, {
  who: 'Mrs. Reyes',
  tone: 'sun',
  act: 'assigned',
  what: 'SAT Practice 4 to your class',
  when: '1 h ago',
  ai: false
}, {
  who: 'AI Tutor',
  tone: 'ink',
  act: 'helped you',
  what: 'understand the discriminant',
  when: '2 h ago',
  ai: true
}].map((a, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 0'
  }
}, /*#__PURE__*/React.createElement(Avatar, {
  initials: a.who.slice(0, 2).toUpperCase(),
  tone: a.tone,
  size: "sm"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    fontSize: 13,
    color: 'var(--ink-700)',
    lineHeight: 1.5
  }
}, /*#__PURE__*/React.createElement("b", {
  style: {
    color: 'var(--ink-900)',
    fontWeight: 800
  }
}, a.who), " ", a.act, " ", /*#__PURE__*/React.createElement("b", {
  style: {
    color: 'var(--ink-900)',
    fontWeight: 700
  }
}, a.what), a.ai && /*#__PURE__*/React.createElement(Chip, {
  tone: "sun",
  mono: true
}, "AI")), /*#__PURE__*/React.createElement("span", {
  className: "mono",
  style: {
    fontSize: 11,
    color: 'var(--ink-400)'
  }
}, a.when))), /*#__PURE__*/React.createElement("div", {
  className: "mono-eb",
  style: {
    color: 'var(--ink-400)',
    marginTop: 14,
    marginBottom: 8
  }
}, "YESTERDAY"), [{
  who: 'Marco S.',
  tone: 'coral',
  act: 'beat you on the',
  what: 'Functions leaderboard',
  when: '18:42'
}, {
  who: 'You',
  tone: 'green',
  act: 'earned',
  what: '“Streak Starter” badge',
  when: '20:10'
}].map((a, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 0'
  }
}, /*#__PURE__*/React.createElement(Avatar, {
  initials: a.who.slice(0, 2).toUpperCase(),
  tone: a.tone,
  size: "sm"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    fontSize: 13,
    color: 'var(--ink-700)',
    lineHeight: 1.5
  }
}, /*#__PURE__*/React.createElement("b", {
  style: {
    color: 'var(--ink-900)',
    fontWeight: 800
  }
}, a.who), " ", a.act, " ", /*#__PURE__*/React.createElement("b", {
  style: {
    color: 'var(--ink-900)',
    fontWeight: 700
  }
}, a.what)), /*#__PURE__*/React.createElement("span", {
  className: "mono",
  style: {
    fontSize: 11,
    color: 'var(--ink-400)'
  }
}, a.when))));
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/ui_kits/lms_app/dashboard.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/ui_kits/lms_app/lesson.jsx
try { (() => {
/* ============================================================
   Lesson player — outline + content with interactive quiz
   ============================================================ */

const Lesson = ({
  onNav
}) => {
  const lessons = [{
    id: 1,
    label: 'Quadratic functions intro',
    dur: '8m',
    status: 'done'
  }, {
    id: 2,
    label: 'Standard form & vertex form',
    dur: '12m',
    status: 'done'
  }, {
    id: 3,
    label: 'Graphing parabolas',
    dur: '15m',
    status: 'done'
  }, {
    id: 4,
    label: 'Factoring & roots',
    dur: '14m',
    status: 'done'
  }, {
    id: 5,
    label: 'Completing the square',
    dur: '18m',
    status: 'done'
  }, {
    id: 6,
    label: 'The discriminant formula',
    dur: '12m',
    status: 'current'
  }, {
    id: 7,
    label: 'Discriminant practice',
    dur: '20m',
    status: 'todo'
  }, {
    id: 8,
    label: 'Word problems',
    dur: '22m',
    status: 'todo'
  }, {
    id: 9,
    label: 'Module quiz',
    dur: '15m',
    status: 'locked'
  }];
  const modules = [{
    num: 1,
    title: 'Linear functions',
    meta: '12 LESSONS · 2H 30M',
    done: true
  }, {
    num: 2,
    title: 'Quadratic functions',
    meta: '9 LESSONS · 2H 10M',
    open: true,
    lessons
  }, {
    num: 3,
    title: 'Polynomials',
    meta: '14 LESSONS · 3H 20M'
  }, {
    num: 4,
    title: 'Rational functions',
    meta: '10 LESSONS · 2H 40M'
  }];
  const [pick, setPick] = React.useState(null); // selected choice in quiz
  const [submitted, setSubmitted] = React.useState(false);
  const correct = 2; // index

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topbar",
    style: {
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow_left",
    size: 16,
    style: {
      color: 'var(--ink-400)',
      cursor: 'pointer'
    },
    onClick: () => onNav('catalog')
  }), /*#__PURE__*/React.createElement(Crumbs, {
    trail: ['Math', '9th', 'Algebra'],
    current: "The discriminant formula"
  }), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement(StreakPill, {
    days: 7
  }), /*#__PURE__*/React.createElement(XpToken, {
    amount: 2840
  }), /*#__PURE__*/React.createElement(Avatar, {
    initials: "AP",
    tone: "green",
    size: "md"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      minHeight: 'calc(100vh - 64px)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      background: '#fff',
      borderRight: '1px solid var(--ink-100)',
      padding: '20px 18px 32px',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono-eb",
    style: {
      marginBottom: 4
    }
  }, "ALGEBRA \xB7 9TH GRADE"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: '-0.01em',
      marginBottom: 12
    }
  }, "Functions & equations"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: 42,
    height: 6
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: 'var(--green-700)'
    }
  }, "42%")), modules.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.num,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '6px 4px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 7,
      background: m.done ? 'var(--green-500)' : m.open ? 'var(--green-600)' : 'var(--ink-100)',
      color: m.done || m.open ? '#fff' : 'var(--ink-400)',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'Geist Mono, monospace',
      fontSize: 10,
      fontWeight: 800,
      flex: 'none'
    }
  }, m.done ? '✓' : m.num), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--ink-900)',
      letterSpacing: '-0.005em'
    }
  }, m.title), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 9,
      color: 'var(--ink-400)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      fontWeight: 600,
      marginTop: 1
    }
  }, m.meta)), /*#__PURE__*/React.createElement(Icon, {
    name: m.open ? 'chevron_d' : 'chevron_r',
    size: 12,
    style: {
      color: 'var(--ink-300)'
    }
  })), m.open && m.lessons && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 32,
      marginTop: 6,
      display: 'flex',
      flexDirection: 'column'
    }
  }, m.lessons.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '7px 8px',
      cursor: 'pointer',
      borderRadius: 8,
      background: l.status === 'current' ? 'var(--green-50)' : 'transparent',
      border: l.status === 'current' ? '1px solid var(--green-300)' : '1px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 999,
      flex: 'none',
      background: l.status === 'done' ? 'var(--green-500)' : l.status === 'current' ? 'var(--green-600)' : 'transparent',
      border: l.status === 'todo' || l.status === 'locked' ? '2px solid var(--ink-200)' : 'none',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontSize: 9,
      lineHeight: 1,
      fontWeight: 800,
      boxShadow: l.status === 'current' ? '0 0 0 3px var(--green-100)' : 'none'
    }
  }, l.status === 'done' ? '✓' : l.status === 'locked' ? '🔒' : ''), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 12,
      color: l.status === 'todo' || l.status === 'locked' ? 'var(--ink-400)' : 'var(--ink-900)',
      fontWeight: l.status === 'current' ? 700 : 500
    }
  }, l.label), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 9,
      color: 'var(--ink-400)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, l.dur))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '40px 64px 120px',
      maxWidth: 880,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono-eb",
    style: {
      color: 'var(--green-700)',
      marginBottom: 12
    }
  }, "LESSON 6 / 9 \xB7 12 MIN \xB7 ALGEBRA \xB7 QUADRATICS"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 40,
      fontWeight: 800,
      letterSpacing: '-0.025em',
      margin: '0 0 18px',
      lineHeight: 1.05
    }
  }, "The discriminant formula"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--ink-700)',
      margin: '0 0 24px'
    }
  }, "For a quadratic equation ", /*#__PURE__*/React.createElement("code", {
    style: mono
  }, "ax\xB2 + bx + c = 0"), ", the ", /*#__PURE__*/React.createElement("b", null, "discriminant"), " tells you how many real solutions exist \u2014 without computing them."), /*#__PURE__*/React.createElement("div", {
    className: "card flat",
    style: {
      padding: 24,
      marginBottom: 28,
      fontFamily: 'Geist Mono, monospace',
      fontSize: 22,
      fontWeight: 600,
      textAlign: 'center'
    }
  }, "\u0394 = b\xB2 \u2212 4ac"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      margin: '0 0 12px',
      letterSpacing: '-0.015em'
    }
  }, "How to read it"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginBottom: 28
    }
  }, [{
    sign: 'Δ > 0',
    meaning: 'two distinct real roots',
    tone: 'green'
  }, {
    sign: 'Δ = 0',
    meaning: 'one repeated real root',
    tone: 'sun'
  }, {
    sign: 'Δ < 0',
    meaning: 'no real roots (complex)',
    tone: 'coral'
  }].map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '110px 1fr',
      gap: 16,
      alignItems: 'center',
      padding: '12px 16px',
      borderRadius: 12,
      background: 'var(--paper-2)',
      border: '1px solid var(--ink-100)'
    }
  }, /*#__PURE__*/React.createElement("code", {
    style: {
      ...mono,
      fontSize: 16,
      fontWeight: 700,
      color: r.tone === 'green' ? 'var(--green-700)' : r.tone === 'sun' ? 'var(--sun-700)' : 'var(--coral-700)'
    }
  }, r.sign), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, r.meaning)))), /*#__PURE__*/React.createElement("div", {
    className: "a",
    style: {
      display: 'grid',
      gridTemplateColumns: '36px 1fr',
      gap: 12,
      padding: '14px 16px',
      borderRadius: 14,
      marginBottom: 32,
      background: 'var(--sun-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: 'var(--sun-500)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontWeight: 800
    }
  }, "!"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
    style: {
      margin: '0 0 2px',
      fontSize: 13,
      fontWeight: 700
    }
  }, "Watch the sign of c"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: 'var(--ink-500)',
      lineHeight: 1.5
    }
  }, "A common mistake \u2014 drop the minus and you flip the answer category."))), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      margin: '0 0 6px',
      letterSpacing: '-0.015em'
    }
  }, "Quick check"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--ink-500)',
      margin: '0 0 16px'
    }
  }, "How many real roots does ", /*#__PURE__*/React.createElement("code", {
    style: mono
  }, "2x\xB2 + 4x + 3 = 0"), " have?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 10,
      marginBottom: 22
    }
  }, ['Two distinct real roots', 'One repeated real root', 'No real roots', 'Cannot be determined'].map((opt, i) => {
    const isPick = pick === i;
    const isCorr = submitted && i === correct;
    const isWrong = submitted && isPick && i !== correct;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => !submitted && setPick(i),
      style: {
        padding: 16,
        borderRadius: 14,
        cursor: submitted ? 'default' : 'pointer',
        background: isCorr ? 'var(--green-50)' : isWrong ? 'var(--coral-50)' : isPick ? 'var(--green-100)' : '#fff',
        border: '2px solid ' + (isCorr ? 'var(--green-600)' : isWrong ? 'var(--coral-500)' : isPick ? 'var(--green-600)' : 'var(--ink-100)'),
        borderLeft: isCorr ? '4px solid var(--green-600)' : isWrong ? '4px solid var(--coral-500)' : undefined,
        paddingLeft: isCorr || isWrong ? 14 : 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        transition: 'all 120ms'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: 999,
        flex: 'none',
        background: isPick ? 'var(--green-600)' : '#fff',
        border: isPick ? 'none' : '2px solid var(--ink-200)',
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        fontSize: 11,
        fontWeight: 800,
        lineHeight: 1
      }
    }, isPick && '✓'), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600
      }
    }, opt)), isCorr && /*#__PURE__*/React.createElement(Chip, {
      tone: "solid-g",
      mono: true
    }, "CORRECT"), isWrong && /*#__PURE__*/React.createElement(Chip, {
      tone: "coral",
      mono: true
    }, "TRY AGAIN"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      marginTop: 24,
      marginLeft: -64,
      marginRight: -64,
      padding: '20px 64px',
      background: '#fff',
      borderTop: '1px solid var(--ink-100)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow_left",
      size: 14
    })
  }, "Previous"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--ink-400)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, "00:42 elapsed"), submitted && pick === correct && /*#__PURE__*/React.createElement(XpToken, {
    amount: 20
  }), !submitted ? /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setSubmitted(true),
    disabled: pick == null
  }, "Check answer") : pick === correct ? /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onNav('dashboard'),
    trailing: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow_right",
      size: 14
    })
  }, "Mark complete") : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => {
      setPick(null);
      setSubmitted(false);
    }
  }, "Try again"))))));
};
const mono = {
  fontFamily: 'Geist Mono, monospace',
  background: 'var(--ink-50)',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: '0.9em'
};
window.Lesson = Lesson;
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/ui_kits/lms_app/lesson.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/ui_kits/lms_app/primitives.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ============================================================
   GrassLMS UI Kit — primitives + Icon
   ============================================================ */

// Inline-stroke Lucide-style icons (production uses lucide-react).
// We hand-rolled these to match: 24×24 viewBox, stroke=2, round caps/joins.
const Icon = ({
  name,
  size = 16,
  className = '',
  style = {}
}) => {
  const paths = ICONS[name];
  if (!paths) return null;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    style: style,
    dangerouslySetInnerHTML: {
      __html: paths
    }
  });
};
const ICONS = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  list: '<path d="M3 6h13"/><path d="M3 12h13"/><path d="M3 18h13"/><circle cx="20" cy="6" r="1"/><circle cx="20" cy="12" r="1"/><circle cx="20" cy="18" r="1"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  check_circ: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  play: '<polygon points="5 3 19 12 5 21 5 3"/>',
  arrow_right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrow_left: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  chevron_r: '<path d="m9 18 6-6-6-6"/>',
  chevron_d: '<path d="m6 9 6 6 6-6"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  sparkles: '<path d="m12 3-1.91 5.27L4 10.18l5.45 3.86L7.82 20 12 16.74 16.18 20l-1.63-5.96L20 10.18l-6.09-1.91z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
  bookopen: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  graduation: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5"/>',
  brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  desmos: '<path d="M12 3v18"/><path d="M3 12h18"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="8" r="1"/>'
};

// Button primitive
const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  leading,
  trailing,
  ...rest
}) => {
  const cls = `btn btn-${variant} ${size !== 'md' ? `btn-${size}` : ''}`;
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    onClick: onClick
  }, rest), leading, children, trailing);
};

// Chip
const Chip = ({
  tone = 'ink',
  mono = false,
  children
}) => /*#__PURE__*/React.createElement("span", {
  className: `chip ${tone} ${mono ? 'mono' : ''}`
}, children);

// XP token
const XpToken = ({
  amount
}) => /*#__PURE__*/React.createElement("span", {
  className: "xp-token"
}, /*#__PURE__*/React.createElement("span", {
  className: "o"
}, "\u2605"), "+", amount, " XP");

// Streak pill
const StreakPill = ({
  days
}) => /*#__PURE__*/React.createElement("span", {
  className: "streak-pill"
}, /*#__PURE__*/React.createElement("span", {
  className: "o"
}, "\uD83D\uDD25"), days, " days");

// Avatar
const Avatar = ({
  initials,
  tone = 'green',
  size = 'md'
}) => /*#__PURE__*/React.createElement("span", {
  className: `av ${size} ${tone}`
}, initials);

// Linear progress bar
const ProgressBar = ({
  value,
  tone = 'green',
  height = 8
}) => /*#__PURE__*/React.createElement("div", {
  className: `bar ${tone === 'green' ? '' : tone}`,
  style: {
    height
  }
}, /*#__PURE__*/React.createElement("i", {
  style: {
    width: `${value}%`
  }
}));

// Card
const Card = ({
  children,
  variant = 'default',
  style = {},
  className = '',
  ...rest
}) => /*#__PURE__*/React.createElement("div", _extends({
  className: `card ${variant === 'elev' ? 'elev' : variant === 'flat' ? 'flat' : ''} ${className}`,
  style: style
}, rest), children);

// PanelHead — title + link
const PanelHead = ({
  title,
  action,
  onAction
}) => /*#__PURE__*/React.createElement("div", {
  className: "panel-head"
}, /*#__PURE__*/React.createElement("h3", null, title), action && /*#__PURE__*/React.createElement("a", {
  className: "a",
  onClick: onAction
}, action));

// Crumbs
const Crumbs = ({
  trail,
  current
}) => /*#__PURE__*/React.createElement("div", {
  className: "crumbs"
}, trail.map((c, i) => /*#__PURE__*/React.createElement(React.Fragment, {
  key: i
}, /*#__PURE__*/React.createElement("span", null, c), /*#__PURE__*/React.createElement("span", {
  className: "sep"
}, "/"))), /*#__PURE__*/React.createElement("span", {
  className: "curr"
}, current));
Object.assign(window, {
  Icon,
  Button,
  Chip,
  XpToken,
  StreakPill,
  Avatar,
  ProgressBar,
  Card,
  PanelHead,
  Crumbs
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/ui_kits/lms_app/primitives.jsx", error: String((e && e.message) || e) }); }

// design_handoff_grasslms/ui_kits/lms_app/sidebar.jsx
try { (() => {
/* ============================================================
   Sidebar (global left rail) — handles route navigation
   ============================================================ */

const Sidebar = ({
  route,
  onNav
}) => {
  const item = (key, label, iconName, opts = {}) => /*#__PURE__*/React.createElement("div", {
    key: key,
    className: `rail-item ${route === key ? 'active' : ''}`,
    onClick: () => onNav(key)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: iconName,
    size: 16,
    className: "ico"
  }), /*#__PURE__*/React.createElement("span", null, label), opts.badge && /*#__PURE__*/React.createElement("span", {
    className: `badge ${opts.badgeTone || 'coral'}`
  }, opts.badge));
  return /*#__PURE__*/React.createElement("aside", {
    className: "rail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-mark"
  }, "g"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, "GrassLMS"), /*#__PURE__*/React.createElement("div", {
    className: "cap"
  }, "lively \xB7 v1"))), /*#__PURE__*/React.createElement("div", {
    className: "rail-section"
  }, "Learn"), item('dashboard', 'Dashboard', 'home'), item('catalog', 'Courses', 'book', {
    badge: 3
  }), item('lesson', 'Lesson', 'bookopen'), item('assignments', 'Assignments', 'list', {
    badge: 2
  }), item('calendar', 'Calendar', 'calendar'), /*#__PURE__*/React.createElement("div", {
    className: "rail-section"
  }, "Practice"), item('sat', 'SAT prep', 'star'), item('knowledge', 'Knowledge', 'sparkles', {
    badge: 'NEW',
    badgeTone: 'sun'
  }), item('leaderboard', 'Leaderboard', 'award'), /*#__PURE__*/React.createElement("div", {
    className: "rail-section"
  }, "School"), item('admin', 'Admin', 'settings'), /*#__PURE__*/React.createElement("div", {
    className: "rail-foot"
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: "AP",
    tone: "green",
    size: "md"
  }), /*#__PURE__*/React.createElement("div", {
    className: "who"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, "Anna P."), /*#__PURE__*/React.createElement("div", {
    className: "ml"
  }, "9th \xB7 2,840 XP"))));
};
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_grasslms/ui_kits/lms_app/sidebar.jsx", error: String((e && e.message) || e) }); }

// feedback/app.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ============================================================
   app.jsx — композиция playground: шапка, табы, Tweaks
   ============================================================ */

const FB_TABS = [{
  key: 'theory',
  label: 'Теория'
}, {
  key: 'quiz',
  label: 'Выбор',
  group: 'БАЗА'
}, {
  key: 'matching',
  label: 'Пары'
}, {
  key: 'fill',
  label: 'Пропуски'
}, {
  key: 'ordering',
  label: 'Порядок'
}, {
  key: 'categorize',
  label: 'Категории'
}, {
  key: 'numberline',
  label: 'Ось'
}, {
  key: 'input',
  label: 'Ввод'
}, {
  key: 'balance',
  label: 'Весы',
  group: 'МАТЕМ'
}, {
  key: 'coords',
  label: 'Координаты'
}, {
  key: 'stepwise',
  label: 'По шагам'
}, {
  key: 'sentence',
  label: 'Фраза',
  group: 'ЯЗЫКИ'
}, {
  key: 'dialogue',
  label: 'Диалог'
}, {
  key: 'flashcards',
  label: 'Карточки'
}];
const FB_NOTES = {
  theory: ['прогресс чтения', 'чекпоинты разделов', 'маркер по выделению текста', 'термины-подсказки', 'спойлер', 'награда за завершение'],
  quiz: ['hover-приглашение', 'нажатая физика выбора', 'радио-поп', 'ripple верного', 'встряска ошибки', '−сердце', 'конфетти + полёт XP'],
  matching: ['drag-нить за курсором или клик-клик', 'пульс кандидатов', 'магнит цели', 'оценка сразу или по кнопке (Tweaks)', 'неверные нити отцепляются'],
  fill: ['слово летит в слот', 'пульс пустых слотов', 'выбор слота кликом', 'пофрагментная проверка', 'возврат неверных слов'],
  ordering: ['захват с наклоном', 'соседи расступаются', 'живая нумерация', 'пружина приземления', 'построчная оценка'],
  categorize: ['хват и наклон фишки', 'подсветка корзины-цели', 'счётчик-бамп', 'оценка сразу или по кнопке (Tweaks)', 'неверные фишки возвращаются в ряд'],
  numberline: ['нажатая физика маркера', 'бабл со значением', 'магнит делений', 'призрак правильного ответа'],
  input: ['фокус-кольцо', 'проверка по Enter', 'ripple верного', 'встряска и сброс при ошибке'],
  balance: ['вобл-анимация весов на каждую операцию', 'поп-появление фишек', 'лог ходов чипами', 'недоступные операции гаснут', 'glow целевого состояния'],
  coords: ['перекрестье до осей при перетаскивании', 'бабл с координатами', 'снап к целым', 'пунктирные цели после ошибки', 'живой список «сейчас»'],
  stepwise: ['построчная оценка ok/no', 'верные строки сохраняются при ретрае', 'автофокус на ошибочную', 'Enter-навигация'],
  sentence: ['слова перелетают между банком и ответом', 'пословная оценка позиций', 'ретрай без пересборки', 'дистракторы в банке'],
  dialogue: ['индикатор набора текста', 'поэтапные баблы', 'превью своего ответа', 'бабл краснеет и трясётся при ошибке'],
  flashcards: ['3D-флип карточки', 'hover-подглядывание', '4 оценки с интервалами повтора', 'вылет/влёт карточек', 'точки прогресса']
};
const FB_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "motion": "Стандарт",
  "confetti": true,
  "lineColor": "#3fb04b",
  "lineWidth": 3,
  "errTone": "Чёткий",
  "checkMode": "Кнопкой"
} /*EDITMODE-END*/;
const FB_MOTION_MAP = {
  'Спокойно': 'calm',
  'Стандарт': 'std',
  'Игриво': 'playful'
};
function FbApp() {
  const [t, setTweak] = useTweaks(FB_TWEAK_DEFAULTS);
  const [tab, setTab] = React.useState('theory');
  const [xp, setXp] = React.useState(2840);
  const [streak, setStreak] = React.useState(7);
  const [solved, setSolved] = React.useState({});
  const [bump, setBump] = React.useState(false);
  const [runId, setRunId] = React.useState(0);

  /* применяем твики к документу */
  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = FB_MOTION_MAP[t.motion] || 'std';
    root.dataset.errtone = t.errTone === 'Мягкий' ? 'soft' : 'sharp';
    root.style.setProperty('--link-color', t.lineColor);
    root.style.setProperty('--link-w', String(t.lineWidth));
  }, [t.motion, t.errTone, t.lineColor, t.lineWidth]);
  const reward = fromEl => {
    flyXP(fromEl, 20, () => {
      setXp(x => x + 20);
      setBump(true);
      setTimeout(() => setBump(false), 500);
    });
  };
  const onTaskEnd = key => correct => {
    setSolved(s => ({
      ...s,
      [key]: correct
    }));
    setStreak(s => correct ? s + 1 : 0);
  };
  const tabIdx = FB_TABS.findIndex(x => x.key === tab);
  const onAdvance = () => {
    setTab(FB_TABS[(tabIdx + 1) % FB_TABS.length].key);
    setRunId(r => r + 1);
    window.scrollTo({
      top: 0
    });
  };
  const switchTab = key => {
    setTab(key);
    setRunId(r => r + 1);
    window.scrollTo({
      top: 0
    });
  };
  const common = {
    step: tabIdx,
    totalSteps: FB_TABS.length - 1,
    streak,
    reward,
    onAdvance,
    confettiEnabled: t.confetti,
    onTaskEnd: onTaskEnd(tab),
    deferred: t.checkMode === 'Кнопкой'
  };
  let screen = null;
  if (tab === 'theory') screen = /*#__PURE__*/React.createElement(Theory, {
    key: 'th' + runId,
    onAdvance: onAdvance,
    reward: reward,
    confettiEnabled: t.confetti
  });else {
    const Comp = {
      quiz: ExQuiz,
      matching: ExMatching,
      fill: ExFill,
      ordering: ExOrdering,
      categorize: ExCategorize,
      numberline: ExNumberLine,
      input: ExInput,
      balance: ExBalance,
      coords: ExCoords,
      stepwise: ExStepwise,
      sentence: ExSentence,
      dialogue: ExDialogue,
      flashcards: ExFlashcards
    }[tab];
    screen = /*#__PURE__*/React.createElement("div", {
      className: "fb-stage"
    }, /*#__PURE__*/React.createElement(Comp, _extends({
      key: tab + runId
    }, common)), /*#__PURE__*/React.createElement("div", {
      className: "fb-note"
    }, FB_NOTES[tab].map((n, i) => /*#__PURE__*/React.createElement("span", {
      key: i
    }, i > 0 && /*#__PURE__*/React.createElement("b", null, " \xB7 "), n))));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "fbp-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fbp-mark"
  }, "g"), /*#__PURE__*/React.createElement("nav", {
    className: "fbp-tabs"
  }, FB_TABS.map(x => /*#__PURE__*/React.createElement(React.Fragment, {
    key: x.key
  }, x.group && /*#__PURE__*/React.createElement("span", {
    className: "fbp-group"
  }, x.group), /*#__PURE__*/React.createElement("button", {
    className: 'fbp-tab' + (tab === x.key ? ' active' : ''),
    onClick: () => switchTab(x.key)
  }, x.label, solved[x.key] && /*#__PURE__*/React.createElement("span", {
    className: "tick"
  }, "\u2713"))))), /*#__PURE__*/React.createElement("span", {
    className: "fbp-stat streak"
  }, /*#__PURE__*/React.createElement(FbIco.Flame, null), " ", streak), /*#__PURE__*/React.createElement("span", {
    id: "xp-anchor",
    className: 'fbp-stat xp' + (bump ? ' bump' : '')
  }, /*#__PURE__*/React.createElement(FbIco.Star, null), " ", xp.toLocaleString('ru-RU'), " XP")), tab === 'theory' ? screen : /*#__PURE__*/React.createElement("main", null, screen), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "\u041C\u043E\u043C\u0435\u043D\u0442 \u043E\u0446\u0435\u043D\u043A\u0438",
    value: t.checkMode,
    options: ['Сразу', 'Кнопкой'],
    onChange: v => {
      setTweak('checkMode', v);
      setRunId(r => r + 1);
    }
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "\u0414\u0432\u0438\u0436\u0435\u043D\u0438\u0435"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u043C\u0435\u043D\u0442",
    value: t.motion,
    options: ['Спокойно', 'Стандарт', 'Игриво'],
    onChange: v => setTweak('motion', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "\u041A\u043E\u043D\u0444\u0435\u0442\u0442\u0438",
    value: t.confetti,
    onChange: v => setTweak('confetti', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "\u041B\u0438\u043D\u0438\u044F \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u044F"
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "\u0426\u0432\u0435\u0442",
    value: t.lineColor,
    options: ['#3fb04b', '#f5b800', '#2b91ff', '#1a2a1f'],
    onChange: v => setTweak('lineColor', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "\u0422\u043E\u043B\u0449\u0438\u043D\u0430",
    value: t.lineWidth,
    min: 2,
    max: 6,
    step: 1,
    unit: "px",
    onChange: v => setTweak('lineWidth', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "\u041E\u0448\u0438\u0431\u043A\u0438"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "\u0422\u043E\u043D \u043E\u0448\u0438\u0431\u043A\u0438",
    value: t.errTone,
    options: ['Мягкий', 'Чёткий'],
    onChange: v => setTweak('errTone', v)
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(FbApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "feedback/app.jsx", error: String((e && e.message) || e) }); }

// feedback/ex-drag.jsx
try { (() => {
/* ============================================================
   ex-drag.jsx — «Расставь по порядку» и «Разложи по группам»
   Pointer-драг: ghost с наклоном, расступающиеся соседи,
   подсветка корзины-цели, пружинный возврат при ошибке.
   ============================================================ */

/* ---------- Порядок ---------- */
const FB_ORDER_ITEMS = ['Привести уравнение к виду ax² + bx + c = 0', 'Вычислить Δ = b² − 4ac', 'Определить число корней по знаку Δ', 'Найти корни по формуле'];
const FB_ROW = 56,
  FB_GAP = 10,
  FB_SLOT = FB_ROW + FB_GAP;
function ExOrdering({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const n = FB_ORDER_ITEMS.length;
  const [order, setOrder] = React.useState(() => {
    let o = fbShuffle(FB_ORDER_ITEMS.map((_, i) => i));
    while (o.every((v, i) => v === i)) o = fbShuffle(o);
    return o;
  });
  const [drag, setDrag] = React.useState(null); // {pos, dy}
  const [settledIdx, setSettledIdx] = React.useState(null);
  const [graded, setGraded] = React.useState(false);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const startY = React.useRef(0);
  const listRef = React.useRef(null);
  const targetPos = drag ? Math.max(0, Math.min(n - 1, drag.pos + Math.round(drag.dy / FB_SLOT))) : null;
  const down = pos => e => {
    if (task.feedback || graded) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startY.current = e.clientY;
    setDrag({
      pos,
      dy: 0
    });
    setSettledIdx(null);
  };
  const move = e => {
    if (!drag) return;
    setDrag({
      ...drag,
      dy: e.clientY - startY.current
    });
  };
  const up = () => {
    if (!drag) return;
    const from = drag.pos,
      to = targetPos;
    if (from !== to) {
      const next = order.slice();
      const [m] = next.splice(from, 1);
      next.splice(to, 0, m);
      setOrder(next);
      setSettledIdx(to);
      setTimeout(() => setSettledIdx(null), 350);
    }
    setDrag(null);
  };
  const check = () => {
    setGraded(true);
    if (order.every((v, i) => v === i)) {
      task.win('Идеальная последовательность!');
      fire();
      reward(listRef.current);
    } else {
      const more = task.lose(null, FB_ORDER_ITEMS.map((s, i) => i + 1 + '. ' + s).join(' '), 'Порядок сохранён — поправь и проверь снова');
      if (more) setTimeout(() => setGraded(false), 900);
    }
  };
  const retry = () => {
    setGraded(false);
    task.clear();
  };
  const shiftFor = pos => {
    if (!drag || pos === drag.pos) return 0;
    if (drag.pos < targetPos && pos > drag.pos && pos <= targetPos) return -FB_SLOT;
    if (drag.pos > targetPos && pos < drag.pos && pos >= targetPos) return FB_SLOT;
    return 0;
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u041F\u041E\u0420\u042F\u0414\u041E\u041A \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u0420\u0430\u0441\u0441\u0442\u0430\u0432\u044C \u0448\u0430\u0433\u0438 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u043F\u043E \u043F\u043E\u0440\u044F\u0434\u043A\u0443",
    feedback: task.feedback,
    canCheck: !graded && !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    ref: listRef,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: FB_GAP,
      maxWidth: 540,
      margin: '0 auto',
      width: '100%'
    }
  }, order.map((itemIdx, pos) => {
    const isDrag = drag && drag.pos === pos;
    const showState = graded && task.feedback ? itemIdx === pos ? 'ok' : 'no' : '';
    const displayNum = isDrag ? targetPos + 1 : pos + 1 + (shiftFor(pos) < 0 ? -1 : shiftFor(pos) > 0 ? 1 : 0);
    return /*#__PURE__*/React.createElement("div", {
      key: itemIdx,
      className: 'fb-dragrow' + (isDrag ? ' dragging' : '') + (settledIdx === pos ? ' settled' : '') + (showState ? ' ' + showState : ''),
      style: {
        transform: isDrag ? 'translateY(' + drag.dy + 'px) rotate(calc(1.4deg * var(--mamp))) scale(1.02)' : 'translateY(' + shiftFor(pos) + 'px)'
      },
      onPointerDown: down(pos),
      onPointerMove: move,
      onPointerUp: up,
      onPointerCancel: up
    }, /*#__PURE__*/React.createElement("span", {
      className: "num"
    }, displayNum), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, FB_ORDER_ITEMS[itemIdx]), /*#__PURE__*/React.createElement("span", {
      className: "grip"
    }, "\u22EE\u22EE"));
  })));
}

/* ---------- Категории ---------- */
const FB_CAT_CHIPS = [{
  id: 0,
  label: 'x² − 5x + 6 = 0',
  cat: 'two'
}, {
  id: 1,
  label: 'x² + x + 1 = 0',
  cat: 'none'
}, {
  id: 2,
  label: 'x² − 9 = 0',
  cat: 'two'
}, {
  id: 3,
  label: 'x² − 2x + 5 = 0',
  cat: 'none'
}];
const FB_BUCKETS = [{
  key: 'two',
  title: 'Есть корни · Δ ≥ 0'
}, {
  key: 'none',
  title: 'Нет корней · Δ < 0'
}];
function ExCategorize({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled,
  deferred
}) {
  const [placed, setPlaced] = React.useState({
    two: [],
    none: []
  });
  const [chipStates, setChipStates] = React.useState({}); // id -> 'ok' | 'no'
  const [drag, setDrag] = React.useState(null); // {id, dx, dy, over}
  const [flash, setFlash] = React.useState(null); // {key, kind:'gotcha'|'reject'|'catch'}
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const start = React.useRef({
    x: 0,
    y: 0
  });
  const bucketRefs = React.useRef({});
  const wrapRef = React.useRef(null);
  const inTray = FB_CAT_CHIPS.filter(c => !placed.two.includes(c.id) && !placed.none.includes(c.id));
  const bucketAt = (x, y) => {
    for (const b of FB_BUCKETS) {
      const el = bucketRefs.current[b.key];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return b.key;
    }
    return null;
  };
  const down = id => e => {
    if (task.feedback) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = {
      x: e.clientX,
      y: e.clientY
    };
    setDrag({
      id,
      dx: 0,
      dy: 0,
      over: null
    });
  };
  const move = e => {
    if (!drag) return;
    setDrag({
      ...drag,
      dx: e.clientX - start.current.x,
      dy: e.clientY - start.current.y,
      over: bucketAt(e.clientX, e.clientY)
    });
  };
  const up = () => {
    if (!drag) return;
    const chip = FB_CAT_CHIPS.find(c => c.id === drag.id);
    const over = drag.over;
    setDrag(null);
    if (!over) return; // вернётся пружиной
    if (deferred) {
      /* принимаем в любую корзину — оценка по кнопке */
      setPlaced(p => ({
        ...p,
        [over]: [...p[over], chip.id]
      }));
      setFlash({
        key: over,
        kind: 'catch'
      });
      setTimeout(() => setFlash(null), 450);
      return;
    }
    if (chip.cat === over) {
      const next = {
        ...placed,
        [over]: [...placed[over], chip.id]
      };
      setPlaced(next);
      setFlash({
        key: over,
        kind: 'gotcha'
      });
      setTimeout(() => setFlash(null), 450);
      if (next.two.length + next.none.length === FB_CAT_CHIPS.length) {
        setTimeout(() => {
          task.win('Все уравнения по местам!');
          fire();
          reward(wrapRef.current);
        }, 380);
      }
    } else {
      setFlash({
        key: over,
        kind: 'reject'
      });
      setTimeout(() => setFlash(null), 450);
      task.lose('У этого уравнения другой знак Δ');
    }
  };

  /* отложенная проверка: неверные фишки возвращаются в ряд */
  const check = () => {
    const states = {};
    let badIds = [];
    FB_BUCKETS.forEach(b => {
      placed[b.key].forEach(id => {
        const ok = FB_CAT_CHIPS.find(c => c.id === id).cat === b.key;
        states[id] = ok ? 'ok' : 'no';
        if (!ok) badIds.push(id);
      });
    });
    setChipStates(states);
    if (badIds.length === 0) {
      task.win('Все уравнения по местам!');
      fire();
      reward(wrapRef.current);
    } else {
      setTimeout(() => {
        setPlaced(p => ({
          two: p.two.filter(id => !badIds.includes(id)),
          none: p.none.filter(id => !badIds.includes(id))
        }));
        setChipStates(s => {
          const ns = {
            ...s
          };
          badIds.forEach(id => delete ns[id]);
          return ns;
        });
        task.lose(badIds.length === 1 ? 'Одна фишка не на месте — она вернулась' : 'Не на месте: ' + badIds.length + ' — они вернулись в ряд');
      }, 750);
    }
  };

  /* клик по фишке в корзине — вернуть в ряд (до проверки) */
  const unplace = id => {
    if (!deferred || task.feedback || chipStates[id]) return;
    setPlaced(p => ({
      two: p.two.filter(x => x !== id),
      none: p.none.filter(x => x !== id)
    }));
  };
  const retry = () => {
    setPlaced({
      two: [],
      none: []
    });
    setChipStates({});
    task.clear();
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u041A\u0410\u0422\u0415\u0413\u041E\u0420\u0418\u0418 \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044F \u0432 \u0441\u0432\u043E\u044E \u0433\u0440\u0443\u043F\u043F\u0443",
    feedback: task.feedback,
    canCheck: deferred && inTray.length === 0 && !task.feedback,
    instant: !deferred,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    style: {
      maxWidth: 620,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      justifyContent: 'center',
      minHeight: 60,
      marginBottom: 26
    }
  }, inTray.map(c => {
    const isDrag = drag && drag.id === c.id;
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      className: 'fb-chip-drag' + (isDrag ? ' dragging' : ''),
      style: isDrag ? {
        transform: 'translate(' + drag.dx + 'px,' + drag.dy + 'px) rotate(calc(2deg * var(--mamp))) scale(1.06)'
      } : undefined,
      onPointerDown: down(c.id),
      onPointerMove: move,
      onPointerUp: up,
      onPointerCancel: up
    }, c.label);
  }), inTray.length === 0 && /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--ink-300)',
      alignSelf: 'center',
      letterSpacing: '.08em'
    }
  }, deferred && !task.feedback ? 'ВСЁ РАЗЛОЖЕНО — ЖМИ «ПРОВЕРИТЬ»' : 'ВСЁ РАЗЛОЖЕНО')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, FB_BUCKETS.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.key,
    ref: el => {
      bucketRefs.current[b.key] = el;
    },
    className: 'fb-bucket' + (drag && drag.over === b.key ? ' over' : '') + (flash && flash.key === b.key ? ' ' + flash.kind : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-bucket-title"
  }, b.title, /*#__PURE__*/React.createElement("span", {
    className: "cnt"
  }, placed[b.key].length)), placed[b.key].map(id => {
    const st = chipStates[id];
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      className: 'fb-chip-drag landed' + (st ? ' ' + st : ''),
      onClick: () => unplace(id),
      title: deferred && !st && !task.feedback ? 'Нажми, чтобы вернуть в ряд' : undefined,
      style: {
        cursor: deferred && !st && !task.feedback ? 'pointer' : 'default',
        alignSelf: 'flex-start',
        borderColor: st ? undefined : deferred ? 'color-mix(in oklab, var(--link-color) 55%, var(--ink-100))' : 'var(--green-300)',
        background: st ? undefined : deferred ? 'color-mix(in oklab, var(--link-color) 7%, var(--paper-2))' : 'var(--green-50)'
      }
    }, FB_CAT_CHIPS.find(c => c.id === id).label);
  }))))));
}
Object.assign(window, {
  ExOrdering,
  ExCategorize
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "feedback/ex-drag.jsx", error: String((e && e.message) || e) }); }

// feedback/ex-fill.jsx
try { (() => {
/* ============================================================
   ex-fill.jsx — «Заполни пропуски»
   Слово летит из банка в слот (FLIP-клон), слоты пульсируют
   при наведении на слово, пофрагментная проверка.
   ============================================================ */

const FB_FILL = {
  parts: ['Если дискриминант ', null, ' нуля, то уравнение имеет ', null, ' действительных корня.'],
  answers: ['больше', 'два'],
  bank: ['больше', 'меньше', 'два', 'ноль', 'один']
};
function ExFill({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const slotCount = FB_FILL.parts.filter(p => p === null).length;
  const [slots, setSlots] = React.useState(Array(slotCount).fill(null)); // word index | null
  const [used, setUsed] = React.useState([]);
  const [armed, setArmed] = React.useState(null);
  const [hoverBank, setHoverBank] = React.useState(false);
  const [slotStates, setSlotStates] = React.useState(Array(slotCount).fill('')); // '' | 'ok' | 'no' | 'flash'
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const pillRefs = React.useRef({});
  const slotRefs = React.useRef({});
  const wrapRef = React.useRef(null);
  const setSlotState = (si, st) => setSlotStates(ss => ss.map((x, i) => i === si ? st : x));
  const place = wi => {
    if (task.feedback || used.includes(wi)) return;
    const si = armed != null && slots[armed] === null ? armed : slots.findIndex(s => s === null);
    if (si < 0) return;
    setArmed(null);
    setUsed(u => [...u, wi]);
    flyClone(pillRefs.current[wi], slotRefs.current[si], null, () => {
      setSlots(s => s.map((x, i) => i === si ? wi : x));
      setSlotState(si, 'flash');
      setTimeout(() => setSlotState(si, ''), 450);
    });
  };
  const unplace = si => {
    if (task.feedback) return;
    if (slots[si] === null) {
      setArmed(armed === si ? null : si);
      return;
    }
    const wi = slots[si];
    setSlots(s => s.map((x, i) => i === si ? null : x));
    setSlotState(si, '');
    flyClone(slotRefs.current[si], pillRefs.current[wi], null, () => {
      setUsed(u => u.filter(x => x !== wi));
    });
  };
  const check = () => {
    const states = slots.map((wi, i) => FB_FILL.bank[wi] === FB_FILL.answers[i] ? 'ok' : 'no');
    setSlotStates(states);
    if (states.every(s => s === 'ok')) {
      task.win('Слова на своих местах!');
      fire();
      reward(wrapRef.current);
    } else {
      task.lose('Подсвеченные слова не подходят', FB_FILL.answers.join(' · '));
    }
  };

  // «Ещё раз»: верные остаются, неверные возвращаются в банк
  const retry = () => {
    slots.forEach((wi, i) => {
      if (wi !== null && FB_FILL.bank[wi] !== FB_FILL.answers[i]) {
        setUsed(u => u.filter(x => x !== wi));
        setSlots(s => s.map((x, j) => j === i ? null : x));
      }
    });
    setSlotStates(ss => ss.map(s => s === 'ok' ? 'ok' : ''));
    task.clear();
  };
  const allFilled = slots.every(s => s !== null);
  let slotCursor = -1;
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u041F\u0420\u041E\u041F\u0423\u0421\u041A\u0418 \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u0421\u043E\u0431\u0435\u0440\u0438 \u043F\u0440\u0430\u0432\u0438\u043B\u043E \u0438\u0437 \u0441\u043B\u043E\u0432",
    feedback: task.feedback,
    canCheck: allFilled && !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    ref: wrapRef
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      lineHeight: 2.3,
      fontWeight: 600,
      maxWidth: 560,
      margin: '0 auto 34px',
      textAlign: 'center'
    }
  }, FB_FILL.parts.map((p, i) => {
    if (p !== null) return /*#__PURE__*/React.createElement("span", {
      key: i
    }, p);
    slotCursor += 1;
    const si = slotCursor;
    const wi = slots[si];
    const st = slotStates[si];
    const cls = 'fb-slot' + (wi !== null ? ' filled' : '') + (armed === si ? ' armed' : '') + (wi === null && hoverBank && !task.feedback ? ' pulse' : '') + (st ? ' ' + st : '');
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      ref: el => {
        slotRefs.current[si] = el;
      },
      className: cls,
      onClick: () => unplace(si),
      title: wi !== null ? 'Нажми, чтобы вернуть слово' : 'Нажми, чтобы выбрать этот пропуск'
    }, wi === null ? '·' : FB_FILL.bank[wi]);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10,
      justifyContent: 'center',
      maxWidth: 520,
      margin: '0 auto'
    }
  }, FB_FILL.bank.map((w, wi) => /*#__PURE__*/React.createElement("button", {
    key: wi,
    ref: el => {
      pillRefs.current[wi] = el;
    },
    className: 'gp-tile' + (used.includes(wi) ? ' locked' : ''),
    style: {
      padding: '10px 18px',
      fontSize: 15,
      borderRadius: 999,
      opacity: used.includes(wi) ? .25 : 1
    },
    disabled: used.includes(wi) || !!task.feedback,
    onClick: () => place(wi),
    onPointerEnter: () => setHoverBank(true),
    onPointerLeave: () => setHoverBank(false)
  }, w)))));
}
Object.assign(window, {
  ExFill
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "feedback/ex-fill.jsx", error: String((e && e.message) || e) }); }

// feedback/ex-lang.jsx
try { (() => {
/* ============================================================
   ex-lang.jsx — языковые задания:
   · ExSentence — собери фразу из слов (Duolingo-tile build)
   · ExDialogue — диалог с выбором реплики (typing dots, баблы)
   · ExFlashcards — SRS-карточки (3D-флип, 4 оценки, интервалы)
   ============================================================ */

/* ---------- Собери фразу ---------- */
const FB_SENT = {
  source: 'Я учу математику каждый день',
  correct: ['I', 'study', 'math', 'every', 'day'],
  distractors: ['plays', 'the', 'week']
};
function ExSentence({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const all = React.useMemo(() => [...FB_SENT.correct, ...FB_SENT.distractors].map((w, i) => ({
    w,
    i
  })), []);
  const [bank, setBank] = React.useState(() => fbShuffle(all));
  const [picked, setPicked] = React.useState([]);
  const [graded, setGraded] = React.useState(false);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const rowRef = React.useRef(null);
  const toPicked = item => {
    if (task.feedback) return;
    setGraded(false);
    setBank(b => b.filter(x => x.i !== item.i));
    setPicked(p => [...p, item]);
  };
  const toBank = item => {
    if (task.feedback) return;
    setGraded(false);
    setPicked(p => p.filter(x => x.i !== item.i));
    setBank(b => [...b, item]);
  };
  const check = () => {
    setGraded(true);
    const got = picked.map(p => p.w);
    const ok = got.length === FB_SENT.correct.length && got.every((w, i) => w === FB_SENT.correct[i]);
    if (ok) {
      task.win('Идеальная фраза!');
      fire();
      reward(rowRef.current);
    } else {
      task.lose('Порядок не сошёлся — подсвечены слова не на месте', FB_SENT.correct.join(' '));
    }
  };
  const retry = () => {
    setGraded(false);
    task.clear();
  };
  const wordState = (item, pos) => {
    if (!graded || !task.feedback) return '';
    return FB_SENT.correct[pos] === item.w ? 'correct' : 'wrong';
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u0421\u041E\u0411\u0415\u0420\u0418 \u0424\u0420\u0410\u0417\u0423 \xB7 \u0410\u041D\u0413\u041B\u0418\u0419\u0421\u041A\u0418\u0419",
    title: "\u041F\u0435\u0440\u0435\u0432\u0435\u0434\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
    feedback: task.feedback,
    canCheck: picked.length > 0 && !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 540,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      background: 'var(--paper)',
      borderRadius: 14,
      border: '2px solid var(--ink-100)',
      fontSize: 17,
      fontWeight: 600,
      marginBottom: 22,
      textAlign: 'center'
    }
  }, FB_SENT.source), /*#__PURE__*/React.createElement("div", {
    ref: rowRef,
    style: {
      minHeight: 62,
      padding: '10px 4px',
      borderTop: '2px solid var(--ink-100)',
      borderBottom: '2px solid var(--ink-100)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      alignContent: 'flex-start',
      marginBottom: 24
    }
  }, picked.length === 0 && /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--ink-200)',
      alignSelf: 'center',
      letterSpacing: '.08em'
    }
  }, "\u041D\u0410\u0416\u0418\u041C\u0410\u0419 \u041D\u0410 \u0421\u041B\u041E\u0412\u0410 \u0412\u041D\u0418\u0417\u0423"), picked.map((p, pos) => /*#__PURE__*/React.createElement("button", {
    key: p.i,
    className: 'gp-tile ' + wordState(p, pos),
    style: {
      padding: '9px 15px',
      fontSize: 16
    },
    disabled: !!task.feedback && task.feedback.kind === 'ok',
    onClick: () => toBank(p),
    title: "\u041D\u0430\u0436\u043C\u0438, \u0447\u0442\u043E\u0431\u044B \u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0441\u043B\u043E\u0432\u043E"
  }, p.w))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'center'
    }
  }, bank.map(b => /*#__PURE__*/React.createElement("button", {
    key: b.i,
    className: "gp-tile",
    style: {
      padding: '9px 15px',
      fontSize: 16
    },
    disabled: !!task.feedback,
    onClick: () => toPicked(b)
  }, b.w)), bank.length === 0 && /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--ink-200)',
      letterSpacing: '.08em'
    }
  }, "\u0411\u0410\u041D\u041A \u041F\u0423\u0421\u0422"))));
}

/* ---------- Диалог ---------- */
const FB_DLG = {
  messages: [{
    speaker: 'Anna',
    text: 'Hi! How was your weekend?'
  }, {
    speaker: 'Anna',
    text: 'Did you do anything fun?'
  }],
  options: [{
    id: 'a',
    text: 'Yes, I went hiking with friends.',
    correct: true
  }, {
    id: 'b',
    text: 'Yes, tomorrow I will go.',
    correct: false
  }, {
    id: 'c',
    text: 'He is going to the cinema.',
    correct: false
  }]
};
function ExDialogue({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const [stage, setStage] = React.useState(0); // сколько NPC-сообщений показано; typing перед каждым
  const [typing, setTyping] = React.useState(true);
  const [pick, setPick] = React.useState(null);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const previewRef = React.useRef(null);

  /* поэтапное появление сообщений с индикатором набора */
  React.useEffect(() => {
    if (stage >= FB_DLG.messages.length) {
      setTyping(false);
      return;
    }
    setTyping(true);
    const t1 = setTimeout(() => {
      setTyping(false);
      const t2 = setTimeout(() => setStage(s => s + 1), 120);
      return () => clearTimeout(t2);
    }, stage === 0 ? 700 : 900);
    return () => clearTimeout(t1);
  }, [stage]);
  const check = () => {
    const opt = FB_DLG.options.find(o => o.id === pick);
    if (opt && opt.correct) {
      task.win('Отличный ответ — время и смысл сходятся');
      fire();
      reward(previewRef.current);
    } else {
      task.lose('Эта реплика не отвечает на вопрос о прошедших выходных', FB_DLG.options.find(o => o.correct).text);
    }
  };
  const retry = () => {
    setPick(null);
    task.clear();
  };
  const shown = FB_DLG.messages.slice(0, stage);
  const allShown = stage >= FB_DLG.messages.length;
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u0414\u0418\u0410\u041B\u041E\u0413 \xB7 \u0410\u041D\u0413\u041B\u0418\u0419\u0421\u041A\u0418\u0419",
    title: "\u0412\u044B\u0431\u0435\u0440\u0438 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0443\u044E \u0440\u0435\u043F\u043B\u0438\u043A\u0443",
    feedback: task.feedback,
    canCheck: pick !== null && !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 480,
      margin: '0 auto',
      width: '100%'
    }
  }, shown.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "fb-bubble-row pop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-avatar"
  }, m.speaker[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--ink-400)',
      fontWeight: 700,
      marginBottom: 3,
      letterSpacing: '.06em'
    }
  }, m.speaker.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    className: "fb-bubble"
  }, m.text)))), typing && !allShown && /*#__PURE__*/React.createElement("div", {
    className: "fb-bubble-row pop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-avatar"
  }, "A"), /*#__PURE__*/React.createElement("div", {
    className: "fb-bubble fb-typing"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null))), pick && /*#__PURE__*/React.createElement("div", {
    className: "fb-bubble-row me pop",
    ref: previewRef
  }, /*#__PURE__*/React.createElement("div", {
    className: 'fb-bubble me' + (task.feedback && task.feedback.kind === 'no' ? ' no' : '')
  }, FB_DLG.options.find(o => o.id === pick).text)), allShown && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      textAlign: 'center',
      margin: '18px 0 10px'
    }
  }, "\u0422\u0412\u041E\u0419 \u041E\u0422\u0412\u0415\u0422"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, FB_DLG.options.map(o => {
    let st = '';
    if (task.feedback) {
      if (o.correct) st = 'correct';else if (o.id === pick) st = 'wrong';else st = 'locked';
    } else if (o.id === pick) st = 'selected';
    return /*#__PURE__*/React.createElement("button", {
      key: o.id,
      className: 'gp-tile ' + st,
      style: {
        padding: '13px 17px',
        fontSize: 15,
        textAlign: 'left'
      },
      disabled: !!task.feedback,
      onClick: () => setPick(o.id)
    }, o.text);
  })))));
}

/* ---------- SRS-карточки ---------- */
const FB_CARDS = [{
  front: 'reliable',
  back: 'надёжный',
  hint: '[rɪˈlaɪəbl]'
}, {
  front: 'curious',
  back: 'любопытный',
  hint: '[ˈkjʊəriəs]'
}, {
  front: 'effort',
  back: 'усилие',
  hint: '[ˈefət]'
}];
const FB_RATES = [{
  key: 'again',
  label: 'Снова',
  iv: '<10м',
  bg: 'var(--coral-500)',
  sh: 'var(--coral-700)',
  fg: '#fff'
}, {
  key: 'hard',
  label: 'Трудно',
  iv: '1ч',
  bg: 'var(--sun-400)',
  sh: 'var(--sun-500)',
  fg: 'var(--ink-900)'
}, {
  key: 'good',
  label: 'Хорошо',
  iv: '1д',
  bg: 'var(--green-600)',
  sh: 'var(--green-700)',
  fg: '#fff'
}, {
  key: 'easy',
  label: 'Легко',
  iv: '4д',
  bg: 'var(--green-500)',
  sh: 'var(--green-700)',
  fg: '#fff'
}];
function ExFlashcards({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [anim, setAnim] = React.useState('enter'); // 'enter' | 'exit' | ''
  const [stats, setStats] = React.useState({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0
  });
  const [feedback, setFeedback] = React.useState(null);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const cardRef = React.useRef(null);
  const rate = key => {
    const ns = {
      ...stats,
      [key]: stats[key] + 1
    };
    setStats(ns);
    if (idx === FB_CARDS.length - 1) {
      const known = ns.good + ns.easy;
      setFeedback({
        kind: 'ok',
        msg: 'Колода пройдена: ' + known + ' / ' + FB_CARDS.length + ' уверенно',
        explain: 'Интервалы повторения обновлены'
      });
      onTaskEnd && onTaskEnd(true);
      fire();
      reward(cardRef.current);
      return;
    }
    setAnim('exit');
    setTimeout(() => {
      setIdx(i => i + 1);
      setFlipped(false);
      setAnim('enter');
    }, 320);
  };
  const card = FB_CARDS[idx];
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: null,
    eyebrow: 'КАРТОЧКИ · АНГЛИЙСКИЙ · ' + (idx + 1) + ' / ' + FB_CARDS.length,
    title: "\u041F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0435 \u0441\u043B\u043E\u0432",
    feedback: feedback,
    canCheck: false,
    instant: true,
    instantLabel: flipped ? 'ОЦЕНИ, НАСКОЛЬКО ЛЕГКО ВСПОМНИЛОСЬ' : 'НАЖМИ НА КАРТОЧКУ, ЧТОБЫ ПЕРЕВЕРНУТЬ',
    onCheck: () => {},
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 400,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-dots"
  }, FB_CARDS.map((_, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    className: i < idx ? 'done' : i === idx ? 'cur' : ''
  }))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: 'fb-cardwrap ' + anim,
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'fb-card3d' + (flipped ? ' flipped' : ''),
    style: {
      height: 230
    },
    onClick: () => !feedback && setFlipped(true)
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner",
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-card-face"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, "\u0421\u041B\u041E\u0412\u041E"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 46,
      fontWeight: 800,
      letterSpacing: '-0.02em'
    }
  }, card.front), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 10,
      fontSize: 10,
      color: 'var(--ink-300)',
      letterSpacing: '.08em'
    }
  }, "\u041D\u0410\u0416\u041C\u0418, \u0427\u0422\u041E\u0411\u042B \u041F\u0415\u0420\u0415\u0412\u0415\u0420\u041D\u0423\u0422\u042C"))), /*#__PURE__*/React.createElement("div", {
    className: "fb-card-face back"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, "\u041F\u0415\u0420\u0415\u0412\u041E\u0414"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 800
    }
  }, card.back), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 6,
      fontSize: 14,
      color: 'var(--ink-500)'
    }
  }, card.hint)))))), flipped && !feedback && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 8
    }
  }, FB_RATES.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.key,
    className: "fb-rate",
    style: {
      background: r.bg,
      color: r.fg,
      boxShadow: '0 4px 0 0 ' + r.sh
    },
    onClick: () => rate(r.key)
  }, r.label, /*#__PURE__*/React.createElement("small", null, r.iv))))));
}
Object.assign(window, {
  ExSentence,
  ExDialogue,
  ExFlashcards
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "feedback/ex-lang.jsx", error: String((e && e.message) || e) }); }

// feedback/ex-matching.jsx
try { (() => {
/* ============================================================
   ex-matching.jsx — «Соедини пары»
   Два способа соединения:
   · клик-клик: выбрал плитку → выбрал пару
   · drag: зажал плитку → нить тянется за курсором → отпустил над целью
   Линия-резинка, магнит цели, постоянные линии после совпадения.
   ============================================================ */

const FB_PAIRS = [{
  left: 'Δ > 0',
  right: 'Два различных корня'
}, {
  left: 'Δ = 0',
  right: 'Один повторяющийся корень'
}, {
  left: 'Δ < 0',
  right: 'Действительных корней нет'
}, {
  left: 'b² − 4ac',
  right: 'Формула дискриминанта'
}];
function fbShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function ExMatching({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled,
  deferred
}) {
  const idxs = FB_PAIRS.map((_, i) => i);
  const [leftOrder] = React.useState(() => fbShuffle(idxs));
  const [rightOrder] = React.useState(() => fbShuffle(idxs));
  const [picked, setPicked] = React.useState(null); // {side,idx}
  const [hot, setHot] = React.useState(null); // {side,idx}
  const [matched, setMatched] = React.useState([]); // [idx] — подтверждённые
  const [links, setLinks] = React.useState([]); // [[l,r]] — соединено, не проверено
  const [freshLink, setFreshLink] = React.useState(null); // l свежей мягкой связи
  const [fresh, setFresh] = React.useState(null); // только что совпавшая пара
  const [wrongPairs, setWrongPairs] = React.useState(null); // [[l,r], ...]
  const [cursor, setCursor] = React.useState(null); // {x,y} в координатах wrap
  const [, setTick] = React.useState(0);
  const task = useTaskState(4, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const wrapRef = React.useRef(null);
  const tileRefs = React.useRef({});
  const dragRef = React.useRef(null); // {side, idx, x0, y0, moved, prevPicked}

  React.useEffect(() => {
    const onR = () => setTick(t => t + 1);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);
  const anchor = (side, idx) => {
    const el = tileRefs.current[side + idx];
    const wrap = wrapRef.current;
    if (!el || !wrap) return null;
    const r = el.getBoundingClientRect();
    const w = wrap.getBoundingClientRect();
    return {
      x: (side === 'L' ? r.right : r.left) - w.left,
      y: r.top + r.height / 2 - w.top
    };
  };
  const bezier = (a, b) => {
    const c = Math.max(30, Math.abs(b.x - a.x) * 0.45);
    const dir = b.x >= a.x ? 1 : -1;
    return 'M ' + a.x + ' ' + a.y + ' C ' + (a.x + c * dir) + ' ' + a.y + ', ' + (b.x - c * dir) + ' ' + b.y + ', ' + b.x + ' ' + b.y;
  };

  /* решение пары — общий выход для клика и перетаскивания */
  const resolvePair = (lIdx, rIdx) => {
    setHot(null);
    if (deferred) {
      /* просто связываем — оценка по кнопке «Проверить» */
      setLinks(ls => [...ls.filter(p => p[0] !== lIdx && p[1] !== rIdx), [lIdx, rIdx]]);
      setFreshLink(lIdx);
      setPicked(null);
      setCursor(null);
      return;
    }
    if (lIdx === rIdx) {
      setMatched(m => {
        const nm = [...m, lIdx];
        if (nm.length === FB_PAIRS.length) {
          setTimeout(() => {
            task.win('Все пары на месте!');
            fire();
            reward(wrapRef.current);
          }, 380);
        }
        return nm;
      });
      setFresh(lIdx);
      setPicked(null);
      setCursor(null);
    } else {
      setWrongPairs([[lIdx, rIdx]]);
      setPicked(null);
      setCursor(null);
      setTimeout(() => {
        setWrongPairs(null);
        task.lose('Эта пара не сходится');
      }, 620);
    }
  };

  /* отложенная проверка: верные закрепляются, неверные отцепляются */
  const check = () => {
    const ok = links.filter(p => p[0] === p[1]);
    const bad = links.filter(p => p[0] !== p[1]);
    if (ok.length) {
      setMatched(m => [...m, ...ok.map(p => p[0])]);
      setFresh(ok[0][0]);
    }
    if (bad.length === 0) {
      setLinks([]);
      task.win('Все пары сошлись!');
      fire();
      reward(wrapRef.current);
    } else {
      setLinks(bad);
      setWrongPairs(bad);
      setTimeout(() => {
        setWrongPairs(null);
        setLinks([]);
        task.lose(bad.length === 1 ? 'Одна пара не сошлась — она отцеплена' : 'Не сошлось пар: ' + bad.length + ' — они отцеплены');
      }, 700);
    }
  };

  /* нажатие на плитку: сразу цепляем нить — и для клика, и для drag */
  const tileDown = (side, idx) => e => {
    if (task.feedback || matched.includes(idx) || wrongPairs) return;
    /* связанная, но не проверенная плитка — отцепляем и берём заново */
    if (deferred) {
      setLinks(ls => ls.filter(p => p[side === 'L' ? 0 : 1] !== idx));
    }
    dragRef.current = {
      side,
      idx,
      x0: e.clientX,
      y0: e.clientY,
      moved: false,
      prevPicked: picked
    };
    if (!picked || picked.side === side) {
      setPicked({
        side,
        idx
      });
      const w = wrapRef.current && wrapRef.current.getBoundingClientRect();
      if (w) setCursor({
        x: e.clientX - w.left,
        y: e.clientY - w.top
      });
    }
  };
  const onMove = e => {
    const d = dragRef.current;
    if (d && !d.moved && Math.hypot(e.clientX - d.x0, e.clientY - d.y0) > 6) d.moved = true;
    if (!picked || !wrapRef.current) return;
    const w = wrapRef.current.getBoundingClientRect();
    setCursor({
      x: e.clientX - w.left,
      y: e.clientY - w.top
    });
  };

  /* отпускание где угодно: завершаем drag или трактуем как клик */
  React.useEffect(() => {
    const up = e => {
      const d = dragRef.current;
      if (!d) return;
      dragRef.current = null;
      if (task.feedback) return;
      if (!d.moved) {
        /* клик-семантика */
        const p = d.prevPicked;
        if (p && p.side === d.side && p.idx === d.idx) {
          setPicked(null);
          setCursor(null); // повторный клик — снять выбор
        } else if (p && p.side !== d.side) {
          const lIdx = d.side === 'L' ? d.idx : p.idx;
          const rIdx = d.side === 'R' ? d.idx : p.idx;
          resolvePair(lIdx, rIdx); // второй клик — решаем пару
        }
        return;
      }

      /* drag-семантика: ищем плитку под точкой отпускания */
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const t = el && el.closest('[data-mside]');
      if (t) {
        const side = t.dataset.mside;
        const idx = parseInt(t.dataset.midx, 10);
        if (side !== d.side && !matched.includes(idx)) {
          const lIdx = d.side === 'L' ? d.idx : idx;
          const rIdx = d.side === 'R' ? d.idx : idx;
          resolvePair(lIdx, rIdx);
          return;
        }
      }
      /* отпустили в пустоту — нить отцепляется */
      setPicked(null);
      setCursor(null);
      setHot(null);
    };
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  });
  const retry = () => {
    if (!deferred) {
      setMatched([]);
      setFresh(null);
    }
    setLinks([]);
    setFreshLink(null);
    setPicked(null);
    setWrongPairs(null);
    setCursor(null);
    task.clear();
  };
  const linkFor = (side, idx) => links.find(p => p[side === 'L' ? 0 : 1] === idx);
  const inWrong = (side, idx) => wrongPairs && wrongPairs.some(p => p[side === 'L' ? 0 : 1] === idx);
  const stateFor = (side, idx) => {
    if (matched.includes(idx)) return fresh === idx ? 'correct' : 'correct locked';
    if (inWrong(side, idx)) return 'wrong';
    if (picked && picked.side === side && picked.idx === idx) return 'selected';
    if (picked && picked.side !== side) {
      if (hot && hot.side === side && hot.idx === idx) return 'hot';
      return linkFor(side, idx) ? 'linked' : 'candidate';
    }
    if (linkFor(side, idx)) return 'linked';
    return '';
  };

  // линия-резинка: от выбранной плитки к курсору (или магнитом к горячей цели)
  let cursorPath = null;
  let cursorEnd = null;
  if (picked) {
    const a = anchor(picked.side, picked.idx);
    let b = null;
    if (hot && hot.side !== picked.side) b = anchor(hot.side, hot.idx);else if (cursor) b = cursor;
    if (a && b) {
      cursorPath = bezier(a, b);
      cursorEnd = b;
    }
  }
  const renderTile = (side, idx) => /*#__PURE__*/React.createElement("button", {
    key: side + idx,
    ref: el => {
      tileRefs.current[side + idx] = el;
    },
    "data-mside": side,
    "data-midx": idx,
    className: 'gp-tile ' + stateFor(side, idx),
    style: side === 'L' ? {
      fontFamily: "'Geist Mono', monospace",
      fontSize: 17,
      textAlign: 'center',
      touchAction: 'none'
    } : {
      fontSize: 14,
      textAlign: 'center',
      touchAction: 'none'
    },
    onPointerDown: tileDown(side, idx),
    onPointerEnter: () => picked && picked.side !== side && !matched.includes(idx) && setHot({
      side,
      idx
    }),
    onPointerLeave: () => setHot(null)
  }, FB_PAIRS[idx][side === 'L' ? 'left' : 'right']);
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u0421\u041E\u0415\u0414\u0418\u041D\u0418 \u041F\u0410\u0420\u042B \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u0421\u043E\u0435\u0434\u0438\u043D\u0438 \u0437\u043D\u0430\u043A \u0434\u0438\u0441\u043A\u0440\u0438\u043C\u0438\u043D\u0430\u043D\u0442\u0430 \u0441 \u0432\u044B\u0432\u043E\u0434\u043E\u043C",
    feedback: task.feedback,
    canCheck: deferred && links.length + matched.length === FB_PAIRS.length && !wrongPairs && !task.feedback,
    instant: !deferred,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    className: "fb-linkwrap",
    onPointerMove: onMove,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px 90px',
      maxWidth: 620,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    className: "fb-linksvg"
  }, matched.map(idx => {
    const a = anchor('L', idx);
    const b = anchor('R', idx);
    if (!a || !b) return null;
    return /*#__PURE__*/React.createElement("path", {
      key: idx,
      className: 'fb-line-done' + (fresh === idx ? ' fresh' : ''),
      d: bezier(a, b)
    });
  }), links.map(([l, r]) => {
    if (inWrong('L', l)) return null;
    const a = anchor('L', l);
    const b = anchor('R', r);
    if (!a || !b) return null;
    return /*#__PURE__*/React.createElement("path", {
      key: 's' + l + '-' + r,
      className: 'fb-line-soft' + (freshLink === l ? ' fresh' : ''),
      d: bezier(a, b)
    });
  }), wrongPairs && wrongPairs.map(([l, r]) => {
    const a = anchor('L', l);
    const b = anchor('R', r);
    if (!a || !b) return null;
    return /*#__PURE__*/React.createElement("path", {
      key: 'w' + l + '-' + r,
      className: "fb-line-wrong",
      d: bezier(a, b)
    });
  }), cursorPath && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    className: "fb-line-cursor",
    d: cursorPath
  }), (() => {
    const a = anchor(picked.side, picked.idx);
    return a ? /*#__PURE__*/React.createElement("circle", {
      className: "fb-line-anchor",
      cx: a.x,
      cy: a.y,
      r: "6"
    }) : null;
  })(), cursorEnd && /*#__PURE__*/React.createElement("circle", {
    className: "fb-line-dot",
    cx: cursorEnd.x,
    cy: cursorEnd.y,
    r: "5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, leftOrder.map(idx => renderTile('L', idx))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, rightOrder.map(idx => renderTile('R', idx)))), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      textAlign: 'center',
      fontSize: 11,
      color: 'var(--ink-300)',
      letterSpacing: '.06em',
      marginTop: 22
    }
  }, deferred ? 'СОЕДИНИ ВСЁ И НАЖМИ «ПРОВЕРИТЬ» · НАЖАТИЕ НА СВЯЗАННУЮ ПЛИТКУ ОТЦЕПЛЯЕТ НИТЬ' : 'КЛИКАЙ ПО ДВУМ ПЛИТКАМ — ИЛИ ПЕРЕТАЩИ НИТЬ С ОДНОЙ НА ДРУГУЮ'));
}
Object.assign(window, {
  ExMatching,
  fbShuffle
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "feedback/ex-matching.jsx", error: String((e && e.message) || e) }); }

// feedback/ex-math.jsx
try { (() => {
/* ============================================================
   ex-math.jsx — математические задания:
   · ExBalance — весы-уравнение (наклон-вобл, операции над обеими чашами)
   · ExCoords — координатная плоскость (drag точек, перекрестье, снап)
   · ExStepwise — решение по шагам (повалидация каждой строки)
   ============================================================ */

/* ---------- Весы ---------- */
const FB_BAL = {
  initial: {
    leftX: 3,
    leftW: 4,
    rightX: 1,
    rightW: 10
  },
  target: {
    leftX: 1,
    leftW: 0,
    rightX: 0,
    rightW: 3
  },
  explain: '3x + 4 = x + 10 → 2x + 4 = 10 → 2x = 6 → x = 3'
};
function fbEqState(a, b) {
  return a.leftX === b.leftX && a.leftW === b.leftW && a.rightX === b.rightX && a.rightW === b.rightW;
}
function FbScaleItems({
  kind,
  count
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 4,
      justifyContent: 'center'
    }
  }, Array.from({
    length: count
  }, (_, i) => kind === 'x' ? /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "fb-witem",
    style: {
      width: 26,
      height: 26,
      borderRadius: 6,
      background: 'var(--green-600)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontFamily: "'Geist Mono', monospace",
      fontWeight: 800,
      fontSize: 13,
      boxShadow: 'inset 0 -3px 0 var(--green-700)'
    }
  }, "x") : /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "fb-witem",
    style: {
      width: 15,
      height: 15,
      borderRadius: '50%',
      background: 'var(--sun-400)',
      boxShadow: 'inset 0 -2px 0 var(--sun-500)'
    }
  })));
}
function fbEqText(s) {
  const side = (x, w) => {
    if (x === 0 && w === 0) return '0';
    const parts = [];
    if (x > 0) parts.push((x > 1 ? x : '') + 'x');
    if (w > 0) parts.push(String(w));
    return parts.join(' + ');
  };
  return side(s.leftX, s.leftW) + ' = ' + side(s.rightX, s.rightW);
}
function ExBalance({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const [s, setS] = React.useState(FB_BAL.initial);
  const [moves, setMoves] = React.useState([]);
  const [wobble, setWobble] = React.useState(false);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const beamRef = React.useRef(null);
  const atTarget = fbEqState(s, FB_BAL.target);
  const applyOp = (label, next) => {
    if (task.feedback) return;
    setS(next);
    setMoves(m => [...m, label]);
    setWobble(true);
    setTimeout(() => setWobble(false), 650);
  };
  const ops = [{
    label: '−1 с обеих',
    can: s.leftW >= 1 && s.rightW >= 1,
    run: () => applyOp('−1', {
      ...s,
      leftW: s.leftW - 1,
      rightW: s.rightW - 1
    })
  }, {
    label: '−4 с обеих',
    can: s.leftW >= 4 && s.rightW >= 4,
    run: () => applyOp('−4', {
      ...s,
      leftW: s.leftW - 4,
      rightW: s.rightW - 4
    })
  }, {
    label: '−x с обеих',
    can: s.leftX >= 1 && s.rightX >= 1,
    run: () => applyOp('−x', {
      ...s,
      leftX: s.leftX - 1,
      rightX: s.rightX - 1
    })
  }, {
    label: '÷ ' + (s.leftX > 1 ? s.leftX : '…'),
    can: s.leftX >= 2 && s.leftW % s.leftX === 0 && s.rightW % s.leftX === 0 && s.rightX === 0,
    run: () => applyOp('÷' + s.leftX, {
      leftX: 1,
      leftW: s.leftW / s.leftX,
      rightX: 0,
      rightW: s.rightW / s.leftX
    })
  }];
  const check = () => {
    if (atTarget) {
      task.win('x выделен: x = 3', FB_BAL.explain);
      fire();
      reward(beamRef.current);
    } else {
      task.lose('x ещё не один на чаше — продолжай упрощать');
    }
  };
  const retry = () => {
    setS(FB_BAL.initial);
    setMoves([]);
    task.clear();
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u0412\u0415\u0421\u042B \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u041E\u0441\u0442\u0430\u0432\u044C x \u043E\u0434\u0438\u043D \u043D\u0430 \u043B\u0435\u0432\u043E\u0439 \u0447\u0430\u0448\u0435",
    feedback: task.feedback,
    canCheck: !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      textAlign: 'center',
      fontSize: 19,
      fontWeight: 700,
      marginBottom: 16,
      transition: 'color 200ms',
      color: atTarget ? 'var(--green-700)' : 'var(--ink-700)'
    }
  }, fbEqText(s)), /*#__PURE__*/React.createElement("div", {
    ref: beamRef,
    className: 'fb-beam-wrap fb-beam' + (wobble ? ' wobble' : '')
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'fb-pan' + (atTarget ? ' glow' : ''),
    style: {
      background: 'var(--green-50)',
      border: '2px solid var(--green-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, "\u041B\u0415\u0412\u0410\u042F"), /*#__PURE__*/React.createElement(FbScaleItems, {
    kind: "x",
    count: s.leftX
  }), /*#__PURE__*/React.createElement(FbScaleItems, {
    kind: "w",
    count: s.leftW
  })), /*#__PURE__*/React.createElement("div", {
    className: 'fb-pan' + (atTarget ? ' glow' : ''),
    style: {
      background: 'var(--sun-50)',
      border: '2px solid var(--sun-300)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, "\u041F\u0420\u0410\u0412\u0410\u042F"), /*#__PURE__*/React.createElement(FbScaleItems, {
    kind: "x",
    count: s.rightX
  }), /*#__PURE__*/React.createElement(FbScaleItems, {
    kind: "w",
    count: s.rightW
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      background: 'var(--ink-700)',
      borderRadius: 999,
      margin: '10px 40px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 22,
      background: 'var(--ink-700)',
      borderRadius: '0 0 6px 6px',
      margin: '0 auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 20
    }
  }, ops.map((op, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "gp-tile fb-op mono",
    style: {
      padding: '9px 15px',
      fontSize: 13
    },
    disabled: !op.can || !!task.feedback,
    onClick: op.run
  }, op.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 14,
      minHeight: 22
    }
  }, moves.map((m, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "fb-move-chip"
  }, m)))));
}

/* ---------- Координатная плоскость ---------- */
const FB_CP = {
  range: 6,
  targets: [{
    x: 2,
    y: 3,
    label: 'A',
    color: 'var(--green-600)'
  }, {
    x: -4,
    y: -2,
    label: 'B',
    color: 'var(--coral-500)'
  }, {
    x: 5,
    y: -4,
    label: 'C',
    color: '#2b91ff'
  }]
};
const FB_CP_SIZE = 360;
const FB_CP_PAD = 30;
function ExCoords({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const {
    range,
    targets
  } = FB_CP;
  const scale = (FB_CP_SIZE - FB_CP_PAD * 2) / (range * 2);
  const toX = v => FB_CP_PAD + (v + range) * scale;
  const toY = v => FB_CP_PAD + (range - v) * scale;
  const [pts, setPts] = React.useState([{
    x: 0,
    y: 1
  }, {
    x: 1,
    y: 0
  }, {
    x: -1,
    y: 0
  }]);
  const [drag, setDrag] = React.useState(null);
  const [graded, setGraded] = React.useState(false);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const svgRef = React.useRef(null);
  const fromEvent = e => {
    const r = svgRef.current.getBoundingClientRect();
    const x = Math.round((e.clientX - r.left - FB_CP_PAD) / scale - range);
    const y = Math.round(range - (e.clientY - r.top - FB_CP_PAD) / scale);
    return {
      x: Math.max(-range, Math.min(range, x)),
      y: Math.max(-range, Math.min(range, y))
    };
  };
  const down = i => e => {
    if (task.feedback) return;
    e.currentTarget.setPointerCapture && svgRef.current.setPointerCapture(e.pointerId);
    setDrag(i);
    setGraded(false);
  };
  const move = e => {
    if (drag === null || task.feedback) return;
    const p = fromEvent(e);
    setPts(ps => ps.map((pp, i) => i === drag ? p : pp));
  };
  const up = () => setDrag(null);
  const check = () => {
    setGraded(true);
    const allOk = targets.every((t, i) => pts[i].x === t.x && pts[i].y === t.y);
    if (allOk) {
      task.win('Все точки точно в цель!');
      fire();
      reward(svgRef.current);
    } else {
      const off = targets.filter((t, i) => pts[i].x !== t.x || pts[i].y !== t.y).length;
      task.lose('Мимо: ' + off + ' — цели показаны пунктиром');
    }
  };
  const retry = () => {
    setGraded(false);
    task.clear();
  };
  const gridLines = [];
  for (let v = -range; v <= range; v++) gridLines.push(v);
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u041A\u041E\u041E\u0420\u0414\u0418\u041D\u0410\u0422\u042B \xB7 \u0413\u0415\u041E\u041C\u0415\u0422\u0420\u0418\u042F",
    title: "\u0420\u0430\u0441\u0441\u0442\u0430\u0432\u044C \u0442\u043E\u0447\u043A\u0438 \u043F\u043E \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0430\u043C",
    feedback: task.feedback,
    canCheck: !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    ref: svgRef,
    width: FB_CP_SIZE,
    height: FB_CP_SIZE,
    style: {
      background: 'var(--paper)',
      border: '2px solid var(--ink-100)',
      borderRadius: 14,
      userSelect: 'none',
      touchAction: 'none'
    },
    onPointerMove: move,
    onPointerUp: up,
    onPointerCancel: up
  }, gridLines.map(v => /*#__PURE__*/React.createElement("g", {
    key: v
  }, /*#__PURE__*/React.createElement("line", {
    x1: toX(v),
    y1: toY(-range),
    x2: toX(v),
    y2: toY(range),
    stroke: "var(--ink-100)",
    strokeWidth: v === 0 ? 0 : 1
  }), /*#__PURE__*/React.createElement("line", {
    x1: toX(-range),
    y1: toY(v),
    x2: toX(range),
    y2: toY(v),
    stroke: "var(--ink-100)",
    strokeWidth: v === 0 ? 0 : 1
  }))), /*#__PURE__*/React.createElement("line", {
    x1: toX(0),
    y1: toY(-range),
    x2: toX(0),
    y2: toY(range),
    stroke: "var(--ink-400)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: toX(-range),
    y1: toY(0),
    x2: toX(range),
    y2: toY(0),
    stroke: "var(--ink-400)",
    strokeWidth: "1.5"
  }), drag !== null && /*#__PURE__*/React.createElement("g", {
    className: "fb-crosshair"
  }, /*#__PURE__*/React.createElement("line", {
    x1: toX(pts[drag].x),
    y1: toY(0),
    x2: toX(pts[drag].x),
    y2: toY(pts[drag].y),
    stroke: targets[drag].color,
    strokeWidth: "1.5",
    strokeDasharray: "3 4",
    opacity: ".6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: toX(0),
    y1: toY(pts[drag].y),
    x2: toX(pts[drag].x),
    y2: toY(pts[drag].y),
    stroke: targets[drag].color,
    strokeWidth: "1.5",
    strokeDasharray: "3 4",
    opacity: ".6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: toX(pts[drag].x) - 26,
    y: toY(pts[drag].y) - 44,
    width: "52",
    height: "22",
    rx: "6",
    fill: "var(--ink-900)"
  }), /*#__PURE__*/React.createElement("text", {
    x: toX(pts[drag].x),
    y: toY(pts[drag].y) - 29,
    textAnchor: "middle",
    fill: "#fff",
    fontSize: "11",
    fontWeight: "700",
    fontFamily: "'Geist Mono', monospace"
  }, pts[drag].x, ",", pts[drag].y)), graded && task.feedback && task.feedback.kind === 'no' && targets.map((t, i) => (pts[i].x !== t.x || pts[i].y !== t.y) && /*#__PURE__*/React.createElement("circle", {
    key: 't' + i,
    className: "fb-target-ring",
    cx: toX(t.x),
    cy: toY(t.y),
    r: "12",
    fill: "none",
    stroke: t.color,
    strokeWidth: "2",
    strokeDasharray: "3 3",
    opacity: ".55"
  })), pts.map((p, i) => {
    const t = targets[i];
    const isOk = graded && task.feedback && p.x === t.x && p.y === t.y;
    const isNo = graded && task.feedback && !isOk;
    return /*#__PURE__*/React.createElement("g", {
      key: i,
      className: 'fb-pt' + (drag === i ? ' grabbed' : '') + (isOk ? ' ok' : ''),
      onPointerDown: down(i)
    }, /*#__PURE__*/React.createElement("circle", {
      className: "body",
      cx: toX(p.x),
      cy: toY(p.y),
      r: "14",
      fill: isOk ? 'var(--green-600)' : isNo ? 'var(--err-border)' : t.color,
      stroke: "#fff",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("text", {
      x: toX(p.x),
      y: toY(p.y) + 4.5,
      textAnchor: "middle",
      fill: "#fff",
      fontSize: "12",
      fontWeight: "800",
      fontFamily: "'Geist Mono', monospace",
      style: {
        pointerEvents: 'none'
      }
    }, t.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "\u0420\u0410\u0417\u041C\u0415\u0421\u0422\u0418 \u0422\u041E\u0427\u041A\u0418"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, targets.map((t, i) => {
    const p = pts[i];
    const here = p.x === t.x && p.y === t.y;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '8px 10px',
        borderRadius: 10,
        background: 'var(--paper-2)',
        border: '2px solid ' + (graded && task.feedback ? here ? 'var(--green-300)' : 'var(--err-border)' : 'var(--ink-100)'),
        transition: 'border-color 200ms'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: t.color,
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        fontFamily: "'Geist Mono', monospace",
        fontWeight: 800,
        fontSize: 11
      }
    }, t.label), /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 12.5,
        fontWeight: 700,
        whiteSpace: 'nowrap'
      }
    }, "(", t.x, ", ", t.y, ")"), /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        marginLeft: 'auto',
        fontSize: 10,
        color: here ? 'var(--green-700)' : 'var(--ink-400)'
      }
    }, p.x, ",", p.y));
  })), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 12,
      fontSize: 10,
      color: 'var(--ink-300)',
      letterSpacing: '.06em',
      lineHeight: 1.7
    }
  }, "\u0422\u042F\u041D\u0418 \u0422\u041E\u0427\u041A\u0423 \u2014 \u041F\u0415\u0420\u0415\u041A\u0420\u0415\u0421\u0422\u042C\u0415 \u041F\u041E\u041A\u0410\u0416\u0415\u0422 \u041A\u041E\u041E\u0420\u0414\u0418\u041D\u0410\u0422\u042B"))));
}

/* ---------- По шагам ---------- */
const FB_SW = {
  problem: '2x + 6 = 14',
  steps: [{
    label: 'Шаг 1',
    expected: '2x = 8',
    hint: 'перенеси 6'
  }, {
    label: 'Шаг 2',
    expected: 'x = 4',
    hint: 'раздели на 2'
  }]
};
const fbNorm = s => s.replace(/\s+/g, '').toLowerCase();
function ExStepwise({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const [vals, setVals] = React.useState(FB_SW.steps.map(() => ''));
  const [graded, setGraded] = React.useState(false);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const inputRefs = React.useRef([]);
  const allFilled = vals.every(v => v.trim() !== '');
  const check = () => {
    setGraded(true);
    const flags = FB_SW.steps.map((s, i) => fbNorm(vals[i]) === fbNorm(s.expected));
    if (flags.every(Boolean)) {
      task.win('Каждый шаг точен!');
      fire();
      reward(inputRefs.current[FB_SW.steps.length - 1]);
    } else {
      task.lose('Проверь подсвеченные строки — верные сохранены', FB_SW.steps.map(s => s.expected).join(' → '));
    }
  };
  const retry = () => {
    setGraded(false);
    task.clear();
    const firstBad = FB_SW.steps.findIndex((s, i) => fbNorm(vals[i]) !== fbNorm(s.expected));
    setTimeout(() => firstBad >= 0 && inputRefs.current[firstBad] && inputRefs.current[firstBad].focus(), 60);
  };
  const stateFor = i => {
    if (!graded || !task.feedback) return '';
    return fbNorm(vals[i]) === fbNorm(FB_SW.steps[i].expected) ? 'ok' : 'no';
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u041F\u041E \u0428\u0410\u0413\u0410\u041C \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u0420\u0435\u0448\u0438 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435, \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0443",
    feedback: task.feedback,
    canCheck: allFilled && !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 440,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "th-formula",
    style: {
      marginBottom: 20,
      fontSize: 26
    }
  }, FB_SW.problem), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, FB_SW.steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "fb-step-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fb-step-label"
  }, s.label), /*#__PURE__*/React.createElement("input", {
    ref: el => {
      inputRefs.current[i] = el;
    },
    className: 'fb-step-input ' + stateFor(i),
    placeholder: s.hint,
    value: vals[i],
    disabled: !!task.feedback,
    onChange: e => {
      setVals(v => v.map((x, j) => j === i ? e.target.value : x));
      setGraded(false);
    },
    onKeyDown: e => {
      if (e.key !== 'Enter') return;
      if (i < FB_SW.steps.length - 1) inputRefs.current[i + 1] && inputRefs.current[i + 1].focus();else if (allFilled && !task.feedback) check();
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 14,
      fontSize: 10,
      color: 'var(--ink-300)',
      letterSpacing: '.06em',
      textAlign: 'center'
    }
  }, "ENTER \u2014 \u041A \u0421\u041B\u0415\u0414\u0423\u042E\u0429\u0415\u0419 \u0421\u0422\u0420\u041E\u041A\u0415 \xB7 \u041F\u0420\u041E\u0411\u0415\u041B\u042B \u0418 \u0420\u0415\u0413\u0418\u0421\u0422\u0420 \u041D\u0415 \u0412\u0410\u0416\u041D\u042B")));
}
Object.assign(window, {
  ExBalance,
  ExCoords,
  ExStepwise
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "feedback/ex-math.jsx", error: String((e && e.message) || e) }); }

// feedback/ex-numberline.jsx
try { (() => {
/* ============================================================
   ex-numberline.jsx — «Числовая ось»
   Маркер с нажатой физикой, всплывающее значение, магнит делений,
   призрак правильного ответа при провале.
   ============================================================ */

const FB_NL = {
  min: -5,
  max: 5,
  target: -2,
  start: 1
};
function ExNumberLine({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const {
    min,
    max,
    target
  } = FB_NL;
  const [pos, setPos] = React.useState(FB_NL.start);
  const [grabbed, setGrabbed] = React.useState(false);
  const [state, setState] = React.useState(''); // '' | 'ok' | 'no'
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const trackRef = React.useRef(null);
  const markerRef = React.useRef(null);
  const setFromX = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    setPos(Math.round(min + t * (max - min)));
  };
  const down = e => {
    if (task.feedback) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setGrabbed(true);
    setState('');
  };
  const move = e => {
    if (grabbed) setFromX(e.clientX);
  };
  const up = () => setGrabbed(false);
  const clickTrack = e => {
    if (!task.feedback && !grabbed) {
      setFromX(e.clientX);
      setState('');
    }
  };
  const check = () => {
    if (pos === target) {
      setState('ok');
      task.win('Ровно в точку!');
      fire();
      reward(markerRef.current);
    } else {
      setState('no');
      const more = task.lose('Маркер стоит на ' + pos, String(target));
      if (more) setTimeout(() => setState(''), 700);
    }
  };
  const retry = () => {
    setState('');
    task.clear();
  };
  const frac = (pos - min) / (max - min);
  const ticks = Array.from({
    length: max - min + 1
  }, (_, i) => min + i);
  const showGhost = task.out && task.feedback;
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u0427\u0418\u0421\u041B\u041E\u0412\u0410\u042F \u041E\u0421\u042C \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u041E\u0442\u043C\u0435\u0442\u044C \u0447\u0438\u0441\u043B\u043E \u22122 \u043D\u0430 \u043E\u0441\u0438",
    feedback: task.feedback,
    canCheck: !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      margin: '0 auto',
      width: '100%',
      padding: '40px 20px 10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onClick: clickTrack,
    style: {
      position: 'relative',
      height: 110,
      cursor: task.feedback ? 'default' : 'pointer',
      userSelect: 'none',
      touchAction: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      left: 0,
      right: 0,
      height: 4,
      background: 'var(--ink-200)',
      borderRadius: 999
    }
  }), ticks.map(n => {
    const t = (n - min) / (max - min);
    return /*#__PURE__*/React.createElement("div", {
      key: n,
      className: 'fb-tick' + (n === pos ? ' near' : ''),
      style: {
        position: 'absolute',
        top: 58,
        left: t * 100 + '%',
        width: 2,
        height: 16,
        marginLeft: -1,
        background: n === 0 ? 'var(--ink-700)' : 'var(--ink-300)',
        borderRadius: 1,
        transformOrigin: 'bottom'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        position: 'absolute',
        top: 22,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 13,
        fontWeight: 600,
        color: n === pos ? 'var(--green-700)' : n === 0 ? 'var(--ink-900)' : 'var(--ink-400)'
      }
    }, n));
  }), showGhost && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 20,
      left: (target - min) / (max - min) * 100 + '%',
      width: 46,
      height: 46,
      marginLeft: -23,
      borderRadius: 999,
      border: '2px dashed var(--green-500)',
      color: 'var(--green-700)',
      display: 'grid',
      placeItems: 'center',
      fontFamily: "'Geist Mono', monospace",
      fontSize: 14,
      fontWeight: 800
    }
  }, target), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 20,
      left: frac * 100 + '%',
      marginLeft: -23,
      transition: grabbed ? 'none' : 'left 140ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'fb-marker-bubble' + (grabbed ? ' show' : '')
  }, pos), /*#__PURE__*/React.createElement("div", {
    ref: markerRef,
    className: 'fb-marker' + (grabbed ? ' grabbed' : '') + (state ? ' ' + state : ''),
    onPointerDown: down,
    onPointerMove: move,
    onPointerUp: up,
    onPointerCancel: up
  }, pos))), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      textAlign: 'center',
      fontSize: 11,
      color: 'var(--ink-300)',
      letterSpacing: '.06em',
      marginTop: 8
    }
  }, "\u041F\u0415\u0420\u0415\u0422\u0410\u0429\u0418 \u041C\u0410\u0420\u041A\u0415\u0420 \u0418\u041B\u0418 \u041A\u041B\u0418\u041A\u041D\u0418 \u041F\u041E \u041E\u0421\u0418")));
}
Object.assign(window, {
  ExNumberLine
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "feedback/ex-numberline.jsx", error: String((e && e.message) || e) }); }

// feedback/ex-quiz.jsx
try { (() => {
/* ============================================================
   ex-quiz.jsx — «Один выбор» и «Ввод ответа»
   ============================================================ */

/* ---------- Один выбор ---------- */
function ExQuiz({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const options = ['Два различных корня', 'Один повторяющийся корень', 'Действительных корней нет', 'Нельзя определить'];
  const correct = 2;
  const [pick, setPick] = React.useState(null);
  const [graded, setGraded] = React.useState(false);
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const bodyRef = React.useRef(null);
  const check = () => {
    setGraded(true);
    if (pick === correct) {
      task.win('Точно! Δ = 16 − 24 = −8 < 0');
      fire();
      reward(bodyRef.current);
    } else {
      const more = task.lose(null, options[correct], 'Δ = b² − 4ac = 16 − 24 = −8');
      if (!more) return;
    }
  };
  const retry = () => {
    setPick(null);
    setGraded(false);
    task.clear();
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u041E\u0414\u0418\u041D \u0412\u042B\u0411\u041E\u0420 \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0440\u043D\u0435\u0439 \u0443 2x\xB2 + 4x + 3 = 0?",
    feedback: task.feedback,
    canCheck: pick != null && !graded,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    ref: bodyRef,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      maxWidth: 560,
      margin: '0 auto',
      width: '100%'
    }
  }, options.map((opt, i) => {
    const isPick = pick === i;
    const showOk = graded && task.feedback && i === correct && task.feedback.kind === 'ok';
    const showNo = graded && task.feedback && isPick && i !== correct;
    const cls = showOk ? 'correct' : showNo ? 'wrong' : isPick ? 'selected' : '';
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: 'gp-tile ' + cls,
      disabled: !!task.feedback && task.feedback.kind === 'ok',
      onClick: () => {
        if (!task.feedback) {
          setPick(i);
          setGraded(false);
        }
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "tile-dot"
    }, isPick || showOk ? '✓' : showNo ? '✕' : ''), /*#__PURE__*/React.createElement("span", null, opt), showOk && /*#__PURE__*/React.createElement("span", {
      className: "tile-chip ok"
    }, "\u0412\u0415\u0420\u041D\u041E"), showNo && /*#__PURE__*/React.createElement("span", {
      className: "tile-chip no"
    }, "\u041C\u0418\u041C\u041E"));
  })));
}

/* ---------- Ввод ответа ---------- */
function ExInput({
  step,
  totalSteps,
  streak,
  onTaskEnd,
  reward,
  onAdvance,
  confettiEnabled
}) {
  const correct = -8;
  const [val, setVal] = React.useState('');
  const [state, setState] = React.useState(''); // '' | 'ok' | 'no'
  const task = useTaskState(3, onTaskEnd);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const inputRef = React.useRef(null);
  const check = () => {
    const num = parseFloat(val.replace(',', '.'));
    if (num === correct) {
      setState('ok');
      task.win('Δ = 4² − 4·2·3 = −8. Считаешь как калькулятор');
      fire();
      reward(inputRef.current);
    } else {
      setState('no');
      const more = task.lose(null, String(correct), 'Δ = b² − 4ac = 16 − 24');
      if (more) setTimeout(() => setState(''), 700);
    }
  };
  const retry = () => {
    setVal('');
    setState('');
    task.clear();
    setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
  };
  return /*#__PURE__*/React.createElement(FbShell, {
    step: step,
    totalSteps: totalSteps,
    streak: streak,
    hearts: task.hearts,
    lostHeart: task.lostHeart,
    eyebrow: "\u0412\u0412\u041E\u0414 \u041E\u0422\u0412\u0415\u0422\u0410 \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410",
    title: "\u0412\u044B\u0447\u0438\u0441\u043B\u0438 \u0434\u0438\u0441\u043A\u0440\u0438\u043C\u0438\u043D\u0430\u043D\u0442 2x\xB2 + 4x + 3 = 0",
    feedback: task.feedback,
    canCheck: val.trim() !== '' && !task.feedback,
    onCheck: check,
    onRetry: !task.out ? retry : undefined,
    onContinue: onAdvance,
    confettiLayer: layer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "th-formula",
    style: {
      maxWidth: 360,
      margin: '0 auto 28px',
      fontSize: 21
    }
  }, "\u0394 = b\xB2 \u2212 4ac"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      fontFamily: "'Geist Mono', monospace",
      fontSize: 22,
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u0394 ="), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    className: 'fb-input ' + state,
    placeholder: "?",
    value: val,
    disabled: !!task.feedback,
    onChange: e => {
      setVal(e.target.value);
      setState('');
    },
    onKeyDown: e => {
      if (e.key === 'Enter' && val.trim() && !task.feedback) check();
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 18,
      fontSize: 11,
      color: 'var(--ink-300)',
      letterSpacing: '.06em'
    }
  }, "ENTER \u2014 \u041F\u0420\u041E\u0412\u0415\u0420\u0418\u0422\u042C")));
}
Object.assign(window, {
  ExQuiz,
  ExInput
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "feedback/ex-quiz.jsx", error: String((e && e.message) || e) }); }

// feedback/shell.jsx
try { (() => {
/* ============================================================
   shell.jsx — рама задания, фидбек-щит, конфетти, полёт XP
   ============================================================ */

const FbIco = {
  X: ({
    s = 16
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })),
  Heart: ({
    s = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  })),
  Flame: ({
    s = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-2.5C9 9 9 11 11 11c-.5-2 1-3 1-5 0-2-1-3-1-3s1.5.5 1 4Zm-2 8.5C9 11 8 12.5 8 14a4 4 0 0 0 8 0c0-2-1.5-3-2.5-3-.5 1 .5 2-.5 3-.5.5-1 .5-1.5 0-1-1 0-2-1.5-3.5Z"
  })),
  Check: ({
    s = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m5 12 5 5L20 7"
  })),
  Cross: ({
    s = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })),
  Star: ({
    s = 12
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2.9 6.26L21.5 9.3l-4.75 4.4 1.15 6.55L12 17.1l-5.9 3.15 1.15-6.55L2.5 9.3l6.6-1.04L12 2z"
  }))
};

/* ---------- Конфетти ---------- */
const FB_CONFETTI_COLORS = ['var(--green-500)', 'var(--sun-400)', 'var(--coral-500)', 'var(--green-300)', 'var(--sun-300)'];
function FbConfettiBurst() {
  const playful = document.documentElement.dataset.motion === 'playful';
  const pieces = React.useMemo(() => Array.from({
    length: playful ? 60 : 36
  }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 220,
    color: FB_CONFETTI_COLORS[i % FB_CONFETTI_COLORS.length],
    shape: i % 3
  })), []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, pieces.map((p, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      left: p.left + '%',
      background: p.color,
      borderRadius: p.shape === 0 ? '2px' : p.shape === 1 ? '50%' : '0',
      animationDelay: p.delay + 'ms'
    }
  })));
}
function useFbConfetti(enabled) {
  const [bursts, setBursts] = React.useState([]);
  const fire = React.useCallback(() => {
    if (!enabled) return;
    const id = Math.random();
    setBursts(bs => [...bs, id]);
    setTimeout(() => setBursts(bs => bs.filter(b => b !== id)), 1700);
  }, [enabled]);
  const layer = /*#__PURE__*/React.createElement("div", {
    className: "fb-confetti"
  }, bursts.map(id => /*#__PURE__*/React.createElement(FbConfettiBurst, {
    key: id
  })));
  return {
    fire,
    layer
  };
}

/* ---------- Полёт XP в шапку ---------- */
function flyXP(fromEl, amount, onArrive) {
  const target = document.getElementById('xp-anchor');
  if (!fromEl || !target) {
    onArrive && onArrive();
    return;
  }
  const a = fromEl.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = 'fb-xp-flyer';
  el.textContent = '+' + amount + ' XP';
  el.style.left = a.left + a.width / 2 - 34 + 'px';
  el.style.top = a.top - 16 + 'px';
  document.body.appendChild(el);
  // force layout, then send it to the header counter
  el.getBoundingClientRect();
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top - 16 + el.offsetHeight / 2);
  el.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(0.55)';
  el.style.opacity = '0';
  setTimeout(() => {
    el.remove();
    onArrive && onArrive();
  }, 760);
}

/* ---------- Летящий клон (пропуски: слово → слот) ---------- */
function flyClone(fromEl, toEl, className, done) {
  if (!fromEl || !toEl) {
    done && done();
    return;
  }
  const a = fromEl.getBoundingClientRect();
  const b = toEl.getBoundingClientRect();
  const el = fromEl.cloneNode(true);
  el.classList.add('fb-flyer');
  if (className) el.classList.add(className);
  el.style.left = a.left + 'px';
  el.style.top = a.top + 'px';
  el.style.width = a.width + 'px';
  el.style.height = a.height + 'px';
  el.style.margin = '0';
  el.style.transition = 'transform .32s cubic-bezier(.3,.9,.4,1.1), opacity .32s';
  document.body.appendChild(el);
  el.getBoundingClientRect();
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const sc = Math.min(1, (b.width - 8) / a.width);
  el.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ')';
  setTimeout(() => {
    el.remove();
    done && done();
  }, 330);
}

/* ---------- Фидбек-щит ---------- */
function FbSheet({
  feedback,
  onContinue,
  onRetry
}) {
  const ok = feedback.kind === 'ok';
  const canRetry = !ok && !!onRetry;
  return /*#__PURE__*/React.createElement("div", {
    className: 'fb-bottom sheet ' + (ok ? 'ok' : 'no')
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-fb-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: 'fb-fb-icon ' + (ok ? 'ok' : 'no')
  }, ok ? /*#__PURE__*/React.createElement(FbIco.Check, null) : /*#__PURE__*/React.createElement(FbIco.Cross, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'fb-fb-text ' + (ok ? 'ok' : 'no')
  }, feedback.msg || (ok ? 'Отлично!' : canRetry ? 'Попробуй ещё раз' : 'Не совсем')), feedback.correct && !ok && !canRetry && /*#__PURE__*/React.createElement("div", {
    className: "fb-fb-sub"
  }, "\u041E\u0442\u0432\u0435\u0442: ", /*#__PURE__*/React.createElement("b", null, feedback.correct)), feedback.explain && /*#__PURE__*/React.createElement("div", {
    className: "fb-fb-sub"
  }, feedback.explain)), /*#__PURE__*/React.createElement("button", {
    className: 'gp-btn ' + (ok ? '' : 'coral'),
    onClick: canRetry ? onRetry : onContinue
  }, canRetry ? 'Ещё раз' : 'Дальше')));
}

/* ---------- Рама задания ---------- */
function FbShell({
  step,
  totalSteps,
  hearts,
  streak,
  lostHeart,
  eyebrow,
  title,
  children,
  feedback,
  canCheck,
  onCheck,
  onContinue,
  onRetry,
  checkLabel,
  onSkip,
  confettiLayer,
  instant,
  instantLabel
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "fb-shell"
  }, confettiLayer, /*#__PURE__*/React.createElement("div", {
    className: "fb-top"
  }, /*#__PURE__*/React.createElement("button", {
    className: "fb-close",
    "aria-label": "\u0412\u044B\u0439\u0442\u0438"
  }, /*#__PURE__*/React.createElement(FbIco.X, null)), /*#__PURE__*/React.createElement("div", {
    className: "fb-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fb-progress-fill",
    style: {
      width: step / totalSteps * 100 + '%'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "fb-stepnum"
  }, step, " / ", totalSteps), /*#__PURE__*/React.createElement("span", {
    className: "fb-streak"
  }, /*#__PURE__*/React.createElement(FbIco.Flame, null), " ", streak), hearts != null && /*#__PURE__*/React.createElement("span", {
    className: 'fb-hearts ' + (lostHeart ? 'loss' : '')
  }, /*#__PURE__*/React.createElement(FbIco.Heart, null), " ", hearts)), /*#__PURE__*/React.createElement("div", {
    className: "fb-body"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    className: "gp-title"
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, children)), feedback ? /*#__PURE__*/React.createElement(FbSheet, {
    feedback: feedback,
    onContinue: onContinue,
    onRetry: onRetry
  }) : /*#__PURE__*/React.createElement("div", {
    className: "fb-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "gp-btn ghost",
    onClick: onSkip
  }, "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C"), instant ? /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      marginLeft: 'auto',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '.08em',
      color: 'var(--ink-300)'
    }
  }, instantLabel || 'ПРОВЕРКА ПРОИСХОДИТ СРАЗУ') : /*#__PURE__*/React.createElement("button", {
    className: "gp-btn",
    style: {
      marginLeft: 'auto'
    },
    disabled: !canCheck,
    onClick: onCheck
  }, checkLabel || 'Проверить'))));
}

/* ---------- Хук: общая логика попыток/фидбека ---------- */
function useTaskState(maxHearts, onTaskEnd) {
  const [hearts, setHearts] = React.useState(maxHearts);
  const [lostHeart, setLostHeart] = React.useState(false);
  const [feedback, setFeedback] = React.useState(null);
  const win = (msg, explain) => {
    setFeedback({
      kind: 'ok',
      msg,
      explain
    });
    onTaskEnd && onTaskEnd(true);
  };
  const lose = (msgWrong, correctAnswer, explain) => {
    const left = hearts - 1;
    setHearts(left);
    setLostHeart(true);
    setTimeout(() => setLostHeart(false), 550);
    if (left <= 0) {
      setFeedback({
        kind: 'no',
        msg: 'Попытки закончились',
        correct: correctAnswer,
        explain
      });
      onTaskEnd && onTaskEnd(false);
      return false;
    }
    setFeedback({
      kind: 'no',
      msg: msgWrong || (left === 1 ? 'Не то. Осталась 1 попытка' : 'Не то. Осталось попыток: ' + left)
    });
    return true;
  };
  const clear = () => setFeedback(null);
  return {
    hearts,
    lostHeart,
    feedback,
    win,
    lose,
    clear,
    out: hearts <= 0
  };
}
Object.assign(window, {
  FbIco,
  FbShell,
  FbSheet,
  useFbConfetti,
  useTaskState,
  flyXP,
  flyClone
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "feedback/shell.jsx", error: String((e && e.message) || e) }); }

// feedback/theory.jsx
try { (() => {
/* ============================================================
   theory.jsx — страница теории с живым фидбеком:
   прогресс чтения, чекпоинты разделов, выделение текста маркером,
   подсказки-термины, спойлер, inline-проверка, завершение урока.
   ============================================================ */

const TH_SECTIONS = [{
  id: 's1',
  label: 'Зачем нужен Δ'
}, {
  id: 's2',
  label: 'Формула'
}, {
  id: 's3',
  label: 'Как читать знак'
}, {
  id: 's4',
  label: 'Частая ошибка'
}, {
  id: 's5',
  label: 'Проверь себя'
}];
function ThSpoiler({
  children
}) {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: 'th-spoiler' + (open ? ' open' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "veil",
    onClick: () => setOpen(true)
  }, /*#__PURE__*/React.createElement("span", null, "\u041F\u041E\u041A\u0410\u0417\u0410\u0422\u042C \u041F\u041E\u0414\u0421\u041A\u0410\u0417\u041A\u0423")), /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, children));
}
function ThMiniQuiz() {
  const [pick, setPick] = React.useState(null);
  const correct = 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--ink-100)',
      borderRadius: 18,
      padding: '20px 22px',
      margin: '0 0 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, "\u0411\u042B\u0421\u0422\u0420\u0410\u042F \u041F\u0420\u041E\u0412\u0415\u0420\u041A\u0410"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 700,
      fontSize: 15.5,
      margin: '0 0 12px',
      color: 'var(--ink-900)'
    }
  }, "\u041C\u043E\u0436\u0435\u0442 \u043B\u0438 \u0443 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044F \u0441 \u0394 < 0 \u0431\u044B\u0442\u044C \u0434\u0432\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043A\u043E\u0440\u043D\u044F?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, ['Да', 'Нет'].map((opt, i) => {
    const cls = pick === null ? '' : i === correct ? pick === i ? 'correct' : '' : pick === i ? 'wrong' : '';
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: 'gp-tile ' + cls,
      style: {
        flex: 1,
        textAlign: 'center',
        padding: '12px 16px'
      },
      onClick: () => setPick(i)
    }, opt, pick !== null && pick === i && i === correct && /*#__PURE__*/React.createElement("span", {
      className: "tile-chip ok"
    }, "\u0412\u0415\u0420\u041D\u041E"), pick !== null && pick === i && i !== correct && /*#__PURE__*/React.createElement("span", {
      className: "tile-chip no"
    }, "\u041C\u0418\u041C\u041E"));
  })), pick !== null && /*#__PURE__*/React.createElement("p", {
    className: "mono",
    style: {
      margin: '12px 0 0',
      fontSize: 11,
      color: pick === correct ? 'var(--green-700)' : 'var(--ink-400)',
      letterSpacing: '.04em'
    }
  }, pick === correct ? 'ИМЕННО: Δ < 0 — КОРНЕЙ НЕТ' : 'НЕТ: ПРИ Δ < 0 КОРНЕЙ НЕ БЫВАЕТ. НАЖМИ «НЕТ»'));
}
function Theory({
  onAdvance,
  reward,
  confettiEnabled
}) {
  const [progress, setProgress] = React.useState(0);
  const [read, setRead] = React.useState({});
  const [active, setActive] = React.useState('s1');
  const [selTool, setSelTool] = React.useState(null); // {x, y}
  const [copied, setCopied] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const {
    fire,
    layer
  } = useFbConfetti(confettiEnabled);
  const contentRef = React.useRef(null);
  const sectionRefs = React.useRef({});
  const doneBtnRef = React.useRef(null);

  /* прогресс чтения + чекпоинты разделов */
  React.useEffect(() => {
    const onScroll = () => {
      const c = contentRef.current;
      if (!c) return;
      const r = c.getBoundingClientRect();
      const vh = window.innerHeight;
      setProgress(Math.max(0, Math.min(1, (vh * 0.8 - r.top) / r.height)));
      const line = vh * 0.55;
      let act = 's1';
      const newRead = {};
      TH_SECTIONS.forEach(({
        id
      }) => {
        const el = sectionRefs.current[id];
        if (!el) return;
        const sr = el.getBoundingClientRect();
        if (sr.bottom < line) newRead[id] = true;
        if (sr.top < line) act = id;
      });
      setRead(prev => ({
        ...prev,
        ...newRead
      }));
      setActive(act);
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* выделение текста → плавающий тулбар */
  const onMouseUp = () => {
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !contentRef.current) {
        setSelTool(null);
        return;
      }
      if (!contentRef.current.contains(sel.anchorNode)) {
        setSelTool(null);
        return;
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      const wrap = contentRef.current.getBoundingClientRect();
      setSelTool({
        x: rect.left + rect.width / 2 - wrap.left,
        y: rect.top - wrap.top - 44
      });
    }, 0);
  };
  const doHighlight = () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      setSelTool(null);
      return;
    }
    try {
      const range = sel.getRangeAt(0);
      const span = document.createElement('span');
      span.className = 'th-hl';
      span.title = 'Нажми, чтобы убрать выделение';
      range.surroundContents(span);
    } catch (e) {/* выделение через границы элементов — пропускаем */}
    sel.removeAllRanges();
    setSelTool(null);
  };
  const doCopy = () => {
    const sel = window.getSelection();
    if (sel) {
      try {
        navigator.clipboard.writeText(sel.toString());
      } catch (e) {}
    }
    sel && sel.removeAllRanges();
    setSelTool(null);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  const onContentClick = e => {
    if (e.target.classList && e.target.classList.contains('th-hl')) {
      const span = e.target;
      span.replaceWith(...span.childNodes);
    }
  };
  const complete = () => {
    if (done) return;
    setDone(true);
    fire();
    reward(doneBtnRef.current);
  };
  const goTo = id => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  };
  const readCount = Object.keys(read).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, layer, /*#__PURE__*/React.createElement("div", {
    className: "th-readbar",
    "data-comment-anchor": "theory-readbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fill",
    style: {
      width: progress * 100 + '%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "th-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "th-content",
    ref: contentRef,
    onMouseUp: onMouseUp,
    onClick: onContentClick,
    style: {
      position: 'relative'
    },
    "data-screen-label": "\u0422\u0435\u043E\u0440\u0438\u044F"
  }, selTool && /*#__PURE__*/React.createElement("div", {
    className: "th-seltool",
    style: {
      left: Math.max(60, selTool.x) - 60,
      top: selTool.y
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: doHighlight
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      background: 'var(--sun-300)',
      borderRadius: 3,
      display: 'inline-block'
    }
  }), "\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u044C"), /*#__PURE__*/React.createElement("button", {
    onClick: doCopy
  }, "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C")), copied && /*#__PURE__*/React.createElement("div", {
    className: "th-seltool",
    style: {
      position: 'fixed',
      left: '50%',
      bottom: 90,
      top: 'auto',
      transform: 'translateX(-50%)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      cursor: 'default'
    }
  }, "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u2713")), /*#__PURE__*/React.createElement("section", {
    ref: el => {
      sectionRefs.current.s1 = el;
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gp-eyebrow"
  }, "\u0423\u0420\u041E\u041A 6 / 9 \xB7 \u0410\u041B\u0413\u0415\u0411\u0420\u0410 \xB7 4 \u041C\u0418\u041D"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 38,
      fontWeight: 800,
      letterSpacing: '-0.025em',
      margin: '0 0 16px',
      lineHeight: 1.08
    }
  }, "\u0414\u0438\u0441\u043A\u0440\u0438\u043C\u0438\u043D\u0430\u043D\u0442"), /*#__PURE__*/React.createElement("p", null, "\u041F\u0440\u0435\u0436\u0434\u0435 \u0447\u0435\u043C \u0440\u0435\u0448\u0430\u0442\u044C \u043A\u0432\u0430\u0434\u0440\u0430\u0442\u043D\u043E\u0435 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435, \u043F\u043E\u043B\u0435\u0437\u043D\u043E \u0443\u0437\u043D\u0430\u0442\u044C, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0443 \u043D\u0435\u0433\u043E \u0432\u043E\u043E\u0431\u0449\u0435 \u043A\u043E\u0440\u043D\u0435\u0439. \u0414\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u0435\u0441\u0442\u044C ", /*#__PURE__*/React.createElement("span", {
    className: "th-term"
  }, "\u0434\u0438\u0441\u043A\u0440\u0438\u043C\u0438\u043D\u0430\u043D\u0442", /*#__PURE__*/React.createElement("span", {
    className: "tip"
  }, "\u0427\u0438\u0441\u043B\u043E \u0394, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043A\u043E\u0440\u043D\u0435\u0439 \u043A\u0432\u0430\u0434\u0440\u0430\u0442\u043D\u043E\u0433\u043E \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044F")), " \u2014 \u043E\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u043D\u0430 \u044D\u0442\u043E\u0442 \u0432\u043E\u043F\u0440\u043E\u0441 \u0434\u043E \u0432\u0441\u044F\u043A\u0438\u0445 \u0432\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0439 \u043A\u043E\u0440\u043D\u0435\u0439."), /*#__PURE__*/React.createElement("p", null, "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439 \u0432\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u043B\u044E\u0431\u0443\u044E \u0444\u0440\u0430\u0437\u0443 \u0432 \u044D\u0442\u043E\u043C \u0442\u0435\u043A\u0441\u0442\u0435 \u2014 \u0435\u0451 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u0434\u0441\u0432\u0435\u0442\u0438\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0440\u043E\u043C \u0438\u043B\u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C. \u041F\u043E\u0434\u0447\u0451\u0440\u043A\u043D\u0443\u0442\u044B\u0435 \u0442\u0435\u0440\u043C\u0438\u043D\u044B \u0440\u0430\u0441\u043A\u0440\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u043F\u043E \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u044E.")), /*#__PURE__*/React.createElement("section", {
    ref: el => {
      sectionRefs.current.s2 = el;
    }
  }, /*#__PURE__*/React.createElement("h2", null, "\u0424\u043E\u0440\u043C\u0443\u043B\u0430"), /*#__PURE__*/React.createElement("div", {
    className: "th-formula"
  }, "\u0394 = b\xB2 \u2212 4ac"), /*#__PURE__*/React.createElement("p", null, "\u0417\u0434\u0435\u0441\u044C ", /*#__PURE__*/React.createElement("b", null, "a"), ", ", /*#__PURE__*/React.createElement("b", null, "b"), " \u0438 ", /*#__PURE__*/React.createElement("b", null, "c"), " \u2014 \u043A\u043E\u044D\u0444\u0444\u0438\u0446\u0438\u0435\u043D\u0442\u044B \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044F", /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      background: 'var(--ink-50)',
      padding: '2px 6px',
      borderRadius: 4,
      margin: '0 4px',
      fontSize: '0.9em'
    }
  }, "ax\xB2 + bx + c = 0"), ". \u0421\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u0437\u0430 \u043E\u0434\u0438\u043D \u0448\u0430\u0433, \u0430 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0442 \u0434\u0435\u0441\u044F\u0442\u044C.")), /*#__PURE__*/React.createElement("section", {
    ref: el => {
      sectionRefs.current.s3 = el;
    }
  }, /*#__PURE__*/React.createElement("h2", null, "\u041A\u0430\u043A \u0447\u0438\u0442\u0430\u0442\u044C \u0437\u043D\u0430\u043A"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      margin: '0 0 18px'
    }
  }, [{
    sign: 'Δ > 0',
    text: 'два различных корня',
    color: 'var(--green-700)'
  }, {
    sign: 'Δ = 0',
    text: 'один повторяющийся корень',
    color: 'var(--sun-700)'
  }, {
    sign: 'Δ < 0',
    text: 'действительных корней нет',
    color: 'var(--coral-700)'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '110px 1fr',
      gap: 16,
      alignItems: 'center',
      padding: '13px 16px',
      borderRadius: 14,
      background: 'var(--paper-2)',
      border: '1px solid var(--ink-100)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: r.color
    }
  }, r.sign), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, r.text))))), /*#__PURE__*/React.createElement("section", {
    ref: el => {
      sectionRefs.current.s4 = el;
    }
  }, /*#__PURE__*/React.createElement("h2", null, "\u0427\u0430\u0441\u0442\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430"), /*#__PURE__*/React.createElement("p", null, "\u0421\u0430\u043C\u043E\u0435 \u0443\u044F\u0437\u0432\u0438\u043C\u043E\u0435 \u043C\u0435\u0441\u0442\u043E \u2014 \u0437\u043D\u0430\u043A ", /*#__PURE__*/React.createElement("b", null, "c"), ". \u041F\u043E\u0442\u0435\u0440\u044F\u0435\u0448\u044C \u043C\u0438\u043D\u0443\u0441 \u2014 \u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430 \u043F\u0435\u0440\u0435\u0432\u0435\u0440\u043D\u0451\u0442\u0441\u044F. \u0415\u0441\u043B\u0438 \u0441\u043E\u043C\u043D\u0435\u0432\u0430\u0435\u0448\u044C\u0441\u044F, \u0440\u0430\u0441\u043A\u0440\u043E\u0439 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0443:"), /*#__PURE__*/React.createElement(ThSpoiler, null, "\u041F\u043E\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0439 \u043A\u043E\u044D\u0444\u0444\u0438\u0446\u0438\u0435\u043D\u0442\u044B \u0432 \u0441\u043A\u043E\u0431\u043A\u0430\u0445: \u0394 = b\xB2 \u2212 4\xB7a\xB7(c). \u0414\u043B\u044F 2x\xB2 + 4x \u2212 3 = 0 \u044D\u0442\u043E \u0394 = 16 \u2212 4\xB72\xB7(\u22123) = 16 + 24 = 40 \u2014 \u043C\u0438\u043D\u0443\u0441 \u043D\u0430 \u043C\u0438\u043D\u0443\u0441 \u0434\u0430\u043B \u043F\u043B\u044E\u0441.")), /*#__PURE__*/React.createElement("section", {
    ref: el => {
      sectionRefs.current.s5 = el;
    }
  }, /*#__PURE__*/React.createElement("h2", null, "\u041F\u0440\u043E\u0432\u0435\u0440\u044C \u0441\u0435\u0431\u044F"), /*#__PURE__*/React.createElement(ThMiniQuiz, null)), /*#__PURE__*/React.createElement("div", {
    className: 'th-foot' + (done ? ' donestate' : '')
  }, /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, "\u041F\u0420\u041E\u0427\u0418\u0422\u0410\u041D\u041E ", /*#__PURE__*/React.createElement("b", null, Math.round(progress * 100), "%"), " \xB7 \u0420\u0410\u0417\u0414\u0415\u041B\u041E\u0412 ", readCount, " / ", TH_SECTIONS.length), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, done ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--green-700)'
    }
  }, "\u2713 \u0423\u0420\u041E\u041A \u0417\u0410\u0412\u0415\u0420\u0428\u0401\u041D"), /*#__PURE__*/React.createElement("button", {
    className: "gp-btn",
    onClick: onAdvance
  }, "\u041A \u0437\u0430\u0434\u0430\u043D\u0438\u044F\u043C \u2192")) : /*#__PURE__*/React.createElement("button", {
    ref: doneBtnRef,
    className: "gp-btn",
    onClick: complete
  }, "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0443\u0440\u043E\u043A")))), /*#__PURE__*/React.createElement("aside", {
    className: "th-rail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "th-rail-title"
  }, "\u0420\u0430\u0437\u0434\u0435\u043B\u044B"), TH_SECTIONS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: 'th-rail-item' + (read[s.id] || done ? ' read' : '') + (active === s.id ? ' active' : ''),
    onClick: () => goTo(s.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, read[s.id] || done ? '✓' : ''), s.label)), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 18,
      fontSize: 10,
      color: 'var(--ink-300)',
      letterSpacing: '.06em',
      lineHeight: 1.8
    }
  }, "\u0413\u0410\u041B\u041E\u0427\u041A\u0418 \u0421\u0422\u0410\u0412\u042F\u0422\u0421\u042F \u0421\u0410\u041C\u0418,", /*#__PURE__*/React.createElement("br", null), "\u041F\u041E \u041C\u0415\u0420\u0415 \u041F\u0420\u041E\u041A\u0420\u0423\u0422\u041A\u0418"))));
}
Object.assign(window, {
  Theory
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "feedback/theory.jsx", error: String((e && e.message) || e) }); }

// feedback/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "feedback/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lms_app/Admin.jsx
try { (() => {
/* ============================================================
   Admin · KPI strip + students table (teacher / admin view)
   ============================================================ */

const Admin = ({
  onNav
}) => {
  const [range, setRange] = React.useState('7d');
  const kpis = [{
    lbl: 'Active students',
    v: '286',
    delta: '+12',
    tone: 'green',
    icon: 'users'
  }, {
    lbl: 'Courses live',
    v: '24',
    delta: '+2',
    tone: 'sun',
    icon: 'book'
  }, {
    lbl: 'Completion rate',
    v: '74%',
    delta: '+6pp',
    tone: 'green',
    icon: 'check_circ'
  }, {
    lbl: 'Avg score',
    v: '82%',
    delta: '−1pp',
    tone: 'coral',
    icon: 'pencil',
    down: true
  }, {
    lbl: 'Revenue · MTD',
    v: '$2,140',
    delta: '+18%',
    tone: 'ink',
    icon: 'star'
  }];
  const students = [{
    name: 'Anna P.',
    grade: '9th',
    xp: 2840,
    courses: 4,
    last: '14 min ago',
    score: 87,
    status: 'active'
  }, {
    name: 'Marco S.',
    grade: '9th',
    xp: 3120,
    courses: 3,
    last: '1 h ago',
    score: 91,
    status: 'active'
  }, {
    name: 'Sofia R.',
    grade: '10th',
    xp: 1980,
    courses: 5,
    last: 'yesterday',
    score: 78,
    status: 'active'
  }, {
    name: 'James K.',
    grade: '11th',
    xp: 4220,
    courses: 2,
    last: '2 days ago',
    score: 94,
    status: 'review'
  }, {
    name: 'Priya G.',
    grade: '9th',
    xp: 1240,
    courses: 3,
    last: '5 days ago',
    score: 62,
    status: 'risk'
  }, {
    name: 'Lukas H.',
    grade: '10th',
    xp: 2640,
    courses: 4,
    last: '38 min ago',
    score: 81,
    status: 'active'
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement(Crumbs, {
    trail: ['School'],
    current: "Admin \xB7 Overview"
  }), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 13
    })
  }, "Alerts (3)"), /*#__PURE__*/React.createElement(Avatar, {
    initials: "MR",
    tone: "ink",
    size: "md"
  })), /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "mono-eb",
    style: {
      color: 'var(--green-700)',
      margin: '0 0 8px'
    }
  }, "OVERVIEW \xB7 GRASS PREP MX"), /*#__PURE__*/React.createElement("h1", null, "Your school is ", /*#__PURE__*/React.createElement("em", null, "on track")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "5 of 6 cohorts on pace \xB7 2 students need a check-in this week.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      background: 'var(--ink-50)',
      padding: 4,
      borderRadius: 12
    }
  }, ['24h', '7d', '30d', '90d'].map(r => /*#__PURE__*/React.createElement("span", {
    key: r,
    onClick: () => setRange(r),
    className: "mono",
    style: {
      padding: '6px 12px',
      borderRadius: 8,
      cursor: 'pointer',
      background: range === r ? 'var(--ink-900)' : 'transparent',
      color: range === r ? '#fff' : 'var(--ink-500)',
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, r)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 14
    }
  }, kpis.map(k => /*#__PURE__*/React.createElement(Card, {
    key: k.lbl,
    style: {
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono-eb"
  }, k.lbl), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 7,
      display: 'grid',
      placeItems: 'center',
      background: k.tone === 'green' ? 'var(--green-50)' : k.tone === 'sun' ? 'var(--sun-50)' : k.tone === 'coral' ? 'var(--coral-50)' : 'var(--ink-50)',
      color: k.tone === 'green' ? 'var(--green-700)' : k.tone === 'sun' ? 'var(--sun-700)' : k.tone === 'coral' ? 'var(--coral-700)' : 'var(--ink-700)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: k.icon,
    size: 13
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1
    }
  }, k.v), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: k.down ? 'var(--coral-700)' : 'var(--green-700)'
    }
  }, k.delta), /*#__PURE__*/React.createElement(Sparkline, {
    tone: k.tone,
    down: k.down
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(PanelHead, {
    title: "Engagement \xB7 last 7 days",
    action: "Open analytics \u2192"
  }), /*#__PURE__*/React.createElement(SignupChart, null)), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(PanelHead, {
    title: "System status"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [['API', 'green', 'Operational', '120ms'], ['Database', 'green', 'Operational', '8 conn'], ['Sandbox', 'green', 'Operational', '14 active'], ['AI tutor', 'sun', 'Degraded', '1.4s avg']].map(([n, t, l, m]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 999,
      background: t === 'green' ? 'var(--green-500)' : t === 'sun' ? 'var(--sun-500)' : 'var(--coral-500)',
      boxShadow: t === 'green' ? '0 0 0 3px var(--green-100)' : '0 0 0 3px var(--sun-50)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      fontWeight: 700
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: t === 'green' ? 'var(--green-700)' : 'var(--sun-700)'
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--ink-400)'
    }
  }, m)))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 17,
      fontWeight: 800
    }
  }, "Students"), /*#__PURE__*/React.createElement("p", {
    className: "mono",
    style: {
      margin: '4px 0 0',
      fontSize: 11,
      color: 'var(--ink-400)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, "286 ACTIVE \xB7 12 NEED REVIEW")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 12
    })
  }, "Filter"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 12
    })
  }, "Add students"))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--ink-50)',
      borderTop: '1px solid var(--ink-100)'
    }
  }, ['Student', 'Grade', 'XP', 'Courses', 'Last seen', 'Avg', 'Status'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    className: "mono",
    style: {
      padding: '12px 20px',
      textAlign: 'left',
      fontSize: 10,
      fontWeight: 600,
      color: 'var(--ink-500)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, students.map((s, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderTop: '1px solid var(--ink-100)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: s.name.split(' ').map(x => x[0]).join(''),
    tone: ['green', 'sun', 'coral', 'ink'][i % 4],
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 13
    }
  }, s.name))), /*#__PURE__*/React.createElement("td", {
    className: "mono",
    style: {
      padding: '14px 20px',
      fontSize: 12,
      color: 'var(--ink-500)'
    }
  }, s.grade), /*#__PURE__*/React.createElement("td", {
    className: "mono",
    style: {
      padding: '14px 20px',
      fontSize: 12,
      color: 'var(--ink-900)',
      fontWeight: 700
    }
  }, s.xp.toLocaleString()), /*#__PURE__*/React.createElement("td", {
    className: "mono",
    style: {
      padding: '14px 20px',
      fontSize: 12,
      color: 'var(--ink-500)'
    }
  }, s.courses), /*#__PURE__*/React.createElement("td", {
    className: "mono",
    style: {
      padding: '14px 20px',
      fontSize: 12,
      color: 'var(--ink-500)'
    }
  }, s.last), /*#__PURE__*/React.createElement("td", {
    className: "mono",
    style: {
      padding: '14px 20px',
      fontSize: 12,
      color: s.score >= 80 ? 'var(--green-700)' : s.score >= 70 ? 'var(--sun-700)' : 'var(--coral-700)',
      fontWeight: 700
    }
  }, s.score, "%"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 20px'
    }
  }, s.status === 'active' && /*#__PURE__*/React.createElement(Chip, {
    tone: "green",
    mono: true
  }, "Active"), s.status === 'review' && /*#__PURE__*/React.createElement(Chip, {
    tone: "sun",
    mono: true
  }, "Review"), s.status === 'risk' && /*#__PURE__*/React.createElement(Chip, {
    tone: "coral",
    mono: true
  }, "At risk")))))))));
};
const Sparkline = ({
  tone = 'green',
  down = false
}) => {
  const color = tone === 'green' ? '#0a8754' : tone === 'sun' ? '#f5b800' : tone === 'coral' ? '#ff7a5c' : '#1a2a1f';
  const pts = down ? '0,10 10,8 20,12 30,14 40,11 50,16 60,18' : '0,18 10,14 20,16 30,10 40,12 50,6 60,8';
  return /*#__PURE__*/React.createElement("svg", {
    width: "60",
    height: "22",
    viewBox: "0 0 60 22",
    fill: "none"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: pts,
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const SignupChart = () => {
  const data = [42, 56, 38, 64, 78, 52, 88];
  const max = 100;
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      height: 180,
      paddingBottom: 24,
      position: 'relative'
    }
  }, data.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--green-700)'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: `${v / max * 130}px`,
      background: 'linear-gradient(180deg, var(--green-400), var(--green-600))',
      borderRadius: '10px 10px 4px 4px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      position: 'absolute',
      bottom: 0,
      fontSize: 10,
      color: 'var(--ink-400)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, labels[i]))));
};
window.Admin = Admin;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lms_app/Admin.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lms_app/Catalog.jsx
try { (() => {
/* ============================================================
   Catalog screen — Find courses · 3-col grid + filters
   ============================================================ */

const Catalog = ({
  onNav
}) => {
  const [filters, setFilters] = React.useState({
    level: 'All',
    subjects: new Set(['math', 'code'])
  });
  const [q, setQ] = React.useState('');
  const subjects = [{
    id: 'math',
    label: 'Mathematics',
    count: 84
  }, {
    id: 'code',
    label: 'Programming',
    count: 56
  }, {
    id: 'sat',
    label: 'SAT prep',
    count: 12
  }, {
    id: 'lang',
    label: 'Languages',
    count: 38
  }, {
    id: 'sci',
    label: 'Science',
    count: 22
  }, {
    id: 'soft',
    label: 'Soft skills',
    count: 14
  }];
  const courses = [{
    id: 1,
    title: 'Algebra Foundations',
    subject: 'Math · 9th',
    cover: 'cover-algebra',
    glyph: 'Σ',
    meta: '24 LESSONS',
    enrolled: 62,
    status: 'enrolled'
  }, {
    id: 2,
    title: 'JavaScript Essentials',
    subject: 'CS · self-paced',
    cover: 'cover-code',
    glyph: '</>',
    meta: '18 LESSONS',
    enrolled: 28,
    status: 'enrolled'
  }, {
    id: 3,
    title: 'Spanish A1 → A2',
    subject: 'Languages',
    cover: 'cover-lang',
    glyph: 'Ñ',
    meta: '32 LESSONS',
    enrolled: 85,
    status: 'enrolled'
  }, {
    id: 4,
    title: 'SAT Math · Full Prep',
    subject: 'SAT',
    cover: 'cover-sat',
    glyph: '★',
    meta: '40 LESSONS',
    enrolled: 42,
    status: 'enrolled'
  }, {
    id: 5,
    title: 'Geometry · Visual',
    subject: 'Math · 10th',
    cover: 'cover-algebra',
    glyph: '△',
    meta: '28 LESSONS',
    status: 'new'
  }, {
    id: 6,
    title: 'Python for Beginners',
    subject: 'CS · intro',
    cover: 'cover-code',
    glyph: '🐍',
    meta: '22 LESSONS',
    status: 'available'
  }, {
    id: 7,
    title: 'AP Computer Science',
    subject: 'CS · advanced',
    cover: 'cover-code',
    glyph: '{}',
    meta: '64 LESSONS',
    status: 'available'
  }, {
    id: 8,
    title: 'Pre-Calculus',
    subject: 'Math · 11th',
    cover: 'cover-algebra',
    glyph: '∫',
    meta: '36 LESSONS',
    status: 'available'
  }, {
    id: 9,
    title: 'French · A1',
    subject: 'Languages',
    cover: 'cover-lang',
    glyph: 'Ç',
    meta: '30 LESSONS',
    status: 'new'
  }];
  const toggle = id => {
    const next = new Set(filters.subjects);
    next.has(id) ? next.delete(id) : next.add(id);
    setFilters({
      ...filters,
      subjects: next
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement(Crumbs, {
    trail: ['Learn'],
    current: "Courses"
  }), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement(StreakPill, {
    days: 7
  }), /*#__PURE__*/React.createElement(XpToken, {
    amount: 2840
  }), /*#__PURE__*/React.createElement(Avatar, {
    initials: "AP",
    tone: "green",
    size: "md"
  }))), /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "mono-eb",
    style: {
      color: 'var(--green-700)',
      margin: '0 0 8px'
    }
  }, "BROWSE \xB7 324 COURSES"), /*#__PURE__*/React.createElement("h1", null, "Find your ", /*#__PURE__*/React.createElement("em", null, "subject")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "Programming, math, languages, SAT prep \u2014 every course your school has subscribed you to.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "list",
      size: 14
    })
  }, "Sort: newest"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    })
  }, "Request a course"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '240px 1fr',
      gap: 32,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      position: 'sticky',
      top: 80,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 800
    }
  }, "Filters"), /*#__PURE__*/React.createElement("a", {
    className: "mono",
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--coral-700)',
      cursor: 'pointer'
    }
  }, "Clear all")), /*#__PURE__*/React.createElement("div", {
    className: "mono-eb",
    style: {
      marginBottom: 8
    }
  }, "Subject"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 16,
      paddingBottom: 16,
      borderBottom: '1px solid var(--ink-100)'
    }
  }, subjects.map(s => {
    const on = filters.subjects.has(s.id);
    return /*#__PURE__*/React.createElement("label", {
      key: s.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: 5,
        background: on ? 'var(--green-600)' : '#fff',
        border: on ? 'none' : '2px solid var(--ink-200)',
        display: 'grid',
        placeItems: 'center',
        color: '#fff',
        fontSize: 10,
        lineHeight: 1,
        flex: 'none'
      },
      onClick: () => toggle(s.id)
    }, on && '✓'), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        color: 'var(--ink-700)'
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 10,
        color: 'var(--ink-400)'
      }
    }, s.count));
  })), /*#__PURE__*/React.createElement("div", {
    className: "mono-eb",
    style: {
      marginBottom: 8
    }
  }, "Level"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginBottom: 16,
      paddingBottom: 16,
      borderBottom: '1px solid var(--ink-100)'
    }
  }, ['All', 'Beginner', 'Intermediate', 'Advanced'].map(lv => /*#__PURE__*/React.createElement("span", {
    key: lv,
    className: `chip ${filters.level === lv ? 'solid-g' : 'ink'}`,
    style: {
      cursor: 'pointer'
    },
    onClick: () => setFilters({
      ...filters,
      level: lv
    })
  }, lv))), /*#__PURE__*/React.createElement("div", {
    className: "mono-eb",
    style: {
      marginBottom: 8
    }
  }, "Status"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, ['Enrolled', 'Not started', 'Completed'].map(s => /*#__PURE__*/React.createElement("label", {
    key: s,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 13,
      color: 'var(--ink-700)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: 999,
      border: '2px solid var(--ink-200)'
    }
  }), s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-bar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    style: {
      color: 'var(--ink-400)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search courses, teachers, topics\u2026",
    value: q,
    onChange: e => setQ(e.target.value)
  }), /*#__PURE__*/React.createElement("span", {
    className: "kbd"
  }, "\u2318K")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14
    }
  }, courses.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ccard",
    key: c.id,
    onClick: () => onNav('lesson')
  }, /*#__PURE__*/React.createElement("div", {
    className: `cover ${c.cover}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "glyph"
  }, c.glyph), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, c.meta)), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("h4", null, c.title), c.status === 'new' && /*#__PURE__*/React.createElement(Chip, {
    tone: "sun",
    mono: true
  }, "NEW")), /*#__PURE__*/React.createElement("p", {
    className: "nx"
  }, c.subject), c.status === 'enrolled' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgressBar, {
    value: c.enrolled,
    height: 6
  }), /*#__PURE__*/React.createElement("div", {
    className: "pct-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Progress"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, c.enrolled, "%"))) : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    style: {
      width: '100%',
      justifyContent: 'center',
      marginTop: 4
    }
  }, c.status === 'new' ? 'Start now →' : 'Enroll →'))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--ink-400)'
    }
  }, "Prev"), [1, 2, 3, 4].map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    className: "mono",
    style: {
      width: 28,
      height: 28,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 700,
      cursor: 'pointer',
      background: n === 1 ? 'var(--green-600)' : 'transparent',
      color: n === 1 ? '#fff' : 'var(--ink-500)'
    }
  }, n)), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--ink-400)'
    }
  }, "\u2026 27"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--ink-900)',
      fontWeight: 700,
      marginLeft: 4
    }
  }, "Next \u2192"))))));
};
window.Catalog = Catalog;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lms_app/Catalog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lms_app/Dashboard.jsx
try { (() => {
/* ============================================================
   Dashboard screen — the home view
   ============================================================ */

const Dashboard = ({
  onNav
}) => {
  const courses = [{
    id: 'algebra',
    title: 'The discriminant formula',
    meta: '9TH · ALGEBRA',
    cover: 'cover-algebra',
    glyph: 'x²',
    next: 'Module 3 · Lesson 7 of 14',
    pct: 32
  }, {
    id: 'js',
    title: 'JavaScript Basics',
    meta: 'SELF-PACED · 4 WEEKS',
    cover: 'cover-code',
    glyph: '</>',
    next: 'Functions and scope',
    pct: 48
  }, {
    id: 'spanish',
    title: 'Spanish · A2 elementary',
    meta: 'A2 · ELECTIVE',
    cover: 'cover-lang',
    glyph: '¡!',
    next: 'Hablando de la familia',
    pct: 12
  }, {
    id: 'sat',
    title: 'SAT Math · Practice 4',
    meta: 'PREP · DEC EXAM',
    cover: 'cover-sat',
    glyph: '★',
    next: 'Due tomorrow',
    pct: 0,
    urgent: true
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Topbar, null), /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, /*#__PURE__*/React.createElement(Hero, {
    onContinue: () => onNav('lesson'),
    onCatalog: () => onNav('catalog')
  }), /*#__PURE__*/React.createElement(StatsRow, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.7fr 1fr',
      gap: 24,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(PanelHead, {
    title: "Continue where you left off",
    action: "All courses \u2192",
    onAction: () => onNav('catalog')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, courses.map(c => /*#__PURE__*/React.createElement("div", {
    className: "ccard",
    key: c.id,
    onClick: () => onNav('lesson')
  }, /*#__PURE__*/React.createElement("div", {
    className: `cover ${c.cover}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "glyph"
  }, c.glyph), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, c.meta)), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("h4", null, c.title), /*#__PURE__*/React.createElement("p", {
    className: "nx"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.urgent ? 'clock' : 'play',
    size: 11,
    style: {
      color: c.urgent ? 'var(--coral-500)' : 'var(--green-600)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: c.urgent ? {
      color: 'var(--coral-700)',
      fontWeight: 700
    } : {}
  }, c.next)), /*#__PURE__*/React.createElement(ProgressBar, {
    value: c.pct,
    tone: c.urgent ? 'coral' : 'green',
    height: 6
  }), /*#__PURE__*/React.createElement("div", {
    className: "pct-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Progress"), /*#__PURE__*/React.createElement("span", {
    className: "v",
    style: c.urgent ? {
      color: 'var(--coral-700)'
    } : {}
  }, c.pct, "%"))))))), /*#__PURE__*/React.createElement(TodaysTasks, null)), /*#__PURE__*/React.createElement(ActivityTimeline, null)));
};
const Topbar = () => /*#__PURE__*/React.createElement("div", {
  className: "topbar"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "arrow_left",
  size: 16,
  style: {
    color: 'var(--ink-400)',
    cursor: 'pointer'
  }
}), /*#__PURE__*/React.createElement(Crumbs, {
  trail: ['Learn'],
  current: "Dashboard"
}), /*#__PURE__*/React.createElement("div", {
  className: "spacer"
}), /*#__PURE__*/React.createElement("div", {
  className: "actions"
}, /*#__PURE__*/React.createElement(StreakPill, {
  days: 7
}), /*#__PURE__*/React.createElement(XpToken, {
  amount: 2840
}), /*#__PURE__*/React.createElement(Avatar, {
  initials: "AP",
  tone: "green",
  size: "md"
})));
const Hero = ({
  onContinue,
  onCatalog
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: 24
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    background: 'linear-gradient(135deg, var(--green-600), var(--green-800))',
    borderRadius: 'var(--radius-xl)',
    padding: '32px 36px',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement("p", {
  className: "mono-eb",
  style: {
    color: 'rgba(255,255,255,0.7)',
    margin: '0 0 14px'
  }
}, "TODAY \xB7 MONDAY MAY 4 \xB7 9:14"), /*#__PURE__*/React.createElement("h2", {
  style: {
    fontSize: 36,
    fontWeight: 800,
    letterSpacing: '-0.025em',
    lineHeight: 1.08,
    margin: '0 0 12px',
    maxWidth: 460
  }
}, "\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u0441\u0442\u0430\u0440\u0442\u0443,", /*#__PURE__*/React.createElement("br", null), "\u0441\u0435\u0433\u043E\u0434\u043D\u044F \u043F\u043E \u043F\u043B\u0430\u043D\u0443 \u2014 ", /*#__PURE__*/React.createElement("em", {
  style: {
    fontStyle: 'normal',
    background: 'var(--sun-300)',
    color: 'var(--ink-900)',
    padding: '0 10px',
    borderRadius: 10,
    display: 'inline-block',
    transform: 'rotate(-1.5deg)'
  }
}, "3 \u0443\u0440\u043E\u043A\u0430"), "."), /*#__PURE__*/React.createElement("p", {
  style: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    lineHeight: 1.55,
    margin: '0 0 20px',
    maxWidth: 480
  }
}, "Continue with the discriminant from yesterday. Should take about 12 minutes \u2014 then JavaScript and Spanish."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 10
  }
}, /*#__PURE__*/React.createElement(Button, {
  variant: "sun",
  onClick: onContinue,
  leading: /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 14
  })
}, "Continue lesson"), /*#__PURE__*/React.createElement(Button, {
  variant: "ghost",
  onClick: onCatalog,
  style: {
    color: '#fff'
  }
}, "Browse catalog \u2192")), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    right: -50,
    top: -50,
    width: 220,
    height: 220,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    right: 50,
    bottom: -80,
    width: 140,
    height: 140,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)'
  }
})), /*#__PURE__*/React.createElement(StreakCard, null));
const StreakCard = () => /*#__PURE__*/React.createElement(Card, {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "mono-eb",
  style: {
    color: 'var(--ink-400)',
    marginBottom: 4
  }
}, "CURRENT STREAK"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 52,
    fontWeight: 800,
    color: 'var(--coral-500)',
    lineHeight: 1,
    letterSpacing: '-0.04em'
  }
}, "7", /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 16,
    color: 'var(--ink-400)',
    marginLeft: 6,
    fontWeight: 600
  }
}, "days"))), /*#__PURE__*/React.createElement("div", {
  style: {
    width: 48,
    height: 48,
    borderRadius: 14,
    background: 'var(--coral-500)',
    boxShadow: '0 4px 0 0 var(--coral-700)',
    display: 'grid',
    placeItems: 'center',
    fontSize: 24
  }
}, "\uD83D\uDD25")), /*#__PURE__*/React.createElement("h3", {
  style: {
    margin: 0,
    fontSize: 16,
    fontWeight: 800
  }
}, "Don't break the chain"), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 4
  }
}, [['M', 28, 'done'], ['T', 29, 'done'], ['W', 30, 'done'], ['T', 1, 'done'], ['F', 2, 'done'], ['S', 3, 'done'], ['S', 4, 'today']].map(([d, n, st], i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    aspectRatio: '1',
    borderRadius: 8,
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'Geist Mono, monospace',
    fontSize: 10,
    fontWeight: 600,
    background: st === 'done' ? 'var(--coral-500)' : 'var(--coral-50)',
    color: st === 'done' ? '#fff' : 'var(--coral-700)',
    border: st === 'today' ? '2px dashed var(--coral-500)' : 'none',
    lineHeight: 1
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 8,
    opacity: 0.8
  }
}, d), /*#__PURE__*/React.createElement("div", {
  style: {
    fontWeight: 700
  }
}, n)))), /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    fontSize: 12,
    color: 'var(--ink-500)',
    lineHeight: 1.5
  }
}, "Just ", /*#__PURE__*/React.createElement("b", {
  style: {
    color: 'var(--coral-700)'
  }
}, "1 lesson"), " today keeps it alive \u2014 you're ", /*#__PURE__*/React.createElement("b", {
  style: {
    color: 'var(--coral-700)'
  }
}, "3 days"), " from your record."));
const StatsRow = () => {
  const stats = [{
    lbl: 'XP earned',
    v: '410',
    sub: 'xp',
    delta: '↑ 23% vs last week',
    tone: 'green',
    icon: 'star'
  }, {
    lbl: 'Lessons done',
    v: '8',
    sub: '/ 12',
    delta: '↑ on track',
    tone: 'sun',
    icon: 'check_circ'
  }, {
    lbl: 'Time studied',
    v: '3h 42m',
    sub: '',
    delta: '↓ 12m vs last week',
    tone: 'coral',
    icon: 'clock',
    down: true
  }, {
    lbl: 'Avg quiz score',
    v: '87%',
    sub: '',
    delta: '↑ 5pp vs last week',
    tone: 'ink',
    icon: 'pencil'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14
    }
  }, stats.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.lbl,
    style: {
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono-eb"
  }, s.lbl), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 9,
      display: 'grid',
      placeItems: 'center',
      color: '#fff',
      background: s.tone === 'green' ? 'var(--green-600)' : s.tone === 'sun' ? 'var(--sun-400)' : s.tone === 'coral' ? 'var(--coral-500)' : 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 14,
    style: {
      color: s.tone === 'sun' ? 'var(--sun-700)' : '#fff'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1,
      display: 'flex',
      alignItems: 'baseline',
      gap: 4
    }
  }, s.v, s.sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--ink-400)',
      fontWeight: 600,
      letterSpacing: 0
    }
  }, s.sub)), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: s.down ? 'var(--coral-700)' : 'var(--green-700)'
    }
  }, s.delta))));
};
const TodaysTasks = () => /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(PanelHead, {
  title: "Today's tasks",
  action: "View week \u2192"
}), [{
  dot: 'var(--green-500)',
  title: 'Discriminant practice',
  meta: 'DUE 14:00 · 12 MIN'
}, {
  dot: 'var(--sun-400)',
  title: 'SAT Math · timed test',
  meta: 'DUE 18:00 · 45 MIN'
}, {
  dot: 'var(--coral-500)',
  title: 'Spanish vocabulary',
  meta: 'OVERDUE · 8 MIN',
  overdue: true
}, {
  dot: 'var(--ink-300)',
  title: 'Code: array methods',
  meta: 'TOMORROW · 20 MIN'
}].map((t, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 0',
    borderBottom: i < 3 ? '1px dashed var(--ink-100)' : 'none'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 8,
    height: 8,
    borderRadius: 3,
    background: t.dot,
    flex: 'none'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13,
    fontWeight: 700,
    color: 'var(--ink-900)'
  }
}, t.title), /*#__PURE__*/React.createElement("div", {
  className: "mono",
  style: {
    fontSize: 10,
    color: t.overdue ? 'var(--coral-700)' : 'var(--ink-400)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    fontWeight: 600,
    marginTop: 2
  }
}, t.meta)), /*#__PURE__*/React.createElement(Icon, {
  name: "chevron_r",
  size: 14,
  style: {
    color: 'var(--ink-300)'
  }
}))));
const ActivityTimeline = () => /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(PanelHead, {
  title: "Recent activity"
}), /*#__PURE__*/React.createElement("div", {
  className: "mono-eb",
  style: {
    color: 'var(--green-700)',
    marginBottom: 8
  }
}, "TODAY"), [{
  who: 'Anna P.',
  tone: 'green',
  act: 'completed',
  what: 'Quadratic functions · Lesson 3',
  when: '14 min ago'
}, {
  who: 'Mrs. Reyes',
  tone: 'sun',
  act: 'assigned',
  what: 'SAT Practice 4 to your class',
  when: '1 h ago',
  ai: false
}, {
  who: 'AI Tutor',
  tone: 'ink',
  act: 'helped you',
  what: 'understand the discriminant',
  when: '2 h ago',
  ai: true
}].map((a, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 0'
  }
}, /*#__PURE__*/React.createElement(Avatar, {
  initials: a.who.slice(0, 2).toUpperCase(),
  tone: a.tone,
  size: "sm"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    fontSize: 13,
    color: 'var(--ink-700)',
    lineHeight: 1.5
  }
}, /*#__PURE__*/React.createElement("b", {
  style: {
    color: 'var(--ink-900)',
    fontWeight: 800
  }
}, a.who), " ", a.act, " ", /*#__PURE__*/React.createElement("b", {
  style: {
    color: 'var(--ink-900)',
    fontWeight: 700
  }
}, a.what), a.ai && /*#__PURE__*/React.createElement(Chip, {
  tone: "sun",
  mono: true
}, "AI")), /*#__PURE__*/React.createElement("span", {
  className: "mono",
  style: {
    fontSize: 11,
    color: 'var(--ink-400)'
  }
}, a.when))), /*#__PURE__*/React.createElement("div", {
  className: "mono-eb",
  style: {
    color: 'var(--ink-400)',
    marginTop: 14,
    marginBottom: 8
  }
}, "YESTERDAY"), [{
  who: 'Marco S.',
  tone: 'coral',
  act: 'beat you on the',
  what: 'Functions leaderboard',
  when: '18:42'
}, {
  who: 'You',
  tone: 'green',
  act: 'earned',
  what: '“Streak Starter” badge',
  when: '20:10'
}].map((a, i) => /*#__PURE__*/React.createElement("div", {
  key: i,
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 0'
  }
}, /*#__PURE__*/React.createElement(Avatar, {
  initials: a.who.slice(0, 2).toUpperCase(),
  tone: a.tone,
  size: "sm"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    fontSize: 13,
    color: 'var(--ink-700)',
    lineHeight: 1.5
  }
}, /*#__PURE__*/React.createElement("b", {
  style: {
    color: 'var(--ink-900)',
    fontWeight: 800
  }
}, a.who), " ", a.act, " ", /*#__PURE__*/React.createElement("b", {
  style: {
    color: 'var(--ink-900)',
    fontWeight: 700
  }
}, a.what)), /*#__PURE__*/React.createElement("span", {
  className: "mono",
  style: {
    fontSize: 11,
    color: 'var(--ink-400)'
  }
}, a.when))));
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lms_app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lms_app/Lesson.jsx
try { (() => {
/* ============================================================
   Lesson player — outline + content with interactive quiz
   ============================================================ */

const Lesson = ({
  onNav
}) => {
  const lessons = [{
    id: 1,
    label: 'Quadratic functions intro',
    dur: '8m',
    status: 'done'
  }, {
    id: 2,
    label: 'Standard form & vertex form',
    dur: '12m',
    status: 'done'
  }, {
    id: 3,
    label: 'Graphing parabolas',
    dur: '15m',
    status: 'done'
  }, {
    id: 4,
    label: 'Factoring & roots',
    dur: '14m',
    status: 'done'
  }, {
    id: 5,
    label: 'Completing the square',
    dur: '18m',
    status: 'done'
  }, {
    id: 6,
    label: 'The discriminant formula',
    dur: '12m',
    status: 'current'
  }, {
    id: 7,
    label: 'Discriminant practice',
    dur: '20m',
    status: 'todo'
  }, {
    id: 8,
    label: 'Word problems',
    dur: '22m',
    status: 'todo'
  }, {
    id: 9,
    label: 'Module quiz',
    dur: '15m',
    status: 'locked'
  }];
  const modules = [{
    num: 1,
    title: 'Linear functions',
    meta: '12 LESSONS · 2H 30M',
    done: true
  }, {
    num: 2,
    title: 'Quadratic functions',
    meta: '9 LESSONS · 2H 10M',
    open: true,
    lessons
  }, {
    num: 3,
    title: 'Polynomials',
    meta: '14 LESSONS · 3H 20M'
  }, {
    num: 4,
    title: 'Rational functions',
    meta: '10 LESSONS · 2H 40M'
  }];
  const [pick, setPick] = React.useState(null); // selected choice in quiz
  const [submitted, setSubmitted] = React.useState(false);
  const correct = 2; // index

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "topbar",
    style: {
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow_left",
    size: 16,
    style: {
      color: 'var(--ink-400)',
      cursor: 'pointer'
    },
    onClick: () => onNav('catalog')
  }), /*#__PURE__*/React.createElement(Crumbs, {
    trail: ['Math', '9th', 'Algebra'],
    current: "The discriminant formula"
  }), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement(StreakPill, {
    days: 7
  }), /*#__PURE__*/React.createElement(XpToken, {
    amount: 2840
  }), /*#__PURE__*/React.createElement(Avatar, {
    initials: "AP",
    tone: "green",
    size: "md"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      minHeight: 'calc(100vh - 64px)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      background: '#fff',
      borderRight: '1px solid var(--ink-100)',
      padding: '20px 18px 32px',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono-eb",
    style: {
      marginBottom: 4
    }
  }, "ALGEBRA \xB7 9TH GRADE"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: '-0.01em',
      marginBottom: 12
    }
  }, "Functions & equations"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: 42,
    height: 6
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: 'var(--green-700)'
    }
  }, "42%")), modules.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.num,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '6px 4px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 7,
      background: m.done ? 'var(--green-500)' : m.open ? 'var(--green-600)' : 'var(--ink-100)',
      color: m.done || m.open ? '#fff' : 'var(--ink-400)',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'Geist Mono, monospace',
      fontSize: 10,
      fontWeight: 800,
      flex: 'none'
    }
  }, m.done ? '✓' : m.num), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--ink-900)',
      letterSpacing: '-0.005em'
    }
  }, m.title), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 9,
      color: 'var(--ink-400)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      fontWeight: 600,
      marginTop: 1
    }
  }, m.meta)), /*#__PURE__*/React.createElement(Icon, {
    name: m.open ? 'chevron_d' : 'chevron_r',
    size: 12,
    style: {
      color: 'var(--ink-300)'
    }
  })), m.open && m.lessons && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 32,
      marginTop: 6,
      display: 'flex',
      flexDirection: 'column'
    }
  }, m.lessons.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '7px 8px',
      cursor: 'pointer',
      borderRadius: 8,
      background: l.status === 'current' ? 'var(--green-50)' : 'transparent',
      border: l.status === 'current' ? '1px solid var(--green-300)' : '1px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 999,
      flex: 'none',
      background: l.status === 'done' ? 'var(--green-500)' : l.status === 'current' ? 'var(--green-600)' : 'transparent',
      border: l.status === 'todo' || l.status === 'locked' ? '2px solid var(--ink-200)' : 'none',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontSize: 9,
      lineHeight: 1,
      fontWeight: 800,
      boxShadow: l.status === 'current' ? '0 0 0 3px var(--green-100)' : 'none'
    }
  }, l.status === 'done' ? '✓' : l.status === 'locked' ? '🔒' : ''), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 12,
      color: l.status === 'todo' || l.status === 'locked' ? 'var(--ink-400)' : 'var(--ink-900)',
      fontWeight: l.status === 'current' ? 700 : 500
    }
  }, l.label), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 9,
      color: 'var(--ink-400)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, l.dur))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '40px 64px 120px',
      maxWidth: 880,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono-eb",
    style: {
      color: 'var(--green-700)',
      marginBottom: 12
    }
  }, "LESSON 6 / 9 \xB7 12 MIN \xB7 ALGEBRA \xB7 QUADRATICS"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 40,
      fontWeight: 800,
      letterSpacing: '-0.025em',
      margin: '0 0 18px',
      lineHeight: 1.05
    }
  }, "The discriminant formula"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--ink-700)',
      margin: '0 0 24px'
    }
  }, "For a quadratic equation ", /*#__PURE__*/React.createElement("code", {
    style: mono
  }, "ax\xB2 + bx + c = 0"), ", the ", /*#__PURE__*/React.createElement("b", null, "discriminant"), " tells you how many real solutions exist \u2014 without computing them."), /*#__PURE__*/React.createElement("div", {
    className: "card flat",
    style: {
      padding: 24,
      marginBottom: 28,
      fontFamily: 'Geist Mono, monospace',
      fontSize: 22,
      fontWeight: 600,
      textAlign: 'center'
    }
  }, "\u0394 = b\xB2 \u2212 4ac"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      margin: '0 0 12px',
      letterSpacing: '-0.015em'
    }
  }, "How to read it"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginBottom: 28
    }
  }, [{
    sign: 'Δ > 0',
    meaning: 'two distinct real roots',
    tone: 'green'
  }, {
    sign: 'Δ = 0',
    meaning: 'one repeated real root',
    tone: 'sun'
  }, {
    sign: 'Δ < 0',
    meaning: 'no real roots (complex)',
    tone: 'coral'
  }].map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '110px 1fr',
      gap: 16,
      alignItems: 'center',
      padding: '12px 16px',
      borderRadius: 12,
      background: 'var(--paper-2)',
      border: '1px solid var(--ink-100)'
    }
  }, /*#__PURE__*/React.createElement("code", {
    style: {
      ...mono,
      fontSize: 16,
      fontWeight: 700,
      color: r.tone === 'green' ? 'var(--green-700)' : r.tone === 'sun' ? 'var(--sun-700)' : 'var(--coral-700)'
    }
  }, r.sign), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, r.meaning)))), /*#__PURE__*/React.createElement("div", {
    className: "a",
    style: {
      display: 'grid',
      gridTemplateColumns: '36px 1fr',
      gap: 12,
      padding: '14px 16px',
      borderRadius: 14,
      marginBottom: 32,
      background: 'var(--sun-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: 'var(--sun-500)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontWeight: 800
    }
  }, "!"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
    style: {
      margin: '0 0 2px',
      fontSize: 13,
      fontWeight: 700
    }
  }, "Watch the sign of c"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: 'var(--ink-500)',
      lineHeight: 1.5
    }
  }, "A common mistake \u2014 drop the minus and you flip the answer category."))), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      margin: '0 0 6px',
      letterSpacing: '-0.015em'
    }
  }, "Quick check"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--ink-500)',
      margin: '0 0 16px'
    }
  }, "How many real roots does ", /*#__PURE__*/React.createElement("code", {
    style: mono
  }, "2x\xB2 + 4x + 3 = 0"), " have?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 10,
      marginBottom: 22
    }
  }, ['Two distinct real roots', 'One repeated real root', 'No real roots', 'Cannot be determined'].map((opt, i) => {
    const isPick = pick === i;
    const isCorr = submitted && i === correct;
    const isWrong = submitted && isPick && i !== correct;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => !submitted && setPick(i),
      style: {
        padding: 16,
        borderRadius: 14,
        cursor: submitted ? 'default' : 'pointer',
        background: isCorr ? 'var(--green-50)' : isWrong ? 'var(--coral-50)' : isPick ? 'var(--green-100)' : '#fff',
        border: '2px solid ' + (isCorr ? 'var(--green-600)' : isWrong ? 'var(--coral-500)' : isPick ? 'var(--green-600)' : 'var(--ink-100)'),
        borderLeft: isCorr ? '4px solid var(--green-600)' : isWrong ? '4px solid var(--coral-500)' : undefined,
        paddingLeft: isCorr || isWrong ? 14 : 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        transition: 'all 120ms'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: 999,
        flex: 'none',
        background: isPick ? 'var(--green-600)' : '#fff',
        border: isPick ? 'none' : '2px solid var(--ink-200)',
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        fontSize: 11,
        fontWeight: 800,
        lineHeight: 1
      }
    }, isPick && '✓'), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600
      }
    }, opt)), isCorr && /*#__PURE__*/React.createElement(Chip, {
      tone: "solid-g",
      mono: true
    }, "CORRECT"), isWrong && /*#__PURE__*/React.createElement(Chip, {
      tone: "coral",
      mono: true
    }, "TRY AGAIN"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      marginTop: 24,
      marginLeft: -64,
      marginRight: -64,
      padding: '20px 64px',
      background: '#fff',
      borderTop: '1px solid var(--ink-100)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow_left",
      size: 14
    })
  }, "Previous"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--ink-400)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, "00:42 elapsed"), submitted && pick === correct && /*#__PURE__*/React.createElement(XpToken, {
    amount: 20
  }), !submitted ? /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setSubmitted(true),
    disabled: pick == null
  }, "Check answer") : pick === correct ? /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onNav('dashboard'),
    trailing: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow_right",
      size: 14
    })
  }, "Mark complete") : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => {
      setPick(null);
      setSubmitted(false);
    }
  }, "Try again"))))));
};
const mono = {
  fontFamily: 'Geist Mono, monospace',
  background: 'var(--ink-50)',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: '0.9em'
};
window.Lesson = Lesson;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lms_app/Lesson.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lms_app/Primitives.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ============================================================
   GrassLMS UI Kit — primitives + Icon
   ============================================================ */

// Inline-stroke Lucide-style icons (production uses lucide-react).
// We hand-rolled these to match: 24×24 viewBox, stroke=2, round caps/joins.
const Icon = ({
  name,
  size = 16,
  className = '',
  style = {}
}) => {
  const paths = ICONS[name];
  if (!paths) return null;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    style: style,
    dangerouslySetInnerHTML: {
      __html: paths
    }
  });
};
const ICONS = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  list: '<path d="M3 6h13"/><path d="M3 12h13"/><path d="M3 18h13"/><circle cx="20" cy="6" r="1"/><circle cx="20" cy="12" r="1"/><circle cx="20" cy="18" r="1"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  check_circ: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  play: '<polygon points="5 3 19 12 5 21 5 3"/>',
  arrow_right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrow_left: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  chevron_r: '<path d="m9 18 6-6-6-6"/>',
  chevron_d: '<path d="m6 9 6 6 6-6"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  sparkles: '<path d="m12 3-1.91 5.27L4 10.18l5.45 3.86L7.82 20 12 16.74 16.18 20l-1.63-5.96L20 10.18l-6.09-1.91z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
  bookopen: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  graduation: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5"/>',
  brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  desmos: '<path d="M12 3v18"/><path d="M3 12h18"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="8" r="1"/>'
};

// Button primitive
const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  leading,
  trailing,
  ...rest
}) => {
  const cls = `btn btn-${variant} ${size !== 'md' ? `btn-${size}` : ''}`;
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    onClick: onClick
  }, rest), leading, children, trailing);
};

// Chip
const Chip = ({
  tone = 'ink',
  mono = false,
  children
}) => /*#__PURE__*/React.createElement("span", {
  className: `chip ${tone} ${mono ? 'mono' : ''}`
}, children);

// XP token
const XpToken = ({
  amount
}) => /*#__PURE__*/React.createElement("span", {
  className: "xp-token"
}, /*#__PURE__*/React.createElement("span", {
  className: "o"
}, "\u2605"), "+", amount, " XP");

// Streak pill
const StreakPill = ({
  days
}) => /*#__PURE__*/React.createElement("span", {
  className: "streak-pill"
}, /*#__PURE__*/React.createElement("span", {
  className: "o"
}, "\uD83D\uDD25"), days, " days");

// Avatar
const Avatar = ({
  initials,
  tone = 'green',
  size = 'md'
}) => /*#__PURE__*/React.createElement("span", {
  className: `av ${size} ${tone}`
}, initials);

// Linear progress bar
const ProgressBar = ({
  value,
  tone = 'green',
  height = 8
}) => /*#__PURE__*/React.createElement("div", {
  className: `bar ${tone === 'green' ? '' : tone}`,
  style: {
    height
  }
}, /*#__PURE__*/React.createElement("i", {
  style: {
    width: `${value}%`
  }
}));

// Card
const Card = ({
  children,
  variant = 'default',
  style = {},
  className = '',
  ...rest
}) => /*#__PURE__*/React.createElement("div", _extends({
  className: `card ${variant === 'elev' ? 'elev' : variant === 'flat' ? 'flat' : ''} ${className}`,
  style: style
}, rest), children);

// PanelHead — title + link
const PanelHead = ({
  title,
  action,
  onAction
}) => /*#__PURE__*/React.createElement("div", {
  className: "panel-head"
}, /*#__PURE__*/React.createElement("h3", null, title), action && /*#__PURE__*/React.createElement("a", {
  className: "a",
  onClick: onAction
}, action));

// Crumbs
const Crumbs = ({
  trail,
  current
}) => /*#__PURE__*/React.createElement("div", {
  className: "crumbs"
}, trail.map((c, i) => /*#__PURE__*/React.createElement(React.Fragment, {
  key: i
}, /*#__PURE__*/React.createElement("span", null, c), /*#__PURE__*/React.createElement("span", {
  className: "sep"
}, "/"))), /*#__PURE__*/React.createElement("span", {
  className: "curr"
}, current));
Object.assign(window, {
  Icon,
  Button,
  Chip,
  XpToken,
  StreakPill,
  Avatar,
  ProgressBar,
  Card,
  PanelHead,
  Crumbs
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lms_app/Primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lms_app/Sidebar.jsx
try { (() => {
/* ============================================================
   Sidebar (global left rail) — handles route navigation
   ============================================================ */

const Sidebar = ({
  route,
  onNav
}) => {
  const item = (key, label, iconName, opts = {}) => /*#__PURE__*/React.createElement("div", {
    key: key,
    className: `rail-item ${route === key ? 'active' : ''}`,
    onClick: () => onNav(key)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: iconName,
    size: 16,
    className: "ico"
  }), /*#__PURE__*/React.createElement("span", null, label), opts.badge && /*#__PURE__*/React.createElement("span", {
    className: `badge ${opts.badgeTone || 'coral'}`
  }, opts.badge));
  return /*#__PURE__*/React.createElement("aside", {
    className: "rail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-mark"
  }, "g"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, "GrassLMS"), /*#__PURE__*/React.createElement("div", {
    className: "cap"
  }, "lively \xB7 v1"))), /*#__PURE__*/React.createElement("div", {
    className: "rail-section"
  }, "Learn"), item('dashboard', 'Dashboard', 'home'), item('catalog', 'Courses', 'book', {
    badge: 3
  }), item('lesson', 'Lesson', 'bookopen'), item('assignments', 'Assignments', 'list', {
    badge: 2
  }), item('calendar', 'Calendar', 'calendar'), /*#__PURE__*/React.createElement("div", {
    className: "rail-section"
  }, "Practice"), item('sat', 'SAT prep', 'star'), item('knowledge', 'Knowledge', 'sparkles', {
    badge: 'NEW',
    badgeTone: 'sun'
  }), item('leaderboard', 'Leaderboard', 'award'), /*#__PURE__*/React.createElement("div", {
    className: "rail-section"
  }, "School"), item('admin', 'Admin', 'settings'), /*#__PURE__*/React.createElement("div", {
    className: "rail-foot"
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: "AP",
    tone: "green",
    size: "md"
  }), /*#__PURE__*/React.createElement("div", {
    className: "who"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, "Anna P."), /*#__PURE__*/React.createElement("div", {
    className: "ml"
  }, "9th \xB7 2,840 XP"))));
};
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lms_app/Sidebar.jsx", error: String((e && e.message) || e) }); }

})();
