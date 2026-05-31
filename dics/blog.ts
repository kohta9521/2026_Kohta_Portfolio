// ブログ（Journal）のコンテンツ。Messages とは独立させ、本文の量で
// en.ts / ja.ts を肥大化させない。/blogs と /blogs/[id] の両方がここを参照する。

export type BlogLang = "en" | "ja";

export interface BlogCategory {
  /** 表示用の連番 "1", "2"… */
  no: string;
  /** グルーピング用 ID（言語間で共通） */
  id: string;
  /** カテゴリ名 */
  label: string;
  /** 一覧でカテゴリ左に出す短い説明 */
  desc: string;
}

export interface BlogPost {
  /** スラッグ（言語間で共通・URL に使う） */
  id: string;
  /** 所属カテゴリの id */
  category: string;
  title: string;
  /** 一覧／記事冒頭のリード文 */
  excerpt: string;
  /** 表示用の年月 "2026.04" */
  date: string;
  /** ドットリーダー右端に出す目安文字数 "3.8K" */
  words: string;
  /** 本文（段落配列） */
  body: string[];
}

export interface BlogStrings {
  section: {
    no: string;
    kicker: string;
    version: string;
    title: string;
    progress: string;
    viewAll: string;
  };
  index: {
    kicker: string;
    title: string;
    intro: string;
    backHome: string;
    listLabel: string;
    gridLabel: string;
    nav: { label: string; href: string }[];
    stats: {
      finished: string;
      wordsPerChapter: string;
      imagesPerChapter: string;
      currentWords: string;
      estWords: string;
      currentImages: string;
    };
  };
  post: {
    backToList: string;
    prev: string;
    next: string;
    wordsLabel: string;
    author: string;
    brand: string;
    reading: string;
    contents: string;
    close: string;
  };
  categories: BlogCategory[];
  posts: BlogPost[];
}

