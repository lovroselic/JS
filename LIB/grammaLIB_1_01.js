/////////////////////////
/*

Grammar LIBrary (LS) v1.01.01

bugs: 
used by: Grammory

*/
/////////////////////////

class Subject {
  constructor(value, person, be, was) {
    this.value = value;
    this.type = "subject";
    this.person = person;
    this.be = be;
    this.was = was;
  }
}

class Verb {
  constructor(
    present,
    past,
    perfect,
    cont,
    third,
    prep,
    moves,
    articles,
    objects,
    forcedArticle,
    specialPrep
  ) {
    this.present = present;
    this.past = past;
    this.perfect = perfect;
    this.cont = cont;
    this.third = third;
    this.prep = prep;
    this.moves = moves;
    this.articles = articles;
    this.objects = objects;
    this.type = "verb";
    this.forcedArticle = forcedArticle || null;
    this.specialPrep = specialPrep || null;
    this.value = present;
  }
}

class AdverbPlace {
  constructor(value, prep, articles, moves) {
    this.type = "adverb of place";
    this.value = value;
    this.prep = prep;
    this.articles = articles || ["a", "the"];
    this.moves = moves || false;
    this.prepositions = [
      "in",
      "under",
      "by",
      "on",
      "next to",
      "behind",
      "at",
      "in front of",
      "through"
    ];
    this.movePrep = ["in", "to", "into"];
  }
}
var AdverbPlaceCollection = [
  new AdverbPlace(
    "hills",
    [
      "in",
      "under",
      "over",
      "above",
      "to",
      "across",
      "around",
      "beneath",
      "from"
    ],
    ["the"]
  ),
  new AdverbPlace(
    "mountains",
    [
      "in",
      "under",
      "over",
      "above",
      "to",
      "across",
      "around",
      "beneath",
      "from"
    ],
    ["the"]
  ),
  new AdverbPlace("village", [
    "in",
    "under",
    "over",
    "above",
    "to",
    "across",
    "around",
    "through",
    "beneath",
    "from"
  ]),
  new AdverbPlace("town", [
    "in",
    "under",
    "over",
    "above",
    "to",
    "across",
    "around",
    "through",
    "beneath",
    "from"
  ]),
  new AdverbPlace("city", [
    "in",
    "under",
    "over",
    "above",
    "to",
    "across",
    "around",
    "through",
    "beneath",
    "from"
  ]),
  new AdverbPlace("meadow", [
    "in",
    "to",
    "at",
    "over",
    "above",
    "across",
    "on",
    "from"
  ]),
  new AdverbPlace("car", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "inside",
    "outside",
    "on",
    "next to",
    "behind",
    "from"
  ]),
  new AdverbPlace("house", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "behind",
    "in front of",
    "next to",
    "inside",
    "outside",
    "on",
    "from"
  ]),
  new AdverbPlace("roof", [
    "on",
    "over",
    "above",
    "under",
    "beneath",
    "to",
    "from"
  ]),
  new AdverbPlace("bed", [
    "in",
    "from",
    "on",
    "under",
    "beneath",
    "above",
    "over",
    "behind",
    "in front of",
    "next to"
  ]),
  new AdverbPlace("kitchen", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "behind",
    "in front of",
    "next to",
    "inside",
    "outside",
    "from"
  ]),
  new AdverbPlace("bathroom", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "behind",
    "in front of",
    "next to",
    "inside",
    "outside",
    "from"
  ]),
  new AdverbPlace(
    "moon",
    [
      "from",
      "on",
      "to",
      "under",
      "beneath",
      "around",
      "behind",
      "in front of",
      "next to"
    ],
    ["the"]
  ),
  new AdverbPlace(
    "sun",
    [
      "from",
      "on",
      "to",
      "under",
      "beneath",
      "around",
      "behind",
      "in front of",
      "next to"
    ],
    ["the"]
  ),
  new AdverbPlace(
    "sea",
    ["from", "in", "at", "to", "under", "beneath"],
    ["the"]
  ),
  new AdverbPlace(
    "sky",
    ["from", "in", "at", "to", "beneath", "across", "about"],
    ["the"]
  ),
  new AdverbPlace("beach", ["from", "at", "on", "under", "above", "next to"]),
  new AdverbPlace("church", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "behind",
    "in front of",
    "next to",
    "inside",
    "outside",
    "on",
    "from"
  ]),
  new AdverbPlace("igloo", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "behind",
    "in front of",
    "next to",
    "inside",
    "outside",
    "on",
    "from"
  ]),
  new AdverbPlace("school", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "behind",
    "in front of",
    "next to",
    "inside",
    "outside",
    "on",
    "from"
  ]),
  new AdverbPlace("classroom", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "behind",
    "in front of",
    "next to",
    "inside",
    "outside",
    "from"
  ]),
  new AdverbPlace("chair", [
    "on",
    "under",
    "beneath",
    "behind",
    "in front of",
    "next to",
    "above",
    "around",
    "by",
    "from",
    "to"
  ]),
  new AdverbPlace("hospital", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "behind",
    "in front of",
    "next to",
    "inside",
    "outside",
    "on",
    "from"
  ]),
  new AdverbPlace("shop", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "behind",
    "in front of",
    "next to",
    "inside",
    "outside",
    "on",
    "to",
    "from"
  ]),
  new AdverbPlace("road", [
    "on",
    "to",
    "along",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "next to",
    "from",
    "by"
  ]),
  new AdverbPlace("bridge", [
    "on",
    "at",
    "under",
    "beneath",
    "above",
    "from",
    "next to",
    "in front of",
    "behind",
    "from"
  ]),
  new AdverbPlace("table", [
    "on",
    "at",
    "under",
    "beneath",
    "above",
    "from",
    "next to",
    "in front of",
    "behind",
    "from"
  ]),
  new AdverbPlace("balcony", [
    "on",
    "at",
    "under",
    "beneath",
    "above",
    "from",
    "next to",
    "in front of",
    "behind",
    "from"
  ]),
  new AdverbPlace("tent", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "behind",
    "in front of",
    "next to",
    "inside",
    "outside",
    "on"
  ]),
  new AdverbPlace("door", [
    "through",
    "at",
    "in front of",
    "behind",
    "next to"
  ]),
  new AdverbPlace("cinema", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "behind",
    "in front of",
    "next to",
    "inside",
    "outside",
    "on"
  ]),
  new AdverbPlace("theatre", [
    "in",
    "to",
    "around",
    "by",
    "beneath",
    "above",
    "at",
    "under",
    "over",
    "behind",
    "in front of",
    "next to",
    "inside",
    "outside",
    "on"
  ]),
  new AdverbPlace("market", [
    "in",
    "at",
    "under",
    "beneath",
    "above",
    "from",
    "next to",
    "in front of",
    "behind",
    "from"
  ]),
  new AdverbPlace("parking lot", [
    "on",
    "at",
    "under",
    "beneath",
    "above",
    "from",
    "next to",
    "in front of",
    "behind",
    "from",
    "in"
  ]),
  new AdverbPlace(
    "Australia",
    ["in", "under", "through", "from", "above", "over", "across", "around"],
    [""],
    true
  ),
  new AdverbPlace(
    "Slovenia",
    ["in", "under", "through", "from", "above", "over", "across", "around"],
    [""],
    true
  ),
  new AdverbPlace(
    "Germany",
    ["in", "under", "through", "from", "above", "over", "across", "around"],
    [""],
    true
  ),
  new AdverbPlace(
    "USA",
    ["in", "under", "through", "from", "above", "over", "across", "around"],
    ["the"],
    true
  ),
  new AdverbPlace(
    "China",
    ["in", "under", "through", "from", "above", "over", "across", "around"],
    [""],
    true
  ),
  new AdverbPlace(
    "Russia",
    ["in", "under", "through", "from", "above", "over", "across", "around"],
    [""],
    true
  ),
  new AdverbPlace(
    "Dubai",
    ["in", "under", "through", "from", "above", "over", "across", "around"],
    [""],
    true
  ),
  new AdverbPlace(
    "Celje",
    ["in", "under", "through", "from", "above", "over", "across", "around"],
    [""],
    true
  ),
  new AdverbPlace(
    "London",
    ["in", "under", "through", "from", "above", "over", "across", "around"],
    [""],
    true
  ),
  new AdverbPlace(
    "Washington",
    ["in", "under", "through", "from", "above", "over", "across", "around"],
    [""],
    true
  ),
  new AdverbPlace(
    "Glasgow",
    ["in", "under", "through", "from", "above", "over", "across", "around"],
    [""],
    true
  )
];
var VerbCollection = [
  new Verb(
    "jump",
    "jumped",
    "jumped",
    "jumping",
    "jumps",
    [
      "on",
      "to",
      "into",
      "from",
      "in",
      "above",
      "over",
      "through",
      "into",
      "inside",
      "outside",
      "behind",
      "at",
      "in front of",
      "next to",
      "across",
      "around"
    ],
    true,
    ["with", "without"],
    ["his uncle", "parachute", "my pet"]
  ),
  new Verb(
    "crawl",
    "crawled",
    "crawled",
    "crawling",
    "crawls",
    [
      "on",
      "to",
      "into",
      "from",
      "in",
      "above",
      "over",
      "through",
      "into",
      "inside",
      "outside",
      "behind",
      "in front of",
      "next to",
      "across",
      "around",
      "under",
      "beneath"
    ],
    true,
    null,
    null
  ),
  new Verb(
    "walk",
    "walked",
    "walked",
    "walking",
    "walks",
    [
      "on",
      "to",
      "into",
      "from",
      "in",
      "above",
      "over",
      "through",
      "into",
      "inside",
      "outside",
      "behind",
      "at",
      "in front of",
      "next to",
      "across",
      "around"
    ],
    true,
    null,
    null
  ),
  new Verb(
    "sleep",
    "slept",
    "slept",
    "sleeping",
    "sleeps",
    [
      "in",
      "on",
      "at",
      "under",
      "next to",
      "above",
      "inside",
      "outside",
      "behind",
      "in front of"
    ],
    false,
    null,
    null
  ),
  new Verb(
    "write",
    "wrote",
    "written",
    "writing",
    "writes",
    [
      "about",
      "on",
      "in",
      "from",
      "at",
      "of",
      "inside",
      "outside",
      "behind",
      "in front of",
      "under",
      "next to"
    ],
    false,
    ["a", "the"],
    ["letter", "book", "note", "poem", "story"]
  ),
  new Verb(
    "run",
    "ran",
    "run",
    "running",
    "runs",
    [
      "by",
      "on",
      "into",
      "to",
      "through",
      "from",
      "around",
      "across",
      "inside",
      "outside",
      "behind",
      "in front of"
    ],
    true,
    null,
    null
  ),
  new Verb(
    "watch",
    "watched",
    "watched",
    "watching",
    "watches",
    [
      "for",
      "in",
      "on",
      "from",
      "at",
      "by",
      "over",
      "about",
      "after",
      "above",
      "inside",
      "outside",
      "behind",
      "in front of"
    ],
    false,
    null,
    ["TV", "my friend", "a movie", "the movie"]
  ),
  new Verb(
    "fly",
    "flew",
    "flown",
    "flying",
    "flies",
    [
      "to",
      "in",
      "into",
      "from",
      "by",
      "on",
      "over",
      "at",
      "through",
      "under",
      "around",
      "across",
      "above",
      "up",
      "towards",
      "past"
    ],
    true,
    null,
    null
  ),
  new Verb(
    "play",
    "played",
    "played",
    "playing",
    "plays",
    [
      "with",
      "in",
      "on",
      "at",
      "by",
      "under",
      "without",
      "above",
      "inside",
      "outside",
      "behind",
      "in front of",
      "from"
    ],
    false,
    null,
    null
  ),
  new Verb(
    "teach",
    "taught",
    "taught",
    "teaching",
    "teaches",
    [
      "in",
      "at",
      "from",
      "by",
      "about",
      "on",
      "from",
      "above",
      "inside",
      "outside",
      "behind",
      "in front of"
    ],
    false,
    null,
    null
  ),
  new Verb(
    "dance",
    "danced",
    "danced",
    "dancing",
    "dances",
    [
      "with",
      "without",
      "in",
      "on",
      "about",
      "through",
      "next to",
      "around",
      "back to",
      "over",
      "past",
      "towards",
      "above",
      "inside",
      "outside",
      "behind",
      "in front of",
      "from"
    ],
    true,
    null,
    null
  ),
  new Verb(
    "make",
    "made",
    "made",
    "making",
    "makes",
    [
      "in",
      "with",
      "on",
      "without",
      "at",
      "under",
      "inside",
      "outside",
      "behind",
      "in front of",
      "from"
    ],
    false,
    null,
    ["a bed", "the bed", "lunch", "pancakes"]
  ),
  new Verb(
    "sing",
    "sang",
    "sung",
    "singing",
    "sings",
    [
      "in",
      "by",
      "about",
      "to",
      "for",
      "with",
      "without",
      "at",
      "on",
      "from",
      "of",
      "above",
      "inside",
      "outside",
      "behind",
      "in front of"
    ],
    false,
    null,
    null,
    ["to"]
  ),
  new Verb(
    "read",
    "read",
    "read",
    "reading",
    "reads",
    [
      "to",
      "about",
      "in",
      "from",
      "on",
      "for",
      "with",
      "without",
      "like",
      "at",
      "over",
      "above",
      "inside",
      "outside",
      "behind",
      "in front of"
    ],
    false,
    null,
    null,
    ["to"]
  ),
  new Verb(
    "drink",
    "drank",
    "drunk",
    "drinking",
    "drinks",
    [
      "in",
      "at",
      "from",
      "on",
      "with",
      "without",
      "around",
      "in front of",
      "behind",
      "inside",
      "above",
      "outside"
    ],
    false,
    null,
    null,
    null
  ),
  new Verb(
    "cook",
    "cooked",
    "cooked",
    "cooking",
    "cooks",
    [
      "for",
      "in",
      "at",
      "from",
      "on",
      "with",
      "without",
      "around",
      "in front of",
      "behind",
      "to",
      "inside",
      "outside"
    ],
    false,
    null,
    null,
    ["to"]
  ),
  new Verb(
    "clean",
    "cleaned",
    "cleaned",
    "cleaning",
    "cleans",
    [
      "up",
      "at",
      "in",
      "with",
      "without",
      "about",
      "around",
      "in front of",
      "behind",
      "inside",
      "out",
      "after",
      "outside",
      "on",
      "from"
    ],
    false,
    null,
    null,
    null
  ),
  new Verb(
    "swim",
    "swam",
    "swum",
    "swimming",
    "swims",
    [
      "accros",
      "along",
      "around",
      "away from",
      "into",
      "past",
      "through",
      "to",
      "under",
      "in",
      "from"
    ],
    true,
    null,
    null,
    null
  ),
  new Verb(
    "study",
    "studied",
    "studied",
    "studying",
    "studies",
    [
      "in",
      "at",
      "inside",
      "outside",
      "with",
      "without",
      "for",
      "above",
      "behind",
      "next to",
      "on",
      "from", 
      "in front of"
    ],
    false,
    null,
    null,
    null
  ),
  new Verb(
    "wash",
    "washed",
    "washed",
    "washing",
    "washes",
    [
      "in",
      "at",
      "over",
      "off",
      "behind",
      "next to",
      "inside",
      "outside",
      "from",
      "on",
      "by"
    ],
    false,
    null,
    ["the dishes", "a car", "the car", "clothes"],
    null
  ),
  new Verb(
    "ski",
    "skied",
    "skied",
    "skiing",
    "skis",
    [
      "across",
      "down",
      "along",
      "in",
      "at",
      "out of",
      "over",
      "above",
      "on",
      "from"
    ],
    true,
    null,
    null,
    null
  ),
  new Verb(
    "fix",
    "fixed",
    "fixed",
    "fixing",
    "fixes",
    [
      "in",
      "at",
      "by",
      "on",
      "for",
      "with",
      "without",
      "behind",
      "next to",
      "inside",
      "outside",
      "from"
    ],
    false,
    null,
    ["my bike", "a drink", "a picture", "the picture"],
    null
  ),
  new Verb(
    "shower",
    "showered",
    "showered",
    "showering",
    "showers",
    [
      "in",
      "at",
      "above",
      "inside",
      "outside",
      "behind",
      "next to",
      "in front of",
      "under"
    ],
    false,
    null,
    null,
    null
  ),
  new Verb(
    "draw",
    "drew",
    "drawn",
    "drawing",
    "draws",
    [
      "in",
      "at",
      "on",
      "inside",
      "outside",
      "near",
      "behind",
      "next to",
      "under",
      "above",
      "in front of"
    ],
    false,
    null,
    null,
    null
  ),
  new Verb(
    "drive",
    "drove",
    "driven",
    "driving",
    "drives",
    [
      "by",
      "to",
      "in",
      "on",
      "through",
      "at",
      "from",
      "into",
      "around",
      "near",
      "behind",
      "next to",
      "under",
      "above"
    ],
    true,
    null,
    null,
    null
  ),
  new Verb(
    "type",
    "typed",
    "typed",
    "typing",
    "types",
    [
      "in",
      "at",
      "under",
      "in front of",
      "from",
      "inside",
      "outside",
      "above",
      "behind",
      "next to",
      "in front of",
      "on"
    ],
    false,
    null,
    null,
    null
  ),
  new Verb(
    "comb",
    "combed",
    "combed",
    "combing",
    "combs",
    [
      "in",
      "at",
      "on",
      "under",
      "in front of",
      "from",
      "inside",
      "outside",
      "above",
      "behind",
      "next to"
    ],
    false,
    null,
    ["his hair", "her hair", "my hair"],
    null
  ),
  new Verb(
    "brush",
    "brushed",
    "brushed",
    "brushing",
    "brushes",
    [
      "in",
      "at",
      "on",
      "under",
      "in front of",
      "from",
      "inside",
      "outside",
      "above",
      "behind",
      "next to"
    ],
    false,
    ["a", "the"],
    ["horse", "dog"],
    null
  ),
  new Verb(
    "ride",
    "rode",
    "ridden",
    "riding",
    "rides",
    [
      "in",
      "at",
      "on",
      "under",
      "in front of",
      "from",
      "inside",
      "outside",
      "next to",
      "to",
      "through",
      "into",
      "from",
      "by",
      "along",
      "over",
      "past",
      "around",
      "across"
    ],
    false,
    ["a", "the"],
    ["horse", "bike"],
    null
  ),
  new Verb(
    "eat",
    "ate",
    "eaten",
    "eating",
    "eats",
    [
      "in",
      "at",
      "from",
      "on",
      "inside",
      "outside",
      "by",
      "through",
      "within",
      "without",
      "above",
      "behind",
      "next to",
      "in front of"
    ],
    false,
    null,
    null,
    null
  ),
  new Verb(
    "decorate",
    "decorated",
    "decorated",
    "decorating",
    "decorates",
    [
      "in",
      "at",
      "inside",
      "outside",
      "next to",
      "above",
      "behind",
      "in front of",
      "on"
    ],
    false,
    ["a", "the"],
    ["room", "xmas tree", "card"],
    null
  ),
  new Verb(
    "pray",
    "prayed",
    "prayed",
    "praying",
    "prays",
    [
      "in",
      "to",
      "at",
      "inside",
      "outside",
      "for",
      "with",
      "on",
      "above",
      "behind",
      "next to",
      "in front of"
    ],
    false,
    null,
    null,
    ["to"]
  ),
  new Verb(
    "sit",
    "sat",
    "sat",
    "sitting",
    "sits",
    [
      "in",
      "at",
      "on",
      "behind",
      "inside",
      "outside",
      "with",
      "next to",
      "around",
      "beside",
      "near",
      "under",
      "upon",
      "above",
      "behind",
      "in front of"
    ],
    false,
    null,
    null,
    null
  ),
  new Verb(
    "carry",
    "carried",
    "carried",
    "carrying",
    "carries",
    [
      "in",
      "at",
      "to",
      "into",
      "through",
      "inside",
      "outside",
      "around",
      "near",
      "along",
      "across",
      "above",
      "behind",
      "next to",
      "in front of",
      "on",
      "from"
    ],
    false,
    null,
    ["bags", "my schoolbag", "a box", "the box", "un umbrella", "the umbrella"],
    null
  ),
  new Verb(
    "have",
    "had",
    "had",
    "having",
    "has",
    [
      "in",
      "at",
      "under",
      "in front of",
      "behind",
      "inside",
      "outside",
      "above",
      "next to",
      "on",
      "from"
    ],
    false,
    null,
    ["a bad dream", "a headache", "brothers", "sisters"],
    null
  ),
  new Verb(
    "look",
    "looked",
    "looker",
    "looking",
    "looks",
    [
      "in",
      "at",
      "from",
      "for",
      "like",
      "after",
      "into",
      "to",
      "through",
      "upon",
      "inside",
      "outside",
      "above",
      "behind",
      "next to",
      "in front of",
      "on",
      "from"
    ],
    false,
    null,
    ["at my mother", "for his glasses", "after my sister"],
    null
  ),
  new Verb(
    "cut",
    "cut",
    "cut",
    "cutting",
    "cuts",
    [
      "in",
      "to",
      "throught",
      "at",
      "off",
      "into",
      "across",
      "from",
      "in",
      "iside",
      "outside",
      "above",
      "behind",
      "next to",
      "in front of",
      "on"
    ],
    false,
    null,
    null,
    null
  ),
  new Verb(
    "hide",
    "hid",
    "hidden",
    "hiding",
    "hides",
    [
      "in",
      "at",
      "outside",
      "inside",
      "behind",
      "next to",
      "in front of",
      "under",
      "from",
      "on",
      "to",
      "within",
      "away",
      "beneath",
      "above",
      "behind",
      "next to",
      "in front of"
    ],
    false,
    null,
    null,
    null
  ),
  new Verb(
    "wear",
    "wore",
    "worn",
    "wearing",
    "wears",
    [
      "in",
      "at",
      "to",
      "inside",
      "outside",
      "under",
      "around",
      "above",
      "behind",
      "next to",
      "in front of",
      "from",
      "on"
    ],
    false,
    ["a", "the"],
    ["long skirt", "cap", "tiara"],
    null
  ),
  new Verb(
    "dig",
    "dug",
    "dug",
    "digging",
    "digs",
    [
      "under",
      "through",
      "in",
      "at",
      "to",
      "behind",
      "in front of",
      "into",
      "inside",
      "outside",
      "from",
      "under",
      "beneath",
      "below"
    ],
    false,
    ["a", "the"],
    ["hole", "tunnel"],
    null,
    ["under", "through"]
  )
];

