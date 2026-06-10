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
      "仕事や勉強のなかで考えたことを書いています。エンジニアリング、AI と FinTech、デザイン、それから失敗から学んだこと。たいていは、少し前の自分に向けたメモのつもりです。",
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
      desc: "コードを書きながら気づいたことや、つまずいて学んだことのメモ。ちゃんと動くものを、ちゃんと作るために。",
    },
    {
      no: "2",
      id: "ai-fintech",
      label: "AI と FinTech",
      desc: "AI とお金が交わる領域について。検索が「要約」に変わるとき何が起きるのか、お金のプロダクトで信頼をどう設計するのか、といったこと。",
    },
    {
      no: "3",
      id: "design-craft",
      label: "デザインとものづくり",
      desc: "道具やデザインのこと。それから、仕事の外にあって巡り巡って仕事を助けてくれるものについて。",
    },
  ],
  posts: [
    {
      id: "replatforming-without-stopping",
      category: "engineering",
      title: "事業を止めずに基幹サービスをフルリプレイスする",
      excerpt:
        "毎日ユーザーが使っている本番サービスを、止めずに Laravel/Vue から Next.js/Go へ作り替えたときの話です。",
      date: "2026.04",
      words: "3.8K",
      body: [
        "## 怖いのは、新しい技術より古い方",
        "リプレイスで本当に怖いのは、新しい技術スタックではありません。作り替えている最中も、古いシステムが会社の売上を支え続けている——そこが一番怖いところです。Simple では転職情報サイトを Laravel・Vue.js から TypeScript・Next.js・Tailwind・Go・AWS へ刷新しましたが、守るべき条件はひとつだけ。事業側に移行を気づかせないこと、でした。",
        "## 一気にではなく、ルート単位で",
        "一気に切り替えるのではなく、ルート単位で少しずつ移していきました。各ページを同じ URL の裏側で作り直し、まず一部のトラフィックにだけ出して、旧画面の出力と突き合わせ、問題がなければ比率を上げていく。地味で退屈なやり方ですが、それが正解でした。考えどころは、新旧が何ヶ月も共存しても壊れないように、どこで境界を切るかでした。",
        "## 移行計画そのものがプロダクト",
        "やってみて学んだのは、移行計画それ自体がひとつのプロダクトだということです。「うまくいかなかったらどう戻すか」を一言で説明できないなら、そのステップはまだ出すには早い。そう考えるようになりました。",
      ],
    },
    {
      id: "typescript-end-to-end",
      category: "engineering",
      title: "コードベースを端から端まで TypeScript にする",
      excerpt:
        "なぜコードベース全体を型で固めるのか。小さなチームにとって、それが実際に何の役に立つのかを書きました。",
      date: "2026.02",
      words: "2.6K",
      body: [
        "型の本当の価値は、タイプミスを防ぐことではないと思っています。いちばん効くのは、リファクタリングが「勇気のいる作業」から「コンパイラが手伝ってくれる作業」に変わることです。少人数のチームだと、この差がそのまま「リリースできるか、止まってしまうか」の差になります。",
        "Simple の移行でコード全体を TypeScript に揃えたとき、効いてきたのは最初の週のバグの少なさではありませんでした。半年後、新しく入ったメンバーがフィールド名を変えても、赤い波線が呼び出し元を全部見つけてくれる——そう信頼できたことのほうが、ずっと大きかったです。",
        "もちろんコストはあります。型をきちんと書くぶん、最初は遅くなります。それでも払う価値はあると思っています。コードは書く回数より、あとから読まれて直される回数のほうがずっと多いからです。",
      ],
    },
    {
      id: "understanding-rust-ownership",
      category: "engineering",
      title: "Rustの所有権と借用を理解する",
      excerpt:
        "Rust を他の言語と分けている最大の特徴。ガベージコレクションなしで、コンパイル時にメモリ安全性を保証する仕組みを整理しました。",
      date: "2026.02",
      words: "3.2K",
      body: [
        "Rust が他の多くの言語と違う最大の特徴は、所有権システムです。ガベージコレクションを動かさずに、コンパイル時点でメモリ安全性を保証してくれます。仕組みは大きく三つのルールに集約されます。まず、すべての値はただ一人のオーナーを持ちます。String を別の変数に代入すると所有権がそちらへ移動（ムーブ）し、元の変数は使えなくなります。このムーブセマンティクスのおかげで、同じメモリを二箇所から所有してしまう事故が防げます。",
        "二つ目のルールは、オーナーがスコープを抜けると、その値が自動的にドロップ（解放）されることです。関数やブロックを出れば、メモリは自動で片付きます。手動の free() も、メモリリークもありません。三つ目は、値を関数に渡すと所有権がその関数へ移動すること。だから「いま誰がこの値に責任を持っているか」が曖昧になりません。",
        "所有権だけだと値の共有がしづらいので、Rust には借用があります。不変借用（&）は値を読み取り専用で貸し出すもので、借り手は読めますが変更はできません。オーナーが所有権を保ったまま、複数の読み手が同時に参照できます。可変借用（&mut）は、借り手が実際に値を書き換える必要があるとき——たとえば String に文字列を追加するようなとき——に使います。",
        "全体を縛るルールはシンプルです。不変借用と可変借用は同時に存在できません。ある時点で成立するのは、複数の不変借用か、ただ一つの可変借用か、どちらか一方だけ。このたった一つの制約が、データ競合を原理的に起こせなくしています。Rust 2018 以降の Non-Lexical Lifetimes のおかげで、借用の有効範囲は「最後に使われたところまで」になり、スコープの終わりを待たずに次の借用を始められます。",
        "コンパイラが参照の有効期間を推論できないときは、ライフタイム（'a）で明示します。たとえば二つの参照を受け取って一つを返す関数では、戻り値がどちらの入力と同じ期間生きるのかを書く必要があります。ダングリング参照もコンパイラが許しません。スコープを抜ける値への参照を返そうとするとコンパイルエラーになり、代わりに所有権ごと返すことになります。それと、clone() より借用を選ぶこと。クローンは複製なのでコストがかかりますが、借用は参照を渡すだけです。",
        "これらのルールが体に馴染んでくると、メモリ安全性・GC 不要のパフォーマンス・スレッド安全性・明示的なメモリ管理が一度に手に入ります。最初はかなり窮屈に感じます。でも振り返ってみると、コンパイラはどのみち自分が下さなければいけない判断に付き合ってくれて、しかもバグを出荷前に捕まえてくれていただけなんだな、と思えてきます。",
      ],
    },
    {
      id: "npm-vs-npx",
      category: "engineering",
      title: "npmとnpxの違い、説明できますか？",
      excerpt:
        "localhost を立てるのに、なんとなく両方打っていました。それが気になって、きちんと調べ直してみた話です。",
      date: "2026.02",
      words: "1.6K",
      body: [
        "大学に通いながらフロントエンドの勉強をしているのですが、localhost を立てるたびに npm と npx をなんとなく両方打っていました。でも、その違いを自分の言葉で説明できない。そこが妙に引っかかってしまって、一度きちんと調べ直すことにしました。",
        "npm は node package manager の略で、Node.js をインストールすると一緒に使えるようになるパッケージ管理ツールです。プロジェクトが依存するパッケージを管理し、node_modules フォルダにインストールしてくれます。package.json を、ディスク上で実際に動くライブラリ群に変えてくれる存在、と言えると思います。",
        "npx は node package executer の略で、npm 5.2.0 から同梱されています。いちばんの特徴は、インストールしていないパッケージでも実行できること。必要なものを探してきて、インストールし、実行して、後片付けまでやってくれます。だから package.json の scripts に書いたり node_modules/.bin を経由したりしなくても、`npx vue create プロジェクト名` のように直接実行でき、依存関係もその場で解決されます。",
        "ついでに調べたのですが、yarn は Facebook が 2016 年に公開した JavaScript のパッケージマネージャで、npm より速く、バージョン指定がより厳密という利点があります。",
        "いちばんの収穫は、定義そのものよりも、毎日オートパイロットで打っていたコマンドを一度疑ってみたら、その裏側の仕組みまで理解できた、という体験のほうでした。これからも、引っかかった「お決まりのコマンド」は面倒くさがらずに調べにいきたいです。",
      ],
    },
    {
      id: "what-geo-actually-is",
      category: "ai-fintech",
      title: "GEO（生成エンジン最適化）とは結局なんなのか",
      excerpt:
        "GEO は SEO の上書きではありません。リンクではなく要約を返すモデルにとって「読める」存在になる、という話です。",
      date: "2026.05",
      words: "4.1K",
      body: [
        "従来の SEO は、「クリックされるリンク」になるための最適化でした。GEO は、モデルがユーザーの代わりに答えるとき、その「答えの一文」になるための最適化です。可視性の単位が、順位のついたページから、モデルが繰り返してくれる主張へと変わってきています。",
        "QueryLift では、この捉え方の違いが扱う問題そのものを変えました。あるブランドが生成された回答に出てくるか、どんな文脈で、どの競合と並べて語られるかを測り、その理由まで辿ります。難しいのは、相手が非決定的なことです。同じ問いでも答えが変わるので、順位ではなく分布を見ることになります。",
        "いまのところの自分の考えはこうです。GEO の時代に強いのは、事実が構造化されていて、一貫していて、モデルが根拠にしやすいブランド。要は、引用しても安全な情報源になれるかどうかだと思っています。",
      ],
    },
    {
      id: "shipping-a-currency",
      category: "ai-fintech",
      title: "新規通貨のリリースがプロダクトについて教えてくれたこと",
      excerpt:
        "メルコインで PdM として関わった話です。いちばん難しかったのは UI ではなく「信頼」のデザインでした。",
      date: "2025.05",
      words: "3.2K",
      body: [
        "メルカリの FinTech 部門であるメルコインで、新しい通貨リリースの一連を担当しました。お客さまへの見せ方、LP のデザインと実装、そしてリリースそのもの。FinTech では UI はまだ易しいほうで、プロダクトの本体は信頼のほうにあると感じました。",
        "どの画面も、小さな契約書のようなものです。数字の位置がひとつズレている、言葉が約束しすぎている、フローが手数料をわかりにくくしている——その一つひとつが、簡単には取り戻せない信用を少しずつ削っていきます。だから仕事は「見た目を綺麗にする」ことよりも、「すべての表示を、正しく、はっきりさせる」ことが中心でした。",
        "やってみて残ったのは、お金のプロダクトでは「わかりやすさ」そのものが機能だ、という実感です。ユーザーが「いま何が起きたんだろう？」と一瞬でも迷ったら、その時点でもう何かを間違えているのだと思います。",
      ],
    },
    {
      id: "design-system-of-one",
      category: "design-craft",
      title: "一人チームでデザインシステムをつくる",
      excerpt:
        "デザイナーでありエンジニアでありレビュアーでもある一人が、トークンとコンポーネントとルールをどう回しているか。",
      date: "2026.03",
      words: "2.9K",
      body: [
        "一人のためのデザインシステムなんて大げさに聞こえるかもしれません。でも「未来の自分」は他人みたいなもので、しかもけっこう忘れっぽい協力者だと気づくと、見方が変わります。Noahloy では色・タイポ・余白といったトークンから組み上げて、一度決めたことを画面ごとに考え直さずに済むようにしました。",
        "全部の役割を一人で兼ねるときのコツは、判断をルール側に追い出してしまうことです。余白のスケールが 6 段階しかなければ、13px か 14px かで悩むこと自体がなくなります。デザインシステムは堅苦しいルールづくりではなく、すでに答えの出た問いに毎回エネルギーを使わないための仕組みだと思っています。",
        "うまく作っておけば、将来チームに引き継ぐときも楽になります。ルールが自分の頭の中ではなく、コードの中に置いてあるからです。",
      ],
    },
    {
      id: "where-law-meets-engineering",
      category: "design-craft",
      title: "法律とエンジニアリングが重なるところ",
      excerpt:
        "一見遠そうな二つの分野ですが、重なっている部分は思ったより広い、という話です。",
      date: "2026.01",
      words: "2.3K",
      body: [
        "法律とエンジニアリングは正反対だと思われがちです。片方は判例と文章、もう片方は論理とコード。でも両方に触れていると、その境目はだんだん曖昧になってきます。法令は例外ケースまで書き込まれた仕様書のようなものですし、契約書も条件と例外を細かく定義しているという意味で、コードに近いところがあります。",
        "資金決済法や金融商品取引法を学びながら FinTech のプロダクトを作っていると、根っこではいつも同じことをしていると気づきます。ルールを正確に読み、どこが曖昧かを見つけ、その曖昧さで足をすくわれないように設計する。コードを書くときの作業とよく似ています。",
        "この重なりが、自分が両方に関わっている理由の大きな部分です。法律とエンジニアリングの両方がわかる人はそれほど多くなくて、FinTech ではちょうどその境目に面白い仕事があると感じています。",
      ],
    },
    {
      id: "what-djing-taught-me",
      category: "design-craft",
      title: "DJ がリリースについて教えてくれたこと",
      excerpt:
        "仕事を離れると音楽ばかり聴いています。DJ をやっていて気づいた、仕事と意外に似ているところの話です。",
      date: "2025.11",
      words: "1.8K",
      body: [
        "ものを作っていないときは、DJ をしたり映像を作ったりしています。しばらくは仕事とは正反対の趣味——感覚の世界と論理の世界——だと思っていました。でもあるとき、案外似たことをしているのかもしれない、と気づきました。",
        "DJ のセットを組むのは、少しだけプロダクトの段取りに似ています。フロアの様子を見ながら曲の流れを設計して、いちばん盛り上がる曲を最初の 10 分で使い切ったりはしません。飛ばしすぎると人は離れていくし、抑えすぎると場が温まらない。結局はペース配分なんだな、と毎回思います。",
        "媒体は違っても、やりたいことはたぶん同じです。仕組みを理解したうえで、人が実際に「いいな」と感じるものを作る。突き詰めるとそこに行き着くのかな、と思っています。",
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