const en: BlogStrings = {
  section: {
    no: "§ 03",
    kicker: "Journal",
    version: "v1.0",
    title: "Table of Contents.",
    progress: "PROGRESS · WORDS",
    viewAll: "Open the journal",
  },
  index: {
    kicker: "Journal",
    title: "Table of Contents.",
    intro:
      "Notes from the work — engineering, AI and FinTech, design, and the odd thing I learned the hard way. Mostly written for past-me.",
    backHome: "← Back home",
    listLabel: "List",
    gridLabel: "Grid",
    nav: [
      { label: "Contents", href: "/blogs" },
      { label: "Profile", href: "/" },
    ],
    stats: {
      finished: "Finished entries",
      wordsPerChapter: "Words / entry",
      imagesPerChapter: "Figures / entry",
      currentWords: "Current word count",
      estWords: "Est. word count",
      currentImages: "Current figure count",
    },
  },
  post: {
    backToList: "← All entries",
    prev: "Prev",
    next: "Next",
    wordsLabel: "WORDS",
    author: "KOHTA KOUCHI",
    brand: "JOURNAL",
    reading: "Reading size",
    contents: "Contents",
    close: "Close",
  },
  categories: [
    {
      no: "1",
      id: "engineering",
      label: "Engineering",
      desc: "Most constraints in software are downstream of decisions made years earlier. Notes on building anyway — and building well.",
    },
    {
      no: "2",
      id: "ai-fintech",
      label: "AI and FinTech",
      desc: "Where models meet money. What changes when the search engine summarises, and why trust is the real interface.",
    },
    {
      no: "3",
      id: "design-craft",
      label: "Design and Craft",
      desc: "Tools, taste and the things outside work that quietly make the work better.",
    },
  ],
  posts: [
    {
      id: "replatforming-without-stopping",
      category: "engineering",
      title: "Replatforming a core service without stopping the business",
      excerpt:
        "Rebuilding a live product from Laravel/Vue to Next.js/Go while it kept serving real users every day.",
      date: "2026.04",
      words: "3.8K",
      body: [
        "## The fear is the old stack, not the new one",
        "The scary part of a replatform is never the new stack — it's that the old one is still earning the company's money while you tear it apart. At Simple I rebuilt a job-change information site from Laravel and Vue.js onto TypeScript, Next.js, Tailwind, Go and AWS, and the one rule that mattered was: the business never feels it.",
        "## Route by route, never big-bang",
        "We moved route by route rather than big-bang. Each page got rebuilt behind the same URLs, shipped to a fraction of traffic, compared against the old output, then ramped. Boring on purpose. The interesting decisions were about where to draw the seam between old and new so the two could coexist for months without turning into a tangle.",
        "## The migration plan is the product",
        "What I took away: the migration plan is a product in itself. If you can't explain the rollback in one sentence, you're not ready to ship the step.",
      ],
    },
    {
      id: "typescript-end-to-end",
      category: "engineering",
      title: "Going TypeScript end to end",
      excerpt:
        "Why I standardise the whole codebase on types — and what it actually buys a small team.",
      date: "2026.02",
      words: "2.6K",
      body: [
        "Types aren't about catching typos. The real win is that they turn a refactor from an act of courage into a chore the compiler walks you through. On a small team that difference is the difference between shipping and stalling.",
        "When I standardised Simple's codebase on TypeScript during the migration, the payoff wasn't fewer bugs in week one — it was that six months later a new contributor could rename a field and trust the red squiggles to find every caller.",
        "The cost is real: stricter code is slower to write the first time. I pay it anyway, because most code is read and changed far more than it's written.",
      ],
    },
    {
      id: "understanding-rust-ownership",
      category: "engineering",
      title: "Understanding Rust's ownership and borrowing",
      excerpt:
        "The one feature that sets Rust apart — memory safety with no garbage collector, enforced at compile time.",
      date: "2026.02",
      words: "3.2K",
      body: [
        "What sets Rust apart from most languages is its ownership system: it guarantees memory safety at compile time, with no garbage collector running underneath. The whole model rests on three rules. First, every value has exactly one owner — assign a String to another variable and ownership moves to it, leaving the original invalid. These move semantics are what stop two parts of your program from owning the same memory.",
        "The second rule: when an owner goes out of scope, its value is dropped automatically. Leave a function or a block and the memory is freed for you — no manual free(), no leaks. The third: passing a value into a function moves ownership into that function, so it's always unambiguous who is responsible for a value.",
        "Ownership alone would make sharing painful, so Rust adds borrowing. An immutable borrow (&) lends a value out read-only — the borrower can read but not mutate — which lets many readers hold a reference at once while the owner keeps ownership. A mutable borrow (&mut) is for when the borrower genuinely needs to change the value, like pushing onto a String.",
        "The rule that ties it together: you can't mix immutable and mutable borrows. At any moment you may have any number of immutable borrows, or exactly one mutable borrow — never both. That single constraint is what makes data races impossible. Since Rust 2018, Non-Lexical Lifetimes make this ergonomic: a borrow lasts only until its last use, not until the end of the lexical scope, so you can start a new borrow sooner.",
        "When the compiler can't infer how long a reference stays valid, you annotate lifetimes explicitly (the 'a syntax) — a function that takes two references and returns one has to say which input the result lives as long as. The compiler also kills dangling references outright: try to return a reference to a value that's about to leave scope and it won't compile — move ownership out instead. And reach for borrowing over clone(): cloning copies, which costs; borrowing just hands over a reference.",
        "Internalise these rules and you get memory safety, GC-free performance, thread safety and explicit control all at once. They feel strict at first, but the compiler is really just walking you through decisions you'd have had to make anyway — and catching the bugs before they ship.",
      ],
    },
    {
      id: "npm-vs-npx",
      category: "engineering",
      title: "Can you explain the difference between npm and npx?",
      excerpt:
        "I kept typing both to spin up localhost without really knowing why — so I dug in.",
      date: "2026.02",
      words: "1.6K",
      body: [
        "While learning front-end development at university, I kept reaching for both npm and npx to spin up a localhost without ever being able to say what actually separated them. That nagging gap felt worth closing, so I sat down and worked it out properly.",
        "npm — node package manager — ships with Node.js and manages your dependencies: the packages a project depends on, tracked and installed into the node_modules folder. It's the thing that turns a package.json into a working set of libraries on disk.",
        "npx — node package executer, bundled since npm 5.2.0 — runs packages. Its trick is that it can execute a package you haven't installed: it finds it, installs it, runs it, then cleans up after itself. So instead of adding a tool to package.json's scripts or going through node_modules/.bin, you just run something like `npx vue create my-app` and npx resolves the dependencies for you on the spot.",
        "Worth a mention alongside them is yarn, the JavaScript package manager Facebook released in 2016 — an alternative to npm that installs faster and pins versions more strictly.",
        "The real takeaway wasn't the definitions. It was that questioning a command I used on autopilot every day led me to actually understand the machinery underneath it — and that's a habit I want to keep: when a line of 'boilerplate' makes me wonder, go look it up.",
      ],
    },
    {
      id: "what-geo-actually-is",
      category: "ai-fintech",
      title: "What generative engine optimisation actually is",
      excerpt:
        "GEO isn't SEO with a new coat of paint. It's about being legible to a model that summarises instead of links.",
      date: "2026.05",
      words: "4.1K",
      body: [
        "Classic SEO optimises to be the link someone clicks. GEO optimises to be the sentence a model writes when it answers on your behalf. The unit of visibility changed from a ranked page to a claim the model is willing to repeat.",
        "At QueryLift this reframes the whole problem. We measure whether a brand shows up in generated answers, in what framing, and against which competitors — then trace why. The hard part is that the surface is non-deterministic: the same question gives different answers, so you measure distributions, not positions.",
        "My working belief: the brands that win the GEO era are the ones whose facts are structured, consistent, and easy for a model to ground in. Be the source that's safe to quote.",
      ],
    },
    {
      id: "shipping-a-currency",
      category: "ai-fintech",
      title: "What shipping a new currency taught me about product",
      excerpt:
        "Working as a PdM on a Mercoin launch — where the hardest design problem was trust, not UI.",
      date: "2025.05",
      words: "3.2K",
      body: [
        "At Mercari's FinTech arm, Mercoin, I owned the launch flow for a new currency — how it was explained to customers, the landing page design and build, and the release itself. In FinTech the interface is the easy part; the product is trust.",
        "Every screen is a small contract. A number in the wrong place, a word that overpromises, a flow that hides a fee — each one quietly spends credibility you can't easily earn back. So the work was less 'make it pretty' and more 'make every claim true and obvious'.",
        "The lesson stuck: in money products, clarity is the feature. If a user has to wonder what just happened, you've already shipped a bug.",
      ],
    },
    {
      id: "design-system-of-one",
      category: "design-craft",
      title: "Building a design system as a team of one",
      excerpt:
        "Tokens, components and discipline when you're the designer, the engineer and the reviewer all at once.",
      date: "2026.03",
      words: "2.9K",
      body: [
        "A design system for one person sounds like overkill until you realise future-you is a different, forgetful collaborator. At Noahloy I built one from tokens up — colour, type, spacing — so that decisions made once didn't have to be re-litigated every screen.",
        "The trick when you wear every hat is to externalise judgement into constraints. If the spacing scale only has six steps, you stop agonising over 13px versus 14px. The system isn't bureaucracy; it's a way to stop spending willpower on settled questions.",
        "Done right, it also makes the handoff to a future teammate trivial — because the rules live in the code, not in my head.",
      ],
    },
    {
      id: "where-law-meets-engineering",
      category: "design-craft",
      title: "Where law and engineering overlap",
      excerpt:
        "Two fields that feel worlds apart, and the surprisingly large surface where they meet.",
      date: "2026.01",
      words: "2.3K",
      body: [
        "People assume law and engineering are opposites — one all precedent and prose, the other all logic and code. Spend time in both and the line blurs. A statute is a spec with edge cases; a contract is an API with a dispute-resolution clause.",
        "Studying payment-services and financial-instruments law alongside building FinTech products, I keep finding the same skill underneath: read the rules precisely, find where they're ambiguous, and design so the ambiguity can't hurt you.",
        "That overlap is most of why I do both. The combination is rarer than either alone, and in FinTech it's exactly the seam where the interesting work lives.",
      ],
    },
    {
      id: "what-djing-taught-me",
      category: "design-craft",
      title: "What DJing taught me about shipping",
      excerpt:
        "Off the clock it's all music. Turns out reading a room and reading a release have a lot in common.",
      date: "2025.11",
      words: "1.8K",
      body: [
        "When I'm not building, I'm DJing or making videos. For a while I thought of it as the opposite of work — pure feel against pure logic. Then I noticed I was using the same muscle.",
        "A set is a release plan: you read the room, you sequence the energy, you don't drop the biggest track in the first ten minutes. Ship too much too fast and you lose people; hold back forever and the night dies. Pacing is the whole craft.",
        "Same instinct, different medium: figure out how it works, then make something people actually feel.",
      ],
    },
  ],
};