//AdverbPlaceCollection
var ADVERB = {
  place: {
    form: function(n) {
      var adverbs = [];
      var select;
      while (n > 0) {
        select = AdverbPlaceCollection.chooseRandom();
        if (adverbs.indexOf(select) === -1) {
          adverbs.push(select);
          n--;
        }
      }
      return adverbs;
    }
  },
  time: {
    form: function(n) {
      var methods = [];
      var adverbs = [];
      var select;
      for (var x in ConstructTimeAdverb) {
        methods.push(x);
      }
      while (n > 0) {
        select = ConstructTimeAdverb[methods.chooseRandom()]();
        //console.log("debug", select, adverbs.indexOf(select));
        if (adverbs.indexOf(select) === -1) {
          adverbs.push(select);
          n--;
        }
      }
      return adverbs;
    }
  }
};

var VERB = {
  form: function(n) {
    var verbs = [];
    var select;
    while (n > 0) {
      select = VerbCollection.chooseRandom();
      if (verbs.indexOf(select) === -1) {
        if (select.objects) {
          select.fixedObject = select.objects.chooseRandom();
        }
        verbs.push(select);
        n--;
      }
    }
    return verbs;
  }
};

var SUBJECT = {
  form: function(n) {
    var methods = [];
    var subjects = [];
    var select;
    for (var x in ConstructSubject) {
      methods.push(x);
    }
    while (n > 0) {
      select = ConstructSubject[methods.chooseRandom()]();
      if (subjects.indexOf(select) === -1) {
        subjects.push(select);
        n--;
      }
    }
    return subjects;
  }
};

