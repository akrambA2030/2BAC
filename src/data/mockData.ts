export const SUBJECTS = [
  {
    id: "maths",
    name: "Mathématiques",
    icon: "Calculator",
    color: "bg-blue-500",
    branches: ["Sciences Mathématiques", "Sciences Physiques", "SVT"],
    description: "Analyse, Algèbre, Géométrie et Probabilités."
  },
  {
    id: "pc",
    name: "Physique-Chimie",
    icon: "Zap",
    color: "bg-orange-500",
    branches: ["Sciences Mathématiques", "Sciences Physiques", "SVT"],
    description: "Mécanique, Électricité, Nucléaire et Chimie organique."
  },
  {
    id: "svt",
    name: "SVT",
    icon: "Leaf",
    color: "bg-green-500",
    branches: ["Sciences Physiques", "SVT"],
    description: "Géologie, Consommation de la matière organique et flux d'énergie."
  },
  {
    id: "philo",
    name: "Philosophie",
    icon: "BookOpen",
    color: "bg-purple-500",
    branches: ["All"],
    description: "La Condition Humaine, La Connaissance, La Politique et La Morale."
  },
  {
    id: "english",
    name: "Anglais",
    icon: "Languages",
    color: "bg-red-500",
    branches: ["All"],
    description: "Vocabulary, Grammar, Reading and Writing."
  },
  {
    id: "arabe",
    name: "Arabe",
    icon: "Type",
    color: "bg-emerald-500",
    branches: ["All"],
    description: "Littérature, Analyse de textes et Production écrite."
  }
];

export const LESSONS = {
  "maths": [
    {
      id: "maths-1",
      title: "Continuité d'une fonction numérique",
      summary: "Étude de la continuité en un point, sur un intervalle, et théorème des valeurs intermédiaires.",
      content: "## I. Continuité en un point\n\nUne fonction $f$ est continue en un point $a$ si $\\lim_{x \\to a} f(x) = f(a)$.\n\n## II. Continuité sur un intervalle\n\nUne fonction est continue sur un intervalle $I$ si elle est continue en tout point de $I$. Les fonctions polynômes sont continues sur $\\mathbb{R}$.\n\n## III. Théorème des Valeurs Intermédiaires (TVI)\n\nSi $f$ est continue sur $[a,b]$, alors pour tout réel $k$ compris entre $f(a)$ et $f(b)$, il existe au moins un réel $c$ dans $[a,b]$ tel que $f(c)=k$.",
      order: 1
    },
    {
      id: "maths-2",
      title: "Dérivabilité et étude de fonctions",
      summary: "Calcul des dérivées, sens des variations, et points d'inflexion.",
      content: "## I. Dérivabilité\n\nUne fonction $f$ est dérivable en $a$ si le taux d'accroissement admet une limite finie en $a$.\n\n## II. Sens de variation\n\n- Si $f'(x) > 0$, alors $f$ est strictement croissante.\n- Si $f'(x) < 0$, alors $f$ est strictement décroissante.",
      order: 2
    },
    {
      id: "maths-3",
      title: "Suites numériques",
      summary: "Suites arithmétiques, géométriques, convergence et limites.",
      content: "## I. Suites Arithmétiques\n\n$u_{n+1} = u_n + r$. Le terme général est $u_n = u_p + (n-p)r$.\n\n## II. Suites Géométriques\n\n$v_{n+1} = q \\times v_n$. Le terme général est $v_n = v_p \\times q^{n-p}$.",
      order: 3
    }
  ],
  "pc": [
    {
      id: "pc-1",
      title: "Ondes mécaniques progressives",
      summary: "Phénomènes de propagation, célérité et retard.",
      content: "## I. Définition\n\nUne onde mécanique est le phénomène de propagation d'une perturbation dans un milieu matériel sans transport de matière mais avec transport d'énergie.\n\n## II. Ondes transversales et longitudinales\n\n- **Transversale**: La perturbation est perpendiculaire à la direction de propagation.\n- **Longitudinale**: La perturbation est parallèle à la direction de propagation.",
      order: 1
    }
  ],
  "svt": [
    {
      id: "svt-1",
      title: "Libération de l'énergie stockée dans la matière organique",
      summary: "Respiration et Fermentation au niveau cellulaire.",
      content: "## I. La Gylcolyse\n\nÉtape commune à la respiration et à la fermentation, se déroule dans l'hyaloplasme.\n\n## II. La Respiration Cellulaire\n\nCycle de Krebs et phosphorylation oxydative dans la mitochondrie. Bilan énergétique : 38 ATP.",
      order: 1
    }
  ],
  "philo": [
    {
      id: "philo-1",
      title: "La Personne",
      summary: "Identité, Valeur et Liberté de la personne.",
      content: "## I. La personne et l'identité\n\nQu'est-ce qui fait l'identité d'un sujet ? Est-ce la conscience (Descartes), la mémoire (Locke) ou le corps ?",
      order: 1
    }
  ]
};

export const EXAMS = [
  {
    id: "nat-2023-maths",
    subjectId: "maths",
    year: 2023,
    session: "Normale",
    branch: "Sciences Physiques",
    title: "National 2023 - Maths (SP)"
  },
  {
    id: "nat-2022-maths",
    subjectId: "maths",
    year: 2022,
    session: "Normale",
    branch: "Sciences Physiques",
    title: "National 2022 - Maths (SP)"
  }
];