const ja: BlogStrings = {
  section: {
    no: "§ 03",
    kicker: "ジャーナル",
    version: "v1.0",
    title: "Table of Contents.",
    progress: "PROGRESS · WORDS",
    viewAll: "ジャーナルを開く",
  },
  index: {
    kicker: "ジャーナル",
    title: "Table of Contents.",
    intro:
      "仕事のなかで考えたこと——エンジニアリング、AI と FinTech、デザイン、そして痛い目を見て学んだ諸々。だいたい過去の自分に向けて書いている。",
    backHome: "← ホームに戻る",
    listLabel: "リスト",
    gridLabel: "グリッド",
    nav: [
      { label: "目次", href: "/blogs" },
      { label: "プロフィール", href: "/" },
    ],
    stats: {
      finished: "公開済みの記事",
      wordsPerChapter: "文字数 / 記事",
      imagesPerChapter: "図版 / 記事",
      currentWords: "現在の総文字数",
      estWords: "想定の総文字数",
      currentImages: "現在の図版数",
    },
  },
  post: {
    backToList: "← 一覧へ",
    prev: "前へ",
    next: "次へ",
    wordsLabel: "WORDS",
    author: "KOHTA KOUCHI",
    brand: "JOURNAL",
    reading: "文字サイズ",
    contents: "目次",
    close: "閉じる",
  },
  categories: [
    {
      no: "1",
      id: "engineering",
      label: "エンジニアリング",
      desc: "ソフトウェアの制約の多くは、何年も前の決定の下流にある。それでも、ちゃんと作るための覚書。",
    },
    {
      no: "2",
      id: "ai-fintech",
      label: "AI と FinTech",
      desc: "モデルとお金が交わる場所。検索が「要約」になったとき何が変わるのか。そして信頼こそが本当のインターフェースだという話。",
    },
    {
      no: "3",
      id: "design-craft",
      label: "デザインとものづくり",
      desc: "道具と美意識、そして仕事の外にある、仕事を静かに良くしてくれるもの。",
    },
  ],
  posts: [
    {
      id: "replatforming-without-stopping",
      category: "engineering",
      title: "事業を止めずに基幹サービスをフルリプレイスする",
      excerpt:
        "毎日ユーザーが使い続けている本番サービスを、Laravel/Vue から Next.js/Go へ作り替えた話。",
      date: "2026.04",
      words: "3.8K",
      body: [
        "## 怖いのは旧スタックの方だ",
        "リプレイスで怖いのは新しい技術スタックではない。壊している最中も、古い方が会社の売上を稼ぎ続けているという事実だ。Simple では転職情報サイトを Laravel・Vue.js から TypeScript・Next.js・Tailwind・Go・AWS へ刷新したが、守るべきルールはただ一つ——事業側に絶対に気づかれないこと、だった。",
        "## ビッグバンではなくルート単位で",
        "ビッグバンではなく、ルート単位で移していった。各ページを同じ URL の裏で作り直し、一部のトラフィックにだけ出し、旧出力と突き合わせ、問題なければ比率を上げる。意図的に退屈な進め方だ。面白い判断は、新旧が何ヶ月も共存しても破綻しないよう、どこに継ぎ目を引くかにあった。",
        "## 移行計画こそがプロダクト",
        "学びはこうだ。移行計画それ自体が一つのプロダクトだ。ロールバックを一文で説明できないなら、そのステップはまだ出す準備ができていない。",
      ],
    },
    {
      id: "typescript-end-to-end",
      category: "engineering",
      title: "コードベースを端から端まで TypeScript にする",
      excerpt:
        "なぜ全体を型で固めるのか。小さなチームにとって、それが実際に何を買ってくれるのか。",
      date: "2026.02",
      words: "2.6K",
      body: [
        "型はタイプミスを潰すためのものではない。本当の価値は、リファクタリングを「勇気のいる行為」から「コンパイラが手を引いてくれる作業」に変えてくれることだ。少人数のチームでは、この差がそのまま「出せるか/止まるか」の差になる。",
        "Simple の移行で全体を TypeScript に統一したとき、効いてきたのは初週のバグの少なさではない。半年後、新しく入った人がフィールド名を変えても、赤い波線が呼び出し元を全部見つけてくれると信頼できたことだ。",
        "コストは確かにある。厳密なコードは最初に書くのが遅い。それでも払う。コードは書かれる回数より、読まれて変更される回数の方がずっと多いからだ。",
      ],
    },
    {
      id: "understanding-rust-ownership",
      category: "engineering",
      title: "Rustの所有権と借用を理解する",
      excerpt:
        "Rustを他の言語と分けている最大の特徴——ガベージコレクションなしで、コンパイル時にメモリ安全性を保証する仕組み。",
      date: "2026.02",
      words: "3.2K",
      body: [
        "Rustが他の多くの言語と違う最大の特徴は、その所有権システムだ。ガベージコレクションを動かすことなく、コンパイル時にメモリ安全性を保証する。仕組みは三つのルールに集約される。まず、すべての値はただ一人のオーナーを持つ。String を別の変数に代入すると所有権がそちらへ移動（ムーブ）し、元の変数は無効になる。このムーブセマンティクスが、同じメモリを二箇所から所有してしまう事故を防ぐ。",
        "二つ目のルール。オーナーがスコープを抜けると、その値は自動的にドロップ（解放）される。関数やブロックを出れば、メモリは勝手に片付く——手動の free() も、リークもない。三つ目。値を関数に渡すと、所有権はその関数へ移動する。だから「いま誰がこの値に責任を持っているか」が常に曖昧にならない。",
        "所有権だけだと値の共有がつらいので、Rust には借用がある。不変借用（&）は値を読み取り専用で貸し出す——借り手は読めるが変更はできない——ので、オーナーが所有権を保ったまま複数の読み手が同時に参照できる。可変借用（&mut）は、借り手が本当に値を書き換える必要があるとき、たとえば String に文字列を追加するようなときに使う。",
        "全体を縛るルールはこれだ。不変借用と可変借用は混在できない。任意の時点で、複数の不変借用か、ただ一つの可変借用か、どちらか一方しか成立しない。このたった一つの制約が、データ競合を原理的に不可能にする。Rust 2018 以降の Non-Lexical Lifetimes のおかげで、借用の有効範囲は「最後に使われたところまで」になり、レキシカルなスコープの終わりを待たずに次の借用を始められる。",
        "コンパイラが参照の有効期間を推論できないときは、ライフタイム（'a）で明示する。たとえば二つの参照を受け取って一つを返す関数は、戻り値がどちらの入力と同じ期間生きるのかを書く必要がある。ダングリング参照もコンパイラが許さない。スコープを抜ける値への参照を返そうとすればコンパイルエラーになり、代わりに所有権ごと返すことになる。そして clone() より借用を選ぶこと。クローンは複製なのでコストがかかるが、借用は参照を渡すだけだ。",
        "これらのルールが身体に入ると、メモリ安全性・GC不要のパフォーマンス・スレッド安全性・明示的なメモリ管理が一度に手に入る。最初は窮屈に感じるが、コンパイラは結局のところ、どのみち下さなければいけない判断を一緒に歩いてくれて、しかもバグを出荷前に捕まえてくれているだけなのだ。",
      ],
    },
    {
      id: "npm-vs-npx",
      category: "engineering",
      title: "npmとnpxの違い、説明できますか？",
      excerpt:
        "localhost を立てるのに両方なんとなく打っていた。だから、ちゃんと調べてみた。",
      date: "2026.02",
      words: "1.6K",
      body: [
        "大学に通いながらフロントエンド開発を学んでいて、localhost を立てるたびに npm と npx を両方なんとなく打っていた。でも、その違いを自分の言葉で説明できない。その引っかかりを放っておけなくて、きちんと調べ直すことにした。",
        "npm は node package manager の略で、Node.js をインストールすると使えるようになるパッケージ管理ツールだ。プロジェクトが依存するパッケージを管理し、node_modules フォルダにインストールする。package.json を、ディスク上の実際に動くライブラリ群に変えてくれる存在だと言っていい。",
        "npx は node package executer の略で、npm 5.2.0 から同梱されている。最大の特徴は、インストールしていないパッケージでも実行できることだ。探してきて、インストールして、実行し、後片付けまでしてくれる。だから package.json の scripts に書いたり node_modules/.bin を経由したりしなくても、`npx vue create プロジェクト名` のように直接実行でき、依存関係はその場で解決される。",
        "あわせて触れておくと、yarn は Facebook が 2016 年に公開した JavaScript のパッケージマネージャで、npm より高速で、バージョン指定がより厳密という利点がある。",
        "本当の収穫は定義そのものではなかった。毎日オートパイロットで打っていたコマンドを疑ってみたら、その裏側の仕組みをちゃんと理解できた——という体験のほうだ。これからも、引っかかった「お決まりのコード」は面倒がらずに調べにいく。そういう姿勢を持ち続けたい。",
      ],
    },
    {
      id: "what-geo-actually-is",
      category: "ai-fintech",
      title: "GEO（生成エンジン最適化）とは結局なんなのか",
      excerpt:
        "GEO は SEO の塗り替えではない。リンクではなく要約を返すモデルにとって「読める」存在になる、という話。",
      date: "2026.05",
      words: "4.1K",
      body: [
        "従来の SEO は「クリックされるリンク」になるための最適化だ。GEO は、モデルがあなたの代わりに答えるときに「書く一文」になるための最適化だ。可視性の単位が、順位のついたページから、モデルが繰り返してくれる主張へと変わった。",
        "QueryLift ではこの捉え直しが問題のすべてを変える。あるブランドが生成された回答に登場するか、どんな文脈で、どの競合と並べて語られるかを測り、その理由まで辿る。難しいのは、対象が非決定的なことだ。同じ問いでも答えが変わるので、順位ではなく分布を測ることになる。",
        "今の持論はこうだ。GEO 時代に勝つのは、事実が構造化され、一貫していて、モデルが根拠にしやすいブランドだ。引用しても安全な情報源になること。",
      ],
    },
    {
      id: "shipping-a-currency",
      category: "ai-fintech",
      title: "新規通貨のリリースがプロダクトについて教えてくれたこと",
      excerpt:
        "メルコインで PdM として関わった話。いちばん難しいデザイン課題は UI ではなく「信頼」だった。",
      date: "2025.05",
      words: "3.2K",
      body: [
        "メルカリの FinTech 部門メルコインで、新規通貨リリースの一連を担当した。お客様への見せ方、LP のデザインと実装、そしてリリースそのもの。FinTech では UI は簡単な方で、プロダクトの本体は信頼だ。",
        "どの画面も小さな契約書だ。数字が一つ違う場所にある、言葉が約束しすぎている、フローが手数料を隠している——その一つひとつが、簡単には取り戻せない信用を静かに削っていく。だから仕事は「綺麗にする」より「すべての主張を、正しく・明白にする」だった。",
        "残った教訓。お金のプロダクトでは、明快さこそが機能だ。ユーザーが「今なにが起きた？」と一瞬でも迷ったら、それはもうバグを出している。",
      ],
    },
    {
      id: "design-system-of-one",
      category: "design-craft",
      title: "一人チームでデザインシステムをつくる",
      excerpt:
        "デザイナーでありエンジニアでありレビュアーでもある一人が、トークンとコンポーネントと規律をどう扱うか。",
      date: "2026.03",
      words: "2.9K",
      body: [
        "一人のためのデザインシステムなんて大げさに聞こえる。でも「未来の自分」は別人で、しかも忘れっぽい協力者だと気づくと話が変わる。Noahloy では色・タイポ・余白といったトークンから組み上げ、一度した判断を画面ごとに蒸し返さずに済むようにした。",
        "全部の役割を兼ねるときのコツは、判断を制約に外出しすることだ。余白のスケールが6段階しかなければ、13px か 14px かで悩まなくなる。システムは官僚主義ではなく、決着済みの問いに意志力を使わないための仕組みだ。",
        "うまく作れば、将来チームメンバーへの引き継ぎも簡単になる。ルールが自分の頭の中ではなく、コードの中に住んでいるからだ。",
      ],
    },
    {
      id: "where-law-meets-engineering",
      category: "design-craft",
      title: "法律とエンジニアリングが重なるところ",
      excerpt: "一見すると遠い二つの分野。けれど、その接地面は意外なほど広い。",
      date: "2026.01",
      words: "2.3K",
      body: [
        "法律とエンジニアリングは正反対だと思われがちだ。一方は判例と散文、もう一方は論理とコード。だが両方に身を置くと境界は溶ける。法令はエッジケース付きの仕様書だし、契約書は紛争解決条項のついた API だ。",
        "資金決済法や金融商品取引法を学びながら FinTech プロダクトを作っていると、根っこにいつも同じ技能があると気づく。ルールを精確に読み、どこが曖昧かを見つけ、その曖昧さに刺されないよう設計すること。",
        "この重なりが、自分が両方をやる理由のほとんどだ。組み合わせは単体よりずっと希少で、FinTech ではまさにその継ぎ目に面白い仕事がある。",
      ],
    },
    {
      id: "what-djing-taught-me",
      category: "design-craft",
      title: "DJ がリリースについて教えてくれたこと",
      excerpt:
        "仕事を離れれば音楽漬け。フロアを読むことと、リリースを読むことは、案外よく似ていた。",
      date: "2025.11",
      words: "1.8K",
      body: [
        "作っていないときは DJ をしたり映像を作ったりしている。しばらくは仕事の対極——純粋な感覚 対 純粋な論理——だと思っていた。でもある時、同じ筋肉を使っていると気づいた。",
        "セットはリリース計画だ。フロアを読み、エネルギーの並びを設計し、いちばん大きい曲を最初の10分で落としたりしない。出しすぎれば人は離れ、出し惜しめば夜は死ぬ。ペース配分こそが全てだ。",
        "同じ衝動、違う媒体。仕組みを解き明かして、人が本当に「感じる」ものを作る。それだけだ。",
      ],
    },
  ],
};