var PersonalPronoun = [
  new Subject("I", "", "am", "was"),
  new Subject("he", "s", "is", "was"),
  new Subject("she", "s", "is", "was"),
  new Subject("it", "s", "is", "was"),
  new Subject("we", "", "are", "were"),
  new Subject("you", "", "are", "were"),
  new Subject("they", "", "are", "were")
];

var PossessivePronoun = ["my", "your", "his", "her", "our", "your", "their"];
var Family = [
  "mother",
  "father",
  "brother",
  "sister",
  "aunt",
  "uncle",
  "dad",
  "friend"
];
var PersonalNames = [
  "Peter",
  "Petra",
  "Mark",
  "Mary",
  "Martin",
  "Martha",
  "John",
  "Johanna",
  "Bill",
  "Barbara",
  "Will",
  "Helen",
  "Maya",
  "Joe",
  "Richard",
  "Stacy",
  "Sue"
];
var Animals = [
  "parrot",
  "bear",
  "dog",
  "cat",
  "bull",
  "cow",
  "horse",
  "tiger",
  "lion",
  "zebra",
  "turtle",
  "duck",
  "snake",
  "alligator",
  "ant",
  "elephant",
  "eagle",
  "shark",
  "squirrel",
  "spider",
  "monkey",
  "owl",
  "snail",
  "lizard",
  "pig",
  "rabbit"
];
var Adjectives = [
  "shrieking",
  "stupid",
  "little",
  "big",
  "crazy",
  "flying",
  "cute",
  "ugly",
  "pretty",
  "famous",
  "evil",
  "sitting",
  "laughing",
  "crying",
  "happy",
  "sad",
  "hungry",
  "fast",
  "slow",
  "nervous",
  "dirty",
  "dangerous"
];
var Colours = [
  "black",
  "white",
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "brown"
];
var Persons = [
  "president",
  "singer",
  "teacher",
  "farmer",
  "pupil",
  "friend",
  "dancer"
];
var Article = ["a", "the"];
var Vowel = ["a", "e", "i", "o", "u"];

