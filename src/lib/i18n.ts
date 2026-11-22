import { CurrencyCode, ExpenseKind, Language, Pillar } from '../types'

export interface TranslationSchema {
  brand: {
    title: string
    subtitle: string
  }
  tabs: {
    dashboard: string
    track: string
    budget: string
    reflect: string
    history: string
  }
  header: {
    guide: string
    exportCsv: string
    backupJson: string
    restoreJson: string
    currencySelect: string
    langSelect: string
    toolsMenu: string
    loadSamples: string
    clearSamples: string
  }
  dashboard: {
    remainingTitle: string
    spentOf: string
    spentPercentage: string
    dailyPace: string
    daysLeft: string
    paceSerene: string
    paceSereneDesc: string
    paceWarning: string
    paceWarningDesc: string
    paceExceeded: string
    paceExceededDesc: string
    guidanceNeedsDominant: string
    guidanceWantsDominant: string
    guidanceBalanced: string
    statRemaining: string
    statSpent: string
    statAllowance: string
    statDaily: string
    pillarsTitle: string
    pillarsEyebrow: string
    learnPillars: string
    pctOfSpent: string
    needsWantsTitle: string
    needsWantsEyebrow: string
    ratioGrounded: string
    ratioDiscretionary: string
    essentialNeeds: string
    wantsAndJoys: string
    essentialsCount: (n: number) => string
    pleasuresCount: (n: number) => string
    monthlyIntention: string
    noIntentionSet: string
    editIntention: string
    actionLog: string
    actionLogDesc: string
    actionReflect: string
    actionReflectDesc: string
    recentTitle: string
    recentSubtitle: (n: number) => string
    viewAll: (n: number) => string
  }
  track: {
    eyebrow: string
    title: string
    subtitle: string
    btnRecordNew: string
    spendableLeft: string
    quickTitle: string
    quickSubtitle: string
    amount: string
    date: string
    description: string
    descriptionPlaceholder: string
    kindLegend: string
    addBtn: string
    searchPlaceholder: string
    allPillars: string
    allKinds: string
    sortNewest: string
    sortOldest: string
    sortHighest: string
    sortLowest: string
    ledgerEntriesTitle: (n: number) => string
    showingCount: (shown: number, total: number) => string
    clearSamples: string
    loadSamples: string
    exportCsv: string
    emptySearch: string
    resetFilters: string
    emptyZenTitle: string
    emptyZenSubtitle: string
    emptyZenLogFirst: string
  }
  budget: {
    eyebrow: string
    title: string
    subtitle: string
    eqIncome: string
    eqFixed: string
    eqSavings: string
    eqAllowance: string
    bucketTitle: string
    bucketSubtitle: string
    bucketFixed: string
    bucketSavings: string
    bucketSpendable: string
    incomeLabel: string
    incomeSubnote: string
    fixedLabel: string
    fixedSubnote: string
    savingsLabel: string
    savingsSubnote: string
    targetRateText: (rate: number) => string
    intentionLabel: string
    intentionSubnote: string
    intentionPlaceholder: string
    autoSaveNotice: string
    pulseTitle: (month: string) => string
    pulseSubtitle: string
    glanceTotal: string
    glanceSpent: string
    glanceBalance: string
    glanceDaily: string
  }
  reflect: {
    eyebrow: string
    title: string
    subtitle: string
    achievedTitle: string
    reviewTitle: string
    summaryBanner: (count: number, spent: string, saved: string, goal: string) => string
    celebrateBtn: string
    plannedSavings: string
    actualSaved: string
    blossomScaleTitle: string
    blossomScaleSub: string
    hankoSealCompleted: string
    hankoSealSub: string
    questionsTitle: string
    questionsSubtitle: string
    q1Title: string
    q1Sub: string
    q1Placeholder: string
    q2Title: string
    q2Sub: string
    q2Placeholder: string
    q3Title: string
    q3Sub: string
    q3Placeholder: string
    footerWisdom: string
    btnFinish: string
  }
  history: {
    eyebrow: string
    title: string
    subtitle: string
    lifetimeSpent: string
    lifetimeSpentSub: (count: number) => string
    lifetimeSaved: string
    lifetimeSavedSub: string
    panelTitle: string
    panelSubtitle: string
    activeMonthBadge: string
    recordBadge: string
    openMonthBtn: string
    colSpent: string
    colAllowance: string
    colSaved: string
    colRate: string
    entriesRecorded: (n: number) => string
    reflectionWritten: string
  }
  expenseModal: {
    eyebrowAdd: string
    eyebrowEdit: string
    titleAdd: string
    titleEdit: string
    pillarLabel: string
    pillarSublabel: string
    amountLabel: string
    dateLabel: string
    descLabel: string
    descPlaceholder: string
    kindLabel: string
    kindSublabel: string
    needBtn: string
    wantBtn: string
    cancelBtn: string
    saveAddBtn: string
    saveEditBtn: string
  }
  guideModal: {
    eyebrow: string
    title: string
    intro: string
    stepsTitle: string
    s1Num: string
    s1Title: string
    s1Desc: string
    s2Num: string
    s2Title: string
    s2Desc: string
    s3Num: string
    s3Title: string
    s3Desc: string
    s4Num: string
    s4Title: string
    s4Desc: string
    pillarsTitle: string
    rule24Title: string
    rule24Desc: string
    understandBtn: string
  }
  pillars: Record<
    Pillar,
    {
      name: string
      note: string
      examples: string
    }
  >
  kinds: Record<ExpenseKind, string>
  notices: {
    logged: string
    updated: string
    removed: string
    samplesCleared: string
    samplesLoaded: string
    backupDownloaded: string
    csvGenerated: string
    restoredSuccess: string
    restoreError: string
    reflectionSaved: string
  }
  quotes: { quote: string; author: string }[]
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  es: {
    brand: {
      title: 'Kakeibo',
      subtitle: 'El arte japonés del presupuesto consciente',
    },
    tabs: {
      dashboard: 'Inicio',
      track: 'Gastos',
      budget: 'Presupuesto',
      reflect: 'Reflexión',
      history: 'Historial',
    },
    header: {
      guide: 'Guía de Filosofía Kakeibo',
      exportCsv: 'Exportar gastos en CSV',
      backupJson: 'Descargar copia de seguridad en JSON',
      restoreJson: 'Restaurar diario desde JSON',
      currencySelect: 'Seleccionar moneda',
      langSelect: 'Cambiar idioma',
      toolsMenu: 'Herramientas y Datos',
      loadSamples: 'Cargar datos de ejemplo',
      clearSamples: 'Limpiar datos de ejemplo',
    },
    dashboard: {
      remainingTitle: 'SALDO DISPONIBLE PARA GASTAR',
      spentOf: 'gastados de',
      spentPercentage: 'de presupuesto',
      dailyPace: '/día para',
      daysLeft: 'días restantes',
      paceSerene: 'Paso Sereno',
      paceSereneDesc: 'Tu ritmo de gasto está en armonía con tu presupuesto mensual.',
      paceWarning: 'Atención Amable',
      paceWarningDesc: 'Tu ritmo diario proyecta superar el presupuesto antes de fin de mes.',
      paceExceeded: 'Límite Superado',
      paceExceededDesc: 'Has consumido el presupuesto libre asignado para este mes.',
      guidanceNeedsDominant:
        'Tus finanzas tienen una base sólida. La mayor parte de tus recursos protege tus necesidades esenciales.',
      guidanceWantsDominant:
        'Has dedicado una buena parte de tu energía al disfrute. Observa con calma si estos gastos te brindaron bienestar duradero.',
      guidanceBalanced:
        'Existe un equilibrio armónico entre lo indispensable para vivir y los pequeños placeres cotidianos.',
      statRemaining: 'Disponible',
      statSpent: 'Gastado',
      statAllowance: 'Presupuesto Total',
      statDaily: 'Día Para',
      pillarsTitle: 'Distribución por Pilar',
      pillarsEyebrow: 'LOS CUATRO PILARES (四大費目)',
      learnPillars: 'Aprender pilares',
      pctOfSpent: 'del gasto',
      needsWantsTitle: 'Equilibrio Necesidades vs. Deseos',
      needsWantsEyebrow: 'CONSCIENCIA FINANCIERA',
      ratioGrounded: 'Gasto Consciente y Equilibrado',
      ratioDiscretionary: 'Mayor Proporción en Deseos',
      essentialNeeds: 'Necesidades Esenciales',
      wantsAndJoys: 'Deseos y Placeres',
      essentialsCount: (n) => `${n} gastos esenciales`,
      pleasuresCount: (n) => `${n} gustos opcionales`,
      monthlyIntention: 'INTENCIÓN DEL MES',
      noIntentionSet: 'Sin intención definida aún. Puedes fijar una en la pestaña Presupuesto.',
      editIntention: 'Editar',
      actionLog: 'Registrar un Gasto',
      actionLogDesc: 'Anota una compra y reflexiona brevemente sobre su pilar correspondiente.',
      actionReflect: 'Reflexionar y Revisar',
      actionReflectDesc: 'Revisa tus hábitos del mes y responde las 3 preguntas conscientes.',
      recentTitle: 'Gastos Recientes Registrados',
      recentSubtitle: (n) => `${n} registros anotados este mes.`,
      viewAll: (n) => `Ver y Filtrar Todos (${n})`,
    },
    track: {
      eyebrow: 'DIARIO DE GASTOS DIARIOS',
      title: 'Registrar Gastos',
      subtitle: 'Haz una breve pausa, anota tu compra con atención y continúa con tranquilidad.',
      btnRecordNew: 'Registrar Nuevo Gasto',
      spendableLeft: 'Saldo Disponible:',
      quickTitle: 'Formulario de Entrada Rápida',
      quickSubtitle: 'Agrega un movimiento rápidamente a tu diario.',
      amount: 'Monto / Valor',
      date: 'Fecha',
      description: 'Descripción / Motivo',
      descriptionPlaceholder: '¿Para qué fue este gasto?',
      kindLegend: 'Tipo:',
      addBtn: 'Agregar al Diario',
      searchPlaceholder: 'Buscar por concepto, nota o valor...',
      allPillars: 'Todos los Pilares',
      allKinds: 'Todos',
      sortNewest: 'Más recientes primero',
      sortOldest: 'Más antiguos primero',
      sortHighest: 'Mayor valor',
      sortLowest: 'Menor valor',
      ledgerEntriesTitle: (n) => `Entradas del Diario (${n})`,
      showingCount: (shown, total) => `Mostrando ${shown} de ${total} registros.`,
      clearSamples: 'Limpiar ejemplos',
      loadSamples: 'Cargar ejemplos',
      exportCsv: 'CSV',
      emptySearch: 'No se encontraron gastos con los filtros aplicados.',
      resetFilters: 'Restablecer filtros',
      emptyZenTitle: 'Un lienzo en blanco este mes',
      emptyZenSubtitle:
        'Tu diario está limpio y en calma. Tómate un respiro y anota tu primer movimiento cuando estés listo.',
      emptyZenLogFirst: 'Anotar primer gasto',
    },
    budget: {
      eyebrow: 'PLANIFICACIÓN FINANCIERA ANTICIPADA',
      title: 'Estructura del Presupuesto Mensual',
      subtitle:
        'En el método Kakeibo, apartas tu ahorro primero. Lo que queda es tu dinero libre de culpa para vivir con serenidad.',
      eqIncome: 'Ingresos',
      eqFixed: 'Gastos Fijos',
      eqSavings: 'Meta Ahorro',
      eqAllowance: 'Presupuesto Libre',
      bucketTitle: 'La Cascada de Asignación Consciente',
      bucketSubtitle: 'Visualiza con claridad cómo se reparte el 100% de tus ingresos del mes.',
      bucketFixed: 'Compromisos Fijos',
      bucketSavings: 'Ahorro Anticipado',
      bucketSpendable: 'Presupuesto Libre',
      incomeLabel: 'Ingresos Mensuales Netos',
      incomeSubnote: 'Salario, ingresos independientes, honorarios o entradas regulares',
      fixedLabel: 'Gastos Fijos Ineludibles',
      fixedSubnote: 'Arriendo/vivienda, cuotas, servicios públicos, seguros, préstamos',
      savingsLabel: 'Meta de Ahorro Anticipada',
      savingsSubnote: 'La promesa que haces a tu tranquilidad y futuro financiero',
      targetRateText: (rate) =>
        `Tasa de Ahorro Objetivo: ${rate}% de tus ingresos apartados al inicio del mes.`,
      intentionLabel: 'Intención Guía de este Mes',
      intentionSubnote: 'Un enfoque consciente para tus decisiones y energía',
      intentionPlaceholder: 'Ej. Cocinar más en casa, cultivar la calma, invertir en aprendizaje…',
      autoSaveNotice: 'Los cambios se guardan automáticamente en tu dispositivo.',
      pulseTitle: (m) => `Pulso Financiero de ${m}`,
      pulseSubtitle: 'Cifras calculadas en tiempo real según tu presupuesto y gastos anotados.',
      glanceTotal: 'TOTAL DISPONIBLE',
      glanceSpent: 'GASTADO HASTA HOY',
      glanceBalance: 'SALDO RESTANTE',
      glanceDaily: 'SUGERIDO / DÍA',
    },
    reflect: {
      eyebrow: 'CONTEMPLACIÓN DE FIN DE MES',
      title: 'Reflexión Mensual (振り返り)',
      subtitle:
        'El verdadero poder del Kakeibo está aquí: revisar el mes con honestidad serena, sin culpa ni reproches.',
      achievedTitle: '¡Meta de Ahorro Cumplida!',
      reviewTitle: 'Balance del Mes en Revisión',
      summaryBanner: (count, spent, saved, goal) =>
        `Anotaste ${count} gastos sumando ${spent}. Tu balance neto ahorrado estimado es de ${saved} (Tu meta era ${goal}).`,
      celebrateBtn: 'Celebrar 🎉',
      plannedSavings: 'META DE AHORRO PLANEADA',
      actualSaved: 'AHORRO ESTIMADO REAL',
      blossomScaleTitle: 'Escala de Serenidad Financiera',
      blossomScaleSub: '¿Qué tan en paz te sentiste con tus decisiones monetarias este mes?',
      hankoSealCompleted: 'Revisado con Calma',
      hankoSealSub: 'Sello de cierre de ciclo mensual (判子)',
      questionsTitle: 'Las Tres Preguntas Conscientes',
      questionsSubtitle: 'Dedica cinco minutos de silencio a responder lo siguiente.',
      q1Title: '1. ¿Qué decisiones salieron bien este mes?',
      q1Sub: 'Aciertos, comidas en casa, pausas antes de comprar o gastos que trajeron auténtico bienestar.',
      q1Placeholder: 'Una elección consciente con la que me siento en paz…',
      q2Title: '2. ¿En qué gasté de más o sin necesidad?',
      q2Sub: 'Observa con amabilidad y sin juzgarte: domicilios apresurados, antojos impulsivos o suscripciones no usadas.',
      q2Placeholder: 'Un hábito o patrón que noté, observado con serenidad…',
      q3Title: '3. ¿Qué ajuste concreto haré el próximo mes?',
      q3Sub: 'Un paso realista: preparar más café en casa, aplicar la regla de 24 horas a los deseos o cocinar en fin de semana.',
      q3Placeholder: 'Un cambio amable que me gustaría cultivar…',
      footerWisdom: 'En Kakeibo no existe el fracaso, solo un mayor autoconocimiento.',
      btnFinish: 'Completar Reflexión',
    },
    history: {
      eyebrow: 'LÍNEA DE TIEMPO DEL DIARIO',
      title: 'Historial y Tendencias Mensuales',
      subtitle:
        'Una mirada panorámica a tu camino financiero y tus hábitos conscientes a lo largo de los meses.',
      lifetimeSpent: 'TOTAL GASTADO REGISTRADO',
      lifetimeSpentSub: (count) => `Registrado a través de ${count} meses de diario.`,
      lifetimeSaved: 'AHORRO ACUMULADO ESTIMADO',
      lifetimeSavedSub: 'Ingresos restantes tras compromisos fijos y gastos registrados.',
      panelTitle: 'Meses Pasados y Activos',
      panelSubtitle: 'Haz clic en cualquier mes para inspeccionarlo o continuar su diario.',
      activeMonthBadge: 'MES ACTIVO',
      recordBadge: 'REGISTRO GUARDADO',
      openMonthBtn: 'Abrir Mes',
      colSpent: 'GASTADO',
      colAllowance: 'PRESUPUESTO LIBRE',
      colSaved: 'AHORRO ESTIMADO',
      colRate: 'TASA DE AHORRO',
      entriesRecorded: (n) => `${n} gastos anotados`,
      reflectionWritten: 'Reflexión completada',
    },
    expenseModal: {
      eyebrowAdd: 'REGISTRAR GASTO',
      eyebrowEdit: 'MODIFICAR GASTO',
      titleAdd: 'Anotar un Gasto Consciente',
      titleEdit: 'Ajustar Registro del Diario',
      pillarLabel: 'Selecciona el Pilar de Kakeibo',
      pillarSublabel: 'Clasifica en uno de los 4 pilares clásicos',
      amountLabel: 'Monto / Valor',
      dateLabel: 'Fecha',
      descLabel: 'Descripción y Motivo',
      descPlaceholder: 'Ej. Mercado de la semana, café con amigos, libro de lectura',
      kindLabel: '¿Es una Necesidad o un Deseo?',
      kindSublabel: 'Pregunta esencial de Kakeibo: ¿fue indispensable para la vida o un gusto voluntario?',
      needBtn: 'Necesidad (Esencial)',
      wantBtn: 'Deseo (Gusto Opcional)',
      cancelBtn: 'Cancelar',
      saveAddBtn: 'Confirmar Gasto',
      saveEditBtn: 'Guardar Cambios',
    },
    guideModal: {
      eyebrow: 'LA FILOSOFÍA DEL KAKEIBO (家計簿)',
      title: 'El Libro de Cuentas Japonés para el Hogar',
      intro:
        'Creado en 1904 por Hani Motoko, la primera mujer periodista de Japón, Kakeibo demuestra que la paz financiera no proviene de la privación extrema, sino de la consciencia, la intención y una pausa diaria para reflexionar.',
      stepsTitle: 'Las Cuatro Preguntas Clave del Kakeibo',
      s1Num: '01',
      s1Title: '¿Cuánto dinero tienes?',
      s1Desc:
        'Toma tus ingresos netos y descuenta tus compromisos fijos ineludibles (arriendo, servicios, deudas indispensables).',
      s2Num: '02',
      s2Title: '¿Cuánto te gustaría ahorrar?',
      s2Desc:
        'Define tu meta de ahorro al comenzar el mes y apártala de inmediato, como una promesa de tranquilidad hacia tu futuro.',
      s3Num: '03',
      s3Title: '¿Cuánto estás gastando en realidad?',
      s3Desc:
        'Anota cada gasto en los Cuatro Pilares, diferenciando con honestidad si fue una Necesidad o un Deseo.',
      s4Num: '04',
      s4Title: '¿Cómo puedes mejorar?',
      s4Desc:
        'Al final del mes, responde a las 3 preguntas de reflexión sin juzgarte para cultivar hábitos serenos y duraderos.',
      pillarsTitle: 'Los Cuatro Pilares del Gasto',
      rule24Title: 'La Regla de las 24 Horas para los Deseos',
      rule24Desc:
        'Cuando sientas el impulso de comprar un gusto no esencial, espera 24 horas. Si al día siguiente aún lo deseas y tu saldo disponible lo respalda, cómpralo con total tranquilidad y sin culpa.',
      understandBtn: 'Entendido — Comenzar mi Práctica',
    },
    pillars: {
      Survival: {
        name: 'Supervivencia',
        note: 'Necesidades: Mercado, vivienda, servicios, salud, transporte',
        examples: 'Supermercado, pasajes de bus/metro, farmacia, servicios públicos',
      },
      Optional: {
        name: 'Opcionales',
        note: 'Deseos: Salidas, restaurantes, café, compras, ocio',
        examples: 'Restaurantes, café, domicilios, ropa, cine, salidas con amigos',
      },
      Culture: {
        name: 'Cultura',
        note: 'Crecimiento: Libros, cursos, museos, música, aprendizaje',
        examples: 'Libros, cursos online, boletas de museo, talleres, instrumentos',
      },
      Extra: {
        name: 'Extras',
        note: 'Imprevistos: Regalos, reparaciones, emergencias',
        examples: 'Reparación del carro/moto, regalo de cumpleaños, urgencia médica',
      },
    },
    kinds: {
      Need: 'Necesidad',
      Want: 'Deseo',
    },
    notices: {
      logged: 'Gasto registrado con consciencia.',
      updated: 'Gasto actualizado con éxito.',
      removed: 'Gasto eliminado del diario.',
      samplesCleared: 'Datos de ejemplo eliminados.',
      samplesLoaded: 'Diario de ejemplo recargado.',
      backupDownloaded: 'Copia de seguridad JSON descargada.',
      csvGenerated: 'Reporte CSV generado con éxito.',
      restoredSuccess: '¡Diario restaurado con éxito!',
      restoreError: 'No se pudo importar. Elige un archivo JSON válido de Kakeibo.',
      reflectionSaved: 'Reflexión mensual guardada con gratitud.',
    },
    quotes: [
      {
        quote: 'El orden en tus finanzas trae serenidad a tu mente y claridad a tus días.',
        author: 'Hani Motoko, Creadora del Kakeibo (1904)',
      },
      {
        quote:
          'El Kakeibo no se trata de privarse de la vida, sino de elegir gastos que despierten auténtica gratitud.',
        author: 'Principio de Mindfulness Japonés',
      },
      {
        quote:
          'Cuando escribes un gasto con tu propia mano, te detienes a reconocer lo que realmente valoras.',
        author: 'Tradición Kakeibo',
      },
      {
        quote: 'Gasta con atención, ahorra con propósito y vive con tranquilidad.',
        author: 'Sabiduría de Vida Consciente',
      },
    ],
  },
  en: {
    brand: {
      title: 'Kakeibo',
      subtitle: 'The Japanese Art of Mindful Budgeting',
    },
    tabs: {
      dashboard: 'Dashboard',
      track: 'Expenses',
      budget: 'Budget Plan',
      reflect: 'Reflect',
      history: 'History',
    },
    header: {
      guide: 'Kakeibo Philosophy Guide',
      exportCsv: 'Export expenses to CSV',
      backupJson: 'Download backup JSON',
      restoreJson: 'Restore from JSON backup',
      currencySelect: 'Select currency',
      langSelect: 'Change language',
      toolsMenu: 'Tools & Data',
      loadSamples: 'Load sample data',
      clearSamples: 'Clear sample data',
    },
    dashboard: {
      remainingTitle: 'REMAINING SPENDABLE ALLOWANCE',
      spentOf: 'spent of',
      spentPercentage: 'allowance',
      dailyPace: '/day for',
      daysLeft: 'days left',
      paceSerene: 'Peaceful Pace',
      paceSereneDesc: 'Your spending pace is in gentle harmony with your monthly budget.',
      paceWarning: 'Mindful Attention',
      paceWarningDesc: 'Your daily pace is projected to exceed allowance before month-end.',
      paceExceeded: 'Allowance Exceeded',
      paceExceededDesc: 'You have consumed the spendable allowance for this month.',
      guidanceNeedsDominant:
        'Your finances have a grounded foundation. Most resources are protecting essential needs.',
      guidanceWantsDominant:
        'A significant portion was dedicated to pleasures. Reflect gently on whether these brought lasting joy.',
      guidanceBalanced:
        'A balanced equilibrium between essentials for life and everyday pleasures.',
      statRemaining: 'Remaining',
      statSpent: 'Spent',
      statAllowance: 'Total Allowance',
      statDaily: 'Daily For',
      pillarsTitle: 'Pillar Allocation',
      pillarsEyebrow: 'THE FOUR PILLARS (四大費目)',
      learnPillars: 'Learn pillars',
      pctOfSpent: 'of spent',
      needsWantsTitle: 'Needs vs. Wants Equilibrium',
      needsWantsEyebrow: 'MINDFUL AWARENESS',
      ratioGrounded: 'Grounded & Mindful',
      ratioDiscretionary: 'High Discretionary',
      essentialNeeds: 'Essential Needs',
      wantsAndJoys: 'Wants & Joys',
      essentialsCount: (n) => `${n} essentials recorded`,
      pleasuresCount: (n) => `${n} discretionary pleasures`,
      monthlyIntention: 'MONTHLY INTENTION',
      noIntentionSet: 'No intention set yet. Set one in the Budget Plan tab.',
      editIntention: 'Edit',
      actionLog: 'Log an Expense',
      actionLogDesc: 'Record a purchase and pause to reflect on its pillar.',
      actionReflect: 'Reflect & Review',
      actionReflectDesc: 'Inspect your habits and answer the 3 journal questions.',
      recentTitle: 'Recent Logged Expenses',
      recentSubtitle: (n) => `${n} entries recorded this month.`,
      viewAll: (n) => `View & Filter All (${n})`,
    },
    track: {
      eyebrow: 'DAILY SPENDING JOURNAL',
      title: 'Track Expenses',
      subtitle: 'Pause, note your purchase with awareness, and carry on with clarity.',
      btnRecordNew: 'Record New Expense',
      spendableLeft: 'Spendable Left:',
      quickTitle: 'Quick Entry Form',
      quickSubtitle: 'Quickly append an entry directly into your ledger.',
      amount: 'Amount',
      date: 'Date',
      description: 'Description',
      descriptionPlaceholder: 'What was it for?',
      kindLegend: 'Kind:',
      addBtn: 'Add to Ledger',
      searchPlaceholder: 'Search by note, item or amount...',
      allPillars: 'All Pillars',
      allKinds: 'All',
      sortNewest: 'Newest First',
      sortOldest: 'Oldest First',
      sortHighest: 'Highest Amount',
      sortLowest: 'Lowest Amount',
      ledgerEntriesTitle: (n) => `Ledger Entries (${n})`,
      showingCount: (shown, total) => `Showing ${shown} of ${total} records.`,
      clearSamples: 'Clear samples',
      loadSamples: 'Load samples',
      exportCsv: 'CSV',
      emptySearch: 'No expenses match your search or filters.',
      resetFilters: 'Reset all filters',
      emptyZenTitle: 'A clean slate this month',
      emptyZenSubtitle:
        'Your ledger is clean and peaceful. Take a breath and log your first purchase whenever you are ready.',
      emptyZenLogFirst: 'Log first expense',
    },
    budget: {
      eyebrow: 'UPFRONT FINANCIAL PLANNING',
      title: 'Monthly Budget Architecture',
      subtitle:
        'In Kakeibo, you set aside your savings first. What remains is your peaceful, guilt-free spendable allowance.',
      eqIncome: 'Income',
      eqFixed: 'Fixed Bills',
      eqSavings: 'Savings Target',
      eqAllowance: 'Spendable Allowance',
      bucketTitle: 'The Income Allocation Stream',
      bucketSubtitle: 'See clearly how 100% of your income is distributed across your priorities.',
      bucketFixed: 'Fixed Commitments',
      bucketSavings: 'Upfront Savings',
      bucketSpendable: 'Spendable Allowance',
      incomeLabel: 'Monthly Take-Home Income',
      incomeSubnote: 'Salary, freelance earnings, or regular inflow',
      fixedLabel: 'Fixed Unavoidable Commitments',
      fixedSubnote: 'Rent/mortgage, insurance, loan payments, fixed utilities',
      savingsLabel: 'Upfront Savings Goal',
      savingsSubnote: 'The promise you make to your future peace',
      targetRateText: (rate) => `Target Savings Rate: ${rate}% of total income set aside upfront.`,
      intentionLabel: "This Month's Guiding Intention",
      intentionSubnote: 'A mindful theme for your choices and energy',
      intentionPlaceholder: 'e.g. Savor home-cooked meals, cultivate silence, invest in learning…',
      autoSaveNotice: 'Changes are automatically saved to your local storage.',
      pulseTitle: (m) => `Financial Pulse for ${m}`,
      pulseSubtitle: 'Real-time metrics calculated from your budget inputs and tracked expenses.',
      glanceTotal: 'TOTAL SPENDABLE',
      glanceSpent: 'ACTUAL SPENT',
      glanceBalance: 'CURRENT BALANCE',
      glanceDaily: 'RECOMMENDED / DAY',
    },
    reflect: {
      eyebrow: 'END-OF-MONTH CONTEMPLATION',
      title: 'Monthly Reflection (振り返り)',
      subtitle:
        "Kakeibo's true power lies here: looking back with gentle honesty, without shame or guilt.",
      achievedTitle: 'Savings Goal Honored!',
      reviewTitle: 'Month-in-Review Summary',
      summaryBanner: (count, spent, saved, goal) =>
        `You logged ${count} expenses totaling ${spent}. Your net estimated saved balance is ${saved} (Target was ${goal}).`,
      celebrateBtn: 'Celebrate 🎉',
      plannedSavings: 'PLANNED SAVINGS GOAL',
      actualSaved: 'ACTUAL ESTIMATED SAVED',
      blossomScaleTitle: 'Financial Peacefulness Scale',
      blossomScaleSub: 'How peaceful did you feel with your money choices this month?',
      hankoSealCompleted: 'Mindfully Reviewed',
      hankoSealSub: 'Monthly cycle seal (判子)',
      questionsTitle: 'The Three Mindful Questions',
      questionsSubtitle: 'Take five quiet minutes to write your responses below.',
      q1Title: '1. What choices went well this month?',
      q1Sub: 'Celebrations, mindful pauses, home cooking, or spending that brought genuine joy.',
      q1Placeholder: 'A mindful choice I feel peaceful about…',
      q2Title: '2. Where did I overspend or purchase mindlessly?',
      q2Sub: 'Notice without self-criticism: rushed takeout, impulse clicks, or ignored subscriptions.',
      q2Placeholder: 'A pattern I noticed, observed without judgment…',
      q3Title: '3. What is one concrete adjustment for next month?',
      q3Sub: 'A gentle, realistic step: prepare matcha at home, wait 24h on wants, or pack lunch twice a week.',
      q3Placeholder: 'One gentle habit I would like to cultivate…',
      footerWisdom: 'There is no failure in Kakeibo—only deeper awareness.',
      btnFinish: 'Complete Reflection',
    },
    history: {
      eyebrow: 'JOURNAL TIMELINE',
      title: 'Monthly History & Trends',
      subtitle: 'A panoramic view of your financial journey and mindful habits over time.',
      lifetimeSpent: 'LIFETIME DISCRETIONARY SPENDING',
      lifetimeSpentSub: (count) => `Tracked across ${count} monthly ledger entries.`,
      lifetimeSaved: 'CUMULATIVE ESTIMATED SAVINGS',
      lifetimeSavedSub: 'Income remaining after fixed bills and tracked spending.',
      panelTitle: 'Past & Active Ledgers',
      panelSubtitle: 'Click any month to inspect, edit, or reflect on that period.',
      activeMonthBadge: 'ACTIVE MONTH',
      recordBadge: 'LEDGER RECORD',
      openMonthBtn: 'Open Month',
      colSpent: 'SPENT',
      colAllowance: 'PLANNED ALLOWANCE',
      colSaved: 'ESTIMATED SAVED',
      colRate: 'SAVINGS RATE',
      entriesRecorded: (n) => `${n} entries recorded`,
      reflectionWritten: 'Reflection written',
    },
    expenseModal: {
      eyebrowAdd: 'RECORD SPENDING',
      eyebrowEdit: 'EDIT EXPENSE',
      titleAdd: 'Log a Mindful Expense',
      titleEdit: 'Adjust Expense Entry',
      pillarLabel: 'Select Kakeibo Pillar',
      pillarSublabel: 'Categorize into the 4 classic pillars',
      amountLabel: 'Amount',
      dateLabel: 'Date',
      descLabel: 'Description & Purpose',
      descPlaceholder: "e.g., Weekly farmer's market, Sencha tea, Book on Zen",
      kindLabel: 'Is this a Need or a Want?',
      kindSublabel: 'A core Kakeibo inquiry: was this essential for life, or a voluntary pleasure?',
      needBtn: 'Need (Essential)',
      wantBtn: 'Want (Optional Pleasure)',
      cancelBtn: 'Cancel',
      saveAddBtn: 'Confirm Expense',
      saveEditBtn: 'Save Changes',
    },
    guideModal: {
      eyebrow: 'THE PHILOSOPHY OF KAKEIBO (家計簿)',
      title: 'The Mindful Household Ledger',
      intro:
        "Invented in 1904 by Hani Motoko, Japan's first female journalist, Kakeibo teaches that financial peace comes not from restriction, but from awareness, intention, and gentle daily mindfulness.",
      stepsTitle: 'The Four Core Kakeibo Inquiries',
      s1Num: '01',
      s1Title: 'How much money do you have?',
      s1Desc:
        'Take your monthly take-home income and deduct your unavoidable fixed obligations (rent, insurance, utilities).',
      s2Num: '02',
      s2Title: 'How much would you like to save?',
      s2Desc:
        'Decide your savings goal at the beginning of the month, setting it aside immediately like an honored promise to your future self.',
      s3Num: '03',
      s3Title: 'How much are you spending?',
      s3Desc:
        'Track every expense under the Four Pillars, noting whether each was a true Need (Survival) or a Want (Joy/Comfort).',
      s4Num: '04',
      s4Title: 'How can you improve?',
      s4Desc:
        "At month's end, answer the 3 reflection prompts without harsh judgment to cultivate peaceful money habits.",
      pillarsTitle: 'The Four Pillars of Spending',
      rule24Title: 'The 24-Hour Rule for Wants',
      rule24Desc:
        'Whenever you feel tempted by a spontaneous non-essential item, wait 24 hours. If you still desire it and your remaining allowance supports it, buy it guilt-free!',
      understandBtn: "I Understand — Let's Practice",
    },
    pillars: {
      Survival: {
        name: 'Survival',
        note: 'Needs: Groceries, rent/mortgage, utilities, transport, medicine',
        examples: 'Supermarket, subway pass, pharmacy, gas, power bill',
      },
      Optional: {
        name: 'Optional',
        note: 'Wants: Dining out, takeout, cocktails, shopping, entertainment',
        examples: 'Cafes, takeout sushi, cinema, clothing, drinks with friends',
      },
      Culture: {
        name: 'Culture',
        note: 'Growth: Books, courses, museums, music, theater, self-cultivation',
        examples: 'Novels, online courses, museum admission, instruments, workshops',
      },
      Extra: {
        name: 'Extra',
        note: 'Unplanned: Emergencies, gifts, repairs, sudden seasonal fees',
        examples: 'Car repair, birthday gift, appliance fix, sudden clinic fee',
      },
    },
    kinds: {
      Need: 'Need',
      Want: 'Want',
    },
    notices: {
      logged: 'Expense logged mindfully.',
      updated: 'Expense updated successfully.',
      removed: 'Expense removed.',
      samplesCleared: 'Sample expenses cleared.',
      samplesLoaded: 'Sample journal reloaded.',
      backupDownloaded: 'JSON backup downloaded.',
      csvGenerated: 'CSV export generated.',
      restoredSuccess: 'Journal restored successfully!',
      restoreError: 'Could not import. Please select a valid Kakeibo JSON file.',
      reflectionSaved: 'Reflections recorded with gratitude.',
    },
    quotes: [
      {
        quote: 'Order in your finances brings peace to your mind and clarity to your days.',
        author: 'Hani Motoko, Creator of Kakeibo (1904)',
      },
      {
        quote:
          'Kakeibo is not about self-deprivation; it is about choosing spending that sparks true gratitude.',
        author: 'Japanese Mindfulness Principle',
      },
      {
        quote:
          'When you write an expense with your own hand, you pause to recognize what you value.',
        author: 'Kakeibo Tradition',
      },
      {
        quote: 'Spend with care, save with purpose, and live with tranquility.',
        author: 'Mindful Living Wisdom',
      },
    ],
  },
}