export const blogContent: Record<BlogLang, BlogStrings> = { en, ja };

export function getBlog(lang: BlogLang): BlogStrings {
  return blogContent[lang];
}

export function getPost(lang: BlogLang, id: string): BlogPost | undefined {
  return blogContent[lang].posts.find((p) => p.id === id);
}

/** 全言語共通のスラッグ一覧（generateStaticParams 用） */
export function allPostIds(): string[] {
  return blogContent.en.posts.map((p) => p.id);
}

// 各記事のサムネ／図版。透過背景・アクセントカラーの図版を id 順に巡回で割り当てる。
const FIGURES = [
  "/svg/FIG_004_spline.svg",
  "/svg/FIG_020_neural.svg",
  "/svg/FIG_011_pcb.svg",
  "/svg/FIG_015_pipeline.svg",
  "/svg/FIG_006_graph.svg",
  "/svg/FIG_013_timing.svg",
  "/svg/FIG_018_voxel.svg",
  "/svg/FIG_010_conv.svg",
];

/** 記事スラッグから決定的に図版を選ぶ（言語間で一致させるため id ベース） */
export function postFigure(id: string): string {
  const i = blogContent.en.posts.findIndex((p) => p.id === id);
  return FIGURES[(i < 0 ? 0 : i) % FIGURES.length];
}