var ConstructSubject = {
  family: function() {
    return new Subject(
      PossessivePronoun[RND(0, PossessivePronoun.length - 1)] +
        " " +
        Family[RND(0, Family.length - 1)],
      "s",
      "is",
      "was"
    );
  },
  animal: function() {
    var sw = RND(1, 3);
    var name, article, adjective, be, person, was;
    var animal = Animals.chooseRandom();
    switch (sw) {
      case 1:
        adjective = "";
        break;
      case 2:
        adjective = Adjectives.chooseRandom();
        break;
      case 3:
        adjective = Colours.chooseRandom();
        break;
    }
    if (coinFlip()) {
      if (coinFlip()) {
        article = "";
      } else article = "the";
      animal += "s";
      be = "are";
      was = "were";
      person = "";
    } else {
      article = Article.chooseRandom();
      be = "is";
      was = "was";
      person = "s";
      if (adjective) {
        if (Vowel.indexOf(adjective[0]) > -1 && article === "a") {
          article = "an";
        }
      } else {
        if (Vowel.indexOf(animal[0]) > -1 && article === "a") {
          article = "an";
        }
      }
    }
    name = article + " " + adjective + " " + animal;
    name = name.trim();
    var temp = name.split(" ");
    temp.remove(" ");
    temp.remove("");
    name = temp.join(" ");
    return new Subject(name, person, be, was);
  },
  person: function() {
    var sw = RND(1, 2);
    var name, article, adjective, be, person, was;
    var persons = Persons.chooseRandom();
    switch (sw) {
      case 1:
        adjective = "";
        break;
      case 2:
        adjective = Adjectives.chooseRandom();
        break;
    }
    if (coinFlip()) {
      if (coinFlip()) {
        article = "";
      } else article = "the";
      persons += "s";
      be = "are";
      was = "were";
      person = "";
    } else {
      article = Article.chooseRandom();
      be = "is";
      was = "was";
      person = "s";
      if (adjective) {
        if (Vowel.indexOf(adjective[0]) > -1 && article === "a") {
          article = "an";
        }
      } else {
        if (Vowel.indexOf(persons[0]) > -1 && article === "a") {
          article = "an";
        }
      }
    }
    name = article + " " + adjective + " " + persons;
    name = name.trim();
    var temp = name.split(" ");
    temp.remove(" ");
    temp.remove("");
    name = temp.join(" ");
    return new Subject(name, person, be, was);
  },
  name: function() {
    return new Subject(PersonalNames.chooseRandom(), "s", "is", "was");
  },
  personalPronoun: function() {
    return PersonalPronoun.chooseRandom();
  }
};