/** "3.8K" のような表記を数値(語数)に。"K"=千。 */
function wordsToNumber(w: string): number {
  const m = w.trim().match(/^([\d.]+)\s*[kK]?$/);
  if (!m) return 0;
  const n = parseFloat(m[1]);
  return /[kK]/.test(w) ? Math.round(n * 1000) : Math.round(n);
}

function fmtK(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

export interface BlogStats {
  finished: string; // "7 / 12"
  wordsPerChapter: string;
  imagesPerChapter: string;
  currentWords: string;
  estWords: string;
  currentImages: string;
}

/** 一覧上部に出すメタ統計。データから決定的に算出する。 */
export function blogStats(lang: BlogLang): BlogStats {
  const posts = blogContent[lang].posts;
  const total = posts.reduce((s, p) => s + wordsToNumber(p.words), 0);
  const count = posts.length || 1;
  const planned = count + 5; // 「これから書く予定」を少し上乗せ
  const imagesPer = 6;
  return {
    finished: `${posts.length} / ${planned}`,
    wordsPerChapter: fmtK(Math.round(total / count)),
    imagesPerChapter: String(imagesPer),
    currentWords: fmtK(total),
    estWords: fmtK(Math.round((total / count) * planned)),
    currentImages: String(posts.length * imagesPer),
  };
}