var WeekDay = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
var Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var TimeQuant = ["day", "week", "month", "year"];

class AdverbTime {
  constructor(value, time, subType, position) {
    this.type = "adverb of time";
    this.value = value;
    this.time = time;
    this.subType = subType || null;
    this.position = position || null;
  }
}

var AdverbTimeCollectionCont = [
  new AdverbTime("now", "present", "continuous", "after"),
  new AdverbTime("at this moment", "present", "continuous", "after"),
  //new AdverbTime("still", "present", "continuous", "before")
];
var AdverbTimeCollectionSimple = [
  new AdverbTime("often", "present", "simple", "before"),
  //new AdverbTime("sometimes", "present", "simple", "both"),
  new AdverbTime("never", "present", "simple", "before"),
  new AdverbTime("rarely", "present", "simple", "before"),
  new AdverbTime("always", "present", "simple", "before")
];
var ConstructTimeAdverb = {
  cont: function() {
    return AdverbTimeCollectionCont.chooseRandom();
  },
  simple: function() {
    var add;
    const HM = 7;
    var tempCollection = [];
    var D1 = WeekDay.clone();
    for (var i = 0; i < HM; i++) {
      add = "every " + D1.removeRandom();
      tempCollection.push(new AdverbTime(add, "present", "simple"));
    }
    var D2 = WeekDay.clone();
    for (var j = 0; j < HM; j++) {
      add = "on " + D2.removeRandom() + "s";
      tempCollection.push(new AdverbTime(add, "present", "simple"));
    }
    if (coinFlip()) {
      return tempCollection.chooseRandom();
    } else {
      return AdverbTimeCollectionSimple.chooseRandom();
    }
  },
  pastCont: function() {
    const HM = 2;
    var choice = RND(1, HM);
    var answer;
    switch (choice) {
      case 1:
        var time = pm();
        answer =
          "from " + RND(1, 4) + time + " to " + RND(5, 8) + time + " " + ass();
        break;
      case 2:
        var time2 = RND(2, 7);
        answer = "for " + CONVERT.numToWord(time2) + " hours " + ass();
        break;
    }
    return new AdverbTime(answer, "past", "continuous");

    function ass() {
      var choose = RND(1, 3);
      var ret;
      switch (choose) {
        case 1:
          ret = "yesterday";
          break;
        case 2:
          var when = ["week"].concat(WeekDay);
          ret = "last " + when.chooseRandom();
          break;
        case 3:
          var num = RND(2, 5);
          num = CONVERT.numToWord(num);
          ret = num + " days ago";
          break;
      }
      return ret;
    }

    function pm() {
      if (coinFlip()) {
        return "PM";
      } else return "AM";
    }
  },
  pastSimple: function() {
    const HM = 6;
    var choice = RND(1, HM);
    var answer;
    switch (choice) {
      case 1:
        answer = "yesterday";
        break;
      case 2:
        answer = "last " + WeekDay.chooseRandom();
        break;
      case 3:
        answer = "last " + Months.chooseRandom();
        break;
      case 4:
        var Pool = TimeQuant.slice(1);
        answer = "last " + Pool.chooseRandom();
        break;
      case 5:
        var num = RND(2, 13);
        answer = CONVERT.numToWord(num) + " days ago";
        break;
      case 6:
        answer = "in " + RND(2001, 2017);
        break;
    }
    return new AdverbTime(answer, "past", "simple");
  },
  future: function() {
    const HM = 5;
    var choice = RND(1, HM);
    var answer;
    switch (choice) {
      case 1:
        answer = "tomorrow";
        break;
      case 2:
        var Pool = TimeQuant.slice(1);
        answer = "next " + Pool.chooseRandom();
        break;
      case 3:
        answer = "next " + Months.chooseRandom();
        break;
      case 4:
        answer = "next " + WeekDay.chooseRandom();
        break;
      case 5:
        answer =
          "in " +
          CONVERT.numToWord(RND(2, 13)) +
          " " +
          TimeQuant.chooseRandom() +
          "s";
        break;
    }
    return new AdverbTime(answer, "future");
  }
};
